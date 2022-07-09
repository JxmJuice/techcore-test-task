import {
  EditOutlined,
  MoreOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Popover } from "antd";
import { useState } from "react";
import DeletePopup from "../DeletePopup/DeletePopup";

import "./CountryCard.scss";

function CountryCard({
  title,
  isDefault,
  holidays,
  leavePolicies,
  workers,
  setDefault,
  deleteCard,
}) {
  const getShortName = (label) => {
    const arr = label.split(" ");
    return arr[0][0] + arr[1][0];
  };

  const [isVisible, setIsVisible] = useState(false);

  const closePopup = () => {
    setIsVisible(false);
    console.log("closed");
    console.log(isVisible);
  };

  const showPopup = () => {
    setIsVisible(true);
    console.log("open");
  };

  return (
    <Card className="CountryCard">
      <div className="Card-Header">
        <h3 className="Card-Title">{title}</h3>
        {isDefault && <div className="Card-DefaultBadge">default</div>}
        <Popover
          trigger="click"
          visible={isVisible ? false : undefined}
          content={
            <div className="Card-Popover">
              <button>
                <EditOutlined />
                <span>Edit</span>
              </button>
              <button onClick={() => setDefault(title)}>
                <StarOutlined />
                <span>Set As Default</span>
              </button>
              <button onClick={showPopup}>
                <DeleteOutlined />
                <span>Delete</span>
              </button>
              <DeletePopup
                isVisible={isVisible}
                closePopup={closePopup}
                deleteCard={deleteCard}
                title={title}
              />
            </div>
          }
        >
          <button className="Card-MoreButton">
            <MoreOutlined />
          </button>
        </Popover>
      </div>
      <div className="Card-CountryInformation">
        <span className="Information-Title">Holidays</span>
        <a className="Information-Button">View Holidays</a>
        <span className="Information-Title">Leave Policies</span>
        <a className="Information-Button">View Leave Policies</a>
      </div>
      <div className="Card-CountryWorkers">
        <Avatar.Group
          maxCount={7}
          size="large"
          maxStyle={{
            color: "#00A0EC",
            background: "transparent",
            border: "none",
          }}
        >
          {workers.map((worker) => {
            return (
              <Avatar src={worker.image} className="UserAvatar">
                {getShortName(worker.label)}
              </Avatar>
            );
          })}
        </Avatar.Group>
      </div>
    </Card>
  );
}

export default CountryCard;
