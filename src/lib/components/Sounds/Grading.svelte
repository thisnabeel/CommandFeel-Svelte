<script>
	import { correctSound, incorrectSound } from '$lib/stores/view';

	let correctAudio;
	let incorrectAudio;

	correctSound.subscribe((count) => {
		if (count > 0) {
			correctAudio.currentTime = 0;
			correctAudio.play();
		}
	});

	incorrectSound.subscribe((count) => {
		if (count > 0) {
			incorrectAudio.currentTime = 0;
			incorrectAudio.play();
		}
	});
</script>

<audio src="/passing.mp3" bind:this={correctAudio} />
<audio src="/failing.mp3" bind:this={incorrectAudio} />
