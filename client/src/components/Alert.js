import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap'

export var handleClose;
export var handleShow;

export function Alert(props) {
    var [show, setShow] = useState(false);

    handleClose = () => setShow(false);
    handleShow = () => setShow(true);

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

  console.log(handleShow);