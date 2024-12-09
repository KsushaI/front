/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */


export interface Visa {
  pk: number;
  type: string;
  price: number;
  url: string;
  status: string; // Added to reflect the response
  description: string | null; // Can be null
  creator: string | null; // Can be null
}

export interface VisasResult {
  user_draft_app_id: number | null;
  number_of_services: number;
  services: Visa[];
}

// Interface for a single service
export interface Service {
  type: string; // Type of the service (e.g., "Частная", "Транзитная")
  price: number; // Price of the service
  url: string; // URL for the service image
  fio: string | null; // Full name or null if not provided
}

// Interface for app_fields
export interface AppFields {
  id: number; // Unique identifier
  status: string; // Status of the application (e.g., "Черновик")
  creation_date: string; // Creation date in ISO format
  formation_date: string | null; // Formation date or null
  completion_date: string | null; // Completion date or null
  creator: string; // Creator's identifier (e.g., username)
  moderator: string | null; // Moderator's identifier or null
  start_date: string; // Start date in YYYY-MM-DD format
  duration: number; // Duration in days
  total: number | null; // Total amount or null
}

// Main interface for the response
export interface AppResponse {
  app_fields: AppFields; // The app_fields object
  services: Service[]; // Array of services
}
export interface User {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  last_name: string;
  first_name: string;
  email: string;
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  //is_superuser?: boolean;
}

export interface Application {
  /** ID */
  id?: number;
  /**
   * Status
   * @minLength 1
   * @maxLength 26
   */
  status: string;
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Completion date
   * @format date-time
   */
  completion_date?: string | null;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /**
   * Start date
   * @format date
   */
  start_date?: string;
  /**
   * Duration
   * @min -2147483648
   * @max 2147483647
   */
  duration?: number;
  /**
   * Total
   * @min -2147483648
   * @max 2147483647
   */
  total?: number | null;
}

// Defining an interface for an array of RequestResponse
interface Apps {
  responses: Application[]; // An array of RequestResponse objects
}

export interface UserSerial {

  
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
  /**
   * Last login
   * @format date-time
   */
  //last_login?: string | null;
  /** Is superuser */
  //is_superuser?: boolean;
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username?: string;
  /**
   * First name
   * @minLength 1
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
  /** Is staff */
  //is_staff?: boolean;
  /** Is active */
  //is_active?: boolean;
  
  
}

interface FetchAppsParams {
  start_date?: string;
  end_date?: string;
  status?: string;
}

// Extend the existing RequestParams to include FetchAppsParams
export type ExtendedRequestParams = Omit<RequestParams, 'query'> & {
  query?: FetchAppsParams; // Add the query property
};


import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path"> & {
  body?: unknown; // Add the body property here
};

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000",  withCredentials: true });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserList
     * @request GET:/api/user/
     * @secure
     */
    apiUserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request username ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags api
     * @name ApiUserCreate
     * @request POST:/api/user/
     * @secure
     */
    apiUserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserRead
     * @request GET:/api/user/{id}/
     * @secure
     */
    apiUserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserUpdate
     * @request PUT:/api/user/{id}/
     * @secure
     */
    apiUserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserPartialUpdate
     * @request PATCH:/api/user/{id}/
     * @secure
     */
    apiUserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserDelete
     * @request DELETE:/api/user/{id}/
     * @secure
     */
    apiUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  appsApi = {
    /**
     * No description
     *
     * @tags apps_api
     * @name AppsApiList
     * @request GET:/apps_api/
     * @secure
     */
    appsApiList: (params: ExtendedRequestParams = {}) =>
      this.request<Apps, any>({
        path: `/apps_api/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_api
     * @name AppsApiRead
     * @request GET:/apps_api/{id}/
     * @secure
     */
    appsApiRead: (id: string, params: RequestParams = {}) =>
      this.request<AppResponse, any>({
        path: `/apps_api/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_api
     * @name AppsApiUpdate
     * @request PUT:/apps_api/{id}/
     * @secure
     */
    appsApiUpdate: (id: string, data: Application, params: RequestParams = {}) =>
      this.request<Application, any>({
        path: `/apps_api/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_api
     * @name AppsApiDelete
     * @request DELETE:/apps_api/{id}/
     * @secure
     */
    appsApiDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_api/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_api
     * @name AppsApiFormUpdate
     * @request PUT:/apps_api/{id}/form/
     * @secure
     */
    appsApiFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_api/${id}/form/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_api
     * @name AppsApiUpdate2
     * @request PUT:/apps_api/{id}/{action}/
     * @originalName appsApiUpdate
     * @duplicate
     * @secure
     */
    appsApiUpdate2: (id: string, action: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_api/${id}/${action}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  appsVisasApi = {
    /**
     * No description
     *
     * @tags apps_visas_api
     * @name AppsVisasApiList
     * @request GET:/apps_visas_api/
     * @secure
     */
    appsVisasApiList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_visas_api/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_visas_api
     * @name AppsVisasApiUpdate
     * @request PUT:/apps_visas_api/
     * @secure
     */
    appsVisasApiUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_visas_api/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_visas_api
     * @name AppsVisasApiDelete
     * @request DELETE:/apps_visas_api/
     * @secure
     */
    appsVisasApiDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_visas_api/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_visas_api
     * @name AppsVisasApiRead
     * @request GET:/apps_visas_api/{id}/
     * @secure
     */
    appsVisasApiRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_visas_api/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_visas_api
     * @name AppsVisasApiUpdate2
     * @request PUT:/apps_visas_api/{id}/
     * @originalName appsVisasApiUpdate
     * @duplicate
     * @secure
     */
    appsVisasApiUpdate2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_visas_api/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps_visas_api
     * @name AppsVisasApiDelete2
     * @request DELETE:/apps_visas_api/{id}/
     * @originalName appsVisasApiDelete
     * @duplicate
     * @secure
     */
    appsVisasApiDelete2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/apps_visas_api/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/front/users/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/`,
        body: data,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRead
     * @request GET:/users/{id}/
     * @secure
     */
    usersRead: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{id}/
     * @secure
     */
    usersUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersPutUpdate
     * @request PUT:/users/{id}/put/
     * @secure
     */
    usersPutUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/put/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };

 

  visasApi = {
    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiList
     * @request GET:/visas_api/
     * @secure
     */

    visasApiList: (params: RequestParams = {}) =>
      this.request<VisasResult, any>({
        path: `/visas_api/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiCreate
     * @request POST:/visas_api/
     * @secure
     */
    visasApiCreate: (params: RequestParams = {}) =>
      this.request<Visa, any>({
        path: `/visas_api/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiRead
     * @request GET:/visas_api/{id}/
     * @secure
     */
    visasApiRead: (id: string, params: RequestParams = {}) =>
      this.request<Visa, any>({
        path: `/visas_api/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiUpdate
     * @request PUT:/visas_api/{id}/
     * @secure
     */
    visasApiUpdate: (id: string, params: RequestParams = {}) =>
      this.request<Visa, any>({
        path: `/visas_api/${id}/`,
        method: "PUT",
        secure: true,
        body: params.body,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiDelete
     * @request DELETE:/visas_api/{id}/
     * @secure
     */
    visasApiDelete: (id: string, params: RequestParams = {}) =>
      this.request<Visa, any>({
        path: `/visas_api/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiAddToTrollyCreate
     * @request POST:/visas_api/{id}/add_to_trolly/
     * @secure
     */
    visasApiAddToTrollyCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/visas_api/${id}/add_to_trolly/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visas_api
     * @name VisasApiUpdatePicCreate
     * @request POST:/visas_api/{id}/update_pic/
     * @secure
     */
visasApiUpdatePicCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/visas_api/${id}/update_pic/`,
        method: "POST",
        secure: true,
        body: params.body,
        ...params,
      }),
  };
}

