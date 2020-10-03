// 実行コマンド（リポジトリ直下で実行）
// node ./tasks/importSheet.js [words|chars]

const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('csv-parse');
const admin = require('firebase-admin');
const serviceAccount = require("../cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hangri-la.firebaseio.com"
});

const target = process.argv[2];
const batch = admin.firestore().batch();
const sheetBaseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5r3L8aVm_rFF02NfmaAgPq4ZEYrtPdcn1WcFBe4J1k36H6Aze3Bbvam9CIFxaxShDPYM7Qx5_btTG/pub?single=true&output=csv';
const gids = {
  chars: '0',
  words: '1163711945',
  phonological_changes: '471792344',
  chars_changes: '1574865544',
}


const importSheet = async () => {
  const sheetUrl = `${sheetBaseUrl}&gid=${gids[target]}`;
  const res = await fetch(sheetUrl);
  const text = await res.text();

  parse(text, {columns: true})
    .on('readable', function(){
      let row;
      while (row = this.read()) {
        if(row.skip == 'TRUE') { break; }

        const params = Object.fromEntries(Object.entries(row).filter(([key, value]) => !['id', 'skip', 'created'].includes(key) )); //除外カラムを指定
        params['updatedAt'] = new Date();
        if(target == 'words') {
          params['chars'] = row.id.split('');
        }
        if(!row.created) {
          params['createdAt'] = new Date();
        }

        const ref = admin.firestore().collection(target).doc(row.id);
        if(row.created) {
          batch.update(ref, params);
        }else {
          batch.set(ref, params);
        }
        console.log(`imported: ${row.id}`)
      }
    })
    .on('end', function(){
      batch.commit().then(() => {
        console.log("*** import finished! ***")
      });
    })
}

const importCharsChanges = async () => {
  const sheetUrl = `${sheetBaseUrl}&gid=${gids[target]}`;
  const res = await fetch(sheetUrl);
  const text = await res.text();

  let results = {};
  parse(text, {columns: true})
    .on('readable', function(){
      let row;
      while (row = this.read()) {
        if(row.skip == 'TRUE') { break; }

        const params = Object.fromEntries(Object.entries(row).filter(([key, value]) => !['charId', 'skip'].includes(key) )); //除外カラムを指定
        results[row.charId] = results[row.charId] || [];
        results[row.charId].push(params);
      }
    })
    .on('end', function(){
      for (let charId in results) {
        const ref = admin.firestore().collection("chars").doc(charId);
        batch.update(ref, {
          phonological_changes: results[charId],
          updatedAt: new Date(),
        });
        console.log(`set data for ${charId}`);
      }
      batch.commit().then(() => {
        console.log("*** import finished! ***")
      });
    })
}


if(target == 'chars_changes') {
  importCharsChanges();
}else {
  importSheet();
}
