import 'whatwg-fetch'
import fetch from 'node-fetch'

export const getAdventOfCodeTask = ({ day, year }) =>
  fetch(`/api/adventOfCode?day=${day}&year=${year}`)

const url = {
  buildQuery: function (params) {
    return Object.keys(params)
      .map(
        (k) =>
          encodeURIComponent(k) +
          '=' +
          (params[k] !== undefined && params[k] !== null
            ? encodeURIComponent(params[k])
            : '')
      )
      .join('&')
  },
}

function sendRequest(method, baseUrl, path, options = {}) {
  let u = `${baseUrl}${path}`
  if (options.queryParams) {
    u +=
      (u.indexOf('?') === -1 ? '?' : '&') + url.buildQuery(options.queryParams)
  }
  let fetchOptions = {
    method: method || 'get',
    headers: {
      Accept: 'application/json',
    },
  }

  if (fetchOptions.method !== 'GET' && fetchOptions.method !== 'DELETE') {
    fetchOptions.body = options.body
  }
  if (options.headers) {
    Object.assign(fetchOptions.headers, options.headers)
  }

  if (options.mode) {
    fetchOptions.mode = options.mode
  }
  if (options.credentials) {
    fetchOptions.credentials = options.credentials
  }

  if (options.bearerToken) {
    fetchOptions.headers['Authorization'] = `Bearer ${options.bearerToken}`
    fetchOptions.mode = 'cors'
  }

  // const timerStart = (new Date()).getTime()
  return window
    .fetch(u, fetchOptions)
    .then((res) => {
      // const responseTime = `${((new Date()).getTime() - timerStart)}ms`
      // bugsnag.reportEvent(`HTTP-SendRequest: ${method} - ${res.status}`, res.url.split('/')[2], {status: res.status, responseTime: responseTime})
      return res
    })
    .catch((err) => {
      // const responseTime = `${((new Date()).getTime() - timerStart)}ms`
      // bugsnag.reportIssue(`Can not ${method} ${baseUrl}`, err.message, {responseTime: responseTime, options: fetchOptions, baseUrl: baseUrl, path: path, url: u})
      throw new Error('error_network_issue', err)
    })
}

function get(baseUrl, path, options) {
  return sendRequest('GET', baseUrl, path, options)
}
function post(baseUrl, path, options) {
  return sendRequest('POST', baseUrl, path, options)
}
function put(baseUrl, path, options) {
  return sendRequest('PUT', baseUrl, path, options)
}
function _delete(baseUrl, path, options) {
  return sendRequest('DELETE', baseUrl, path, options)
}

function json(res) {
  if (res && res.ok) {
    return res.json()
  } else {
    throw new Error('HTTP response is not json')
  }
}
export default { get, post, put, delete: _delete, json }
