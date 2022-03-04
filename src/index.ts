import 'dotenv/config';
import axios, { AxiosInstance } from 'axios';
import getAllLettersCombinations from './functions/getAllLettersCombinations';
import getAllDrugsHref from './functions/getAllDrugsNames';
import getAllDrugsDosage from './functions/getAllDrugsDosage';
import { IDrugDosing } from './types/DrugType';

const baseUrl = process.env.BASE_URL;
const ms = +process.env.TIME_REQUEST;

const AxiosInstance: AxiosInstance = axios.create();

const alphabet: string[] = ["a", "b", "c",] //"d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "u", "v", "w", "x", "y", "z"];


async function getAllDrugs() {
    let allLettersCombinations: string[];
    try {
        allLettersCombinations = await getAllLettersCombinations(alphabet, baseUrl, AxiosInstance, ms);
        if (!allLettersCombinations) throw new Error('Unavailable to get letter combinations');
    } catch (err) {
        console.error(err.message);
        process.exit();
    }


    let allDrugsHref: string[];
    try {
        allDrugsHref = await getAllDrugsHref(allLettersCombinations, baseUrl, AxiosInstance, ms);
        if (!allDrugsHref) throw new Error('Unavailable to get drugs href');
    } catch (err) {
        console.error(err.message);
        process.exit();
    }

    let allDrugsDosing: IDrugDosing[];
    try {
        allDrugsDosing = await getAllDrugsDosage(allDrugsHref, baseUrl, ms);
        if (!allDrugsDosing) throw new Error('Unavailable to get drugs dosing');
    } catch (err) {
        console.error(err.message);
        process.exit();
    }

}


getAllDrugs();
