const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const users = []
const jwt_secret = "myjwtsecret23e4"

app.get('/', function(req,res){
    res.send('default endpoint ready')
})

app.post('/signup', function(req,res){
    const username = req.body.username
    const password = req.body.password
    users.push({
        'username': username, 
        'password': password
    })
    console.log(users)
    res.send({
        message: "you have signed up"
    })
})

app.post('/signin', function(req, res){
    let username = req.body.username
    let password = req.body.password
    const user = users.find(function(user){
        return user.username === username && user.password === password
    })
    if(user && user.password == password){
        const token = jwt.sign({
            "username": username,
            "password": password
        }, jwt_secret)
        user.token = token
        res.send({
            'token': token
        })
        console.log(users)
    }
    else{
        res.status(403).send(
            {
                message: "invalid username or password fkyou"
            }
        )
    }
})

app.get('/me', function(req,res){
    const token = req.headers.authorization
    const userdetails = jwt.verify(token, jwt_secret)
    const username = userdetails.username
    const password = userdetails.password
    let user = users.find(function(u){
        return u.username === username && u.password === password
    })
    if(user){
        res.send({
            "message": user.username
        })
    }
    else{
        res.status(401).send({
            "message": "unauthorized"
        })
    }
})
app.listen(3000)

//jaggi -: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphZ2dpdXNlciIsInBhc3N3b3JkIjoiamFnZ2lwYXNzIiwiaWF0IjoxNzQyMzA0MDQ2fQ.XYNpAReMZeIWzEOxlC8vwQLgm6vd0SexWByaNIKTXIc
//lokesh -: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxva2VzaCIsInBhc3N3b3JkIjoiamFnZ2lwYXNzIiwiaWF0IjoxNzQyMzA0MDk1fQ.nikjcjmG-AA7z5nZWhawq8G0V2TsmIzpN0k8QSji9SM