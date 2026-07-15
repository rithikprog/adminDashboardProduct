import {useEffect, useState} from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, } from "recharts";

export default function CategoryOverview(){
    const COLORS = [
        "#2563EB", // Blue
        "#7C3AED", // Purple
        "#10B981", // Green
        "#F59E0B", // Orange
        "#EF4444", // Red
    ];
    const [categoryData,setcategoryData]=useState([])
    const [isSmallorMedium,setIsSmallorMedium]=useState(false);
    useEffect(() => {
        fetch("/data/data.json")
            .then((res)=>res.json())
            .then((data)=>setcategoryData((data.categories))
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
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={outerRadius}
                            innerRadius={60}
                            paddingAngle={3}
                            label={({name,percent})=>`${name} ${((percent ?? 0 )* 100).toFixed(0)}%`}
                        >
                            {categoryData.map((entry, index) => (
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