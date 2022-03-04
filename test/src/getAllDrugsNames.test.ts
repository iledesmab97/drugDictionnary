import 'dotenv/config';
import getAllDrugsHref from '../../src/functions/getAllDrugsNames';
import axios, { AxiosInstance } from 'axios';
const AxiosInstance: AxiosInstance = axios.create();

const baseUrl = process.env.BASE_URL;
const ms = +process.env.TIME_REQUEST;

describe('IFindADrugHref', () => {
    it('should get a drug Href', async () => {
        const drugsHref: string[] = await getAllDrugsHref(['ab'], baseUrl, AxiosInstance, ms)
        expect(drugsHref.length > 0).toBeTruthy();
    })
})