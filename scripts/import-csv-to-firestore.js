const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Load environment variables
require("dotenv").config();

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAcctKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore database instance
const db = admin.firestore();

// Path to your CSV file
const csvFilePath = "../src/data/firstBatch.csv";

// Function to import data from CSV to Firestore
const importData = () => {
  const data = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // Assuming your CSV structure is consistent with firstWord and secondWord
      const firstWord = row["First Word"];
      const secondWord = row["Second Word"];

      data.push({ firstWord, secondWord });
    })
    .on("end", () => {
      // Add data to Firestore
      db.collection("vowel-diphthong-pairs-expt")
        .doc("ænull")
        .set({ data })
        .then(() => {
          console.log("Data successfully imported to Firestore");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
};

// Call the importData function to start the import process
importData();
