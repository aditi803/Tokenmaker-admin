import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/BTBlogo_gray.png";

import { Helmet } from "react-helmet";

const Sidebar = props => {

  const [logos, setLogos] = useState()
  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
  useEffect(() => {
    fetchData()
  }, [setLogos])

  const fetchData = async () => {
    const respHeader = await axios.get("https://tokenmaker-apis.block-brew.com/cms/headerdetails")
    console.log(respHeader, ':>>>>>>>>>>>>>>>::::::::::::::')
    setLogos(respHeader.data.msg)
    document.title = respHeader?.data?.msg?.adminDocumentTitle;
    const favicon = document.getElementById("favicon");
    favicon.href = `${imageBaseUrl}${respHeader.data.msg.adminFavicon}`
  }



  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
      </Helmet>
      <div className="vertical-menu">
        <div className="navbar-brand-box" style={{ marginTop: "10px" }}>
          <Link to="/" className="logo logo-light">  
            <span className="logo-lg" style={{ objectFit: "contain" }}>
              <img src={logos ? `${imageBaseUrl}${logos.adminLogoImage}` : ""} alt="" style={{ width: "162px", height: "inherit", marginRight: "31px" }} />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
