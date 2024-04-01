import { AreaChart, Layers, AppWindow } from 'lucide-react'

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode
}

const links: NavLink[] = [
    {
        href: '/add-job',
        label: 'Add Job',
        icon: <Layers />
    },
    {
        href: '/stats',
        label: 'Stats',
        icon: <AreaChart />
    },
    {
        href: '/jobs',
        label: 'Jobs',
        icon: <AppWindow />
    }
]

export default links 
