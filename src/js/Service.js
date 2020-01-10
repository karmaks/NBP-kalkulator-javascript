import axios from 'axios';

export default class Service {
    constructor() {
        const NBP_URL = 'http://api.nbp.pl/api/exchangerates/tables/A?format=json';
        this.responseData = axios.get(NBP_URL);
    }

    getTableA() {
        return this.responseData.then(resp => [...resp.data[0].rates]);
    }

    getDate() {
        return this.responseData;
    }

}