/**
 * Created by Pancham Bhagwat on 6/28/2015.
 * Path: public/app/layout/service/productionStatusService.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('productionStatusService', function (DefaultApiService) {

        var jobStatuses = {
            "New":                          20,
            "Hold":                         30,
            "ReadyForProduction":           50,
            "InProduction":                 100,
            "ReadyForQualityCheck":         110,
            "ProductionComplete":           140,
            "ReadyForPickup":               350,
            "ReadyForShipment":             160,
            "ShippedFromProductionCenter":  200,
            "ShippedToStore":               210,
            "PickedUp":                     360,
            "ShippedToCustomer":            370,
            "Abandoned" :                   400,
            "Cancelled" :                   410
        };
        var ignoreJobStatuses = ['WaitingFiles'];
        DefaultApiService.getAllListCall('JsTypes?type=Mis.Interfaces.Enums.Production.JobStatus')
            .success(function(data){
                productionStatusService.jobStatuses = {};
                _.forEach(data, function(status, value){
                    if(_.indexOf(ignoreJobStatuses, status) == -1) {
                        if (!isNaN(value)) {
                            productionStatusService.jobStatuses[status] = Number(value);
                        }
                    }
                });
            });

        var orderStatuses = {
            "New":                      20,
            "Hold":                     30,
            "ReadyForProduction":       40,
            "InProduction":             50,
            "ReadyForPickup":           60,
            "ReadyForShipment":         70,
            "InTransit":                80,
            "Complete":                 90,
            "Cancelled":               100
        };

        var ignoreOrderStatuses = ['Unknown'];

        DefaultApiService.getAllListCall('JsTypes?type=Mis.Interfaces.Enums.CustomOrderStatus')
            .success(function(data){
                productionStatusService.orderStatuses = {};
                _.forEach(data, function(status, value){
                    if(_.indexOf(ignoreOrderStatuses, status) == -1) {
                        if (!isNaN(value)) {
                            productionStatusService.orderStatuses[status] = Number(value);
                        }
                    }
                });
            });


        var productTypes = {
            "Flatsheet"     : 1,
            "Books"         : 2,
            "WideFormat"    : 3,
            "Copies"        : 4,
            "Scans"         : 5,
            "Pads"          : 6,
            "FinishingOnly" : 7,
            "NCR"           : 8
        };

        var productTypeNames = {
            1   :'FlatSheet',
            2   :'Books',
            3   :'WideFormat',
            4   :'Copies',
            5   :'Scans',
            6   :'Pads',
            7   :'FinishingOnly',
            8   :'NCR'
        };

        var operationTypes = {
            "Copier" : 1,           //Press
            "Cutting" : 2,          //F.O.
            "GeneralMachine" : 3,
            "NoMachine" : 4,        //F.O.
            "LithoPress" : 5,       //Press
            "DigitalPress" : 6,     //Press
            "Plate" : 7, //
            "Stock" : 8,            //Stock
            "SaddleStitcher" : 9,   //F.O.
            "Ink" : 10, //
            "Artwork" : 11, //
            "Laminating" : 12,      //F.O.
            "Binding" : 13,         //F.O.
            "WideFormat" : 14       //Press
            };

        var mediaColors = {
            "NoColor"   :0,
            "Black"     :1,
            "Blue"      :2,
            "Brown"     :3,
            "Buff"      :4,
            "Cyan"      :5,
            "Gold"      :6,
            "Goldenrod" :7,
            "Gray"      :8,
            "Green"     :9,
            "Ivory"     :10,
            "Magenta"   :11,
            "MultiColor":12,
            "Mustard"   :13,
            "Orange"    :14,
            "Pink"      :15,
            "Red"       :16,
            "Silver"    :17,
            "Turquoise" :18,
            "Violet"    :19,
            "White"     :20,
            "Yellow"    :21
        };

        var reasonsList = {
            "Reprint"           :10,
            "Cancellation"      :20,
            "OnHold"            :30,
            "RerouteDeclined"   :40,
            "JobAbandoned"      :50
        };

        var pressTypes = {
            "DigitalPress"      :1,
            "OffsetPress"       :2,
            "WebPress"          :3,
            "Copier"            :4,
            "LargeFormatPress"  :5,
            "FlexoPress"        :6
        };
        var pressSpeedMethods = {
            "Linear"    :1,
            "Step"      :2
        };

        var jdfStockGrades = {
            "GlossCoatedPaper"      :1,
            "MattCoatedPaper"       :2,
            "GlossCoatedWebPaper"   :3,
            "UncoatedWhitePaper"    :4,
            "UncoatedYellowishPaper":5
        };

        var stockTypes = {
            "Bible"     :1,
            "Book"      :2,
            "Bond"      :3,
            "Bristol"   :4,
            "Coated"    :5,
            "Cover"     :6,
            "Index"     :7,
            "Ledger"    :8,
             "Manifold" :10,
             "Newsprint":11,
             "Offset"   :12,
             "Tag"      :13,
             "Text"     :14
        };

        var imagableSides = {
            "Both"      :0,
            "Front"     :1,
            "Back"      :2,
            "Neither"   :3
        };

        var mediaTypeDetails = {
            "Aluminum"          :1,
            "Cardboard"         :2,
            "Cde"               :3,
            "ContinuousLong"    :4,
            "ContinuousShort"   :5,
            "DoubleWall"        :6,
            "Dvd"               :7,
            "DryFilm"           :8,
            "Envelope"          :9,
            "EnvelopePlain"     :10,
            "EnvelopeWindow"    :11,
            "FlexoBase"         :12,
            "FlexoPhotoPolymer" :13,
            "Flute"             :14,
            "FullCutTabs"       :15,
            "ImageSetterPaper"  :16,
            "Labels"            :17,
            "Letterhead"        :18,
            "MultiLayer"        :19,
            "MultiPartForm"     :20,
            "Photographic"      :21,
            "Polyester"         :22,
            "PreCutTabs"        :23,
            "SingleFace"        :24,
            "SingleWall"        :25,
            "Stationery"        :26,
            "TabStock"          :27,
            "Tractor"           :28,
            "TripleWall"        :29,
            "WetFilm"           :30
        };

        var mediaIntentCoatings = {
            "None":0,
            "Coated":1,
            "Glossy":2,
            "HighGloss":3,
            "InkJet":4,
            "Matte":5,
            "Satin":8,
            "Semigloss":9
        };

        var holeTypes = {
            "R2_generic":  21,
            "R2m_DIN":     22,
            "R2m_ISO":     23,
            "R2m_MIB":     24,
            "R2i_US_a":    25,
            "R2i_US_b":    26,
            "R3_generic":  30,
            "R3i_US":      31,
            "R4_generic":  41,
            "R4m_DIN_A4":  42,
            "R4m_DIN_A5":  43,
            "R4m_swedish": 44,
            "R4i_US":      45,
            "R5_generic":  51,
            "R5i_US_a":    52,
            "R5i_US_b":    53,
            "R5i_US_c":    54,
            "R6_generic":  61,
            "R6m_4h2s":    62,
            "R6m_DIN_A5":  63,
            "R7_generic":  71,
            "R7i_US_a":    72,
            "R7i_US_b":    73,
            "R7i_US_c":    74,
            "R11m_7h4s":   75,
            "P16_9i_rect_0t":  80,
            "P12m_rect_0t":    81,
            "W2_1i_round_0t":  82,
            "W2_1i_square_0t": 83,
            "W3_1i_square_0t": 84,
            "C9_5m_round_0t":  85,
            "S_generic":       99,
            "S1_generic":     100
        };

        var stockFlutes = {
            "A" : 1,
            "B" : 2,
            "C" : 3
        };

        var stockOpacities = {
            "Opaque": 1,
            "Translucent": 2,
            "Transparent": 3
        };

        var optimalPrintTechnologies = {//?????
            1: "Opaque",
            2: "Translucent",
            3: "Transparent"
        };

        var stockFluteDirections = {
            "LongEdge": 1,
            "ShortEdge": 2,
            "XDirection": 3,
            "YDirection": 4
        };

        var userMediaTypes = {
            "Continuous": 1,
            "ContinuousLong": 2,
            "ContinuousShort": 3,
            "Envelope": 4,
            "EnvelopePlain": 5,
            "EnvelopeWindow": 6,
            "FullCutTabs": 7,
            "Labels": 8,
            "Letterhead": 9,
             "MultiLayer": 10,
             "MultiPartForm": 11,
             "Photographic": 12,
             "PreCutTabs": 13,
             "Stationery": 14,
             "TabStock": 15,
             "Transparency": 16
        };

        var stockTextures = {
            "Antique"       : 1,
            "Calendared": 2,
            "Linen": 3,
            "Smooth": 4,
            "Stipple": 5,
            "Uncalendared": 6,
            "Vellum": 7
        };

        var productionStatusService = {
            jobStatuses         : jobStatuses,
            orderStatuses       : orderStatuses,
            reasonListStatus    : reasonsList,
            productType         : productTypes,
            productTypesName    : productTypeNames,
            operationType       : operationTypes,
            namedMediaColor     : mediaColors,
            pressType           : pressTypes,
            pressSpeedMethod    : pressSpeedMethods,
            jdfStockGrade       : jdfStockGrades,
            stockType           : stockTypes,
            imagableSide        : imagableSides,
            mediaTypeDetail     : mediaTypeDetails,
            mediaIntentCoating  : mediaIntentCoatings,
            holeType            : holeTypes,
            stockFlute          : stockFlutes,
            stockOpacity        : stockOpacities,
            stockFluteDirection : stockFluteDirections,
            userMediaType       : userMediaTypes,
            stockTexture        : stockTextures
        };




        return productionStatusService;

    });
});



