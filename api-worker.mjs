export default {
  async fetch(request) {
    const { url, method } = request
    const headers = {}

    for (const [k, v] of request.headers.entries()) {
      headers[k] = v
    }

    const payload = {
      headers,
      url,
      method,
      body: await request.text(),
      cf: request.cf
    }
    console.log(payload)
    return new Response(JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json',
      },
    })
  },
}