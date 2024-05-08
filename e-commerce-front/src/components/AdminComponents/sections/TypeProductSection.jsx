import SearchBar from './sub_component/SearchBar';
import FilterComponent from './sub_component/FilterComponent';
import TypeProductComponent from './TypeProductComponent';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';

// Action import
import { getAllType } from '../../../actions/TypeProductAction';

export default function TypeProductSection() {
  
    const [categories, setCategories] = useState([])

    const fetchAllType = async () => {
        const response = await getAllType()
        if (response.res) {
            let data = []
            response.data.results.map((type) => {
                data.push({
                    data: type,
                    active: false
                })
            })
            data[0].active = true
            setCategories(data)
            // console.log(data)
        } else(
            // Handle Error
            console.log(response.error)
        )
        console.log(response)
    }
    
    const getOrder = (data) => {
        console.log(data)
    }

    const handleAction = (data) => {
        console.log("Data from action props")
        console.log(data)
    }

    useEffect(() => {
        fetchAllType()
    }, [])

    useEffect(() => {
        console.log("calling useEffect after updating data")
        console.log(categories)
    }, [categories])

    return (

        <div className="px-2 py-4">
            
            {/* header */}
            <div className="w-full mb-8 text-center uppercase bg-sky-500 p-4 text-white rounded-full">
                Les types de produits
            </div>    

            
            
            {/* Filter */}
            <div className="flex flex-row items-center justify-between border-b-2 pb-4 mb-8">
                <div >
                    <FilterComponent order={getOrder}/>
                </div>

                <div className='w-full '>
                    <SearchBar />
                </div>
            </div>


            {/* Category elements */}
            <div className='overflow-y-scroll no-scrollbar h-[60vh]'>
                {(categories.length != 0) ? 
                categories.map((data, index) => (
                    <div key={index}>
                        <TypeProductComponent 
                        action={handleAction}
                        isActive={data.active}
                        data={{
                            data: data.data,
                            index: index
                        }} />

                    </div>
                )) : (
                    <div>Hello world</div>
                )}

                {/* <TypeProductComponent 
                action={handleAction}
                isActive={false}
                data={{
                    designation: "Lait",
                    index: 1
                }} />

                <TypeProductComponent 
                action={handleAction}
                isActive={false}
                data={{
                    designation: "Beurre",
                    index: 2
                }} />
                <TypeProductComponent 
                action={handleAction}
                isActive={false}
                data={{
                    designation: "Fromage",
                    index: 3
                }} />
                <TypeProductComponent 
                action={handleAction}
                isActive={false}
                data={{
                    designation: "Jus Laitier",
                    index: 4
                }} /> */}
                
            </div>
            
        </div>
    )

}