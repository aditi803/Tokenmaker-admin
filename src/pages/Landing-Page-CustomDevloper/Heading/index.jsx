import React, { useState } from 'react'
import { Col, Row,Label,Input } from 'reactstrap';
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"
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
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color3(!simple_color3)
                         }}
                         value={data.headingColor}
                         readOnly
                    />
                    {simple_color3 ? (
                         <SketchPicker
                              color={data.headingColor}
                              value={simple_color3}
                              width="160px"
                              onChangeComplete={e => {
                                   setData(prev => ({
                                        ...prev,
                                        headingColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}
               </Col>
               <Col lg='4'>
                    <Label>Background</Label>
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color2(!simple_color2)
                         }}
                         value={data.backgroundColor}
                         readOnly
                    />
                    {simple_color2 ? (
                         <SketchPicker
                              color={data.backgroundColor}
                              value={simple_color2}
                              width="160px"
                              onChangeComplete={e => {
                                   setData(prev => ({
                                        ...prev,
                                        backgroundColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}
               </Col>
          </Row>
     )
}

export default Heading