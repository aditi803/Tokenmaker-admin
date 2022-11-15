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

const StepEdit = props => {
    const { isOpen, toggle, editData, fetchData } = props

    const authUser = JSON.parse(localStorage.getItem("authUser"))

    // console.log(editData, ">>>>>>>>>>>>>>>>>")
    console.log(authUser, ">>>>>>>>>>>>>>>>>")

    const [value, setValue] = useState(editData?.title)
    const [value2, setValue2] = useState(editData?.content)


    useEffect(() => {
        setValue(editData?.title)
        setValue2(editData?.content)
    }, [editData])

    const handleUpdate = async () => {
        axios
            .put(
                "https://tokenmaker-apis.block-brew.com/cms/editstep",
                { ...editData, title: value, content: value2 },
                { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
            )
            .then(res => {
                // console.log(res, ">>>>>>>>>>>>>")
                toast.success("Updated Successfully")
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
                <ModalHeader toggle={toggle}>Update Step</ModalHeader>
                <ModalBody>
                    {/* <p>{`${editData?.networkSymbol} ${editData?.networkName}`}</p> */}
                    <Label>Title</Label>
                    <InputMask
                        className="form-control input-color "
                        type="text"
                        placeholder={value}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Label className="mt-2">Content</Label>
                    <textarea
                        className="form-control input-color "
                        // type="text-area"
                        // placeholder={value2}
                        // value={value2}
                        onChange={e => setValue2(e.target.value)}
                    >{value2}</textarea>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Close
                    </Button>
                    <Button type="button" color="success" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

StepEdit.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default StepEdit
