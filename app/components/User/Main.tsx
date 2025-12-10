'use client';

import React, { useState, useRef } from 'react';

// --- Interfaces ---

interface Video {
    id: string;
    thumbnailUrl: string;
    title: string;
    creator: string;
    views: string;
    postedAt: string;
}

// --- Mock Data ---

const MOCK_THUMBNAILS = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1593642532744-9377135e73ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1481487484168-9b930d5b7afd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1531297461136-82lw9b282538?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
];

const HOT_TREND_VIDEOS: Video[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `hot-${i}`,
    thumbnailUrl: MOCK_THUMBNAILS[i % MOCK_THUMBNAILS.length],
    title: `2025년 가장 핫한 트렌드 분석 ${i + 1}탄: 이것만 알면 끝`,
    creator: '트렌드 헌터',
    views: '120만회',
    postedAt: '2일 전',
}));

const ALL_RECOMMENDED_VIDEOS: Video[] = Array.from({ length: 24 }).map((_, i) => ({
    id: `rec-${i}`,
    thumbnailUrl: MOCK_THUMBNAILS[(i + 2) % MOCK_THUMBNAILS.length],
    title: `나만 알고 싶은 숨겨진 꿀팁 대방출 #${i + 1}`,
    creator: `크리에이터 ${i + 1}`,
    views: `${Math.floor(Math.random() * 900 + 10)}천회`,
    postedAt: `${Math.floor(Math.random() * 23 + 1)}시간 전`,
}));

// --- Components ---

const VideoCard = ({ video, isHorizontal = false }: { video: Video; isHorizontal?: boolean }) => {
    return (
        <div className={`group cursor-pointer flex flex-col gap-3 ${isHorizontal ? 'w-80 flex-shrink-0' : 'w-full'}`}>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                </h3>
                <div className="text-sm text-gray-500">
                    <p>{video.creator}</p>
                    <p>
                        조회수 {video.views} • {video.postedAt}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function UserMain() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [recommendationLimit, setRecommendationLimit] = useState(8);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 600;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const loadMoreRecommendations = () => {
        setRecommendationLimit((prev) => Math.min(prev + 8, ALL_RECOMMENDED_VIDEOS.length));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

            {/* --- Section 1: Hot Trends (Carousel) --- */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        🔥 지금 뜨는 핫 트렌드
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Previous"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Next"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {HOT_TREND_VIDEOS.map((video) => (
                        <VideoCard key={video.id} video={video} isHorizontal={true} />
                    ))}
                </div>
            </section>

            {/* --- Section 2: Recommended for You (Grid) --- */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    ✨ 회원님을 위한 맞춤 추천
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {ALL_RECOMMENDED_VIDEOS.slice(0, recommendationLimit).map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>

                {recommendationLimit < ALL_RECOMMENDED_VIDEOS.length && (
                    <div className="flex justify-center">
                        <button
                            onClick={loadMoreRecommendations}
                            className="px-8 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                        >
                            더보기
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}