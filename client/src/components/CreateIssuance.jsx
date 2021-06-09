import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { AccessibleContent } from "@instructure/ui-a11y-content";
import { Button } from "@instructure/ui-buttons";
import { Calendar } from "@instructure/ui-calendar";
import { DateInput } from "@instructure/ui-date-input";
import { FormFieldGroup } from "@instructure/ui-form-field";
import { TextInput } from "@instructure/ui-text-input";
import { PropTypes } from "prop-types";
import { IconButton } from "@instructure/ui-buttons";
import {
  IconArrowOpenStartSolid,
  IconArrowOpenEndSolid,
} from "@instructure/ui-icons";
import util from "../util";

/**
 *
 */
class CreateIssuance extends React.Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      name: null,
      isShowingCalendar: false,
      todayDate: util.parseDate(new Date().toISOString()),
      selectedDate: null,
      renderedDate: util.parseDate(new Date().toISOString()),
      messages: [],
    };
    this.getValue = this.getValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateMonth = this.generateMonth.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowCalendar = this.handleShowCalendar.bind(this);
    this.handleHideCalendar = this.handleHideCalendar.bind(this);
    this.handleValidateDate = this.handleValidateDate.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleRenderNextMonth = this.handleRenderNextMonth.bind(this);
    this.handleRenderPrevMonth = this.handleRenderPrevMonth.bind(this);
  }

  /**
   * @param {String} e
   */
  getValue(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  }

  /**
   *
   */
  handleSubmit() {
    this.props.onCreate(this.state.name, this.state.selectedDate);
  }

  /**
   * @param {String} renderedDate
   * @return {Date[]}
   */
  generateMonth(renderedDate = this.state.renderedDate) {
    const date = util.parseDate(renderedDate).startOf("month").startOf("week");

    return Array.from({ length: Calendar.DAY_COUNT }, () => {
      const currentDate = date.clone();
      date.add(1, "days");
      return currentDate;
    });
  }

  /**
   * @param {Event} event
   */
  handleChange(event, { value }) {
    const newDateStr = util.parseDate(value).toISOString();

    this.setState(({ renderedDate }) => ({
      value,
      selectedDate: newDateStr,
      renderedDate: newDateStr || renderedDate,
      messages: [],
    }));
  }

  /**
   * @param {Event} event
   */
  handleShowCalendar(event) {
    this.setState({ isShowingCalendar: true });
  }

  /**
   * @param {Event} event
   */
  handleHideCalendar(event) {
    this.setState(({ selectedDate, value }) => ({
      isShowingCalendar: false,
      value: selectedDate ? util.formatDate(selectedDate) : value,
    }));
  }

  /**
   * @param {Event} event
   */
  handleValidateDate(event) {
    this.setState(({ selectedDate, value }) => {
      // We don't have a selectedDate but we have a value. That means that the value
      // could not be parsed and so the date is invalid
      if (!selectedDate && value) {
        return {
          messages: [{ type: "error", text: "This date is invalid" }],
        };
      }
    });
  }

  /**
   * @param {Event} event
   */
  handleDayClick(event, { date }) {
    this.setState({
      selectedDate: date,
      renderedDate: date,
      messages: [],
    });
  }

  /**
   * @param {Event} event
   */
  handleSelectNextDay(event) {
    this.modifySelectedDate("day", 1);
  }

  /**
   * @param {Event} event
   */
  handleSelectPrevDay(event) {
    this.modifySelectedDate("day", -1);
  }

  /**
   * @param {Event} event
   */
  handleRenderNextMonth(event) {
    this.modifyRenderedDate("month", 1);
  }

  /**
   * @param {Event} event
   */
  handleRenderPrevMonth(event) {
    this.modifyRenderedDate("month", -1);
  }

  /**
   * @param {String} type
   * @param {Number} step
   */
  modifyRenderedDate(type, step) {
    this.setState(({ renderedDate }) => {
      return { renderedDate: this.modifyDate(renderedDate, type, step) };
    });
  }

  /**
   * @param {String} type
   * @param {Number} step
   */
  modifySelectedDate(type, step) {
    this.setState(({ selectedDate, renderedDate }) => {
      // We are either going to increase or decrease our selectedDate by 1 day.
      // If we do not have a selectedDate yet, we'll just select the first day of
      // the currently rendered month instead.
      const newDate = selectedDate
        ? this.modifyDate(selectedDate, type, step)
        : util.parseDate(renderedDate).startOf("month").toISOString();

      return {
        selectedDate: newDate,
        renderedDate: newDate,
        value: util.formatDate(newDate),
        messages: [],
      };
    });
  }

  /**
   * @param {String} dateStr
   * @param {String} type
   * @param {Number} step
   * @return {String}
   */
  modifyDate(dateStr, type, step) {
    const date = util.parseDate(dateStr);
    date.add(step, type);
    return date.toISOString();
  }

  /**
   * @return {Date[]}
   */
  renderWeekdayLabels() {
    const date = util.parseDate(this.state.renderedDate).startOf("week");

    return Array.from({ length: 7 }, () => {
      const currentDate = date.clone();
      date.add(1, "day");

      return (
        <AccessibleContent alt={currentDate.format("dddd")}>
          {currentDate.format("dd")}
        </AccessibleContent>
      );
    });
  }

  /**
   * @return {Component}
   */
  renderDays() {
    const { renderedDate, selectedDate, todayDate } = this.state;

    return this.generateMonth().map((date) => {
      const dateStr = date.toISOString();

      return (
        <DateInput.Day
          key={dateStr}
          date={dateStr}
          isSelected={date.isSame(selectedDate, "day")}
          isToday={date.isSame(todayDate, "day")}
          isOutsideMonth={!date.isSame(renderedDate, "month")}
          label={`${date.format("D")} ${date.format("MMMM")} ${date.format(
            "YYYY"
          )}`}
          onClick={this.handleDayClick}
        >
          {date.format("D")}
        </DateInput.Day>
      );
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const date = util.parseDate(this.state.renderedDate);

    const buttonProps = (type = "prev") => ({
      size: "small",
      withBackground: false,
      withBorder: false,
      renderIcon:
        type === "prev" ? (
          <IconArrowOpenStartSolid color="primary" />
        ) : (
          <IconArrowOpenEndSolid color="primary" />
        ),
      screenReaderLabel: type === "prev" ? "Previous month" : "Next month",
    });
    return (
      <View as="div" margin="medium none none none" width="75%">
        <View as="div" textAlign="start" padding="none medium">
          <Text size="large">Create Credential Issuance</Text>
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
          <Text size="small" color="secondary">
            Here you can create an Issuance
          </Text>
        </View>
        <View as="div" textAlign="start" padding="medium medium none medium">
          <FormFieldGroup
            description=""
            rowSpacing="small"
            layout="inline"
            vAlign="middle"
          >
            <TextInput
              renderLabel="Name"
              name="name"
              isRequired={true}
              onChange={this.getValue}
            />
            <DateInput
              renderLabel="Issue Date"
              onChange={this.handleChange}
              value={this.state.value}
              messages={this.state.messages}
              isShowingCalendar={this.state.isShowingCalendar}
              onRequestValidateDate={this.handleValidateDate}
              onRequestShowCalendar={this.handleShowCalendar}
              onRequestHideCalendar={this.handleHideCalendar}
              onRequestSelectNextDay={this.handleSelectNextDay}
              onRequestSelectPrevDay={this.handleSelectPrevDay}
              onRequestRenderNextMonth={this.handleRenderNextMonth}
              onRequestRenderPrevMonth={this.handleRenderPrevMonth}
              renderNavigationLabel={
                <span>
                  <div>{date.format("MMMM")}</div>
                  <div>{date.format("YYYY")}</div>
                </span>
              }
              renderPrevMonthButton={<IconButton {...buttonProps("prev")} />}
              renderNextMonthButton={<IconButton {...buttonProps("next")} />}
              renderWeekdayLabels={this.renderWeekdayLabels()}
            >
              {this.renderDays()}
            </DateInput>
          </FormFieldGroup>
          <View display="block" padding="medium none">
            <Button
              display="block"
              textAlign="center"
              color="success"
              interaction={
                this.state.name && this.state.selectedDate
                  ? "enabled"
                  : "disabled"
              }
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

CreateIssuance.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateIssuance;
