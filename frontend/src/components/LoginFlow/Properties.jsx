import { useEffect, useState } from 'react';
import axios from 'axios';
import SellerPropertyCard from './SellerPropertyCard';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import SearchIcon from '@mui/icons-material/Search';
import UploadProperty from './UploadProperty';
import Modal from './Modal';
const Properties = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [properties, setProperties] = useState([]);
  const { user } = useUser();
  const { token } = useAuth();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleUploadProperty = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchProperties();
  };
  const fetchProperties = async () => {
    try {
      if (user && user.id) {
        console.log('user id from frontend', user.id);
        const response = await axios.get(
          `${backendUrl}/v1/property/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('got propertues of user is', response.data);
        setProperties(response.data);
        setFilteredProperties(response.data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user, token]);

  useEffect(() => {
    filterProperties();
  }, [searchCriteria, properties]);

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
        <button
          onClick={handleUploadProperty}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Upload Property
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredProperties.map((property) => (
          <SellerPropertyCard
            key={property._id}
            property={property}
            onPropertyDeleted={fetchProperties}
            onPropertyEdited={fetchProperties}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UploadProperty onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Properties;
