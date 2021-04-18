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

## Notes

- Internet Explorer is not supported.
