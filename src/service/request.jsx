import { message } from "antd";

export class ApiError extends Error {
  status;
  body;
  constructor(status, body) {
    super(`Api call failed: ${status}`);
    this.status = status;
    this.body = body;
  }
}

export async function request(method, path, body) {
  return fetch(path, {
    method: method,
    body: method === "POST" ? JSON.stringify(body || {}) : undefined,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("access_token")
        ? `Bearer ${localStorage.getItem("access_token")}`
        : undefined,
    },
    credentials: "include",
  }).then(async (response) => {
    let body;
    try {
      body = await response.json();
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      throw new ApiError(response.status, {});
    }

    if (response.status < 200 || response.status >= 400) {
      throw new ApiError(response.status, body);
    }
    return body;
  });
}

export async function requestUrlEncoded(method, path, body) {
  return fetch(path, {
    method: method,
    body: method === "POST" ? new URLSearchParams(body || {}) : undefined,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: localStorage.getItem("access_token")
        ? `Bearer ${localStorage.getItem("access_token")}`
        : undefined,
    },
    credentials: "include",
  }).then(async (response) => {
    let body;
    try {
      body = await response.json();
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      throw new ApiError(response.status, {});
    }

    if (response.status < 200 || response.status >= 400) {
      throw new ApiError(response.status, body);
    }
    return body;
  });
}

/**
 * 根据请求结果使用antd.message提醒用户
 *
 * @param {*} request 发送的网络请求
 * @param {*} onSuccess 成功时的信息，默认使用响应中的"message"字段，传入null不提醒
 * @param {*} onError 错误时的信息，默认使用响应中的"message"字段，传入null不提醒
 * @returns {unknown}
 */
export async function withMessage(request, onSuccess, onError) {
  return request
    .then((res) => {
      if (onSuccess) message.success(onSuccess);
      else if (onError === undefined) message.success(res?.detail || "成功");
      return res;
    })
    .catch((e) => {
      if (onError) message.error(onError);
      else if (onError === undefined) {
        if (e instanceof ApiError && e?.body?.detail)
          message.error(e.body.detail);
        else message.error("未知错误");
      }
      throw e;
    });
}
