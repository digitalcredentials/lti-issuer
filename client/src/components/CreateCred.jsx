import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Button } from "@instructure/ui-buttons";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";
import { TextArea } from "@instructure/ui-text-area";
import { PropTypes } from "prop-types";
import { getGroups } from "../agent";
import PageHead from "./PageHead";
import { logo, badge } from "../base64images";

/**
 * @param {Object} props
 * @return {Component}
 */
const CreateCred = (props) => {
  const [groups, setGroups] = useState(null);
  const [group, setGroup] = useState("");
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [criteria, setCriteria] = useState(null);

  /**
   *
   */
  useEffect(() => {
    getGroups().then((groups) => setGroups(groups));
  }, []);

  /**
   *
   */
  const handleSubmit = () => {
    props.onCreate(group, title, buildBadgeTemplate());
  };

  /**
   * @return {Object}
   */
  const buildBadgeTemplate = () => {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/ed25519-2020/v1",
        "https://w3id.org/dcc/v1",
        {
          competencyRequired:
            "http://schema.org/EducationalOccupationalCredential#competencyRequired",
          credentialCategory:
            "http://schema.org/EducationalOccupationalCredential#credentialCategory",
        },
      ],
      id: "{{AWARD_URL}}",
      type: ["VerifiableCredential", "Assertion"],
      issuer: {
        type: "Issuer",
        id: "{{ISSUER_DID}}",
        name: "{{ISSUER_NAME}}",
        image: logo,
      },
      issuanceDate: "{{DATE}}",
      credentialSubject: {
        type: "Person",
        name: "{{RECIPIENT_NAME}}",
        id: "{{RECIPIENT_DID}}",
        hasCredential: {
          id: "{{ISSUANCE_URL}}",
          type: "EducationalOccupationalCredential",
          name: title,
          image: badge,
          description: description,
          competencyRequired: criteria,
          credentialCategory: "badge",
        },
      },
    };
  };

  return (
    <View as="div" margin="medium none none none" width="75%">
      <PageHead>Create Credential</PageHead>
      <View as="div" textAlign="start" padding="medium medium none medium">
        <Text size="small" color="secondary">
          Here you can create a credential
        </Text>
      </View>
      {groups ? (
        <View as="div" textAlign="start" padding="medium medium none medium">
          <FormFieldGroup rowSpacing="small" layout="inline" vAlign="middle">
            <TextInput
              renderLabel="Title"
              name="title"
              isRequired={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              label="Description"
              name="description"
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextArea
              label="Criteria"
              name="criteria"
              required={true}
              onChange={(e) => setCriteria(e.target.value)}
            />
            <SimpleSelect
              renderLabel="Issuing Department"
              isRequired={true}
              value={group}
              onChange={(e, { value }) => setGroup(value)}
            >
              <SimpleSelect.Option value=""></SimpleSelect.Option>
              {groups.map((group) => (
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
              interaction={
                title && description && criteria && group !== ""
                  ? "enabled"
                  : "disabled"
              }
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

CreateCred.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateCred;
