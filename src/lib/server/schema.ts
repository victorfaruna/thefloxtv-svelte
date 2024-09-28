import { integer, pgTable, serial, text, doublePrecision } from 'drizzle-orm/pg-core';

export const mainTable = pgTable('main', {
	id: serial('id').primaryKey(),
	tmdb_id: integer('tmdb_id').notNull(),
	imdb_id: text('imdb_id').default(''),
	title: text('title').default(''),
	name: text('name').default(''),
	overview: text('overview').default(''),
	popularity: text('popularity').default(''),
	content_rating: text('content_rating').default(''),
	vote_average: doublePrecision('vote_average').default(0),
	vote_count: doublePrecision('vote_count').default(0),
	runtime: text('runtime').default(''),
	release_date: text('release_date').default(''),
	first_air_date: text('first_air_date').default(''),
	last_air_date: text('last_air_date').default(''),
	last_season: text('last_season').default(''),
	last_episode: text('last_episode').default(''),
	genre1: text('genre1').default(''),
	genre2: text('genre2').default(''),
	genre3: text('genre3').default(''),
	poster_path: text('poster_path').default(''),
	backdrop_path: text('backdrop_path').default(''),
	logo_path: text('logo_path').default(''),
	media_type: text('media_type').default('')
});

export const forYouTable = pgTable('foryou', {
	id: serial('id').primaryKey(),
	tmdb_id: integer('tmdb_id').notNull(),
	imdb_id: text('imdb_id').default(''),
	title: text('title').default(''),
	name: text('name').default(''),
	overview: text('overview').default(''),
	popularity: text('popularity').default(''),
	content_rating: text('content_rating').default(''),
	vote_average: doublePrecision('vote_average').default(0),
	vote_count: doublePrecision('vote_count').default(0),
	runtime: text('runtime').default(''),
	release_date: text('release_date').default(''),
	first_air_date: text('first_air_date').default(''),
	last_air_date: text('last_air_date').default(''),
	last_season: text('last_season').default(''),
	last_episode: text('last_episode').default(''),
	genre1: text('genre1').default(''),
	genre2: text('genre2').default(''),
	genre3: text('genre3').default(''),
	poster_path: text('poster_path').default(''),
	backdrop_path: text('backdrop_path').default(''),
	logo_path: text('logo_path').default(''),
	media_type: text('media_type').default('')
});

export const trendingMoviesTable = pgTable('trending_movies', {
	id: serial('id').primaryKey(),
	tmdb_id: integer('tmdb_id').notNull(),
	imdb_id: text('imdb_id').default(''),
	title: text('title').default(''),
	name: text('name').default(''),
	overview: text('overview').default(''),
	popularity: text('popularity').default(''),
	vote_average: doublePrecision('vote_average').default(0),
	vote_count: doublePrecision('vote_count').default(0),
	runtime: text('runtime').default(''),
	release_date: text('release_date').default(''),
	first_air_date: text('first_air_date').default(''),
	last_air_date: text('last_air_date').default(''),
	last_season: text('last_season').default(''),
	last_episode: text('last_episode').default(''),
	genre1: text('genre1').default(''),
	genre2: text('genre2').default(''),
	genre3: text('genre3').default(''),
	poster_path: text('poster_path').default(''),
	backdrop_path: text('backdrop_path').default(''),
	logo_path: text('logo_path').default(''),
	media_type: text('media_type').default('')
});

export const trendingTvTable = pgTable('trending_tv', {
	id: serial('id').primaryKey(),
	tmdb_id: integer('tmdb_id').notNull(),
	imdb_id: text('imdb_id').default(''),
	title: text('title').default(''),
	name: text('name').default(''),
	overview: text('overview').default(''),
	popularity: text('popularity').default(''),
	vote_average: doublePrecision('vote_average').default(0),
	vote_count: doublePrecision('vote_count').default(0),
	runtime: text('runtime').default(''),
	release_date: text('release_date').default(''),
	first_air_date: text('first_air_date').default(''),
	last_air_date: text('last_air_date').default(''),
	last_season: text('last_season').default(''),
	last_episode: text('last_episode').default(''),
	genre1: text('genre1').default(''),
	genre2: text('genre2').default(''),
	genre3: text('genre3').default(''),
	poster_path: text('poster_path').default(''),
	backdrop_path: text('backdrop_path').default(''),
	logo_path: text('logo_path').default(''),
	media_type: text('media_type').default('')
});

export type SelectMain = typeof mainTable.$inferSelect;
export type SelectForYou = typeof forYouTable.$inferSelect;
export type SelectTrendingMovies = typeof trendingMoviesTable.$inferSelect;
export type SelectTrendingTv = typeof trendingTvTable.$inferSelect;
