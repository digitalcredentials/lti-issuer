import React from "react";
import agent from "../agent";
import { Text, View } from "@instructure/ui";

/**
 * This component requests an endpoint that does a basic check of
 * Canvas API communication, and displays a success or error message.
 */
class CanvasStatus extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      responseOk: null,
    };
  }

  /** Send status check request when component mounts. */
  componentDidMount() {
    this.setState({ isLoading: true });
    agent.Canvas.status()
      .then((response) => {
        if (!!response && !!response.status && response.status === "success") {
          this.setState({ isLoading: false, responseOk: true });
        } else {
          this.setState({ isLoading: false, responseOk: false });
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  }

  /** @return {object} */
  render() {
    return (
      <View display="block">
        <Text>Canvas API check: </Text>
        {!!this.state.isLoading ? <Text>...</Text> : ""}
        {!this.state.isLoading && this.state.responseOk ? (
          <Text color="success">success</Text>
        ) : (
          ""
        )}
        {!this.state.isLoading && !this.state.responseOk ? (
          <Text color="danger">error</Text>
        ) : (
          ""
        )}
      </View>
    );
  }
}

const Demo = () => {
  return (
    <View
      as="div"
      padding="small"
      maxWidth="90%"
      margin="small auto"
      textAlign="center"
    >
      <Text as="p">A new LTI</Text>
      <CanvasStatus />
    </View>
  );
};

export default Demo;
