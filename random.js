/**
 * Get a random item
 *
 * @param obj {array|object}
 * @returns {mixed}
 */

 'use strict'

module.exports = function random(obj) {
    if (Array.isArray(obj)) {
        return obj[Math.floor(Math.random() * obj.length)]
    }

    return obj[random(Object.keys(obj))]
}