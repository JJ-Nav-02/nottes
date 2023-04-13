require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())


const requestLogger = (request, response, next) => {
    console.log('Method: ',request.method);
    console.log('Path: ',request.path);
    console.log('Body: ',request.body);
    console.log('-------------------------------------------------------------------------');

    next()
}

app.use(requestLogger)

/*
app.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})
*/

//listo
app.get('/api/notes', (request, response)=>{
    Note.find({}).then(notes => {
        response.json(notes)
    })
} )


//listo
//las variables se identifican con los puntos ":"
app.get('/api/notes/:id', (request, response)=>{
    Note.findById(request.params.id).then( note => {
        response.json(note)
    })
} )

//completar
app.delete('/api/notes/:id', (request, response)=>{
    const id = Number( request.params.id)
    let size = notes.length
    notes = notes.filter(x =>x.id !== id )
    if (size > notes.length) {
        response.status(204).send()
    }
    else{
        response.status(404).send()
    }
})

app.post('/api/notes',(request, response) => {
    const body = request.body
    console.log(body);
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response)=>{
    const id = Number( request.params.id)
    console.log('id: ',id);

    const note = notes.find(x => x.id === id )

    const body = request.body
    const noteUpdate = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: body.id
    }
    console.log(note);
    if (note) {
        notes = notes.map(x => x.id !== id ? x : noteUpdate)
        response.json(noteUpdate)
    }
    else{
        response.status(404).send()
    }
} )


const unknownPath = (request, response) => {
    response.status(404).json()({
        error : 'unknown Path'
    })
}


app.use(unknownPath)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

