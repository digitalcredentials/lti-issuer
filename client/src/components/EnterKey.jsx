import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Button } from "@instructure/ui-buttons";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";
import { PropTypes } from "prop-types";

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
      keyinput: null,
    };
    this.getValue = this.getValue.bind(this);
  }

  /**
   * @param {String} e
   */
  getValue(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  }

  /**
   * @param {Props} props
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
            <TextInput
              label="API Key"
              onChange={this.getValue}
              name="keyinput"
            />
          </FormFieldGroup>
          <View display="block" padding="medium none">
            <Button
              display="block"
              textAlign="center"
              color="success"
              onClick={() => this.props.setAPIKey(this.state.keyinput)}
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

EnterKey.propTypes = {
  setAPIKey: PropTypes.func,
};

export default EnterKey;
