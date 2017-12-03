
'use strict'

const random = require('./random')
const getJson = require('./get-json')
const sendToSlack = require('./send-to-slack')
const prepareMemes = require('./prepare-memes')

exports.handler = (event, context, callback) => {

    if (!process.env.IMG_FLIP_USER || !process.env.IMG_FLIP_PASS || !process.env.SLACK_HOOK) {
        callback(new Error(`Environment variables not set`))
    }

    getJson('https://raw.githubusercontent.com/indigotree/slack-memes/master/memes.json')
        .then(prepareMemes)
        .then((memes) => {
            let meme = random(memes)
            let text = random(meme['text'])
            return getJson(`https://api.imgflip.com/caption_image?template_id=${meme['id']}&text0=${text[0]}&text1=${text[1]}&username=${process.env.IMG_FLIP_USER}&password=${process.env.IMG_FLIP_PASS}`)
        })
        .then((json) => sendToSlack(json.data.url))
        .catch(callback)

}
