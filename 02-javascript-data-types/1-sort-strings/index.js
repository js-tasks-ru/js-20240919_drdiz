/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];
  const sortParam = [["ru-RU", "en-EN"], { caseFirst: 'upper' }, { caseFirst: 'lower' }];

  function ascSort() {
    return newArr.sort((a, b) => { return a.localeCompare(b, sortParam[0], sortParam[1]) });
  }
  function descSort() {
    return newArr.sort((a, b) => { return b.localeCompare(a, sortParam[0], sortParam[2]) });
  }
  return (param === 'asc') ? ascSort() : descSort();
}