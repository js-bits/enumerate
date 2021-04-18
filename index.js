const convert = (acc, item) => {
  acc[item] = Symbol(item);
  return acc;
};

export default ([str]) =>
  str
    .trim()
    .split(/[\s\n,]+/)
    .reduce(convert, {});
