import { Menu } from "antd";

import "./MenuItem.scss";

function MenuItem({ title, icon, key, handleClick }) {
  return (
    <Menu.Item icon={icon} key={key} onClick={handleClick}>
      {title}
    </Menu.Item>
  );
}

export default MenuItem;
