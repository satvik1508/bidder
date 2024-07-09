import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const {Component} = props
    const Navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            Navigate('/')
        }
    })

  return (
    <div>
        <Component />
    </div>
  )
}

export default Protected