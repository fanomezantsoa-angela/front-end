import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SwiperSlide } from "swiper/react"


export default function SeeMoreComponent ({testProps}) {
    const fetchNextProducts = (pageNumber) => {
        console.log("Data now should be fetched")
        testProps()
    } 

    return (

	
            <div className="flex flex-col items-center justify-center">

                {/* Divider */}
                <div className="w-full border-t border-slate-200 mb-6"></div>
                
                {/* Product information section */}
                <div className="px-6 space-y-2 w-full">
                    {/* Product name section */}
                    <div className="text-left">
                        <p className="text-sky-700 text-center text-xl font-semibold">
                            Voir plus de produits
                        </p>
                    </div>
                

                    {/* Command section */}
                    <section className="w-full flex justify-center items-center">

                        <button 
                        className="flex flex-row justify-center items-center
                        w-full text-white bg-sky-700 hover:bg-sky-500 hover:scale-105 duration-100
                        rounded p-2 mb-4
                        "
                        onClick={() => fetchNextProducts(1)}>
                            <MoreHorizIcon className=""/>

                        </button>
                    </section>
                </div>
            </div>
    )
}
