import React,{ useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
function MessageModal(props) {
    const [showState,setShowState]=useState(false);
    const handleClose = () => {
        setShowState(false);
    }
    return (
        <div>
            <Modal show={props.show} onHide={handleClose}>{
                console.log('nhnjj')
            }
                <Modal.Header closeButton>
                    <Modal.Title>{props.message}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MessageModal;