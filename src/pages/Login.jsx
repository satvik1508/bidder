import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login',{email,password})
      // const token = response.data;
      localStorage.setItem('token',response.data.token)
      if(response.status === 200){
        console.log('User Logged In Successfully')
        if(response.data.role === 'admin'){
        window.location.href = '/profile'
        }else{
          window.location.href = '/Userdash'
        }
      }
    } catch (error) {
      console.error('User Login Failed',error.response.data)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
    <form onSubmit={handleSubmit}>
        <div>
            <label className='block text-gray-700'>Email</label>
            <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} 
                className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'
            />
        </div>

        <div>
            <label className='block text-gray-700'>Password</label>
            <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} 
                className='w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5'
            />
        </div>

        {/* <div>
        <label className='mt-2 block text-gray-700'>Select a Role:</label>
        <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)}
        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5">
            <option value="" disabled >Choose</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select>
        </div> */}

        <button type="submit" 
        className='w-full px-4 py-2 mt-4 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline'
        >Login</button>

        <p className='mt-4 block text-gray-700'>Not a User?</p>
        <Link to='/register' className='block text-blue-700 hover:underline'>Click Here To Register</Link>
    </form>
    </div>
  )
}

export default Login