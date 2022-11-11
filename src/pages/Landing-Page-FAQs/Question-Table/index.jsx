import { Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import MessageModal from "pages/MessageModal"
import React from "react"
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useState, useEffect } from "react"
import { EditOutlined, DeleteSharp } from "@mui/icons-material"
import { Button, Modal } from "react-bootstrap"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { fireToast, toastConfirm } from "common/toast";
import useApiStatus from "hooks/useApiStatus"
import { FAQS, FAQS_EDIT, FAQS_POST } from "common/api"
import Spinner from "loader"

const Item = ({ value, i, editHandler, edit }) => {
  return (
    <>
      <Col lg="1">{i + 1}</Col>
      <Col lg="3">
        {edit == i ? (
          <textarea
            className="w-100"
            value={value.question}
            onChange={e => editHandler(i, { Question: e.target.value })}
          />
        ) : (
          value.question
        )}
      </Col>
      <Col lg="6">
        {edit == i ? (
          <textarea
            className="w-100"
            value={value.answer}
            onChange={e => editHandler(i, { Answer: e.target.value })}
          />
        ) : (
          value.answer
        )}
      </Col>
    </>
  )
}

const List = ({ data, editHandler, edit, toggleEdit, deleteHandler }) => {
  return (
    <React.Fragment>
      {data?.map((value, index) => (
        <Row key={index} className="mb-5">
          <Item
            key={index}
            i={index}
            edit={edit}
            index={index}
            toggleEdit={toggleEdit}
            editHandler={editHandler}
            value={value}
          />
          <Col lg="2">
            <span
              onClick={() => {
                toggleEdit(value)
              }}
            >
              <EditOutlined />
            </span>
            <span
              className="ms-3"
              onClick={() => {
                deleteHandler(value)
              }}
            >
              <DeleteSharp />
            </span>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  )
}
export default function QuestionTable(props) {
  const [edit, setEdit] = useState(undefined)
  const [show, setShow] = useState(false)
  const { items, setItems } = props
  const [faq, setFaq] = useState({ question: "", answer: "" })
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const handleClose = () => {
    setShow(false), setShow1(false), setShow2(false), setShow3(false)
  }

  const [css, setCss] = useState({})
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    changeApiStatus(true)
    axios.get(FAQS)
      .then((result) => {
        setData(result.data.msg.faqDetails);
        setCss(result.data.msg.faqData);
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        setItems(authUser);
        setApiSuccess()
        changeApiStatus(false)
      }).catch(err => {
        console.log(err);
        changeApiStatus(false)
      setApiFailed(err.message)
      })
      setLoader(false)
  }
  //ends here 
  const addHandler = async () => {
    changeApiStatus(true)
    handleClose()
    try {
      const addFaqResponse = await axios.post(
        FAQS_POST,
        {
          question: faq.question,
          answer: faq.answer,
        },
        { headers: { Authorization: `Bearer ${items.msg.jsonWebtoken}` } }
      )
      console.log(addFaqResponse.status)
      if (addFaqResponse.status == 200) {
        toast.success('Faq Added Successfully !')
        setFaq({ question: "", answer: "" })
        setApiSuccess()
        changeApiStatus(false)
        getData();
      }
    } catch (error) {
      changeApiStatus(false)
      setApiFailed(err.message)
      toast.error('Faq Addition Error !')
      setFaq({ question: "", answer: "" })
    }
    setLoader(false)
  }

  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   setItems(Items => arrayMove(Items, oldIndex, newIndex))
  // }
  const editHandler = async (value) => {
    changeApiStatus(true)
    handleClose()
    try {
      const faqId = value._id;
      const updateFaqResponse = await axios.put(FAQS_EDIT, {
        faqId: faqId, question: value.question, answer: value.answer
      }, {
        headers:
          { "Authorization": `Bearer ${items.msg.jsonWebtoken}` }
      })
      console.log(updateFaqResponse.status);
      if (updateFaqResponse.status === 200) {
        setApiSuccess()
        changeApiStatus(false)
        toast.success('Faq Updated Successfully !')
        setEdit({});
      }
    } catch (error) {
      changeApiStatus(false)
      setApiFailed(err.message)
      toast.error('Already Updated!!')
      console.log(updateFaqResponse.status)
      setEdit({})
    }
    setLoader(false)
  }

  const deleteHandler = (value) => {
    changeApiStatus(true)
    toastConfirm('Are you sure you want to delete this?')
      .fire()
      .then(async (val) => {
        if (val.isConfirmed) {
          try {
            changeApiStatus(true, '')
            // const token = items.msg.jsonWebtoken
            const faqId = value._id;
            const list = await axios.delete(`https://tokenmaker-apis.block-brew.com/cms/deletefaq/${faqId}`, { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } })
            console.log(list, 'list delete handler side ')
            if (list?.status === 200) {
              setApiSuccess()
              changeApiStatus(false)
              toast.success('FAQ deleted successfully')
              setFaq({ question: "", answer: "" })
              getData()
            } else {
              toast.error("list is undefined")
              // throw new Error(destroySection.error)
            }
          } catch (err) {
            console.log(err, "err delete handler side ")
            toast.error('error', err.response ? err.response.data.error : err)
            changeApiStatus(false, err.response ? err.response.data.error : err)
            setFaq({ question: "", answer: "" })
            setApiFailed(err.msg)
          }
        }
      })
      setLoader(false)
  }

  const toggleEdit = (value) => {
    // console.log(i)
    setShow1(true)
    setEdit(value)
  }
  return (
    <React.Fragment>
      {apiStatus.inProgress ? <Spinner /> : <Card className="mt-5">
        <CardBody>
          <Row className="justify-content-end">
            <button
              className="btn btn-primary"
              onClick={() => setShow(true)}
              style={{ width: "200px", marginBottom: "20px" }}
            >
              Add FAQ
            </button>
          </Row>
          <Row className="mb-5">
            <Col lg="1" className="">
              {"S.No"}
            </Col>
            <Col lg="3" className="">
              {"Questions"}
            </Col>
            <Col lg="6" className="">
              {"Answer"}
            </Col>
            <Col lg="2" className="">
              {"Action"}
            </Col>
          </Row>
          <List
            data={data}
            edit={edit}
            toggleEdit={toggleEdit}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        </CardBody>
      </Card>
      }


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> ADD FAQ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="Question">Question</label>

              <input
                type="text"
                className="form-control"
                onChange={e => {
                  setFaq({ ...faq, question: e.target.value })
                  console.log(faq)
                }}
                id="Question"
                aria-describedby="emailHelp"
                placeholder="Question...."
              />
            </div>
            <div className="form-group">
              <label htmlFor="Answers">Answer</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                onChange={e => {
                  setFaq({ ...faq, answer: e.target.value })
                }}
                id="Answers"
                placeholder="Answers" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addHandler}>
            ADD FAQ
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit-Faq-Qus/Ans</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="Question">Question</label>
              <input
                type="text"
                className="form-control"
                value={edit == undefined ? null : edit == null ? null : edit.question}
                onChange={e => {
                  console.log(items[edit])
                  setEdit({ ...edit, question: e.target.value })
                }}
                id="Question"
                aria-describedby="emailHelp"
                placeholder="Question...." />
            </div>
            <div className="form-group">
              <label htmlFor="Answers">Answer</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                value={edit == undefined ? null : edit == null ? '' : edit.answer}
                onChange={e => {
                  setEdit({ ...edit, answer: e.target.value })
                }}
                id="Answers"
                placeholder="Answers"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { editHandler(edit) }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}
