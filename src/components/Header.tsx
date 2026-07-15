import Image from "next/image";
import cImage from "../../public/images/uk.png";
import {BellIcon} from "lucide-react";
import userImg from "../../public/images/admin.jpg"
export default function  Header(){

    return <header className={"bg-[#1e1e1e] mt-6 border border-b mx-4 sm:mx-6 lg:mx-8 border-[#1f1f1f] rounded-lg shadow-lg "}>
        <div className={"mx-auto max-w-7xl py-4 px-4 sm:px-6 flex items-center justify-between text-white"}>
            <h1 className={"text-white text-lg sm:text-xl lg:text-2xl font-extrabold"}>
                Dashboard
            </h1>
            <div className={"flex items-center sm:space-x-6 space-x-3 opacity-0 sm:opacity-100"}>
                <Image src={cImage} alt={"countryImage"} className={"w-fit h-fit " }  width={25} height={18} />
                <div className={"relative"}>
                    <BellIcon/>
                </div>
                <div className={"flex items-center justify-center space-x-2 sm:space-x-3"}>
                    <Image src={userImg} alt={"userImage"} className={"rounded-full"} width={35} height={35} />
                    <span className={""}> Rithik Singh </span>
                </div>
            </div>
        </div>
    </header>
}