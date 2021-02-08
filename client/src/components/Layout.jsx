import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@instructure/ui";

const Layout = ({ children, versionInfo }) => (
  <View as="div" width="100%">
    <View as="div" margin="none auto" maxWidth="59.25rem" minWidth="20.00rem">
      {children}
      <View as="div" padding="medium" textAlign="center">
        <Text color="secondary" size="x-small">
          {versionInfo}
        </Text>
      </View>
    </View>
  </View>
);
Layout.propTypes = {
  children: PropTypes.node,
  versionInfo: PropTypes.string,
};

export default Layout;
