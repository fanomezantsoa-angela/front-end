import SearchBar from './sub_component/SearchBar';
import FilterComponent from './sub_component/FilterComponent';
import TypeProductComponent from './childCOmponent/TypeProductComponent';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Inputhandler} from "../../../Hooks/Inputhandler"
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import { apiRequest } from "../../../actions/RequestAction";
import { tokenExtractor } from "../../../actions/tokenExtractor";
import { useState, useEffect, Fragment } from 'react';

// Action import
import { getAllType } from '../../../actions/TypeProductAction';

export default function TypeProductSection() {
  
    const [categories, setCategories] = useState([])
    const [designation, setDesignation, changeDesignation] = Inputhandler("")
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [snack, setSnack] = useState(false)
    const [snackStyle, setSnackStyle] = useState({ backgroundColor: 'green', color:'white' })
    const [message, setMessage] = useState("Ajout effectue avec succes.")

    const fetchAllType = async (isOrdered=false, order=null) => {
        let response = null
        if(isOrdered && order){
            response = await getAllType(true ,order)
        } else {
            response = await getAllType()
        }
        console.log(response)
        if (response.res) {
            let data = []
            console.log(response)
            response.data.results.map((type) => {
                data.push({
                    data: type,
                    active: false
                })
            })
            return data
        } else{
            // Handle Error
            console.log(response.error)
            return []
        }
    }
    
    const getOrder = (data) => {
        console.log(data)
        fetchOrder(data)
    }

    const handleAction = (data) => {
        console.log("Data from action props")
        let categoryList = categories
        categoryList.forEach((category, index) => {
            if(data == index){
                category.active = true
            } else{
                category.active = false
            }
        });
        console.log(categoryList)
        setCategories([...categoryList])
        console.log(data)
    }

    const handleDelete = async (index) => {
        console.log("Inside delete handle***")
        fetchFromInside(true, index)
    }

    async function setActive(data, initial=true, index=null) {
        if(initial){
            data[0].active = true
        } else if(!initial && index >= 0) {
            data[index].active = true
        }
        setCategories([])
        setCategories([...data])
        console.log(categories ,"After active validation***")
    }
    
    const fetchFromInside = async(initial, index) => {
        const data = await fetchAllType()
        setActive(data, initial, index)
    }

    const fetchOrder = async (order) => {
        // console.log(order)
        setCategories([])
        const data = await fetchAllType(true, order)
        setActive(data, true)
    }

    const addOperation = () => {
        setOpen(!open)
    }

    const handleEscape = (e) => {
        if (e.key === "Escape"){
            setOpen(false)
        } else if(e.key === "Enter"){
            validateCreate()
        }
    }

    
    const handleUpdate = (e) => {
        e.preventDefault()
        validateCreate()
    }

    const validateCreate = async () => {
        if(designation == ""){
            setError(true)
        } else {
            setError(false)
            let result = {designation: designation}
            const token = tokenExtractor()
            if(token != null) {
                const response = await apiRequest(`type_product/`, "POST", token, result)
                
                console.log(response)
                if (response.error == null){
                    setOpen(false)
                    setSnack(true)
                    fetchFromInside(true, null)
                    setDesignation("")
                    // data.data.designation = designation
                } else {
                    alert("Erreur lors de la creation du categorie")
                    let snackCustomStyle = snackStyle
                    snackCustomStyle.backgroundColor = "grey"
                    snackCustomStyle.color = "red"
                    setSnackStyle(snackCustomStyle)
                    setMessage("Erreur lors de la modification de la categorie.")
                    setSnack(true)
                }
            }
            setDesignation("")
            setOpen(false)
        }
    }


    const handleClosedSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnack(false);
    };

    const handleSearch = async (data) => {
        console.log("Search Being hendleed: "+ data)
        if(data == ""){
            fetchFromInside()
        } else {
            const token = tokenExtractor()
            if(token != null) {
                const result = await apiRequest(`type_product/search/${data}/`, "GET", token, null)
                console.log(result)
                if(result.error == null){
                    const response = result.response
                    let data = []
                    response.data.data.map((type) => {
                        data.push({
                            data: type,
                            active: false
                        })
                    })
                    // console.log(data)
                    setActive(data, true, null)
                }
                console.log(result)
            }
        }
    }


    useEffect(() => {
        fetchFromInside(true, null)
    }, [])



    return (

        <div className="px-2 py-4">
            
            {/* header */}
            <div className="w-full mb-8 text-center uppercase bg-sky-500 p-4 text-white rounded-full">
                Categories des produits
            </div>    

            
            
            {/* Filter */}
            <div className="flex flex-row items-center justify-between border-b-2 pb-4 mb-8">
                <div >
                    <FilterComponent order={getOrder}/>
                </div>

                <div className='w-full '>
                    <SearchBar searchAction={handleSearch}/>
                </div>
            </div>

            {/* Add button */}
            <div className='w-full text-center pb-4'>
                <Tooltip title="Ajouter un categorie">
                    <button 
                    onClick={addOperation}
                    className='w-full bg-sky-600 rounded-md py-2 hover:bg-sky-500 duration-100 cursor-pointer
                    flex flex-row items-center justify-center space-x-2 text-white'>
                        <div className='text-xl'>
                            Ajouter
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

            {/* Add input */}
            {((open) && (
                <div className='w-full mb-4 '>
                    <Tooltip title="Appuyer sur la touche ENTRE pour valider et sur la touche Echap pour annuler">
                        <InputBase
                            className="bg-white block w-full rounded-md border-0 py-[3px] text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2"
                            type="text"
                            value={designation}
                            onChange={changeDesignation}
                            onKeyDown={handleEscape}
                            endAdornment={
                                <div>
                                <InputAdornment position="end">
                                    <IconButton
                                    type="button"
                                    sx={{ p: "10px" }}
                                    aria-label="Validate creation"
                                    onClick={handleUpdate}
                                    >
                                        <DoneIcon />
                                    </IconButton>
                                </InputAdornment>
                            </div>
                            }
                        />
                    </Tooltip>
                    {(error) && (
                        <div className='text-red-400'>
                            Veuiller remplir corretement le champs si dessus
                        </div>
                    )}
                </div>
            ))}

            {/* Category elements */}
            <div className='overflow-y-scroll no-scrollbar h-[60vh]'>
                {(categories.length != 0) ? 
                categories.map((data, index) => (
                    <div key={index}>
                        <TypeProductComponent 
                        action={handleAction}
                        deleteProps={handleDelete}
                        isActive={data.active}
                        data={{
                            data: data.data,
                            index: index
                        }} />

                    </div>
                )) : (
                    <div className='mt-10 text-slate-400 text-center text-xl p-4'>
                        Aucun categorie trouver...
                    </div>
                )}
                
            </div>

            {/* SanckBar */}
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