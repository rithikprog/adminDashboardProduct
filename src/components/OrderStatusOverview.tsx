import {useEffect, useState} from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, } from "recharts";

export default function OrderStatusOverview(){
    const COLORS = [
        "#06B6D4", // Cyan
        "#6366F1", // Indigo
        "#14B8A6", // Teal
        "#F472B6", // Pink
        "#FB923C", // Orange
    ];
    const [overviewData,setOverviewData]=useState([])
    const [isSmallorMedium,setIsSmallorMedium]=useState(false);
    useEffect(() => {
        fetch("/data/data.json")
            .then((res)=>res.json())
            .then((data)=>setOverviewData((data.orderStatus))
            );
    }, []);

    useEffect(() => {
        const updatetScreenSize = ()=>{
            setIsSmallorMedium(window.innerWidth<=768);
        }

        updatetScreenSize();
        window.addEventListener("resize", updatetScreenSize);
        return () => window.removeEventListener("resize", updatetScreenSize);
    }, []);
    const outerRadius = isSmallorMedium ? 60:80;

    return(
        <div className={"p-4 md:p-6 mx-2 md:mx-0 rounded-xl backdrop-blur-md shadow-lg bg-[#1e1e1e]"}>
            <h2 className={"text-base md:text-left md:text-lg font-medium mb-4 text-gray-400"}>
                Category Overview
            </h2>
            <div className={"h-64 md:h-80"}>
                <ResponsiveContainer width="100%" height={"100%"} >
                    <PieChart>
                        <Pie
                            data={overviewData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={outerRadius}
                            label={({name,percent})=>`${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {overviewData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111827",
                                borderColor: "#4b5563",
                                color: "#fff",
                            }}
                        />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}