{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as result, index}
	<div class="group item relative flex h-auto w-auto" style="flex: 0 0 auto">
		<p
			class="group-hover:text-color-3/10 list-number center-div h-auto w-auto font-[Lato,Lato-fallback,Arial,sans-serif] text-[150px] font-semibold text-[#ffffff1e] max-sm:text-[100px]"
		>
			{index + 1}
		</p>
		<div class=" relative h-auto w-[180px] translate-x-[-10px] max-sm:w-[150px]">
			<div
				class="from-color-3 via-color-3/30 absolute z-[2] flex h-full w-full items-center justify-center rounded-md bg-gradient-to-t to-[transparent] opacity-[0] duration-[0.7s] group-hover:opacity-[1]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-play-circle-fill size-[50px] text-black max-sm:size-[45px]"
					viewBox="0 0 16 16 "
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
					/>
				</svg>
			</div>
			<div
				class="skeleton h-[270px] w-full rounded-md object-cover shadow-2xl max-sm:h-[225px]"
			></div>
			<p class="skeleton my-2 h-3 rounded-sm"></p>
			<p class="skeleton my-2 h-3 w-[60%] rounded-sm"></p>
		</div>
	</div>
{/each}
