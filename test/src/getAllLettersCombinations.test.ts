import 'dotenv/config';
import getAllLettersCombinations from '../../src/functions/getAllLettersCombinations';
import axios, { AxiosInstance } from 'axios';
const AxiosInstance: AxiosInstance = axios.create();

const baseUrl = process.env.BASE_URL;
const ms = +process.env.TIME_REQUEST;

describe('IFindALetterCombination', () => {
    it('should get letter combination', async () => {
        const letterCombination: string[] = await getAllLettersCombinations(['a'], baseUrl, AxiosInstance, ms)
        expect(letterCombination.length > 0).toBeTruthy();
    })
})