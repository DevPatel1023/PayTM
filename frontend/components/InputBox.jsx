import React from 'react'

const InputBox = ({ title, type, placeholder,name,value,onChange }) => {
  return (
    <div className='w-full mb-4'>
      <label htmlFor={name}
        className='block items-start text-black text-sm font-bold mb-2 text-left'
      >
        {title}
      </label>
      <input 
        type={type}
        name={name}
        onChange={onChange}
        value={value} 
        id={title} 
        placeholder={placeholder}
        className='shadow appearance-none rounded border w-full py-2 px-3 text-gray-800 leading-tight focus:shadow-outline'
      />
    </div>
  )
}

export default InputBox