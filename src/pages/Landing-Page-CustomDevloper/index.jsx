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

function LandingPageCustomDeveloper(props) {
     document.title = "BlockTechBrew - Landing Page Custom Devloper"

     const [items, setItems] = useState({});
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()


     const [data, setData] = useState([])
     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          const getData = () => {
               axios.get("https://tokenmaker-apis.block-brew.com/cms/customDetails")
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
               axios.put('https://tokenmaker-apis.block-brew.com/cms/custom', {
                    buttonText: data.buttonText
                    , buttonColor: data.buttonColor, buttonBackgroundColor: data.buttonBackgroundColor, heading: data.heading, headingColor: data.headingColor,
                    backgroundColor: data.backgroundColor
               },
                    { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
                         if (result.data.success === 1) {
                              toast.success('Updated Successfully');
                         }
                    }).catch((err) => {
                    toast.error('Cannot Update');
                    });
          

     }
     return apiStatus.inProgress ? <Spinner /> :  (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Custom-Devloper")}
                         />
                         <Row>
                              <Heading data={data} setData={setData} />
                         </Row>
                         <Row>
                              <ButtonComp data={data} setData={setData} />
                         </Row>
                         <Row className='row'>
                              <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', margin: 'auto', marginTop: '20px' }}>Update</Button>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}
LandingPageCustomDeveloper.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageCustomDeveloper);