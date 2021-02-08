import React from "react";
import ReactGA from "react-ga";
import qs from "qs";
import { Spinner, View } from "@instructure/ui";
import agent from "../agent";
import Demo from "./Demo";
import Layout from "./Layout";

/** App top-level component */
class App extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      gotContext: false,
      versionInfo: null,
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
      ReactGA.set({ title: "LTI App" });
      ReactGA.pageview(window.location.pathname);
    }

    agent.getContext().then((response) => {
      this.setState({ gotContext: true });
      if (response.data.version) {
        this.setState({ versionInfo: response.data.version });
      }
    });
  }

  /**
   * @return {object} Render the App component.
   */
  render() {
    return (
      <Layout versionInfo={this.state.versionInfo || ""}>
        {this.state.gotContext ? (
          <Demo />
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
