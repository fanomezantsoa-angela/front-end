import { useState, useEffect } from "react"
import Rating from "@mui/material/Rating";
import { Product_rating } from "../../../../Hooks/productAPI"; 
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteOutlined from "@mui/icons-material/EditNoteOutlined";

export default function ProductComponent ({mainData}) {

    const [data, setData] = useState(null)
    const [rateValue, setRateValue] = useState(3)

    const sendingRate = async (newValue, id) => {			
        const response = await Product_rating(5, { rate_value: rateValue });
        
        if (response.status === 201) {
            console.log(response.data);
            setRateValue(newValue);
        } else {
            console.log(response);
        }
    };

    const editOperation = async () => {
        alert("Edit clicked")
    }


    useEffect(() => {
        console.log(rateValue, "New value of rate value")
    }, [rateValue])

    useEffect(() => {
        setData(mainData)
    }, [mainData])

    return (

        <div className=" flex flex-row border rounded-md hover:border-slate-400 hover:shadow-md duration-100 border-slate-300 ">
            {/* Product component list de {data} */}
            {/* Product image */}
            <div className="w-[20%] border-r mr-4 basis-1/5">
                <img
                    src="./src/assets/yaourt-nature.jpg"
                    alt="product"
                    className="produit-img rounded-lg"
                />
            </div>

            {/* Product information */}
            {/* 
                image *
                name *
                description *
                price *
                rate *
                stock
            */}
            <div className="flex flex-row justify-around space-x-4 py-2 basis-4/5">
                <div className="space-y-4 basis-1/3">
                    <div>
                        <span className="text-sky-700 font-bold">Nom du produit:</span> 
                        <span className="text-slate">Socolait Peche</span>
                    </div>

                    <div>
                        <span className="text-sky-700 font-bold">Description:</span> 
                        <span className="text-slate">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus reiciendis optio voluptatem? Explicabo ipsa, incidunt nisi quo itaque optio soluta unde nam. Quibusdam consectetur adipisci velit doloremque ipsa id quae.
                        </span>
                    </div>
                </div>

                <div className="basis-1/3">
                    <div>
                        <span className="text-sky-700 font-bold">Prix:</span> 
                        <span className="text-slate">1.100 ar</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sky-700 font-bold">Appreciation:</span> 
                        <span className="text-slate">
                        <Rating
                            name="size-small"
                            size="medium"
                            value={rateValue}
                            onChange={(event, newValue) =>
                                sendingRate(newValue, data.id)
                            }
                        />
                        </span>
                    </div>
                    <div>
                        <span className="text-sky-700 font-bold">Stock:</span> 
                        <span className="text-slate"> 50 unite</span>
                    </div>
                </div>

                <div className="basis-1/3 flex flex-col justify-center items-center">
                    <div className='w-[75%] text-center pb-4'>
                        <Tooltip title="Ajouter un categorie">
                            <button 
                            onClick={editOperation}
                            className='w-full bg-sky-600 rounded-md py-2 hover:bg-sky-500 duration-100 cursor-pointer
                            flex flex-row items-center justify-center space-x-2 text-white'>
                                <div className='text-xl'>
                                    Modifier
                                </div>

                                <div>
                                    <EditNoteOutlined sx={{
                                        fontSize: 25
                                    }}
                                    className=''/>
                                </div>
                            </button>
                        </Tooltip>
                    </div>
                    
                    <div className='w-[75%] text-center pb-4'>
                        <Tooltip title="Ajouter un categorie">
                            <button 
                            onClick={editOperation}
                            className='w-full bg-white rounded-md border border-red-300 text-red-400 py-2 hover:bg-red-400 hover:text-white duration-100 cursor-pointer
                            flex flex-row items-center justify-center space-x-2'>
                                <div className='text-xl'>
                                    Supprimer
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
            </div>
        </div>

    )

}

