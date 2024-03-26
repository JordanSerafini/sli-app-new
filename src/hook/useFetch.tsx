import { useEffect, useState } from "react";


export const useFetch = (url: string, options = {}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState<unknown>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://sli-back-964256b21f2d.herokuapp.com" + url, options)

                const data = await response.json();
    
                if (response.ok) {
                    setData(data);
                }
            } catch(err) {
                setErrors(err);
            } finally {
                setIsLoading(false);
            }
        }

        setTimeout(() => {
            fetchData();
        }, 2000);
    }, []);

    return {isLoading, data, errors};
};