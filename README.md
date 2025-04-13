# Description

This is a portfolio web server implemented using react and tailwindcss that exposes all of the projects I have implemented during my software developer career, including links, videos and many others, this is accesible in the public internet in [robertomilla.com](https://robertomilla.com)

# Installation

1. clone

```
git clone https://github.com/robertobobby1/RobertoMilla.git
cd RobertoMilla
```

2. install dependencies

```
npm install
```

3. run application locally

```
npm run start
```

# Translations

This application has a small javascript script used for translations, it uses a google cloud external service, just by activating the API in gcloud and providing the necessary authentication file(service account) you can use it to automatically generate translations to all supported gcloud languages. It will use the english template and generate from a key value for all the other language maps set up in the config file. It contains a config file that accepts the following:

- englishFilePath => MANDATORY, this is the path to the english template file used
- languages => MANDATORY, this is a key value pair containing the [ISO-639 code](https://cloud.google.com/translate/docs/languages) mapped to a file path in your system where the json translation files will be used
- copyFromEnglish => OPTIONAL, this is an array of keys that will be skipped in the translation and will be copied from the english version to all the other language mappings
