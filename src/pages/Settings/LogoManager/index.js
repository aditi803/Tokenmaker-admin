import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import logo from "../../../assets/images/b_brew.png";
import { HEADER, HEADER_PUT } from 'common/api';
import useApiStatus from 'hooks/useApiStatus';
import axios from "axios";
import { toast } from "react-toastify"
import Spinner from 'loader';
import './LogoManager.css'
function LogoManager(props) {

     const [header, setHeader] = useState({})
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

     const [images, setImages] = useState({
          investorLogoImage: {},
          investorFavicon: {},
          adminFavicon: {},
          adminLogoImage: {},
        })

     const [investorImage, setInvestorImage] = useState(null);

     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          setLoader(false)
          fetchData()
     }, [setHeader])

     

     const handleImageChange = async (files, name) => {
          changeApiStatus(true)
          const authUser = JSON.parse(localStorage.getItem('authUser'));
          const [file] = files
          setImages({...images, [name]: {blob: file, src: window.URL.createObjectURL(file)}})
          // setImages({...images, [name]: { blob: file, src: window.URL.createObjectURL(file) }})
          console.log(file, '>>>>>>>>>>>>>>>>>>>>HANDLE IMAGE CHANGE s')
          const formData = new FormData();
          formData.append(name, file)
          await axios.put(HEADER_PUT, formData,
               { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
               .then((res) => {
                    setApiSuccess()
                    console.log(res, '>>>>>>>>>>>>>>>') 
                         
                    // changeApiStatus(false)   
                    fetchData()       
                    toast.success("Updated Successfully")      
               }).catch((err) => {
                    // changeApiStatus(false)
                    setApiFailed(err.message)
                    toast.error("Already Updated")
                    console.log(err)
               })

               setLoader(false)
     }


     const fetchData = async () => {
          await axios.get(HEADER)
               .then((res) => {
                    setHeader(res.data.msg)
                    setApiSuccess()
                    changeApiStatus(false)
                    console.log(res.data.msg)
               })
               .catch((err) => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
               })

     }

     // const onChangeHandler = async (e) => {
     //      e.preventDefault()
     //      const { name, value } = e.target;
     //      setHeader({
     //           ...header, [name]: value
     //      })
     // }

     // const headerUpdate = async () => {
     //      const authUser = JSON.parse(localStorage.getItem('authUser'));
     //      await axios.put(HEADER_PUT, header,
     //           { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
     //           .then((res) => {
     //                toast.success("Updated Successfully")
     //           }).catch((err) => {
     //                toast.error("Cannot update")
     //                console.log(err)
     //           })
     // }
     const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"

     // const uploadImage = (e) => {
     //      e.preventDefault();
     //      let formData = new FormData(e.target)
     //      console.log(formData, "form data")
     //      const authUser = JSON.parse(localStorage.getItem('authUser'));
     //      axios.put(HEADER_PUT, formData, { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
     //           .then((res) => {
     //                console.log(res, "Header put resp")
     //                toast.success("Updated successfully")
     //           })
     //           .catch((err) => {
     //                toast.error("Already updated")
     //                console.log(err)
     //           })
     // }

     // const onChangeHandler = (e) => {
     //      e.preventDefault();
     //      let formData = new FormData(e.target)
     //      console.log(formData, "form data")


     //      const authUser = JSON.parse(localStorage.getItem('authUser'));
     //      axios.put(HEADER_PUT, formData, { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
     //           .then((res) => {
     //                console.log(res, "Header put resp")
     //                toast.success("Updated successfully")
     //           })
     //           .catch((err) => {
     //                toast.error("Already updated")
     //                console.log(err)
     //           })
     // }
     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                    <p
              style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
            >Logo Manager</p>
                         {/* <form encType='multipart/form-data' onSubmit={(e) => { uploadImage(e) }}> */}
                         <Row>

                              <div>
                                   <div className="card mb-3">
                                        <div className="card-body">
                                             <h5>Admin Logo Manager</h5>

                                             <div className="row">
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('headerLogo') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={imageBaseUrl + header.adminLogoImage}
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                      className="set-logo"
                                                                      // style={{height: "100px", width:"250px"}}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Admin Header Logo
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      name="adminLogoImage"
                                                                      
                                                                      onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden" style={{padding:"2px"}}>
                                                            {/* {currUpload.includes('adminFavIcon') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images " style={{padding:"48px"}}>
                                                                 <img
                                                                      src={imageBaseUrl + header.adminFavicon}
                                                                      alt=""
                                                                      title=""
                                                                      style={{height:"39px"}}
                                                                      // height={100}
                                                                      // style={{height: "100px", width:"250px"}}
                                                                      // className="set-logo"
                                                                 // onChange={onChangeHandler}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Admin FavIcon
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      // onChange={onChangeHandler}
                                                                      onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                      name="adminFavicon"
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   {/*  */}
                              </div>
                              <div>
                                   <div className="card mb-3">
                                        <div className="card-body">
                                             <h5>Investor Logo Manager</h5>

                                             <div className="row">
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('investorLogo') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={ imageBaseUrl + header.investorLogoImage}
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                      className="set-logo"
                                                                      // style={{height: "100px", width:"250px"}}
                                                                 // value={header.logoImage}
                                                                 // onChange={onChangeHandler}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Investor Header Logo
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      // onChange={onChangeHandler}
                                                                      onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                      name="investorLogoImage"
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden" style={{padding:"2px"}}>
                                                            {/* {currUpload.includes('investorFavIcon') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images" style={{padding:"48px"}}>
                                                                 <img
                                                                      src={imageBaseUrl + header.investorFavicon}
                                                                      style={{height:"39px"}}
                                                                      alt=""
                                                                      title=""
                                                                      // className="set-logo"
                                                                      // style={{height: "100px", width:"250px"}}
                                                                 // value={header.favicon}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Investor Favicon
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      name="investorFavicon"
                                                                      onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>

                                             </div>
                                        </div>
                                   </div>
                                   {/*  */}
                              </div>


                         </Row>
                         {/* <Button
                                   color="success"
                                   className="mt-1 mb-3"
                                   // onClick={headerUpdate}
                                   type='submit'

                              >
                                   Update
                              </Button> */}
                         {/* </form> */}
                    </Container>
               </div>
          </React.Fragment>
     )
}

LogoManager.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LogoManager);