import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { IconAddSolid } from "@instructure/ui-icons";
import { PropTypes } from "prop-types";
import PageHead from "./PageHead";
import util from "../util";
import { getIssuances } from "../agent";

/**
 * @param {Object} props
 * @return {Component}
 */
const SelectIssuance = (props) => {
  const [selected, setSelected] = useState("new");
  const [issuances, setIssuances] = useState(null);

  useEffect(() => {
    getIssuances(props.credentialId).then((i) => setIssuances(i));
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
      <PageHead>Select an Issuance</PageHead>
      <View as="div" textAlign="start" padding="medium medium none medium">
        {issuances ? (
          <SimpleSelect
            renderLabel="Select an Issuance"
            onChange={handleSelect}
            value={selected}
            defaultValue="new"
          >
            {issuances.map((issuance) => (
              <SimpleSelect.Option
                id={issuance.id.toString(10)}
                key={issuance.id}
                value={issuance.id.toString(10)}
              >
                {issuance.name} - {util.formatDate(issuance.issueDate)}
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
};

SelectIssuance.propTypes = {
  credentialId: PropTypes.string,
  onSelect: PropTypes.func,
};

export default SelectIssuance;
