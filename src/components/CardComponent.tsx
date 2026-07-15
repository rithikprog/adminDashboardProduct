import {IconType} from "react-icons";

interface CardComponentProps {
    name: string;
    value: string;
    icon:IconType;
}

export default function CardComponent({name,icon:Icon,value}: CardComponentProps) {


    return (
        <div className={"bg-[#1e1e1e] shadow-lg rounded-xl hover:-translate-y-1 transition-transform duration-200"}>
            <div className={"sm:p-6 px-4 py-5"}>
                <span className={"flex"}>
                    <Icon className={"mr-2"} />
                    {name}
                </span>
                <p className={"flex text-3xl"}>
                    {
                        value
                    }
                </p>
            </div>
        </div>
    )
}