const express = require('express')
//const knex = require('knex')
const cors = require('cors')

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const addSong = require('./routes/add-song')
app.use(addSong)

const home = require('./routes/player')
app.use(home)

app.listen('5000', ()=>{
    console.log('listening on PORT 5000')
})


// const knex = require('./database/database')
// knex.select('album').table('song').where('album', 'like', '%olor%').then((data)=>console.log(data))
// knex.select().from('song').where({album: 'Color Photo'}).then(data => console.log(data))

// const result = db.select().table('song')
// console.log(result)

// db('song').insert({
//     id: '1bTaFzeoxJ8udPHLXTD1w5mjR1nQk5bqk',
//     name: 'Taragathi Gadhi',
//     album: 'Color Photo',
//     composer: 'Kaala Bhairava',
//     genre: 'Tollywood'
// }).then(console.log('added'))