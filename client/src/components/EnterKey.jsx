import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Button } from "@instructure/ui-buttons";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";

/**
 *
 */
class EnterKey extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      value: "value",
    };
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div" margin="medium none none none" width="75%">
        <View as="div" textAlign="start" padding="none medium">
          <Text size="large">Enter your cred-admin API Key</Text>
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
          <FormFieldGroup rowSpacing="small" layout="inline" vAlign="middle">
            <TextInput label="API Key" />
          </FormFieldGroup>
          <View display="block" padding="medium none">
            <Button display="block" textAlign="center" color="success">
              Submit
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default EnterKey;
