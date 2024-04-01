import React from 'react'
import { CreateJobForm } from "@/components/index"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
const AddJobPage = () => {
    const queryClient = new QueryClient()
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CreateJobForm />
        </HydrationBoundary>
    )
}

export default AddJobPage