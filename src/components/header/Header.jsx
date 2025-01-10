import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import Mail from "../../assets/bulk mail.svg";
import Walit from "../../assets/wallet.svg";
import Frame from "../../assets/Frame.svg";
import Notification from "../../assets/Notification.svg";
import MoonNotification from "../../assets/MoonNotification.svg";
import "../../styles/Header.scss";

const IconButton = memo(({ icon, alt, onClick, className = "" }) => (
  <div
    className={`header__icon-container ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={alt}
  >
    <img src={icon} alt={alt} className="header__icon" draggable="false" />
  </div>
));

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  icon: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  onClick: () => {
    console.log("Icon button clicked");
  },
  className: "",
};

const SearchInput = memo(({ value, onChange, placeholder }) => (
  <div className="header__search-input-wrapper">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="header__search-input"
    />
    <CiSearch className="header__search-icon" />
  </div>
));

SearchInput.displayName = "SearchInput";

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  value: "",
  onChange: () => {},
  placeholder: "Search",
};

const Header = memo(
  ({
    onSearchChange,
    onMoonNotificationClick,
    onNotificationClick,
    onMailClick,
    onWalletClick,

    className = "",
  }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = useCallback(
      (value) => {
        setSearchValue(value);
        onSearchChange?.(value);
      },
      [onSearchChange]
    );

    const iconButtons = [
      {
        icon: MoonNotification,
        alt: "Moon notification",
        onClick: onMoonNotificationClick,
      },
      {
        icon: Notification,
        alt: "Notification",
        onClick: onNotificationClick,
      },
      {
        icon: Mail,
        alt: "Mail",
        onClick: onMailClick,
      },
      {
        icon: Walit,
        alt: "Wallet",
        onClick: onWalletClick,
      },
    ];

    return (
      <header className={`header ${className}`}>
        <div className="header__wrapper">
          <div className="header__search-container">
            <SearchInput
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>

          <div className="header-sidebar">
            {iconButtons.map((button, index) => (
              <IconButton
                key={index}
                icon={button.icon}
                alt={button.alt}
                onClick={button.onClick}
              />
            ))}
            <div className="header__frame">
              <img src={Frame} type="icon" />
            </div>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

Header.propTypes = {
  onSearchChange: PropTypes.func,
  onMoonNotificationClick: PropTypes.func,
  onNotificationClick: PropTypes.func,
  onMailClick: PropTypes.func,
  onWalletClick: PropTypes.func,
  onFrameClick: PropTypes.func,
  className: PropTypes.string,
};

Header.defaultProps = {
  onSearchChange: () => {},
  onMoonNotificationClick: () => {},
  onNotificationClick: () => {},
  onMailClick: () => {},
  onWalletClick: () => {},
  onFrameClick: () => {},
  className: "",
};

export default Header;
