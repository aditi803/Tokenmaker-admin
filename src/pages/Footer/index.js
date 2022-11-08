import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
import {

    Form,
    Label,
    Card,
    CardBody,
    CardTitle,

    Input
} from "reactstrap"
import InputMask from "react-input-mask"

function Footer(props) {
    const CompanyName = props => (
        <InputMask
            // mask="9999999999"
            value={props.value}
            className="form-control input-color"
            onChange={props.onChange}
        >
        </InputMask>
    )


    const WebsiteName = props => (
        <InputMask
            // mask="999.999.999.999"
            value={props.value}
            className="form-control input-color"
            onChange={props.onChange}
        >
        </InputMask>
    )
    const FooterText1 = props => (
        <InputMask
            // mask="99-9999999"
            value={props.value}
            className="form-control input-color"
            onChange={props.onChange}
        >
        </InputMask>
    )

    const FooterText2 = props => (
        <InputMask
            // mask="(999) 999-9999"
            value={props.value}
            className="form-control input-color"
            onChange={props.onChange}
        >
        </InputMask>
    )

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        title={props.t("Landing-Page")}
                        breadcrumbItem={props.t("Footer")}
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Footer Settings</CardTitle>
                                    <Form>
                                        <Row>
                                            <Col lg={6}>
                                                <div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date1">Company Name: </Label>
                                                        <CompanyName />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date2"> Footer-Text: </Label>
                                                        <FooterText1 />
                                                    </div>

                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-4 mt-lg-0">
                                                    <div className="form-group mb-4">
                                                        <Label for="input-repeat">Website Name:</Label>
                                                        <WebsiteName />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-mask">Footer-Text:</Label>
                                                        <FooterText2 />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button
                                            color="success"
                                            className="mt-1"
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
        </React.Fragment >
    )
}

Footer.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(Footer);