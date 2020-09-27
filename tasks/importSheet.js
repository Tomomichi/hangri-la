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

const target = process.argv[2] == 'words' ? 'words' : 'chars';
const batch = admin.firestore().batch();
fs.createReadStream(`./tmp/${target}.csv`)
  .pipe(parse({columns: true}))
  .on('data', (row) => {
    if(row.skip == 'true') { return; }

    const params = (target == 'chars') ?
      {
        code: row.code,
        hangul: row.hangul,
        kana: [
          { value: row.kana, default: true }
        ],
      } :
      {
        hangul: row.hangul,
        kana: row.kana,
        chars: row.id.split(''),
      };

    const ref = admin.firestore().collection(target).doc(row.id);
    batch.set(ref, params);
    console.log(`import: ${row.id}`)
  })
  .on('end', () => {
    batch.commit().then(() => {
      console.log("import finished!")
    });
  });
