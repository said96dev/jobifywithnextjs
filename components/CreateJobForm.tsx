'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    JobStatus,
    JobMode,
    createAndEditJobSchema,
    CreateAndEditJobType,
} from '@/utils/types'
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { CustomFormField, CustomFormSelect } from './FormComponents'
import { useCreateJob } from '@/services/mutations';
function CreateJobForm() {

    const { mutate, isPending } = useCreateJob()
    // 1. Define your form.
    const form = useForm<CreateAndEditJobType>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        },
    })

    function onSubmit(values: CreateAndEditJobType) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted p-8 rounded"
            >
                <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {/* position */}
                    <CustomFormField name="position" control={form.control} />
                    {/* company */}
                    <CustomFormField name="company" control={form.control} />
                    {/* location */}
                    <CustomFormField name="location" control={form.control} />

                    {/* job status */}
                    <CustomFormSelect
                        name="status"
                        control={form.control}
                        labelText="job status"
                        items={Object.values(JobStatus)}
                    />
                    {/* job  type */}
                    <CustomFormSelect
                        name="mode"
                        control={form.control}
                        labelText="job mode"
                        items={Object.values(JobMode)}
                    />

                    <Button
                        type='submit'
                        className='self-end capitalize'
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'create job'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default CreateJobForm