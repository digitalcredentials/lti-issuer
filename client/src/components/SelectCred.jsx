import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { SimpleSelect } from "@instructure/ui-simple-select";
import agent from "../agent";

/**
 * similar to ViewCredTeacher but will show status of credential
 */
class SelectCredential extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {};
  }

  /**
   *
   */
  componentDidMount() {
    agent.getCredentials().then((credentials) => {
      this.setState({ credentials });
    });
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div" margin="medium none none none">
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="large">Select a Credential</Text>
          <div
            style={{
              borderBottom: "solid",
              borderColor: "rgba(0,48,87,1)",
              borderWidth: "3px",
              marginTop: "17px",
            }}
          ></div>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          {this.state.credentials ? (
            <SimpleSelect>
              {this.state.credentials.map((cred) => {
                <SimpleSelect.Option id={cred.id} key={cred.id}>
                  {cred.title}
                </SimpleSelect.Option>;
              })}
              <SimpleSelect.Option id="new">
                Create Credential
              </SimpleSelect.Option>
            </SimpleSelect>
          ) : null}
        </View>
      </View>
    );
  }
}

export default SelectCredential;
