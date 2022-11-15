import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Col, Row,Label,Input } from 'reactstrap';
import InputMask from "react-input-mask"
import InputColor from 'react-input-color';
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"
import axios from 'axios';
function Heading(props) {
     const [heading, setHeading] = useState('');
     const { data, setData } = props;
     const [background, setBackground] = useState('');
     const [color, setColor] = React.useState({})
     const [simple_color3, setsimple_color3] = useState(0)
     const [simple_color2, setsimple_color2] = useState(0)
     const handleHor = color => {
          setcolorHor(color.hex)
        }
     return (
          <Row className='mt-2'>
               <Col lg='4'>
                    <Label>Heading</Label>
                    <InputMask className="form-control input-color" value={data.heading} onChange={(e) => {
                         setHeading(e.target.value);
                         setData({ ...data, heading: e.target.value })
                         console.log(data);
                    }} />
               </Col>
               <Col lg='4'>
                    <Label>Heading color</Label>
                    {/* <div>
                         <InputColor
                              initialValue="#5e72e4"
                              
                              onChange={setColor}
                              placement="right"
                              style={{width:"59px", height:"51px"}}
                         />
                         <div

                              style={{
                                   width: 250,
                                   height: 50,
                                   marginTop: 20,
                                   backgroundColor: color.rgba,
                                   display:"none"
                              }}
                         />
                    </div> */}
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color3(!simple_color3)
                         }}
                         // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                         value={data.headingColor}
                         readOnly
                    />
                    {simple_color3 ? (
                         <SketchPicker
                              color={data.headingColor}
                              value={simple_color3}
                              width="160px"
                              // onChangeComplete={handleHor}
                              onChangeComplete={e => {
                                   setData(prev => ({
                                        ...prev,
                                        headingColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}
                    

                    {/* <TextField className='w-100' value={data.headingColor} onChange={(e) => {
                         setBackground(e.target.value);
                         setData({ ...data, headingColor: e.target.value })
                         console.log(data);
                    }} /> */}
               </Col>
               <Col lg='4'>
                    <Label>Background</Label>
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color2(!simple_color2)
                         }}
                         // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                         value={data.backgroundColor}
                         readOnly
                    />
                    {simple_color2 ? (
                         <SketchPicker
                              color={data.backgroundColor}
                              value={simple_color2}
                              width="160px"
                              // onChangeComplete={handleHor}
                              onChangeComplete={e => {
                                   setData(prev => ({
                                        ...prev,
                                        backgroundColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}
                    {/* <TextField className='w-100' value={data.backgroundColor} onChange={(e) => {
                         setColor(e.target.value);
                         setData({ ...data, backgroundColor: e.target.value })
                         console.log(data);
                    }} />      */}
               </Col>
          </Row>
     )
}

export default Heading