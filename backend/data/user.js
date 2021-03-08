import bcrypt from 'bcryptjs'
const users = [
    {
        name: "Duc Thinh",
        email: "admin@example.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "John",
        email: "john@example.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: "tonyshark",
        email: "tonyshark@example.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
  ]
  
  export default users
  