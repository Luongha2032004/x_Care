import React, { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDoctorContext } from '../../context/DoctorContext';

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const roomOptions = [1, 2, 3];

// Mỗi slot là { time, room }
const generateInitialSchedule = () => {
    const schedule = {};
    for (let i = 1; i <= 15; i++) { // Bắt đầu từ ngày mai
        const date = moment().add(i, 'days').format("YYYY-MM-DD");
        schedule[date] = [];
    }
    return schedule;
};


const getCurrentWeekDates = () => {
    const startOfWeek = moment().startOf('isoWeek');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'));
};

const DoctorSchedule = () => {
        const { docData, requestScheduleUpdate } = useDoctorContext();
        const weekDates = getCurrentWeekDates();
    const [newSchedule, setNewSchedule] = useState(generateInitialSchedule());
    const availableDates = Object.keys(newSchedule);
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Thêm hoặc cập nhật slot với số phòng
    const setSlotRoom = (date, time, room) => {
        const slots = newSchedule[date] || [];
        const idx = slots.findIndex(s => s.time === time);
        let updatedSlots;
        if (idx !== -1) {
            updatedSlots = [...slots];
            updatedSlots[idx] = { time, room };
        } else {
            updatedSlots = [...slots, { time, room }];
        }
        setNewSchedule(prev => ({ ...prev, [date]: updatedSlots }));
    };

    // Bỏ chọn slot
    const removeSlot = (date, time) => {
        const slots = newSchedule[date] || [];
        const updatedSlots = slots.filter(s => s.time !== time);
        setNewSchedule(prev => ({ ...prev, [date]: updatedSlots }));
    };

    // Validate schedule trước khi gửi
    const validateSchedule = (schedule) => {
        if (!schedule || Object.keys(schedule).length === 0) return "Bạn phải chọn ít nhất 1 ca làm việc.";
        for (const [date, slots] of Object.entries(schedule)) {
            if (!Array.isArray(slots) || slots.length === 0) return `Ngày ${date} chưa chọn ca làm việc.`;
            for (const slot of slots) {
                if (!slot.time) return `Ngày ${date} có ca chưa chọn giờ.`;
                if (!slot.room) return `Ngày ${date} ca ${slot.time} chưa chọn phòng.`;
            }
        }
        return "";
    };

    const handleSubmit = async () => {
        setError("");
        // Chỉ gửi các ngày có slot (không gửi ngày rỗng)
        const filteredSchedule = {};
        Object.entries(newSchedule).forEach(([date, slots]) => {
            if (Array.isArray(slots) && slots.length > 0) {
                filteredSchedule[date] = slots;
            }
        });
        const errMsg = validateSchedule(filteredSchedule);
        if (errMsg) {
            setError(errMsg);
            return;
        }
        setLoading(true);
        try {
            await requestScheduleUpdate(filteredSchedule, setError);
        } finally {
            setLoading(false);
        }
    };

    const isDateSelectable = (date) => {
        const dateStr = moment(date).format("YYYY-MM-DD");
        return availableDates.includes(dateStr);
    };

        return (
                <div className='p-6 max-w-5xl mx-auto'>
                        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Work Schedule Management</h2>

                        {/* Weekly schedule table */}
                        <div className="bg-white p-6 rounded-xl shadow text-gray-700 overflow-x-auto mb-8">
                                <h3 className="text-lg font-semibold mb-4 text-blue-700">Lịch làm việc tuần này</h3>
                                <table className="min-w-full border text-sm">
                                    <thead>
                                        <tr>
                                            {weekDates.map(date => (
                                                <th key={date} className="border px-3 py-2 text-center">{moment(date).format('dd DD/MM')}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {weekDates.map(date => (
                                                <td key={date} className="border px-2 py-2 text-center align-top">
                                                    {docData && docData.workingSchedule && docData.workingSchedule[date] && docData.workingSchedule[date].length > 0 ? (
                                                        <ul className="space-y-1">
                                                            {docData.workingSchedule[date].map((slot, idx) => (
                                                                <li key={idx} className="bg-blue-50 rounded px-2 py-1 inline-block mb-1">
                                                                    <span className="font-semibold text-blue-700">{slot.time}</span>
                                                                    <span className="ml-2 text-xs text-gray-500">Phòng {slot.room}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                                {/* Calendar */}
                                <div className='bg-white p-6 rounded-xl shadow'>
                                        <h3 className='text-lg font-semibold mb-4'>Select working days (next 15 days)</h3>
                                        <Calendar
                                                locale="en"
                                                onChange={(date) => {
                                                        const dateStr = moment(date).format("YYYY-MM-DD");
                                                        if (availableDates.includes(dateStr)) {
                                                                setSelectedDate(dateStr);
                                                        }
                                                }}
                                                tileDisabled={({ date }) => !isDateSelectable(date)}
                                                tileClassName={({ date }) => {
                                                        const dateStr = moment(date).format("YYYY-MM-DD");

                                                        if (!availableDates.includes(dateStr)) return 'pointer-events-none opacity-30';

                                                        return dateStr === selectedDate
                                                                ? 'bg-blue-600 text-white font-bold rounded-md'
                                                                : 'bg-blue-50 text-blue-900 font-medium hover:bg-blue-100 rounded-md';
                                                }}
                                                className="w-full border-none"
                                        />
                                </div>

                                {/* Time slots */}
                <div className='bg-white p-6 rounded-xl shadow'>
                    <h3 className='text-lg font-semibold mb-4 text-gray-700'>
                        Select time slots for <span className='text-blue-600'>{moment(selectedDate).format("DD/MM/YYYY")}</span>
                    </h3>
                    <div className='flex flex-col gap-2'>
                        {timeSlots.map(time => {
                            const slot = newSchedule[selectedDate]?.find(s => s.time === time);
                            return (
                                <div key={time} className='flex items-center gap-3'>
                                    <span className='w-16'>{time}</span>
                                    {slot ? (
                                        <>
                                            <span className='text-gray-700'>Phòng:</span>
                                            <select
                                                value={slot.room}
                                                onChange={e => setSlotRoom(selectedDate, time, Number(e.target.value))}
                                                className='border rounded px-2 py-1'
                                            >
                                                {roomOptions.map(room => (
                                                    <option key={room} value={room}>Phòng {room}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => removeSlot(selectedDate, time)}
                                                className='ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs'
                                            >Bỏ</button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setSlotRoom(selectedDate, time, 1)}
                                            className='px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                        >
                                            Chọn
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Submit */}

            <div className='text-center mt-4'>
                {error && <div className="mb-2 text-red-600 font-medium">{error}</div>}
                <button
                    onClick={handleSubmit}
                    className={`px-8 py-3 bg-green-600 text-white font-semibold text-lg rounded-full hover:bg-green-700 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Đang gửi...' : 'Gửi yêu cầu lịch làm việc'}
                </button>
            </div>

            {/* Debug section removed as requested */}
        </div>
    );
};

export default DoctorSchedule;
