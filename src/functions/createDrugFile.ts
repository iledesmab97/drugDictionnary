import { IDrugDosing } from 'src/types/DrugType';
import { writeFile } from 'fs';

export default async function createDrugFile(drugDossageInfo: IDrugDosing) {
    writeFile(`${drugDossageInfo.name.replace("\/", "-")}.txt`, drugDossageInfo.info, function (err) {
        if (err) throw err;
        console.log(`File ${drugDossageInfo.name} is created succesfully`)
        return
    });
    return
}