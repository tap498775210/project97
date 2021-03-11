import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap'

export var handleClose;
export var handleShow;


/*
props:
  title
  message
*/
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

/*
export class Alert extends Component{
    constructor(props){
        super(props);
        this.props = 
        this.state = {
            show: true
        }
    }

    render(){
        return (
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
}
*/