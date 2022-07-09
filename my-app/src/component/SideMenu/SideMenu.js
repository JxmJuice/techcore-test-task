import { Layout, Menu } from "antd";
import { useState } from "react";
import DashboardIcon from "../DashboardIcon/DashboardIcon";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import PLIcon from "../PLIcon/PLIcon";
import SettingsIcon from "../SettingsIcon/SettingsIcon";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserIcon from "../UserIcon/UserIcon";
import VacationManagerIcon from "../VacationManagerIcon/VacationManagerIcon";

import "./SideMenu.scss";
import SubMenu from "../SubMenu/SubMenu";
import GeneralIcon from "../GeneralIcon/GeneralIcon";

function SideMenu() {
  const [currentPage, setCurrentPage] = useState(3);
  const settingsOptions = [
    {
      title: "General",
      icon: <GeneralIcon />,
      children: [],
    },
    {
      title: "Vacation Manager",
      icon: <VacationManagerIcon />,
      children: [
        { title: "Leave Types", route: "settings/leavetypes" },
        { title: "Locations", route: "settings/locations" },
      ],
    },
  ];

  const handleMenuClick = (menu) => {
    setCurrentPage(menu.key);
  };

  return (
    <Layout.Sider className="Sider" width="340px" theme="light">
      <div className="SideMenu">
        <Logo />
        <Menu className="Menu" defaultSelectedKeys={["3"]}>
          <Menu.Item
            title="Dashboard"
            key="dashboard"
            icon={<DashboardIcon />}
            onClick={handleMenuClick}
          >
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="users"
            icon={<UserIcon />}
            handleClick={handleMenuClick}
          >
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item
            key="settings"
            icon={<SettingsIcon />}
            onClick={handleMenuClick}
          >
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="p&l" icon={<PLIcon />} onClick={handleMenuClick}>
            <Link to="/p&l">P&L</Link>
          </Menu.Item>
          <Menu.Item
            key="vacation"
            icon={<VacationManagerIcon />}
            onClick={handleMenuClick}
          >
            <Link to="/vacationmanager">Vacation Manager</Link>
          </Menu.Item>
        </Menu>
        <div className="UserAccount">
          <img
            className="Notifications"
            src="./notifications.svg"
            alt="notifications"
          />
          <UserAvatar />
        </div>
      </div>
      {currentPage === "settings" && (
        <SubMenu title="Settings" options={settingsOptions} />
      )}
    </Layout.Sider>
  );
}

export default SideMenu;
