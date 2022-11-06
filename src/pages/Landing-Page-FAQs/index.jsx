import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { Container, Row, Button } from 'reactstrap'
import QuestionTable from './Question-Table'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from 'react-i18next';
import Heading from './Heading';
import Content from './Content';
import axios from 'axios';
function LandingPageFAQs(props) {

     document.title = "BlockTechBrew - Landing Page FAQs"
     const [data, setData] = useState([])
     const [items,setItems]=useState({})
     const [css,setCss]=useState({})


               const handleChange = (e) => {
                         e.preventDefault();
                         axios.put('https://tokenmaker-apis.block-brew.com/cms/faqupdate', {
                              heading: css.heading, headingColor: css.headingColor,
                              contentColor: css.contentColor,content:css.content
                         },
                              { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
                                   if (result.data.success == 1) {
                                        alert('Updated Successfully');
                                   }
                              }).catch((err) => {
                                   alert('Cannot Update');
                              });         
          }
     useEffect(() => {
          const getData = () => {
               axios.get("https://tokenmaker-apis.block-brew.com/cms/faqs")
                    .then((result) => {
                         setData(result.data.msg.faqDetails);
                         setCss(result.data.msg.faqData);
                         console.log('ok/');
                         // console.log(result.data.msg,"Faq details");
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
                              breadcrumbItem={props.t("FAQs")}
                         />
                         <Row>
                              <Heading css={css} setCss={setCss} />
                              <Content css={css} setCss={setCss} />
                              <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginTop: '20px' }}>Update</Button>
                         </Row>
                         <Row>
                              <QuestionTable data={data} setData={setData} />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
};

LandingPageFAQs.propTypes = {
     t: PropTypes.any
};

export default withTranslation()(LandingPageFAQs);