"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllJobsAction, getStatsAction } from "@/utils/actions"
import { useSearchParams } from 'next/navigation';
export const useGetAllJobs = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const jobStatus = searchParams.get('jobStatus') || 'all';
    const pageNumber = Number(searchParams.get('page')) || 1;
    return useQuery({
        queryKey: ['jobs', search, jobStatus, pageNumber],
        queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
        staleTime: 1000 * 60 * 10,
    })
}

export const useStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => getStatsAction()
    })
}