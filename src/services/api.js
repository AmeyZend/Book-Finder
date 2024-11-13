import axios from 'axios';

const api = axios.create({
  baseURL: 'https://openlibrary.org/search.json?title={bookTitle}',
});

export default api;
