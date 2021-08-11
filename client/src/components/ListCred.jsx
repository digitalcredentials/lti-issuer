import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Button } from "@instructure/ui-buttons";
import { Table } from "@instructure/ui-table";
import { Link } from "@instructure/ui-link";
import { PropTypes } from "prop-types";
import util from "../util";
import { getEnrolled } from "../agent";

/**
 * similar to ViewCredTeacher but will show status of credential
 *
 * @param {Object} props
 * @return {Component}
 */
const ListCred = (props) => {
  const [credential, setCredential] = useState("");
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    getEnrolled(props.issuanceId).then((issuance) => {
      setCredential(`${issuance.credential.title} - ${issuance.name}`);
      setRecipients(issuance.recipients);
    });
  }, []);

  return (
    <View as="div" margin="medium none none none">
      <View as="div" textAlign="start" padding="medium medium none medium">
        {recipients.length <= 0 ? (
          <Text as="div">
            Once students have earned this credential, their names will begin
            appearing in the list below.
          </Text>
        ) : null}
        <div style={{ display: "flex", "justify-content": "space-between" }}>
          <Text size="large" color="secondary">
            Recipients for:{" "}
          </Text>
          <Text size="large">{credential}</Text>
          <Button onClick={props.onReconfigure}>Reconfigure</Button>
        </div>
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
        <Table caption="Modules and credentials">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Name">
                <Text size="large">Name</Text>
              </Table.ColHeader>
              <Table.ColHeader id="Email">
                <Text size="large">Email</Text>
              </Table.ColHeader>
              <Table.ColHeader id="Status">
                <Text size="large">Status</Text>
              </Table.ColHeader>
              <Table.ColHeader id="Approval_Date">
                <Text size="large">Approval Date</Text>
              </Table.ColHeader>
              <Table.ColHeader id="Issue_Date">
                <Text size="large">Issue Date</Text>
              </Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {recipients.map((recipient) => (
              <Table.Row key={recipient.id}>
                <Table.RowHeader>{recipient.name}</Table.RowHeader>
                <Table.Cell>
                  <Link href={"mailto:" + recipient.email}>
                    {recipient.email}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {recipient.RecipientIssuance.isIssued ? (
                    <Text color="success">Claimed</Text>
                  ) : (
                    <Text color="warning">Pending</Text>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {recipient.RecipientIssuance.isApproved
                    ? util.formatDate(recipient.RecipientIssuance.approvedAt)
                    : ""}
                </Table.Cell>
                <Table.Cell>
                  {recipient.RecipientIssuance.isIssued
                    ? util.formatDate(recipient.RecipientIssuance.issuedAt)
                    : ""}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </View>
    </View>
  );
};
ListCred.propTypes = {
  issuanceId: PropTypes.string,
  onReconfigure: PropTypes.function,
};

export default ListCred;
