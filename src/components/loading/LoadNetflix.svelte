{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as result, index}
	<div class="group item w-auto flex relative items-center" style="flex: 0 0 auto">
		<p
			class="group-hover:text-color-3/10 list-number w-auto center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]"
		>
			{index + 1}
		</p>
		<div class=" w-[320px] h-auto sm:w-[170px] translate-x-[-10px] overflow-hidden">
			<div
				class="skeleton rounded-md image-container w-full h-[180px] sm:h-[95.5px] overflow-hidden relative"
			></div>
			<p class="skeleton w-[80%] my-1 h-2"></p>
		</div>
	</div>
{/each}
