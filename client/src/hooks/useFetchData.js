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

export default function useFetchData(url, params, baseURL) {
    const [error, setError] = useState(null);
    const [resource, setResource] = useState(null);

    // Memoize params to avoid unnecessary re-fetching
    const stableParams = useMemo(() => JSON.stringify(params), [params]);

    // Function to introduce delay in fetching resource
    const fetchWithDelay = (promise, delay) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                promise.then(resolve).catch(reject);
            }, delay);
        });
    };

    // Fetch data when params change
    const fetchResource = useCallback(() => {
        setError(null); // Clear any previous error before a new request

        const promise = axios
            .get(url, {
                baseURL: baseURL,
                headers: {
                    "Content-Type": "application/json",
                    "API-KEY": process.env.REACT_APP_API_KEY
                },
                withCredentials: true,
                params: JSON.parse(stableParams), // Use stringified params
            })
            .then((res) => {
                return res.data; // Directly return the data
            })
            .catch((err) => {
                setError(err); // Store error in state
                throw err; // Throw the error to be caught by ErrorBoundary
            });

        // Wrap the axios promise with a delay
        return promiseWrapper(fetchWithDelay(promise, 300)); // Delay 300ms before resolving the promise
    }, [url, stableParams]);

    // Trigger resource fetch if not already done
    const resourceWrapper = useMemo(() => {
        if (!resource) {
            return fetchResource(); // Only fetch if resource is null
        }
        return promiseWrapper(Promise.resolve(resource)); // Use the already fetched data
    }, [fetchResource, resource]);

    return [resourceWrapper, fetchResource, error];
}
