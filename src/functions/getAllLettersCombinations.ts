import { AxiosInstance } from 'axios';
import cheerio from 'cheerio';

const wait = (ms: number) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

export default async function getAllLettersCombinations(alphabet: string[], baseUrl: string, axios: AxiosInstance, ms: number): Promise<string[]> {
    const allLetterCombination: string[] = [];
    try {
        for (const letter of alphabet) {
            await wait(ms);
            const alphaUrl = baseUrl + `/alpha/${letter}.html`;
            const res = await axios.get(alphaUrl);
            const html = res.data;
            const $ = cheerio.load(html);
            const drugAlphaTable: cheerio.Cheerio = $('.ddc-mgb-2 ul li');

            drugAlphaTable.children('a').each((i, element) => {
                let letterCombination: string = $(element).text();
                if (letterCombination === '0-9') {
                    letterCombination = letter + '0-9'
                }
                allLetterCombination.push(letterCombination.toLowerCase())

            })

        }
        allLetterCombination.push('0-9');
        console.log('All letter combination have been collected')
        return allLetterCombination
    } catch (error) {
        throw Error('Something went wrong at: getAllLettersCombinations. ' + error.message)
    }

}
