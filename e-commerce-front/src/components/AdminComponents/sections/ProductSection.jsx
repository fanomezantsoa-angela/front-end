import ProductComponent from "./childCOmponent/ProductComponent"
import { getAllProduct, updateProductImage } from "../../../actions/AdminProductAction"
import { useState, useEffect } from "react"
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import EditNoteOutlined from "@mui/icons-material/EditNoteOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { set } from "date-fns";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };

export default function ProductSection() {
    const [customArray, setCustomArray] = useState([])

    const [open, setOpen] = useState(true)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0); // Assuming initial price is 0
    const [stock, setStock] = useState(0); // Assuming initial stock is 0
    const [selectedFile, setSelectedFile] = useState(null);

    const addOperation = async () => {
        setOpen(true)
    }

    const clearInput = () => {
        setName("")
        setDescription("")
        setPrice(0)
        setStock(0)
        setSelectedFile(null)
    }

    const handleImageChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            name: name,
            description: description,
            price: price, 
            stock: stock
        }

        console.log({ name, description, price, stock,image: selectedFile  });
        setOpen(false)
        // Implement your logic h`ere (e.g., send data to API)
    };

    async function updateProductImage(productId) {
        const formData = new FormData();
        formData.append('image', selectedFile);
      
        const result = await updateProductImage(productId, formData)
        console.log(result)

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

    const handleAction = async (data) => {
        alert(data.index)
    }


    useEffect(() => {
        fetchData()
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
                            <ProductComponent mainData={elem} index={index} actionHandler={handleAction}/>
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

            {/* Modale for edit */}
            <div>
            <Modal
                open={open} // Set this to control the modal's visibility
                onClose={() => {}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={style}>
                    <h2 className="font-bold uppercase text-sky-700 text-center text-xl">
                        Ajouter un nouveau produit
                    </h2>
                    
                    <form onSubmit={handleSubmit}>
                        <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        InputProps={{
                            min: 1,
                            max: 5,
                        }}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            min: 0,
                            max: 1000,
                        }}
                        />
                        <div>
                            <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="icon-button-file"
                            type="file"
                            onChange={handleImageChange}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                <span className="text-sm mr-2">Choisir une image</span>
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            {selectedFile && <p className="text-sm text-sky-700">{selectedFile.name}</p>}
                        </div>


                        <div className='w-full text-center pb-4'>
                            <Tooltip title="Ajouter un produit">
                                <button 
                                onClick={handleSubmit}
                                type="submit"
                                className='w-full bg-sky-600 rounded-md py-2 hover:bg-sky-500 duration-100 cursor-pointer
                                flex flex-row items-center justify-center space-x-2 text-white'>
                                    <div className='text-xl'>
                                        Soumettre
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

                        <div className='w-full text-center pb-4'>
                            <Tooltip title="Annulerr l'operation">
                                <button 
                                onClick={(e) => {
                                    e.preventDefault()
                                    clearInput()
                                    setOpen(false)
                                }}
                                className='w-full bg-white rounded-md border border-red-300 text-red-400 py-2 hover:bg-red-400 hover:text-white duration-100 cursor-pointer
                                flex flex-row items-center justify-center space-x-2'>
                                    <div className='text-xl'>
                                        Annuler
                                    </div>

                                    {/* <div>
                                        <DeleteOutline sx={{
                                            fontSize: 25
                                        }}
                                        className=''/>
                                    </div> */}
                                </button>
                            </Tooltip>
                        </div>
                    </form>
                </Box>
            </Modal>
            </div>

        </div>

    )

}
