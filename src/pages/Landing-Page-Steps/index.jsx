import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import StepsTable from './StepsTable';
import axios from "axios";
function LandingPageSteps(props) {
     document.title = "BlockTechBrew - Landing Page Steps"
     const handleChange = (e) => {
          const confirmMessage = prompt("if you want to changes please confirm with yes or y") 
          if (confirmMessage == 'yes' || confirmMessage == 'y') {
               
          } else {
               
          }
          console.log(data);
     }
     const [items, setItems] = useState([])
     const [data, setData] = useState([])
     useEffect(() => {
          const getData = () => {
               axios.get("https://tokenmaker-apis.block-brew.com/cms/steps")
                    .then((result) => {
                         setData(result.data.msg);
                         // console.log(result.data.msg, "step details");
                         const authUser = JSON.parse(localStorage.getItem('authUser'));
                         setItems(authUser);
                    }).catch(err => {
                         console.log(err);
                    })

          }
          getData();

     }, []);
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
                              <StepsTable data={data} setData={setData} />
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