import * as constants from '@/utils/constant.js';

function loadEntryStatus() {
	return new Promise((resolve,reject) => {
		uni.request({
			url: `${constants.baseUrl}/entry/status`,
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {}
		});
	});
	
}

module.exports = {  
    loadEntryStatus: loadEntryStatus  
}