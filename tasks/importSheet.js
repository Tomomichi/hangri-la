// 実行コマンド（リポジトリ直下で実行）
// node ./tasks/importSheet.js [words|chars]

const fs = require('fs');
const parse = require('csv-parse');
const admin = require('firebase-admin');
const serviceAccount = require("../cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hangri-la.firebaseio.com"
});

const target = process.argv[2];
const batch = admin.firestore().batch();


const importSheet = () => {
  fs.createReadStream(`./tmp/${target}.csv`)
    .pipe(parse({columns: true}))
    .on('data', (row) => {
      if(row.skip == 'true') { return; }

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
      console.log(`import: ${row.id}`)
    })
    .on('end', () => {
      batch.commit().then(() => {
        console.log("import finished!")
      });
    });
}

const importCharsChanges = () => {
  let results = {};
  fs.createReadStream(`./tmp/${target}.csv`)
    .pipe(parse({columns: true}))
    .on('data', (row) => {
      if(row.skip == 'true') { return; }

      const params = Object.fromEntries(Object.entries(row).filter(([key, value]) => !['charId', 'skip'].includes(key) )); //除外カラムを指定
      results[row.charId] = results[row.charId] || [];
      results[row.charId].push(params);
    })
    .on('end', () => {
      for (let charId in results) {
        const ref = admin.firestore().collection("chars").doc(charId);
        batch.update(ref, {
          phonological_changes: results[charId],
          updatedAt: new Date(),
        });
        console.log(`set data for ${charId}`);
      }
      batch.commit().then(() => {
        console.log("import finished!")
      });
    });
}


if(target == 'chars_changes') {
  importCharsChanges();
}else {
  importSheet();
}
