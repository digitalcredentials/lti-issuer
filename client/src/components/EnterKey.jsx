import React, { useState } from "react";
import { View } from "@instructure/ui-view";
import { Button } from "@instructure/ui-buttons";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";
import { PropTypes } from "prop-types";
import PageHead from "./PageHead";

/**
 * @param {Object} props
 * @return {Component}
 */
const EnterKey = (props) => {
  const [keyinput, setKeyInput] = useState(null);

  return (
    <View as="div" margin="medium none none none" width="75%">
      <PageHead>Enter your cred-admin API Key</PageHead>
      <View as="div" textAlign="start" padding="medium medium none medium">
        <FormFieldGroup rowSpacing="small" layout="inline" vAlign="middle">
          <TextInput
            renderLabel="API Key"
            onChange={(e) => setKeyInput(e.target.value)}
            name="keyinput"
          />
        </FormFieldGroup>
        <View display="block" padding="medium none">
          <Button
            display="block"
            textAlign="center"
            color="success"
            interaction={keyinput ? "enabled" : "disabled"}
            onClick={() => props.setAPIKey(keyinput)}
          >
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

EnterKey.propTypes = {
  setAPIKey: PropTypes.func,
};

export default EnterKey;
