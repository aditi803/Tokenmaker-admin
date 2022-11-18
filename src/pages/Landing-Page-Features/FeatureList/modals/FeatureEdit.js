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

const FeatureEdit = props => {
    const { isOpen, toggle, editData, fecthData } = props

    const authUser = JSON.parse(localStorage.getItem("authUser"))

    // console.log(editData, ">>>>>>>>>>>>>>>>>")
    console.log(authUser, ">>>>>>>>>>>>>>>>>")
    const [close, setClose] = useState(true)
    const handleClose = () => {
        setClose(toggle)
      }

    const [value, setValue] = useState()
    // const [value2, setValue2] = useState(editData?.content)

    useEffect(() => {
        setValue(prev => ({
            ...prev,
            title: editData?.title,
            content: editData?.content,
            _id:editData?._id
          }))
    }, [editData])

    const handleUpdate = async () => {
        axios
            .put(
                "https://tokenmaker-apis.block-brew.com/cms/editfeature",
                { ...editData, ...value },
                { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
            )
            .then(res => {
                // console.log(res, ">>>>>>>>>>>>>")
                toast.success("Updated Successfully")
                handleClose()
                fecthData()
            })
            .catch(err => {
                // console.log(err, ">>>>>>>>>>>>>>")
                console.log(err,"Edit error")
                // toast.error("Already Updated")
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
                <ModalHeader toggle={toggle}>Update Feature</ModalHeader>
                <ModalBody>
                    {/* <p>{`${editData?.networkSymbol} ${editData?.networkName}`}</p> */}
                    <Label>Title</Label>
                    <InputMask
                        className="form-control input-color "
                        type="text"
                        placeholder={value}
                        value={value?.title}
                        onChange={e => setValue(prev =>({...prev, title: e.target.value}))}
                    />
                    <Label className="mt-2">Content</Label>
                    <textarea
                        className="form-control input-color "
                        // type="text-area"
                        // placeholder={value2}
                        value={value?.content}
                        onChange={e => setValue(prev => ({...prev, content: e.target.value}))}
                    ></textarea>
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

FeatureEdit.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default FeatureEdit
