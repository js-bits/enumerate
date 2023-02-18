/* eslint-disable max-classes-per-file */
const CONVERTERS = new Map();
const SHORTCUTS = new Map();

// global symbol shared across all versions of the package
const IS_ENUM_FLAG = Symbol.for('@js-bits/enumerate');

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

CONVERTERS.set(Function, (acc, item) => {
  const fn = (...args) => new EnumType(fn, args);
  Object.defineProperty(fn, 'name', { value: item });
  return fn;
});

CONVERTERS.set(String, (acc, item) => item);
CONVERTERS.set(Symbol, (acc, item) => Symbol(item));
CONVERTERS.set(Symbol.for, (acc, item) => Symbol.for(item));
CONVERTERS.set(Number, acc => Object.keys(acc).length);

class Enum {
  constructor(list, type = Symbol) {
    let inputType = type;
    let enumType = type;
    let enumArgs = [];
    if (SHORTCUTS.has(typeof enumType)) {
      inputType = SHORTCUTS.get(typeof enumType)(enumType);
    }
    if (typeof inputType === 'object' && inputType instanceof EnumType) {
      enumType = inputType.type;
      enumArgs = inputType.args;
    } else if (typeof inputType !== 'function') {
      throw new Error('Invalid converter');
    }

    let converter;
    const valueConverter = CONVERTERS.get(enumType);
    if (valueConverter) {
      converter = (acc, item) => {
        acc[item] = valueConverter(acc, item, ...enumArgs);
        return acc;
      };
    } else {
      converter = enumType;
    }
    const values = list.trim().split(/[\s\n,]+/);
    const result = values.reduce(converter, this);

    if (result !== this) {
      throw new Error('Invalid converter');
    }

    const proxy = new Proxy(result, {
      get(...args) {
        const [target, prop] = args;
        if (prop === Symbol.toStringTag) return `Enum:${Object.keys(target).join(',')}`;
        // using this flag to properly identify enums regardless of the package version being used
        if (prop === IS_ENUM_FLAG) return true;

        const allowedProps = [Symbol.toPrimitive, 'toString', 'toJSON'];
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
  }

  toJSON() {
    return Object.keys(this).reduce((acc, key) => {
      const value = this[key];
      if (JSON.stringify(value) === undefined) {
        throw new Error(`Cannot convert enum to JSON`);
      }
      acc[key] = value;
      return acc;
    }, {});
  }
}

const enumerate = (...args) => {
  if (args.length > 2) {
    throw new Error('Invalid arguments');
  }

  if (!Array.isArray(args[0]) || args[0].length > 1) {
    if (args.length !== 1) {
      throw new Error('Invalid arguments');
    }

    const [type] = args;
    return (...rest) => enumerate(...rest, type);
  }

  const [list] = args[0];
  const type = args[1];

  return new Enum(list, type);
};

// dynamically created types
const TYPES = enumerate(Function)`
LowerCase
UpperCase
Prefix
Increment
`;

CONVERTERS.set(TYPES.LowerCase, (acc, item) => item.toLowerCase());
CONVERTERS.set(TYPES.UpperCase, (acc, item) => item.toUpperCase());
CONVERTERS.set(TYPES.Prefix, (acc, item, prefix = '') => `${prefix}${item}`);
SHORTCUTS.set('string', TYPES.Prefix);
CONVERTERS.set(
  TYPES.Increment,
  (acc, item, increment = 1, start = increment) => start + Object.keys(acc).length * increment
);
SHORTCUTS.set('number', TYPES.Increment);

Object.assign(enumerate, TYPES);
enumerate.isEnum = value => {
  try {
    return typeof value === 'object' && value !== null && value[IS_ENUM_FLAG] === true;
  } catch {
    return false;
  }
};

export default enumerate;

// TODO: serialize/deserialize, toJSON, toString
