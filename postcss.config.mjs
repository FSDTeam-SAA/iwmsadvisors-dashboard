import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
