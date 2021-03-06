# andaluh-googledocs-addon

A side panel add-on for Google Docs (Google Drive) to help you transliterating español (spanish) spelling to andaluz proposals. It imports [andaluh-gs](https://github.com/andalugeeks/andaluh-js/tree/google-apps-script) library, already hosted at Google Apps Script.

<a href="https://youtu.be/cqScVjWM1EU"><img width="800" alt="andaluh-gs about" src="https://raw.githubusercontent.com/andalugeeks/andaluh-googledocs-addon/main/img/andaluh-googledocs.png"></a>

<a href="https://youtu.be/cqScVjWM1EU">Click here or on the image to see the video.</a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Support](#support)
- [Contributing](#contributing)

## Description

The **Andalusian varieties of [Spanish]** (Spanish: *andaluz*; Andalusian) are spoken in Andalusia, Ceuta, Melilla, and Gibraltar. They include perhaps the most distinct of the southern variants of peninsular Spanish, differing in many respects from northern varieties, and also from Standard Spanish. Further info: https://en.wikipedia.org/wiki/Andalusian_Spanish.

This package introduces transliteration functions to convert *español* (spanish) spelling to andaluz. As there's no official or standard andaluz spelling, andaluh-js is adopting the **EPA proposal (Estándar Pal Andaluz)**. Further info: https://andaluhepa.wordpress.com. Other andaluz spelling proposals are planned to be added as well.

## Installation

Automate the installation with Google Apps Script `clasp` tool. Use the `package.json` file and `npm` to install such dependencies. You'll need having `npm` tool from `nodejs` already installed. But you can also install `clasp` with a different method (check https://github.com/google/clasp).

```
$ npm install
```

Login. An OAuth-like authentication window will be opened in your browser:

```
$ clasp login

Logging in globally...
(node:1428169) ExperimentalWarning: The fs.promises API is experimental
🔑 Authorize clasp by visiting this url:
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline[...]

Authorization successful.

Default credentials saved to: ~/.clasprc.json
```

Create a `google docs` project with `clasp` as well. A google apps script project will be created to host the source code (we will push the source code after).

```
$ clasp create --type docs --title Andaluh-GoogleDocs --rootDir ./src
(node:1429190) ExperimentalWarning: The fs.promises API is experimental

Created new Google Doc: https://drive.google.com/open?id=[...]
Created new Google Docs Add-on script: https://script.google.com/d/[...]/edit
```

Note the two links prompted. Push the source code to the google apps script project created and you're ready to go!

```
$ clasp push
(node:1428508) ExperimentalWarning: The fs.promises API is experimental
? Manifest file has been updated. Do you want to push and overwrite? Yes
└─ appsscript.json
└─ main.js
└─ sidebar.html
└─ test.js
Pushed 4 files.
```

Go open the `google docs` file. Use the link prompted upon `clasp create`.

## Usage

Have a look at the featured video. Click for fullscreen:

<a href="https://youtu.be/cqScVjWM1EU"><img width="520" alt="andaluh-gs about" src="https://raw.githubusercontent.com/andalugeeks/andaluh-googledocs-addon/main/img/andaluh-googledocs.gif"></a>

## Roadmap

* Adding more andaluh spelling proposals.
* Contractions and inter-word interaction rules pending to be implemented.
* Silent /h/ sounds spelling rules pending to be implemented.
* Some spelling intervowel /d/ rules are still pending to be implemented.
* Transliteration rules for some consonant ending words still pending to be implemented.

## Support

Please [open an issue](https://github.com/andalugeeks/andaluh-googledocs/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and open a pull request.
