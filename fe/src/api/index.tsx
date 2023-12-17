import Cookies from 'js-cookie';

export const CALL_POST_API = async (url: string, body: any) => {
  const headers: any = {
    'Content-Type': 'application/json',
  }
  if(Cookies.get('token')){
    headers.accesstoken = Cookies.get('token')
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH + url}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { success: res.ok, data };
};

export const CALL_GET_API = async (url: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
  }
  if(Cookies.get('token')){
    headers.accesstoken = Cookies.get('token')
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH + url}`, {
    method: 'GET',
    headers: headers
  });
  const data = await res.json();
  return { success: res.ok, data };
};

export const POST_MEDIA = async (url: string, formdata : FormData) => {
  const myHeaders = new Headers();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH + url}`, {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  });
  const data = await res.json();
  return { success: res.ok, data };
};
