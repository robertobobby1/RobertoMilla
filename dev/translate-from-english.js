import * as fs from 'fs';
import { TranslationServiceClient } from '@google-cloud/translate';

const projectId = 'roberto-cloud';
const gcloudLocation = 'global';
const configFilePath = './dev/translate.config.json';

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('  TRANSLATION SCRIPT');
    console.log('='.repeat(60));
    console.log();

    // if config not found throw exception
    console.log('📋 Loading configuration...');
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    console.log(`✓ Config loaded from: ${configFilePath}`);

    // if config.englishFilePath not found throw exception
    console.log(`📖 Loading English translations from: ${config.englishFilePath}`);
    const eng = JSON.parse(fs.readFileSync(config.englishFilePath, 'utf8'));
    const totalEnglishKeys = Object.keys(eng).length;
    console.log(`✓ Loaded ${totalEnglishKeys} keys from English file\n`);

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

    if (copyFromEnglish.length > 0) {
        console.log(`🔄 ${copyFromEnglish.length} keys will be copied directly from English (no translation)`);
    }

    console.log('\n' + '-'.repeat(60));
    console.log('  PROCESSING LANGUAGES');
    console.log('-'.repeat(60) + '\n');

    const languageCodeMap = {};
    let skippedEmptyKeys = new Set();
    let skippedCopyKeys = new Set();

    for (const languageCode of Object.keys(config.languages)) {
        console.log(`\n🌍 Processing language: ${languageCode.toUpperCase()}`);
        console.log(`   File: ${config.languages[languageCode]}`);

        const existingTranslations = JSON.parse(fs.readFileSync(config.languages[languageCode], 'utf8'));
        const existingKeysCount = Object.keys(existingTranslations).length;
        console.log(`   Existing keys: ${existingKeysCount}`);

        languageCodeMap[languageCode] = {
            originalFile: existingTranslations,
            keysToTranslate: [],
            translationResponse: null,
        };

        let preservedCount = 0;

        Object.keys(eng).forEach(key => {
            if (!eng[key]) {
                skippedEmptyKeys.add(key);
                return;
            }
            if (copyFromEnglish.includes(key)) {
                skippedCopyKeys.add(key);
                return;
            }
            // Only translate if key doesn't exist in target language
            if (!existingTranslations.hasOwnProperty(key)) {
                languageCodeMap[languageCode].keysToTranslate.push(key);
            } else {
                preservedCount++;
            }
        });

        console.log(`   ✓ Preserved: ${preservedCount} keys (already translated)`);
        console.log(`   🆕 New keys to translate: ${languageCodeMap[languageCode].keysToTranslate.length}`);

        // Translate only missing keys for this language
        if (languageCodeMap[languageCode].keysToTranslate.length > 0) {
            console.log(`   🔄 Translating ${languageCodeMap[languageCode].keysToTranslate.length} keys...`);
            const stringsToTranslate = languageCodeMap[languageCode].keysToTranslate.map(key => eng[key]);
            languageCodeMap[languageCode].translationResponse = await translateAll(stringsToTranslate, languageCode);
            console.log(`   ✓ Translation complete!`);
        } else {
            console.log(`   ⏭️  No new keys to translate`);
        }
    }

    if (skippedEmptyKeys.size > 0) {
        console.log(
            `\n⚠️  Skipped ${skippedEmptyKeys.size} keys with empty values: ${Array.from(skippedEmptyKeys).join(', ')}`,
        );
    }
    if (skippedCopyKeys.size > 0) {
        console.log(
            `ℹ️  Skipped ${skippedCopyKeys.size} keys marked as "copyFromEnglish": ${Array.from(skippedCopyKeys).join(', ')}`,
        );
    }

    console.log('\n' + '-'.repeat(60));
    console.log('  APPLYING TRANSLATIONS');
    console.log('-'.repeat(60) + '\n');

    // add the translated values to the existing json file (only for new keys)
    let totalNewKeysAdded = 0;
    Object.keys(config.languages).forEach(languageCode => {
        const languageCodeValue = languageCodeMap[languageCode];
        if (languageCodeValue.keysToTranslate.length > 0 && languageCodeValue.translationResponse) {
            languageCodeValue.keysToTranslate.forEach((key, index) => {
                languageCodeValue.originalFile[key] = languageCodeValue.translationResponse[index]?.translatedText;
                totalNewKeysAdded++;
            });
            console.log(`✓ ${languageCode}: Added ${languageCodeValue.keysToTranslate.length} new translations`);
        }
    });

    // add the "copyFromEnglish" keys from eng to the others
    if (copyFromEnglish.length > 0) {
        console.log(`\n🔄 Copying ${copyFromEnglish.length} keys from English...`);
        copyFromEnglish.forEach(key => {
            if (!eng[key]) {
                return;
            }

            Object.keys(config.languages).map(languageCode => {
                const languageCodeValue = languageCodeMap[languageCode];
                languageCodeValue.originalFile[key] = eng[key];
            });
        });
        console.log(`✓ Copied ${copyFromEnglish.length} keys from English to all languages`);
    }

    console.log('\n' + '-'.repeat(60));
    console.log('  SAVING FILES');
    console.log('-'.repeat(60) + '\n');

    for (const languageCode of Object.keys(config.languages)) {
        const languageCodeValue = languageCodeMap[languageCode];
        const filePath = config.languages[languageCode];
        const totalKeys = Object.keys(languageCodeValue.originalFile).length;

        fs.writeFileSync(filePath, JSON.stringify(languageCodeValue.originalFile, null, 2), {
            encoding: 'utf8',
            flag: 'w',
        });
        console.log(`✓ ${languageCode}: Saved ${totalKeys} keys to ${filePath}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('  SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total languages processed: ${Object.keys(config.languages).length}`);
    console.log(`Total new keys translated: ${totalNewKeysAdded}`);
    console.log(`Keys copied from English: ${copyFromEnglish.length}`);
    console.log('='.repeat(60) + '\n');
}

async function translateAll(translateStrings, targetLanguageCode) {
    const client = new TranslationServiceClient();

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
        console.log('✅ Application finished successfully!\n');
    })
    .catch(error => {
        console.error('\n❌ ERROR:\n');
        console.error(error);
        process.exit(1);
    });
