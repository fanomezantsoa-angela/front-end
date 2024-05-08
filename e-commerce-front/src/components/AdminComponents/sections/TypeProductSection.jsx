import SearchBar from './SearchBar';
import FilterComponent from './FilterComponent';
import TypeProductComponent from './TypeProductComponent';

export default function TypeProductSection() {
  
  
    const getOrder = (data) => {
        console.log(data)
    }

    const handleAction = (data) => {
        console.log("Data from action props")
        console.log(data)
    }

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
                {/* <p>Hello world</p> */}
                <TypeProductComponent 
                action={handleAction}
                isActive={true}
                data={{
                    designation: "Yaourt",
                    index: 0
                }} />

                <TypeProductComponent 
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
                }} />
                
            </div>
            
        </div>
    )

}