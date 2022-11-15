import React from "react"
import { useState } from "react"
import { Col, Row, Label } from "reactstrap"

function Background(props) {
  const { data, setData } = props
  const [background, setBackground] = useState("")
  const handleChange = e => {
    let files = e.target.files
    let [file] = files
     setData((prev) => ({
          ...prev,
          backgroundImage: file,
          backgroundImageSrc: window.URL.createObjectURL(file)
     }))

//     if (!files.length) {
//       var reader = new FileReader()
//       reader.readAsDataURL(files[0])
//       console.log("m")
//       reader.onloadend = function () {
//         console.log(this.result)
//         setData({ ...data, backgroundImage: this.result })
//       }
//     }
  }
  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
  return (
    <Row className="mt-5">
      <Row>
        <Label for="input-date2" style={{marginLeft:"65px"}}> Banner Image</Label>
        <Col>
          <label htmlFor="bannerImage">
            <img
              src={data?.backgroundImageSrc ? data?.backgroundImageSrc : imageBaseUrl + data.backgroundImage}
              alt=""
              height={"145px"}
              width={"200px"}
              style={{ marginLeft: "70px" }}
            />
          </label>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <label
            className="btn btn-primary"
            style={{ width: "200px", marginTop: "10px" }}
            htmlFor="bannerImage"
          >
            Update */}
      <input
        id="bannerImage"
        type="file"
        onChange={handleChange}
        style={{ width: "0px", height: "0px", overflow: "hidden" }}
      />
      {/* </label>
        </Col>
      </Row> */}
    </Row>
  )
}

export default Background
