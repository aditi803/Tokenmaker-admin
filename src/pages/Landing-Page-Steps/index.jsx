import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import StepsTable from './StepsTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import useApiStatus from 'hooks/useApiStatus';
import Spinner from 'loader';
function LandingPageSteps(props) {
     document.title = "BlockTechBrew - Landing Page Steps"
     const [items, setItems] = useState({});
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

     const handleChange = async (e) => {
          const response = await axios.put('https://tokenmaker-apis.block-brew.com/cms/stepdata', {
               heading: css.heading, headingColor: css.headingColor,
          }, { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
               if (result.data.success === 1) {
                    toast.success('Updated Successfully');
               }
          }).catch((err) => {
               toast.error('Cannot Update');
          });
          console.log(response);
     }
     // const [items, setItems] = useState([])
     const [data, setData] = useState([])
     const [css, setCss] = useState({})

     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          const getData = async () => {
               await axios.get("https://tokenmaker-apis.block-brew.com/cms/steps")
                    .then((result) => {
                         console.log(result.data.msg, 'drftgybhnj');
                         setData(result.data.msg.stepDetails);
                         setCss(result.data.msg.stepData);
                         // console.log(result.data.msg, "step details");
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

     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Steps")}
                         />
                         <Row>
                              <Heading css={css} setCss={setCss} />
                              <div className='row '>
                                   <Button className='btn btn-success ' onClick={handleChange} style={{ width: '200px', margin: 'auto', marginTop: '15px' }}>Update</Button>
                              </div>
                         </Row>
                         <Row className='mt-5'>
                              <StepsTable data={data} items={items} setData={setData} />
                         </Row>
                    </Container>
               </div>
               <ToastContainer />
          </React.Fragment>
     )
}
LandingPageSteps.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageSteps);