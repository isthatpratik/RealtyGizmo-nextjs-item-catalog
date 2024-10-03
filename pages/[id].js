import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        setLoading(true);
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await res.json();
        setBook(data);
        setLoading(false);
      };
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center text-gray-600">Book not found.</div>;
  }

  const { title, description, imageLinks, authors, publishedDate, pageCount, categories } = book.volumeInfo;

  const cleanDescription = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    const items = tempElement.querySelectorAll('li');
    items.forEach((item) => {
      const bulletPoint = document.createElement('span');
      bulletPoint.innerHTML = '• ';
      item.prepend(bulletPoint);
    });

    const paragraphs = tempElement.querySelectorAll('p');
    paragraphs.forEach((p) => {
      p.style.margin = '0.5em 0';
    });

    const lists = tempElement.querySelectorAll('ul, ol');
    lists.forEach((list) => {
      list.style.paddingLeft = '1em'; 
    });

    return tempElement.innerHTML.trim();
  };

  return (
    <div className="font-[Inter] min-h-screen bg-background flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 flex-shrink-0 p-4 m-6 sticky top-20 h-[80vh]">
        <img
          src={imageLinks?.thumbnail || '/default-book-cover.jpg'}
          alt={title}
          className="w-full h-auto object-contain rounded-md bg-gray-200"
          style={{ maxHeight: '500px' }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 m-6 mt-16">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Title:</h3>
          <p className="text-2xl font-bold text-gray-950">{title || 'Unknown Title'}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Description:</h3>
          <div
            className="text-lg text-gray-900"
            dangerouslySetInnerHTML={{ __html: cleanDescription(description) || 'No description available' }}
          />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Authors:</h3>
          <p className="text-gray-700">{authors?.join(', ') || 'Unknown author'}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Published Date:</h3>
          <p className="text-gray-700">{publishedDate || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Page Count:</h3>
          <p className="text-gray-700">{pageCount || 'N/A'} pages</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Categories:</h3>
          <p className="text-gray-700">{categories?.join(', ') || 'Uncategorized'}</p>
        </div>
      </div>
    </div>
  );
}
