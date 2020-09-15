import convict from 'convict';
import { existsSync } from 'fs';
import { join } from 'path';

export const config = convict({
  outDir: {
    arg: 'out-dir',
    default: 'out',
    doc: 'Output directory of the created HTML files.',
    env: 'NEWSLETTER_MINION_OUT_DIR',
    format: 'String',
  },
  sassDir: {
    arg: 'sass-dir',
    default: 'styles',
    doc: 'Directory of the stylesheet files.',
    env: 'NEWSLETTER_MINION_SASS_DIR',
    format: 'String',
  },
  sassFile: {
    arg: 'sass-file',
    default: 'style.scss',
    doc: 'Path to the main sass stylesheet file.',
    env: 'NEWSLETTER_MINION_SASS_FILE',
    format: 'String',
  },
  srcDir: {
    arg: 'src-dir',
    default: 'src',
    doc: 'Directory of the source HTML files.',
    env: 'NEWSLETTER_MINION_SRC_DIR',
    format: 'String',
  },
});

function resolveSassFile(): void {
  const data = join(config.get('sassDir'), config.get('sassFile'));

  config.set('sassFile', data);
}

function source(path: string): void {
  const data = join(__dirname, '../../../..', path);

  if (!existsSync(data)) {
    return console.warn(`'${data}' not found`);
  }

  config.loadFile(data);
  console.info(`Loaded '${data}'`);
}

['newsletter-minion.json'].map(source);

resolveSassFile();

config.validate({ allowed: 'strict' });
