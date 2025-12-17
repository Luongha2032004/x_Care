import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorScheduleRequests = () => {
    const { aToken } = useContext(AdminContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/schedule-requests`,
                    {
                        headers: {
                            Authorization: `Bearer ${aToken}`
                        }
                    }
                );

                // 🔴 QUAN TRỌNG: bắt lỗi 404 / 401
                if (!res.ok) {
                    const text = await res.text();
                    console.error('API ERROR:', res.status, text);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                if (data.success) setRequests(data.requests);
            } catch (err) {
                console.error('Fetch error:', err);
            }
            setLoading(false);
        };

        if (aToken) fetchRequests();
    }, [aToken]);

    const handleApprove = async (doctorId) => {
        if (!window.confirm('Xác nhận duyệt lịch làm cho bác sĩ này?')) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/approve-schedule/${doctorId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${aToken}`
                    }
                }
            );

            if (!res.ok) {
                const text = await res.text();
                console.error('Approve error:', text);
                alert('Không duyệt được');
                return;
            }

            const data = await res.json();
            if (data.success) {
                setRequests(prev => prev.filter(d => d._id !== doctorId));
                alert('Đã duyệt lịch làm!');
            } else {
                alert(data.message || 'Duyệt thất bại!');
            }
        } catch (err) {
            alert('Lỗi khi duyệt!');
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                Yêu cầu lịch làm của bác sĩ
            </h2>

            {loading ? (
                <p>Đang tải...</p>
            ) : requests.length === 0 ? (
                <p>Không có yêu cầu nào.</p>
            ) : (
                <div className="space-y-6">
                    {requests.map(doc => (
                        <div key={doc._id} className="bg-white rounded-xl shadow p-6">
                            <p className="font-semibold text-lg">{doc.name}</p>
                            <p className="text-gray-500">{doc.email}</p>

                            <table className="mt-4 w-full border text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2">Ngày</th>
                                        <th className="border p-2">Giờ</th>
                                        <th className="border p-2">Phòng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(doc.workingScheduleRequest || {}).map(
                                        ([date, slots]) =>
                                            slots.map((slot, idx) => (
                                                <tr key={date + idx}>
                                                    <td className="border p-2">{date}</td>
                                                    <td className="border p-2">{slot.time}</td>
                                                    <td className="border p-2">Phòng {slot.room}</td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>

                            <button
                                className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
                                onClick={() => handleApprove(doc._id)}
                            >
                                Xác nhận lịch làm
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorScheduleRequests;
