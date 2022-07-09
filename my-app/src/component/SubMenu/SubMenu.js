import { Menu } from "antd";
import { Link } from "react-router-dom";
import HideButton from "../HideButton/HideButton";

import "./SubMenu.scss";

function SubMenu({ options, title }) {
  return (
    <Menu className="SubMenu" mode="inline">
      <div className="SubMenu-Title">{title}</div>
      {options.map((option, id) => {
        if (option.children) {
          return (
            <Menu.SubMenu
              title={option.title}
              key={id}
              icon={option.icon}
              className="SubMenu_isLastLevel"
            >
              {option.children.map((child, id) => {
                return (
                  <Menu.Item key={id} className="SubMenu-Item_isLastLevel">
                    <Link to={child.route}>{child.title}</Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        }
      })}
      <HideButton />
    </Menu>
  );
}

export default SubMenu;
