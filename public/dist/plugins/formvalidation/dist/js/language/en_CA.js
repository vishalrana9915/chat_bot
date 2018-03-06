(function($) {
    FormValidation.I18n = $.extend(true, FormValidation.I18n, {
        'en_CA': {
            base64: {
                'default': '(EN-CA)Please enter a valid base 64 encoded'
            },
            between: {
                'default': '(EN-CA)Please enter a value between %s and %s',
                notInclusive: '(EN-CA)Please enter a value between %s and %s strictly'
            },
            bic: {
                'default': '(EN-CA)Please enter a valid BIC number'
            },
            callback: {
                'default': '(EN-CA)Please enter a valid value'
            },
            choice: {
                'default': '(EN-CA)Please enter a valid value',
                less: '(EN-CA)Please choose %s options at minimum',
                more: '(EN-CA)Please choose %s options at maximum',
                between: '(EN-CA)Please choose %s - %s options'
            },
            color: {
                'default': '(EN-CA)Please enter a valid color'
            },
            creditCard: {
                'default': '(EN-CA)Please enter a valid credit card number'
            },
            cusip: {
                'default': '(EN-CA)Please enter a valid CUSIP number'
            },
            cvv: {
                'default': '(EN-CA)Please enter a valid CVV number'
            },
            date: {
                'default': '(EN-CA)Please enter a valid date',
                min: '(EN-CA)Please enter a date after %s',
                max: '(EN-CA)Please enter a date before %s',
                range: '(EN-CA)Please enter a date in the range %s - %s'
            },
            different: {
                'default': '(EN-CA)Please enter a different value'
            },
            digits: {
                'default': '(EN-CA)Please enter only digits'
            },
            ean: {
                'default': '(EN-CA)Please enter a valid EAN number'
            },
            ein: {
                'default': '(EN-CA)Please enter a valid EIN number'
            },
            emailAddress: {
                'default': '(EN-CA)Please enter a valid email address'
            },
            file: {
                'default': '(EN-CA)Please choose a valid file'
            },
            greaterThan: {
                'default': '(EN-CA)Please enter a value greater than or equal to %s',
                notInclusive: '(EN-CA)Please enter a value greater than %s'
            },
            grid: {
                'default': '(EN-CA)Please enter a valid GRId number'
            },
            hex: {
                'default': '(EN-CA)Please enter a valid hexadecimal number'
            },
            iban: {
                'default': '(EN-CA)Please enter a valid IBAN number',
                country: '(EN-CA)Please enter a valid IBAN number in %s',
                countries: {
                    AD: 'Andorra',
                    AE: 'United Arab Emirates',
                    AL: 'Albania',
                    AO: 'Angola',
                    AT: 'Austria',
                    AZ: 'Azerbaijan',
                    BA: 'Bosnia and Herzegovina',
                    BE: 'Belgium',
                    BF: 'Burkina Faso',
                    BG: 'Bulgaria',
                    BH: 'Bahrain',
                    BI: 'Burundi',
                    BJ: 'Benin',
                    BR: 'Brazil',
                    CH: 'Switzerland',
                    CI: 'Ivory Coast',
                    CM: 'Cameroon',
                    CR: 'Costa Rica',
                    CV: 'Cape Verde',
                    CY: 'Cyprus',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    DO: 'Dominican Republic',
                    DZ: 'Algeria',
                    EE: 'Estonia',
                    ES: 'Spain',
                    FI: 'Finland',
                    FO: 'Faroe Islands',
                    FR: 'France',
                    GB: 'United Kingdom',
                    GE: 'Georgia',
                    GI: 'Gibraltar',
                    GL: 'Greenland',
                    GR: 'Greece',
                    GT: 'Guatemala',
                    HR: 'Croatia',
                    HU: 'Hungary',
                    IE: 'Ireland',
                    IL: 'Israel',
                    IR: 'Iran',
                    IS: 'Iceland',
                    IT: 'Italy',
                    JO: 'Jordan',
                    KW: 'Kuwait',
                    KZ: 'Kazakhstan',
                    LB: 'Lebanon',
                    LI: 'Liechtenstein',
                    LT: 'Lithuania',
                    LU: 'Luxembourg',
                    LV: 'Latvia',
                    MC: 'Monaco',
                    MD: 'Moldova',
                    ME: 'Montenegro',
                    MG: 'Madagascar',
                    MK: 'Macedonia',
                    ML: 'Mali',
                    MR: 'Mauritania',
                    MT: 'Malta',
                    MU: 'Mauritius',
                    MZ: 'Mozambique',
                    NL: 'Netherlands',
                    NO: 'Norway',
                    PK: 'Pakistan',
                    PL: 'Poland',
                    PS: 'Palestine',
                    PT: 'Portugal',
                    QA: 'Qatar',
                    RO: 'Romania',
                    RS: 'Serbia',
                    SA: 'Saudi Arabia',
                    SE: 'Sweden',
                    SI: 'Slovenia',
                    SK: 'Slovakia',
                    SM: 'San Marino',
                    SN: 'Senegal',
                    TL: 'East Timor',
                    TN: 'Tunisia',
                    TR: 'Turkey',
                    VG: 'Virgin Islands, British',
                    XK: 'Republic of Kosovo'
                }
            },
            id: {
                'default': 'Please enter a valid identification number',
                country: 'Please enter a valid identification number in %s',
                countries: {
                    BA: 'Bosnia and Herzegovina',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CH: 'Switzerland',
                    CL: 'Chile',
                    CN: 'China',
                    CZ: 'Czech Republic',
                    DK: 'Denmark',
                    EE: 'Estonia',
                    ES: 'Spain',
                    FI: 'Finland',
                    HR: 'Croatia',
                    IE: 'Ireland',
                    IS: 'Iceland',
                    LT: 'Lithuania',
                    LV: 'Latvia',
                    ME: 'Montenegro',
                    MK: 'Macedonia',
                    NL: 'Netherlands',
                    PL: 'Poland',
                    RO: 'Romania',
                    RS: 'Serbia',
                    SE: 'Sweden',
                    SI: 'Slovenia',
                    SK: 'Slovakia',
                    SM: 'San Marino',
                    TH: 'Thailand',
                    ZA: 'South Africa'
                }
            },
            identical: {
                'default': 'Please enter the same value'
            },
            imei: {
                'default': 'Please enter a valid IMEI number'
            },
            imo: {
                'default': 'Please enter a valid IMO number'
            },
            integer: {
                'default': 'Please enter a valid number'
            },
            ip: {
                'default': 'Please enter a valid IP address',
                ipv4: 'Please enter a valid IPv4 address',
                ipv6: 'Please enter a valid IPv6 address'
            },
            isbn: {
                'default': 'Please enter a valid ISBN number'
            },
            isin: {
                'default': 'Please enter a valid ISIN number'
            },
            ismn: {
                'default': 'Please enter a valid ISMN number'
            },
            issn: {
                'default': 'Please enter a valid ISSN number'
            },
            lessThan: {
                'default': 'Please enter a value less than or equal to %s',
                notInclusive: 'Please enter a value less than %s'
            },
            mac: {
                'default': 'Please enter a valid MAC address'
            },
            meid: {
                'default': 'Please enter a valid MEID number'
            },
            notEmpty: {
                'default': '(EN-CA)Please enter a value'
            },
            numeric: {
                'default': '(EN-CA)Please enter a valid float number'
            },
            phone: {
                'default': '(EN-CA)Please enter a valid phone number',
                country: 'Please enter a valid phone number in %s',
                countries: {
                    AE: 'United Arab Emirates',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CN: 'China',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    ES: 'Spain',
                    FR: 'France',
                    GB: 'United Kingdom',
                    IN: 'India',
                    MA: 'Morocco',
                    NL: 'Netherlands',
                    PK: 'Pakistan',
                    RO: 'Romania',
                    RU: 'Russia',
                    SK: 'Slovakia',
                    TH: 'Thailand',
                    US: 'USA',
                    VE: 'Venezuela'
                }
            },
            promise: {
                'default': 'Please enter a valid value'
            },
            regexp: {
                'default': '(EN-CA)Please enter a value matching the pattern'
            },
            remote: {
                'default': 'Please enter a valid value'
            },
            rtn: {
                'default': 'Please enter a valid RTN number'
            },
            sedol: {
                'default': 'Please enter a valid SEDOL number'
            },
            siren: {
                'default': 'Please enter a valid SIREN number'
            },
            siret: {
                'default': 'Please enter a valid SIRET number'
            },
            step: {
                'default': 'Please enter a valid step of %s'
            },
            stringCase: {
                'default': 'Please enter only lowercase characters',
                upper: 'Please enter only uppercase characters'
            },
            stringLength: {
                'default': 'Please enter value between %s and %s characters long',
                less: 'Please enter less than %s characters',
                more: 'Please enter more than %s characters',
                between: 'Please enter value between %s and %s characters long'
            },
            uri: {
                'default': 'Please enter a valid URI'
            },
            uuid: {
                'default': 'Please enter a valid UUID number',
                version: 'Please enter a valid UUID version %s number'
            },
            vat: {
                'default': 'Please enter a valid VAT number',
                country: 'Please enter a valid VAT number in %s',
                countries: {
                    AT: 'Austria',
                    BE: 'Belgium',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CH: 'Switzerland',
                    CY: 'Cyprus',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    EE: 'Estonia',
                    ES: 'Spain',
                    FI: 'Finland',
                    FR: 'France',
                    GB: 'United Kingdom',
                    GR: 'Greece',
                    EL: 'Greece',
                    HU: 'Hungary',
                    HR: 'Croatia',
                    IE: 'Ireland',
                    IS: 'Iceland',
                    IT: 'Italy',
                    LT: 'Lithuania',
                    LU: 'Luxembourg',
                    LV: 'Latvia',
                    MT: 'Malta',
                    NL: 'Netherlands',
                    NO: 'Norway',
                    PL: 'Poland',
                    PT: 'Portugal',
                    RO: 'Romania',
                    RU: 'Russia',
                    RS: 'Serbia',
                    SE: 'Sweden',
                    SI: 'Slovenia',
                    SK: 'Slovakia',
                    VE: 'Venezuela',
                    ZA: 'South Africa'
                }
            },
            vin: {
                'default': 'Please enter a valid VIN number'
            },
            zipCode: {
                'default': 'Please enter a valid postal code',
                country: 'Please enter a valid postal code in %s',
                countries: {
                    AT: 'Austria',
                    BG: 'Bulgaria',
                    BR: 'Brazil',
                    CA: 'Canada',
                    CH: 'Switzerland',
                    CZ: 'Czech Republic',
                    DE: 'Germany',
                    DK: 'Denmark',
                    ES: 'Spain',
                    FR: 'France',
                    GB: 'United Kingdom',
                    IE: 'Ireland',
                    IN: 'India',
                    IT: 'Italy',
                    MA: 'Morocco',
                    NL: 'Netherlands',
                    PL: 'Poland',
                    PT: 'Portugal',
                    RO: 'Romania',
                    RU: 'Russia',
                    SE: 'Sweden',
                    SG: 'Singapore',
                    SK: 'Slovakia',
                    US: 'USA'
                }
            }
        }
    });
}(jQuery));
