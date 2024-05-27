/* eslint-disable no-undef */
import PropertyCard from './PropertyCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    area: '',
    amenities: '',
    bathrooms: '',
    location: '',
  });
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };
  const filterProperties = () => {
    let filtered = properties;
    if (searchCriteria.location) {
      filtered = filtered.filter((property) =>
        property.location
          .toLowerCase()
          .includes(searchCriteria.location.toLowerCase())
      );
    }
    if (searchCriteria.area) {
      filtered = filtered.filter(
        (property) => property.area === parseInt(searchCriteria.area, 10)
      );
    }
    if (searchCriteria.bathrooms) {
      filtered = filtered.filter(
        (property) =>
          property.bathrooms === parseInt(searchCriteria.bathrooms, 10)
      );
    }
    if (searchCriteria.amenities) {
      const amenitiesArray = searchCriteria.amenities
        .split(',')
        .map((a) => a.trim().toLowerCase());
      filtered = filtered.filter((property) =>
        amenitiesArray.every((amenity) =>
          property.amenities.map((a) => a.toLowerCase()).includes(amenity)
        )
      );
    }
    setFilteredProperties(filtered);
  };
  const handleClearFilters = () => {
    setSearchCriteria({
      area: '',
      amenities: '',
      bathrooms: '',
      location: '',
    });
    setFilteredProperties(properties);
  };

  useEffect(() => {
    filterProperties();
  }, [searchCriteria, properties]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('backe nd url is', backendUrl);
        const response = await axios.get(`${backendUrl}/v1/property`);
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center mb-4 py-4">
        <SearchIcon style={{ paddingtop: '4px', marginTop: '2' }} />
        <input
          type="text"
          name="location"
          value={searchCriteria.location}
          onChange={handleSearchChange}
          placeholder="Search by Location"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="number"
          name="area"
          value={searchCriteria.area}
          onChange={handleSearchChange}
          placeholder="Search by Area"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="number"
          name="bathrooms"
          value={searchCriteria.bathrooms}
          onChange={handleSearchChange}
          placeholder="Search by Bathrooms"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          name="amenities"
          value={searchCriteria.amenities}
          onChange={handleSearchChange}
          placeholder="Search by Amenities (comma-separated)"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleClearFilters}
          className="p-2 bg-gray-500 text-white rounded mr-2"
        >
          Clear Filters
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
