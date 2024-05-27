import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    userType: "buyer", // default to buyer
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Validate First Name
    if (!formData.firstname) {
      tempErrors.firstname = "First Name is required.";
      isValid = false;
    } else if (/\d/.test(formData.firstname)) {
      tempErrors.firstname = "First Name should not contain numbers.";
      isValid = false;
    }

    // Validate Last Name
    if (!formData.lastname) {
      tempErrors.lastname = "Last Name is required.";
      isValid = false;
    } else if (/\d/.test(formData.lastname)) {
      tempErrors.lastname = "Last Name should not contain numbers.";
      isValid = false;
    }

    // Validate Email
    if (!formData.email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password should be at least 8 characters long.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log("user data in the frontend", formData);
        const response = await axios.post(`${backendUrl}/v1/users`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Form data submitted:", formData);
          alert("User signed up successfully");
          // Clear form
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            userType: "buyer",
          });
          setErrors({});
          navigate("/login");
        } else {
          alert("Failed to sign up user");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while signing up");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="John"
              required
            />
            {errors.firstname && (
              <p className="mt-2 text-sm text-red-600">{errors.firstname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Doe"
              required
            />
            {errors.lastname && (
              <p className="mt-2 text-sm text-red-600">{errors.lastname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="john.doe@example.com"
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700"
            >
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
