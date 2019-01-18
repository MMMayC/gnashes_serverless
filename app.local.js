const app = require('./express-api-endpoint/api')
const port = 3000

app.listen(port)
console.log(`listening on http://localhost:${port}`)