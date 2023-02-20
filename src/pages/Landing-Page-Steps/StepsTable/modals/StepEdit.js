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
  Label,
} from "reactstrap"
import axios from "axios"
import InputMask from "react-input-mask"
import { toast } from "react-toastify"

const StepEdit = props => {
  const { isOpen, toggle, editData, fetchData, changeApiStatus } = props

  const [stepImages, setStepImages] = useState({
    blob: null,
    url: ''
  })

  // console.log(stepImages, '>>>>>>>>>>>>>>>>>>>>CONSOLE')

  // console.log(editData, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EDIT DATAATTATATATA")

  const authUser = JSON.parse(localStorage.getItem("authUser"))

  // console.log(editData, ">>>>>>>>>>>>>>>>>")
  // console.log(authUser, ">>>>>>>>>>>>>>>>>")

  const [value, setValue] = useState()
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }
  // const [value2, setValue2] = useState()

  // console.log(editData?._id,"ID edit data")
  useEffect(() => {
    setValue(prev => ({
      ...prev,
      title: editData?.title,
      content: editData?.content,
      stepImage: editData?.stepImage,
      _id: editData?._id
    }))
    // setValue2(editData?.content)
  }, [editData])

  // console.log(value, "value step ")

  const handleUpdate = async () => {

    handleClose()
    changeApiStatus(true)
    // console.log('ADTITI')
    const formData = new FormData();
    
    let formattedData;
    if (stepImages.blob) {
      delete value.stepImage
      for (let variable in value) {
        formData.append(variable, value[variable])
      }
      formData.append('stepImage', stepImages.blob)
      formattedData = formData
    } else {
      formattedData = { ...editData, ...value }
    }

    axios
      .put(
        "https://tokenmaker-apis.block-brew.com/step/editstep",
        formattedData,
        { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
      )
      .then(res => {
        // console.log(res, ">>>>>>>>>>>>>")
        // console.log(value, "value step then")
        changeApiStatus(false)
        toast.success("Updated Successfully")
        handleClose()
        fetchData()
      })
      .catch(err => {

        changeApiStatus(false)
        toast.error("Already Updated")
      })
  }

  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"

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
          <Label>Title</Label>
          <InputMask
            className="form-control input-color "
            type="text"
            placeholder={value}
            value={value?.title}
            onChange={e =>
              setValue(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Label className="mt-2">Content</Label>
          <textarea
            className="form-control input-color "
            value={value?.content}
            onChange={e => setValue(prev => ({ ...prev, content: e.target.value }))}
          >
          </textarea>
          <Label className="mt-2">Image:</Label>
          <input
            type="file"
            hidden
            onChange={(e) => {
              setStepImages({
                blob: e.target.files[0],
                url: window.URL.createObjectURL(e.target.files[0])
              })
            }}
            className="form-control input-color"
            id="edit-step-data"
          />
          <label id="edit-steps-data" htmlFor="edit-step-data">
            <img src={stepImages?.blob ? stepImages?.url : `${imageBaseUrl}/${value?.stepImage}`} height="72px" />
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

StepEdit.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default StepEdit
