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
import EnterKey from "./EnterKey";

/** App top-level component */
class App extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      gotContext: false,
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
      this.setState({ gotContext: true });
      if (response.data.version) {
        this.setState({ versionInfo: response.data.version });
        this.setState({ context: response.context });
      }
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
        {this.state.gotContext ? (
          <div>
            <code>{JSON.stringify(this.state.context)}</code>
            <GTCredInfo />
            {this.state.apiKey === false &&
            "instructor" === this.state.context.userRole ? (
              <EnterKey setAPIKey={this.setAPIKey} />
            ) : null}
            {this.state.apiKey &&
            "instructor" === this.state.context.userRole &&
            !this.state.credentialId ? (
              <SelectCred onSelect={this.selectCred} />
            ) : null}
            {"instructor" === this.state.context.userRole &&
            "new" === this.state.credentialId ? (
              <CreateCred onCreate={this.createCred} />
            ) : null}
            {"instructor" === this.state.context.userRole &&
            this.state.issuanceId ? (
              <ListCred />
            ) : null}
            {"learner" === this.state.context.userRole &&
            this.state.issuanceId ? (
              <ClaimCred />
            ) : null}
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
