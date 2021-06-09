const regex = new RegExp('^https://gleitz.github.io(.*)', '')
const oss = 'https://soundfont.oss-cn-beijing.aliyuncs.com'
self.addEventListener('fetch', function (event) {
  const url = event.request.url
  const match = regex.exec(url)
  if (match) {
    const [origin, path] = match
    const newUrl = oss + path
    event.respondWith(fetch(newUrl))
  }
})
