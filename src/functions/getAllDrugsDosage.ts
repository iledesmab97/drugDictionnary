import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { IDrugDosing } from 'src/types/DrugType';
import createDrugFile from './createDrugFile';

const wait = (ms: number) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

export default async function getAllDrugsDosage(drugsHref: string[], baseUrl: string, ms: number) {
    const allDrugsDossage: IDrugDosing[] = [];
    const additionalDrugsDossageHref: string[] = [];
    try {
        for (const href of drugsHref) {
            wait(ms)
            let alphaUrl: string;
            if (href.includes('pro')) {
                alphaUrl = baseUrl + `${href}`;
            } else {
                alphaUrl = baseUrl + `${href}#dosage`;
            }

            const res: AxiosResponse = await axios.get(alphaUrl);
            const html = res.data;
            const $ = cheerio.load(html);
            const drugName: cheerio.Cheerio = $('.contentBox').children('h1');
            const pronouceTitle: cheerio.Cheerio = $('.contentBox').children('.pronounce-title').children('h1');
            const drugDosage: cheerio.Cheerio = $('#content #dosage')
            const drugDosageInfo: cheerio.Cheerio = drugDosage.nextUntil('#what-to-avoid');
            const drugDosageHref: cheerio.Cheerio = $('.nav-tabs').children().eq(2);
            let drugDosageModalHref: string = drugDosageHref.children('a').attr('href');

            if (!drugDosageModalHref) {
                const drugDosageInfoResponse: IDrugDosing = {
                    name: drugName.text() === '' ? pronouceTitle.text() : drugName.text(),
                    info: drugDosage.text() === '' && drugDosageInfo.text() === '' ? undefined : drugDosage.text() + drugDosageInfo.text()
                }
                if (drugDosageInfoResponse.info) {
                    allDrugsDossage.push(drugDosageInfoResponse);
                    await createDrugFile(drugDosageInfoResponse);
                }



            } else {
                additionalDrugsDossageHref.push(drugDosageModalHref)
            }
        }
        if (additionalDrugsDossageHref.length > 0) {
            for (const href of additionalDrugsDossageHref) {
                wait(ms)
                const dossageUrl = baseUrl + `${href}`;
                const res = await axios.get(dossageUrl);
                const html = res.data;
                const $ = cheerio.load(html);
                const drugName: cheerio.Cheerio = $('.contentBox').children('h1');
                const pronouceTitle: cheerio.Cheerio = $('.contentBox').children('.pronounce-title').children('h1');
                const drugDosage: cheerio.Cheerio = $('.contentBox').children().eq(1).nextUntil('#moreResources');
                const drugDosageInfoResponse: IDrugDosing = {
                    name: drugName.text() === '' ? pronouceTitle.text() : drugName.text(),
                    info: drugDosage.text()
                }
                await createDrugFile(drugDosageInfoResponse);
                console.log(`File ${drugDosageInfoResponse.name} is created succesfully`)
                allDrugsDossage.push(drugDosageInfoResponse)
            }
        }

        console.log('All drug dossage have been collected')
        return allDrugsDossage
    } catch (error) {
        throw Error('Something went wrong at: getAllDrugsDosage. ' + error.message)
    }
}
