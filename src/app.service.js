import axios from 'axios'

axios.defaults.baseURL = 'https://api.fullstackweekly.com'

//  interceptor allows filter of request/results in central place
//  interceptor adds the token to every request
axios.interceptors.request.use(function (config) {
  // for checking if code is running on server add this check to change js behavior
  if (typeof window === 'undefined') {
    return config
  }
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const appService = {
  getPosts (categoryId) {
    return new Promise((resolve) => {
      axios.get(`/wp-json/wp/v2/posts?categories=${categoryId}&per_page=6`)
        .then(response => {
          resolve(response.data)
        })
    })
  },
  getProfile () {
    return new Promise((resolve) => {
      axios.get('/services/profile.php')
        .then(response => {
          resolve(response.data)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/services/auth.php', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  }
}

export default appService
