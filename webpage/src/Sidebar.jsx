import React from 'react'
import { FaStethoscope, FaHome, FaTachometerAlt,FaUser,FaSearch,FaFileAlt,FaBars } from 'react-icons/fa';
import {BsGrid1X2Fill} from 'react-icons/bs';

function Sidebar() {
  return (
    <aside id='sidebar'>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
        <BsGrid1X2Fill size={20} color="white" className='icon'/>DASHBOARD
        </div>
        <span className='icon close_icon'>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="">
          <FaHome size={25} color="cyan" className='icon' /> Home
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
          <FaUser size={25} color="cyan" className='icon'/> Patients
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
          <FaStethoscope size={25} color="cyan" className='icon' /> Physician
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
          <FaSearch size={25} color="cyan" className='icon'/> Search
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
          <FaFileAlt size={25} color="cyan" className='icon'/> Reports
          </a>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar