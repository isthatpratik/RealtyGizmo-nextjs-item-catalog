import Link from 'next/link';

const ItemCard = ({ item }) => {
  return (
    <div className="border rounded-md shadow-md p-4">
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description || "No description available"}</p>
      <Link href={`/${item.id}`}>
        <a className="text-blue-500 hover:underline">View Details</a>
      </Link>
    </div>
  );
};

export default ItemCard;
