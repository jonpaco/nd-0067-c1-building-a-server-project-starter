// Some basic HTML.
const buildHtml = (path: string): string => {
  const template = `
  <!doctype html>
  <html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="/style.css">
    <meta charset="utf-8">
    <title>Resize Image Template</title>
  </head>

  <body>
  <img src="/${path}" class="center">
  </body>
  </html>
  `;
  return template;
};

export default buildHtml;
