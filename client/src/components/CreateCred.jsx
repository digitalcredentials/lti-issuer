import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Button } from "@instructure/ui-buttons";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";
import { TextArea } from "@instructure/ui-text-area";
import { PropTypes } from "prop-types";
import agent from "../agent";

/**
 *
 */
class CreateCred extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      groups: null,
      group: null,
      title: null,
      description: null,
      criteria: null,
    };
    this.getValue = this.getValue.bind(this);
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildBadgeTemplate = this.buildBadgeTemplate.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    agent.getGroups().then((groups) => this.setState({ groups }));
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
   * @param {Event} e
   */
  handleGroupSelect(e, { id, value: group }) {
    this.setState({ group });
  }

  /**
   *
   */
  handleSubmit() {
    this.props.onCreate(this.buildBadgeTemplate());
  }

  /**
   * @return {Object}
   */
  buildBadgeTemplate() {
    // TODO fix assertion, badgeclass, and image
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3c-ccg.github.io/lds-jws2020/contexts/lds-jws2020-v1.json",
        "https://w3c-ccg.github.io/vc-ed-models/contexts/v1/context.json",
      ],
      id: "https://example.com/assertions/1001",
      type: ["VerifiableCredential", "Assertion"],
      issuer: {
        id: "{{ISSUER_DID}}",
      },
      issuanceDate: "{{DATE}}",
      credentialSubject: {
        id: "{{RECIPIENT_DID}}",
        hasCredential: {
          id: "https://example.com/badgeclasses/123",
          type: "BadgeClass",
          name: this.state.title,
          image: "data:image/png;base64,...",
          description: this.state.description,
          criteria: {
            narrative: this.state.criteria,
          },
        },
      },
    };
  }

  /**
   * @return {Component}
   */
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
              marginTop: "17px",
            }}
          ></div>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="small" color="secondary">
            Here you can create a GT Cred
          </Text>
        </View>
        {this.state.groups ? (
          <View as="div" textAlign="start" padding="medium medium none medium">
            <FormFieldGroup rowSpacing="small" layout="inline" vAlign="middle">
              <TextInput
                label="Title"
                name="title"
                isRequired={true}
                onChange={this.getValue}
              />
              <TextArea
                label="Description"
                name="description"
                required={true}
                onChange={this.getValue}
              />
              <TextArea
                label="Criteria"
                name="criteria"
                required={true}
                onChange={this.getValue}
              />
              <SimpleSelect
                renderLabel="Issuing Department"
                isRequired={true}
                value={this.state.group}
                onChange={this.handleGroupSelect}
              >
                {this.state.groups.map((group) => (
                  <SimpleSelect.Option
                    key={group.id}
                    id={group.id}
                    value={group.id}
                  >
                    {group.name}
                  </SimpleSelect.Option>
                ))}
              </SimpleSelect>
            </FormFieldGroup>
            <View display="block" padding="medium none">
              <Button
                display="block"
                textAlign="center"
                color="success"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

CreateCred.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateCred;
