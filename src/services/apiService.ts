import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { HoneyItem } from '@/interfaces/honeyItem.interface.ts'
import { ApiResponse } from '@/interfaces/apiResponse.interface.ts'
import { LoginParams } from '@/interfaces/loginParams.interface.ts'

const client: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

class ApiService {
  async getHoneyList(): Promise<HoneyItem[]> {
    const response: AxiosResponse<ApiResponse<HoneyItem[]>> =
      await client.get('/list/honey')
    return response.data.data
  }

  async submitOrder(honeyList: HoneyItem[]): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await client.post(
      '/order',
      honeyList
    )
    return response.data.status
  }

  async login(credentials: LoginParams): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> = await client.post(
      '/login',
      credentials
    )
    return response.data.data
  }
}

export const apiService = new ApiService()
