import { EditJobForm } from '@/components/index'
import { getSingleJobAction } from '@/utils/actions'

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

async function JobDetailPage({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient()

    const job = await queryClient.prefetchQuery({
        queryKey: ['job', params.id],
        queryFn: () => getSingleJobAction(params.id),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditJobForm jobId={params.id} />
        </HydrationBoundary>
    )
}
export default JobDetailPage