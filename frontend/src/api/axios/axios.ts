import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as qs from 'qs'
import toast from 'react-hot-toast'
import apiRoutesConfig from 'src/configs/apiRoutesConfig'
import { HttpStatusCode } from 'src/constants/HttpStatusCode.enum'
import { SystemConstants } from 'src/constants/system.constant'
import { storageService } from 'src/storage'
import { showErrorMessage } from 'src/utils/show-message'
import { ResponseGateway } from '../types/gateway.model'

export const axiosGateway: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
})

axiosGateway.interceptors.request.use(
    async (config) => {

        const token = storageService.getAccessToken();
        if (token) {
            config.headers = {
                ...config.headers,
                authorization: `${token}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosGateway.interceptors.response.use(
    (response: AxiosResponse<ResponseGateway>) => {
        const route = response.config.params[SystemConstants.PARAMS_KEY_ROUTE]
        const gatewayResponse = response.data
        if (gatewayResponse.status >= 300) {
            if (gatewayResponse.status == HttpStatusCode.Unauthorized) {
                showErrorMessage(gatewayResponse.message)
                storageService.clearAuthDataFromLS()
                storageService.deleteKeyFromLS("Menu")
            }
            return Promise.reject(gatewayResponse);
        }
        if (route === apiRoutesConfig.loginEOMS || route === apiRoutesConfig.resetPass || route === apiRoutesConfig.loginAzureAD) {
            storageService.saveAccessToken(gatewayResponse.value.token);
        }
        return gatewayResponse
    },


    async (error) => {
        //TODO handling !2xx errors
        toast.error(error.message)
        return Promise.reject(error);
    }
);
