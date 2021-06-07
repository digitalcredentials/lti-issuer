import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Link } from "@instructure/ui-link";
import { Img } from "@instructure/ui-img";
import agent from "../agent";

/**
 *
 */
class ClaimCred extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      credential: "",
      qrImgSrc: "",
      qrLink: "",
    };
  }

  /**
   *
   */
  componentDidMount() {
    agent.postClaim().then((award) => {
      this.setState({
        credential: award.title,
        qrImgSrc: award.qr,
        qrLink: award.url,
      });
    });
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div" margin="medium none none none" width="75%">
        <View as="div" textAlign="start" padding="none medium">
          <Text size="large">Claim GT Cred</Text>
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
          <Text size="large">{this.state.credential}</Text>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="small" color="secondary">
            This certifies that the recipient has completed the credential{" "}
            {this.state.credential}
          </Text>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="medium">
            Status: <Text color="success">Complete</Text>
          </Text>
        </View>
        <div>
          <BrowserView>
            <View
              as="div"
              textAlign="start"
              padding="medium medium none medium"
            >
              <Text size="small" color="secondary">
                You can now claim this credential by scanning the QR code below.
              </Text>
            </View>
            <View
              as="div"
              width="250px"
              height="250px"
              textAlign="center"
              padding="small medium none medium"
            >
              <Img src={this.state.qrImgSrc} constrain="contain" />
            </View>
          </BrowserView>
          <MobileView>
            <View
              as="div"
              textAlign="start"
              padding="medium medium none medium"
            >
              <Text size="small" color="secondary">
                You can now claim this credential by{" "}
                <Link href={this.state.qrLink} target="_blank">
                  tapping this link using the mobile device containing your
                  digital wallet
                </Link>
                .
              </Text>
            </View>
          </MobileView>
        </div>
      </View>
    );
  }
}

export default ClaimCred;
