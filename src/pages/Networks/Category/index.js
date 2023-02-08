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
import CategoryAdd from "./modals/CategoryAdd"
import CategoryEdit from "./modals/CategoryEdit"

function Category(props) {
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const [modal1, setModal1] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)

  const [addModal, setAddModal] = useState(false)
  const toggleAddModal = () => setAddModal(!addModal)

  const [edit, setEdit] = useState() 
  const [pageData, setPageData] = useState({ current: 1, totalItems: 0, pageSize: 10 })

  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(true)

  const [data, setData] = useState([])

  

  const fetchData = async (
    page = 1,
    limit = 10,
    exportRequest = "false"
  ) => {
    try {
      changeApiStatus(true, "")
      const list = await axios.get(
        `https://tokenmaker-apis.block-brew.com/category/categorys`
      )
      if (exportRequest === "true") {
        return changeApiStatus(false, "")
      }
      if (list.status === 200) {
        changeApiStatus(false, "")
        console.log(list,"Category list")

        setPageData({
          ...pageData,
          totalItems: list.data.totalItems,
          current: page,
        })
        setData(
          list.data.msg.items.map((val, index) => {
            return { ...val, serial: index + 1 }
            console.log(list.data.msg, "Commission data ")
          })
        )
      } else {
        throw new Error(list.error)
      }
    } catch (err) {
      changeApiStatus(false)
    }
  }
  useEffect(() => {
    fetchData(pageData.current, pageData.pageSize)
    // eslint-disable-next-line
  }, [pageData.current, pageData.pageSize])


  const deleteNetwork = categoryId => {
    toastConfirm("Are you sure you want to delete this?")
      .fire()
      .then(async (val) => {
        if (val.isConfirmed) {
          try {
            changeApiStatus(true, "")
            const authUser = JSON.parse(localStorage.getItem("authUser"))
            const list = await axios.delete(
              `https://tokenmaker-apis.block-brew.com/category/categorydelete/${categoryId}`,
              {
                headers: {
                  Authorization: `Bearer ${authUser.msg.jsonWebtoken}`,
                },
              }
            )
            console.log(list, "list delete handler side ")
            if (list?.status === 200) {
              changeApiStatus(false)
              toast.success("Category deleted successfully")
              fetchData()
            } else {
              toast.error("list is undefined")
              // throw new Error(DeleteData.error)
            }
          } catch (err) {
            console.log(err, "err delete handler side ")
            toast.error("error", err.response ? err.response.data.error : err)
            changeApiStatus(false, err.response ? err.response.data.error : err)
          }
        }
      })
  }

  const columns = [
    {
      name: "Sr. no",
      selector: row => {
        return row.serial + (pageData.current - 1) * pageData.pageSize
      },
    },
    {
      name: "Category",
      selector: row => row.categoryName,
    },
    {
      name: "Actions",
      selector: row => (
        <>
          <CIcon
            icon={cilPencil}
            className="text-warning hand me-2"
            onClick={() => {
              toggleViewModal()
              setEdit(row);
            }}
          />
          <CIcon
            icon={cilTrash}
            className="text-danger hand"
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
      <CategoryEdit isOpen={modal1} toggle={toggleViewModal} editData={edit} fetchData={fetchData}/>
      <CategoryAdd isOpen={addModal} toggle={toggleAddModal} fetchData={fetchData}/>
      <div className="page-content">
        {apiStatus.inProgress ? (
          <Spinner />
        ) : (
          <Container fluid>
            <p
              style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
            >Add Category</p>
            <Row>
              <Card>
                <CardBody>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="mb-4 h4 card-title">Category</div>
                    <Button
                      color="primary"
                      className="mt-1"
                      onClick={toggleAddModal}
                      style={{backgroundColor:"#2a3042"}}
                    >
                      Add
                    </Button>
                  </div>
                  <DataTable
                    striped
                    columns={columns}
                    data={data}
                    paginationDefaultPage={pageData.current}
                    paginationPerPage={pageData.pageSize}
                    pagination={true}
                    progressPending={apiStatus.inProgress}
                    paginationServer
                    paginationTotalRows={pageData.totalItems}
                    paginationRowsPerPageOptions={[10, 20]}
                    onChangePage={e => setPageData({ ...pageData, current: e })}
                    onChangeRowsPerPage={e => setPageData({ ...pageData, pageSize: e })}
                  />
                </CardBody>
              </Card>
            </Row>
          </Container>
         )} 
      </div>
    </React.Fragment>
  )
}

Category.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(Category)
