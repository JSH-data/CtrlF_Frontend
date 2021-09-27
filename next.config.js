const isProd = process.env.NODE_ENV === 'production';
const withImages = require('next-images');
module.exports = withImages();

module.exports = {
  assetPrefix: isProd ? 'https://ctrlf.space' : '',
  env: {
    MOCK_PUBLIC_BASE_API: process.env.MOCK_PUBLIC_BASE_API,
    PUBLIC_BASE_API: process.env.PUBLIC_BASE_API,
  },
  images: {
    loader: 'imgix',
    path: 'https://noop/',
  },
};
