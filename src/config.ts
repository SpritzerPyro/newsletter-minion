import convict from 'convict';

export const config = convict({
  htmlDir: {
    arg: 'html-dir',
    default: 'src',
    doc: 'Directory of the source HTML files.',
    env: 'NEWSLETTER_MINION_HTML_DIR',
    format: 'String',
  },
});

config.validate({ allowed: 'strict' });
