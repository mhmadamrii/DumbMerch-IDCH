import React, { useState, useEffect, useContext } from 'react'
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import { Container, Row, Col } from 'react-bootstrap'
import Contact from "../components/Complain/Contact";
import Chat from "../components/Complain/Chat";
import { UserContext } from '../useContext/userContext';
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])

    const title = "Complain admin"
    const [state] = useContext(UserContext)

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            }
        })

        // code here
        socket.on("new message", () => {
            socket.emit('load messages', contact?.id)
        })

        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContacts = () => {
        socket.emit("load user contacts")
        socket.on("user contacts", (data) => {
            let dataContacts = data.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : 'Click here to start message'
            }))
        
            setContacts(dataContacts)
        })
    }

    // onClick to target chat
    const onClickContact = (data) => {
        setContact(data)
        socket.emit('load messages', data.id)
    }

    const loadMessages = () => {
        socket.on('messages', async (data) => {
            if(data.length > 0){
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)

                loadContacts()
            }else{
                setMessages([])
                loadContacts()
            }
        })
    }

    const onSendMessage = (e) => {
        if(e.key == "Enter"){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit('send message', data)
            e.target.value = ''
        }
    }

    document.title = "DumbMerch | Complain Admin"
    return (
        <>
            <NavbarAdmin />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh', border: '1px solid'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}  />
                    </Col>
                </Row>
            </Container>
        </>
    )
}