// require('dotenv').config();
const yaml = require('js-yaml');
const fs = require('fs');
const slugify = require('slugify');
// https://nodejs.org/api/util.html#util_util_inspect_object_options
const inspect = require("util").inspect;

module.exports = eleventyConfig => {

  // Watch for YAML files.
  eleventyConfig.addDataExtension('yml', contents => yaml.safeLoad(contents));

  // Layout aliases.
  eleventyConfig.addLayoutAlias('base', 'base.njk');

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // 404 page.
  // @TODO: This causes errors on dev.
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Override existing slug filter for better character filter.
  // See: https://github.com/11ty/eleventy/issues/278#issuecomment-451105828
  eleventyConfig.addFilter('slug', input => slugify(input, {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}/]/g,
    lower: true
  }));

  eleventyConfig.addFilter('debug', content => `<pre>${inspect(content)}</pre>`);

  // Copy static files directly to output.
  eleventyConfig.addPassthroughCopy({ 'src/_assets': '/assets' });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
      pathPrefix: "/eleventy-sandbox/"
    },
    passthroughFileCopy: true
  };
};
