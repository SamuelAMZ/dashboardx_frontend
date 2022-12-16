import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// icons
import {
  MdOutlineDashboardCustomize,
  MdOutlineTextsms,
  MdOutlineMarkChatUnread,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { RxTwitterLogo } from "react-icons/rx";
import { GiSelfLove } from "react-icons/gi";

const Sidebar = () => {
  const location = useLocation();
  // submenu
  const [home, setHome] = useState(false);
  const [sms, setSms] = useState(false);
  const [emails, setEmails] = useState(false);
  const [clients, setClients] = useState(false);
  const [discussions, setDiscussions] = useState(false);
  const [profiles, setProfiles] = useState(false);

  // detect and render only on allow pages
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (
      location.pathname.includes("/fa/") ||
      location.pathname === "/" ||
      location.pathname.includes("/404")
    ) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  // toggle menu
  const toggleMenu = (e) => {
    const menuName = e.target.getAttribute("id").trim();

    // remove all active classes
    Array.from(document.querySelector(".menu-ul").children).forEach((elm) => {
      if (elm.className === "active-menu") {
        elm.classList.remove("active-menu");
      }
    });
    // add active class
    e.target.classList.add("active-menu");

    // close all
    const closeAll = () => {
      setHome(false);
      setSms(false);
      setEmails(false);
      setClients(false);
      setDiscussions(false);
      setProfiles(false);
    };
    closeAll();

    // open or close wanted menu
    const openMenu = () => {
      if (menuName === "home") {
        setHome(!home);
      }
      if (menuName === "sms") {
        setSms(!sms);
      }
      if (menuName === "emails") {
        setEmails(!emails);
      }
      if (menuName === "clients") {
        setClients(!clients);
      }
      if (menuName === "discussions") {
        setDiscussions(!discussions);
      }
      if (menuName === "profiles") {
        setProfiles(!profiles);
      }
    };
    openMenu();
  };

  return (
    <>
      {allowed && (
        <div className="sidebar">
          <div className="top-plus-menu">
            {/* top */}
            <div className="top">
              <h2>Dash_X</h2>
            </div>
            {/* main sidebar */}
            <div className="menu-elements">
              {/* menu */}
              <ul className="menu-ul">
                <div className="menu-title">
                  <p>Services</p>
                </div>
                <li className="active-menu" id="home" onClick={toggleMenu}>
                  <span>
                    <MdOutlineDashboardCustomize />
                    <p>Dashboard</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                {/* home subpages */}
                {home && (
                  <ul className="sub">
                    <li>
                      <NavLink to={"/home"}>Home</NavLink>
                    </li>
                    <li>Users</li>
                    <li>Clients</li>
                    <li>Discussions</li>
                    <li>Revenu</li>
                    <li>SMS</li>
                    <li>Email</li>
                    <li>New Users</li>
                    <li>Pending Messages</li>
                  </ul>
                )}

                <li id="sms" onClick={toggleMenu}>
                  <span>
                    <MdOutlineTextsms />
                    <p>SMS</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                {/* sms subpages */}
                {sms && (
                  <ul className="sub">
                    <li>
                      <NavLink to={"/sms/analytics"}>Analytics</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/sms/contexts"}>Contexts</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/sms/logs"}>Logs</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/sms/settings"}>Settings</NavLink>
                    </li>
                  </ul>
                )}
                <li id="emails" onClick={toggleMenu}>
                  <span>
                    <BiEnvelope />
                    <p>Emails</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                {/* emails subpages */}
                {emails && (
                  <ul className="sub">
                    <li>Analytics</li>
                    <li>Contexts</li>
                    <li>Logs</li>
                    <li>Settings</li>
                  </ul>
                )}
                <li id="clients" onClick={toggleMenu}>
                  <span>
                    <FiUsers />
                    <p>Clients</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                {/* emails subpages */}
                {clients && (
                  <ul className="sub">
                    <li>Analytics</li>
                    <li>Contexts</li>
                    <li>Logs</li>
                    <li>Settings</li>
                  </ul>
                )}

                <li id="discussions" onClick={toggleMenu}>
                  <span>
                    <MdOutlineMarkChatUnread />
                    <p>Discussions</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                {/* clients subpages */}
                {discussions && (
                  <ul className="sub">
                    <li>Analytics</li>
                    <li>Contexts</li>
                    <li>Logs</li>
                    <li>Settings</li>
                  </ul>
                )}
                <li id="profiles" onClick={toggleMenu}>
                  <span>
                    <BiUser />
                    <p>Profiles</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                {/* profiles subpages */}
                {profiles && (
                  <ul className="sub">
                    <li>Analytics</li>
                    <li>People</li>
                  </ul>
                )}
              </ul>

              {/* community */}
              <ul className="community-ul">
                <div className="menu-title">
                  <p>community</p>
                </div>
                <li>
                  <span>
                    <RxTwitterLogo />
                    <p>Twitter</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
                <li>
                  <span>
                    <GiSelfLove />
                    <p>Dating</p>
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
