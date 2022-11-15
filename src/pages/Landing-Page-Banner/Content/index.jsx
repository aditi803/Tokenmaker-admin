import { TextField } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Col, Label, Row, Input } from "reactstrap"
import InputColor from "react-input-color"
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"

function Content(props) {
  const [content, setContent] = useState("")
  const { data, setData } = props
  const [color, setColor] = useState("")

  const [simple_color3, setsimple_color3] = useState(0)

  return (
    <Row className="mt-2">
      <Col lg="8">
        <Label>Content</Label>
        <InputMask
          className="form-control input-color "
          value={data.content}
          onChange={e => {
            setContent(e.target.value)
            setData({ ...data, content: e.target.value })
            console.log(data)
          }}
        />
      </Col>
      <Col lg="4">
        {/* <Label>Content color</Label> */}
        <div>
          <div className="form-group mb-4">
            <Label for="input-date2"> Content Color </Label>
            <Input
              type="text"
              onClick={() => {
                setsimple_color3(!simple_color3)
              }}
              // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
              value={data.contentColor}
              readOnly
            />
            {simple_color3 ? (
              <SketchPicker
                color={data.contentColor}
                value={simple_color3}
                width="160px"
                // onChangeComplete={handleHor}
                onChangeComplete={e => {
                  setData(prev => ({
                    ...prev,
                    contentColor: e.hex,
                  }))
                }}
              />
            ) : null}
          </div>

          {/* <TextField
            className="w-100"
            value={data.contentColor}
            onChange={e => {
              setColor(e.target.value)

              setData({ ...data, contentColor: e.target.value })
              console.log(data)
            }}
          /> */}
        </div>
      </Col>
    </Row>
  )
}

export default Content
