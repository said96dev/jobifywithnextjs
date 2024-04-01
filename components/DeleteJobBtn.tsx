import { Button } from './ui/button'
import { useDeleteJob } from '@/services/mutations'

const DeleteJobBtn = ({ id }: { id: string }) => {

    const { mutate, isPending } = useDeleteJob()

    return (
        <Button
            size="sm"
            disabled={isPending}
            onClick={() => {
                mutate(id)
            }}
        >
            {isPending ? 'deleting...' : 'delete'}
        </Button>)
}

export default DeleteJobBtn