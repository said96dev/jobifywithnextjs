import React from 'react'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getChartsDataAction, getStatsAction } from '@/utils/actions'
import { ChartsContainer, StatsContainer } from '@/components/index'

async function StatePage() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['stats'],
        queryFn: () => getStatsAction(),
    })
    await queryClient.prefetchQuery({
        queryKey: ['charts'],
        queryFn: () => getChartsDataAction(),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StatsContainer />
            <ChartsContainer />
        </HydrationBoundary>
    )
}

export default StatePage