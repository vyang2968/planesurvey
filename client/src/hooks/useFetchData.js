import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';

const promiseWrapper = (promise, delay = 0) => {
    let status = "pending";
    let result;
    let suspender = promise.then(
        async (res) => {
            await new Promise((resolve) => setTimeout(resolve, delay));
            status = "success";
            result = res?.data ?? res;
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
        },
    };
};

export default function useFetchData(url, params, baseURL) {
    const [error, setError] = useState(null);
    const [resource, setResource] = useState(null);

    const stableParams = useMemo(() => params, [JSON.stringify(params)]);

    const fetchResource = useCallback(() => {
        setError(null);
        const promise = axios.get(url, {
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json",
                "API-KEY": process.env.REACT_APP_API_KEY,
            },
            withCredentials: true,
            params: stableParams,
        });

        const wrappedPromise = promiseWrapper(promise, 300);

        promise
            .then((res) => setResource(res.data))
            .catch((err) => setError(err));

        return wrappedPromise;
    }, [url, stableParams, baseURL]);

    const resourceWrapper = useMemo(() => fetchResource(), [fetchResource]);

    return [resourceWrapper, fetchResource, error];
}
