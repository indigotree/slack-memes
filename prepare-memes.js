/**
 * Remove memes with no text and add id to the object
 *
 * @param memes {object}
 * @returns {object}
 */

'use strict'

module.exports = function (memes = {}) {
    var keys = Object.keys(memes)

    if (!keys.length) {
        return {}
    }

    keys.map((id) => {
        memes[id]['id'] = id
        if (!memes[id]['text']) {
            delete memes[id]
        }
    })

    return memes
}