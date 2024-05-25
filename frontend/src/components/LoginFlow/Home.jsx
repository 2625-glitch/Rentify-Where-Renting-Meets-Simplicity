import PropertyCard from './PropertyCard';

const Home = () => {
  const properties = [
    {
      seller: { name: 'John Doe' },
      location: '123 Main St, Springfield',
      area: 1500,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['Pool', 'Garage', 'Garden'],
    },
    {
      seller: { name: 'Jane Smith' },
      location: '456 Elm St, Springfield',
      area: 1800,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ['Gym', 'Patio', 'Fireplace'],
    },
    {
      seller: { name: 'Alice Johnson' },
      location: '789 Oak St, Springfield',
      area: 1200,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ['Basement', 'Deck', 'Fenced Yard'],
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
};

export default Home;
