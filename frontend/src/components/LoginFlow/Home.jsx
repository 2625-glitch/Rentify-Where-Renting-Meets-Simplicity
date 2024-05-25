import PropertyCard from './PropertyCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
};

export default Home;
