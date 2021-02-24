import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { PropTypes } from "prop-types";
import agent from "../agent";

/**
 *
 */
class SelectIssuance extends React.Component {
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
    agent.getIssuances(this.props.credentialId).then((issuances) => {
      this.setState({ issuances });
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
          <Text size="large">Select an Issuance</Text>
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
          {this.state.issuances ? (
            <SimpleSelect
              onChange={this.handleSelect}
              value={this.state.selected}
              placeholder=""
            >
              {this.state.issuances.map((issuance) => (
                <SimpleSelect.Option
                  id={issuance.id}
                  key={issuance.id}
                  value={issuance.id}
                >
                  {issuance.name} - {issuance.issueDate}
                </SimpleSelect.Option>
              ))}
              <SimpleSelect.Option id="new" value="new">
                Create Issuance
              </SimpleSelect.Option>
            </SimpleSelect>
          ) : null}
        </View>
      </View>
    );
  }
}

SelectIssuance.propTypes = {
  credentialId: PropTypes.number,
  onSelect: PropTypes.func,
};

export default SelectIssuance;
