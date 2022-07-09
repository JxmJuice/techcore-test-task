import { Breadcrumb } from "antd";
import ChevronIcon from "../ChevronIcon/ChevronIcon";

import "./Breadcrumbs.scss";

function Breadcrumbs({ path }) {
  return (
    <Breadcrumb separator={<ChevronIcon />} className="Breadcrumbs">
      {path.map((elem) => {
        return (
          <Breadcrumb.Item className="Breadcrumb">
            {!!elem.icon && elem.icon}
            <span className="Breadcrumb-Title">{elem.title}</span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
