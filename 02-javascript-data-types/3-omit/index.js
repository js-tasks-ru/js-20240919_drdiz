/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */

export const omit = (obj, ...fields) => {
    const objNew = new Object();
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (fields.indexOf(key) == -1) {
            objNew[key] = obj[key]
        }
    }   
    return objNew
};