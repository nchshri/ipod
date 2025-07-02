import { useEffect, useState } from 'react';
import querystring from 'querystring';
import { Buffer } from 'buffer';
import './styles.css'

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const client_id = '<client_id>';
const client_secret = '<client_secret>';
const refresh_token = '<refresh_token>';

export const getAccessToken = async (client_id, client_secret, refresh_token) => {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
        }),
    });

  return response.json();
};

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken(client_id, client_secret, refresh_token);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      throw new Error('Unable to Fetch Song');
    } else if(response.status === 204) {
      throw new Error('Currently Not Playing')
    }

    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((artist) => artist.name).join(', ');
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      title,
      timePlayed,
      timeTotal,
    };
  } catch (error) {
    console.error('Error fetching currently playing song: ', error);
    return error.message.toString();
  }
};

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const data = await getNowPlaying();
      setNowPlaying(data)
    };

    setInterval(() => {
      fetchNowPlaying();
    }, 1000);

  }, []);

  let secondsPlayed = 0, minutesPlayed = 0, secondsTotal = 0, minutesTotal = 0;
  let albumImageUrl = '/albumCover.png'
  let title = ''
  let artist = ''

  if (nowPlaying != null && nowPlaying.title) {
    secondsPlayed = Math.floor(nowPlaying.timePlayed/1000);
    minutesPlayed = Math.floor(secondsPlayed/60);
    secondsPlayed = secondsPlayed % 60;

    secondsTotal = Math.floor(nowPlaying.timeTotal/1000);
    minutesTotal = Math.floor(secondsTotal/60);
    secondsTotal = secondsTotal % 60;

    albumImageUrl = nowPlaying.albumImageUrl
    title = nowPlaying.title
    artist = nowPlaying.artist
  } else if (nowPlaying === 'Currently Not Playing') {
    title = 'user is'
    artist = 'currently offline'
  } else {
    title = 'failed to'
    artist = 'fetch song'
  }

  const pad = (n) =>{
    return (n < 10) ? ("0" + n) : n;
  }

  return (
    <div className='ipod'>
      <div className='screen'>
        <section className='info'>
          <div className='current'>
            <h1 className='song'>{title}</h1>
          </div>
          <h2 className='artist'>{artist}</h2>
          <h2 className='nowPlayingTime'>
            {pad(minutesPlayed)}:{pad(secondsPlayed)} / {pad(minutesTotal)}:{pad(secondsTotal)}
          </h2>
        </section>
        <img className='albumCover' src={albumImageUrl} alt="Album" />
      </div>

      <img className='control' src={'/ipod wheel.png'} alt='ipod wheel'/>
    </div>
  );
};

export default NowPlaying;