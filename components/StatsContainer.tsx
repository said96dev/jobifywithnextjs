"use client"

import React from 'react'
import { useStats } from '@/services/querys'
import StatsCard from './StatsCard'
const StatsContainer = () => {
    const { data } = useStats()
    return (
        <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
            <StatsCard title='pending jobs' value={data?.pending || 0} />
            <StatsCard title='interviews set' value={data?.interview || 0} />
            <StatsCard title='jobs declined' value={data?.declined || 0} />
        </div>
    )
}

export default StatsContainer