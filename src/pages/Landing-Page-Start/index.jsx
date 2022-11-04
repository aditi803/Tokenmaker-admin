import React, { useState,useEffect } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import ButtonComp from './Button';
import axios from 'axios';

function LandingPageStart(props) {
     document.title = "BlockTechBrew - Landing Page Start"

     const [data, setData] = useState({ heading: 'Ready to deploy your token ?', 
     headingColor: 'white'
     , backgroundColor: '#33d3d2',buttonText: 'Start now',
      buttonColor: 'white', buttonBackgroundColor: '#f50058' });
     const [items, setItems] = useState({});
     useEffect(() => {
          const authUser=JSON.parse(localStorage.getItem('authUser'));
          setItems(authUser);
      }, []);

      const handleChange = (e) => {
                e.preventDefault();
          axios.put('https://tokenmaker-apis.block-brew.com/cms/startsection', { buttonText:data.buttonText
      ,buttonColor:data.buttonColor, buttonBackgroundColor:data.buttonBackgroundColor,heading:data.heading
      ,headingColor:data.headingColor,
     backgroundColor:data.backgroundColor},
           { headers: {"Authorization" : `Bearer ${items.msg.jsonWebtoken}`}}).then((result) => {
               if(result.success==1){
                    alert('Updated Successfully');
               }
           }).catch((err) => {
               alert('Cannot Update');
               console.log(err)
           });
            
           
      }
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Start")}
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
LandingPageStart.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageStart);