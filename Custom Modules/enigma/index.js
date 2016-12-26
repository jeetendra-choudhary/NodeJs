'use strict';

const crypto 	= require('crypto');
const qr 	= require('qr-image');
const fs	= require('fs');

module.exports = function(key){
	this.key = key;
	return {
		'encode':(str) => {
			let encoder = crypto.createCipher('aes-256-ctr',this.key);
			return encoder.update(str,'utf8','hex');		
		},
		'decode':(str) => {
			let decoder = crypto.createDecipher('aes-256-ctr',this.key);
			return decoder.update(str,'hex','utf8');		
		},
		'qrgen':(data,file) => {
			let dataToEncode = data || null;
			let imageOut = file || null;

			if(dataToEncode !== null && file !== null){
				qr.image(dataToEncode,{
					type:'png',
					size:20
				}).pipe(fs.createWriteStream(imageOut));
				return true;
			} else {
				return false;
			}
		}
	}
}
