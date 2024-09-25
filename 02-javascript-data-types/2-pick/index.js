/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    let objNew = {};
    for (const item of fields) {
        if (obj.hasOwnProperty(item)) {
            objNew[item] = obj[item]
        }
    }
    return objNew
}