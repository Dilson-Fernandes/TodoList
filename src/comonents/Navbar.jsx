import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-slate-600 flex justify-between py-3 text-md font-bold text-white ">
        <div className='mx-8 text-lg border-0 rounded-full bg-slate-400 px-2'>
            <span>TaskIt</span>
        </div>
        <ul className='flex gap-4 mx-3 '>
            <li className="hover:bg-slate-400 hover:rounded-lg px-3">Home</li>
            <li className='hover:bg-slate-400 hover:rounded-lg px-3'>About</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
