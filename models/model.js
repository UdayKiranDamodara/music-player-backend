const knex = require('../database/database')

module.exports = class DB {
    constructor(object){
        this.id =  object.link.replace('/view?usp=sharing', '').replace('https://drive.google.com/file/d/', '');
        this.name = (object.songName !== '') ? object.songName : null
        this.album = (object.album !== '') ? object.album : null
        this.artist = (object.artist !== '') ? object.artist : null
        // this.genre = (object.genre !== '') ? object.genre : null
    }

    add() {
        console.log('adding', this)
        return knex('song').insert(this)
    }

    static fetchAll(res) {
        const result = {}
        knex.select().from('song')
                    .then(data => {
                        console.log('fetch all songs', data)
                        result.songSearch = data;
                        knex.from('song').distinct('album').whereNotNull('album').orderBy('album')
                            .then(data => {
                                console.log('fetch all albums', data)
                                result.albumSearch = data;
                                knex.from('song').distinct('artist').whereNotNull('artist').orderBy('artist')
                                    .then(data => {
                                        console.log('fetch all artists', data)
                                        result.artistSearch = data;
                                        console.log('result object', result)
                                        res.json({data: result})
                                    })
                            })
                    })
    }


    static searchSong(input) {
        console.log('in fetch song')
        return knex.select().from('song').where('name', 'ilike', `%${input}%`)
    }

    static searchAlbum(input) {
        console.log('in search album')
        return knex.from('song').distinct('album').where('album', 'ilike', `%${input}%`)
    }

    static searchArtist(input) {
        console.log('in serch artist')
        return knex.from('song').distinct('artist').where('artist', 'ilike', `%${input}%`)
    }

    static getAlbum(input) {
        console.log('in get album', input)
        return knex.select().from('song').where('album', input)
    }

    static getArtist(input) {
        console.log('in get artist', input)
        return knex.select().from('song').where({artist: input})
    }
}