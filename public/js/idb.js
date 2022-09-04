// create variable for db connection
let db;

// establish a connection to IndexedDB
const request = indexedDB.open('budget-tracker', 1);

request.onupgradeneeded = function (event) {
    // save reference to database
    const db = event.target.result;
    // create an object store (table)
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function (event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes, run function to send all local db data to api
    if (navigator.onLine) {
        // upload transaction  
    }
};

request.onerror = function (event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // access the object store for `new_pizza`
    const transactionObjectStore = transaction.objectStore('new_transaction');

    // add record to your store with add method
    transactionObjectStore.add(record);
}