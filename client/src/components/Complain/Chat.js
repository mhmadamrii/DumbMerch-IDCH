import React from "react";
// import "../../Css/complain.css"
import blankPfp from '../../assets/blank-profile.png'

export default function Chat({ contact, user, messages, sendMessage }) {
  return (
    <div className="mt-5">
      {contact ? (
        <>
          <div id="chat-messages" style={{ height: "75.8vh" }} className="overflow-auto px-3 py-2">
          {messages.map((item, index) => (
              <div key={index}>
                <div className={`d-flex py-1 ${item.idSender === user.id ? "justify-content-end": "justify-content-start"}`}>
                  {item.idSender !== user.id && (
                    <img src={contact.profile?.image || blankPfp} className="rounded-circle me-2 img-chat" alt="bubble avatar" />
                  )}
                  <div className={ item.idSender === user.id ? "chat-me" : "chat-other"} >
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '6vh' }}className="px-3">
            <input 
              placeholder="Send Message" 
              className="input-message px-4"
              style={{
                position: 'absolute',
                bottom: '2rem',
                right:'5rem',
                width:'58rem',
                height: '3rem'
            
            }} 
              onKeyPress={sendMessage} />
          </div>
        </>
      ) : (
        <div
          style={{ height: "89.5vh" }}
          className="h4 d-flex justify-content-center align-items-center"
        >
          No Message
        </div>
      )}
    </div>
  );
}