{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as result, index}
	<div class="group item relative flex w-auto items-center" style="flex: 0 0 auto">
		<p
			class="group-hover:text-color-3/10 list-number center-div w-auto font-[Lato,Lato-fallback,Arial,sans-serif] text-[150px] font-semibold text-[#ffffff1e] max-sm:text-[100px]"
		>
			{index + 1}
		</p>
		<div class=" h-auto w-[320px] translate-x-[-10px] overflow-hidden max-sm:w-[170px]">
			<div
				class="skeleton image-container relative h-[180px] w-full overflow-hidden rounded-md max-sm:h-[95.5px]"
			></div>
			<p class="skeleton my-1 h-2 w-[80%]"></p>
		</div>
	</div>
{/each}
