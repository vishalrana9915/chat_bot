'use strict';

var appConfig = {};

appConfig.menu_speed = 200;

appConfig.build = 'app'; //Build information.

/***********************************QA Settings************************************/

/***********************************Local Settings************************************/
 appConfig.apiURL = 'http://localhost:4009/chat_bot/api/v1/';
 appConfig.socketURL = 'http://localhost:4009';
var domain = document.domain;

//appConfig.ticketUrl = domain.indexOf("documents.staples.com") != -1 ?
//    appConfig.eclProductionTicketUrl : domain.indexOf("www.pnimedia.com") != -1 ?
//    appConfig.eclProductionTicketUrl : domain.indexOf("flightdeck.staples.com") != -1 ?
//    appConfig.eclProductionTicketUrl : appConfig.eclStagingTicketUrl;

appConfig.facility_selector = true;

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

appConfig.voice_command = true;
appConfig.voice_command_auto = false;

/*
 *  Sets the language to the default 'en-US'. (supports over 50 languages
 *  by google)
 *
 *  Afrikaans         ['af-ZA']
 *  Bahasa Indonesia  ['id-ID']
 *  Bahasa Melayu     ['ms-MY']
 *  CatalГ            ['ca-ES']
 *  ДЊeЕЎtina         ['cs-CZ']
 *  Deutsch           ['de-DE']
 *  English           ['en-AU', 'Australia']
 *                    ['en-CA', 'Canada']
 *                    ['en-IN', 'India']
 *                    ['en-NZ', 'New Zealand']
 *                    ['en-ZA', 'South Africa']
 *                    ['en-GB', 'United Kingdom']
 *                    ['en-US', 'United States']
 *  EspaГ±ol          ['es-AR', 'Argentina']
 *                    ['es-BO', 'Bolivia']
 *                    ['es-CL', 'Chile']
 *                    ['es-CO', 'Colombia']
 *                    ['es-CR', 'Costa Rica']
 *                    ['es-EC', 'Ecuador']
 *                    ['es-SV', 'El Salvador']
 *                    ['es-ES', 'EspaГ±a']
 *                    ['es-US', 'Estados Unidos']
 *                    ['es-GT', 'Guatemala']
 *                    ['es-HN', 'Honduras']
 *                    ['es-MX', 'MГ©xico']
 *                    ['es-NI', 'Nicaragua']
 *                    ['es-PA', 'PanamГЎ']
 *                    ['es-PY', 'Paraguay']
 *                    ['es-PE', 'PerГє']
 *                    ['es-PR', 'Puerto Rico']
 *                    ['es-DO', 'RepГєblica Dominicana']
 *                    ['es-UY', 'Uruguay']
 *                    ['es-VE', 'Venezuela']
 *  Euskara           ['eu-ES']
 *  FranГ§ais         ['fr-FR']
 *  Galego            ['gl-ES']
 *  Hrvatski          ['hr_HR']
 *  IsiZulu           ['zu-ZA']
 *  ГЌslenska         ['is-IS']
 *  Italiano          ['it-IT', 'Italia']
 *                    ['it-CH', 'Svizzera']
 *  Magyar            ['hu-HU']
 *  Nederlands        ['nl-NL']
 *  Norsk bokmГҐl     ['nb-NO']
 *  Polski            ['pl-PL']
 *  PortuguГЄs        ['pt-BR', 'Brasil']
 *                    ['pt-PT', 'Portugal']
 *  RomГўnДѓ          ['ro-RO']
 *  SlovenДЌina       ['sk-SK']
 *  Suomi             ['fi-FI']
 *  Svenska           ['sv-SE']
 *  TГјrkГ§e          ['tr-TR']
 *  Р±СЉР»РіР°СЂСЃРєРё['bg-BG']
 *  PСѓСЃСЃРєРёР№     ['ru-RU']
 *  РЎСЂРїСЃРєРё      ['sr-RS']
 *  н•њкµ­м–ґ         ['ko-KR']
 *  дё­ж–‡            ['cmn-Hans-CN', 'ж™®йЂљиЇќ (дё­е›Ѕе¤§й™†)']
 *                    ['cmn-Hans-HK', 'ж™®йЂљиЇќ (й¦™жёЇ)']
 *                    ['cmn-Hant-TW', 'дё­ж–‡ (еЏ°зЃЈ)']
 *                    ['yue-Hant-HK', 'зІµиЄћ (й¦™жёЇ)']
 *  ж—Ґжњ¬иЄћ         ['ja-JP']
 *  Lingua latД«na    ['la']
 */
appConfig.voice_command_lang = 'en-US';
/*
 *  Use localstorage to remember on/off (best used with HTML Version)
 */
appConfig.voice_localStorage = false;
/*
 * Voice Commands
 * Defines all voice command variables and functions
 */
if (appConfig.voice_command) {

    appConfig.commands = {

        'show dashboard': function () {
            window.location.hash = "dashboard"
        },
        'go back': function () {
            history.back(1);
        },
        'scroll up': function () {
            $('html, body').animate({scrollTop: 0}, 100);
        },
        'scroll down': function () {
            $('html, body').animate({scrollTop: $(document).height()}, 100);
        },
        'hide navigation': function () {
            if ($(":root").hasClass("container") && !$(":root").hasClass("menu-on-top")) {
                $('span.minifyme').trigger("click");
            } else {
                $('#hide-menu > span > a').trigger("click");
            }
        },
        'show navigation': function () {
            if ($(":root").hasClass("container") && !$(":root").hasClass("menu-on-top")) {
                $('span.minifyme').trigger("click");
            } else {
                $('#hide-menu > span > a').trigger("click");
            }
        },
        'mute': function () {
            appConfig.sound_on = false;
            $.smallBox({
                title: "MUTE",
                content: "All sounds have been muted!",
                color: "#a90329",
                timeout: 4000,
                icon: "fa fa-volume-off"
            });
        },
        'sound on': function () {
            appConfig.sound_on = true;
            $.speechApp.playConfirmation();
            $.smallBox({
                title: "UNMUTE",
                content: "All sounds have been turned on!",
                color: "#40ac2b",
                sound_file: 'voice_alert',
                timeout: 5000,
                icon: "fa fa-volume-up"
            });
        },
        'stop': function () {
            smartSpeechRecognition.abort();
            $(":root").removeClass("voice-command-active");
            $.smallBox({
                title: "VOICE COMMAND OFF",
                content: "Your voice commands has been successfully turned off. Click on the <i class='fa fa-microphone fa-lg fa-fw'></i> icon to turn it back on.",
                color: "#40ac2b",
                sound_file: 'voice_off',
                timeout: 8000,
                icon: "fa fa-microphone-slash"
            });
            if ($('#speech-btn .popover').is(':visible')) {
                $('#speech-btn .popover').fadeOut(250);
            }
        },
        'help': function () {

            $('#voiceModal').removeData('modal').modal({
                remote: "app/layout/partials/voice-commands.tpl.html",
                show: true
            });
            if ($('#speech-btn .popover').is(':visible')) {
                $('#speech-btn .popover').fadeOut(250);
            }

        },
        'got it': function () {
            $('#voiceModal').modal('hide');
        },
        'logout': function () {
            $.speechApp.stop();
            window.location = $('#logout > span > a').attr("href");
        }
    };

}
;


/*
 * END APP.appConfig
 */
