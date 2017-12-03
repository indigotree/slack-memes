/**
 * Get Json from api url
 *
 * @param url {string}
 * @returns {object}
 */

'use strict'

const https = require('https')
const parseJson = require('./parse-json')

module.exports = function (options) {
    return new Promise((resolve, reject) => {
        let request = https.get(options, (response) => {
            let body = ''

            if (response.statusCode !== 200) {
                reject(new Error(`Status code failure: ${response.statusCode}`))
            }
            
            response.on('data', chunk => body += chunk)
            response.on('end', () => resolve(parseJson(body)))
        })
        request.on('error', (e) => reject(e))
        request.end()
    })
}