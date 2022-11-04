import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import Content from './Content';
import Background from './Background';
import axios from 'axios';
import ButtonComp from 'pages/Landing-Page-Banner/Button';

function LandingPageBanner(props) {
     document.title = "BlockTechBrew - Landing Page Banner"
     const [items, setItems] = useState({});

     const handleChange = async (e) => {
          const confirmMessage = prompt("if you want to changes please confirm with yes or y")
          if (confirmMessage == 'yes' || confirmMessage == 'y') {
               e.preventDefault();
               const response = await axios.put('https://tokenmaker-apis.block-brew.com/cms/banner', {
                    heading: data.heading
                    , headingColor: data.headingColor, content: data.content, contentColor: data.contentColor, backgroundImage: data.backgroundImage
               },
                    { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } });
               console.log(response.data);
          }
     }

     const [data, setData] = useState([])
     useEffect(() => {
               axios.get("https://tokenmaker-apis.block-brew.com/cms/bannerDetails")
                    .then((result) => {
                         setData(result.data.msg);
                         // console.log(result.data.msg,"Banner details");
                         const authUser = JSON.parse(localStorage.getItem('authUser'));
                         setItems(authUser);
                    }).catch(err => {
                         console.log(err);
                    })

          }, []);

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
                                   <ButtonComp data={data} setData={setData} />
                                   <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginTop: '20px' }}>Update</Button>
                              </Col>
                              <Col lg='4'>
                                   <Background data={data} setData={setData} />
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