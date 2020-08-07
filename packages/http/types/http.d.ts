import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { RcHttpOptions, MixinsOptions } from "./options";
import { PluginObject, PluginFunction } from "./plugin";

export interface RcHttpInstance {
  $fetch?: AxiosInstance;
  request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string, params:? any, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(url: string, params:? any, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, params:? any, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(url: string, params:? any, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(url: string, params:? any, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

export interface HttpConstructor {
  new (options?: RcHttpOptions): RcHttpInstance;

  static options: MixinsOptions;

  static use<T>(plugin: PluginObject<T> | PluginFunction<T>, options?: T): void;

  static mixin(mixin: MixinsOptions): void;
}

export const Http: HttpConstructor;
