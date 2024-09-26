/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return function (obj) {
        let objnew = new Object();
        Object.assign(objnew, obj);
        path.split('.').forEach((item) => {
            if (objnew === undefined) {
                return objnew = undefined 
            }                        
            if (typeof objnew[item] == 'function') {
                return objnew = undefined
            } 
            objnew = objnew[item];
        })
        return objnew
    }
}