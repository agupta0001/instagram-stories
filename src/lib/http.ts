import axios, { AxiosError, AxiosInstance } from "axios";

class Http {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  async get(url: string, queryParams: { params?: {} } = {}) {
    try {
      const response = await this.axios.get(url, {
        ...queryParams,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error(error.toString());
      }
    }
  }

  async post(url: string, data: {} = {}) {
    try {
      return await this.axios.post(url, {
        ...data,
      });
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error(error.toString());
      }
    }
  }
}

export default new Http();
