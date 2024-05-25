import { useState } from 'react';
import axios from 'axios';

export const UploadProperty = () => {
  const [formData, setFormData] = useState({
    seller: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.seller) formErrors.seller = 'Seller is required';
    if (!formData.location) formErrors.location = 'Location is required';
    if (!formData.area || isNaN(formData.area))
      formErrors.area = 'Valid area is required';
    if (!formData.bedrooms || isNaN(formData.bedrooms))
      formErrors.bedrooms = 'Valid number of bedrooms is required';
    if (!formData.bathrooms || isNaN(formData.bathrooms))
      formErrors.bathrooms = 'Valid number of bathrooms is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Clear errors
    setErrors({});

    // Add your API endpoint here
    const API_ENDPOINT = 'https://your-backend-api/properties';

    try {
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Property uploaded successfully');
        // Clear the form
        setFormData({
          seller: '',
          location: '',
          area: '',
          bedrooms: '',
          bathrooms: '',
          amenities: '',
        });
      } else {
        alert('Failed to upload property');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="seller"
            className="block text-sm font-medium text-gray-700"
          >
            Seller
          </label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.seller && (
            <p className="text-red-500 text-xs mt-1">{errors.seller}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700"
          >
            Area
          </label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.area && (
            <p className="text-red-500 text-xs mt-1">{errors.area}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.bedrooms && (
            <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="bathrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.bathrooms && (
            <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="amenities"
            className="block text-sm font-medium text-gray-700"
          >
            Amenities
          </label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Comma-separated values"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload Property
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;
