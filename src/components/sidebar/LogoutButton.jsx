// src/components/Logout/Logout.jsx
import PropTypes from "prop-types";
import "../../styles/Logout.scss";

const LogoutButton = ({ icon, text, onClick }) => (
  <div className="logout-container">
    <a href="/logout" className="logout-button" onClick={onClick}>
      <span className="logout-text">{text}</span>
      <img src={icon} alt={text} className="logout-icon" />
    </a>
  </div>
);

LogoutButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default LogoutButton;
