import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Table } from "@instructure/ui-table";
import { Select } from "@instructure/ui-select";

/**
 * similar to ViewCredTeacher but will show status of credential
 */
class ViewCredStudent extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      modules: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    // TODO: component will retrieve data from backend regarding modules and credentials associated with them and update state
    this.setState({
      modules: [
        {
          name: "Module 1",
          credentials: [
            {
              cred: "Novice Credential",
              awarded: false,
            },
            {
              cred: "Intermediate Credential",
              awarded: true,
            },
            {
              cred: "Advanced Credential",
              awarded: true,
            },
          ],
        },
        {
          name: "Module 2",
          credentials: [
            {
              cred: "Cooking Credential",
              awarded: true,
            },
            {
              cred: "Tennis Credential",
              awarded: true,
            },
            {
              cred: "Chess Credential",
              awarded: true,
            },
          ],
        },
      ],
    });
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <View as="div" margin="medium none none none">
        <View as="div" textAlign="start" padding="medium medium none medium">
          <Text size="large">View Credentials</Text>
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
                <Table.ColHeader id="Module">
                  <Text size="large">Module</Text>
                </Table.ColHeader>
                <Table.ColHeader id="Credentials">
                  <Text size="large">Credentials</Text>
                </Table.ColHeader>
                <Table.ColHeader id="Year">
                  <Text size="large">Status</Text>
                </Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {this.state.modules.map((module) => (
                <Table.Row key={module.id}>
                  <Table.RowHeader>{module.name}</Table.RowHeader>
                  <Table.Cell>
                    <Select>
                      {module.credentials.map((cred) => {
                        <Select.Option id={cred} key={cred}>
                          {cred.cred}
                        </Select.Option>;
                      })}
                    </Select>
                  </Table.Cell>
                  <Table.Cell>
                    <Text color="warning">Pending</Text>
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

export default ViewCredStudent;
