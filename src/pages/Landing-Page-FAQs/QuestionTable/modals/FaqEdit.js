import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    Label
} from "reactstrap"
import axios from "axios"
import InputMask from 'react-input-mask'
import { toast } from "react-toastify"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'

const FaqEdit = props => {
    const { isOpen, toggle, editData, fetchData } = props

    const authUser = JSON.parse(localStorage.getItem("authUser"))

    const [value, setValue] = useState()
    const [close, setClose] = useState(true)
    const handleClose = () => {
        setClose(toggle)
    }

    useEffect(() => {
        setValue(prev => ({
            ...prev,
            question: editData?.question,
            answer: editData?.answer,
            _id: editData?._id
        }))
    }, [editData])

    const faqEditSchema = Yup.object().shape({
        question: Yup.string().required('Enter question'),
        answer: Yup.string().required('Enter answer'),
    })

    const handleUpdate = async (values) => {
        axios
            .put(
                "https://tokenmaker-apis.block-brew.com/faq/editfaq",
                values,
                { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
            )
            .then(res => {
                // console.log(res, ">>>>>>>>>>>>>")
                toast.success("Updated Successfully")
                handleClose()
                fetchData()
            })
            .catch(err => {
                // console.log(err, ">>>>>>>>>>>>>>")
                toast.error("Already Updated")
            })
    }

    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Update Faq</ModalHeader>
                <Formik initialValues={{
                    question: editData?.question,
                    answer: editData?.answer,
                    _id: editData?._id
                }}
                    validationSchema={faqEditSchema}
                    onSubmit={
                        handleUpdate
                    }
                >
                    {({ values, setValues, setFieldValue, errors, touched }) => (
                        <Form>
                            <ModalBody>
                                {/* <p>{`${editData?.networkSymbol} ${editData?.networkName}`}</p> */}
                                <Label>Question</Label>
                                <Field
                                    className="form-control input-color "
                                    type="text"
                                    name='question'
                                    placeholder="Enter question"
                                />
                                {errors.question && touched.question ? (
                                    <div className="input-error text-danger">{errors.question}</div>
                                ) : null}
                                <Label className="mt-2">Answer</Label>
                                <Field
                                    type="text"
                                    name='answer'
                                    placeholder="Enter answer"
                                    render={({ field, form, meta }) => (
                                        <>
                                            <textarea
                                                {...field}
                                                rows={3}
                                                className="form-control input-color "
                                            />

                                            {meta.error && meta.touched ? (
                                                <div className="text-danger">{meta.error}</div>
                                            ) : null}
                                        </>
                                    )}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button type="button" color="secondary" onClick={toggle}>
                                    Close
                                </Button>
                                <Button type="submit" color="success">
                                    Save Changes
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    )
}

FaqEdit.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default FaqEdit
