
'use strict'

/**
 * Attempt to Parse raw json
 *
 * @param body {string}
 * @returns {object}
 */
function parseJson (body = '') {
    var json = {}

    try {
        json = JSON.parse(body)
    } catch (e) {
        console.log(e)
        return json
    }

    return json
}

module.exports = parseJson