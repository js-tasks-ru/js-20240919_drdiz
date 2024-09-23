/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */

export const omit = (obj, ...fields) => {
    const arr = [...fields],
    objWith = {},
    objWithout = {};    
    arr.forEach((item) => {(obj.hasOwnProperty(`${item}`)) ? objWith[item] = obj[item] : false });    
    for (let key in obj) {
        !(objWith.hasOwnProperty(`${key}`)) ? objWithout[key] = obj[key] : false;
    }
    return objWithout
};