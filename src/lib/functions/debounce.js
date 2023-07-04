import Api from '$lib/api/api';
let timer;
const debounce = (url, obj) => {
	return new Promise((resolve, reject) => {
		let timer;

		clearTimeout(timer);
		timer = setTimeout(async () => {
			obj['method'] = '_post';
			try {
				const response = await Api.put(url, obj);
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
