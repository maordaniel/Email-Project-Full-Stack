import React from "react";
import {Modal} from "react-bootstrap";
import NewEmail from "./NewEmail";


function PromptMessage(props) {
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <NewEmail />
            </Modal>
    </div>
  );
}

export default PromptMessage;