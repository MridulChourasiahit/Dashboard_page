import { ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

// Import SVG assets
import UserProfile from "../../assets/UserProfile.svg";
import dashboard from "../../assets/Dashboard.svg";
import Logout from "../../assets/Logout.svg";
import Message from "../../assets/Messaging.svg";
import Report from "../../assets/Report.svg";
import Utility from "../../assets/Utility.svg";
import AddressBook from "../../assets/addressbook.svg";
import TemplateIcon from "../../assets/templates.svg";
import Download from "../../assets/download.svg";

// Import styles
import "../../styles/sidebar.scss";
import "../../styles/Proflie.scss";
import LogoutButton from "./LogoutButton";

// MenuItem Component
const MenuItem = ({ icon: Icon, text, path, hasArrow, isImage = true, }) => (
  <a href={path} className="menu-item">
    {isImage ? (
      <img src={Icon} alt={text} className="menu-icon" />
    ) : (
      <Icon className="menu-icon" />
    )}
    <span className="menu-text">{text}</span>
    {hasArrow && <ChevronRight className="menu-arrow" />}
  </a>
);

MenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  path: PropTypes.string,
  hasArrow: PropTypes.bool,
  isImage: PropTypes.bool,
};

// Default menu items configuration
const defaultMenuItems = [
  {
    icon: dashboard,
    text: "Dashboard",
    path: "/dashboard",
    hasArrow: false,
    isImage: true,
  },
  {
    icon: Message,
    text: "Messaging",
    path: "/messaging",
    hasArrow: true,
    isImage: true,
  },
  {
    icon: Report,
    text: "Report",
    path: "/report",
    hasArrow: true,
    isImage: true,
  },
  {
    icon: Utility,
    text: "Utility",
    path: "/utility",
    hasArrow: true,
    isImage: true,
  },
  {
    icon: AddressBook,
    text: "Address Book",
    path: "/messaging",
    hasArrow: true,
    isImage: true,
  },
  {
    icon: TemplateIcon,
    text: "Templates",
    path: "/templates",
    hasArrow: false,
    isImage: true,
  },
  {
    icon: Download,
    text: "Download",
    path: "/download",
    hasArrow: true,
    isImage: true,
  }

];

const defaultLogoutProps = {
  icon: Logout,
  text: "Logout",
  onClick: (e) => {
    e.preventDefault();
    console.log("Logout clicked");
  },
};

const Sidebar = ({ menuItems, logoutProps, className = "", profileImage }) => {
  const items = menuItems || defaultMenuItems;
  const logout = logoutProps || defaultLogoutProps;

  return (
    <div className={`sidebar-card ${className}`}>
      {/* Profile Section */}
      <div className="profile">
        <div className="profile__container">
          <img
            src={profileImage || UserProfile}
            alt="User Profile"
            className="profile__image"
          />
        </div>
      </div>

      {/* Menu Section */}
      <div className="sidebar-menu">
        {items.map((item, index) => (
          <MenuItem key={`${item.text}-${index}`} {...item} />
        ))}
      </div>

      {/* Logout Section */}
      <LogoutButton {...logout} />
    </div>
  );
};

Sidebar.propTypes = {
  menuItems: PropTypes.array,
  logoutProps: PropTypes.object,
  className: PropTypes.string,
  profileImage: PropTypes.string,
};

export default Sidebar;