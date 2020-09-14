import convict from 'convict';

export const config = convict({
  outDir: {
    arg: 'out-dir',
    default: 'out',
    doc: 'Output directory of the created HTML files.',
    env: 'NEWSLETTER_MINION_OUT_DIR',
    format: 'String',
  },
  sassPath: {
    arg: 'sass-path',
    default: 'scss/style.scss',
    doc: 'Path to the main sass stylesheet file.',
    env: 'NEWSLETTER_MINION_SASS_PATH',
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
