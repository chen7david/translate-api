const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

translate = async (words) => {
    const dict = require('dict-en-zh')
    translations = []
    for(let i = 0; i < words.length; i++){
       const response = await dict(words[i])
       translations.push(response)
    }
    return translations
}

app.post('/translate', async(req, res) => {
    const translations = await translate(req.body.words)
    res.status(200).json(translations)
})


app.use((req,res,next)=>{
    throw({ status: 422, message:'ROUTENOTFOUND'})
})

app.use((error, req, res, next)=>{
    console.log(error.message)
    res.status(200).json({error})
})

const server = require('http').createServer(app)
const port = 6000

server.listen(port, () => console.log(`server running on http://localhost:${port}`))