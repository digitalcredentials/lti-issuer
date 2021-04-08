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
    this.props.onCreate(
      this.state.group,
      this.state.title,
      this.buildBadgeTemplate()
    );
  }

  /**
   * @return {Object}
   */
  buildBadgeTemplate() {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/jws/v1",
        "https://w3id.org/dcc/v1",
      ],
      id: "{{AWARD_URL}}",
      type: ["VerifiableCredential", "Assertion"],
      issuer: {
        id: "{{ISSUER_DID}}",
        name: "{{ISSUER_NAME}}",
      },
      recipient: {
        type: "email",
        identity: "{{RECIPIENT_EMAIL}}",
      },
      issuanceDate: "{{DATE}}",
      credentialSubject: {
        id: "{{RECIPIENT_DID}}",
        hasCredential: {
          id: "{{ISSUANCE_URL}}",
          type: "BadgeClass",
          name: this.state.title,
          image:
            'data:image/svg+xml;utf8,<svg width="210mm" height="297mm" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M33.946 35.671h105v74h-105z"/><g fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M114.14 50.191v23.888l11.219-11.219 11.78 11.78V50.191z"/><path d="M143.64 36.581a18 18 0 0 1-18 18 18 18 0 0 1-18-18 18 18 0 0 1 18-18 18 18 0 0 1 18 18z" fill="#fff"/><path d="M140.64 36.581a15 15 0 0 1-15 15 15 15 0 0 1-15-15 15 15 0 0 1 15-15 15 15 0 0 1 15 15z"/></g><g fill="#fff" stroke-width=".265" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;inline-size:38.9966;white-space:pre" aria-label="VC"><path d="M113.456 30.4h3.2l3.274 9.112 3.266-9.112h3.2l-4.573 12.344h-3.795zM137.823 42.07q-.876.455-1.827.686-.951.232-1.985.232-3.084 0-4.886-1.72-1.803-1.728-1.803-4.68 0-2.96 1.803-4.68 1.802-1.728 4.886-1.728 1.034 0 1.985.232.95.231 1.827.686v2.555q-.885-.604-1.745-.885t-1.81-.28q-1.704 0-2.68 1.09-.975 1.092-.975 3.01 0 1.91.976 3.002.975 1.09 2.679 1.09.95 0 1.81-.28t1.745-.885z"/></g><g fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M43.576 47.774h56.616M43.576 60.222h56.616M43.576 72.671h56.616M43.576 85.12h85.739M43.576 97.568h85.739"/></g></svg>',
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
