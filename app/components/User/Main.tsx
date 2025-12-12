'use client';

import React, { useState, useRef } from 'react';
import { HotTrend } from '../Common/HotTrend';
import { Recommendation } from '../Common/Recommendation';
import { Category } from '@/types/category';


export default function UserMain({ userCategory, hotTrend }: { userCategory: Category[], hotTrend: Video[] }) {


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

            <HotTrend hotTrend={hotTrend} />

            {/* --- Section 2: Recommended for You (Grid) --- */}
            <Recommendation />

            {userCategory && userCategory.map((category) => (
                <Recommendation key={category.id} userCategory={category} />
            ))}


        </div>
    );
}