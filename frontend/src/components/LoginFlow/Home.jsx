/* eslint-disable no-undef */
import PropertyCard from './PropertyCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('backe nd url is', backendUrl);
        const response = await axios.get(`${backendUrl}/v1/property`);
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
