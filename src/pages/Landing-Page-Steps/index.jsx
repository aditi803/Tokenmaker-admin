import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import StepsTable from './StepsTable';
import axios from 'axios';
function LandingPageSteps(props) {
     document.title = "BlockTechBrew - Landing Page Steps"
     const [data, setData] = useState({ heading: 'Create your token in just a few easy steps:', headingColor: 'black' });
     const [items, setItems] = useState({});
     useEffect(() => {
          const authUser=JSON.parse(localStorage.getItem('authUser'));
          setItems(authUser);
      }, []);
     const handleChange =async (e) => {
     const response=await axios.put('http://localhost:3010/cms/stepdata', {
          heading: data.heading, headingColor: data.headingColor,
     }, { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
               if (result.success == 1) {
                    alert('Updated Successfully');
               }
          }).catch((err) => {
               alert('Cannot Update');
          });        
          console.log(response);
     }
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Steps")}
                         />
                         <Row>
                              <Heading data={data} setData={setData} />
                              <div className='row '>
                                   <Button className='btn btn-success ' onClick={handleChange} style={{ width: '200px', margin :'auto',marginTop:'15px' }}>Update</Button>
                              </div>
                         </Row>
                         <Row className='mt-5'>
                              <StepsTable />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}
LandingPageSteps.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageSteps);