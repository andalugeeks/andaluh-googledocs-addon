# andaluh-googledocs-addon

A side panel add-on for Google Docs (Google Drive) that uses [andaluh-js](https://github.com/andalugeeks/andaluh-js) to help you transliterating español (spanish) spelling to andaluz proposals.

<img width="800" alt="andaluh-gs about" src="https://github.com/andalugeeks/andaluh-js/raw/google-apps-script/img/andaluh-gs.png?raw=true">

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

Automate the deployment with Google Apps Script `clasp` tool. Use the `package.json` file and `npm` to install such dependencies with

```
$ npm install
```

Login, create a project and push!

```
$ clasp login
$ clasp create
$ clasp push
```

## Usage

Have a look at the featured video. Click for fullscreen:

<a href="https://youtu.be/cqScVjWM1EU"><img width="800" alt="andaluh-gs about" src="https://github.com/andalugeeks/andaluh-js/raw/google-apps-script/img/andaluh-gs.png?raw=true"></a>

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
