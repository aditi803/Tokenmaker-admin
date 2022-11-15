import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import ButtonComp from './Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'loader';
import useApiStatus from 'hooks/useApiStatus';
import { CUSTOM_DETAILS, CUSTOM_PUT } from 'common/api';
import { CCard, CCardBody, CCardGroup } from '@coreui/react'


function LandingPageCustomDeveloper(props) {
     document.title = "BlockTechBrew - Landing Page Custom Devloper"

     const [items, setItems] = useState({});
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()


     const [data, setData] = useState([])
     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          const getData = () => {
               axios.get(CUSTOM_DETAILS)
                    .then((result) => {
                         setData(result.data.msg);
                         // console.log(result.data.msg);
                         const authUser = JSON.parse(localStorage.getItem('authUser'));
                         setItems(authUser);
                         setApiSuccess()
                         changeApiStatus(false)
                    }).catch(err => {
                         changeApiStatus(false)
                         setApiFailed(err.message)
                    })

          }
          setLoader(false)
          getData();

     }, []);

     const handleChange = (e) => {
          e.preventDefault();
          changeApiStatus(true)
          axios.put(CUSTOM_PUT, {
               buttonText: data.buttonText
               , buttonColor: data.buttonColor, buttonBackgroundColor: data.buttonBackgroundColor, heading: data.heading, headingColor: data.headingColor,
               backgroundColor: data.backgroundColor
          },
               { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
                    if (result.data.success === 1) {
                         setApiSuccess()
                         changeApiStatus(false)
                         toast.success('Updated Successfully');
                    }
               }).catch((err) => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    toast.error('Already Updated');
               });
          setLoader(false)
     }
     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Custom-Devloper")}
                         />
                         <CCardGroup>
                              <CCard>
                                   <CCardBody>
                                        <Row>
                                             <Heading data={data} setData={setData} />
                                        </Row>
                                        <Row>
                                             <ButtonComp data={data} setData={setData} />
                                        </Row>
                                        <Row className='row'>
                                             <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginLeft:"9px", marginTop: '20px' }}>Update</Button>
                                        </Row>
                                   </CCardBody>
                              </CCard>
                         </CCardGroup>
                    </Container>
               </div>
          </React.Fragment>
     )
}
LandingPageCustomDeveloper.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageCustomDeveloper);