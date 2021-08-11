import React from "react";
import { View } from "@instructure/ui-view";
import { Heading } from "@instructure/ui-heading";
import PropTypes from "prop-types";

/**
 * @param {Object} props
 * @return {Component}
 */
const PageHead = ({ children }) => {
  return (
    <View as="div" textAlign="start" padding="none medium">
      <Heading level="h3">{children}</Heading>
      <div
        style={{
          borderBottom: "solid",
          borderColor: "rgba(0,48,87,1)",
          borderWidth: "3px",
          marginTop: "17px",
        }}
      ></div>
    </View>
  );
};
PageHead.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageHead;
