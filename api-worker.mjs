export default {
  async fetch(request, env) {
    const { url, method } = request
    const headers = {}

    for (const [k, v] of request.headers.entries()) {
      headers[k] = v
    }
    
    const subrequest = await env.ASSETS.fetch(request)

    const payload = {
      headers,
      url,
      method,
      body: await request.text(),
      cf: request.cf,
      subrequest: {
        status: subrequest.statusCode,
        headers: subrequest.headers,
        body: await subrequest.text()
      }
    }
    console.log(payload)
    return new Response(JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json',
      },
    })
  },
}
