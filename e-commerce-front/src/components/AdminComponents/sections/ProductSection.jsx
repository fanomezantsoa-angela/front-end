import ProductComponent from "./childCOmponent/ProductComponent"
import { getAllProduct } from "../../../actions/AdminProductAction"
import { useState, useEffect } from "react"



export default function ProductSection() {
    const [customArray, setCustomArray] = useState([])

    const fetchData = async () => {
        const data = await getAllProduct(0, null)
        if (data.error === null){
            
            console.log(data.data[0].products, "Data from useEffect")
            setCustomArray(data.data[0].products)
        } else {
            setCustomArray([])
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    return (

        <div>
            
            {/* header */}
            <div className="w-[25%] mb-8 text-center uppercase bg-sky-500 p-4 text-white rounded-full">
                Section des produits
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
                        Aucun produit pour l'instant...
                    </div>
                )
            }
        </div>

    )

}
