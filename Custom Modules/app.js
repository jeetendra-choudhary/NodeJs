'use strict';

const Enigma	= require('./enigma');
const eng	= new Enigma('magrathea');

let encodeString = eng.encode("Don't Panic!");
let decodeString = eng.decode(encodeString);
console.log('Encoded: ',encodeString);
console.log('Decoded: ',decodeString);


let qr = eng.qrgen('http://jeetendra.xyz','jeetendra.png');

qr ? console.log('QR Code Generated'): console.log('QR Generation failed');
