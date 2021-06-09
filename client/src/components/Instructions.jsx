import React from "react";
import { PropTypes } from "prop-types";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Link } from "@instructure/ui-link";
import { List } from "@instructure/ui-list";
import InstallWallet from "./InstallWallet";

/**
 *
 */
class Instructions extends React.Component {
  /**
   *
   */
  constructor() {
    super();
  }

  /**
   *
   */
  componentDidMount() {}

  /**
   * @param {String} lmsType
   * @return {Component[]}
   */
  getLMSSpecificInstructions(lmsType) {
    return (
      {
        canvas: [
          <Text key="canvas.0">
            <Link
              href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-requirements-to-a-module/ta-p/1131"
              target="_blank"
              rel="noreferrer"
            >
              Add requirements to the Canvas module
            </Link>
            , ensuring that students cannot claim the credential until your
            criteria have been met
          </Text>,
        ],
      }[lmsType] || []
    );
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div" width="75%" margin="medium none none none">
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="x-large" letterSpacing="expanded">
            Verifiable Credentials
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
        {this.props.role === "instructor" ? (
          <View as="div" textAlign="start" padding="medium">
            <Text size="medium" lineHeight="condensed" color="secondary">
              This tool allows teachers to issue verifiable credentials
              automatically to students who have completed a set of
              requirements. Verifiable credentials are the digital equivalent of
              physical credentials. In the context of this tool, these digital
              credentials might be commonly referred to as badges or
              certificates. To get started:
              <List as="ol">
                <List.Item>
                  Select or create a credential, which you can issue multiple
                  times to multiple cohorts of students
                </List.Item>
                <List.Item>
                  Select or create an issuance for your credential, which is a
                  specific instance of a credential (i.e. an issuance might be
                  issued to students during a specific semester)
                </List.Item>
                {this.getLMSSpecificInstructions(this.props.lmsType).map(
                  (instruction, i) => (
                    <List.Item key={i}>{instruction}</List.Item>
                  )
                )}
              </List>
            </Text>
          </View>
        ) : (
          <View as="div" textAlign="start" padding="medium">
            <Text size="medium" lineHeight="condensed" color="secondary">
              You have earned a verifiable credential by completing a set of
              requirements defined by your teacher. Verifiable credentials are
              the digital equivalent of physical credentials. In the context of
              this tool, these digital credentials might be commonly referred to
              as badges or certificates. To get started:
              <List as="ol">
                <List.Item>
                  Ensure you have created a digital wallet for verifiable
                  credentials. We recommend &quot;CredWallet&quot;, created by
                  the Digital Credentials Consortium, which can be installed on
                  iOS and Android devices.
                  <InstallWallet />
                </List.Item>
                <List.Item>
                  If you&apos;re viewing this screen on your desktop, scan the
                  QR code below using the mobile device containing your digital
                  wallet to claim your credential.
                </List.Item>
                <List.Item>
                  If you&apos;re viewing this screen on the mobile device
                  containing your digital wallet, tap the link below to claim
                  your credential.
                </List.Item>
              </List>
            </Text>
          </View>
        )}
      </View>
    );
  }
}

Instructions.propTypes = {
  role: PropTypes.string,
  lmsType: PropTypes.string,
};

export default Instructions;
