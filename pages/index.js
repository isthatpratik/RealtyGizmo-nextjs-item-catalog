import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query) => {
    setLoading(true);
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await res.json();
    setBooks(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks('javascript');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchBooks(searchTerm);
    }
  };

  return (
    <div className="font-[Geist] min-h-screen bg-background flex flex-col">
      <header className="text-center mb-8 bg-gray-900 py-8 shadow-md">
        <h1 className="text-6xl font-bold text-white">Book Explorer</h1>
        <p className="text-gray-300 mt-2">Search and discover books effortlessly.</p>
      </header>

      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500"
            placeholder="Search for books..."
            required
          />
        </div>
      </form>

      {loading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ml-6 mr-6">
          {books.map((book) => (
            <div key={book.id} className="flex justify-center">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
