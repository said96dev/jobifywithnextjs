import { Sidebar, Navbar } from '@/components/index'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='grid lg:grid-cols-5'>
            <div className='hidden lg:block lg:col-span-1 lg:min-h-screen'>
                <Sidebar />
            </div>
            <div className='lg:col-span-4'>
                <Navbar />
                <div className='py-16 px-4 sm:px-8 lg:px-16'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default layout