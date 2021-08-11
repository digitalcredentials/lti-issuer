import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { IconAddSolid } from "@instructure/ui-icons";
import { PropTypes } from "prop-types";
import PageHead from "./PageHead";
import { getCredentials } from "../agent";

/**
 * @param {Object} props
 * @return {Component}
 */
const SelectCredential = (props) => {
  const [credentials, setCredentials] = useState(null);
  const [selected, setSelected] = useState("new");

  useEffect(() => {
    getCredentials().then((c) => setCredentials(c));
  }, []);

  /**
   * @param {Event} e
   */
  const handleSelect = (e, { value }) => {
    setSelected(value);
    props.onSelect(value);
  };

  return (
    <View as="div" margin="medium none none none">
      <PageHead>Select a Credential</PageHead>
      <View as="div" textAlign="start" padding="medium medium none medium">
        {credentials ? (
          <SimpleSelect
            renderLabel="Select a Credential"
            onChange={handleSelect}
            value={selected}
            defaultValue="new"
          >
            {credentials.map((cred) => (
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
};

SelectCredential.propTypes = {
  onSelect: PropTypes.func,
};

export default SelectCredential;
