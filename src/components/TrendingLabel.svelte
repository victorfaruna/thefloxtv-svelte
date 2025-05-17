<script lang="ts">
	import { getLetterRange } from '$lib';
	let { data, type }: any = $props();
</script>

<div class="flex w-full items-center justify-between gap-2 px-[1px] py-2 text-[12px]">
	<p>
		{type == 'movie'
			? getLetterRange(data.release_date, 4)
			: getLetterRange(data.first_air_date, 4)}
	</p>
	<p class="rounded-xl border border-[grey] px-[5px] py-[0.5px]">
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
		class="text-color-2/90 w-full overflow-hidden text-[14px] overflow-ellipsis whitespace-nowrap max-sm:text-[12px]"
	>
		{type == 'movie' ? data.title : data.name}
	</p>
</div>
