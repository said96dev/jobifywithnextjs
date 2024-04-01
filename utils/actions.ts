"use server"

import { GetAllJobsActionTypes, CreateAndEditJobType, JobType, createAndEditJobSchema } from "./types";
import prisma from "./db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client";
import dayjs from "dayjs"

function authenticateAndRedirect(): string {
    const { userId } = auth()
    if (!userId) redirect('/')
    return userId

}

export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null> {
    const userId = authenticateAndRedirect()
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        createAndEditJobSchema.parse(values)
        const job: JobType = await prisma.job.create({
            data: {
                ...values, clerkId: userId
            }
        })
        return job
    }
    catch (error) {
        console.error(error)
        return null
    }

}

export async function getAllJobsAction(values: GetAllJobsActionTypes): Promise<{
    jobs: JobType[];
    count: number;
    page: number;
    totalPages: number;
}> {
    try {

        const userId = authenticateAndRedirect()
        let whereClause: Prisma.JobWhereInput = {
            clerkId: userId,
        }
        if (values.search) {
            whereClause = {
                ...whereClause,
                OR: [
                    {
                        position: {
                            contains: values.search
                        },
                    },
                    {
                        company: {
                            contains: values.search
                        },
                    }
                ]
            }
        }
        if (values.jobStatus && values.jobStatus !== 'all') {
            whereClause = {
                ...whereClause,
                status: values.jobStatus
            }
        }

        const page = Number(values.page) || 1;
        const limit = Number(values.limit) || 10;
        const skip = (page - 1) * (limit);
        const jobs: JobType[] = await prisma.job.findMany({
            where: whereClause,
            skip: skip,
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        })

        const count = await prisma.job.count({
            where: whereClause
        })

        const totalPages = Math.ceil(count / limit)
        return { jobs, count, page, totalPages }
    } catch (error) {
        return { jobs: [], count: 0, page: 1, totalPages: 0 }
    }
}

export async function updateJobAction(variables: { jobId: string, values: CreateAndEditJobType }): Promise<JobType | null> {
    const userId = authenticateAndRedirect();
    const { jobId, values } = variables;

    try {
        createAndEditJobSchema.parse(values);
        const job = await prisma.job.update({
            where: {
                id: jobId,
                clerkId: userId
            },
            data: {
                ...values
            }
        });
        return job;
    } catch (error) {
        return null;
    }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
    const userId = authenticateAndRedirect()
    try {
        const job = await prisma.job.findUnique(
            { where: { clerkId: userId, id } }
        )
        if (!job) {
            return redirect("/")
        }
        return job
    } catch (error) {
        return null
    }

}

export async function getStatsAction(): Promise<{
    pending: number;
    interview: number;
    declined: number;
}> {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const userId = authenticateAndRedirect();

    try {
        const stats = await prisma.job.groupBy({
            where: {
                clerkId: userId,
            },
            by: ['status'],
            _count: {
                status: true,
            },
        });
        const statsObject = stats.reduce((acc, curr) => {
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>);

        const defaultStats = {
            pending: 0,
            declined: 0,
            interview: 0,
            ...statsObject,
        };
        return defaultStats;
    } catch (error) {
        redirect('/jobs');
    }
}


export async function getChartsDataAction(): Promise<Array<{ date: string; count: number }>> {
    try {
        const userId = authenticateAndRedirect()
        const sixMonthsAgo = dayjs().subtract(6, 'month').toDate()
        const jobs = await prisma.job.findMany({
            where: {
                clerkId: userId,
                createdAt: {
                    gte: sixMonthsAgo
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        let applicationsPerMonth = jobs.reduce((acc, job) => {
            const date = dayjs(job.createdAt).format('MMM YY');

            const existingEntry = acc.find((entry) => entry.date === date);

            if (existingEntry) {
                existingEntry.count += 1;
            } else {
                acc.push({ date, count: 1 });
            }

            return acc;
        }, [] as Array<{ date: string; count: number }>);

        return applicationsPerMonth;
    } catch (error) {
        redirect("/jobs")
    }

}

export async function deleteJobAction(id: string): Promise<JobType | null> {
    try {
        const userId = authenticateAndRedirect()
        const job = await prisma.job.delete({
            where: {
                id: id,
                clerkId: userId
            }
        })
        return job
    } catch (error) {
        return null
    }
}