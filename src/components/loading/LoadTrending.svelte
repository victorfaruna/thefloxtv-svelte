{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as result, index}
	<div class="group item w-auto h-auto flex relative" style="flex: 0 0 auto">
		<p
			class="group-hover:text-color-3/10 list-number w-auto h-auto center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]"
		>
			{index + 1}
		</p>
		<div class=" w-[180px] sm:w-[150px] h-auto relative translate-x-[-10px]">
			<div
				class="group-hover:opacity-[1] opacity-[0] duration-[0.7s] w-full h-full rounded-md absolute z-[2] bg-gradient-to-t from-color-3 via-color-3/30 to-[transparent] flex items-center justify-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="bi bi-play-circle-fill size-[50px] sm:size-[45px] text-black"
					viewBox="0 0 16 16 "
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
					/>
				</svg>
			</div>
			<div class="object-cover skeleton rounded-md w-full h-[270px] sm:h-[225px] shadow-2xl"></div>
			<p class="my-2 h-3 skeleton rounded-sm"></p>
			<p class="w-[60%] my-2 h-3 skeleton rounded-sm"></p>
		</div>
	</div>
{/each}
