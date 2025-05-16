import axios from 'axios';

export const fetchSeasonDetails = async (id: any, season: any) => {
	try {
		const req = await fetch(
			`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`,
			{
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				},
				cache: 'no-cache'
			}
		);
		const data = await req.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchTrending = async (type: string | undefined, period?: string | undefined) => {
	if (type == undefined) type = 'all';
	try {
		const req = await fetch(
			`https://api.themoviedb.org/3/trending/${type}/${period}?language=en-US`,
			{
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				},
				cache: 'no-cache'
			}
		);
		const data = await req.json();
		let results = data.results;
		let response: any = [];
		for (const item of results) {
			item['media_type'] = type == 'all' ? item.media_type : type;
			if (item['media_type'] !== 'movie' && item['media_type'] !== 'tv') {
				continue;
			}
			const details =
				item['media_type'] == 'movie'
					? await getMovieDetails(item.id)
					: item['media_type'] == 'tv'
						? await getSeriesDetails(item.id)
						: [];
			response.push({ ...details });
		}
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const fetchNetflix = async (type: string, appendDetails: boolean = false) => {
	try {
		const req = await fetch(
			`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_watch_providers=8`,
			{
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				},
				cache: 'no-cache'
			}
		);
		const data = await req.json();
		let results = data.results;
		if (appendDetails === true) {
			let response: any = [];
			await Promise.all(
				results.map(async (item: any) => {
					item['media_type'] = type;
					const details =
						item.media_type == 'movie'
							? await getMovieDetails(item.id)
							: await getSeriesDetails(item.id);
					response.push({ ...details });
					response.sort((a: any, b: any) => b.popularity - a.popularity);
				})
			);

			return response;
		} else {
			return results;
		}
	} catch (error) {
		console.log(error);
	}
};
export const fetchPrimeVideo = async (type: string, appendDetails: boolean = false) => {
	try {
		const req = await fetch(
			`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_watch_providers=2`,
			{
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				},
				cache: 'no-cache'
			}
		);
		const data = await req.json();
		let results = data.results;
		if (appendDetails === true) {
			let response: any = [];
			await Promise.all(
				results.map(async (item: any) => {
					item['media_type'] = type;
					const details =
						item.media_type == 'movie'
							? await getMovieDetails(item.id)
							: await getSeriesDetails(item.id);
					response.push({ ...details });
					response.sort((a: any, b: any) => b.popularity - a.popularity);
				})
			);

			return response;
		} else {
			return results;
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchNowPlaying = async () => {
	try {
		const req = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
			{
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				},
				cache: 'no-cache'
			}
		);
		const data = await req.json();
		const results = data.results;
		data.results.forEach((item: any) => {
			item['media_type'] = 'movie';
		});
		return results;
	} catch (error) {
		console.log(error);
	}
};

export const getSearchResult = async (query: string | undefined) => {
	try {
		const res = await axios.get(
			`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US`,
			{
				params: {
					page: 1
				},
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				}
			}
		);
		return res.data.results.filter((movie: any) => movie.popularity > 50 && movie.vote_average > 5);
	} catch (error) {
		console.log(error);
	}
};

export const getMovieDetails = async (movieId: any) => {
	try {
		const request = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits,videos,images,release_dates&include_image_language=en`,
			{
				method: 'GET',
				cache: 'no-cache',
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
				}
			}
		);
		const res = await request.json();
		res['media_type'] = 'movie';
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const getSeriesDetails = async (movieId: any) => {
	try {
		const request = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}`, {
			params: {
				append_to_response: 'credits,videos,images,content_ratings',
				include_image_language: 'en',
				language: 'en-US'
			},

			method: 'GET',
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
			}
		});
		const res = request.data;

		res['media_type'] = 'tv';
		return res;
	} catch (error) {
		console.log(error);
	}
};
