


export default function TypeProductComponent({action, isActive, data}) {
    
    const performAction = () => {
        action("delete")
    }

    return (

        <div className={`w-full rounded-md mb-4 hover:border-slate-400 hover:shadow-md duration-100 p-3 cursor-pointer ${(isActive) ? "border-sky-600 border" : "border-slate-300 border"}`}>
            {/* Designation section */}
            <div className="mb-2">
                <span className="text-lg uppercase">{data.designation}</span> 
            </div>


            {/* Action section */}
            <button 
            onClick={performAction}
            className="w-full flex justify-center bg-slate-100 p-1 rounded-md hover:bg-slate-200">Action</button>
        </div>

    )

}
