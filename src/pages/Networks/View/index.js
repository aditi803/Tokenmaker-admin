import React from 'react';
import { Col, Container, Row, Button, Card } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
import { DeleteSharp, EditOutlined } from '@mui/icons-material';
// import Breadcrumb from '../../../components/Common/Breadcrumb';
import './view.css'


function View(props) {

     const networks = [
          {
               id: 1,
               img: 'https://ico-godpanel-apis.block-brew.com/uploads/a4o1lm0phcbnb-logo.svg',
          },
          {
               id: 2,
               img: 'https://ico-godpanel-apis.block-brew.com/uploads/a4o1lm0phcbnb-logo.svg',
          },
          // {
          //      id: 3,
          //      img: 'https://ico-godpanel-apis.block-brew.com/uploads/a4o1lm0phcbnb-logo.svg',
          // },
          // {
          //      id: 4,
          //      img: 'https://ico-godpanel-apis.block-brew.com/uploads/a4o1lm0phcbnb-logo.svg',
          // },
          // {
          //      id: 5,
          //      img: 'https://ico-godpanel-apis.block-brew.com/uploads/a4o1lm0phcbnb-logo.svg',
          // },

     ]
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("View")}
                         />
                         <Row>
                              <Col lg={12}>
                                   
                                        <div className="row gx-5 align-items-start justify-content-center">
                                             <div className="row gx-5 align-items-start justify-content-center">
                                                  {/* {category.map((content, i) => (
                                        <CCard className="mb-4">
                                        <span className=" d-block mt-2 mb-2 h4  fw-bold">
                                        {content.categoryName}{' '}
                                        </span> */}
                                                  <Card>
                                                       <div className="row mb-4">

                                                            {networks.map((net, i) => (

                                                                 <div
                                                                      className="col-xl-2 col-lg-3 col-md-3 overflow-hidden p-2 mx-4 my-3 columnBox"
                                                                      key={i}
                                                                 >
                                                                      <div className="box-outer">
                                                                           <span className="text-center d-block mt-2 fs-5 inner-logo">
                                                                                {/* {net.networkName}{' '} */}
                                                                           </span>
                                                                           <div className="logo">
                                                                                <img
                                                                                     className="checkmark"
                                                                                     src={net.img}
                                                                                     alt="img"
                                                                                />
                                                                           </div>

                                                                           <h6 className="text-center mt-2 fw-bold">
                                                                                <EditOutlined />
                                                                                <DeleteSharp />
                                                                                {/* <CIcon
                                  icon={cilPencil}
                                  className="text-warning hand me-2"
                                  onClick={() => {
                                    navigate(paths.getNetworksUpdate(content._id, net._id))
                                  }}
                                />
                                <CIcon
                                  icon={cilTrash}
                                  className="text-danger hand"
                                  onClick={() => deleteNet(net._id)}
                                /> */}
                                                                           </h6>
                                                                           <span className="text-center d-block">(Id: {net.networkKey})</span>
                                                                      </div>
                                                                 </div>
                                                            ))}

                                                       </div>
                                                  </Card>
                                                  {/* </CCard>
                                                  ))} */}
                                             </div>
                                        </div>
                                 
                              </Col>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

View.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(View);