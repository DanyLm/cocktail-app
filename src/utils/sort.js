/* eslint-disable import/prefer-default-export */

/**
 *
 * @param {*} arr
 * @param {*} key
 * @returns
 */
export function alphabeticalOrder(arr, key) {
    return arr.sort((a, b) => (a[key].toLowerCase() < b[key].toLowerCase() ? -1 : 1));
}
