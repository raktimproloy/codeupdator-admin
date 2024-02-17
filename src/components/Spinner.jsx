import React from 'react'

function Spinner({showLoading}) {
  return (
    <div className={`flex justify-center rounded items-center fixed  w-56 bg-black-500 mx-auto inset-x-0 mx-auto py-2 transition ease-in-out delay-300 ${showLoading ? "top-5 opacity-1 visible" : "-top-[10%] opacity-0 invisible" }`}>
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        <p className='ml-5'>Loading...</p>
    </div>
  )
}

export default Spinner