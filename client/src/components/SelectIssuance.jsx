import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { IconAddSolid } from "@instructure/ui-icons";
import { PropTypes } from "prop-types";
import moment from "moment-timezone";
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
              defaultValue="new"
            >
              {this.state.issuances.map((issuance) => (
                <SimpleSelect.Option
                  id={issuance.id.toString(10)}
                  key={issuance.id}
                  value={issuance.id.toString(10)}
                >
                  {issuance.name} - {this.formatDate(issuance.issueDate)}
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

  /**
   * Format an isodate for display
   *
   * @param {String} inputDate
   * @return {String}
   */
  formatDate(inputDate) {
    const date = moment.tz(
      inputDate,
      [moment.ISO_8601, "llll", "LLLL", "lll", "ll", "LL", "l", "L"],
      "en",
      "UTC"
    );
    return `${date.format("MMMM")} ${date.format("D")}, ${date.format("YYYY")}`;
  }
}

SelectIssuance.propTypes = {
  credentialId: PropTypes.string,
  onSelect: PropTypes.func,
};

export default SelectIssuance;
