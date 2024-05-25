import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Correct usage of useAuth
  const { setUser } = useUser(); // Correct usage of useUser

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Validate Email
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      tempErrors.password = 'Password is required.';
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
        const response = await axios.post(
          'http://localhost:3000/v1/users/login',
          {
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response:', response);

        if (response.status === 200) {
          const { token, user } = response.data.data;
          console.log('Login successful, token:', token);
          console.log('user data is', user);
          // Optionally save the token to localStorage
          localStorage.setItem('token', token);
          // Update AuthContext state
          login(token);
          // Update UserContext state
          setUser(user);
          navigate('/');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 md:flex-row">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-0">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="you@example.com"
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
                errors.password ? 'border-red-500' : 'border-gray-300'
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
              Log In
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Dont have an account?{'   '}
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
