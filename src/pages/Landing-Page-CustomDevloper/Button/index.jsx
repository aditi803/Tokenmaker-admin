import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Col, Row, Label,Input } from 'reactstrap';
import InputMask from "react-input-mask"
import InputColor from 'react-input-color';
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"

function ButtonComp(props) {
     const [text, setText] = useState('');
     const { data, setData } = props;
     const [background, setBackground] = useState('');
     const [color, setColor] = useState('')
     const [simple_color3, setsimple_color3] = useState(0)
     const [simple_color2, setsimple_color2] = useState(0)
     const handleHor = color => {
          setcolorHor(color.hex)
        }
  return (
       <Row className='mt-3'>
            <Col lg='4'>
                 <Label>Button Text</Label>
                 <InputMask className="form-control input-color " value={data.buttonText} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonText: e.target.value })
                      console.log(data);
                 }} />
            </Col>
            <Col lg='4'>
                 <Label>Button Text color</Label>
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color3(!simple_color3)
                         }}
                         value={data.buttonColor}
                         readOnly
                    />
                    {simple_color3 ? (
                         <SketchPicker
                              color={data.buttonColor}
                              value={simple_color3}
                              width="160px"
                              // onChangeComplete={handleHor}
                              onChangeComplete={e => {
                                   setData(prev => ({
                                        ...prev,
                                        buttonColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}


                 {/* <TextField className='w-100' value={data.buttonColor} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonColor: e.target.value })
                      console.log(data);
                 }} /> */}
            </Col>
            <Col lg='4'>
                 <Label>Button Background</Label>
                 <Input
                         type="text"
                         onClick={() => {
                              setsimple_color2(!simple_color2)
                         }}
                         // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                         value={data.buttonBackgroundColor}
                         readOnly
                    />
                    {simple_color2 ? (
                         <SketchPicker
                              color={data.buttonBackgroundColor}
                              value={simple_color2}
                              width="160px"
                              // onChangeComplete={handleHor}
                              onChangeComplete={e => {
                                   setData(prev => ({
                                        ...prev,
                                        buttonBackgroundColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}

                 {/* <TextField className='w-100' value={data.buttonBackgroundColor} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonBackgroundColor: e.target.value })
                      console.log(data);
                 }} /> */}
            </Col>
       </Row>
  )
}

export default ButtonComp