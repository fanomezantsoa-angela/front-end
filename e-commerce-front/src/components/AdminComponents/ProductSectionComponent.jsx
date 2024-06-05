/* Component import  */
import ProductSection from "./sections/ProductSection"
import TypeProductSection from "./sections/TypeProductSection"
import { useState } from "react"

export default function ProductSectionComponent()  {
    const [id, setId] = useState(0)

    const change = (typeId) => {
        // alert(typeId)
        setId(typeId)
    }

    return (

        <div className="flex flex-row justify-between">

            <div className="w-[78%] p-5 border-r h-[78vh]">
                <ProductSection changeProducts={id} />
            </div>

            <div className="w-[20%]  ">
                <TypeProductSection triggerChange={change} />
            </div>

        </div>

    )

}
