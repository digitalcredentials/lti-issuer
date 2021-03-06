import React from "react";
import ReactGA from "react-ga";
import qs from "qs";
import { Spinner, View } from "@instructure/ui";
import agent from "../agent";
import Layout from "./Layout";
import GTCredInfo from "./GTCredInfo";
import CreateCred from "./CreateCred";
import ClaimCred from "./ClaimCred";
import ListCred from "./ListCred";
import SelectCred from "./SelectCred";
import SelectIssuance from "./SelectIssuance";
import CreateIssuance from "./CreateIssuance";
import EnterKey from "./EnterKey";

/** App top-level component */
class App extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      versionInfo: null,
      context: null,
      apiKey: null,
      issuanceId: null,
      credentialId: null,
    };
    this.setAPIKey = this.setAPIKey.bind(this);
    this.selectCred = this.selectCred.bind(this);
    this.createCred = this.createCred.bind(this);
  }

  /**
   * Save the user's API key
   *
   * @param {String} apiKey
   */
  setAPIKey(apiKey) {
    agent.setAPIKey(apiKey);
    this.setState({ apiKey });
  }

  /**
   * Create a credential for this placement
   *
   * @param {Credential} cred
   */
  createCred(cred) {
    console.log(cred);
    agent.createCred(cred).then((created) => this.selectCred(created.id));
  }

  /**
   * Select the credential for this placement
   *
   * @param {Number|"new"} credentialId
   */
  selectCred(credentialId) {
    this.setState({ credentialId });
  }

  /**
   * Request context when component mounts.
   */
  componentDidMount() {
    const queryParameters = window.location.search;

    let analyticsId;
    try {
      analyticsId = qs.parse(queryParameters, { ignoreQueryPrefix: true })
        .analyticsId;
    } catch (err) {}

    if (analyticsId) {
      ReactGA.initialize(analyticsId);
      ReactGA.set({ title: "GT Cred" });
      ReactGA.pageview(window.location.pathname);
    }

    agent.getContext().then((response) => {
      this.setState({ versionInfo: response.data.version });
      this.setState({ context: response.context });
      agent.hasAPIKey().then((hasAPIKey) => {
        this.setState(hasAPIKey);
        this.state.apiKey
          ? agent
              .getPlacement()
              .then((issuanceId) => this.setState({ issuanceId }))
          : null;
      });
    });
  }

  /**
   * @return {object} Render the App component.
   */
  render() {
    return (
      <Layout versionInfo={this.state.versionInfo || ""}>
        {this.state.context ? (
          <div>
            <code>{JSON.stringify(this.state.context)}</code>
            <GTCredInfo />
            {"instructor" === this.state.userRole ? (
              <>
                {this.state.apiKey === false ? (
                  <EnterKey setAPIKey={this.setAPIKey} />
                ) : null}
                {this.state.apiKey && !this.state.credentialId ? (
                  <SelectCred onSelect={this.selectCred} />
                ) : null}
                {"new" === this.state.credentialId ? (
                  <CreateCred onCreate={this.createCred} />
                ) : null}
                {typeof this.state.credentialId === "number" &&
                !this.state.issuanceId ? (
                  <SelectIssuance credentialId={this.state.credentialId} />
                ) : null}
                {"new" === this.state.issuanceId ? (
                  <CreateIssuance
                    credentialId={this.state.credentialId}
                    onCreate={this.createIssuance}
                  />
                ) : null}
                {typeof this.state.issuanceId === "number" ? (
                  <ListCred issuanceId={this.state.issuanceId} />
                ) : null}
              </>
            ) : (
              <>
                {"learner" === this.state.context.userRole ? ( // &&
                  // this.state.issuanceId ? (
                  <ClaimCred />
                ) : null}
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
  }
}

export default App;
