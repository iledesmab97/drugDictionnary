import 'dotenv/config';
import getAllDrugsDosage from '../../src/functions/getAllDrugsDosage';
import axios, { AxiosInstance } from 'axios';
import { IDrugDosing } from '../../src/types/DrugType';
import { existsSync, unlinkSync } from 'fs'
const AxiosInstance: AxiosInstance = axios.create();

const baseUrl = process.env.BASE_URL;
const ms = +process.env.TIME_REQUEST;

const path = '../../Abacavir Dosage.txt'
const path2 = '../../Abilify Maintena (injection).txt'


describe('IFindADrugDosage', () => {
    it('should get a drug Dosage, and create file', async () => {
        if (existsSync(path)) {
            try {
                unlinkSync(path)
                //file removed
            } catch (err) {
                console.error(err)
            }
        }
        if (existsSync(path2)) {
            try {
                unlinkSync(path)
                //file removed
            } catch (err) {
                console.error(err)
            }
        }
        const drugsDosage: IDrugDosing[] = await getAllDrugsDosage(['/mtm/abilify-maintena-injection.html', '/pro/abacavir-oral-solution.html'], baseUrl, ms)
        expect(drugsDosage.length > 0).toBeTruthy();
    })
})