/// <reference types="node" />

/* eslint-disable no-console */
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { green, cyan } from '@js-bits/log-in-color';

// Workaround for multiple issue related to unique symbols when @js-bits/enumerate is defined as a dependency.
// Like "Exported variable <variable name> has or is using private name <private name>", for instance.

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (readError, /** @type {string} */ data) => {
  if (readError) {
    return console.log(readError);
  }

  if (data.includes('UniqueSymbols')) {
    console.log(cyan`Unique symbols already replaced in ${fileName}`);
    return undefined;
  }

  let result = data
    .replaceAll('import("@js-bits/enumerate/types/unique-symbols").UNIQUE_SYMBOL', 'UNIQUE_SYMBOL')
    .replace(/UNIQUE_SYMBOL(\d+)/g, 'UniqueSymbols.UNIQUE_SYMBOL$1');
  result += "\nimport * as UniqueSymbols from '@js-bits/enumerate/types/unique-symbols';\n";

  fs.writeFile(fileName, result, 'utf8', writeError => {
    if (writeError) return console.log(writeError);
    console.log(green`Unique symbols replaced in ${fileName}`);
    return undefined;
  });

  return undefined;
});
