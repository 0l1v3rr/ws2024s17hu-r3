/**
 * Task 4 — Rotate string
 */

/**
 * Write a function that receives two strings and returns the number of characters we would need to rotate the first string forward to match the second.
 *
 * @param {String} first
 * @param {String} second
 * @return {Number}
 */

function shiftedDiff(first, second) {
  return [...second].findIndex(
    (_, i) => (second + second).substring(i, i + second.length) === first
  );
}
