/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let arrSort = arr.slice();   
    return (param == 'asc') ? arrSort.sort((a, b) => a.localeCompare(b, ['ru-RU', 'en-En'], {caseFirst: 'upper'})) : arrSort.sort((a, b) => b.localeCompare(a, ['ru-RU', 'en-En'], {caseFirst: 'lower'}));    
}
