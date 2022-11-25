import React, { useState, useEffect } from "react"
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
import { CFormSelect } from "@coreui/react";



const CommissionAdd = (props) => {
  const { isOpen, toggle, fetchData } = props
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ networkName: "", networkCommissionFee: "", networkSymbol: "" })
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
   const [networks, setNetworks] = useState()
  const [networkStatus, setNetworkStatus] = useState("")
  const handleClose = () => {
    setClose(toggle)
  }

  const fetchNetwork = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/network/networkdetails")
      .then(res => {
        setNetworks(res.data.msg.items)

        // setItems(authUser)
        console.log(res, "Add data view page")
        // setItems(authUser)
        changeApiStatus(false)
      })
      .catch(err => {
        console.log(err)
        changeApiStatus(false)
        setApiFailed(err.message)
      })
    // setLoader(false)
  }
  useEffect(() => {
    fetchNetwork()
  },[])

  const data = {
    networkName: network.networkName,
    networkCommissionFee: network.networkCommissionFee,
    networkSymbol: networkStatus.networkSymbol
  }

  const handleAddNetwork = async (e) => {
    e.preventDefault()

    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    console.log(network, "Network bhar")

    await axios.post("https://tokenmaker-apis.block-brew.com/commission/networkcommission", {
      networkName: network.networkName,
      networkCommissionFee: network.networkCommissionFee,
      networkSymbol: networkStatus
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
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            onChange={e => setNetworkStatus(e.target.value)}
            value={networkStatus}
          >
            {/* {console.log(networkStatus, "Network status")} */}
            <option hidden>Select Network</option>
            <option value={''}>All</option>

            {networks?.map((content, i) => {
              return (
                <>
                  <option
                    key={i}
                    value={content.symbol}
                  >
                    {content.symbol}
                  </option>
                </>
              )
            })}
          </CFormSelect>
          {/* <input type='text'
            name='networkSymbol'
            className="form-control"
            placeholder="ETH"
            onChange={e => {
              setNetwork({ ...network, networkSymbol: e.target.value })
            }}
          /> */}
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
