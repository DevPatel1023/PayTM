import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <div className='w-full mb-4'>
      <button onClick={onClick} className='w-full block py-2 rounded bg-black text-white text-center hover:bg-gray-800 transition-colors duration-300'>{text}</button>
    </div>
  )
}

export default Button
