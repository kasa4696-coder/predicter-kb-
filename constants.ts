import { League } from './types';

export const LEAGUES: League[] = [
  { id: 'epl', name: 'Premier League', country: 'England' },
  { id: 'laliga', name: 'La Liga', country: 'Spain' },
  { id: 'laliga2', name: 'La Liga 2', country: 'Spain' },
  { id: 'seriea', name: 'Serie A', country: 'Italy' },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany' },
  { id: 'ligue1', name: 'Ligue 1', country: 'France' },
  { id: 'austria_bundesliga', name: 'Bundesliga', country: 'Austria' },
  { id: 'belgium_pro', name: 'Pro League', country: 'Belgium' },
  { id: 'czech_liga', name: 'First League', country: 'Czech Republic' },
  { id: 'denmark_super', name: 'Superliga', country: 'Denmark' },
  { id: 'german_2', name: '2. Bundesliga', country: 'Germany' },
  { id: 'hungary_nb1', name: 'NB I', country: 'Hungary' },
  { id: 'poland_ekstra', name: 'Ekstraklasa', country: 'Poland' },
  { id: 'romania_liga1', name: 'Liga I', country: 'Romania' },
  { id: 'russian_premier', name: 'Premier League', country: 'Russia' },
  { id: 'russian_fnl', name: 'First League (FNL)', country: 'Russia' },
  { id: 'slovakia_super', name: 'Super Liga', country: 'Slovakia' },
  { id: 'norway_eliteserien', name: 'Eliteserien', country: 'Norway' },
  { id: 'sweden_allsvenskan', name: 'Allsvenskan', country: 'Sweden' },
  { id: 'swiss_super', name: 'Super League', country: 'Switzerland' },
  { id: 'turkey_super', name: 'Süper Lig', country: 'Turkey' },
  { id: 'serbia_super', name: 'SuperLiga', country: 'Serbia' },
  { id: 'eredivisie', name: 'Eredivisie', country: 'Netherlands' },
  { id: 'greece_super', name: 'Super League', country: 'Greece' },
];

export const MOCK_TEAMS: Record<string, string[]> = {
  epl: [
    "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Chelsea",
    "Crystal Palace", "Everton", "Fulham", "Ipswich Town", "Leicester City", "Liverpool",
    "Manchester City", "Manchester United", "Newcastle United", "Nottingham Forest",
    "Southampton", "Tottenham Hotspur", "West Ham United", "Wolverhampton Wanderers"
  ],
  laliga: [
    "Alavés", "Athletic Club", "Atlético Madrid", "Barcelona", "Celta Vigo", "Espanyol",
    "Getafe", "Girona", "Las Palmas", "Leganés", "Mallorca", "Osasuna", "Rayo Vallecano",
    "Real Betis", "Real Madrid", "Real Sociedad", "Real Valladolid", "Sevilla",
    "Valencia", "Villarreal"
  ],
  laliga2: [
    "Albacete", "Almería", "Burgos", "Cádiz", "Cartagena", "Castellón", "Córdoba",
    "Deportivo La Coruña", "Eibar", "Elche", "Eldense", "Granada", "Huesca",
    "Levante", "Málaga", "Mirandés", "Racing Ferrol", "Racing Santander",
    "Real Oviedo", "Sporting Gijón", "Tenerife", "Zaragoza"
  ],
  seriea: [
    "AC Milan", "Atalanta", "Bologna", "Cagliari", "Como", "Empoli", "Fiorentina",
    "Genoa", "Hellas Verona", "Inter Milan", "Juventus", "Lazio", "Lecce", "Monza",
    "Napoli", "Parma", "Roma", "Torino", "Udinese", "Venezia"
  ],
  bundesliga: [
    "Augsburg", "Bayer Leverkusen", "Bayern Munich", "Bochum", "Borussia Dortmund",
    "Borussia M'gladbach", "Eintracht Frankfurt", "Freiburg", "Heidenheim",
    "Hoffenheim", "Holstein Kiel", "Mainz 05", "RB Leipzig", "St. Pauli", "Stuttgart",
    "Union Berlin", "Werder Bremen", "Wolfsburg"
  ],
  ligue1: [
    "Angers", "Auxerre", "Brest", "Le Havre", "Lens", "Lille", "Lyon", "Marseille",
    "Monaco", "Montpellier", "Nantes", "Nice", "Paris Saint-Germain", "Reims",
    "Rennes", "Saint-Étienne", "Strasbourg", "Toulouse"
  ],
  austria_bundesliga: [
    "Altach", "Austria Klagenfurt", "Austria Vienna", "Blau-Weiss Linz", "Grazer AK",
    "Hartberg", "LASK", "Rapid Vienna", "Red Bull Salzburg", "Sturm Graz",
    "WSG Tirol", "Wolfsberger AC"
  ],
  belgium_pro: [
    "Anderlecht", "Antwerp", "Beerschot", "Cercle Brugge", "Charleroi", "Club Brugge",
    "Dender", "Genk", "Gent", "Kortrijk", "Mechelen", "OH Leuven", "Sint-Truiden",
    "Standard Liège", "Union SG", "Westerlo"
  ],
  czech_liga: [
    "Baník Ostrava", "Bohemians 1905", "České Budějovice", "Dukla Prague",
    "Hradec Králové", "Jablonec", "Karviná", "Mladá Boleslav", "Pardubice",
    "Slovan Liberec", "Sigma Olomouc", "Slavia Prague", "Slovácko", "Sparta Prague",
    "Teplice", "Viktoria Plzeň"
  ],
  denmark_super: [
    "AaB", "AGF", "Brøndby", "Copenhagen", "Lyngby", "Midtjylland", "Nordsjælland",
    "Randers", "Silkeborg", "Sønderjyske", "Vejle", "Viborg"
  ],
  german_2: [
    "Darmstadt 98", "Eintracht Braunschweig", "Elversberg", "Fortuna Düsseldorf",
    "Greuther Fürth", "Hamburg", "Hannover 96", "Hertha Berlin", "Jahn Regensburg",
    "Kaiserslautern", "Karlsruher SC", "Köln", "Magdeburg", "Nürnberg", "Paderborn",
    "Preußen Münster", "Schalke 04", "SSV Ulm"
  ],
  hungary_nb1: [
    "Debrecen", "Diósgyőr", "Fehérvár", "Ferencváros", "Győr", "Kecskemét",
    "MTK Budapest", "Nyíregyháza", "Paks", "Puskás Akadémia", "Újpest", "Zalaegerszeg"
  ],
  poland_ekstra: [
    "Cracovia", "GKS Katowice", "Górnik Zabrze", "Jagiellonia Białystok",
    "Korona Kielce", "Lech Poznań", "Lechia Gdańsk", "Legia Warsaw", "Motor Lublin",
    "Piast Gliwice", "Pogoń Szczecin", "Puszcza Niepołomice", "Radomiak Radom",
    "Raków Częstochowa", "Śląsk Wrocław", "Stal Mielec", "Widzew Łódź", "Zagłębie Lubin"
  ],
  romania_liga1: [
    "Botoșani", "CFR Cluj", "Dinamo București", "Farul Constanța", "FCSB",
    "Gloria Buzău", "Hermannstadt", "Oțelul Galați", "Petrolul Ploiești",
    "Politehnica Iași", "Rapid București", "Sepsi OSK", "Unirea Slobozia",
    "Universitatea Cluj", "Universitatea Craiova", "UTA Arad"
  ],
  russian_premier: [
    "Akhmat Grozny", "Akron Tolyatti", "CSKA Moscow", "Dynamo Makhachkala",
    "Dynamo Moscow", "Fakel Voronezh", "Khimki", "Krasnodar", "Krylia Sovetov",
    "Lokomotiv Moscow", "Orenburg", "Pari Nizhny Novgorod", "Rostov",
    "Rubin Kazan", "Spartak Moscow", "Zenit St. Petersburg"
  ],
  russian_fnl: [
    "Alania Vladikavkaz", "Arsenal Tula", "Baltika", "Chaika", "Chernomorets", 
    "KAMAZ", "Neftekhimik", "Rodina Moscow", "Rotor Volgograd", "Shinnik", 
    "SKA-Khabarovsk", "Sochi", "Sokol Saratov", "Torpedo Moscow", "Tyumen", 
    "Ufa", "Ural", "Yenisey"
  ],
  slovakia_super: [
    "DAC Dunajská Streda", "Dukla Banská Bystrica", "Komárno", "Košice",
    "Michalovce", "Podbrezová", "Ružomberok", "Skalica", "Slovan Bratislava",
    "Spartak Trnava", "Trenčín", "Žilina"
  ],
  norway_eliteserien: [
    "Bodø/Glimt", "Brann", "Fredrikstad", "HamKam", "Haugesund", "KFUM Oslo",
    "Kristiansund", "Lillestrøm", "Molde", "Odd", "Rosenborg", "Sandefjord",
    "Sarpsborg 08", "Strømsgodset", "Tromsø", "Viking"
  ],
  sweden_allsvenskan: [
    "AIK", "Brommapojkarna", "Djurgården", "Elfsborg", "GAIS", "Häcken", "Halmstad",
    "Hammarby", "IFK Göteborg", "IFK Norrköping", "IFK Värnamo", "Kalmar FF",
    "Malmö FF", "Mjällby", "Sirius", "Västerås SK"
  ],
  swiss_super: [
    "Basel", "Grasshopper", "Lausanne-Sport", "Lugano", "Luzern", "Servette", "Sion",
    "St. Gallen", "Winterthur", "Young Boys", "Yverdon", "Zürich"
  ],
  turkey_super: [
    "Adana Demirspor", "Alanyaspor", "Antalyaspor", "Başakşehir", "Beşiktaş", "Bodrum",
    "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep", "Göztepe", "Hatayspor",
    "Kasımpaşa", "Kayserispor", "Konyaspor", "Rizespor", "Samsunspor", "Sivasspor",
    "Trabzonspor"
  ],
  serbia_super: [
    "Čukarički", "IMT", "Jedinstvo Ub", "Mladost Lučani", "Napredak Kruševac",
    "Novi Pazar", "OFK Beograd", "Partizan", "Radnički 1923", "Radnički Niš",
    "Red Star Belgrade", "Spartak Subotica", "Tekstilac Odžaci", "TSC", "Vojvodina",
    "Železničar Pančevo"
  ],
  eredivisie: [
    "Ajax", "Almere City", "AZ", "Feyenoord", "Fortuna Sittard", "Go Ahead Eagles",
    "Groningen", "Heerenveen", "Heracles Almelo", "NAC Breda", "NEC", "PEC Zwolle",
    "PSV", "RKC Waalwijk", "Sparta Rotterdam", "Twente", "Utrecht", "Willem II"
  ],
  greece_super: [
    "AEK Athens", "Aris", "Asteras Tripolis", "Athens Kallithea", "Atromitos",
    "Lamia", "Levadiakos", "OFI", "Olympiacos", "Panathinaikos", "Panetolikos",
    "Panserraikos", "PAOK", "Volos"
  ]
};

export const DEFAULT_TEAMS = ['Home Team', 'Away Team'];