import * as fs from 'fs';
import { TranslationServiceClient } from '@google-cloud/translate';

const projectId = 'roberto-cloud';
const gcloudLocation = 'global';
const keyFileName = 'dev/service-account-file.json';

const configFilePath = './dev/translate.config.json';

async function main() {
    console.log('\n[START] Application started running!\n');

    // if config not found throw exception
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

    // if config.englishFilePath not found throw exception
    const eng = JSON.parse(fs.readFileSync(config.englishFilePath, 'utf8'));

    const copyFromEnglish = Object.keys(eng).filter(key => {
        if (!config?.copyFromEnglish) {
            return false;
        }

        for (const copyFromEnglishKey of config.copyFromEnglish) {
            if (key === copyFromEnglishKey) {
                return true;
            }
        }
        return false;
    });

    // get english array of values (ignore keys)
    const translationStrings = Object.keys(eng)
        .filter(key => {
            if (!eng[key]) {
                console.log(`[${key}] Skipping due to empty value in english translation file!`);
                return false;
            }
            if (copyFromEnglish.includes(key)) {
                console.log(`[${key}] Skipping due to key being in "copyFromEnglish" in translate config file!`);
                return false;
            }
            return true;
        })
        .map(key => eng[key]);

    console.log('\n');

    const languageCodeMap = {};
    for (const languageCode of Object.keys(config.languages)) {
        // throw exception if the file is not found
        languageCodeMap[languageCode] = {
            originalFile: JSON.parse(fs.readFileSync(config.languages[languageCode], 'utf8')),
            translationResponse: await translateAll(translationStrings, languageCode),
        };
    }

    // add the translated values to the existing json file
    translationStrings.forEach((value, index) => {
        const key = Object.keys(eng).find(key => eng[key] === value);
        if (!key) {
            return;
        }

        Object.keys(config.languages).map(languageCode => {
            const languageCodeValue = languageCodeMap[languageCode];
            languageCodeValue.originalFile[key] = languageCodeValue.translationResponse[index]?.translatedText;
        });

        console.log(`[${key}] Updated translation values`);
    });

    console.log('\n');

    // add the "copyFromEnglish" keys from eng to the others
    copyFromEnglish.forEach(key => {
        if (!eng[key]) {
            return;
        }

        Object.keys(config.languages).map(languageCode => {
            const languageCodeValue = languageCodeMap[languageCode];
            languageCodeValue.originalFile[key] = eng[key];
        });
        console.log(`[${key}] Updated translation values copied from english!`);
    });

    console.log('\n');

    for (const languageCode of Object.keys(config.languages)) {
        const languageCodeValue = languageCodeMap[languageCode];

        fs.writeFileSync(config.languages[languageCode], JSON.stringify(languageCodeValue.originalFile), {
            encoding: 'utf8',
            flag: 'w',
        });
    }
}

async function translateAll(translateStrings, targetLanguageCode) {
    const client = new TranslationServiceClient({
        keyFilename: keyFileName,
    });

    const returnValue = await client.translateText({
        parent: `projects/${projectId}/locations/${gcloudLocation}`,
        contents: translateStrings,
        mimeType: 'text/plain',
        sourceLanguageCode: 'en',
        targetLanguageCode,
    });

    return returnValue[0].translations;
}

main()
    .then(() => {
        console.log('[END] Application finished succesfully!\n');
    })
    .catch(error => {
        console.error(error);
    });
