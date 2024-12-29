import axios from 'axios'
import { useState } from 'react';

const promiseWrapper = (promise) => {
    let status = "pending"
    let result;
    let suspender = promise.then(
        (res) => {
          status = "success";
          result = res.data;
        },
        (err) => {
          status = "error";
          result = err;
        }
    );
    
    return {
        read() {
          if (status === "pending") throw suspender;
          if (status === "error") throw result;
          return result;
        }
    };
}

export default function useFetchData(url, params) {
  const fetchResource = () => {
    const promise = axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      params: params
    });

    return promiseWrapper(promise);
  }

  const [resource, setResource] = useState(fetchResource);

  const refetch = (newParams) => {
    setResource(fetchResource(newParams))
  }

  return [resource, refetch];

}