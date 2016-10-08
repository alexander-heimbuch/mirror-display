import Bluebird from 'bluebird'
import phantom from 'phantom'
import cheerio from 'cheerio'

export default (url) => {
  let sitepage = null
  let phInstance = null

  return phantom.create([], {
    logLevel: 'warn'
  })
  .then(instance => {
    phInstance = instance
    return instance.createPage()
  })
  .then(page => {
    sitepage = page
    return page.open(url)
  })
  .then(status => sitepage.property('content'))
  .then(content => {
    sitepage.close()
    phInstance.exit()
    return Bluebird.resolve(cheerio.load(content))
  })
  .catch(() => phInstance.exit())
}
