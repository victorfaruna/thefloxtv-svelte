import { randomBytes, createDecipheriv, createCipheriv, pbkdf2Sync } from 'crypto';

interface EncryptedData {
	ct: string;
	iv: string;
	s: string;
}

interface Video {
	sourceID: string;
	stream: Stream;
}

interface Stream {
	id: string;
	type: string;
	playlist: string;
	flags: string[];
	captions: Caption[];
}

interface Caption {
	id: string;
	url: string;
	language: string; // I'm just too lazy to write all languages in an enum here ngl
	type: string; // could use an enum here but idk what the possible values are
	hasCorsRestrictions: boolean;
}

const API_URL = 'https://vidlink.pro/';
const keyHex: string = '2de6e6ea13a9df9503b11a6117fd7e51941e04a0c223dfeacfe8a1dbb6c52783';
// const keyClearKey: string = "1c80ed144253e87742a9d4563b8b650bbe8bd41729d31f112e90bc9b0458f122"; // Named it clear key because it's looking like widevine clear key
const algo: string = 'aes-256-cbc';

type MovieParams = {
	type: 'movie';
	id: string;
};

type TVParams = {
	type: 'tv';
	id: string;
	season: number;
	episode: number;
};

type AnimeParams = {
	type: 'anime';
	id: string;
	episode: number;
	dub?: boolean;
	fallback?: boolean;
};

type VideoParams = MovieParams | TVParams | AnimeParams;

async function getVideo(params: VideoParams): Promise<Video | undefined> {
	let url: string;
	const encodedId = Buffer.from(encrypt(params.id)).toString('base64');

	switch (params.type) {
		case 'tv':
			url = `${API_URL}/tv/${encodedId}/${params.season}/${params.episode}`;
			break;
		case 'anime':
			const dubParam = params.dub ? 'dub' : 'sub';
			const fallbackParam = params.fallback ? '?fallback=true' : '';
			url = `${API_URL}/anime/${encodedId}/${params.episode}/${dubParam}${fallbackParam}`;
			break;
		case 'movie':
			url = `${API_URL}/movie/${encodedId}`;
			break;
	}

	const response: Response = await fetch(url);
	if (!response.ok) {
		console.error('Error fetching video details:', response.statusText);
		return;
	}

	const decryptedData = decryptClearKey(await response.text());
	return JSON.parse(decryptedData);
}

function encrypt(data: string): string {
	const iv = randomBytes(16);
	const key = Buffer.from(keyHex, 'hex').slice(0, 32);

	const cipher = createCipheriv(algo, key, iv);
	let encrypted = cipher.update(data);
	encrypted = Buffer.concat([encrypted, cipher.final()]);

	return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decryptClearKey(data: string): string {
	const [ivHex, encryptedHex] = data.split(':');
	const iv = Buffer.from(ivHex, 'hex');
	const encrypted = Buffer.from(encryptedHex, 'hex');
	const key = Buffer.from(keyHex, 'hex').slice(0, 32);

	const decipher = createDecipheriv(algo, key, iv);
	let decrypted = decipher.update(encrypted);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

/*
Changed for new encryption method, it's stupid ngl
function decryptWithPassword(
  encryptedData: EncryptedData,
  password: string
): any {
  const { ct, iv, s } = encryptedData;
  const salt = Buffer.from(s, "hex");
  const ivBuffer = Buffer.from(iv, "hex");
  const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");

  const decipher = createDecipheriv(algo, key, ivBuffer);
  let decrypted = decipher.update(ct, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}
  */

export { getVideo };
export type {
	Video,
	Stream,
	Caption,
	EncryptedData,
	VideoParams,
	MovieParams,
	TVParams,
	AnimeParams
};
