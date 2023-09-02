import Api from '$lib/api/api';
let timer;
const debounce = (url, obj, method = 'put') => {
	return new Promise((resolve, reject) => {
		let timer;

		clearTimeout(timer);
		timer = setTimeout(async () => {
			obj['method'] = '_post';
			let response = null;
			try {
				if (method === 'put') {
					response = await Api.put(url, obj);
				} else if (method === 'post') {
					response = await Api.post(url, obj);
				}
				console.log('response', response);
				resolve(response);
			} catch (error) {
				console.error('Error:', error);
				reject(error);
			}
		}, 1000);
	});
};
export default debounce;
