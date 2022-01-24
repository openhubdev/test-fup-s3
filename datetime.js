const filename = "hola A file.jpg";

const currentDT = new Date();
const currentDT2 = new Date().toISOString().replace(/:/g, '-');
//const date3 = new Date().toISOString();
//
//var newfilename= Date().toISOString().replace(/:/g, '-') + '-' + filename;
// str.replace(/\s+/g, '') //remove an empty space 
console.log("date > "+currentDT+" | date.toString() > "+currentDT.toString()+" | date.toISOString() > "+currentDT.toISOString())

console.log("datenew > "+currentDT2)
console.log("dateNOW> "+Date.now())