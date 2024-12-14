
import { useState, useEffect } from 'react';
import axios from 'axios';
import { api_url } from './Vars';

const useAxiosFetch = (end_point, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios({
                    url: api_url + end_point,
                    method: "GET",
                    ...options, // Merge other options
                });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [end_point]);

    return { data, loading, error }
}

export default useAxiosFetch;
