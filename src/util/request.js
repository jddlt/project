// const axios = require('axios')
import axios from 'axios'

let baseUrl = 'http://3087a4l620.zicp.vip'

export function request ({url = '', method, data = {}}) {
    return axios({
        url: (url.includes('http') ? url : baseUrl + url),
        method: method || 'GET',
        data: {
            ...data
        }
    })
}
