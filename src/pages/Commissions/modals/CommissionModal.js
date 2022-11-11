import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"



const CommissionModal = props => {
  const { isOpen, toggle } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Update Commissions</ModalHeader>
        <ModalBody>
            <p>ETH Rinkeby</p>
          <input type='text' className="form-control" placeholder="0.05" />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={toggle}>
            Save Changes
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

CommissionModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default CommissionModal
