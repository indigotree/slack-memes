/**
 * Send text to a slack channel
 *
 * @param text {string}
 * @returns {void}
 */

'use strict'

const https = require('https')

module.exports = function (text) {
    return new Promise((resolve, reject) => {

        var slackMessage = JSON.stringify({
            'text': text,
            'username': 'Indigo Tree',
            'channel': '#general'
        })

        var options = {
            port: 443,
            hostname: 'hooks.slack.com',
            path: process.env.SLACK_HOOK,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(slackMessage)
            }
        }

        var slackReq = https.request(options, (response) => {

            if (response.statusCode !== 200) {
                reject(new Error(`status code failure: ${response.statusCode}`))
            }

        })

        slackReq.on('error', (e) => reject(new Error(`problem with request: ${e.message}`)))

        slackReq.write(slackMessage)

        slackReq.end()

    })
}