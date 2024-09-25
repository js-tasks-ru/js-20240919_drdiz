/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {  
  const locales = ["ru-RU", "en-EN"];
  const options = { caseFirst: 'upper' };
  const ascSort = ((a, b) => a.localeCompare(b, locales, options));
  const descSort = ((a, b) => b.localeCompare(a, locales, options));
  return [...arr].sort(param === 'asc' ? ascSort : descSort)
}