import React, {useEffect, useState,} from 'react';
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import {PostData} from "../services/api";
import {useSelector} from "react-redux";


function NewEmail(){
    useEffect(() =>{
        if (main_reducers.sender !== null) {
            if (!main_reducers.reverseInput){
                setSender(main_reducers.sender);
                setReceiver(main_reducers.receiver);
            }else {
                setSender(main_reducers.receiver);
                setReceiver(main_reducers.sender);
            }
            setSuccessSender(true);
            setSuccessReceiver(true);
            setDisableInput(true);
        }
    }, []);

    const main_reducers = useSelector(state => state.main_reducers);
    const [disableInput,setDisableInput] = useState(false);

    const [sender,setSender] = useState('');
    const [receiver,setReceiver] = useState('');
    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');

    const [errorSender,setErrorSender] = useState('');
    const [errorReceiver,setErrorReceiver] = useState('');
    const [errorSubject,setErrorSubject] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const [successSender,setSuccessSender] = useState(false);
    const [successReceiver,setSuccessReceiver] = useState(false);

    const send = async () =>{
        if (!message)
            setErrorMessage('Message is empty, Please fill the message field.');
        if (!subject)
            setErrorSubject('Subject is empty, Please fill the subject field.');

        if (!sender) {
            setErrorSender('Please fill the sender email address.');
            setSuccessSender(false);
        }else if (!successSender){
            setErrorSender(`${sender} is not valid.`);
        }

         if (!receiver) {
            setErrorReceiver('Please fill the recipient\'s email address.');
            setSuccessReceiver(false);
        }else if (!successReceiver){
            setErrorReceiver(`${receiver} is not valid.`);
        }
        if (successSender && successReceiver && subject && message) {
             let data = {sender: sender, receiver: receiver, subject: subject, message: message};
            try {
                const res = await PostData('/create', data);
                if (res.status === 201) {
                    alert('The message has been sent!');
                    window.location.reload();
                }
            } catch (e) {
            }
        }
        };

    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return(
        <div>
            <div style={{display:"flex", justifyContent:"center", margin:"2em"}}>
                <Card style={{ width: '80em'}}>
                    <div style={{margin:"2em"}}>
                        <div style={{display:"flex", justifyContent:"center", marginBottom:"1em"}}>
                            <h4>New Mail</h4>
                        </div>

                        {errorSender ?
                            <label style={{color:'red'}}>
                                {errorSender}
                            </label>
                            :
                            null
                        }
                        <InputGroup className="mb-3">
                            <InputGroup.Append>
                                <InputGroup.Text
                                    style={{width:"5em", backgroundColor:"#0d2237", color:'#bea3a3'}} id="basic-addon2">
                                    Sender
                                </InputGroup.Text>
                            </InputGroup.Append>
                            <FormControl
                                placeholder="Enter your email"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={sender}
                                disabled={disableInput}
                                onChange={e => {
                                    setSender(e.target.value.toLowerCase(););
                                    setErrorSender('');
                                    if (validateEmail(e.target.value)){
                                        setSuccessSender(true);
                                    }else {
                                        setSuccessSender(false);
                                    }
                                   }}
                            />
                        </InputGroup>

                        {errorReceiver ?
                            <label style={{color:'red'}}>
                                {errorReceiver}
                            </label>
                            :
                            null
                        }

                        <InputGroup className="mb-3">
                            <InputGroup.Append>
                                <InputGroup.Text
                                    style={{width:"5em", backgroundColor:"#0d2237", color:'#bea3a3'}}
                                                 id="basic-addon2">
                                    To
                                </InputGroup.Text>
                            </InputGroup.Append>
                            <FormControl
                                placeholder="Enter recipient's email"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={receiver}
                                disabled={disableInput}
                                onChange={e => {
                                    setReceiver(e.target.value.toLowerCase(););
                                    setErrorReceiver('');
                                    if (validateEmail(e.target.value)){
                                        setSuccessReceiver(true);
                                    }else {
                                        setSuccessReceiver(false);
                                    }
                                   }}
                            />

                        </InputGroup>

                        {errorSubject ?
                            <label style={{color:'red'}}>
                                {errorSubject}
                            </label>
                            :
                            null
                        }
                        <InputGroup className="mb-3">
                            <InputGroup.Append>
                                <InputGroup.Text style={{width:"5em",backgroundColor:"#0d2237", color:'#bea3a3'}}
                                                 id="basic-addon2">
                                    Subject
                                </InputGroup.Text>
                            </InputGroup.Append>
                            <FormControl
                                aria-label="Subject"
                                placeholder="Enter subject"
                                aria-describedby="basic-addon2"
                                onChange={e => {
                                    setSubject(e.target.value);
                                    setErrorSubject('');
                                }}
                            />

                        </InputGroup>

                        {errorMessage ?
                            <label style={{color:'red'}}>
                                {errorMessage}
                            </label>
                            :
                            null
                        }
                        <InputGroup.Text
                            style={{display:"flex", justifyContent:"center", backgroundColor:"#0d2237", color:'#bea3a3'}}>
                            Message
                        </InputGroup.Text>
                        <InputGroup >
                            <FormControl style={{height:"10em"}}
                                as="textarea"
                                placeholder="Write here..."
                                aria-label="With textarea"
                                onChange={e => {
                                    setMessage(e.target.value);
                                    setErrorMessage('');
                                   }}
                            />
                        </InputGroup>
                        <div style={{display:"flex", justifyContent:'center', marginTop:'1em'}}>
                            <Button size="lg" style={{backgroundColor:"#0d2237", color:"#bea3a3"}} onClick={send}>
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default NewEmail;
