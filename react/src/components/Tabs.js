import React, {useEffect, useState, } from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {GetData} from "../services/api";
import MessageCard from "./MessageCard";


function Tabs() {
    useEffect(() => {
        getMessages();
    }, []);

    const [outbox, setOutbox] = useState([]);
    const [inbox, setInbox] = useState([]);

    const getMessages = async () => {
        try {
            const res = await GetData('/messages');
            if (res.status === 200) {
                setOutbox(res.data["messages"]["outbox"]);
                setInbox(res.data["messages"]["inbox"]);
            }
        } catch (e) {
        }
    };

    const getOutbox = () => {
        if (outbox.length > 0){
            return outbox.map(item => <MessageCard key={item} id={item} reverseInput={false} sender={item["sender"]}
                    receiver={item["receiver"]} subject={item["subject"]}
                                                   message={item["message"]} date={item["creation date"]}/>)
        }
        return <h1>Your outbox is empty.</h1>
    }

    const getInbox = () => {
        if (inbox.length > 0){
            return inbox.map(item => <MessageCard key={item} id={item} reverseInput={true} sender={item["sender"]}
                    receiver={item["receiver"]} subject={item["subject"]}
                                                  message={item["message"]} date={item["creation date"]}/>)
        }
        return <h1>Your inbox is empty.</h1>
    }

    return (
        <div style={{margin:"1em"}}>
            <Tab.Container id="left-tabs" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Inbox</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Outbox</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" >
                                <div style={{display:"flex", overflowX: "scroll"}}>
                                    {getInbox()}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" >
                                <div style={{display:"flex", overflowX: "scroll"}}>
                                    {getOutbox()}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
          </Tab.Container>
        </div>
    );
}

export default Tabs;