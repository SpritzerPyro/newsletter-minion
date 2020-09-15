#!/usr/bin/env node

import { create } from 'browser-sync';
import { existsSync, promises } from 'fs';
import { renderSync } from 'sass';
import { config } from './config';
import inline = require('inline-css');

const { outDir, sassDir, sassPath, srcDir } = config.get();

async function compile(): Promise<void> {
  const raw = await promises.readdir(srcDir);
  const files = raw.filter((x) => /.*\.html?$/i.test(x));

  await promises.mkdir(outDir, { recursive: true });

  await Promise.all(files.map((x) => compileFile(x)));
}

async function compileFile(fileName: string): Promise<void> {
  const html = await promises.readFile(`${srcDir}/${fileName}`);
  const extraCss = existsSync(sassPath)
    ? renderSync({ file: sassPath }).css.toString()
    : '';

  const data = await inline(html.toString(), {
    applyTableAttributes: true,
    applyWidthAttributes: true,
    extraCss,
    removeHtmlSelectors: true,
    url: ' ',
  });

  await promises.writeFile(`${outDir}/${fileName}`, data);
}

async function main(): Promise<void> {
  const bs = create();

  bs.watch(`${srcDir}/*.(htm|html)`).on('change', compile);
  bs.watch(`${sassDir}/**/*.scss`).on('change', compile);

  await compile();

  bs.init({
    server: { baseDir: outDir, directory: true },
    watch: true,
  });
}

main();
