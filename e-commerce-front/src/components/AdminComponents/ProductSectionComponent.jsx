/* Component import  */
import ProductSection from "./sections/ProductSection"
import TypeProductSection from "./sections/TypeProductSection"


export default function ProductSectionComponent()  {

    return (

        <div className="flex flex-row justify-between">

            <div className="w-[78%] p-5 border-r h-[78vh]">
                <ProductSection />
            </div>

            <div className="w-[20%]  ">
                <TypeProductSection />
            </div>

        </div>

    )

}
