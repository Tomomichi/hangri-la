// 実行コマンド（リポジトリ直下で実行）
// node ./tasks/importHistories.js [words|chars]

const fs = require('fs');
const parse = require('csv-parse');
const admin = require('firebase-admin');
const serviceAccount = require("../cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hangri-la.firebaseio.com"
});

let results = {};
const batch = admin.firestore().batch();
fs.createReadStream(`./tmp/histories.csv`)
  .pipe(parse({columns: true}))
  .on('data', (row) => {
    if(row.skip == 'true') { return; }

    results[row.id] = results[row.id] || [];
    results[row.id].push({
      language: row.language,
      title: row.title,
      group: row.group,
      // historyId: row.historyId,
    });
  })
  .on('end', () => {
    for (let key in results) {
      const ref = admin.firestore().collection("chars").doc(key);
      batch.update(ref, {histories: results[key]});
      console.log(`set data for ${key}`);
    }
    batch.commit().then(() => {
      console.log("import finished!");
    });
  });
