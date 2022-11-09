import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import InputMask from "react-input-mask"
import {
     Form,
     Label,
     Card,
     CardBody,
     CardTitle,
     Input
 } from "reactstrap"

function General (props) {
    return(
        <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("General Settings")}
                         />
                         <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">General Settings</CardTitle>
                                    <Form>
                                        <Row>
                                            <Col lg={6}>
                                                <div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date1">Company Name: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            // value={footer.companyName}
                                                            className="form-control input-color"
                                                            name='companyName'
                                                            // onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date2"> Footer-Text: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            // value={props.value}
                                                            className="form-control input-color"
                                                            // onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-4 mt-lg-0">
                                                    <div className="form-group mb-4">
                                                        <Label for="input-repeat">Website Name:</Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            // value={footer.websiteName}
                                                            name='websiteName'
                                                            className="form-control input-color"
                                                            // onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-mask">Footer-Text:</Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            // value={props.value}
                                                            className="form-control input-color"
                                                            // onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row>

                                            <Col lg={6}>
                                                <div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date1">Content Color: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            name='contentColor'
                                                            // value={footer.contentColor}
                                                            className="form-control input-color"
                                                            // onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date2"> Background Color: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            name='backgroundColor'
                                                            // value={footer.backgroundColor}
                                                            className="form-control input-color"
                                                            // onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Button
                                            color="success"
                                            className="mt-1"
                                        //     onClick={footerUpdate}
                                        >
                                            Update
                                        </Button>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    </Container>
               </div>
          </React.Fragment>
    )
}

General.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(General);