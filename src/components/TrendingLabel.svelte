<script lang="ts">
	import { getLetterRange } from '$lib';
	let { data, type }: any = $props();
</script>

<div class="w-full flex gap-2 text-[12px] items-center justify-between px-[1px] py-2">
	<p>
		{type == 'movie'
			? getLetterRange(data.release_date, 4)
			: getLetterRange(data.first_air_date, 4)}
	</p>
	<p class="border border-[grey] rounded-xl px-[5px] py-[0.5px]">
		{type}
	</p>
	<p>
		{type == 'movie'
			? data.runtime + ' min'
			: `Season ${data.last_episode_to_air?.season_number ?? data.last_season ?? '?'}`}
	</p>
</div>
<div>
	<p
		class="text-[14px] sm:text-[12px] text-color-2/90 w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
	>
		{type == 'movie' ? data.title : data.name}
	</p>
</div>
