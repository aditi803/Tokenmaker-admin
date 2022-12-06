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
import {
  CFormSelect,
} from "@coreui/react"
import axios from "axios"
import { toast } from 'react-toastify'
import useApiStatus from "hooks/useApiStatus"

const CommissionEdit = props => {
  const { isOpen, toggle, editData, fetchData, getData } = props
  const [category, setCategory] = useState([])
  const [networks, setNetworks] = useState([])

  const [editAllData, setEditAllData] = useState();


  // console.log(editAllData, 'ADITITTITITITITTITITOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOIi')

  useEffect(() => {
    setEditAllData(editData)
  }, [editData])


  useEffect(() => {
    // setEditAllData(editData)
    let currentParentNet = editData?.parentNetworkName
    const afterFilter = category.filter((item) => item.categoryName == currentParentNet)
    setNetworks(afterFilter.map((items) => {
      return items.networks
    }))

  }, [editData, category])
  
  // console.log(networks, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>?????????????>>>>>>>>>>>>>>>>>>>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPP')


  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const [close, setClose] = useState(true)
  // const [network, setNetwork] = useState()
  // const [networkStatus, setNetworkStatus] = useState(editData?.networkSymbol)
  // const [selected, setSelected] = useState("All")
  const [categoryStatus, setCategoryStatus] = useState([])
  

  const handleClose = () => {
    setClose(toggle)
  }

  // console.log(editData, "Edit Data")
  

  const fetchNetwork = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/network/networkdetails")
      .then(res => {
        setCategory(res.data.msg.items)
        // console.log(res.data.msg.items, '>>>>>>>>>>>>>>>>>CATEFGIHJGHVHVGHVGhjvj')
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
  }, [])

  const onChangeParentNet = (e) => {
    // console.log('ONCHANGEONFBVHGFHJKL:LLLLLLLLLL::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
    const currentParentNet = e.target.value
    // console.log(currentParentNet,"current parent value-------")
    setCategoryStatus(e.target.value)

    const afterFilter = category.filter((item) => item.categoryName === currentParentNet)
    // console.log(afterFilter, "commission edit  after filter----------------------------------------------------------------------")
    setNetworks(afterFilter.map((items) => {
      return items.networks
    }))



    setEditAllData((prev) => (
      {
        ...prev,
        parentNetworkName: e.target.value
      }
    ))

  }

  const data = {
    parentNetworkName: editData?.parentNetworkName,
    subNetworkName: editData?.subNetworkName,
    _id: editData?._id,
    networkCommissionFee: editAllData?.networkCommissionFee
  }

  const handleUpdate = async () => {
    axios
      .put(
        "https://tokenmaker-apis.block-brew.com/commission/commission",
        data,
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
  // const checking = () => {
  //   let checked = getData.find((category) => {
  //     if (category.subNetworkName === editAllData?.subNetworkName) {
  //       return true
  //     }
  //     else {
  //       return false
  //     }
  //   })
  // }

  // console.log(networks, "networks data commision edit side ")
  const [checkValue, setCheckValue] = useState(false)
  // const [check, setCheck] = useState(
  //   checking
  // )
 

  // console.log(checked, "Checked value jao ab bta aaaooooooooooooooo")


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
        <ModalHeader toggle={toggle}>Update Commissions</ModalHeader>
        <ModalBody>
          <p>Parent-network Name</p>
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            name="parentNetworkName"
            value={editAllData?.parentNetworkName}
            defaultValue={editAllData?.parentNetworkName}
            onChange={onChangeParentNet}
            disabled
          >
            {category?.map((content, i) => {
              return (
                <>
                
                  <option
                    key={i}
                    // disabled
                    value={content.categoryName}
                  >
                    {content.categoryName}
                  </option>
                </>
              )
            })}
          </CFormSelect>
          <p className="my-2">Sub-network Name</p>
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            name="subNetworkName"
            value={editAllData?.subNetworkName}
            defaultValue={editAllData?.subNetworkName}
            onChange={e => setEditAllData((...prev) => ({
              ...prev,
              subNetworkName: e.target.value
            }))}
            disabled
          >


            {networks[0]?.map((content, i) => {
              return (
                <>
                {console.log(content, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>CONTENTMMMMMMMMMMMMMMMMMMMMMMMM')}
                  <option
                    // disabled
                    key={i}
                    value={content.networkName}
                  >
                    {content.networkName}
                  </option>
                </>
              )
            })}
          </CFormSelect>

          {/* <p className="my-2">Commission Fee</p>
          <input
            type="text"
            className="form-control"
            placeholder={editAllData?.networkCommissionFee}
            value={editAllData?.networkCommissionFee}
            onChange={e => setEditAllData((...prev) => ({
              ...prev,
              networkCommissionFee: e.target.value
            }))}
          /> */}
          <p className="my-2">Commission Type: <span style={{textDecoration:"underline"}}>{" "}{editAllData?.tokenType}</span></p>
          {/* <p className="my-2"></p> */}
          <input
            type="text"
            className="form-control"
            placeholder={editAllData?.networkCommissionFee}
            value={editAllData?.networkCommissionFee}
            onChange={e => setEditAllData((prev) => ({
              ...prev,
              networkCommissionFee: e.target.value
            }))}
          />

        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={handleUpdate}>
            Update
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}
export default CommissionEdit

CommissionEdit.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

