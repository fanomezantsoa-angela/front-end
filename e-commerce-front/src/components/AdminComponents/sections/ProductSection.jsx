import ProductComponent from "./childCOmponent/ProductComponent"
import { getAllProduct } from "../../../actions/AdminProductAction"
import { useState, useEffect } from "react"



export default function ProductSection() {
    const [customArray, setCustomArray] = useState([1,2,3,4,5,6])

    useEffect(() => {
        const data = getAllProduct(0, null)
        console.log(data, "Data from useEffect")
    }, [])


    return (

        <div>
            
            <div>
                <p>Product section</p>
            </div>

            {/* List of product */}
            {(customArray.length > 0) ? 
                customArray.map((elem, index) => (
                    <div key={index}>
                        <ProductComponent />
                    </div>
                )
            ) : 
                (
                    <div className='mt-10 text-slate-400 text-center text-xl p-4'>
                        Aucun categorie pour l'instant...
                    </div>
                )
            }
        </div>

    )

}
