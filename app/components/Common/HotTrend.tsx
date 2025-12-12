'use client';
import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { motion, AnimatePresence } from "framer-motion";

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

const ITEMS_PER_PAGE = 4;

const generateVideos = (startIndex: number, count: number): Video[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `hot-${startIndex + i}-${Date.now()}`,
        thumbnailUrl: MOCK_THUMBNAILS[(startIndex + i) % MOCK_THUMBNAILS.length],
        title: `2025년 가장 핫한 트렌드 분석 ${startIndex + i + 1}탄: 이것만 알면 끝`,
        creator: '트렌드 헌터',
        views: '120만회',
        postedAt: '2일 전',
    }));
};

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

export const HotTrend = () => {

    const [pages, setPages] = useState<Video[][]>([generateVideos(0, ITEMS_PER_PAGE)]);
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const paginate = (newDirection: number) => {
        if (isAnimating) return;

        const nextPage = page + newDirection;

        // Prevent going before page 0
        if (nextPage < 0) return;

        setDirection(newDirection);

        // If next page exists in history, just go there
        if (nextPage < pages.length) {
            setPage(nextPage);
        } else {
            // Otherwise generate new page
            const lastVideoCount = pages.length * ITEMS_PER_PAGE;
            const newVideos = generateVideos(lastVideoCount, ITEMS_PER_PAGE);
            setPages(prev => [...prev, newVideos]);
            setPage(nextPage);
        }
    };

    return (
        <section className="overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    🔥 지금 뜨는 핫 트렌드
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => paginate(-1)}
                        disabled={page === 0 || isAnimating}
                        className={`p-2 rounded-full border transition-colors ${page === 0
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-gray-200 hover:bg-gray-100 text-gray-600'
                            }`}
                        aria-label="Previous"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        disabled={isAnimating}
                        className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Next"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative">
                <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="popLayout"
                    onExitComplete={() => setIsAnimating(false)}
                >
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        onAnimationStart={() => setIsAnimating(true)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {pages[page].map((video) => (
                            <VideoCard key={video.id} video={video} isHorizontal={false} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}