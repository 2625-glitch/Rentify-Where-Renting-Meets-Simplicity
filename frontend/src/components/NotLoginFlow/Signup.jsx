import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Validate First Name
    if (!formData.firstName) {
      tempErrors.firstName = "First Name is required.";
      isValid = false;
    } else if (/\d/.test(formData.firstName)) {
      tempErrors.firstName = "First Name should not contain numbers.";
      isValid = false;
    }

    // Validate Last Name
    if (!formData.lastName) {
      tempErrors.lastName = "Last Name is required.";
      isValid = false;
    } else if (/\d/.test(formData.lastName)) {
      tempErrors.lastName = "Last Name should not contain numbers.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setErrors({});
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
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="John"
              required
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Doe"
              required
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
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
