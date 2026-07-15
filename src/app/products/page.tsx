"use client"


import {motion} from "framer-motion";
import CardComponent from "@/components/CardComponent";
import {ActivitySquare, DollarSign, ShoppingBag, User} from "lucide-react";
import {BiCategory} from "react-icons/bi";
import ProductTableSection from "@/components/ProductTableSection";

export default function ProductsPage(){

    return (
        <div className={"flex-1 relative overflow-auto"}>
            <main className={"mx-auto max-w-7xl lg:px-8 py-4 px-4"}>
                <motion.div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"}
                            initial={{opacity:0,y:20}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:1}}
                >
                    <CardComponent name={"Total Product"} value={"4,352"} icon={ShoppingBag} />
                    <CardComponent name={"Total Stocks"} value={"18,437"} icon={ActivitySquare} />
                    <CardComponent name={"Total Sold"} value={"12,674"} icon={DollarSign} />
                    <CardComponent name={"Total Category"} value={"8"} icon={BiCategory} />
                </motion.div>

                <ProductTableSection/>

            </main>
        </div>
    )
}