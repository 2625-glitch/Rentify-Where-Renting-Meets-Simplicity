import { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useUser(); // Correct usage of useUser
  const { token } = useAuth(); // Correct usage of useAuth

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (user && user.id) {
          console.log('user id from frontend', user.id);
          const response = await axios.get(
            `http://localhost:3000/v1/property/user/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProperties(response.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, [user, token]);

  return (
    <div className="flex flex-wrap justify-center">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default Properties;
