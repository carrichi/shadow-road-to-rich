/**
 * Transcript rules to {} if AND, [] if OR.
 * @param method Query selector options between rules, OR or AND
 * @param rules
 * @returns
 */
export default function transcriptRules(method: 'AND' | 'OR', rules: object) {
  return method === 'AND'
    ? rules
    : Object.entries(rules).map((property) => ({
        [property[0]]: property[1],
      }));
}
