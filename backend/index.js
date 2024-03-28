const connectToMongo = require('./db');
const express = require('express')


// Rest of your Mongoose code

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())
// availabe routes

app.use('/api/notes', require('./Routes/notes'))
app.use('/api/auth', require('./Routes/auth'))

app.listen(port, () => {
    console.log(`iNoteBook backend listening on port ${port}`)
})