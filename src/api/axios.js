import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export default axios.create({
    baseURL: BASE_URL
});
