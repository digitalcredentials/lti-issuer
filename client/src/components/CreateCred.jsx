import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Button } from "@instructure/ui-buttons";
import { Select } from "@instructure/ui-select";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";
import { TextArea } from "@instructure/ui-text-area";

class CreateCred extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "value"
    };
  }
  render() {
    return (
      <View as="div" margin="medium none none none" width="75%">
        <View as="div" textAlign="start" padding="none medium">
          <Text size="large">Create GT Cred</Text>
          <div
            style={{
              borderBottom: "solid",
              borderColor: "rgba(0,48,87,1)",
              borderWidth: "3px",
              marginTop: "17px"
            }}
          ></div>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="small" color="secondary">
            Here you can create a GT Cred
          </Text>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <FormFieldGroup rowSpacing="small" layout="inline" vAlign="middle">
            <TextInput label="Title" />
            <TextArea label="Description" />
            <TextArea label="Criteria" />
            <Select renderLabel="Issuing Department" />
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

export default CreateCred;
