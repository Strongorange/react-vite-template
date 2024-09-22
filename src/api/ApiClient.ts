import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios"

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  // private async renewToken() {
  //   const refreshToken = await AsyncStorage.getItem('refreshToken');
  //   if (refreshToken) {
  //     try {
  //       const response = await authService.post<{
  //         accessToken: string;
  //         refreshToken: string;
  //       }>(`${BASE_URL}/auth/renew`, {
  //         refreshToken,
  //       });
  //       const {accessToken, refreshToken: newRefreshToken} = response;
  //       if (accessToken && newRefreshToken) {
  //         await AsyncStorage.setItem('accessToken', accessToken);
  //         await AsyncStorage.setItem('refreshToken', newRefreshToken);
  //         return accessToken;
  //       }
  //     } catch (error) {
  //       console.error('Failed to renew token', error);
  //       throw error;
  //     }
  //   }
  //   throw new Error('No refresh token available');
  // }

  private initializeRequestInterceptor() {
    this.client.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`
        }

        // config.headers!.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxOTIxMjQyNCwiZXhwIjoxNzUwNzQ4NDI0fQ.tjlR9IP-17p1Q3J-d_T1zA2dcfS2OeAxppCCs5BiA-w`;
        // // config.headers!.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImtha2FvSWQiOjEwODU0MTg5OTgsImlhdCI6MTcyMDUwNTEyNCwiZXhwIjoxNzUyMDQxMTI0fQ.EjLPOErGQRoT8gixll_1rJV7R2Y26trTdg4jWAEvkb0`;

        return config as InternalAxiosRequestConfig
      },
      (error: AxiosError) => {
        // 요청 에러 처리
        return Promise.reject(error)
      },
    )
  }

  private initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      async (response: AxiosResponse) => {
        // 응답 인터셉터 로직 추가
        const tokens = response.data?.data
        if (tokens?.accessToken && tokens?.refreshToken) {
          localStorage.setItem("accessToken", tokens.accessToken)
          localStorage.setItem("refreshToken", tokens.refreshToken)
        }

        return response
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        // // 응답 에러 처리
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //   originalRequest._retry = true;
        //   try {
        //     const newToken = await this.renewToken();
        //     originalRequest.headers!['Authorization'] = `Bearer ${newToken}`;
        //     return this.client(originalRequest);
        //   } catch (error) {
        //     console.error('Unauthorized');
        //   }
        // }
        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      config,
    )
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }
}

export default ApiClient
