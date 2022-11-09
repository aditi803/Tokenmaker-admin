import { Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import MessageModal from "pages/MessageModal"
import React from "react"
import { useState } from "react"
import { EditOutlined, DeleteSharp } from "@mui/icons-material"
import { Button, Modal } from "react-bootstrap"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

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
  const { data, setData, items, setItems } = props
  const [faq, setFaq] = useState({ question: "", answer: "" })
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const handleClose = () => {
    setShow(false), setShow1(false), setShow2(false), setShow3(false)
  }

  const addHandler = async () => {
    handleClose()
    try {
      const addFaqResponse = await axios.post(
        "https://tokenmaker-apis.block-brew.com/cms/faq",
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
      }
    } catch (error) {
    toast.error('Faq Addition Error !')
      console.log(addFaqResponse.status)
      setFaq({ question: "", answer: "" })
    }
  }

  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   setItems(Items => arrayMove(Items, oldIndex, newIndex))
  // }
  const editHandler = async (value) => {
    handleClose()
    try { const faqId=value._id;
           const updateFaqResponse=await axios.put(`http://localhost:3010/cms/editfaq`,{
          faqId:faqId, question:value.question,answer:value.answer},{ headers:
                { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } })
                console.log(updateFaqResponse.status);
      if(updateFaqResponse.status===200){
           toast.success('Faq Updated Successfully !')
           setEdit({});
      }
    } catch (error) {
      toast.error('Cannot Update Faq! error occured .')
      console.log(updateFaqResponse.status)
      setEdit({ })
    }
  }
  const deleteHandler = async value => {
    try {
      const token = items.msg.jsonWebtoken
      const faqId=value._id;
      console.log(token, "rftgyhnj")
      const deleteFaqResponse = await axios.delete(
        `http://localhost:3010/cms/deletefaq/${faqId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log(deleteFaqResponse)
      if (deleteFaqResponse.status == 200) {
        setShow2(true)
        setFaq({ question: "", answer: "" })
      }
    } catch (error) {
      setShow3(true)
      console.log(deleteFaqResponse.status)
      setFaq({ question: "", answer: "" })
    }
  }

  const toggleEdit = (value) => {
    console.log(value)
    setShow1(true)
    setEdit(value)
  }
  return (
    <React.Fragment>
      <Card className="mt-5">
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
                placeholder="Answers"/>
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
                value={edit==undefined?null:edit==null?null:edit.question}
                onChange={e => {
                  console.log(items[edit])
                  setEdit({ ...edit, question: e.target.value })
                }}
                id="Question"
                aria-describedby="emailHelp"
                placeholder="Question...."/>
            </div>
            <div className="form-group">
              <label htmlFor="Answers">Answer</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                value={edit==undefined?null:edit==null?'':edit.answer}
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
          <Button variant="primary" onClick={()=>{editHandler(edit)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>      
      <ToastContainer/>
    </React.Fragment>
  )
}
