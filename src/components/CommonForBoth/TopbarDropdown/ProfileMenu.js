import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios"
import { toastify } from "react-toastify"


import { useContext } from "react";
import { CommonContext } from "constants/common";

// users
import user1 from "../../../assets/images/users/userTokenMaker.png";
import useApiStatus from "hooks/useApiStatus";

const ProfileMenu = props => {
  const { toggle, setToggle } = useContext(CommonContext);
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");

  const userToken = localStorage.getItem("authUser")
  const parseData = JSON.parse(userToken)
  const token = parseData.msg.jsonWebtoken
  const [user, setUser] = useState([])
  const [image, setImage] = useState({
    blob: null,
    src: '',
  })
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const fetchData = async () => {
    //     try {
    changeApiStatus(true)
    const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
    await axios.get("https://tokenmaker-apis.block-brew.com/user/getuser", { headers: { Authorization: `Bearer ${token}` } })
      //       if (userResponse.status === 200) {
      .then((res) => {

        const { username, email, userImage } = res.data.msg
        setUser({ username, email })

        userImage &&
          userImage !== null &&
          setImage({
            src: `${imageBaseUrl}/${userImage}`,
          })
        changeApiStatus(false)
      })
      .catch((err) => {
        changeApiStatus(false)
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line 
  }, [toggle]) // pass depo
  console.log("user-image profilemenu", image)



  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >

          <img
            className="rounded-circle header-profile-user"
            src={image.src ? image.src : user1 }
            style={{ height: "35px", width: "35px", objectFit: "cover" }}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/profile-settings" >
            <DropdownItem tag="a" href="/profile">
              {" "}
              <i className="bx bx-user font-size-16 align-middle me-1" />
              {props.t("Profile")}{" "}
            </DropdownItem>
          </Link>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
