import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import qs from "qs";
import { Spinner, View } from "@instructure/ui";
import agent from "../agent";
import Layout from "./Layout";
import Instructions from "./Instructions";
import CreateCred from "./CreateCred";
import ClaimCred from "./ClaimCred";
import ListCred from "./ListCred";
import SelectCred from "./SelectCred";
import SelectIssuance from "./SelectIssuance";
import CreateIssuance from "./CreateIssuance";
import EnterKey from "./EnterKey";

/**
 * App top-level component
 *
 * @return {Component}
 */
const App = () => {
  const [versionInfo, setVersionInfo] = useState(null);
  const [context, setContext] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [issuanceId, setIssuanceId] = useState(null);
  const [credentialId, setCredentialId] = useState(null);

  /**
   * Save the user's API key
   *
   * @param {String} apiKey
   */
  const saveAPIKey = (apiKey) => {
    agent.setAPIKey(apiKey);
    setApiKey(apiKey);
  };

  /**
   * Create a credential for this placement
   *
   * @param {Number} groupId
   * @param {String} title
   * @param {Credential} template
   */
  const createCred = (groupId, title, template) => {
    agent
      .createCred(groupId, title, template)
      .then((created) => selectCred(created.id));
  };

  /**
   * Select the credential for this placement
   *
   * @param {Number|"new"} credentialId
   */
  const selectCred = (credentialId) => {
    setCredentialId(credentialId);
  };

  /**
   * Select the issuance for this placement
   *
   * @param {Number|"new"} issuanceId
   */
  const selectIssuance = (issuanceId) => {
    setIssuanceId(issuanceId);
    issuanceId === "new" ? null : agent.setPlacement(issuanceId);
  };

  /**
   * Create an issuance for this placement
   *
   * @param {String} name
   * @param {String} date
   */
  const createIssuance = (name, date) => {
    agent
      .createIssuance(credentialId, name, date)
      .then((created) => selectIssuance(created.id));
  };

  /**
   *
   */
  const resetPlacement = () => {
    agent.resetPlacement().then(() => {
      setIssuanceId(null);
      setCredentialId(null);
    });
  };

  /**
   * Request context when component mounts.
   */
  useEffect(() => {
    const queryParameters = window.location.search;

    let analyticsId;
    try {
      analyticsId = qs.parse(queryParameters, { ignoreQueryPrefix: true })
        .analyticsId;
    } catch (err) {}

    if (analyticsId) {
      ReactGA.initialize(analyticsId);
      ReactGA.set({ title: "Verifiable Credentials LTI" });
      ReactGA.pageview(window.location.pathname);
    }

    agent.getContext().then((response) => {
      setVersionInfo(response.data.version);
      setContext(response.context);
    });
    agent.hasAPIKey().then((res) => setApiKey(res.apiKey));
  }, []);

  /**
   * Once we know we have an API key we can request our placement
   */
  useEffect(() => {
    agent
      .getPlacement()
      .then(({ issuance_id: issuanceId }) => setIssuanceId(issuanceId));
  }, [apiKey]);

  return (
    <Layout versionInfo={versionInfo || ""}>
      {context ? (
        <div>
          <Instructions role={context.userRole} lmsType={context.lmsType} />
          {"instructor" === context.userRole ? (
            <>
              {apiKey === false ? <EnterKey setAPIKey={saveAPIKey} /> : null}
              {apiKey && !credentialId && !issuanceId ? (
                <SelectCred onSelect={selectCred} />
              ) : null}
              {"new" === credentialId ? (
                <CreateCred onCreate={createCred} />
              ) : null}
              {credentialId && credentialId !== "new" && !issuanceId ? (
                <SelectIssuance
                  credentialId={credentialId}
                  onSelect={selectIssuance}
                />
              ) : null}
              {"new" === issuanceId ? (
                <CreateIssuance
                  credentialId={credentialId}
                  onCreate={createIssuance}
                />
              ) : null}
              {issuanceId && issuanceId !== "new" ? (
                <ListCred
                  issuanceId={issuanceId}
                  onReconfigure={resetPlacement}
                />
              ) : null}
            </>
          ) : (
            <>
              {"learner" === context.userRole && issuanceId ? (
                <ClaimCred />
              ) : (
                <p>
                  The instructor has not completed setting up this credential,
                  please try again later.
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <View as="div" margin="large auto" textAlign="center">
          <Spinner size="large" renderTitle="Loading..." />
        </View>
      )}
    </Layout>
  );
};

export default App;
