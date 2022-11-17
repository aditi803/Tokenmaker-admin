import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
import LatestTranaction from 'pages/Dashboard/LatestTranaction';
// import searchicon from '../../../assets/images/search-line.svg'
import searchicon from '../../assets/images/search-line.svg'
import calendarremovelines from '../../assets/images/calendar-remove-lines.svg'
import schedule from '../../assets/images/schedule.svg'
import downloadfileicon from '../../assets/images/download-file.svg'
// import Breadcrumb from '../../../components/Common/Breadcrumb';
// import DateRangePicker from 'react-bootstrap-daterangepicker'
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap-daterangepicker/daterangepicker.css'
import Spinner from '../../loader/index'
import { CCol,CButton, CFormSelect, CInputGroupText, CFormInput, CInputGroup, CFormLabel } from '@coreui/react';

function AllTokens(props) {
     const [loader, setLoader] = useState(false)
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         {/* <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("All Tokens")}
                         /> */}
                         <p
                              style={{color:"#2a3042", fontWeight:500, fontSize:"17px" }}
                         >All Tokens</p>
                         <Row>
                              <LatestTranaction loader={loader} setLoader={setLoader} />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

AllTokens.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(AllTokens);