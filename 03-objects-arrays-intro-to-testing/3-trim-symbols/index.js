/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size !== undefined) {
    let count = 1; let strNew = '';
    for (let i = 0; i < string.length; i++) {
      if (string[i] === string[i + 1]) {
        count++;
      } else {
        count < size ? strNew += string[i].repeat(count) : strNew += string[i].repeat(size);
        count = 1;
      }
    }
    return strNew;
  } else {return string;}
    
}