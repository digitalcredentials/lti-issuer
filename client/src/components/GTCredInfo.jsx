import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";

/**
 *
 */
class GTCredInfo extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      value: "something",
    };
  }

  /**
   *
   */
  componentDidMount() {}

  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div" width="75%" margin="medium none none none">
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="x-large" letterSpacing="expanded">
            GT Cred
          </Text>
          <div
            style={{
              borderBottom: "solid",
              borderColor: "rgba(179,163,105,1)",
              borderWidth: "3px",
              marginTop: "17px",
            }}
          ></div>
        </View>
        <View as="div" textAlign="start" padding="medium">
          <Text size="medium" lineHeight="condensed" color="secondary">
            GT It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using &lsquo;Content here,
            content here&rsquo;, making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum
            as their default model text, and a search for &lsquo;lorem
            ipsum&rsquo; will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like).
          </Text>
        </View>
      </View>
    );
  }
}

export default GTCredInfo;
