// html skeleton provider
function template(initialState = {}, content){
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Gnashes</title>
            <link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
          </head>
          <body>
            <div class="content">
                <div id="app">${content}</div>
            </div>
            <script>
                window.__STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="./bundle.js"></script>
          </body>`;
}

module.exports = template;
