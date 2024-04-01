'use client'
import JobCard from './JobCard'
import ComplexButtonContainer from './ComplexButtonContainer';
import { useGetAllJobs } from '@/services/querys'

const JobsList = () => {
    const { data, isPending } = useGetAllJobs()
    const jobs = data?.jobs || [];
    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;
    if (isPending) return <h2 className='text-xl'>Please wait...</h2>;
    if (jobs.length < 1) {
        return <h2 className='text-xl'>No Jobs Found...</h2>;
    }
    return (
        <>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-xl font-semibold capitalize'>{count} jobs found</h2>
                {totalPages < 2 ? null : (
                    <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
                )}
            </div>
            <div className='grid md:grid-cols-2 gap-8'>
                {jobs.map((job) => {
                    return <JobCard key={job.id} job={job} />;
                })}
            </div>
        </>
    );
}
export default JobsList;