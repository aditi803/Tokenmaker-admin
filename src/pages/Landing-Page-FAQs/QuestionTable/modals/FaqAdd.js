import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import axios from 'axios';
import useApiStatus from "hooks/useApiStatus";
import { toast } from 'react-toastify'
import {InputMask} from "react-input-mask"
import Spinner from "loader";



const FaqAdd = (props) => {
  const { isOpen, toggle, fetchData } = props
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ question: "", answer: ""})
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }

  const data = {
    question: network.question,
    answer: network.answer,
  }

  const handleAddNetwork = async(e) => {
    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));
  
    e.preventDefault()
    await axios.post("https://tokenmaker-apis.block-brew.com/faq/newfaq", data, { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
      .then((res) => {
        console.log(res)
        setApiSuccess()
          changeApiStatus(false)
          toast.success("Network Added Successfully")
          handleClose()
          fetchData()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error', err.response ? err.response.data.error : err)
                  changeApiStatus(false, err.response ? err.response.data.error : err)
                  setApiFailed(err.msg)
      })
      setLoader(false)
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
        <ModalHeader toggle={toggle}>Add Faq</ModalHeader>
        <ModalBody>
          <Label className="my-2" name="networkName">Question:</Label>
          <input type='text'
            className="form-control input-color "
            placeholder="Enter your question?"
            onChange={e => {
              setNetwork({ ...network, question: e.target.value })
            }} 
            
            />
          <Label className="mt-1">Answer:</Label>
          <input type='text-area'
            name='content'
            className="form-control input-color "
            placeholder="Enter title here"
            onChange={e => {
              setNetwork({ ...network, answer: e.target.value })
            }} 
            />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={(e) => handleAddNetwork(e)}>
          {/* <Button type="button" color="success" onClick={toggle}> */}
            Save Changes
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

FaqAdd.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default FaqAdd
