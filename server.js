const { createServer, get } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const dbjsonmock = {
  "/a": {
    "pagePath": "/index-a",
    "values": {
      "title": "Side A"
    }
  },
  "/b": {
    "pagePath": "/index-b",
    "values": {
      "title": "Side B"
    }
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl


    if (dbjsonmock[pathname] && dbjsonmock[pathname].pagePath) {
      app.render(req, res, dbjsonmock[pathname].pagePath, query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})