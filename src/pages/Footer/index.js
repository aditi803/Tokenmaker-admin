import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
import axios from "axios"
import {

    Form,
    Label,
    Card,
    CardBody,
    CardTitle,

    Input
} from "reactstrap"
import InputMask from "react-input-mask"
import { FOOTER, FOOTER_PUT } from 'common/api';
import { toast } from 'react-toastify';
import Spinner from 'loader';
import useApiStatus from 'hooks/useApiStatus';

function Footer(props) {
    const [footer, setFooter] = useState({})

    const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        changeApiStatus(true)
        setLoader(false)
        fetchData()
    }, [setFooter])

    const fetchData = async () => {
        await axios.get(FOOTER)
            .then((res) => {
                setFooter(res.data.msg)
                setApiSuccess()
                changeApiStatus(false)
            })
            .catch((err) => {
                changeApiStatus(false)
                setApiFailed(err.message)
            })
    }

    const onChangeHandler = async (e) => {
        e.preventDefault()
        // console.log(e.target.value, "onchange e target side ")
        const { name, value } = e.target
        setFooter({
            ...footer, [name]: value
        })


    }


    const footerUpdate = async () => {
        changeApiStatus(true)
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        await axios.put(FOOTER_PUT, footer,
            { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
            .then((res) => {
                setApiSuccess()
                    changeApiStatus(false)
                fetchData()
                toast.success("Updated Successfully")
            }).catch((err) => {
                changeApiStatus(false)
                    setApiFailed(err.message)
                toast.error("Cannot update")
            })
            setLoader(false)
    }

    return apiStatus.inProgress ? <Spinner /> : (
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
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            value={footer.companyName}
                                                            className="form-control input-color"
                                                            name='companyName'
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date2"> Footer-Text: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            value={props.value}
                                                            className="form-control input-color"
                                                            onChange={onChangeHandler}
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
                                                            value={footer.websiteName}
                                                            name='websiteName'
                                                            className="form-control input-color"
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-mask">Footer-Text:</Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            value={props.value}
                                                            className="form-control input-color"
                                                            onChange={onChangeHandler}
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
                                                            value={footer.contentColor}
                                                            className="form-control input-color"
                                                            onChange={onChangeHandler}
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
                                                            value={footer.backgroundColor}
                                                            className="form-control input-color"
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Button
                                            color="success"
                                            className="mt-1"
                                            onClick={footerUpdate}
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