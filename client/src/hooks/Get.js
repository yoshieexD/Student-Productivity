import { useQuery } from 'react-query';
import axios from 'axios';

const Get = (url) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
        }
    };
    return useQuery(url, fetchData);
};

export default Get;
