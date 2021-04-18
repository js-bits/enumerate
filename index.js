export default str => {
  const obj = {}
  str[0].trim()
    .split(/[\s\n,]+/)
    .forEach(item => obj[item] = Symbol(item))
  return obj
}