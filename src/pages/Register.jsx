import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {


  const [userData, setUserData] = useState({
    email:'',
    username:'',
    password:'',
    role:'',

  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const {username,email,password,role} = userData
      const response = await axios.post('http://localhost:3000/api/v1/register',{username,email,password,role})
      
      console.log('User Registered Successfully')
      
    } catch (error) {
      console.error('User Registration Failed',error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
        ...prevData,
        [name]: value
    }));
};


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit}>
      <div>
        <h1 className='text-2xl font-bold mb-7'>Auction Ace Register</h1>
      </div>
        <div>
          <label className='block text-gray-700'>Username</label>
          <input name="username" type="text" value={userData.username} onChange={handleChange} 
              className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'/>
        </div>

        <div>
        <label className='block text-gray-700'>Email</label>
        <input name="email" type="email" value={userData.email} onChange={handleChange}
          className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'
        />
        </div>

        <div>
          <label className='block text-gray-700'>Password</label>
          <input name="password" type="password" value={userData.password} onChange={handleChange} 
            className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'
          />
        </div>

        <div>
        <label className='mt-2 block text-gray-700'>Select a Role:</label>
        <select id="role" name="role" value={userData.role} onChange={handleChange}
        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5">
            <option value="" disabled>Choose</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select>
        </div>  

        <button type="submit" className='w-full px-4 py-2 mt-4 text-base font-semibold 
        text-white bg-blue-500 rounded-lg shadow-md 
        hover:bg-blue-700 focus:outline-none focus:shadow-outline'>Register</button>

        <p className='mt-4 block text-gray-700'>Already a User</p>
        <Link to='/' className='block text-blue-700 hover:underline'>Click Here To Login</Link>
      </form>
    </div>
  )
  
}

export default Register