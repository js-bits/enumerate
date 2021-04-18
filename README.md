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

## Notes

- Internet Explorer is not supported.
