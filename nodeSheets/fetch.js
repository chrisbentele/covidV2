const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const Data = require('./data.json');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Sheets API.
//     authorize(JSON.parse(content), listMajors);
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function getDate(date){
    let splitDate = date.split("-")
    let newDate = "2020/"
    switch(splitDate[1]){
        case "nov." :
            newDate += "11/"
            break
        case "oct." :
            newDate += "10/"
            break
        case "sept." :
            newDate += "09/"
            break
        case "ago." :
            newDate += "08/"
            break
        case "jul." :
            newDate += "07/"
            break
        case "jun." :
            newDate += "06/"
            break
        case "may." :
            newDate += "05/"
            break
        case "abr." :
            newDate += "04/"
            break
        case "mar." :
            newDate += "03/"
            break
    }
    return newDate+splitDate[0]
}

// function listData(){
//     fs.readFile("covidData.csv",'utf8', (err, data) => {
//         if(err){
//             console.log(err)
//         } else {
//             let dataLines = data.split("\r\n")
//             fs.appendFileSync("data.json", "'const data' = [")
//             dataLines.forEach(line => {
//                 line = line.split(",")
//                 fs.appendFileSync("data.json", `{"date":"${getDate(line[0])}","positives":${line[2]},"tests":${line[3]},"percentage":${line[10]+","+line[11]},"recovered":${line[12]},"deaths":${line[13]},"totalCases":${line[14]},"totalRecovered":${line[15]},"totalDeaths":${line[16]}},`)
//             })
//         }
//     })
// }
// listData()

function listDates(){
    Data.forEach(date => {
        console.log(date.date)
    })
}
listDates()
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    for (var i = 2; i < 260; i++) {
        sheets.spreadsheets.values.get({
            spreadsheetId: '1ydwed567MmoKybPPqxH_BOebbAlipXK9-kaEObODBuc',
            range: `Data!A${i}:Q${i}`,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
                // Print columns A and E, which correspond to indices 0 and 4.
                rows.map((row) => {
                    fs.appendFileSync("data.txt", `Fecha:${row[0]} - Positivos:${row[2]} - Pruebas totales:${row[3]} - Porcentaje de Positivos:${row[10]} - Recuperados:${row[11]} - Fallecidos:${row[12]}`, function (err) {
                        if (err) throw err;
                    })
                    fs.appendFileSync("data.txt", "\n", function (err) {
                        if (err) throw err;
                    })
                });
            } else {
                console.log('No data found.');
            }
        });
    }

}