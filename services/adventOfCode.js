const fetch = require('node-fetch')

module.exports = {
  getStars: async ({ day, year }) => {
    // TODO: This does not work
    const res = fetch(`https://adventofcode.com/${year}/day/${day}`, {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        authority: 'adventofcode.com',
        'cache-control': 'max-age=0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie:
          'session=53616c7465645f5f406a06b5b4cfebf1c4dd19c5a262463a0c63344c92c8be8057ef0940b387cb9a3b88bbb62483d20d;',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    })

    if (res.ok) {
      return res.text()
    }
    return res.status
  },
}
