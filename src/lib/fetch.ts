import axios from 'axios';

export const fetchTrending = async (period: string | undefined) => {
	try {
		const req = await fetch(`https://api.themoviedb.org/3/trending/all/${period}?language=en-US`, {
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E'
			},
			cache: 'no-cache'
		});
		const data = await req.json();
		return data.results;
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
		data.results.forEach((item: any) => {
			item['media_type'] = 'movie';
		});
		return data.results;
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
		return res.data.results.filter(
			(movie: any) =>
				movie.popularity > 10 && // Adjust threshold as needed
				movie.vote_average > 7 && // Minimum rating
				movie.vote_count > 100 // Minimum number of svotes
		);
	} catch (error) {
		console.log(error);
	}
};
