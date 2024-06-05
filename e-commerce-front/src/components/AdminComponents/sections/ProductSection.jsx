import ProductComponent from "./childCOmponent/ProductComponent"
import { getAllProduct } from "../../../actions/AdminProductAction"
import { useState, useEffect } from "react"
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



export default function ProductSection() {
    const [customArray, setCustomArray] = useState([1,1,1,1,1,1,11,1,2,1,11])

    const addOperation = async () => {
        alert("add product clicked")
    }


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
        // fetchData()
    }, [])


    return (

        <div>
            
            {/* header */}
            <div className="flex flex-row items-center justify-between border-b-2 border-sky-700">
                <div className="w-[25%] mb-8 text-center uppercase bg-sky-500 p-4 text-white rounded-full">
                    Section des produits
                </div>    
                <div className='w-[23%] text-center pb-4'>
                        <Tooltip title="Ajouter un categorie">
                            <button 
                            onClick={addOperation}
                            className='w-full bg-sky-600 rounded-md py-2 hover:bg-sky-500 duration-100 cursor-pointer
                            flex flex-row items-center justify-center space-x-2 text-white'>
                                <div className='text-xl'>
                                    Ajouter un produit
                                </div>

                                <div>
                                    <AddCircleOutlineIcon sx={{
                                        fontSize: 25
                                    }}
                                    className=''/>
                                </div>
                            </button>
                        </Tooltip>
                    </div>  
            </div>

            {/* List of product */}
            {(customArray.length > 0) ? 
            (

                <div className="w-full flex flex-col space-y-4 
                h-[75vh] overflow-y-scroll no-scrollbar">
                    {customArray.map((elem, index) => (
                        <div key={index} className="m-0 p-0">
                            <ProductComponent mainData={"Hello world"}/>
                        </div>
                    ))}
                </div>
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
