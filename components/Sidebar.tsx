"use client"
import Logo from "@/assets/logo.svg"
import Link from "next/link"
import links from "@/utils/links"
import { Button } from "./ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"
const Sidebar = () => {
    const pathname = usePathname()
    return (
        <aside className="py-4 px-8 bg-muted h-full">
            <Image src={Logo} alt="logo" className="mx-auto"></Image>
            <div className="flex flex-col mt-20 gap-y-4">
                {links.map((link, index) => {
                    return <Button asChild key={index} variant={pathname === link.href ? "default" : "link"}>
                        <Link href={link.href} className="flex item-center gap-x-2">
                            {
                                link.icon
                            } <span className="capitalize">{link.label}</span>
                        </Link>
                    </Button>
                })}
            </div>
        </aside>
    )
}

export default Sidebar