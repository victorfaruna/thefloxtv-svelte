import * as Cheerio from 'cheerio';
import axios from 'axios';
export async function GET() {
	try {
		const { data } = await axios.get('https://imdb.com', {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
			}
		});
		const $ = Cheerio.load(data);
		const titles = $('.topten-title');
		console.log(titles);
		return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
