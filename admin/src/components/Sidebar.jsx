import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { useDoctorContext } from '../context/DoctorContext';

import {
    FiHome,
    FiUserPlus,
    FiUsers,
    FiCalendar,
    FiUser,
    FiClipboard,
    FiFileText,
    FiCheckSquare
} from 'react-icons/fi';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useDoctorContext();

    const navClass = ({ isActive }) =>
        `flex items-center gap-4 py-3.5 px-8 md:min-w-72 transition-all duration-200
        ${isActive
            ? 'bg-[#EEF0FF] border-r-4 border-primary text-primary font-medium'
            : 'hover:bg-gray-100 hover:scale-105'
        }`;

    return (
        <div className='min-h-screen bg-white border-r'>
            {/* ================= ADMIN SIDEBAR ================= */}
            {aToken && (
                <ul className='text-[#333] mt-6'>
                    <NavLink to="/admin-dashboard" className={navClass}>
                        <FiHome className="w-5 h-5" />
                        <p className='text-sm'>Bảng điều khiển</p>
                    </NavLink>

                    <NavLink to="/all-appointments" className={navClass}>
                        <FiClipboard className="w-5 h-5" />
                        <p className='text-sm'>Cuộc hẹn</p>
                    </NavLink>

                    <NavLink to="/add-doctor" className={navClass}>
                        <FiUserPlus className="w-5 h-5" />
                        <p className='text-sm'>Thêm bác sĩ</p>
                    </NavLink>

                    <NavLink to="/doctor-list" className={navClass}>
                        <FiUsers className="w-5 h-5" />
                        <p className='text-sm'>Danh sách bác sĩ</p>
                    </NavLink>

                    {/* 🔥 MENU MỚI: YÊU CẦU LỊCH LÀM */}
                    <NavLink to="/admin/schedule-requests" className={navClass}>
                        <FiCheckSquare className="w-5 h-5" />
                        <p className='text-sm'>Yêu cầu lịch làm</p>
                    </NavLink>

                    <NavLink to="/users" className={navClass}>
                        <FiUsers className="w-5 h-5" />
                        <p className='text-sm'>Danh sách người dùng</p>
                    </NavLink>

                    <NavLink to="/record-medical" className={navClass}>
                        <FiCalendar className="w-5 h-5" />
                        <p className='text-sm'>Hồ sơ bệnh án</p>
                    </NavLink>

                    <NavLink to="/work-schedule" className={navClass}>
                        <FiCalendar className="w-5 h-5" />
                        <p className='text-sm'>Lịch làm việc</p>
                    </NavLink>
                </ul>
            )}

            {/* ================= DOCTOR SIDEBAR ================= */}
            {dToken && (
                <ul className='text-[#333] mt-6'>
                    <NavLink to="/doctor-dashboard" className={navClass}>
                        <FiHome className="w-5 h-5" />
                        <p className='hidden md:block text-sm'>Bảng điều khiển</p>
                    </NavLink>

                    <NavLink to="/doctor-appointments" className={navClass}>
                        <FiClipboard className="w-5 h-5" />
                        <p className='hidden md:block text-sm'>Cuộc hẹn</p>
                    </NavLink>

                    <NavLink to="/doctor-profile" className={navClass}>
                        <FiUser className="w-5 h-5" />
                        <p className='hidden md:block text-sm'>Hồ sơ cá nhân</p>
                    </NavLink>

                    <NavLink to="/medical-records" className={navClass}>
                        <FiFileText className="w-5 h-5" />
                        <p className='hidden md:block text-sm'>Hồ sơ bệnh án</p>
                    </NavLink>

                    <NavLink to="/doctor-schedule" className={navClass}>
                        <FiCalendar className="w-5 h-5" />
                        <p className='hidden md:block text-sm'>Đăng kí lịch làm việc</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
