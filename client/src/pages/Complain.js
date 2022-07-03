import React, { useState, useEffect, useContext } from 'react'
import NavbarHome from '../components/Navbar/NavbarHome'
import { Container, Row, Col } from 'react-bootstrap'
import Contact from '../components/Complain/Contact'
import Chat from '../components/Complain/Chat'
import { UserContext } from '../useContext/userContext'
import {io} from 'socket.io-client'

let socket
export default function Complain() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token")
            }
        })

        socket.on("new message", () => {
            socket.emit('load messages', contact?.id)
        })
        
        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });
        loadContact()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) 

    const loadContact = () => {
        socket.emit("load admin contact")
        socket.on("admin contact", (data) => {
            const dataContact = {
                ...data,
                message: messages.length > 0 ? messages[messages.length - 1].message : 'Click here to start message'
            }
            setContacts([dataContact])
        })
    }

    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit('load messages', data.id)
    }

    document.title = "DumbMerch | Complain"
    const loadMessages = () => {
        socket.on('messages', async (data) => {
            if(data.length > 0){
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)
            }else{
                setMessages([])
                loadContact()
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

    return (
        <>
            <NavbarHome />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts}  clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}  />
                    </Col>
                </Row>
            </Container>
        </>
    )
}