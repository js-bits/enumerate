/// <reference types="node" />

/* eslint-disable no-console */
import fs from 'fs';
import { green, cyan } from '@js-bits/log-in-color';

// Workaround to make declaration files of packages utilizing @js-bits/enumerate compatible with typescript versions prior 4.8

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (readError, /** @type {string} */ data) => {
  if (readError) {
    return console.log(readError);
  }

  if (!data.includes('EnumType<')) {
    console.log(cyan`No enums in ${fileName}`);
    return undefined;
  }

  const result = data.replaceAll(/\n([^\n]+EnumType<[^\n]+)\n/g, '\n// $1\n');

  fs.writeFile(fileName, result, 'utf8', writeError => {
    if (writeError) return console.log(writeError);
    console.log(green`Enums replaced in ${fileName}`);
    return undefined;
  });

  return undefined;
});
