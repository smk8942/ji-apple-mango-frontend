'use client';

import React, { useState } from 'react';

// --- Interfaces ---

interface UserBasicInfo {
    name: string;
    email: string;
    avatarUrl: string;
    introduction: string;
}

interface UserInterest {
    id: string;
    name: string;
}

interface UserChannel {
    id: string;
    platform: 'YouTube' | 'Instagram' | 'TikTok' | 'Twitter';
    isConnected: boolean;
    handle?: string; // e.g., @username
}

// --- Mock Data ---

const INITIAL_BASIC_INFO: UserBasicInfo = {
    name: '홍길동',
    email: 'hong@example.com',
    avatarUrl: 'https://via.placeholder.com/150', // Placeholder
    introduction: '안녕하세요! 콘텐츠 크리에이터를 꿈꾸는 홍길동입니다.',
};

const INITIAL_INTERESTS: UserInterest[] = [
    { id: '1', name: '게임' },
    { id: '2', name: '먹방' },
    { id: '3', name: '브이로그' },
];

const INITIAL_CHANNELS: UserChannel[] = [
    { id: '1', platform: 'YouTube', isConnected: true, handle: 'hong_tv' },
    { id: '2', platform: 'Instagram', isConnected: false },
    { id: '3', platform: 'TikTok', isConnected: false },
    { id: '4', platform: 'Twitter', isConnected: true, handle: 'hong_tw' },
];

export default function UserDetail() {
    // --- State ---
    const [basicInfo, setBasicInfo] = useState<UserBasicInfo>(INITIAL_BASIC_INFO);
    const [interests, setInterests] = useState<UserInterest[]>(INITIAL_INTERESTS);
    const [channels, setChannels] = useState<UserChannel[]>(INITIAL_CHANNELS);

    const [newInterest, setNewInterest] = useState('');
    const [isEditingInfo, setIsEditingInfo] = useState(false);

    // --- Handlers ---

    // Basic Info
    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBasicInfo((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEditInfo = () => {
        if (isEditingInfo) {
            // Save logic would go here (API call)
            console.log('Saved Basic Info:', basicInfo);
        }
        setIsEditingInfo(!isEditingInfo);
    };

    // Interests
    const handleAddInterest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newInterest.trim()) return;
        const newItem: UserInterest = {
            id: Date.now().toString(),
            name: newInterest.trim(),
        };
        setInterests([...interests, newItem]);
        setNewInterest('');
    };

    const handleRemoveInterest = (id: string) => {
        setInterests(interests.filter((item) => item.id !== id));
    };

    // Channels
    const toggleChannelConnection = (id: string) => {
        setChannels(
            channels.map((channel) =>
                channel.id === id ? { ...channel, isConnected: !channel.isConnected } : channel
            )
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">내 정보 관리</h1>

            {/* --- Section 1: Basic Information --- */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">기본 정보</h2>
                    <button
                        onClick={toggleEditInfo}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditingInfo
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {isEditingInfo ? '저장' : '수정'}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Area */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                            <img
                                src={basicInfo.avatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {isEditingInfo && (
                            <button className="text-sm text-blue-600 font-medium hover:underline">
                                사진 변경
                            </button>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">이름</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={basicInfo.name}
                                    onChange={handleInfoChange}
                                    disabled={!isEditingInfo}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">이메일</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={basicInfo.email}
                                    disabled={true} // Usually email is not editable directly
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">소개</label>
                            <textarea
                                name="introduction"
                                value={basicInfo.introduction}
                                onChange={handleInfoChange}
                                disabled={!isEditingInfo}
                                rows={4}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section 2: Interests --- */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">관심사</h2>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                            <div
                                key={interest.id}
                                className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100"
                            >
                                <span>{interest.name}</span>
                                <button
                                    onClick={() => handleRemoveInterest(interest.id)}
                                    className="ml-2 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleAddInterest} className="flex gap-2 max-w-md">
                        <input
                            type="text"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            placeholder="관심사를 입력하고 엔터를 누르세요 (예: 여행, 독서)"
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!newInterest.trim()}
                            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            추가
                        </button>
                    </form>
                </div>
            </section>

            {/* --- Section 3: Channel Integration --- */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">채널 연동</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {channels.map((channel) => (
                        <div
                            key={channel.id}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${channel.isConnected
                                    ? 'border-blue-200 bg-blue-50/30'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${channel.platform === 'YouTube' ? 'bg-red-100 text-red-600' :
                                        channel.platform === 'Instagram' ? 'bg-pink-100 text-pink-600' :
                                            channel.platform === 'TikTok' ? 'bg-black text-white' :
                                                'bg-blue-100 text-blue-500' // Twitter/Default
                                    }`}>
                                    {/* Simple Icons based on platform */}
                                    {channel.platform === 'YouTube' && "Y"}
                                    {channel.platform === 'Instagram' && "I"}
                                    {channel.platform === 'TikTok' && "T"}
                                    {channel.platform === 'Twitter' && "X"}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{channel.platform}</h3>
                                    {channel.isConnected ? (
                                        <p className="text-xs text-blue-600 font-medium">연동됨 ({channel.handle})</p>
                                    ) : (
                                        <p className="text-xs text-gray-400">연동되지 않음</p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => toggleChannelConnection(channel.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${channel.isConnected
                                        ? 'border-red-200 text-red-600 hover:bg-red-50'
                                        : 'border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300'
                                    }`}
                            >
                                {channel.isConnected ? '해제' : '연동'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}