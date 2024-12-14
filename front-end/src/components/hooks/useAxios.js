// useAxios.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (endPoint, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            setLoading( true );
            await axios("http://127.0.0.1:8000/api" + endPoint, options)
                .then(response => {
                    setData(response.data);
                }).
                catch(err => {

                    setError(err);

                }).finally(() => {

                    setLoading(false);

                });
        };

        fetchData();

    }, [endPoint]);

    return { data, loading, error };
};

export default useAxios;