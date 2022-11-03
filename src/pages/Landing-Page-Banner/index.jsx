import React, { useState,useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import Content from './Content';
import Background from './Background';
import axios from 'axios';

function LandingPageBanner(props) {
     document.title = "BlockTechBrew - Landing Page Banner"
     const [data, setData] = useState({ heading: 'Automatic Token Maker', headingColor: 'white', content: 'You’re looking for a solution to create your own token on the blockchain?Blocktech Brew has you covered: we will help you generate a token automatically, and deploy it in a matter of minutes.',
      contentColor: 'white' ,backgroundImage:'https://tokenmaker.block-brew.com/static/media/Background-V1.1-1.8da2fcfd43ac80268eb2.png'});
     const [items, setItems] = useState({});

     useEffect(() => {
         const authUser=JSON.parse(localStorage.getItem('authUser'));
         setItems(authUser);
     }, []);
     const handleChange = async (e) => {
          const confirmMessage = prompt("if you want to changes please confirm with yes or y")
          if (confirmMessage == 'yes' || confirmMessage == 'y') {
               e.preventDefault();
          const response = await axios.put('http://localhost:3010/cms/banner', { heading:data.heading
     ,headingColor:data.headingColor, content:data.content,contentColor:data.contentColor,backgroundImage:data.backgroundImage},
          { headers: {"Authorization" : `Bearer ${items.msg.jsonWebtoken}`}});
          console.log(response.data);
          } 
          
     }

     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Banner")}
                         />
                         <Row>
                              <Col lg='8'>
                                   <Heading data={data} setData={setData} />
                                   <Content data={data} setData={setData} />
                                   < ButtonComp data={data} setData={setData}/>
                                   <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginTop: '20px' }}>Update</Button>
                              </Col>
                              <Col lg='4'>
                                   <Background data={data} setData={setData}/>
                              </Col>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

LandingPageBanner.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageBanner);