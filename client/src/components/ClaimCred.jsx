import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Link } from "@instructure/ui-link";
import { Img } from "@instructure/ui-img";
import PageHead from "./PageHead";
import { postClaim } from "../agent";

/**
 * @return {Component}
 */
const ClaimCred = () => {
  const [credential, setCredential] = useState("");
  const [qrImgSrc, setQrImgSrc] = useState("");
  const [qrLink, setQrLink] = useState("");

  /**
   *
   */
  useEffect(() => {
    postClaim().then((award) => {
      setCredential(award.title);
      setQrImgSrc(award.qr);
      setQrLink(award.url);
    });
  }, []);

  return (
    <View as="div" margin="medium none none none" width="75%">
      <PageHead>Claim Credential</PageHead>
      <View as="div" textAlign="start" padding="medium medium none medium">
        <Text size="large">{credential}</Text>
      </View>
      <View as="div" textAlign="start" padding="medium medium none medium">
        <Text size="small" color="secondary">
          This certifies that the recipient has completed the credential{" "}
          {credential}
        </Text>
      </View>
      <View as="div" textAlign="start" padding="medium medium none medium">
        <Text size="medium">
          Status: <Text color="success">Complete</Text>
        </Text>
      </View>
      <div>
        <BrowserView>
          <View as="div" textAlign="start" padding="medium medium none medium">
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
            <Img src={qrImgSrc} constrain="contain" />
          </View>
        </BrowserView>
        <MobileView>
          <View as="div" textAlign="start" padding="medium medium none medium">
            <Text size="small" color="secondary">
              You can now claim this credential by{" "}
              <Link href={qrLink} target="_blank">
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
};

export default ClaimCred;
