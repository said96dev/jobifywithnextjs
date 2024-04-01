
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJobAction, updateJobAction } from "@/utils/actions"
import { toast } from "sonner"
import { CreateAndEditJobType } from "@/utils/types"
import { useRouter } from 'next/navigation'
import { deleteJobAction } from '@/utils/actions'

export function useDeleteJob() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteJobAction(id),
        onSuccess: (data) => {
            if (!data) return toast.error("there was an error deleting")
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            queryClient.invalidateQueries({ queryKey: ['charts'] })
            toast.success(`the job be company ${data?.company} deleted successfully`)
        }
    })
}
export function useCreateJob() {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
        onSuccess: (data) => {
            if (!data) {
                toast.error('there was an error')
                return
            }
            toast.success('job created')
            queryClient.invalidateQueries({ queryKey: ['jobs'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            queryClient.invalidateQueries({ queryKey: ['charts'] })

            router.push('/jobs')
            // form.reset();
        },
    })
}

export function useUpdateJob() {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (variables: { jobId: string, values: CreateAndEditJobType }) => updateJobAction(variables),
        onSuccess(data) {
            if (!data) {
                toast.error('there was an error')
                return
            }
            toast.success('job updated')
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['job', data.id] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
        },
    })
}