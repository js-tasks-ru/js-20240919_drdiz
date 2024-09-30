/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathArr = path.split('.');
    return function (obj) {
        let objnew = obj;
        for (let item of pathArr) {
            if (objnew === undefined || typeof objnew[item] == 'function') {
                return objnew = undefined
            }            
            objnew = objnew[item];
        }
        return objnew;
    }
}