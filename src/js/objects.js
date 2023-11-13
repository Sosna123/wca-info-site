const countries = [{"iso2Code":"AD","name":"Andorra"},{"iso2Code":"AE","name":"United Arab Emirates"},{"iso2Code":"AF","name":"Afghanistan"},{"iso2Code":"AG","name":"Antigua and Barbuda"},{"iso2Code":"AL","name":"Albania"},{"iso2Code":"AM","name":"Armenia"},{"iso2Code":"AO","name":"Angola"},{"iso2Code":"AR","name":"Argentina"},{"iso2Code":"AT","name":"Austria"},{"iso2Code":"AU","name":"Australia"},{"iso2Code":"AZ","name":"Azerbaijan"},{"iso2Code":"BA","name":"Bosnia and Herzegovina"},{"iso2Code":"BB","name":"Barbados"},{"iso2Code":"BD","name":"Bangladesh"},{"iso2Code":"BE","name":"Belgium"},{"iso2Code":"BF","name":"Burkina Faso"},{"iso2Code":"BG","name":"Bulgaria"},{"iso2Code":"BH","name":"Bahrain"},{"iso2Code":"BI","name":"Burundi"},{"iso2Code":"BJ","name":"Benin"},{"iso2Code":"BN","name":"Brunei"},{"iso2Code":"BO","name":"Bolivia"},{"iso2Code":"BR","name":"Brazil"},{"iso2Code":"BS","name":"Bahamas"},{"iso2Code":"BT","name":"Bhutan"},{"iso2Code":"BW","name":"Botswana"},{"iso2Code":"BY","name":"Belarus"},{"iso2Code":"BZ","name":"Belize"},{"iso2Code":"CA","name":"Canada"},{"iso2Code":"CD","name":"Democratic Republic of the Congo"},{"iso2Code":"CF","name":"Central African Republic"},{"iso2Code":"CG","name":"Congo"},{"iso2Code":"CH","name":"Switzerland"},{"iso2Code":"CI","name":"C\u00f4te d'Ivoire"},{"iso2Code":"CL","name":"Chile"},{"iso2Code":"CM","name":"Cameroon"},{"iso2Code":"CN","name":"China"},{"iso2Code":"CO","name":"Colombia"},{"iso2Code":"CR","name":"Costa Rica"},{"iso2Code":"CU","name":"Cuba"},{"iso2Code":"CV","name":"Cabo Verde"},{"iso2Code":"CY","name":"Cyprus"},{"iso2Code":"CZ","name":"Czech Republic"},{"iso2Code":"DE","name":"Germany"},{"iso2Code":"DJ","name":"Djibouti"},{"iso2Code":"DK","name":"Denmark"},{"iso2Code":"DM","name":"Dominica"},{"iso2Code":"DO","name":"Dominican Republic"},{"iso2Code":"DZ","name":"Algeria"},{"iso2Code":"EC","name":"Ecuador"},{"iso2Code":"EE","name":"Estonia"},{"iso2Code":"EG","name":"Egypt"},{"iso2Code":"ER","name":"Eritrea"},{"iso2Code":"ES","name":"Spain"},{"iso2Code":"ET","name":"Ethiopia"},{"iso2Code":"FI","name":"Finland"},{"iso2Code":"FJ","name":"Fiji"},{"iso2Code":"FM","name":"Federated States of Micronesia"},{"iso2Code":"FR","name":"France"},{"iso2Code":"GA","name":"Gabon"},{"iso2Code":"GB","name":"United Kingdom"},{"iso2Code":"GD","name":"Grenada"},{"iso2Code":"GE","name":"Georgia"},{"iso2Code":"GH","name":"Ghana"},{"iso2Code":"GM","name":"Gambia"},{"iso2Code":"GN","name":"Guinea"},{"iso2Code":"GQ","name":"Equatorial Guinea"},{"iso2Code":"GR","name":"Greece"},{"iso2Code":"GT","name":"Guatemala"},{"iso2Code":"GW","name":"Guinea Bissau"},{"iso2Code":"GY","name":"Guyana"},{"iso2Code":"HK","name":"Hong Kong, China"},{"iso2Code":"HN","name":"Honduras"},{"iso2Code":"HR","name":"Croatia"},{"iso2Code":"HT","name":"Haiti"},{"iso2Code":"HU","name":"Hungary"},{"iso2Code":"ID","name":"Indonesia"},{"iso2Code":"IE","name":"Ireland"},{"iso2Code":"IL","name":"Israel"},{"iso2Code":"IN","name":"India"},{"iso2Code":"IQ","name":"Iraq"},{"iso2Code":"IR","name":"Iran"},{"iso2Code":"IS","name":"Iceland"},{"iso2Code":"IT","name":"Italy"},{"iso2Code":"JM","name":"Jamaica"},{"iso2Code":"JO","name":"Jordan"},{"iso2Code":"JP","name":"Japan"},{"iso2Code":"KE","name":"Kenya"},{"iso2Code":"KG","name":"Kyrgyzstan"},{"iso2Code":"KH","name":"Cambodia"},{"iso2Code":"KI","name":"Kiribati"},{"iso2Code":"KM","name":"Comoros"},{"iso2Code":"KN","name":"Saint Kitts and Nevis"},{"iso2Code":"KP","name":"Democratic People's Republic of Korea"},{"iso2Code":"KR","name":"Republic of Korea"},{"iso2Code":"KW","name":"Kuwait"},{"iso2Code":"KZ","name":"Kazakhstan"},{"iso2Code":"LA","name":"Laos"},{"iso2Code":"LB","name":"Lebanon"},{"iso2Code":"LC","name":"Saint Lucia"},{"iso2Code":"LI","name":"Liechtenstein"},{"iso2Code":"LK","name":"Sri Lanka"},{"iso2Code":"LR","name":"Liberia"},{"iso2Code":"LS","name":"Lesotho"},{"iso2Code":"LT","name":"Lithuania"},{"iso2Code":"LU","name":"Luxembourg"},{"iso2Code":"LV","name":"Latvia"},{"iso2Code":"LY","name":"Libya"},{"iso2Code":"MA","name":"Morocco"},{"iso2Code":"MC","name":"Monaco"},{"iso2Code":"MD","name":"Moldova"},{"iso2Code":"ME","name":"Montenegro"},{"iso2Code":"MG","name":"Madagascar"},{"iso2Code":"MH","name":"Marshall Islands"},{"iso2Code":"MK","name":"North Macedonia"},{"iso2Code":"ML","name":"Mali"},{"iso2Code":"MM","name":"Myanmar"},{"iso2Code":"MN","name":"Mongolia"},{"iso2Code":"MO","name":"Macau, China"},{"iso2Code":"MR","name":"Mauritania"},{"iso2Code":"MT","name":"Malta"},{"iso2Code":"MU","name":"Mauritius"},{"iso2Code":"MV","name":"Maldives"},{"iso2Code":"MW","name":"Malawi"},{"iso2Code":"MX","name":"Mexico"},{"iso2Code":"MY","name":"Malaysia"},{"iso2Code":"MZ","name":"Mozambique"},{"iso2Code":"NA","name":"Namibia"},{"iso2Code":"NE","name":"Niger"},{"iso2Code":"NG","name":"Nigeria"},{"iso2Code":"NI","name":"Nicaragua"},{"iso2Code":"NL","name":"Netherlands"},{"iso2Code":"NO","name":"Norway"},{"iso2Code":"NP","name":"Nepal"},{"iso2Code":"NR","name":"Nauru"},{"iso2Code":"NZ","name":"New Zealand"},{"iso2Code":"OM","name":"Oman"},{"iso2Code":"PA","name":"Panama"},{"iso2Code":"PE","name":"Peru"},{"iso2Code":"PG","name":"Papua New Guinea"},{"iso2Code":"PH","name":"Philippines"},{"iso2Code":"PK","name":"Pakistan"},{"iso2Code":"PL","name":"Poland"},{"iso2Code":"PS","name":"Palestine"},{"iso2Code":"PT","name":"Portugal"},{"iso2Code":"PW","name":"Palau"},{"iso2Code":"PY","name":"Paraguay"},{"iso2Code":"QA","name":"Qatar"},{"iso2Code":"RO","name":"Romania"},{"iso2Code":"RS","name":"Serbia"},{"iso2Code":"RU","name":"Russia"},{"iso2Code":"RW","name":"Rwanda"},{"iso2Code":"SA","name":"Saudi Arabia"},{"iso2Code":"SB","name":"Solomon Islands"},{"iso2Code":"SC","name":"Seychelles"},{"iso2Code":"SD","name":"Sudan"},{"iso2Code":"SE","name":"Sweden"},{"iso2Code":"SG","name":"Singapore"},{"iso2Code":"SI","name":"Slovenia"},{"iso2Code":"SK","name":"Slovakia"},{"iso2Code":"SL","name":"Sierra Leone"},{"iso2Code":"SM","name":"San Marino"},{"iso2Code":"SN","name":"Senegal"},{"iso2Code":"SO","name":"Somalia"},{"iso2Code":"SR","name":"Suriname"},{"iso2Code":"SS","name":"South Sudan"},{"iso2Code":"ST","name":"S\u00e3o Tom\u00e9 and Pr\u00edncipe"},{"iso2Code":"SV","name":"El Salvador"},{"iso2Code":"SY","name":"Syria"},{"iso2Code":"SZ","name":"Eswatini"},{"iso2Code":"TD","name":"Chad"},{"iso2Code":"TG","name":"Togo"},{"iso2Code":"TH","name":"Thailand"},{"iso2Code":"TJ","name":"Tajikistan"},{"iso2Code":"TL","name":"Timor-Leste"},{"iso2Code":"TM","name":"Turkmenistan"},{"iso2Code":"TN","name":"Tunisia"},{"iso2Code":"TO","name":"Tonga"},{"iso2Code":"TR","name":"Turkey"},{"iso2Code":"TT","name":"Trinidad and Tobago"},{"iso2Code":"TV","name":"Tuvalu"},{"iso2Code":"TW","name":"Chinese Taipei"},{"iso2Code":"TZ","name":"Tanzania"},{"iso2Code":"UA","name":"Ukraine"},{"iso2Code":"UG","name":"Uganda"},{"iso2Code":"US","name":"United States"},{"iso2Code":"UY","name":"Uruguay"},{"iso2Code":"UZ","name":"Uzbekistan"},{"iso2Code":"VA","name":"Vatican City"},{"iso2Code":"VC","name":"Saint Vincent and the Grenadines"},{"iso2Code":"VE","name":"Venezuela"},{"iso2Code":"VN","name":"Vietnam"},{"iso2Code":"VU","name":"Vanuatu"},{"iso2Code":"WS","name":"Samoa"},{"iso2Code":"XA","name":"Multiple Countries (Asia)"},{"iso2Code":"XE","name":"Multiple Countries (Europe)"},{"iso2Code":"XF","name":"Multiple Countries (Africa)"},{"iso2Code":"XK","name":"Kosovo"},{"iso2Code":"XM","name":"Multiple Countries (Americas)"},{"iso2Code":"XN","name":"Multiple Countries (North America)"},{"iso2Code":"XO","name":"Multiple Countries (Oceania)"},{"iso2Code":"XS","name":"Multiple Countries (South America)"},{"iso2Code":"XW","name":"Multiple Countries (World)"},{"iso2Code":"YE","name":"Yemen"},{"iso2Code":"ZA","name":"South Africa"},{"iso2Code":"ZM","name":"Zambia"},{"iso2Code":"ZW","name":"Zimbabwe"}]
// "iso2Code": 'AD', "name": 'Andorra' 

const eventsObj = {
    "222": "2x2",
    "333": "3x3",
    "333bf": "3x3 blindfolded",
    "333fm": "Fewest moves challenge",
    "333mbf": "Multi-blind (new)",
    "333mbo": "Multi-blind (old)",
    "333oh": "3x3 one handed",
    "333ft": "3x3 with feet",
    "444": "4x4",
    "444bf": "4x4 blindfolded",
    "555": "5x5",
    "555bf": "5x5 blindfolded",
    "666": "6x6",
    "777": "7x7",
    "clock": "Clock",
    "magic": "Rubik's magic",
    "mmagic": "Master magic",
    "minx": "Megaminx",
    "pyram": "Pyraminx",
    "skewb": "Skweb",
    "sq1": "Square-1"
}
// "sq1": 'Square-1' 

module.exports = { countries, eventsObj };