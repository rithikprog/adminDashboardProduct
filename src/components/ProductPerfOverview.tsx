import {useEffect, useState} from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, } from "recharts";

interface ProductPerformance {
    name: string;
    Retention: number;
    Revenue: number;
    Profit: number;
}

export default function ProductPerfOverview(){

    const [productPerformance,setProductPerformance]=useState<ProductPerformance[]>([])
    useEffect(() => {
        fetch("/data/data.json")
            .then((res)=>res.json())
            .then((data)=>setProductPerformance((data.productPerformance))
            );
    }, []);


    return(
            <div className={"p-4 md:p-6 mx-2 md:mx-0 rounded-xl backdrop-blur-md shadow-lg bg-[#1e1e1e]"}>
                <h2 className={"text-base md:text-left md:text-lg font-medium mb-4 text-gray-400"}>
                    Category Overview
                </h2>
                <div className={"h-64 md:h-80"}>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart
                            data={productPerformance}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#374151"
                            />

                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                                axisLine={{ stroke: "#4b5563" }}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                                axisLine={{ stroke: "#4b5563" }}
                                tickLine={false}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                contentStyle={{
                                    background: "#111827",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                }}
                                labelStyle={{ color: "#fff" }}
                            />

                            <Legend />

                            <Bar
                                dataKey="Retention"
                                fill="#FF7043"
                                radius={[6, 6, 0, 0]}
                            />

                            <Bar
                                dataKey="Revenue"
                                fill="#38BDF8"
                                radius={[6, 6, 0, 0]}
                            />

                            <Bar
                                dataKey="Profit"
                                fill="#66BB6A"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
    )
}