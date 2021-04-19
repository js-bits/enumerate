const converters = new Map();

converters.set(String, (acc, item) => {
  acc[item] = item;
  return acc;
});

converters.set(Symbol, (acc, item) => {
  acc[item] = Symbol(item);
  return acc;
});

converters.set(Number, (acc, item) => {
  acc[item] = Object.keys(acc).length;
  return acc;
});

const convert = (list, type = Symbol) => {
  if (typeof type !== 'function') {
    throw new Error('Invalid Converter');
  }

  const converter = converters.get(type) || type;
  const values = list.trim().split(/[\s\n,]+/);
  const accumulator = {};
  const result = values.reduce(converter, accumulator);

  if (result !== accumulator) {
    throw new Error('Invalid Converter');
  }
  return Object.freeze(result);
};

const enumerate = (...args) => {
  if (args.length > 2) {
    throw new Error('Invalid Arguments');
  }

  if (!Array.isArray(args[0])) {
    if (args.length !== 1) {
      throw new Error('Invalid Arguments');
    }

    const [type] = args;
    return (...rest) => enumerate(...rest, type);
  }

  const [list] = args[0];
  const type = args[1];

  return convert(list, type);
};

export default enumerate;

// TODO: serialize/deserialize, toJSON, toString
