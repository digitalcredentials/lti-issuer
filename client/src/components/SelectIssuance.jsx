import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { IconAddSolid } from "@instructure/ui-icons";
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
              renderLabel="Select an Issuance"
              onChange={this.handleSelect}
              value={this.state.selected}
              placeholder=""
            >
              {this.state.issuances.map((issuance) => (
                <SimpleSelect.Option
                  id={issuance.id.toString(10)}
                  key={issuance.id}
                  value={issuance.id.toString(10)}
                >
                  {issuance.name} - {issuance.issueDate}
                </SimpleSelect.Option>
              ))}
              <SimpleSelect.Option
                id="new"
                value="new"
                renderBeforeLabel={<IconAddSolid />}
              >
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
  credentialId: PropTypes.string,
  onSelect: PropTypes.func,
};

export default SelectIssuance;
