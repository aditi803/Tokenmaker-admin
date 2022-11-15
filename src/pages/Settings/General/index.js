import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import InputMask from "react-input-mask"
import {
     Form,
     Label,
     Card,
     CardBody,
     CardTitle,
     Input
} from "reactstrap"
import { HEADER, HEADER_PUT } from 'common/api';
import useApiStatus from 'hooks/useApiStatus';
import axios from "axios";
import { toast } from "react-toastify"
import Spinner from 'loader';

function General(props) {

     const [header, setHeader] = useState({})
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [data, setData] = useState({adminDocumentTitle:'', investorDocumentTitle: ''})

     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          setLoader(false)
          fetchData()
     }, [setHeader])

     // console.log(header, '?????????????')

     const fetchData = async () => {
          await axios.get(HEADER)
               .then((res) => {
                    setHeader(res.data.msg)
                    setData(res.data.msg)
                    setApiSuccess()
                    changeApiStatus(false)
                    console.log(res.data.msg)
               })
               .catch((err) => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
               })

     }

     const onChangeHandler = async (e) => {
          
          
          
          e.preventDefault()
          const { name, value } = e.target;
          console.log(name, value , '>>>>>>')
          
          setHeader({
               ...header, [name]: value
          })
     }

     
     const headerUpdate = async(e) => {
          e.preventDefault()
          changeApiStatus(true)
          const authUser = JSON.parse(localStorage.getItem('authUser'));
          await axios.put("https://tokenmaker-apis.block-brew.com/cms/headertitles", data,
               { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
               .then((res) => {
                    setApiSuccess()
                    changeApiStatus(false)
                    fetchData()
                    console.log(res,"general data")
                    toast.success("Updated Successfully")
               }).catch((err) => {
                    console.log(err,"general error")
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    toast.error("Cannot update")
               })
               setLoader(false)
     }


     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("General Settings")}
                         />
                         <Row>
                              <Col lg={12}>
                                   <Card>
                                        <CardBody>
                                             <CardTitle className="mb-4">General Settings</CardTitle>
                                             <Form>
                                                  <Row>
                                                       <Row>  
                                                            <Col lg={6}>
                                                                 <div>
                                                                      <div className="form-group mb-4">
                                                                           <Label for="input-date2"> Admin Website Title: </Label>
                                                                           <InputMask
                                                                                // mask="(999) 999-9999"
                                                                                name='adminDocumentTitle'
                                                                                value={data.adminDocumentTitle}
                                                                                className="form-control input-color"
                                                                                onChange={(e)=>{
                                                                                     setData({...data, adminDocumentTitle:e.target.value});
                                                                                }}
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </Col>
                                                            <Col lg={6}>
                                                                 <div>
                                                                      <div className="form-group mb-4">
                                                                           <Label for="input-date1">Investor Website Title: </Label>
                                                                           <InputMask
                                                                                // mask="(999) 999-9999"
                                                                                name='investorDocumentTitle'
                                                                                value={data.investorDocumentTitle}
                                                                                className="form-control input-color"
                                                                                onChange={(e)=>{
                                                                                     setData({...data, investorDocumentTitle:e.target.value})
                                                                                }}
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </Col>

                                                       </Row>

                                                  </Row>
                                                  <Button
                                                       color="success"
                                                       className="mt-1"
                                                       onClick={headerUpdate}
                                                  >
                                                       Update
                                                  </Button>

                                             </Form>
                                        </CardBody>
                                   </Card>
                              </Col>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

General.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(General);