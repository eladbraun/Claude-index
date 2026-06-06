import React, { useState, useMemo } from 'react';

const STOCKS = [
  { rank: 1,   symbol: 'NVDA',  name: 'NVIDIA',                weight: 7.23, price: 187.05 },
  { rank: 2,   symbol: 'AAPL',  name: 'Apple',                 weight: 6.03, price: 258.21 },
  { rank: 3,   symbol: 'MSFT',  name: 'Microsoft',             weight: 5.40, price: 456.66 },
  { rank: 4,   symbol: 'AMZN',  name: 'Amazon',                weight: 4.05, price: 238.18 },
  { rank: 5,   symbol: 'GOOGL', name: 'Alphabet A',            weight: 3.31, price: 332.78 },
  { rank: 6,   symbol: 'GOOG',  name: 'Alphabet C',            weight: 3.08, price: 333.16 },
  { rank: 7,   symbol: 'AVGO',  name: 'Broadcom',              weight: 2.59, price: 343.02 },
  { rank: 8,   symbol: 'META',  name: 'Meta',                  weight: 2.49, price: 620.80 },
  { rank: 9,   symbol: 'TSLA',  name: 'Tesla',                 weight: 2.32, price: 438.57 },
  { rank: 10,  symbol: 'BRK.B', name: 'Berkshire Hathaway',    weight: 1.69, price: 492.62 },
  { rank: 11,  symbol: 'WMT',   name: 'Walmart',               weight: 1.51, price: 119.20 },
  { rank: 12,  symbol: 'LLY',   name: 'Eli Lilly',             weight: 1.47, price: 1032.97 },
  { rank: 13,  symbol: 'JPM',   name: 'JPMorgan Chase',        weight: 1.33, price: 309.26 },
  { rank: 14,  symbol: 'V',     name: 'Visa',                  weight: 1.00, price: 327.75 },
  { rank: 15,  symbol: 'ORCL',  name: 'Oracle',                weight: 0.87, price: 189.85 },
  { rank: 16,  symbol: 'XOM',   name: 'ExxonMobil',            weight: 0.87, price: 129.13 },
  { rank: 17,  symbol: 'JNJ',   name: 'J&J',                   weight: 0.84, price: 219.57 },
  { rank: 18,  symbol: 'MA',    name: 'Mastercard',            weight: 0.77, price: 542.65 },
  { rank: 19,  symbol: 'COST',  name: 'Costco',                weight: 0.68, price: 956.75 },
  { rank: 20,  symbol: 'PLTR',  name: 'Palantir',              weight: 0.67, price: 177.07 },
  { rank: 21,  symbol: 'BAC',   name: 'Bank of America',       weight: 0.63, price: 52.59 },
  { rank: 22,  symbol: 'ABBV',  name: 'AbbVie',                weight: 0.61, price: 216.75 },
  { rank: 23,  symbol: 'MU',    name: 'Micron',                weight: 0.60, price: 336.63 },
  { rank: 24,  symbol: 'HD',    name: 'Home Depot',            weight: 0.60, price: 379.16 },
  { rank: 25,  symbol: 'NFLX',  name: 'Netflix',               weight: 0.59, price: 88.05 },
  { rank: 26,  symbol: 'AMD',   name: 'AMD',                   weight: 0.59, price: 227.92 },
  { rank: 27,  symbol: 'PG',    name: 'P&G',                   weight: 0.54, price: 144.63 },
  { rank: 28,  symbol: 'GE',    name: 'GE Aerospace',          weight: 0.54, price: 319.94 },
  { rank: 29,  symbol: 'CVX',   name: 'Chevron',               weight: 0.53, price: 166.16 },
  { rank: 30,  symbol: 'UNH',   name: 'UnitedHealth',          weight: 0.49, price: 338.96 },
  { rank: 31,  symbol: 'MS',    name: 'Morgan Stanley',        weight: 0.48, price: 191.23 },
  { rank: 32,  symbol: 'KO',    name: 'Coca-Cola',             weight: 0.48, price: 70.48 },
  { rank: 33,  symbol: 'CAT',   name: 'Caterpillar',           weight: 0.48, price: 647.18 },
  { rank: 34,  symbol: 'CSCO',  name: 'Cisco',                 weight: 0.47, price: 75.25 },
  { rank: 35,  symbol: 'GS',    name: 'Goldman Sachs',         weight: 0.47, price: 975.86 },
  { rank: 36,  symbol: 'WFC',   name: 'Wells Fargo',           weight: 0.44, price: 88.96 },
  { rank: 37,  symbol: 'IBM',   name: 'IBM',                   weight: 0.44, price: 297.95 },
  { rank: 38,  symbol: 'MRK',   name: 'Merck',                 weight: 0.44, price: 110.97 },
  { rank: 39,  symbol: 'LRCX',  name: 'Lam Research',          weight: 0.43, price: 217.47 },
  { rank: 40,  symbol: 'PM',    name: 'Philip Morris',         weight: 0.43, price: 172.56 },
  { rank: 41,  symbol: 'RTX',   name: 'RTX Corp',              weight: 0.43, price: 199.83 },
  { rank: 42,  symbol: 'AMAT',  name: 'Applied Materials',     weight: 0.40, price: 319.08 },
  { rank: 43,  symbol: 'AXP',   name: 'American Express',      weight: 0.39, price: 357.37 },
  { rank: 44,  symbol: 'TMO',   name: 'Thermo Fisher',         weight: 0.37, price: 624.65 },
  { rank: 45,  symbol: 'INTC',  name: 'Intel',                 weight: 0.37, price: 48.32 },
  { rank: 46,  symbol: 'MCD',   name: "McDonald's",            weight: 0.35, price: 308.62 },
  { rank: 47,  symbol: 'CRM',   name: 'Salesforce',            weight: 0.35, price: 233.53 },
  { rank: 48,  symbol: 'ABT',   name: 'Abbott Labs',           weight: 0.34, price: 123.53 },
  { rank: 49,  symbol: 'TMUS',  name: 'T-Mobile',              weight: 0.34, price: 190.66 },
  { rank: 50,  symbol: 'C',     name: 'Citigroup',             weight: 0.33, price: 117.46 },
  { rank: 51,  symbol: 'LIN',   name: 'Linde',                 weight: 0.33, price: 440.04 },
  { rank: 52,  symbol: 'APP',   name: 'Applovin',              weight: 0.33, price: 606.99 },
  { rank: 53,  symbol: 'KLAC',  name: 'KLA Corp',              weight: 0.32, price: 1544.96 },
  { rank: 54,  symbol: 'DIS',   name: 'Disney',                weight: 0.32, price: 113.41 },
  { rank: 55,  symbol: 'PEP',   name: 'PepsiCo',               weight: 0.32, price: 146.57 },
  { rank: 56,  symbol: 'BA',    name: 'Boeing',                weight: 0.31, price: 247.74 },
  { rank: 57,  symbol: 'ISRG',  name: 'Intuitive Surgical',    weight: 0.31, price: 541.34 },
  { rank: 58,  symbol: 'APH',   name: 'Amphenol',              weight: 0.30, price: 154.22 },
  { rank: 59,  symbol: 'SCHW',  name: 'Charles Schwab',        weight: 0.29, price: 102.76 },
  { rank: 60,  symbol: 'BLK',   name: 'BlackRock',             weight: 0.29, price: 1156.65 },
  { rank: 61,  symbol: 'AMGN',  name: 'Amgen',                 weight: 0.28, price: 330.03 },
  { rank: 62,  symbol: 'ACN',   name: 'Accenture',             weight: 0.28, price: 287.77 },
  { rank: 63,  symbol: 'UBER',  name: 'Uber',                  weight: 0.28, price: 84.38 },
  { rank: 64,  symbol: 'GEV',   name: 'GE Vernova',            weight: 0.28, price: 642.23 },
  { rank: 65,  symbol: 'TJX',   name: 'TJX Companies',         weight: 0.28, price: 156.16 },
  { rank: 66,  symbol: 'QCOM',  name: 'Qualcomm',              weight: 0.27, price: 161.39 },
  { rank: 67,  symbol: 'TXN',   name: 'Texas Instruments',     weight: 0.27, price: 189.12 },
  { rank: 68,  symbol: 'NEE',   name: 'NextEra Energy',        weight: 0.27, price: 82.19 },
  { rank: 69,  symbol: 'DHR',   name: 'Danaher',               weight: 0.27, price: 239.89 },
  { rank: 70,  symbol: 'T',     name: 'AT&T',                  weight: 0.27, price: 23.73 },
  { rank: 71,  symbol: 'BKNG',  name: 'Booking Holdings',      weight: 0.27, price: 5193.06 },
  { rank: 72,  symbol: 'VZ',    name: 'Verizon',               weight: 0.26, price: 39.36 },
  { rank: 73,  symbol: 'SPGI',  name: 'S&P Global',            weight: 0.26, price: 545.43 },
  { rank: 74,  symbol: 'ANET',  name: 'Arista Networks',       weight: 0.26, price: 130.59 },
  { rank: 75,  symbol: 'LOW',   name: "Lowe's",                weight: 0.25, price: 277.01 },
  { rank: 76,  symbol: 'INTU',  name: 'Intuit',                weight: 0.25, price: 554.58 },
  { rank: 77,  symbol: 'COF',   name: 'Capital One',           weight: 0.24, price: 236.97 },
  { rank: 78,  symbol: 'GILD',  name: 'Gilead Sciences',       weight: 0.24, price: 121.26 },
  { rank: 79,  symbol: 'ADI',   name: 'Analog Devices',        weight: 0.24, price: 302.10 },
  { rank: 80,  symbol: 'PFE',   name: 'Pfizer',                weight: 0.23, price: 25.89 },
  { rank: 81,  symbol: 'DE',    name: 'Deere & Co',            weight: 0.22, price: 515.04 },
  { rank: 82,  symbol: 'SYK',   name: 'Stryker',               weight: 0.22, price: 362.49 },
  { rank: 83,  symbol: 'NOW',   name: 'ServiceNow',            weight: 0.22, price: 131.17 },
  { rank: 84,  symbol: 'UNP',   name: 'Union Pacific',         weight: 0.22, price: 230.51 },
  { rank: 85,  symbol: 'HON',   name: 'Honeywell',             weight: 0.22, price: 215.02 },
  { rank: 86,  symbol: 'LMT',   name: 'Lockheed Martin',       weight: 0.21, price: 577.89 },
  { rank: 87,  symbol: 'BSX',   name: 'Boston Scientific',     weight: 0.21, price: 90.03 },
  { rank: 88,  symbol: 'PANW',  name: 'Palo Alto Networks',    weight: 0.21, price: 187.73 },
  { rank: 89,  symbol: 'ETN',   name: 'Eaton Corp',            weight: 0.21, price: 333.46 },
  { rank: 90,  symbol: 'WELL',  name: 'Welltower',             weight: 0.21, price: 188.18 },
  { rank: 91,  symbol: 'ADBE',  name: 'Adobe',                 weight: 0.20, price: 304.09 },
  { rank: 92,  symbol: 'MDT',   name: 'Medtronic',             weight: 0.20, price: 99.00 },
  { rank: 93,  symbol: 'NEM',   name: 'Newmont',               weight: 0.20, price: 114.21 },
  { rank: 94,  symbol: 'BX',    name: 'Blackstone',            weight: 0.20, price: 160.81 },
  { rank: 95,  symbol: 'CEG',   name: 'Constellation Energy',  weight: 0.20, price: 341.20 },
  { rank: 96,  symbol: 'PLD',   name: 'Prologis',              weight: 0.20, price: 132.75 },
  { rank: 97,  symbol: 'COP',   name: 'ConocoPhillips',        weight: 0.19, price: 98.93 },
  { rank: 98,  symbol: 'PGR',   name: 'Progressive',           weight: 0.19, price: 203.52 },
  { rank: 99,  symbol: 'PH',    name: 'Parker-Hannifin',       weight: 0.19, price: 944.58 },
  { rank: 100, symbol: 'CB',    name: 'Chubb',                 weight: 0.19, price: 301.11 },
  { rank: 101, symbol: 'KKR',   name: 'KKR',                   weight: 0.19, price: 131.32 },
  { rank: 102, symbol: 'BMY',   name: 'Bristol-Myers',         weight: 0.18, price: 56.62 },
  { rank: 103, symbol: 'CRWD',  name: 'CrowdStrike',           weight: 0.18, price: 455.00 },
  { rank: 104, symbol: 'VRTX',  name: 'Vertex Pharma',         weight: 0.18, price: 438.92 },
  { rank: 105, symbol: 'HCA',   name: 'HCA Healthcare',        weight: 0.18, price: 483.80 },
  { rank: 106, symbol: 'SBUX',  name: 'Starbucks',             weight: 0.17, price: 93.28 },
  { rank: 107, symbol: 'ADP',   name: 'ADP',                   weight: 0.17, price: 260.20 },
  { rank: 108, symbol: 'MCK',   name: 'McKesson',              weight: 0.17, price: 844.13 },
  { rank: 109, symbol: 'MO',    name: 'Altria',                weight: 0.16, price: 61.58 },
  { rank: 110, symbol: 'CMCSA', name: 'Comcast',               weight: 0.16, price: 28.35 },
  { rank: 111, symbol: 'CVS',   name: 'CVS Health',            weight: 0.16, price: 81.36 },
  { rank: 112, symbol: 'GD',    name: 'General Dynamics',      weight: 0.16, price: 368.69 },
  { rank: 113, symbol: 'ICE',   name: 'Intercontinental Exch', weight: 0.16, price: 173.28 },
  { rank: 114, symbol: 'CME',   name: 'CME Group',             weight: 0.16, price: 272.59 },
  { rank: 115, symbol: 'SO',    name: 'Southern Company',      weight: 0.16, price: 88.78 },
  { rank: 116, symbol: 'SNPS',  name: 'Synopsys',              weight: 0.15, price: 508.19 },
  { rank: 117, symbol: 'MCO',   name: "Moody's",               weight: 0.15, price: 539.61 },
  { rank: 118, symbol: 'NKE',   name: 'Nike',                  weight: 0.15, price: 64.59 },
  { rank: 119, symbol: 'NOC',   name: 'Northrop Grumman',      weight: 0.15, price: 654.61 },
  { rank: 120, symbol: 'DUK',   name: 'Duke Energy',           weight: 0.15, price: 118.90 },
  { rank: 121, symbol: 'UPS',   name: 'UPS',                   weight: 0.15, price: 108.62 },
  { rank: 122, symbol: 'MMM',   name: '3M',                    weight: 0.14, price: 171.10 },
  { rank: 123, symbol: 'HWM',   name: 'Howmet',                weight: 0.14, price: 224.26 },
  { rank: 124, symbol: 'MMC',   name: 'Marsh McLennan',        weight: 0.14, price: 182.70 },
  { rank: 125, symbol: 'WM',    name: 'Waste Management',      weight: 0.14, price: 219.86 },
  { rank: 126, symbol: 'SHW',   name: 'Sherwin-Williams',      weight: 0.14, price: 356.13 },
  { rank: 127, symbol: 'MAR',   name: 'Marriott',              weight: 0.14, price: 325.79 },
  { rank: 128, symbol: 'CDNS',  name: 'Cadence Design',        weight: 0.14, price: 320.60 },
  { rank: 129, symbol: 'FCX',   name: 'Freeport-McMoRan',      weight: 0.14, price: 59.96 },
  { rank: 130, symbol: 'TT',    name: 'Trane Technologies',    weight: 0.14, price: 387.27 },
  { rank: 131, symbol: 'BK',    name: 'BNY Mellon',            weight: 0.14, price: 123.97 },
  { rank: 132, symbol: 'AMT',   name: 'American Tower',        weight: 0.14, price: 181.55 },
  { rank: 133, symbol: 'ELV',   name: 'Elevance Health',       weight: 0.13, price: 381.93 },
  { rank: 134, symbol: 'PNC',   name: 'PNC Financial',         weight: 0.13, price: 215.04 },
  { rank: 135, symbol: 'USB',   name: 'US Bancorp',            weight: 0.13, price: 53.95 },
  { rank: 136, symbol: 'APO',   name: 'Apollo Global',         weight: 0.13, price: 144.15 },
  { rank: 137, symbol: 'EMR',   name: 'Emerson Electric',      weight: 0.13, price: 148.02 },
  { rank: 138, symbol: 'TDG',   name: 'TransDigm',             weight: 0.13, price: 1433.54 },
  { rank: 139, symbol: 'GLW',   name: 'Corning',               weight: 0.13, price: 93.49 },
  { rank: 140, symbol: 'CTAS',  name: 'Cintas',                weight: 0.13, price: 195.58 },
  { rank: 141, symbol: 'EQIX',  name: 'Equinix',               weight: 0.13, price: 801.82 },
  { rank: 142, symbol: 'ECL',   name: 'Ecolab',                weight: 0.13, price: 277.73 },
  { rank: 143, symbol: 'REGN',  name: 'Regeneron',             weight: 0.12, price: 741.92 },
  { rank: 144, symbol: 'ITW',   name: 'Illinois Tool Works',   weight: 0.12, price: 261.89 },
  { rank: 145, symbol: 'RCL',   name: 'Royal Caribbean',       weight: 0.12, price: 278.11 },
  { rank: 146, symbol: 'GM',    name: 'General Motors',        weight: 0.12, price: 80.91 },
  { rank: 147, symbol: 'AON',   name: 'Aon',                   weight: 0.12, price: 344.84 },
  { rank: 148, symbol: 'FDX',   name: 'FedEx',                 weight: 0.12, price: 313.16 },
  { rank: 149, symbol: 'WMB',   name: 'Williams Companies',    weight: 0.12, price: 60.29 },
  { rank: 150, symbol: 'HLT',   name: 'Hilton',                weight: 0.11, price: 301.86 },
  { rank: 151, symbol: 'SLB',   name: 'SLB (Schlumberger)',    weight: 0.11, price: 46.57 },
  { rank: 152, symbol: 'JCI',   name: 'Johnson Controls',      weight: 0.11, price: 112.95 },
  { rank: 153, symbol: 'CL',    name: 'Colgate-Palmolive',     weight: 0.11, price: 84.34 },
  { rank: 154, symbol: 'CSX',   name: 'CSX',                   weight: 0.11, price: 36.30 },
  { rank: 155, symbol: 'PWR',   name: 'Quanta Services',       weight: 0.11, price: 447.64 },
  { rank: 156, symbol: 'MSI',   name: 'Motorola Solutions',    weight: 0.10, price: 394.44 },
  { rank: 157, symbol: 'NSC',   name: 'Norfolk Southern',      weight: 0.10, price: 290.77 },
  { rank: 158, symbol: 'PCAR',  name: 'PACCAR',                weight: 0.10, price: 121.92 },
  { rank: 159, symbol: 'AEP',   name: 'Am. Elec. Power',       weight: 0.10, price: 119.40 },
  { rank: 160, symbol: 'ROST',  name: 'Ross Stores',           weight: 0.10, price: 193.79 },
  { rank: 161, symbol: 'TRV',   name: 'Travelers',             weight: 0.10, price: 271.34 },
  { rank: 162, symbol: 'NXPI',  name: 'NXP Semi',              weight: 0.10, price: 238.60 },
  { rank: 163, symbol: 'SRE',   name: 'Sempra',                weight: 0.10, price: 91.57 },
  { rank: 164, symbol: 'BDX',   name: 'Becton Dickinson',      weight: 0.09, price: 208.35 },
  { rank: 165, symbol: 'APD',   name: 'Air Products',          weight: 0.09, price: 265.98 },
  { rank: 166, symbol: 'URI',   name: 'United Rentals',        weight: 0.09, price: 926.57 },
  { rank: 167, symbol: 'EOG',   name: 'EOG Resources',         weight: 0.09, price: 108.02 },
  { rank: 168, symbol: 'AFL',   name: 'Aflac',                 weight: 0.09, price: 109.61 },
  { rank: 169, symbol: 'FTNT',  name: 'Fortinet',              weight: 0.09, price: 76.32 },
  { rank: 170, symbol: 'O',     name: 'Realty Income',         weight: 0.09, price: 60.72 },
  { rank: 171, symbol: 'ADSK',  name: 'Autodesk',              weight: 0.09, price: 262.26 },
  { rank: 172, symbol: 'ZTS',   name: 'Zoetis',                weight: 0.09, price: 125.28 },
  { rank: 173, symbol: 'DLR',   name: 'Digital Realty',        weight: 0.09, price: 160.57 },
  { rank: 174, symbol: 'F',     name: 'Ford',                  weight: 0.09, price: 13.81 },
  { rank: 175, symbol: 'MPC',   name: 'Marathon Petroleum',    weight: 0.08, price: 177.59 },
  { rank: 176, symbol: 'CMG',   name: 'Chipotle',              weight: 0.08, price: 40.36 },
  { rank: 177, symbol: 'PYPL',  name: 'PayPal',                weight: 0.08, price: 56.74 },
  { rank: 178, symbol: 'PSA',   name: 'Public Storage',        weight: 0.08, price: 293.03 },
  { rank: 179, symbol: 'MET',   name: 'MetLife',               weight: 0.08, price: 77.90 },
  { rank: 180, symbol: 'ALL',   name: 'Allstate',              weight: 0.08, price: 195.47 },
  { rank: 181, symbol: 'EA',    name: 'Electronic Arts',       weight: 0.08, price: 204.15 },
  { rank: 182, symbol: 'WDAY',  name: 'Workday',               weight: 0.08, price: 192.72 },
  { rank: 183, symbol: 'AXON',  name: 'Axon Enterprise',       weight: 0.08, price: 637.19 },
  { rank: 184, symbol: 'TGT',   name: 'Target',                weight: 0.08, price: 111.13 },
  { rank: 185, symbol: 'FAST',  name: 'Fastenal',              weight: 0.08, price: 43.53 },
  { rank: 186, symbol: 'AME',   name: 'AMETEK',                weight: 0.08, price: 215.02 },
  { rank: 187, symbol: 'EW',    name: 'Edwards Lifesciences',  weight: 0.08, price: 84.49 },
  { rank: 188, symbol: 'CTVA',  name: 'Corteva',               weight: 0.08, price: 70.50 },
  { rank: 189, symbol: 'AMP',   name: 'Ameriprise',            weight: 0.08, price: 508.10 },
  { rank: 190, symbol: 'DHI',   name: 'D.R. Horton',           weight: 0.08, price: 140.00 },
  { rank: 191, symbol: 'KMB',   name: 'Kimberly-Clark',        weight: 0.07, price: 142.00 },
  { rank: 192, symbol: 'MCHP',  name: 'Microchip Tech',        weight: 0.07, price: 75.00 },
  { rank: 193, symbol: 'OKE',   name: 'ONEOK',                 weight: 0.07, price: 100.00 },
  { rank: 194, symbol: 'CARR',  name: 'Carrier Global',        weight: 0.07, price: 77.00 },
  { rank: 195, symbol: 'EXC',   name: 'Exelon',                weight: 0.07, price: 44.00 },
  { rank: 196, symbol: 'IRM',   name: 'Iron Mountain',         weight: 0.07, price: 100.00 },
  { rank: 197, symbol: 'VRSK',  name: 'Verisk Analytics',      weight: 0.07, price: 310.00 },
  { rank: 198, symbol: 'HIG',   name: 'Hartford Financial',    weight: 0.07, price: 130.00 },
  { rank: 199, symbol: 'GEHC',  name: 'GE HealthCare',         weight: 0.07, price: 80.00 },
  { rank: 200, symbol: 'ROP',   name: 'Roper Technologies',    weight: 0.07, price: 580.00 },
];

const FUNDS = [
  { name: 'VOO / IVV', fee: 0.03 },
  { name: 'SPY',       fee: 0.09 },
  { name: 'Avg Fund',  fee: 0.50 },
];

const fmt = (n) => n >= 1e6
  ? '$' + (n / 1e6).toFixed(2) + 'M'
  : '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtDec = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

const C = {
  bg: '#0a0a0f',
  panel: '#12121a',
  card: '#1a1a26',
  border: '#2a2a3a',
  accent: '#7c6fff',
  accentDim: '#4a3fbf',
  green: '#4ade80',
  red: '#f87171',
  yellow: '#fbbf24',
  text: '#e8e8f0',
  muted: '#6b6b8a',
  rank1: '#fbbf24',
  rank11: '#a78bfa',
  rank51: '#6b6b8a',
};

const s = {
  label: { fontSize: 11, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 },
  val: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: C.text },
  card: { background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, padding: '14px 16px' },
  quickBtn: (active) => ({
    padding: '4px 10px', borderRadius: 6, border: `1px solid ${active ? C.accent : C.border}`,
    background: active ? C.accentDim : 'transparent', color: active ? '#fff' : C.muted,
    cursor: 'pointer', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace",
  }),
};

function SliderRow({ label, value, min, max, step = 1, onChange, display }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={s.label}>{label}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: C.text }}>
          {display ?? value}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%' }} />
    </div>
  );
}

function CommInput({ label, value, onChange }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={s.label}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ color: C.muted }}>$</span>
        <input type="number" min={0} step={0.01} value={value}
          onChange={e => onChange(Math.max(0, Number(e.target.value)))}
          style={{
            width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 6,
            color: C.text, padding: '6px 8px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 13,
            outline: 'none',
          }} />
      </div>
    </div>
  );
}

export default function App() {
  const [nStocks, setNStocks] = useState(50);
  const [budget, setBudget] = useState(50000);
  const [years, setYears] = useState(20);
  const [annualReturn, setAnnualReturn] = useState(10.5);
  const [commBuy, setCommBuy] = useState(0);
  const [commSell, setCommSell] = useState(0);
  const [priceOverrides, setPriceOverrides] = useState({});
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const slice = useMemo(() => STOCKS.slice(0, nStocks), [nStocks]);

  const holdings = useMemo(() => {
    const sliceWeight = slice.reduce((s, st) => s + st.weight, 0);
    return slice.map(st => {
      const price = priceOverrides[st.symbol] !== undefined ? priceOverrides[st.symbol] : st.price;
      const idealDollars = (st.weight / sliceWeight) * budget;
      const shares = Math.max(1, Math.ceil(idealDollars / price));
      const actualCost = shares * price;
      return { ...st, price, overridden: priceOverrides[st.symbol] !== undefined, shares, actualCost, sliceWeight };
    });
  }, [slice, budget, priceOverrides]);

  const totals = useMemo(() => {
    const totalInvested = holdings.reduce((s, h) => s + h.actualCost, 0);
    const sliceWeight = holdings[0]?.sliceWeight ?? 0;
    const indexCoverage = sliceWeight;
    const totalBuyComm = nStocks * commBuy;
    const totalSellComm = nStocks * commSell;
    const txCostTotal = totalBuyComm + totalSellComm;
    const diyFinal = totalInvested * Math.pow(1 + annualReturn / 100, years) - totalSellComm;
    const roundingDelta = totalInvested - budget;
    return { totalInvested, indexCoverage, totalBuyComm, totalSellComm, txCostTotal, diyFinal, roundingDelta };
  }, [holdings, nStocks, commBuy, commSell, annualReturn, years, budget]);

  const fundResults = useMemo(() => FUNDS.map(f => {
    const fundFinal = totals.totalInvested * Math.pow(1 + (annualReturn - f.fee) / 100, years);
    const delta = totals.diyFinal - fundFinal;
    return { ...f, fundFinal, delta };
  }), [totals, annualReturn, years]);

  const maxFundFinal = Math.max(...fundResults.map(f => f.fundFinal), totals.diyFinal);

  const filtered = useMemo(() => {
    if (!search) return holdings;
    const q = search.toLowerCase();
    return holdings.filter(h => h.symbol.toLowerCase().includes(q) || h.name.toLowerCase().includes(q));
  }, [holdings, search]);

  const displayed = showAll ? filtered : filtered.slice(0, 25);
  const maxWeight = STOCKS[0].weight;

  const tickerColor = (rank) => rank <= 10 ? C.rank1 : rank <= 50 ? C.rank11 : C.rank51;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, padding: '24px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.text }}>
            DIY INDEX
          </span>
          <span style={{ color: C.muted, fontSize: 13 }}>S&amp;P 500 replication calculator</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Summary stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={s.card}>
              <div style={s.label}>Total Invested</div>
              <div style={s.val}>{fmt(totals.totalInvested)}</div>
              {totals.roundingDelta > 0.01 && (
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>+{fmt(totals.roundingDelta)} rounding</div>
              )}
            </div>
            <div style={s.card}>
              <div style={s.label}>Index Coverage</div>
              <div style={s.val}>{fmtDec(totals.indexCoverage, 1)}%</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{nStocks} of 503 stocks</div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ ...s.card, padding: '16px 16px 8px' }}>
            <div style={{ marginBottom: 14 }}>
              <SliderRow label="Number of stocks" value={nStocks} min={5} max={200}
                onChange={setNStocks} display={nStocks} />
              <div style={{ display: 'flex', gap: 6, marginTop: -8, marginBottom: 14 }}>
                {[10, 20, 50, 100, 200].map(n => (
                  <button key={n} style={s.quickBtn(nStocks === n)} onClick={() => setNStocks(n)}>{n}</button>
                ))}
              </div>
              <SliderRow label="Portfolio budget" value={budget} min={5000} max={500000} step={1000}
                onChange={setBudget} display={fmt(budget)} />
              <SliderRow label="Hold period" value={years} min={1} max={40}
                onChange={setYears} display={`${years}yr`} />
              <SliderRow label="Annual return" value={annualReturn} min={4} max={16} step={0.5}
                onChange={setAnnualReturn} display={`${annualReturn}%`} />
            </div>
            <div style={{ display: 'flex', gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <CommInput label="Buy comm/trade" value={commBuy} onChange={setCommBuy} />
              <CommInput label="Sell comm/trade" value={commSell} onChange={setCommSell} />
            </div>
            {totals.txCostTotal > 0 && (
              <div style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>
                Total transaction cost: <span style={{ color: C.text }}>{fmt(totals.txCostTotal)}</span>
                &nbsp;({fmt(totals.totalBuyComm)} buy + {fmt(totals.totalSellComm)} sell)
              </div>
            )}
          </div>

          {/* Index Coverage Bar */}
          <div style={s.card}>
            <div style={{ ...s.label, marginBottom: 10 }}>INDEX COVERAGE</div>
            <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28, marginBottom: 8 }}>
              <div style={{
                width: `${totals.indexCoverage}%`, background: C.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: '#fff', transition: 'width 0.2s',
                minWidth: totals.indexCoverage > 8 ? 0 : 0,
              }}>
                {totals.indexCoverage > 8 && `${fmtDec(totals.indexCoverage, 1)}%`}
              </div>
              <div style={{
                flex: 1, background: C.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: C.muted,
              }}>
                {fmtDec(100 - totals.indexCoverage, 1)}%
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.muted }}>
              <span><span style={{ color: C.accent }}>■</span> Your {nStocks} stocks</span>
              <span><span style={{ color: C.border }}>■</span> Remaining {503 - nStocks} stocks</span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 10, lineHeight: 1.5, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              Fund scenarios cover the full index. Your DIY portfolio covers only the top {nStocks} by weight. The comparison is directional.
            </div>
          </div>

          {/* Fee Comparison */}
          <div style={s.card}>
            <div style={{ ...s.label, marginBottom: 12 }}>FEE COMPARISON — {years}yr OUTCOME</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>YOUR DIY</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: C.accent }}>
                  {fmt(totals.diyFinal)}
                </span>
              </div>
              <div style={{ height: 8, background: C.accent, borderRadius: 4, width: `${(totals.diyFinal / maxFundFinal) * 100}%`, transition: 'width 0.2s' }} />
            </div>
            {fundResults.map((f, i) => {
              const diyWins = f.delta >= 0;
              return (
                <div key={f.name} style={{ marginBottom: i < fundResults.length - 1 ? 12 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                      <span style={{ fontSize: 12, color: C.text }}>{f.name}</span>
                      <span style={{ fontSize: 11, color: C.muted, marginLeft: 6 }}>{f.fee}% fee</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{fmt(f.fundFinal)}</div>
                      <div style={{ fontSize: 11, color: diyWins ? C.green : C.red }}>
                        {diyWins ? '▲' : '▼'} {fmt(Math.abs(f.delta))} DIY {diyWins ? 'wins' : 'loses'}
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 3, transition: 'width 0.2s',
                      background: diyWins ? C.green : C.red,
                      width: `${(f.fundFinal / maxFundFinal) * 100}%`,
                    }} />
                  </div>
                </div>
              );
            })}

            {/* DIY advantage callout */}
            <div style={{ marginTop: 14, padding: '10px 12px', background: '#0a0a0f', borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>DIY Advantage</div>
              {fundResults.filter(f => ['SPY', 'Avg Fund'].includes(f.name)).map(f => (
                <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: C.muted }}>vs {f.name}</span>
                  <span style={{ color: f.delta >= 0 ? C.green : C.red, fontWeight: 600 }}>
                    {f.delta >= 0 ? '+' : ''}{fmt(f.delta)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Holdings Table */}
        <div style={{ ...s.card, padding: 0, overflow: 'hidden' }}>
          {/* Table header bar */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>
              Holdings — Top {nStocks}
            </span>
            <input
              type="text"
              placeholder="Search ticker or name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                marginLeft: 'auto', background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 6, padding: '5px 10px', color: C.text, fontSize: 12,
                fontFamily: "'IBM Plex Mono', monospace", width: 200, outline: 'none',
              }}
            />
          </div>

          {/* Column headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '36px 70px 1fr 110px 60px 90px',
            padding: '8px 16px', borderBottom: `1px solid ${C.border}`,
            fontSize: 10, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <div>#</div>
            <div>Ticker</div>
            <div>Company</div>
            <div style={{ textAlign: 'right' }}>Price</div>
            <div style={{ textAlign: 'right' }}>Shares</div>
            <div style={{ textAlign: 'right' }}>Cost</div>
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
            {displayed.map((h) => (
              <div key={h.symbol} style={{
                display: 'grid', gridTemplateColumns: '36px 70px 1fr 110px 60px 90px',
                padding: '9px 16px', borderBottom: `1px solid ${C.border}`,
                alignItems: 'center', transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.card}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 11, color: C.muted }}>{h.rank}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: tickerColor(h.rank), letterSpacing: '0.02em' }}>{h.symbol}</div>
                <div>
                  <div style={{ fontSize: 12, color: C.text, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>{h.name}</div>
                  <div style={{ height: 3, background: C.border, borderRadius: 2, maxWidth: 180 }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      background: h.rank <= 10 ? C.rank1 : h.rank <= 50 ? C.rank11 : C.rank51,
                      width: `${(h.weight / maxWeight) * 100}%`,
                    }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    value={h.price}
                    onChange={e => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v) && v > 0) setPriceOverrides(prev => ({ ...prev, [h.symbol]: v }));
                    }}
                    onDoubleClick={() => {
                      setPriceOverrides(prev => {
                        const next = { ...prev };
                        delete next[h.symbol];
                        return next;
                      });
                    }}
                    title="Double-click to reset to reference price"
                    style={{
                      width: 90, textAlign: 'right', background: h.overridden ? 'rgba(124,111,255,0.12)' : 'transparent',
                      border: `1px solid ${h.overridden ? C.accent : 'transparent'}`,
                      borderRadius: 4, color: h.overridden ? C.accent : C.text,
                      padding: '3px 6px', fontSize: 13, fontFamily: "'IBM Plex Mono', monospace",
                      outline: 'none', cursor: 'text',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'right', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: C.text }}>{h.shares}</div>
                <div style={{ textAlign: 'right', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: C.text }}>{fmt(h.actualCost)}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {(filtered.length > 25 || showAll) && (
            <div style={{ padding: '10px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: C.muted }}>{filtered.length} holdings</span>
              <button
                onClick={() => setShowAll(v => !v)}
                style={{
                  background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 6,
                  color: C.muted, padding: '5px 12px', cursor: 'pointer', fontSize: 12,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>
                {showAll ? 'Show fewer' : `Show all ${filtered.length}`}
              </button>
            </div>
          )}

          {/* Table totals */}
          <div style={{
            padding: '10px 16px', background: C.card, borderTop: `1px solid ${C.border}`,
            display: 'grid', gridTemplateColumns: '36px 70px 1fr 110px 60px 90px',
            alignItems: 'center',
          }}>
            <div />
            <div />
            <div style={{ fontSize: 12, color: C.muted }}>TOTAL</div>
            <div />
            <div style={{ textAlign: 'right', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>
              {holdings.reduce((s, h) => s + h.shares, 0).toLocaleString()}
            </div>
            <div style={{ textAlign: 'right', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: C.accent }}>
              {fmt(totals.totalInvested)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
