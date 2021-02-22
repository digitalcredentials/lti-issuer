import React from "react";
import ReactGA from "react-ga";
import qs from "qs";
import { Spinner, View } from "@instructure/ui";
import agent from "../agent";
import Layout from "./Layout";
import ViewCredTeacher from "./ViewCredTeacher";
import ViewCredStudent from "./ViewCredStudent";
import GTCredInfo from "./GTCredInfo";
import CreateCred from "./CreateCred";
import ClaimCred from "./ClaimCred";
import ListCred from "./ListCred";
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
    };
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
      agent.getAPIKey().then((apiKey) => {
        this.setState({ apiKey });
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
            {this.state.apiKey === false ? <EnterKey /> : null}
            <ViewCredTeacher />
            <ViewCredStudent />
            <ListCred />
            <CreateCred />
            <ClaimCred />
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
