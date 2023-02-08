import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { GiNetworkBars } from 'react-icons/gi'
import { TfiDashboard } from 'react-icons/tfi'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineSettings } from 'react-icons/md'
import { CiDollar } from 'react-icons/ci'
import { CiBitcoin } from 'react-icons/ci'
import { TbBoxPadding } from 'react-icons/tb'
import { BiLogOutCircle } from 'react-icons/bi'
import { RiPagesLine } from 'react-icons/ri'
// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#" className="">
                <TfiDashboard size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/all-tokens" className="">
                <CiBitcoin size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("All tokens")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("CMS MANAGER")}</li>
            <li>
              <Link to="/#" className="has-arrow">
                <AiOutlineHome size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("Landing Page")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/landing-page-banner">{props.t("Banner")}</Link>
                </li>
                <li>
                  <Link to="/landing-page-steps">{props.t("Steps")}</Link>
                </li>
                <li>
                  <Link to="/landing-page-start">{props.t("Start Now")}</Link>
                </li>
                <li>
                  <Link to="/landing-page-features">{props.t("Features")}</Link>
                </li>
                <li>
                  <Link to="/landing-page-custom-developer">{props.t("Custom Developer")}</Link>
                </li>
                <li>
                  <Link to="/landing-page-faqs">{props.t("FAQs")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <RiPagesLine size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/terms-of-use">{props.t("Terms of Use")}</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">{props.t("Privacy Policy")}</Link>
                </li>
                <li>
                  <Link to="/subscribed-users">{props.t("Users")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <CiDollar size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("Commissions")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/commission-table">{props.t("Commission Table")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <GiNetworkBars size={23} style={{ marginRight: "10px" }} />
                <span>{props.t("Networks")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/view">{props.t("View")}</Link>
                </li>
                <li>
                  <Link to="/add">{props.t("Add")}</Link>
                </li>
                <li>
                  <Link to="/category">{props.t("Category")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/footer" className="">
                <TbBoxPadding size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("Footer")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <MdOutlineSettings size={25} style={{ marginRight: "10px" }} />
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/general">{props.t("General Setting")}</Link>
                </li>
                <li>
                  <Link to="/logo-manager">{props.t("Logo Manager")}</Link>
                </li>
                <li>
                  <Link to="/payments">{props.t("Payments")}</Link>
                </li>
                <li>
                  <Link to="/profile-settings">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li>
          </ul>

        </div>

      </SimpleBar>
      <div className="logout-button position-absolute">
        <Link to="/logout" className="">
          <BiLogOutCircle size={25} style={{ marginRight: "10px" }} />
          <span>{props.t("Log out")}</span>
        </Link>
      </div>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
