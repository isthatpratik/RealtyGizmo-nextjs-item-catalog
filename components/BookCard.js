import Link from 'next/link';

const BookCard = ({ book }) => {
  const { title, description, imageLinks } = book.volumeInfo;

  return (
    <div className="border border-gray-300 rounded-md bg-white shadow-md hover:shadow-lg p-4 flex ml-4 mr-4 mb-2">
      <img
        src={imageLinks?.thumbnail || 'default-book-cover.jpg'}
        alt={title}
        className="w-1/3 h-auto object-cover rounded-md"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow h-14 overflow-hidden">
          {description ? description.substring(0, 100) + '...' : 'No description available'}
        </p>
        <Link href={`/${book.id}`}>
          <span className="text-blue-500 hover:underline">View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
