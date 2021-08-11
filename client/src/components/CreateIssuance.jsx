import React, { useState, useEffect } from "react";
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
import PageHead from "./PageHead";
import util from "../util";

/**
 * @param {Object} props
 * @return {Component}
 */
const CreateIssuance = (props) => {
  const [name, setName] = useState(null);
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [renderedDate, setRenderedDate] = useState(
    util.parseDate(new Date().toISOString())
  );
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState(null);

  const todayDate = util.parseDate(new Date().toISOString());

  useEffect(() => {
    setValue(selectedDate ? util.formatDate(selectedDate) : value);
  }, [selectedDate, value]);

  /**
   * @param {String} renderedDate
   * @return {Date[]}
   */
  const generateMonth = () => {
    const date = util.parseDate(renderedDate).startOf("month").startOf("week");

    return Array.from({ length: Calendar.DAY_COUNT }, () => {
      const currentDate = date.clone();
      date.add(1, "days");
      return currentDate;
    });
  };

  /**
   * @param {Event} event
   */
  const handleChange = (event, { value: val }) => {
    const newDateStr = util.parseDate(val).toISOString();

    setValue(val);
    setSelectedDate(newDateStr);
    setRenderedDate(newDateStr || renderedDate);
    setMessages([]);
  };

  const handleHideCalendar = () => {
    setValue(selectedDate ? util.formatDate(selectedDate) : value);
    setIsShowingCalendar(false);
  };

  const handleValidateDate = () => {
    // We don't have a selectedDate but we have a value. That means that the value
    // could not be parsed and so the date is invalid
    if (!selectedDate && value) {
      setMessages([{ type: "error", text: "This date is invalid" }]);
    }
  };

  /**
   * @param {Event} event
   */
  const handleDayClick = (event, { date }) => {
    setSelectedDate(date);
    setRenderedDate(date);
    setMessages([]);
  };

  /**
   * @param {String} type
   * @param {Number} step
   */
  const modifyRenderedDate = (type, step) => {
    setRenderedDate(modifyDate(renderedDate, type, step));
  };

  /**
   * @param {String} type
   * @param {Number} step
   */
  const modifySelectedDate = (type, step) => {
    // We are either going to increase or decrease our selectedDate by 1 day.
    // If we do not have a selectedDate yet, we'll just select the first day of
    // the currently rendered month instead.
    const newDate = selectedDate
      ? modifyDate(selectedDate, type, step)
      : util.parseDate(renderedDate).startOf("month").toISOString();

    setSelectedDate(newDate);
    setRenderedDate(newDate);
    setValue(util.formatDate(newDate));
    setMessages([]);
  };

  /**
   * @param {String} dateStr
   * @param {String} type
   * @param {Number} step
   * @return {String}
   */
  const modifyDate = (dateStr, type, step) => {
    const date = util.parseDate(dateStr);
    date.add(step, type);
    return date.toISOString();
  };

  /**
   * @return {Date[]}
   */
  const renderWeekdayLabels = () => {
    const date = util.parseDate(renderedDate).startOf("week");

    return Array.from({ length: 7 }, () => {
      const currentDate = date.clone();
      date.add(1, "day");

      return (
        <AccessibleContent alt={currentDate.format("dddd")}>
          {currentDate.format("dd")}
        </AccessibleContent>
      );
    });
  };

  /**
   * @return {Component}
   */
  const renderDays = () => {
    return generateMonth().map((date) => {
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
          onClick={handleDayClick}
        >
          {date.format("D")}
        </DateInput.Day>
      );
    });
  };

  const date = util.parseDate(renderedDate);

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
      <PageHead>Create Credential Issuance</PageHead>
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
            onChange={(e) => setName(e.target.value)}
          />
          <DateInput
            renderLabel="Issue Date"
            onChange={handleChange}
            value={value}
            messages={messages}
            isShowingCalendar={isShowingCalendar}
            onRequestValidateDate={handleValidateDate}
            onRequestShowCalendar={() => setIsShowingCalendar(true)}
            onRequestHideCalendar={handleHideCalendar}
            onRequestSelectNextDay={() => modifySelectedDate("day", 1)}
            onRequestSelectPrevDay={() => modifySelectedDate("day", -1)}
            onRequestRenderNextMonth={() => modifyRenderedDate("month", 1)}
            onRequestRenderPrevMonth={() => modifyRenderedDate("month", -1)}
            renderNavigationLabel={
              <span>
                <div>{date.format("MMMM")}</div>
                <div>{date.format("YYYY")}</div>
              </span>
            }
            renderPrevMonthButton={<IconButton {...buttonProps("prev")} />}
            renderNextMonthButton={<IconButton {...buttonProps("next")} />}
            renderWeekdayLabels={renderWeekdayLabels()}
          >
            {renderDays()}
          </DateInput>
        </FormFieldGroup>
        <View display="block" padding="medium none">
          <Button
            display="block"
            textAlign="center"
            color="success"
            interaction={name && selectedDate ? "enabled" : "disabled"}
            onClick={() => props.onCreate(name, selectedDate)}
          >
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

CreateIssuance.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateIssuance;
