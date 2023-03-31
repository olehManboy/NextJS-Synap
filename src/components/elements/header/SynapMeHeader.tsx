import React, { useState, memo } from "react";
import SnDefaultLink from "@/components/buttons/SnDefaultLink";
import SnDefaultSearchBar from "@/components/buttons/SnDefaultSearchBar";
import Image from "next/image";

// material ui icons
import LiveTvIcon from "@mui/icons-material/LiveTv";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Header: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <header className="synap-main-header">
      <Image
        alt="synap-header-icon"
        src="/icons/synap-header-icon.png"
        width="50"
        height="50"
        priority
      />
      <div className="nav-links">
        <SnDefaultLink
          className="primary-nav-button"
          content="Home"
          href="/Home"
          ButtonIcon={HomeIcon}
        />
        <SnDefaultLink
          className="primary-nav-button"
          content="People"
          href="/People"
          ButtonIcon={GroupIcon}
        />
        <SnDefaultLink
          className="primary-nav-button"
          content="News"
          href="/News"
          ButtonIcon={LiveTvIcon}
        />
        <SnDefaultLink
          className="primary-nav-button"
          content="Notifications"
          ButtonIcon={CircleNotificationsIcon}
          href="/notifications"
        />
      </div>
      <SnDefaultSearchBar
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <div className="form-links">
        <SnDefaultLink
          className="signup-button"
          content="Sign Up"
          href="/signup"
        />
        <SnDefaultLink className="login-button" content="Login" href="/login" />
      </div>
      <SnDefaultLink
        className="donate-button"
        ButtonIcon={AttachMoneyIcon}
        content="Donate"
      />
    </header>
  );
};

export default memo(Header);
