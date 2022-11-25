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

const FaqEdit = props => {
    const { isOpen, toggle, editData, fetchData } = props

    const authUser = JSON.parse(localStorage.getItem("authUser"))

    // console.log(editData, ">>>>>>>>>>>>>>>>>")
    console.log(authUser, ">>>>>>>>>>>>>>>>>")

    const [value, setValue] = useState()
    // const [value2, setValue2] = useState(editData?.answer)
    const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }

    useEffect(() => {
        setValue(prev => ({
          ...prev,
          question: editData?.question,
          answer: editData?.answer,
          _id:editData?._id
        }))
        // setValue2(editData?.content)
      }, [editData])

    const handleUpdate = async () => {
        axios
            .put(
                "https://tokenmaker-apis.block-brew.com/faq/editfaq",
                { ...editData, ...value },
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
                <ModalBody>
                    {/* <p>{`${editData?.networkSymbol} ${editData?.networkName}`}</p> */}
                    <Label>Question</Label>
                    <InputMask
                        className="form-control input-color "
                        type="text"
                        placeholder={value}
                        value={value?.question}
                        onChange={e => setValue(prev => ({...prev, question: e.target.value}))}
                    />
                    <Label className="mt-2">Answer</Label>
                    <textarea
                        className="form-control input-color "
                        // type="text-area"
                        // placeholder={value2}
                        value={value?.answer}
                        onChange={e => setValue(prev => ({...prev, answer: e.target.value}))}
                    />
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

FaqEdit.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default FaqEdit
