import axios from 'axios';
import { useState } from 'react';
import { api_url } from './Vars';

const updateData = async (  end_point , updatedData, options = {}) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    setLoading(true);
    await axios.put( api_url + end_point , updatedData, options)

        .then(response => {
            setData(response.data);
        })
        .catch(err => {
            setError(err);

        }).finally(() => {
            setLoading(false);
        });

    return { loading, data, error }
};


export default updateData;