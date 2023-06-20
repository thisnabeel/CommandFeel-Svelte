import Api from '$lib/api/api';
let timer;
const debounce = (url, obj) => {
	clearTimeout(timer);
	timer = setTimeout(async () => {
		obj['method'] = '_post';
		const response = await Api.put(url, obj);
		// let response = await Api.get("/quizzes/"+quiz.id+".json")
		console.log('response', response);
	}, 1000);
};

export default debounce;
