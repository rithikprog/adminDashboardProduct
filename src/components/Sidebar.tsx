"use client"

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Menu, House, DollarSign, Settings, ShoppingBag, ShoppingCart, Bell, Mail, Info, Users, } from "lucide-react";

const ICONS = {
    House,
    DollarSign,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Bell,
    Mail,
    Info,
    Users
}
interface SidebarItem {
    name: string;
    href: string;
    icon: keyof typeof ICONS;
}
export  default function Sidebar(){

    const pathname = usePathname();

    const [sidebar,setSidebar] = useState<SidebarItem[]>([]);
    const [sidebarOpen,setSidebarOpen] = useState(true);

    useEffect(() => {
        fetch("/data/data.json")
            .then((res)=>res.json())
            .then((data)=>setSidebar(data.sidebarItems));
    }, []);

    return (
        <div className={`relative ${sidebarOpen?"w-64":"w-20"}  transition-all ease-in-out duration-300 flex-shrink-0`}>
            <div className={"h-full  flex flex-col p-4  bg-[#1e1e1e] backdrop-blur-md border-r border-[#2f2f2f] "}>
                <button className={"p-2 transition-colors hover:bg-[#2f2f2f] rounded-full max-w-fit cursor-pointer"} onClick={()=>setSidebarOpen(!sidebarOpen)}>
                    <Menu width={24} height={24} />
                </button>
                <nav className={"mt-8 flex-grow "}>
                    {
                        sidebar.map((item)=>{
                            const IconComponent = ICONS[item.icon];
                            return(
                                <Link href={item.href} key={item.name}>
                                    <div className={` flex items-center p-4 mb-2 text-sm transition-all duration-300 ease-in-out font-medium rounded-lg hover:bg-[#2f2f2f] 
                                    ${pathname === item.href ? "bg-[#2f2f2f]":""} `}>
                                        <IconComponent size={20} style={{minWidth:"20px"}} />
                                        {
                                            sidebarOpen  && <span className={"ml-4 whitespace-nowrap"}>{item.name}</span>
                                        }
                                    </div>
                                </Link>
                            )
                        })
                    }
                </nav>
            </div>
        </div>
    )
}