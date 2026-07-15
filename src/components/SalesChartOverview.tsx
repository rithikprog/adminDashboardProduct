import {useEffect, useState} from "react";
import {CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip} from "recharts";


export default function SalesChartOverview(){

    const [sales,setSales]=useState([])

    useEffect(() => {
        fetch("/data/data.json")
            .then((res)=>res.json())
            .then((data)=>setSales((data.sales))
            );
    }, []);

    return (
        <div className={"p-4 md:p-6 mx-2 md:mx-0 rounded-xl backdrop-blur-md shadow-lg bg-[#1e1e1e]"}>
            <h2 className={"text-base md:text-left md:text-lg font-medium mb-4 text-gray-400"}>
                Sales Overview
            </h2>
            <div className={"h-64 md:h-80"}>
                <ResponsiveContainer width={"100%"} height={"100%"} >
                    <LineChart data={sales} >
                        <CartesianGrid strokeDasharray={"3 3"} stroke={"#4b5563"} />
                        <XAxis
                        dataKey={"name"}
                        interval={"preserveStartEnd"}
                        tick={{fontSize:12}}
                        stroke={"#9ca3af"}
                        />
                        <YAxis width={40} tick={{fontSize:12}} stroke={"#9ca3af"} />
                        <Tooltip
                        contentStyle={{
                            backgroundColor:"#111827",
                            borderColor:"#4b5563",
                            fontSize:"12px",

                        }}
                        itemStyle={{color:"e5e7eb"}}
                        />
                        <Line
                        dataKey={"sales"}
                        type="monotone"
                        strokeWidth={3}
                        stroke={"#1E40AF"}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}