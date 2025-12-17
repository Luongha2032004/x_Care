
import React, { useEffect } from 'react';
import { useAdminContext } from '../../context/AdminContext';
import moment from 'moment';

const getCurrentWeekDates = () => {
  const startOfWeek = moment().startOf('isoWeek');
  return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'));
};

const WorkSchedule = () => {
  const { doctors, getAllDoctors } = useAdminContext();
  const weekDates = getCurrentWeekDates();

  useEffect(() => {
    getAllDoctors();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Lịch làm việc trong tuần</h1>
      <div className="bg-white p-6 rounded-xl shadow text-gray-700 overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-2">Bác sĩ</th>
              {weekDates.map(date => (
                <th key={date} className="border px-3 py-2 text-center">{moment(date).format('dd DD/MM')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors && doctors.length > 0 ? doctors.map(doc => (
              <tr key={doc._id}>
                <td className="border px-3 py-2 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img src={doc.image} alt={doc.name} className="w-8 h-8 rounded-full object-cover border" />
                    <span>{doc.name}</span>
                  </div>
                </td>
                {weekDates.map(date => (
                  <td key={date} className="border px-2 py-2 text-center align-top">
                    {doc.workingSchedule && doc.workingSchedule[date] && doc.workingSchedule[date].length > 0 ? (
                      <ul className="space-y-1">
                        {doc.workingSchedule[date].map((slot, idx) => (
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
            )) : (
              <tr>
                <td colSpan={weekDates.length + 1} className="text-center py-8 text-gray-400">Không có dữ liệu bác sĩ.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkSchedule;
