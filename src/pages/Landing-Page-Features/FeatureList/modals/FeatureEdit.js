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
    const { isOpen, toggle, editData, fetchData } = props

    const [featureImages, setFeatureImages] = useState({
        blob: null,
        url: ''
    })
    const authUser = JSON.parse(localStorage.getItem("authUser"))

    
    console.log(authUser, ">>>>>>>>>>>>>>>>>")
    const [close, setClose] = useState(true)
    const handleClose = () => {
        setClose(toggle)
    }

    const [value, setValue] = useState()
    const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
    // const [value2, setValue2] = useState(editData?.content)

    useEffect(() => {
        setValue(prev => ({
            ...prev,
            title: editData?.title,
            content: editData?.content,
            featureImage: editData?.featureImage,
            _id: editData?._id
        }))
    }, [editData])

    const handleUpdate = async () => {

        const formData = new FormData()
        let formattedData;
        if(featureImages.blob){
            delete value.featureImage
            for(let variable in value ){
                formData.append(variable, value[variable])
            }
            formData.append('featureImage', featureImages.blob)
            formattedData = formData
        }
        else{
            formattedData = {...editData, ...value}
        }

        axios
            .put(
                "https://tokenmaker-apis.block-brew.com/feature/editfeature",
                formattedData,
                { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
            )
            .then(res => {
                // console.log(res, ">>>>>>>>>>>>>")
                handleClose()
                fetchData()
                toast.success("Updated Successfully")
            })
            .catch(err => {
                // console.log(err, ">>>>>>>>>>>>>>")
                console.log(err, "Edit error")
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
                        onChange={e => setValue(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Label className="mt-2">Content</Label>
                    <textarea
                        className="form-control input-color "
                        // type="text-area"
                        // placeholder={value2}
                        value={value?.content}
                        onChange={e => setValue(prev => ({ ...prev, content: e.target.value }))}
                    ></textarea>
                    <Label className="mt-2">Images:</Label>
                    <input
                        type="file"
                        className="form-control input-color"
                        hidden
                        id="edit-image"
                        onChange={(e) => {
                           setFeatureImages({
                            blob: e.target.files[0],
                            url: window.URL.createObjectURL(e.target.files[0])
                           })
                        }}
                    />
                    <label id="edit-image" htmlFor="edit-image">
                        <img src={featureImages?.blob ? featureImages?.url : `${imageBaseUrl}/${value?.featureImage}`} height="72px" />
                    </label>
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
