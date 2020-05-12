// const axios = require('axios')
import axios from 'axios'

let baseUrl = 'http://localhost:8095/wsg_manager_web'

export function request ({url = '', method, data = {}}) {
    return axios({
        url: (url.includes('http') ? url : baseUrl + url),
        method: method || 'GET',
        data: {
            ...data
        }
    })
}

export function getList () {
    return axios({
        url: 'http://localhost:8095/wsg_manager_web/wsg/findAll',
        method: 'GET'
    })
}
