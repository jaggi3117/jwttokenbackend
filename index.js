const express = require('express')

const app = express()

app.use(express.json())

const users = []


//first try to generate a random token by myself
function generatetoken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let token = ""
    for(let i = 0; i<32; i++){
        token = token + options[Math.floor(Math.random()*options.length)]
    }
    return token
}


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
        const token = generatetoken()
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
app.listen(3000)

