import { AxiosInstance, AxiosResponse } from 'axios';
import cheerio from 'cheerio';

const wait = (ms: number) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

export default async function getAllDrugsHref(combinedLetters: string[], baseUrl: string, axios: AxiosInstance, ms: number): Promise<string[]> {
    const allDrugsHref: string[] = [];
    try {
        for (const combinedLetter of combinedLetters) {
            await wait(ms);
            const alphaUrl = baseUrl + `/alpha/${combinedLetter}.html`;
            const res: AxiosResponse = await axios.get(alphaUrl);
            const html = res.data;
            const $ = cheerio.load(html);
            const drugAlphaTable: cheerio.Cheerio = $('.ddc-list-column-2 li');

            drugAlphaTable.children('a').each((i, element) => {
                let drugName: string = $(element).attr('href');
                allDrugsHref.push(drugName)
            })

        }
        console.log('All drug href have been collected')
        return allDrugsHref
    } catch (error) {
        throw Error('Something went wrong at: getallDrugsHref. ' + error.message)
    }

}
