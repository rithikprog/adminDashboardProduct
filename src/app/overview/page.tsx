"use client"

import CardComponent from "@/components/CardComponent";
import {ActivitySquare, DollarSign, ShoppingBag, User} from "lucide-react";
import {motion} from "framer-motion";

export default function OverviewPage(){


    return (

        <div className={"flex-1 overflow-auto relative"}>
            <main className={"lg:px-8 py-4 px-4 max-w-7xl mx-auto"}>
                <motion.div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"}
                initial={{opacity:0,y:20}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:1}}
                >
                    <CardComponent name={"Total Sales"} value={"$182,450"} icon={DollarSign} />
                    <CardComponent name={"Total Client"} value={"1,437"} icon={User} />
                    <CardComponent name={"Total Product"} value={"674"} icon={ShoppingBag} />
                    <CardComponent name={"Stocks"} value={"12,845"} icon={ActivitySquare} />
                </motion.div>
            </main>
        </div>
    )
}