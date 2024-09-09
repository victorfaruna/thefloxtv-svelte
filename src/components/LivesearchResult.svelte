<script lang="ts">
	import { getSearchResult } from '$lib/fetch';
	import { getLetterRange } from '$lib/index';
	export let query;
	let isLoading = true;
	let data: any;

	const fetchMatchingResult = async (q: any) => {
		isLoading = true;
		const response = await getSearchResult(q);
		data = response;
		isLoading = false;
	};
	$: fetchMatchingResult(query);
</script>

{#if isLoading || query == ''}
	<div class="SearchResult">
		<div class="wrapper">
			<div class="item flex gap-[10px] my-[10px]">
				<div class="w-[40px] h-[50px] rounded-md object-cover skeleton"></div>
				<div class="w-full flex flex-col gap-2">
					<p class="w-[70%] h-3 rounded-sm skeleton opacity-[0.6]"></p>
					<p class="w-[40%] h-2 rounded-sm skeleton opacity-[0.4]"></p>
				</div>
			</div>
		</div>
	</div>
{:else if data.length == 0 || !data}
	<div class="SearchResult">
		<div class="wrapper">
			<p>No Result Found</p>
		</div>
	</div>
{:else}
	<div class="SearchResult">
		<div class="wrapper">
			{#each data as result}
				<a href={result.media_type == 'movie' ? `/movies/${result.id}` : `/tv/${result.id}`}>
					<div class="item flex gap-[10px] my-[10px]">
						<img
							class="w-[40px] h-[50px] rounded-sm object-cover"
							src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${
								result.media_type == 'movie' ? result.poster_path : result.poster_path
							}`}
							alt=""
							width={40}
							height={70}
						/>
						<div class="info text-[13px]">
							<p class="title text-[lightgrey]" style="text-shadow: 0.5px 0.5px 0.5px black">
								{result.media_type == 'movie' ? result.title : result.name}
							</p>
							<p class="sub text-color-3 text-[11px] font-light" style=" word-spacing: 3px">
								{result.media_type == 'movie' ? `Movie ` : `TV `}
								&middot; &nbsp;
								{result.media_type == 'movie'
									? getLetterRange(result.release_date, 4)
									: getLetterRange(result.first_air_date, 4)}
							</p>
						</div>
					</div>
				</a>{/each}
		</div>
	</div>
{/if}
