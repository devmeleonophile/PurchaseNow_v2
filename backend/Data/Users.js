import bcrypt from 'bcryptjs';

const users = [ {
    name : "Admin",
    email : "Admin@gmail.com",
    password : bcrypt.hashSync('123456', 10),
    isAdmin : true
},
{
    name : "Rajesh",
    email : "Rajesh@gmail.com",
    password : bcrypt.hashSync('123456', 10),
    isAdmin : false
},
{
    name : "Malar",
    email : "Malar@gmail.com",
    password : bcrypt.hashSync('123456', 10),
    isAdmin : false
}

]

export default users;