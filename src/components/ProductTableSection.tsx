
import {motion, number} from "framer-motion";
import { useMemo, useState} from "react";
import productData from "../../public/data/data.json";
import Image from "next/image";
import {Edit, Save, Search, Trash2} from "lucide-react";

interface Props {
    id: number;
    value: string;
    field:string;
    item:string;
}
export  default function ProductTableSection(){
    const [products, setProducts] = useState(productData.products);
    const [searchTerm, setSearchTerm] = useState("");
    const filterProducts = useMemo(()=>{
        return products.filter(
            (product)=>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    },[searchTerm,products])

    const [editingRow,setEditingRow] = useState(null);

    const handleEditClick = (id)=>{
        setEditingRow(id);
    }

    const handleSaveClick=()=>{
        setEditingRow(null);
    }


    const handleChange = (id,field,value)=>{
        setProducts((prevProducts)=>
            prevProducts.map((product)=>
                product.id === id ? {...product,[field]:Number(value)}:product))
    }

    return(
        <motion.div className={" relative bg-[#1e1e1e] rounded-xl"}
                    initial={{opacity:0,y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{duration:1}}
        >
            <div className={"mx-auto max-w-7xl lg:px-8 py-6 px-4"}>
                <div className={"flex flex-col md:flex-row items-center mb-6 gap-4 md:gap-0 justify-between"}>
                    <h2 className={"text-lg md:text-xl font-semibold text-gray-400 text-center md:text-left"}>Product List</h2>
                    <div className={"relative w-full md:w-auto"}>
                        <input
                        type={"text"}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder={"search product..."}
                        className={"placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg w-full bg-[#2f2f2f] md" +
                            "w-64 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition  duration-300 text-sm"}
                        />
                        <Search className={"absolute left-2 top-1.5 text-gray-400"} aria-setsize={18} />
                    </div>
                </div>

                <div className={"overflow-x-auto"}>
                    <table className={"divide-y divide-gray-700 min-w-full"}>
                        <thead>
                        <tr>
                            {[
                                "Name",
                                "Product ID",
                                "Category",
                                "Price",
                                "Stock",
                                "Sales",
                                "Actions",
                            ].map((header)=>(
                                <th key={header} className={"uppercase py-2 px-3 md:px-6 md:py-3 text-sm font-medium hidden text-gray-400 md:table-cell text-left tracking-wider"} >{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className={"divide-y divide-gray-700"}>
                        {
                            products.map((product)=>(
                                <motion.tr key={product.id}
                                   initial={{opacity:0,y:10}}
                                   animate={{opacity:1, y:0}}
                                   transition={{duration:0.3,delay:0.1}}
                                           className={` flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 p-2 md:p-2 border-gray-700 ${editingRow
                                            === product.id?" ring-gray-500 bg-[#2f2f2f]":""}`}
                                >
                                    <td className={"md:hidden px-3 py-2"}>
                                        <div className={"flex items-center justify-between"}>
                                            <div className={"flex items-center"}>
                                                <Image src={product.image} alt={product.name} width={36} height={36} className={"w-9 h-9 rounded-full"}/>
                                                <div className={"ml-3"}>
                                                    <div className={"text-sm font-medium text-gray-100"}>
                                                        {product.name}
                                                    </div>
                                                    <div className={"text-xs text-gray-400"}>
                                                        ID:{product.id}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"flex -mr-1 -mt-1 space-x-1"}>
                                                <button className={"text-indigo-500 hover:text-indigo-300"} onClick={()=>editingRow === product.id ? handleSaveClick():handleEditClick(product.id)} >
                                                    {editingRow === product.id? <Save size={16} /> : <Edit size={16} />}
                                                </button>
                                                <button className={"text-red-500 hover:text-red-300"}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={"text-sm text-gray-300"}>
                                            <div>{product.category}</div>
                                            {["price","sales","stock"].map((item)=>(
                                                <div key={item} className={""} >
                                                    <span>
                                                        {item}
                                                    </span>
                                                    {
                                                        editingRow === product.id?
                                                            (
                                                                <input
                                                                onChange={(e)=>handleChange(product.id,item,e.target.value)}
                                                                type={"text"}
                                                                value={product[item]}
                                                                className={"bg-transparent  w-16 text-xs text-center ml-1 border border-gray-400 text-white"}
                                                                />
                                                            ):(
                                                                item==="price"?(
                                                                    `$${product[item].toFixed(2)}`
                                                                ):(product[item])
                                                            )
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className={"hidden md:table-cell whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-100"}>
                                        <div className={"flex items-center"}>
                                            <Image src={product.image} alt={product.name} width={40} height={40} className={"w-10 h-10 rounded-full"} />
                                            <div className={"ml-4"}>{product.name}</div>
                                        </div>
                                    </td>
                                    <td className={"hidden md:table-cell whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-100"}>
                                        {product.id}
                                    </td>
                                    <td className={"hidden md:table-cell whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-100"}>
                                        {product.category}
                                    </td>
                                    {["price","sales","stock"].map((item)=>(
                                        <td key={item} className={`hidden md:table-cell whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-100 ${editingRow === product.id ? "border border-gray-400":""}`}>
                                            {
                                                editingRow === product.id?
                                                    (
                                                        <input
                                                            onChange={(e)=>handleChange(product.id,item,e.target.value)}
                                                            type={"text"}
                                                            value={product[item]}
                                                            className={"bg-transparent  w-16 text-xs text-center ml-1 border border-gray-400 text-white"}
                                                        />
                                                    ):(
                                                        item==="price"?(
                                                            `$${product[item].toFixed(2)}`
                                                        ):(product[item])
                                                    )
                                            }
                                        </td>
                                    ))}
                                    <td className={"hidden md:table-cell whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-100"}>
                                        <div className={"flex -ml-2 space-x-1"}>
                                            <button className={"text-indigo-500 hover:text-indigo-300"} onClick={()=>editingRow === product.id ? handleSaveClick():handleEditClick(product.id)}>
                                                {editingRow === product.id? <Save size={16} /> : <Edit size={16} />}
                                            </button>
                                            <button className={"text-red-500 hover:text-red-300"}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        </motion.div>
    )
}