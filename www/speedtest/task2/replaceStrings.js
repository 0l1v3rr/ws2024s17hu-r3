/**
 * Task 2 — Replace strings
 */

/**
 * Given some sentence, replaces the search term with a replacement string.
 * Subsequent replacements replace previous versions of the string.
 *
 * Example:
 *   sentence: "Hello, World!"
 *   replacements: [["Hello", "Hey"], ["Hey", "Hi"], ["World", "Universe"]]
 *   return: "Hi, Universe!"
 *
 * @param {String} sentence
 * @param {[string, string][]} replacements
 * @return {String}
 */

function replaceStr(sentence, replacements) {
  for (const i of replacements) {
    sentence = sentence.replace(new RegExp(i[0], "g"), i[1]);
  }

  return sentence;
}
