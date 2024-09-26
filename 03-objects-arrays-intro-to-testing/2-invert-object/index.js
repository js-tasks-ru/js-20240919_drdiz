/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    const objInvert = new Object();
    if (obj) {
        for (const key in obj) {
            objInvert[obj[key]] = key
        }
        return objInvert
    } else {
        return undefined 
    }
}
