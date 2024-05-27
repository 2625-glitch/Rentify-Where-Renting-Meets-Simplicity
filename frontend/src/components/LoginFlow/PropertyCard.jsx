/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const PropertyCard = ({ property }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/v1/users/${property.userId}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [property.userId]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="h-48 overflow-hidden">
        <img
          className="w-full"
          src="https://via.placeholder.com/400x300.png?text=House+Image"
          alt="House"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{property.location}</div>
        {user && (
          <p className="text-gray-700 text-base">
            Seller: {user.data.firstname} {user.data.lastname}
          </p>
        )}

        <p className="text-gray-700 text-base">Area: {property.area} sq ft</p>
        <p className="text-gray-700 text-base">Bedrooms: {property.bedrooms}</p>
        <p className="text-gray-700 text-base">
          Bathrooms: {property.bathrooms}
        </p>
        <div className="px-6 pt-4 pb-2">
          {property.amenities.map((amenity, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
