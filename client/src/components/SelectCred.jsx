import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { IconAddSolid } from "@instructure/ui-icons";
import { PropTypes } from "prop-types";
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
    this.state = { value: null };
    this.handleSelect = this.handleSelect.bind(this);
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
   * @param {Event} e
   */
  handleSelect(e, { id, value }) {
    this.setState({ value });
    this.props.onSelect(value);
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
            <SimpleSelect
              renderLabel="Select a Credential"
              onChange={this.handleSelect}
              value={this.state.selected}
              defaultValue="new"
            >
              {this.state.credentials.map((cred) => (
                <SimpleSelect.Option
                  id={cred.id.toString(10)}
                  key={cred.id}
                  value={cred.id.toString(10)}
                >
                  {cred.title}
                </SimpleSelect.Option>
              ))}
              <SimpleSelect.Option
                id="new"
                value="new"
                renderBeforeLabel={<IconAddSolid />}
              >
                Create Credential
              </SimpleSelect.Option>
            </SimpleSelect>
          ) : null}
        </View>
      </View>
    );
  }
}

SelectCredential.propTypes = {
  onSelect: PropTypes.func,
};

export default SelectCredential;
