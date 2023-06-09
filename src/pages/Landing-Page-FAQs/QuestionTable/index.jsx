import React, { useMemo, useState, useEffect } from "react"
import { Col, Container, Row, Button, Card, CardBody } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import useApiStatus from "hooks/useApiStatus"
import { cilPencil, cilTrash } from "@coreui/icons"

import axios from "axios"
import { toast } from "react-toastify"
import { toastConfirm } from "common/toast"
import DataTable from "react-data-table-component"
import CIcon from "@coreui/icons-react"
import Spinner from "loader"
import FaqAdd from "./modals/FaqAdd"
import FaqEdit from "./modals/FaqEdit"


function QuestionTable(props) {
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const [modal1, setModal1] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)

  const [addModal, setAddModal] = useState(false)
  const toggleAddModal = () => setAddModal(!addModal)

  const [edit, setEdit] = useState()
  const [page, setPage] = useState({ current: 1, totalItems: 0, pageSize: 10 })

  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(true)

  const [data, setData] = useState([])

  const fetchData = async (
    pageNumber = 1,
    pageSize = 10,
    exportRequest = "false"
  ) => {
    try {
      changeApiStatus(true, "")
      const list = await axios.get(
        "https://tokenmaker-apis.block-brew.com/faq/faqsdata"
      )
      if (exportRequest === "true") {
        return changeApiStatus(false, "")
      }
      if (list.status === 200) {
        changeApiStatus(false, "")
        setPage({
          ...page,
          totalItems: list.data.totalItems,
          pageSize,
          current: pageNumber,
        })
        setData(
          list.data.msg.faqDetails.items.map((val, index) => {
            return { ...val, serial: index + 1 }
          })
        )
      } else {
        throw new Error(list.error)
      }
    } catch (err) {
      changeApiStatus(false)
    }
  }

  // console.log(data, "kjhgfds")


  useEffect(() => {
    fetchData(page.current, page.pageSize)
    // eslint-disable-next-line
  }, [page.current, page.pageSize])

  const deleteNetwork = id => {
    // changeApiStatus(true)
    toastConfirm("Are you sure you want to delete this?")
      .fire()
      .then(async val => {
        if (val.isConfirmed) {
          try {
            changeApiStatus(true, "")
            const authUser = JSON.parse(localStorage.getItem("authUser"))
            const list = await axios.delete(
              `https://tokenmaker-apis.block-brew.com/faq/deletefaq/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${authUser.msg.jsonWebtoken}`,
                },
              }
            )
            // console.log(list, "list delete handler side ")
            if (list?.status === 200) {
              // setApiSuccess()
              changeApiStatus(false)
              toast.success("Network deleted successfully")
              fetchData()
            } else {
              toast.error("list is undefined")
            }
          } catch (err) {
            // console.log(err, "err delete handler side ")
            toast.error("error", err.response ? err.response.data.error : err)
            changeApiStatus(false, err.response ? err.response.data.error : err)
            // setApiFailed(err.msg)
          }
        }
      })
    setLoader(false)
  }

  const columns = [
    {
      name: "Sr. no",
      selector: row => {
        return row.serial + (page.current - 1) * page.pageSize
      },
    },
    {
      name: "Question",
      selector: row => row.question,
    },

    {
      name: "Answer",
      selector: row => row.answer,
    },
    {
      name: "Actions",
      selector: row => (
        <>
          <CIcon
            icon={cilPencil}
            className="text-warning hand me-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleViewModal()
              setEdit(row);
            }}
          />
          <CIcon
            icon={cilTrash}
            className="text-danger hand"
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteNetwork(row._id)
            }}
          />
        </>
      ),
    },
  ]

  return (
    <React.Fragment>
      <FaqEdit isOpen={modal1} toggle={toggleViewModal} editData={edit} fetchData={fetchData} changeApiStatus={changeApiStatus}/>
      <FaqAdd isOpen={addModal} toggle={toggleAddModal} fetchData={fetchData} changeApiStatus={changeApiStatus}/>
      <div className="py-4">
        {apiStatus.inProgress ? (
          <Spinner />
        ) : (
          <Container fluid>
            <Row>
              <Card>
                <CardBody>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="mb-4 h4 card-title">FAQs Data</div>
                    <Button
                      color="primary"
                      className="mt-1"
                      onClick={toggleAddModal}
                      style={{ backgroundColor: "#34c384", borderColor: "#34c384" }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className='table-responsive'>
                    <DataTable
                      style={{ overflowY: "none !important", display: "unset !important" }}
                      striped
                      columns={columns}
                      data={data}
                      pageSize={10}
                      paginationPerPage={10}
                      paginationServer
                      paginationTotalRows={page.totalItems}
                      paginationRowsPerPageOptions={[10, 20]}
                      onChangePage={e => setPage({ ...page, current: e })}
                      onChangeRowsPerPage={e => setPage({ ...page, pageSize: e })}
                    />
                  </div>

                </CardBody>
              </Card>
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}

QuestionTable.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(QuestionTable)
