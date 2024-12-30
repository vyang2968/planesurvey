import { useState, useMemo, useCallback } from 'react';
import axios from 'axios';

// Wrapper to handle the async state for Suspense
const promiseWrapper = (promise) => {
    let status = "pending";
    let result;
    let suspender = promise.then(
        (res) => {
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
        }
    };
};

export default function useFetchData(url, params) {
    const [error, setError] = useState(null);
    const [resource, setResource] = useState(null);
    const stableParams = useMemo(() => JSON.stringify(params), [params]);

    const fetchResource = useCallback(() => {
        setError(null); // Clear any previous error before a new request

        // Start the Axios request
        const promise = axios.get(url, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            params: JSON.parse(stableParams), // Use stringified params
        }).then((res) => {
            // Handle successful request
            setResource(res.data);
        }).catch((err) => {
            // Handle network error or any other Axios error
            setError(err); // Store error in state
            throw err; // Throw the error to be caught by ErrorBoundary
        });

        // Return the promise wrapped for Suspense
        return promiseWrapper(promise);
    }, [url, stableParams]);

    // If resource hasn't been fetched, use initialResource
    const initialResource = useMemo(() => fetchResource(), [fetchResource]);

    // Return wrapped resource for Suspense to handle
    return [resource ? promiseWrapper(Promise.resolve(resource)) : initialResource, fetchResource, error];
}
