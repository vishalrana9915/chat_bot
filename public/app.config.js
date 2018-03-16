'use strict';

var appConfig = {};

appConfig.menu_speed = 200;

appConfig.build = 'app'; //Build information.

/***********************************QA Settings************************************/

/***********************************Local Settings************************************/
 appConfig.apiURL = 'http://localhost:4009/chat_bot/api/v1/';
 appConfig.socketURL = 'http://localhost:4009';
var domain = document.domain;

appConfig.default_language = {
    "key": "en-us",
    "class": "en-us",
    "alt": "United States",
    "title": "US English",
    "dataTableKey": "english",
    "formValidationKey": "en_US"
};

appConfig.smartSkin = "smart-style-0";
appConfig.smallBoxSuccess = "#659265";

appConfig.skins = [
    {
        name: "smart-style-0",
        logo: "styles/img/logo.png",
        class: "btn btn-block btn-xs txt-color-white margin-right-5",
        style: "background-color:#4E463F;",
        label: "Smart Default"
    },

    {
        name: "smart-style-1",
        logo: "styles/img/logo-white.png",
        class: "btn btn-block btn-xs txt-color-white",
        style: "background:#3A4558;",
        label: "Dark Elegance"
    },

    {
        name: "smart-style-2",
        logo: "styles/img/logo-blue.png",
        class: "btn btn-xs btn-block txt-color-darken margin-top-5",
        style: "background:#fff;",
        label: "Ultra Light"
    },

    {
        name: "smart-style-3",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background:#f78c40",
        label: "Google Skin"
    },

    {
        name: "smart-style-4",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
        label: "PixelSmash"
    },

    {
        name: "smart-style-5",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background: rgba(153, 179, 204, 0.2); border: 1px solid rgba(121, 161, 221, 0.8); color: #17273D !important;",
        label: "Glass"
    }
];
appConfig.sound_path = "sound/";
appConfig.sound_on = true;

/*
 * DEBUGGING MODE
 * debugState = true; will spit all debuging message inside browser console.
 * The colors are best displayed in chrome browser.
 */

appConfig.debugState = true;
appConfig.debugStyle = 'font-weight: bold; color: #00f;';
appConfig.debugStyle_green = 'font-weight: bold; font-style:italic; color: #46C246;';
appConfig.debugStyle_red = 'font-weight: bold; color: #ed1c24;';
appConfig.debugStyle_warning = 'background-color:yellow';
appConfig.debugStyle_success = 'background-color:green; font-weight:bold; color:#fff;';
appConfig.debugStyle_error = 'background-color:#ed1c24; font-weight:bold; color:#fff;';


/*
 * END APP.appConfig
 */
