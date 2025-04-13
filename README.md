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

Studies:

After finishing my high school education in my home town I decided to enroll into a computer science bachelor in my home city. Here I studied for around 4 years where I learnt the basics of programming, hardware, project management... Finally, I moved to Antwerp to complete my bachelor there as an ERASMUS student where I had the chance to not only study in a different culture and language but also learn the Belgian academic and work environment.

Experience:

I have been working since I was on my third year of bachelor, starting on intern positions and slowly started getting some more responsability. I am now a more experimented developer that can work on many different tech stacks and contexts.

F1 connecting:

Worked as a half time job intern for around 10 months. I was involved in a whole variety of activities in the company including implementing new features, resolution of bugs and system management.

- Mantainance of several on premise linux servers
- C++ process programming using QT creator
- Web development using LAMP
- Programmed third party integrations using external APIs
- Bug resolution on linux servers running in production

Flowtribe:

Started working as a student job for almost one year and then transitioned into full time job. I have been involved in many different activities in the company, from programming new big features to the resolution of bugs in running code.

- Management of cloud infraestructure using google cloud
- Development of different backend services using nest js
- Development of different frontend apps using angular
- Developed with a big team using agile with Jira, Bitbucket and Confluence
- Bug resolution on running serverless cloud instances

Universitat Politecnica de Valencia:

Did my bachelor studies for around four years at this university. Even though for the bigger part the system was exam based I also had the chance to build some projects in group that included from project management to programming.

- Worked in a project with 5 people where we had to establish milestones and sprints
- Built different applications using javascript, html and java as backend
- Prototyped networks configuring all of the different routers and AP
- Got the chance to go abroad as an ERASMUS student
- Worked as an intern parallely for around 10 months

University of Antwerp

I came abroad to Antwerp as an ERASMUS student for one year. Here I finished my degree, completing my dissertation abroad and my final lectures. I have been involved in Master's lessons and so worked on big group projects.

- Developed a self driven car using diffferent AI models that we built ourselves
- Built a low energy wifi sensoring device used to monitor plants state
- Got the chance to work in groups of up to 10 people
- Built an electronic circuit using a motor and some sensors that had to balance a pointer back to 0 of angle
