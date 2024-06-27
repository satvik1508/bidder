import React, { useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const [inputs, setInputs] = useState({
    productName: '',
    description: '',
    startingPrice: '',
    currentPrice: ''
  })

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevData => ({
        ...prevData,
        [name]: value
    }));
};

const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

const handleSubmit = async (e) => {
 e.preventDefault();
  const formData = new FormData();
  formData.append('productName', inputs.productName);
  formData.append('description', inputs.description);
  formData.append('startingPrice', inputs.startingPrice);
  formData.append('currentPrice', inputs.currentPrice);
  formData.append('image', image);

  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.post('http://localhost:3000/api/v1/items', formData,{
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log(response);
  } catch (error) {
    console.log('Error while creating item', error)
  }
}

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
    
    <form onSubmit={handleSubmit}>
    <h1 className='text-2xl font-bold mb-7'>Admin Dashboard</h1>
    <div>
      <label className='block text-gray-700'>Product Name</label>
        <input type='text' name='productName' placeholder='Product' value={inputs.productName} onChange={handleChange}
        className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'/>
    </div>

    <div>
      <label className='block text-gray-700'>Description</label>
        <textarea name='description' placeholder='Description' value={inputs.description} onChange={handleChange}
        className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'/>
    </div>

    <div>
      <label className='block text-gray-700'>Starting Price</label>
        <input type='number' name='startingPrice' placeholder='Starting Price' value={inputs.startingPrice} onChange={handleChange}
        className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'/>
    </div>

    <div>
      <label className='block text-gray-700'>Current Price</label>
      <input type='number' name='currentPrice' placeholder='Current Price' value={inputs.currentPrice} onChange={handleChange}
        className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'/>
    </div>

    <div>
          <label className='block text-gray-700'>Upload Image</label>
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'
          />
        </div>

        <button type='submit' className='w-full px-4 py-2 mt-4 text-base text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5'>
          Submit
        </button>
    </form>
    

    </div>
  )
}

export default Profile
