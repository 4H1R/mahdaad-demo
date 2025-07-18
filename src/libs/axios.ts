import axios from 'axios'
import { defaultAllowedOrigins } from 'vite'
import { ref } from 'vue'

const FAILURE_MAX_COUNT = 3
const COOLDOWN_TIME = 60 * 1000 // 1 MIN

type TCircuitStatus = 'closed' | 'open' | 'half-open'

let circuitStatus: TCircuitStatus = 'closed'
let failureCount = 0

export const isServiceUnavailable = ref(false)

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10_000,
})

function tripCircuit() {
  circuitStatus = 'open'
  failureCount = 0
  isServiceUnavailable.value = true
  console.warn('Service Failing')

  setTimeout(() => {
    circuitStatus = 'half-open'
  }, COOLDOWN_TIME)
}

function resetCircuit() {
  circuitStatus = 'closed'
  failureCount = 0
  isServiceUnavailable.value = false
}

apiClient.interceptors.request.use((config) => {
  if (circuitStatus === 'open') {
    return Promise.reject(new Error('Circuit is Open'))
  }
  return config
})

apiClient.interceptors.response.use(
  (resp) => {
    if (circuitStatus === 'half-open' || failureCount > 0) {
      resetCircuit()
    }
    return resp
  },
  (e) => {
    failureCount += 1
    if (circuitStatus === 'half-open' || failureCount >= FAILURE_MAX_COUNT) {
      tripCircuit()
    }
    return Promise.reject(e)
  },
)

export default apiClient
