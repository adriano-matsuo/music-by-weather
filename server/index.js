const createServer = require('./create-server')

const app = createServer()
app.listen(process.env.PORT || 3000)
