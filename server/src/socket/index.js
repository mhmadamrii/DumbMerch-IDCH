// import models
const {chat, user, profile} = require("../../models/")
// import here
const jwt = require('jsonwebtoken')

const {Op} = require('sequelize')

// init variable here
let connectedUser = {}

const socketIo = (io) => {

  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token ) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on('connection', async (socket) => {
    console.log('client connect: ', socket.id)
    
    // code here
    const { id: idUser } = jwt.verify(socket.handshake.auth.token, process.env.TOKEN_KEY)
    connectedUser[idUser] = socket.id

    // define listener on event load admin contact
    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          where: {
            status: "admin"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });
    
        socket.emit("admin contact", adminContact)
      } catch (err) {
        console.log(err)
      }
    })

    // define listener on event load customer contact
    socket.on("load user contacts", async () => {
      try {
        let userContacts = await user.findAll({
          
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
          ],
          where: {
            status: 'user'
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        })

        userContacts = JSON.parse(JSON.stringify(userContacts))
        userContacts = userContacts.map((item) => ({
          ...item,
          profile: {
            ...item.profile,
            image: item.profile?.image
              ? process.env.FILE_PATH + item.profile?.image
              : null,
          },
        }))
        
        socket.emit("user contacts", userContacts)
      } catch (err) {
        console.log(err)
      }
    })

    // code here
    socket.on("load messages", async (payload) => {
      const idRecipient = payload;
      const idSender = idUser;

      const data = await chat.findAll({
        where: {
          idSender: {
            [Op.or]: [idRecipient,idSender]
          },
          idRecipient: {
            [Op.or]: [idRecipient,idSender]
          },
        },
        include: [
          {
            model: user,
            as: 'recipient',
            attributes: {
              exclude: ['createdAt','updatedAt', 'password']
            }
          },
          {
            model: user,
            as: 'sender',
            attributes: {
              exclude: ['createdAt','updatedAt', 'password']
            }
          }
        ],
        attributes: {
          exclude: ['createdAt','updatedAt', 'idRecipient', 'idSender']
        },
        order: [['createdAt','ASC']]
      })

      socket.emit('messages',data)
    })


    socket.on("send message", async (payload) => {
      try {
        const { message, idRecipient } = payload       
        
        await chat.create({
          message,
          idRecipient,
          idSender: idUser
        })
        
        io.to(socket.id).to(connectedUser[idRecipient]).emit("new message")
      } catch (error) {
        console.log(error)
      }
    })    

    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id)
      delete connectedUser[idUser]
    })
  })
}

module.exports = socketIo