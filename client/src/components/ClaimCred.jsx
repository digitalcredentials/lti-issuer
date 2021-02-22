import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { List } from "@instructure/ui-list";
import { Link } from "@instructure/ui-link";
import { Img } from "@instructure/ui-img";

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
      criteria: [],
      complete: false,
      qrImgSrc: "",
      qrLink: "",
    };
  }

  /**
   *
   */
  componentDidMount() {
    // info about credential will be passed in as props
    this.setState({
      credential: "Advanced Credential",
      criteria: ["Show up", "Try your best", "Be cool"],
      complete: true,
      qrImgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1920px-QR_code_for_mobile_English_Wikipedia.svg.png",
      qrLink: "https://google.com",
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
          <Text size="medium">Criteria:</Text>
          <List margin="small 0 medium">
            {this.state.criteria.map((li) => (
              <List.Item key={li}>{li}</List.Item>
            ))}
          </List>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="medium">
            Status:{" "}
            {this.state.complete ? (
              <Text color="success">Complete</Text>
            ) : (
              <Text color="warning">Incomplete</Text>
            )}
          </Text>
        </View>
        {this.state.complete ? (
          <div>
            <View
              as="div"
              textAlign="start"
              padding="medium medium none medium"
            >
              <Text size="small" color="secondary">
                You can now claim this credential by scanning the QR code below
                or by clicking{" "}
                <Link href={this.state.qrLink} target="_blank">
                  here
                </Link>
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
          </div>
        ) : (
          <View as="div" textAlign="start" padding="medium medium none medium">
            <Text size="small" color="secondary">
              Complete requirements to claim this credential
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default ClaimCred;
