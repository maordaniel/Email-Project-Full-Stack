import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {BsTrash} from "react-icons/all";
import PromptMessage from "./PromptMessage";
import {setSenderInput, setReceiverInput, setReverseInput} from "../redux/actions/main_actions";
import {useDispatch} from "react-redux";
import {DeleteData} from "../services/api";


function MessageCard(props){
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        dispatch(setSenderInput(props.sender));
        dispatch(setReceiverInput(props.receiver));
        if (props.reverseInput)
            dispatch(setReverseInput());
    }

    const deleteMessage = async () =>{
        let val;
        if (props.reverseInput){
            val = "inbox"
        }else {
            val = "outbox"
        }

        let data = {message: props.id, val:val};
        try {
            const res = await DeleteData('/delete', data);
            if (res.status === 200) {
                alert('The message has been deleted!');
                window.location.reload();
             }
        } catch (e) {
        }
    }

    return(
        <div>
            <PromptMessage show={show} handleClose={handleClose} />
            <Card style={{margin: "1em", width: '18em'}}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        Date: {props.date.date}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                        Hour: {props.date.time}
                    </Card.Subtitle>
                    <br/>
                    <Card.Subtitle className="mb-2 text-muted">
                        Sender: {props["sender"]}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                        To: {props["receiver"]}
                    </Card.Subtitle>
                    <Card.Title>
                        Subject: {props["subject"]}
                    </Card.Title>
                    <Card.Text>
                      {props["message"]}
                    </Card.Text>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <Button variant="link" onClick={handleShow} >
                            Reply
                        </Button>
                        <BsTrash style={{color:'#4f6fae', marginLeft:"1em", cursor:"pointer"}}
                                  onClick={deleteMessage} size={"1.5em"}/>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MessageCard;