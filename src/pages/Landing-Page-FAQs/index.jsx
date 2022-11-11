import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { Container, Row, Button } from 'reactstrap'
import QuestionTable from './Question-Table'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from 'react-i18next';
import Heading from './Heading';
import Content from './Content';
import axios from 'axios';
import {toast} from 'react-toastify';
import Spinner from 'loader';
import useApiStatus from 'hooks/useApiStatus';
import { FAQS_UPDATE, FAQS } from 'common/api';
function LandingPageFAQs(props) {

     document.title = "BlockTechBrew - Landing Page FAQs"
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

     const [data, setData] = useState([])
     const [items, setItems] = useState({})
     const [css, setCss] = useState({})


     const handleChange = (e) => {
          changeApiStatus(true)
          e.preventDefault();
          axios.put(FAQS_UPDATE, {
               heading: css.heading, headingColor: css.headingColor,
               contentColor: css.contentColor, content: css.content
          },
               { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
                    if (result.data.success === 1) {
                         setApiSuccess()
                         changeApiStatus(false)
                         toast.success("Updated Successfully")
                    }
               }).catch((err) => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    toast.error('Already Updated');
               });
               setLoader(false)
     }
     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          const getData = () => {
               axios.get(FAQS)
                    .then((result) => {
                         setData(result.data.msg.faqDetails);
                         setCss(result.data.msg.faqData);
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
     return apiStatus.inProgress ? <Spinner /> :  (
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
                              <QuestionTable data={data} setData={setData} setItems={setItems} items={items} />
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