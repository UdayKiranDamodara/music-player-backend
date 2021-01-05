const { response } = require('express');
const DB = require('../models/model')

exports.addSong = (req, res)=>{
    console.log('in the POST route')
    console.log(req.body)
    //console.log(req.body.link.replace('/view?usp=sharing', '').replace('https://drive.google.com/file/d/', ''))
    const song = new DB(req.body);
    song.add()
        .then((data)=>{console.log('in then')
            res.json('data sent')})
        .catch((err)=>{console.log('in catch'); res.json('could not add song')})
        // .then(
        //     res.json({
        //         data_received: true,
        //         data: req.body
        //     })
        // )
        // .catch(err=>{
        //     //console.log(err)
        //     res.json(err)
        // })
    
}

exports.home = (req, res) => {
    console.log('in Home, fetching all songs')
   DB.fetchAll(res)
}

exports.search = (req, res) => {
    const finalResponse = {}
    const input = req.params.searchInput;
    console.log('searching for song', input)
    DB.searchSong(input)
        .then(data => {
            finalResponse.songSearch = data;
            DB.searchAlbum(input)
                .then(data => {
                    finalResponse.albumSearch = data;
                    DB.searchArtist(input)
                        .then(data => {
                            finalResponse.artistSearch = data
                            res.json({data: finalResponse})
                        })
                        .catch(err => console.log('failed to search for artist', input))
                })
                .catch(err => console.log('failed to search for album', input))
        })
        .catch(err => console.log('failed to search for song', input))
}

exports.album = (req, res) => {
    const input = req.params.albumName
    console.log('getting album: ', input)
    DB.getAlbum(input)
        .then(data => {
            res.json({
                data
            })
        })
        .catch(err => console.log('failed to get album', input))
}

exports.artist = (req, res) => {
    const input = req.params.artistName
    console.log('getting artist: ', input)
    DB.getArtist(input)
        .then(data => res.json({data}))
        .catch(err => console.log('failed to get artist', input))
}