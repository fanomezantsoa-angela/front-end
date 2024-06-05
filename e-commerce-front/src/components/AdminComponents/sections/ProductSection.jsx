import ProductComponent from "./childCOmponent/ProductComponent"
import { getAllProduct, updateProductImage, createProduct, updateProduct, deleteProduct } from "../../../actions/AdminProductAction"
import { useState, useEffect, Fragment } from "react"
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

import EditNoteOutlined from "@mui/icons-material/EditNoteOutlined";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };

export default function ProductSection({changeProducts}) {
    const [customArray, setCustomArray] = useState([])
    const [productType, setProductType] = useState(0)
    const [productId, setProductId] = useState(0)

    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [snack, setSnack] = useState(false)
    const [snackStyle, setSnackStyle] = useState({ backgroundColor: 'green', color:'white' })
    const [message, setMessage] = useState("Ajout effectue avec succes.")

    const [open, setOpen] = useState(false)
    const [operation, setOperation] = useState("a")

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0); // Assuming initial price is 0
    const [stock, setStock] = useState(0); // Assuming initial stock is 0
    const [selectedFile, setSelectedFile] = useState(null);

    const addOperation = async () => {
        setOperation("a")
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {
            name: name,
            description: description,
            rate:0,
            type:productType,
            price: price, 
            stock: stock
        }
        console.log(customArray)
        // console.log(data)
        if(operation == "a"){
            let response = await createProduct(data)
            if(response.res) {
                // console.log(response.data)
                let imageUpdate = await updateImage(response.data.id)
                let res = (imageUpdate.res) ? "data created" : "Error while update images"
                setMessage("Produits creer avec succes!")
                setSnack(true)
                fetchData()
                clearInput()
            } else {
                alert("Erreur lors de la creation du produit")
            }
            setOpen(false)
        } else {
            data.id = productId
            let response = await updateProduct(data)
            if(response.res) {
                // console.log(response.data)
                let imageUpdate = await updateImage(response.data.id)
                let res = (imageUpdate.res) ? "data created" : "Error while update images"
                setMessage("Produits modifie avec succes!")
                setSnack(true)
                fetchData()
                clearInput()
            } else {
                alert("Erreur lors de la creation du produit")
            }
            setOpen(false)
        }
        setLoading(false)
    };

    async function updateImage(productId) {
        const formData = new FormData();
        formData.append('image', selectedFile);
      
        const result = await updateProductImage(productId, formData)
        return result
    }

    const fetchData = async () => {
        let id = 10
        if(changeProducts != 0){
            id = changeProducts
        }
        const data = await getAllProduct(id)
        if (data.error === null){
            
            console.log(data, "Data from useEffect")
            setCustomArray(data.data.products)
            setProductType(data.data.id)
        } else {
            console.log("error")
        }
    }

    const handleAction = async (data) => {
        // alert(data.action)
        setProductId(customArray[data.index].id)
        
        if(data.action == "edit"){
            setName(customArray[data.index].name)
            setDescription(customArray[data.index].description)
            setPrice(customArray[data.index].price)
            setStock(customArray[data.index].stock)
            setSelectedFile(null)
            setOperation(data.action)
            setOpen(true)
        } else if (data.action == "delete"){
            setDeleteLoading(true)
            if(window.confirm("Voulez-vous vraiment supprimer ce produit !") == true){
                const response = await deleteProduct(customArray[data.index].id)
                if(response.res){
                    setMessage("Produit supprimer avec succes!")
                    setSnack(true)
                    fetchData()
                }
                setDeleteLoading(false)
            }
        }
    }

    const handleClosedSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnack(false);
    };


    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(changeProducts)
        fetchData()
    }, [changeProducts])


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
                        label="Nom du produit*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Description*"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        />
                        <TextField
                        label="Prix*"
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
                        label="Stock*"
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
                                <span className="text-sm mr-2">Choisir une image*</span>
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            {selectedFile && <p className="text-sm text-sky-700">{selectedFile.name}</p>}
                        </div>
                        
                        {((name== "") || (description=="") || (price==0) || (stock==0) || (selectedFile==null)) && (
                            <p className="text-red-600">Veuillez remplir tous les champs ci-dessus.</p>
                        )}

                        <div className='w-full text-center pb-4'>
                            <Tooltip title="Ajouter un produit">
                                <button 
                                onClick={handleSubmit}
                                disabled={(loading) ? true : false}
                                type="submit"
                                className='w-full bg-sky-600 rounded-md py-2 hover:bg-sky-500 duration-100 cursor-pointer
                                flex flex-row items-center justify-center space-x-2 text-white'>
                                    {(!loading) ? (
                                        <div>
                                            <div className='text-xl'>
                                                Soumettre
                                            </div>

                                            <div>
                                                <EditNoteOutlined sx={{
                                                    fontSize: 25
                                                }}
                                                className=''/>
                                            </div>
                                        </div>
                                    ): (
                                        <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#FFFFFF",
                                        }}
                                        >
                                        <CircularProgress
                                            sx={{
                                            color: "white",
                                            }}
                                        />
                                        </Box>

                                    )}
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

            <div>
                <Snackbar
                    open={snack}
                    autoHideDuration={4000}
                    onClose={handleClosedSnack}
                    message={message}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    ContentProps={{
                        style:  snackStyle// Set background color using ContentProps
                    }}
                    action={<Fragment>
    
                        <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClosedSnack}
                        >
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </Fragment>}
                />  
            </div>

        </div>

    )

}
