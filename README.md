# Easy to use, Symbol-based enum implementation

Just list values you need and `enumerate` tag function will create corresponding variables with unique values for your convenience.

## Installation

Install with npm:

```
npm install @js-bits/enumerate
```

Install with yarn:

```
yarn add @js-bits/enumerate
```

Import where you need it:

```javascript
import enumerate from '@js-bits/enumerate';
```

## How to use

Example 1:

```javascript
const { FOOT, METER } = enumerate`FOOT METER`;

const convertToFeet = (value, unit = FOOT) => {
  if (unit === METER) {
    return value * 3.281;
  }
  return value;
};

console.log(`${convertToFeet(5)} feet`); // 5 feet
console.log(`${convertToFeet(2, METER)} feet`); // 6.562 feet
```

Example 2:

```javascript
const STAR_WARS = enumerate`I II III IV V VI`;

const getEpisodeName = episode => {
  const { I, II, III, IV, V, VI } = STAR_WARS;
  switch (episode) {
    case I:
      return 'The Phantom Menace';
    case II:
      return 'Attack of the Clones';
    case III:
      return 'Revenge of the Sith';
    case IV:
      return 'A New Hope';
    case V:
      return 'The Empire Strikes Back';
    case VI:
      return 'Return of the Jedi';
    default:
      return 'Unknown';
  }
};

console.log(getEpisodeName(STAR_WARS.III)); // Revenge of the Sith
console.log(getEpisodeName(STAR_WARS.IV)); // A New Hope
```

## Primitive types

By default `enumerate` converts values to [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol):

```javascript
console.log(enumerate`FOOT METER`); // { FOOT: Symbol(FOOT), METER: Symbol(METER) }
```

You can change this behavior by specifying an appropriate converter:

```javascript
console.log(enumerate(String)`FOOT METER`); // { FOOT: 'FOOT', METER: 'METER' }
console.log(enumerate(Number)`ZERO ONE TWO`); // { ZERO: 0, ONE: 1, TWO: 2 }
```

Or you can implement your custom converter:

```javascript
const enum10s = enumerate((acc, item) => {
  acc[item] = (Object.keys(acc).length + 1) * 10;
  return acc;
});

console.log(enum10s`CODE1 CODE2 CODE3`); // { CODE1: 10, CODE2: 20, CODE3: 30 }
```

But remember that only default behavior guarantees global uniqueness of enumerated values.

## Notes

- Internet Explorer is not supported.