import React from 'react'

const Home = () => {
    return (
      <div className="w-full min-h-[90vh] mx-auto grid grid-rows-2 lg:grid-cols-2 bg-slate-400 justify-center items-center">
        <div className="text-center  w-full bg-slate-300 p-4">
          <h2 className="text-xl  font-semibold">
            Welcome to Personal Finance Manager
          </h2>
          <p className="mt-4">Manage your personal finance with ease</p>
        </div>
        <div className="flex flex-col justify-center bg-slate-300 min-h-full w-full p-4 items-center">
          <div className='bg-white p-2 rounded-lg'>
            <h2></h2>
          </div>
        </div>
      </div>
    );
}

export default Home