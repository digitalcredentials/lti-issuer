import React from "react";
import { PropTypes } from "prop-types";
import { View } from "@instructure/ui-view";

// FIXME Get actual links to wallet app
const iOSUrl = "https://itunes.apple.com/us/app/";
const androidUrl = "https://play.google.com/";

const imageLinks = {
  ios: "/images/badge_appstore-lrg.svg",
  android: "/images/google-play-badge.svg",
};

/**
 *
 */
class MobileStoreButton extends React.Component {
  static propTypes = {
    store: PropTypes.oneOf(["ios", "android"]).isRequired,
    url: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
  };
  static defaultProps = {
    height: 60,
    width: 204,
  };

  /**
   * @return {Component}
   */
  render() {
    const { store, url, height, width, ...props } = this.props;

    const defaultLinkStyles = {
      background: `url(${imageLinks[store]}) no-repeat`,
      backgroundSize: "contain",
      display: "inline-block",
      overflow: "hidden",
      textDecoration: "none",
      height: "100%",
      width: "100%",
      padding: "5px",
    };

    return (
      <div
        style={{ height, width, display: "inline-block", padding: "10px" }}
        {...props}
      >
        <a
          style={defaultLinkStyles}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp;
        </a>
      </div>
    );
  }
}

/**
 * Buttons for mobile app stores
 */
export default class InstallWallet extends React.Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div">
        <MobileStoreButton store="ios" url={iOSUrl} />
        <MobileStoreButton store="android" url={androidUrl} />
      </View>
    );
  }
}
