const converters = new Map();

converters.set(String, (acc, item) => item);
converters.set(Symbol, (acc, item) => Symbol(item));
converters.set(Symbol.for, (acc, item) => Symbol.for(item));
converters.set(Number, (acc, item) => Object.keys(acc).length);

const convert = (list, type = Symbol) => {
  if (typeof type !== 'function') {
    throw new Error('Invalid Converter');
  }

  let converter;
  const valueConverter = converters.get(type);
  if (valueConverter) {
    converter = (acc, item) => {
      acc[item] = valueConverter(acc, item);
      return acc;
    };
  } else {
    converter = type;
  }
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
