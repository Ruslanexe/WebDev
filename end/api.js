const BASE_URL = "http://127.0.0.1:8000/";
const RES_URL = BASE_URL + "helicopters";

async function baseRequest({
  method = "GET",
  body = {},
  headers = {},
  url = "",
}) {
  try {
    let params = {
      method: method,
    };
    if (body) {
      params.body = JSON.stringify(body);
    }
    if (headers) {
      params.headers = headers;
    }
    let result = await fetch(RES_URL + url, params);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getRequest() {
  return (
    await baseRequest({ method: "GET", body: null, headers: null })
  ).json();
}

export async function postRequest(body) {
  return (
    await baseRequest({
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}
export async function deleteRequest(body) {
  return await baseRequest({
    url: "/" + body.id,
    method: "DELETE",
  });
}

export async function putRequest(body) {
  return (
    await baseRequest({
      url: "/" + body.id,
      method: "PUT",
      body: body,
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}
