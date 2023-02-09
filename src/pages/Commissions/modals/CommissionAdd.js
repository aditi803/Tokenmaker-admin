import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap"
import axios from 'axios';
import useApiStatus from "hooks/useApiStatus";
import { toast } from 'react-toastify'
import Spinner from "loader";
import { CFormSelect } from "@coreui/react";
import "../CommissionTable/comissionTable.css"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'


const CommissionAdd = (props) => {
  const { isOpen, toggle, fetchData, allData } = props
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ networkName: "", networkCommissionFee: "", networkSymbol: "" })
  const [commissionValue, setCommissionValue] = useState({ free: "", basic: "", custom: "" })

  const [free, setFree] = useState('')
  const [basic, setBasic] = useState('')
  const [custom, setCustom] = useState('')
  const [close, setClose] = useState(true)
  const [networkStatus, setNetworkStatus] = useState("")
  const [category, setCategory] = useState([])
  const [categoryStatus, setCategoryStatus] = useState("")
  const [networks, setNetworks] = useState([])

  const commissionSchema = Yup.object().shape({
    parentNetworkName: Yup.string().required('Enter Parent Network Name'),
    subNetworkName: Yup.string().required('Enter Sub network Name'),
    free: Yup.string().required('Enter commission fee for token type free'),
    basic: Yup.string().required('Enter commission fee for token type basic'),
    custom: Yup.string().required('Enter commission fee for token type custom'),
  })

  const handleClose = () => {
    setClose(toggle)
    setNetwork({ networkName: null, networkCommissionFee: null, networkSymbol: null })
    // setCategory(null)
  }

  const checkSubCategory = (val) => {
    return allData?.find(({ subNetworkName }) => {
      return subNetworkName === val
    })
  }

  const fetchNetwork = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/network/networkdetails")
      .then(res => {
        setCategory(res.data.msg.items)
        changeApiStatus(false)
      })
      .catch(err => {
        changeApiStatus(false)
        setApiFailed(err.message)
      })
    // setLoader(false)
  }
  useEffect(() => {
    fetchNetwork()
  }, [setCategory])


  const handleAddNetwork = async (e) => {
    
    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    const tokenData = {
      parentNetworkName: categoryStatus,
      subNetworkName: networkStatus,
      commissionDetails: [
        {
          tokenType: 'free',
          commissionFee: free
        },
        {
          tokenType: 'basic',
          commissionFee: basic
        },
        {
          tokenType: 'custom',
          commissionFee: custom
        },
      ]
    }

    await axios.post("https://tokenmaker-apis.block-brew.com/commission/networkcommission", 
      tokenData,
     { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
      .then((res) => {
        setApiSuccess()
        changeApiStatus(false)
        toast.success("Network Added Successfully")
        handleClose()
        fetchData()
      })
      .catch((err) => {
        toast.error("Already exisiting network")
        changeApiStatus(false, err.response ? err.response.data.error : err)
        setApiFailed(err.msg)
      })
    setLoader(false)
  }

  const onChangeParentNet = (e) => {
    setNetwork((prev) => ({
      ...prev,
      networkName: e.target.value
    }))
    const currentParentNet = e.target.value
    setCategoryStatus(e.target.value)

    const afterFilter = category.filter((item) => item.categoryName === currentParentNet)
    setNetworks(afterFilter.map((items) => {
      return items.networks
    }))

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
        <Formik initialValues={{
          parentNetworkName: '',
          subNetworkName: '',
          free: '',
          basic: '',
          custom: '',
        }}
          validationSchema={commissionSchema}
        onSubmit={(values, actions) => {  
          handleAddNetwork()
        }}
        >
          {({ values, setValues, setFieldValue, errors, touched }) => (
            <Form>
              <ModalBody>
                <label className="my-2" name="networkName">Parent Network Name</label>
                <div>
                  <CFormSelect
                    as="select"
                    className="form-control"
                    aria-label="Small select example"
                    onChange={(e) => {
                      onChangeParentNet(e)
                      setFieldValue('parentNetworkName', e.target.value)
                    }}
                  >
                    <option hidden>Select Network</option>
                    {category?.map((content, i) => {
                      return (
                        <option
                          key={i}
                          id={content._id}
                          name={content._id}
                          value={content.categoryName}
                        >
                          {content.categoryName}
                        </option>
                      )
                    })}
                    <span className="text-danger errormsg">
                      <ErrorMessage name="parentNetworkName" />
                    </span>
                  </CFormSelect>
                  {errors.parentNetworkName && touched.parentNetworkName ? (
                    <div className="input-error text-danger">{errors.parentNetworkName}</div>
                  ) : null}
                </div>

                <label className="my-2">Sub-network Name</label>
                <CFormSelect
                  className="form-control"
                  aria-label="Small select example"
                  onChange={e => {
                    setNetworkStatus(e.target.value); setNetwork((prev) => ({
                      ...prev,
                      networkName: e.target.value
                    }))

                    setFieldValue('subNetworkName', e.target.value)
                  }}
                  disabled={!network.networkName}
                >
                  <option hidden>Select Network</option>
                  {networks[0]?.map((content, i) => {
                    return (
                      <option
                        className="sub-option"
                        key={i}
                        disabled={checkSubCategory(content?.networkName)}
                        value={content.networkName}
                      >
                        {content.networkName}
                      </option>
                    )
                  })}
                </CFormSelect>
                {errors.subNetworkName && touched.subNetworkName ? (
                  <div className="input-error text-danger">{errors.subNetworkName}</div>
                ) : null}
                <label className="my-2">Commissions</label>
                <div>
                  <Row className="commissionAdd">
                    <Col lg={4}>
                      <p className="">Free</p>
                    </Col>
                    <Col lg={8}>
                      <input type='text'
                        name='free'
                        className="form-control"
                        placeholder="0.05"
                        onChange={e => {
                          setFree(e.target.value);
                          setFieldValue('free', e.target.value)
                        }}
                        disabled={!network.networkName}
                      />
                    </Col>
                    {errors.free && touched.free ? (
                    <div className="input-error text-danger">{errors.free}</div>
                  ) : null}
                  </Row>
                </div>
                <div>
                  <Row className="commissionAdd">
                    <Col lg={4}>
                      <p className="">Basic</p>
                    </Col>
                    <Col lg={8}>
                      <input
                        type='text'
                        name='basic'
                        className="form-control"
                        placeholder="0.05"
                        onChange={e => {
                          setBasic(e.target.value);
                          setFieldValue('basic', e.target.value)
                        }}
                        disabled={!network.networkName}
                      />
                    </Col>
                    {errors.basic && touched.basic ? (
                    <div className="input-error text-danger">{errors.basic}</div>
                  ) : null}
                  </Row>
                </div>
                <div>
                  <Row className="commissionAdd">
                    <Col lg={4}>
                      <p className="">Custom</p>
                    </Col>
                    <Col lg={8}>
                      <input type='text'
                        name='custom'
                        className="form-control"
                        placeholder="0.05"
                        onChange={e => {
                          setCustom(e.target.value);
                          setFieldValue('custom', e.target.value)
                        }}
                        disabled={!network.networkName}
                      />
                    </Col>
                    {errors.custom && touched.custom ? (
                    <div className="input-error text-danger">{errors.custom}</div>
                  ) : null}
                  </Row>

                </div>
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
    </Modal >
  )
}

CommissionAdd.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default CommissionAdd
