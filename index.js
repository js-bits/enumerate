const converters = new Map();

class EnumType {
  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return this.type.name;
  }

  constructor(type, args) {
    this.type = type;
    this.args = args;
  }
}

converters.set(Function, (acc, item) => {
  const fn = (...args) => new EnumType(fn, args);
  Object.defineProperty(fn, 'name', { value: item });
  return fn;
});

converters.set(String, (acc, item) => item);
converters.set(Symbol, (acc, item) => Symbol(item));
converters.set(Symbol.for, (acc, item) => Symbol.for(item));
converters.set(Number, (acc, item) => Object.keys(acc).length);

const convert = (list, type = Symbol) => {
  let enumType = type;
  let enumArgs = [];
  if (typeof enumType === 'object' && enumType instanceof EnumType) {
    enumType = type.type;
    enumArgs = type.args;
  } else if (typeof enumType !== 'function') {
    throw new Error('Invalid converter');
  }

  let converter;
  const valueConverter = converters.get(enumType);
  if (valueConverter) {
    converter = (acc, item) => {
      acc[item] = valueConverter(acc, item, ...enumArgs);
      return acc;
    };
  } else {
    converter = enumType;
  }
  const values = list.trim().split(/[\s\n,]+/);
  const accumulator = {};
  const result = values.reduce(converter, accumulator);

  if (result !== accumulator) {
    throw new Error('Invalid converter');
  }

  const proxy = new Proxy(result, {
    get(...args) {
      const [target, prop] = args;
      if (prop === Symbol.toStringTag) {
        return `Enum:${Object.keys(target).join(',')}`;
      }
      const allowedProps = [Symbol.toPrimitive, 'toString'];
      if (!Object.prototype.hasOwnProperty.call(target, prop) && !allowedProps.includes(prop)) {
        throw new Error(`Invalid enum key: ${String(prop)}`);
      }
      return Reflect.get(...args);
    },
    set(target, prop) {
      throw new Error(`Cannot assign a value to enum key: ${String(prop)}`);
    },
  });

  return proxy;
};

const enumerate = (...args) => {
  if (args.length > 2) {
    throw new Error('Invalid arguments');
  }

  if (!Array.isArray(args[0])) {
    if (args.length !== 1) {
      throw new Error('Invalid arguments');
    }

    const [type] = args;
    return (...rest) => enumerate(...rest, type);
  }

  const [list] = args[0];
  const type = args[1];

  return convert(list, type);
};

// dynamically created types
const TYPES = enumerate(Function)`
LowerCase
UpperCase
Increment
`;

converters.set(TYPES.LowerCase, (acc, item) => item.toLowerCase());
converters.set(TYPES.UpperCase, (acc, item) => item.toUpperCase());
converters.set(
  TYPES.Increment,
  (acc, item, increment = 1, start = increment) => start + Object.keys(acc).length * increment
);

Object.assign(enumerate, TYPES);

export default enumerate;

// TODO: serialize/deserialize, toJSON, toString

// How to Create a Hybrid NPM Module for ESM and CommonJS
// https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html

// Hybrid npm packages (ESM and CommonJS)
// https://2ality.com/2019/10/hybrid-npm-packages.html
