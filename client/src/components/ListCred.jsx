import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Table } from "@instructure/ui-table";
import { Link } from "@instructure/ui-link";

// similar to ViewCredTeacher but will show status of credential
class ListCred extends React.Component {
  constructor() {
    super();
    this.state = {
      credential: "",
      recipients: []
    };
  }

  // particular credential and recipient info will be passed into this component via props
  componentDidMount() {
    this.setState({
      credential: "Tennis Credential",
      recipients: [
        {
          name: "Chris Yang",
          email: "cyang419@gatech.edu",
          claimed: true,
          approvalDate: "12/22/20",
          issueDate: "12/27/20"
        },
        {
          name: "Stuart Freeman",
          email: "stuart@gatech.edu",
          claimed: false,
          approvalDate: "12/12/20",
          issueDate: null
        }
      ]
    });
  }
  render() {
    return (
      <View as="div" margin="medium none none none">
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="large" color="secondary">
            Recipients for:{" "}
          </Text>
          <Text size="large">{this.state.credential}</Text>
          <div
            style={{
              borderBottom: "solid",
              borderColor: "rgba(0,48,87,1)",
              borderWidth: "3px",
              marginTop: "17px"
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
              {this.state.recipients.map(recipient => (
                <Table.Row>
                  <Table.RowHeader>{recipient.name}</Table.RowHeader>
                  <Table.Cell>
                    <Link href={"mailto:" + recipient.email}>
                      {recipient.email}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {recipient.claimed ? (
                      <Text color="success">Claimed</Text>
                    ) : (
                      <Text color="warning">Pending</Text>
                    )}
                  </Table.Cell>
                  <Table.Cell>{recipient.approvalDate}</Table.Cell>
                  <Table.Cell>
                    {recipient.issueDate ? recipient.issueDate : ""}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </View>
      </View>
    );
  }
}

export default ListCred;
