import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import axios from 'axios';
import useApiStatus from "hooks/useApiStatus";
import { toast } from 'react-toastify'
import Spinner from "loader";



const CommissionAdd = (props) => {
  const { isOpen, toggle, fetchData } = props
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ networkName: "", networkCommissionFee: "", networkSymbol: "" })
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }

  const data = {
    networkName: network.networkName,
    networkCommissionFee: network.networkCommissionFee,
    networkSymbol: network.networkSymbol
  }

  const handleAddNetwork = async (e) => {
    e.preventDefault()

    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    console.log(network, "Network bhar")

    await axios.post("https://tokenmaker-apis.block-brew.com/cms/networkcommission", {
      networkName: network.networkName,
      networkCommissionFee: network.networkCommissionFee,
      networkSymbol: network.networkSymbol
    }, { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
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
        console.log(network, "Network ctahc")
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
        <ModalHeader toggle={toggle}>Add Commissions</ModalHeader>
        <ModalBody>
          <label className="my-2" name="networkName">Network Name</label>
          <input type='text'
            className="form-control"
            placeholder="Ethereum"
            onChange={e => {
              setNetwork({ ...network, networkName: e.target.value })
            }} />
          <label className="my-2">Commissions</label>
          <input type='text'
            name='networkCommissionFee'
            className="form-control"
            placeholder="0.05"
            onChange={e => {
              setNetwork({ ...network, networkCommissionFee: e.target.value })
            }} />

          <label className="my-2">Symbol</label>
          <input type='text'
            name='networkSymbol'
            className="form-control"
            placeholder="ETH"
            onChange={e => {
              setNetwork({ ...network, networkSymbol: e.target.value })
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={handleAddNetwork}>
            Save Changes
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

CommissionAdd.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default CommissionAdd
