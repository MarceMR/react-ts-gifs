import axios from 'axios';

export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    lang: 'es',
    api_key: '6sNllhkxEhVRkL7ZhCt91noofQUF6gCL',
  },
});
