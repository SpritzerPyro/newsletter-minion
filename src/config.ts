import convict from 'convict';

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
    default: 'styles/style.scss',
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

config.validate({ allowed: 'strict' });
