import {
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  Spin,
  Button,
  Tooltip,
} from "antd";
import { useState, useRef, useMemo } from "react";
import { debounce } from "lodash";

import "./CreateLocationPopup.scss";
import InfoIcon from "../InfoIcon/InfoIcon";
import { WarningOutlined } from "@ant-design/icons";

const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

function CreateLocationPopup({ isVisible, createCard, closePopup }) {
  const daysArr = [];
  for (let i = 1; i <= months[0].days; i++) {
    daysArr.push(i);
  }
  const [location, setLocation] = useState("");
  const [workweek, setWorkweek] = useState([
    { day: "Sunday", isChecked: false },
    { day: "Monday", isChecked: false },
    { day: "Tuesday", isChecked: false },
    { day: "Wednesday", isChecked: false },
    { day: "Thursday", isChecked: false },
    { day: "Friday", isChecked: false },
    { day: "Saturday", isChecked: false },
  ]);
  const [days, setDays] = useState(daysArr);
  const [quotaBase, setQuotaBase] = useState("Accounting Year");
  const [month, setMonth] = useState(months[0]);
  const [day, setDay] = useState(1);
  const [isBroughtForward, setIsBroughtForward] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [weekStart, setWeekStart] = useState("Monday");
  const [timezone, setTimezone] = useState("Moscow");
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const [users, setUsers] = useState([]);

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleMonth = (value) => {
    const newDays = [];
    const month = months.find((month) => month.name === value);
    for (let i = 1; i <= month.days; i++) {
      newDays.push(i);
    }
    setDays(newDays);
    setMonth(month);
    setDay(1);
  };

  const handleDay = (value) => {
    setDay(value);
  };

  const handleQuotaBaseInput = (message) => {
    setQuotaBase(message);
  };

  const handleWorkday = (id) => {
    setWorkweek((prevWorkweek) => {
      const newWorkweek = JSON.parse(JSON.stringify(prevWorkweek));
      newWorkweek[id].isChecked = !prevWorkweek[id].isChecked;
      return newWorkweek;
    });
  };

  const handleBroughtForward = (event) => {
    setIsBroughtForward(event.target.checked);
  };

  const handleWeekstart = (value) => {
    setWeekStart(value);
  };

  const handleTimezone = (value) => {
    setTimezone(value);
  };

  const handleIsDefault = (event) => {
    setIsDefault(event.target.checked);
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchUserList(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, 800);
  }, [fetchUserList, 800]);

  const handleSubmit = () => {
    createCard(
      location,
      users,
      {
        workweek: workweek,
        quotaBase: quotaBase,
        startDay: { month: month, day: day },
        isBroughtForward: isBroughtForward,
        weekStart: weekStart,
        timezone: timezone,
      },
      isDefault
    );
    closePopup();
  };

  return (
    <Modal
      visible={isVisible}
      title="Create Location"
      width={550}
      onCancel={closePopup}
    >
      <Form
        className="Form"
        name="createForm"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select timezone!",
            },
          ]}
        >
          <Input
            onChange={handleLocation}
            placeholder="Location Name"
            className="Form-LocationInput"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select timezone!",
            },
          ]}
        >
          <div className="Form-Workweek">
            <label className="Form-WorkweekLabel">
              Workweek<span className="Field_isRequired">*</span>
            </label>
            <div className="Form-WorkweekCheckboxes">
              {workweek.map((elem, id) => {
                return (
                  <div className="Form-WorkweekCheckbox-Wrapper">
                    <Checkbox
                      className="Form-WorkweekCheckbox"
                      name={elem.day}
                      onChange={() => handleWorkday(id)}
                    />
                    <label
                      for={elem.day}
                      className="Form-WorkweekCheckboxLabel"
                    >
                      {elem.day}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </Form.Item>
        <Form.Item>
          <label className="Select-Label">Leave Quota Reset Based On</label>
          <Select
            className="Form-Select"
            defaultValue="Accounting Year"
            onSelect={handleQuotaBaseInput}
          >
            <Select.Option value="Accounting Year">
              Accounting Year
            </Select.Option>
            <Select.Option value="User Employment Date">
              User Employment Date
            </Select.Option>
          </Select>
          <Tooltip
            arrowPointAtCenter={true}
            title="This setting will determine if your leave balance will be reset based on the accounting year (company's fiscal year) or based on the employee's start date. Besides quotas, your roll-over policy will also be affected according to this setting."
          >
            <span className="InfoIcon-Wrapper">
              <InfoIcon />
            </span>
          </Tooltip>
        </Form.Item>
        <Form.Item>
          <div className="Form-YearStartInput">
            <label className="Select-Label">Fiscal Year Start</label>
            <Select
              className="Form-Select Form-MonthSelect"
              defaultValue={month.name}
              onSelect={handleMonth}
            >
              {months.map((item, i) => (
                <Select.Option value={item.name} key={i}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              className="Form-Select Form-DaySelect"
              defaultValue={1}
              onSelect={handleDay}
            >
              {days.map((day) => (
                <Select.Option value={day} key={day}>
                  {day}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Form.Item>
        <Form.Item>
          <Checkbox
            className="Form-Checkbox"
            name="exp"
            onChange={handleBroughtForward}
          />
          <label for="exp" className="Form-CheckboxLabel">
            No Brought Forward Expiry Date
          </label>
          <Tooltip title="Each year, the user's rolled over leaves will expire on the date you set. The quotas for each leave type are configured through the Leave Types section for this location and each can be set individually to allow or not allow roll overs.">
            <span className="InfoIcon-Wrapper">
              <InfoIcon />
            </span>
          </Tooltip>
        </Form.Item>
        <Form.Item>
          <label className="Select-Label">Week starts on</label>
          <Select
            defaultValue="Monday"
            className="Form-Select Form-StartDaySelect"
            onSelect={handleWeekstart}
          >
            <Select.Option value="Monday">Monday</Select.Option>
            <Select.Option value="Sunday">Sunday</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select timezone!",
            },
          ]}
        >
          <label className="Select-Label">
            Timezone<span className="Field_isRequired">*</span>
          </label>
          <Select
            defaultValue="Moscow"
            className="Form-Select"
            onSelect={handleTimezone}
          >
            <Select.Option value="Moscow">
              (GMT+03:00) Moscow+00 - Moscow
            </Select.Option>
            <Select.Option value="Minsk">
              (GMT+03:00) Minsk+00 - Minsk
            </Select.Option>
          </Select>
          <Tooltip title="This default time zone is used throughout the system. For example for accurately displaying leave information in the calendar and for the system events listed in the Logs.">
            <span className="InfoIcon-Wrapper">
              <InfoIcon />
            </span>
          </Tooltip>
        </Form.Item>
        <Form.Item name="users" className="Users-Select">
          {users.length > 0 && <label className="Select-Label">Users</label>}
          <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            mode="multiple"
            value={users}
            placeholder="Add users"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setUsers(newValue);
            }}
            style={{
              width: "100%",
            }}
            className="Form-Select Form-UsersSelect"
            options={options}
          />
          {users.length > 0 && (
            <label className="Warning">
              <WarningOutlined className="Warning-Icon" />
              <span className="Warning-Info">
                Adding or removing a user might impact the user's configuration
                and leave information (e.g. the initial brought forward days).
              </span>
            </label>
          )}
        </Form.Item>
        <Form.Item name="isDefaultCheckbox">
          <Checkbox
            className="Form-Checkbox"
            name="default"
            onChange={handleIsDefault}
          />
          <label for="default" className="Form-CheckboxLabel">
            Make This Location Default
          </label>
          <Tooltip title="By making this Location the default one, all new team members will be automatically added to this Location.">
            <span className="InfoIcon-Wrapper">
              <InfoIcon />
            </span>
          </Tooltip>
        </Form.Item>
        <div className="Form-Info">
          Once you've created a Location, assign a <a>Leave Policy</a> to the
          Location, in order to enable Users to request Leave. To assign a Leave
          Policy, go to Location &gt; Leave Policies &gt; Assign Leave Policy.
        </div>
        <div>
          <Form.Item className="Form-Controls" name="buttons">
            <Button
              className="Form-CancelButton"
              type="primary"
              htmlType="reset"
              onClick={closePopup}
            >
              Cancel
            </Button>
            <Button
              className="Form-CreateButton"
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

async function fetchUserList(username) {
  console.log("fetching user", username);
  return fetch("https://randomuser.me/api/?results=5")
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }))
    );
}

export default CreateLocationPopup;
