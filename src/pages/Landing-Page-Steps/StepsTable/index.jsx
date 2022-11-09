// import {
//      Card,
//      CardBody,
//      CardHeader,
//      Col,
//      Row,
// } from "reactstrap";
// import React from 'react';
// import { useState } from "react";
// import { EditOutlined, DeleteSharp } from "@mui/icons-material";

// const Item = ({ item, index, editHandler, deleteHandler }) => {
//      const [edit, setEdit] = useState(false);

//      return (
//           <Row className='mb-5'>
//                <Col lg='1'>{item.sno}</Col>
//                <Col lg='3'>{edit ? <textarea value={item.title} onChange={(e) => editHandler(index, { title: e.target.value })} /> : item.title}</Col>
//                <Col lg='6'>{edit ? <textarea value={item.content} onChange={(e) => editHandler(index, { content: e.target.value })} /> : item.content}</Col>
//                <Col lg='2'><span onClick={() => setEdit(prev => !prev)}><EditOutlined /></span><span className="ms-3" onClick={() => deleteHandler(index)}><DeleteSharp /></span></Col>
//           </Row>
//      )
// }

// const List = ({ items, editHandler, deleteHandler }) => {

//      return (
//           <Col lg="12">
//                {items.map((item, index) => (
//                     <Item key={index} item={item} index={index} editHandler={editHandler} deleteHandler={deleteHandler} />
//                ))}
//           </Col>
//      );
// }
// export default function StepsTable() {
//      const [items, setItems] = useState([
//           {
//                sno: '1',
//                title: 'Install MetasMask',
//                content: "If you don't have it yet, please make sure to install MetaMask or any of the supported wallets"
//           },
//           {
//                sno: '2',
//                title: 'Deposit cryto on your wallet',
//                content: "Make sure you have enough crypto available to pay for Smart Contract creation"
//           },
//           {
//                sno: '3',
//                title: 'Fill-out Token details',
//                content: "We need basic information (Token Name, Symbol) and eventually more depending on the complexity of your Token"
//           },
//           {
//                sno: '4',
//                title: 'Deploy your Token',
//                content: "That's it, you're good to go! Confirm transaction on MetaMask and your Token will be ready in a matter of minutes."
//           }
//      ]);

//      const editHandler = (index, value) => {
//           setItems(Items => Items.map((item, i) => i === index ? ({ ...item, ...value }) : item))
//      };
//      const deleteHandler = (index) => {
//           setItems(Items => Items.filter((item, i) => i !== index));
//      };
//      return (
//           <React.Fragment>
//                <Card>
//                     <CardHeader>
//                          <Row><Col lg='1' >{'Step No.'}</Col><Col lg='3' >{'Title'}</Col><Col lg='6' >{'Content'}</Col><Col lg='2' >{'Action'}</Col></Row>
//                     </CardHeader>
//                     <CardBody>
//                          <List items={items} editHandler={editHandler} deleteHandler={deleteHandler} />
//                     </CardBody>
//                </Card>
//           </React.Fragment>
//      )
// }



import {
     Card,
     CardBody,
     CardHeader,
     Col,
     Row,
} from "reactstrap";
import React from 'react';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useState, useEffect } from "react";
import { EditOutlined, DeleteSharp } from "@mui/icons-material";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { icon } from "leaflet";
import useApiStatus from "hooks/useApiStatus";
import { fireToast, toastConfirm } from "common/toast";

const Item = ({ value, i, editHandler, edit }) => {
     return (
          <>
               <Col lg='1'>{i + 1}</Col>
               <Col lg='3'>{edit == i ? <textarea className="w-100" value={value.title} onChange={(e) => editHandler(i, { title: e.target.value })} /> : value.title}</Col>
               <Col lg='6'>{edit == i ? <textarea className="w-100" value={value.content} onChange={(e) => editHandler(i, { content: e.target.value })} /> : value.content}</Col>
          </>
     )
}

const List = ({ data, editHandler, edit, toggleEdit, deleteHandler, show1, setShow2, show2, setDeleteIndex }) => {
     return (
          <React.Fragment>
               {data.map((value, index) => (
                    <Row key={index} className='mb-5'>
                         <Item key={index} show1={show1} i={index} edit={edit} index={index} toggleEdit={toggleEdit} editHandler={editHandler} value={value} />
                         <Col lg='2'><span onClick={() => { toggleEdit(value) }}><EditOutlined /></span>
                         <span className="ms-3" onClick={() => {
                         //   setDeleteIndex(index)
                         console.log(value);
                         deleteHandler(value._id);
                           ;} }><DeleteSharp /></span></Col>
                    </Row>
               ))}
          </React.Fragment>
     );
}
export default function StepsTable(props) {
     const [edit, setEdit] = useState(undefined);
     const [show, setShow] = useState(false)
     // const { items } = props;

     const [faq, setFaq] = useState({ title: '', content: '' })
     const [deleteStep, setDeleteStep] = useState(false);
     const [show2, setShow2] = useState(false)
     const [show1, setShow1] = useState(false)
     const handleClose = () => {setShow(false);setShow2(false);setShow1(false)}
     const[deleteIndex,setDeleteIndex]=useState(undefined)

     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [data, setData] = useState([])
     const [css, setCss] = useState({})
     const [items, setItems] = useState({})

     const getStepsData = async () => {
          await axios.get("https://tokenmaker-apis.block-brew.com/cms/steps")
               .then((result) => {
                    // console.log(result.data.msg, 'drftgybhnj');
                    setData(result.data.msg.stepDetails);
                    setCss(result.data.msg.stepData);
                    // console.log(result.data.msg, "step details");
                    const authUser = JSON.parse(localStorage.getItem('authUser'));
                    setItems(authUser);
               }).catch(err => {
                    console.log(err);
                    console.log('ghjtfg');
               })

     }
     //ends here
     const deleteHandler = (stepId) => {
          toastConfirm('Are you sure you want to delete this?')
               .fire()
               .then(async (val) => {
                    if (val.isConfirmed) {
                         try {
                              changeApiStatus(true, '')
                              const list = await axios.delete(`https://tokenmaker-apis.block-brew.com/cms/deletestep/${stepId}`, { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } })
                              console.log(list, 'list delete handler side ')
                              if (list?.status === 200) {
                                   // setApiSuccess()
                                   changeApiStatus(false)
                                   toast.success('success', 'Template deleted successfully')
                                   getStepsData()
                              } else {
                                   toast.error("list is undefined")
                                   // throw new Error(destroySection.error)
                              }
                         } catch (err) {
                              console.log(err, "err delete handler side ")
                              toast.error('error', err.response ? err.response.data.error : err)
                              changeApiStatus(false, err.response ? err.response.data.error : err)
                              setApiFailed(err.msg)
                         }
                    }
               })
     }
     //ends here

     useEffect(() => {
          getStepsData()
     }, [setData, setCss, setItems])


     const addHandler = () => {
          handleClose()
          setItems(prev => [...prev, { title: faq.title, content: faq.content }]);
          console.log(faq);
          setEdit([items.length]);

          //   setEdit(items);    
     }
     const onSortEnd = ({ oldIndex, newIndex }) => {
          // setItems(Items => arrayMove(Items, oldIndex, newIndex));
     };
     const editHandler = async (value) => {
          handleClose()
          console.log('fghjhnj');
          console.log(value);
          // setItems(Items => [Items.map((item, i) => i === index ? ({ ...item, ...value }) : item)], { Question: faq.Question, Answer: faq.Answer })
          try {
            const stepId=value._id;
                 const updateStepResponse=await axios.put(`https://tokenmaker-apis.block-brew.com/cms/editstep`,{
                stepId:stepId, title:value.title,content:value.content},{ headers:
                      { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } })
                      console.log(updateStepResponse.status);
            if(updateStepResponse.status===200){
               toast.success('edited successfully')
               setEdit({})
            }
          } catch (error) {
               toast.error('error occurred');
            console.log(updateStepResponse.status)
            setEdit({})
            
          }
        }

     const toggleEdit = (value) => {
          console.log(value);
          setShow1(true);
          setEdit(value);
     }
     return (
          <React.Fragment>
               <Card className='mt-5'>
                    <CardBody>
                         {/* <Row className="justify-content-end"><button className="btn btn-primary" onClick={() => setShow(true)} style={{ width: '200px', marginBottom: '20px' }}>Add FAQ</button></Row> */}
                         <Row className="mb-5"><Col lg='1' className="">{'S.No'}</Col><Col lg='3' className="">{'titles'}</Col><Col lg='6' className="">{'content'}</Col><Col lg='2' className="">{'Action'}</Col></Row>
                         <List show1={show1} show2={show2} setDeleteIndex={setDeleteIndex} setShow2={setShow2} data={data} edit={edit} toggleEdit={toggleEdit} deleteHandler={deleteHandler} editHandler={editHandler} onSortEnd={onSortEnd} />

                    </CardBody>
               </Card>

               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>FAQ</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, title: e.target.value }) }} id="title" aria-describedby="emailHelp" placeholder="title...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="contents">content</label>
                                   <textarea rows='5' type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, content: e.target.value }) }} id="contents" placeholder="contents" />
                              </div>
                              {/* <div className="form-group form-check">
                                   <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                   <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                              </div> */}
                              {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={addHandler}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>


               <Modal show={show2} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Delete Step</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" onChange={(e) => { setDeleteStep(e.target.value) }} id="title" aria-describedby="emailHelp" placeholder="title...." />
                              </div>

                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={deleteHandler}>
                              Delete Step
                         </Button >
                    </Modal.Footer>
               </Modal>


               <Modal show={show1} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Edit-FeatureList</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" value={edit==undefined?null:edit==null?null:edit.title} onChange={(e) => { setEdit({ ...edit, title: e.target.value }); 
                                   // setItems(items.map((ele, i) => { return edit === i ? { ...ele, title: e.target.value } : ele }))
                                    }}  id="title" aria-describedby="emailHelp" placeholder="title...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">
{console.log(edit)}
                                   <label htmlFor="contents">content</label>
                                   <textarea rows='5' type="text" className="form-control" value={edit==undefined?null:edit==null?null:edit.content} onChange={(e) => { setEdit({ ...edit, content: e.target.value }); 
                                   // setItems(items.map((ele, i) => { return edit === i ? { ...ele, content: e.target.value } : ele }))
                                    }} id="contents" placeholder="contents" />
                              </div>
                              {/* <div className="form-group form-check">
                                   <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                   <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                              </div> */}
                              {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={()=>{editHandler(edit)}}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>
               <ToastContainer/>

          </React.Fragment>
     )
}

