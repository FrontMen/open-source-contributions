export default function replaceHypens(s) {
  const string = s.replace('-', ' ')
  return string.charAt(0).toUpperCase() + string.slice(1)
}
