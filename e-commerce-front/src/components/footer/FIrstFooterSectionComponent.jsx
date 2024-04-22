import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


function FirstFooterSectionComponent() {




    return (

        <div className="w-full p-8 bg-slate-300 mt-20 rounded-t-3xl">
            <div className="mb-5">
                <p className="px-10  text-xl text-slate-500">Liens utiles :</p>
            </div>

            <div className="flex flex-row justify-start items-center space-x-20">
                <div>
                    <a href="https://web.facebook.com/socolait/?_rdc=1&_rdr"
                    className=" text-sky-500 px-4 py-3 flex justify-center rounded-lg">
                        <button className="flex flex-row justify-around items-baseline px-4 space-x-2 hover:scale-110 duration-100">
                            <div>
                                <FacebookIcon sx={{fontSize: 40,}} className="text-white"/>
                            </div>
                            <div className="text-white underline">
                                FACEBOOK
                            </div>
                        </button>
                    </a>
                </div>


                <div>
                    <a href="https://www.instagram.com/socolait.mg/">
                        <button className="flex flex-row justify-around items-baseline px-4 space-x-2 hover:scale-110 duration-100">
                            <div>
                                <InstagramIcon sx={{fontSize: 40,}} className="text-white"/>
                            </div>
                            <div className="text-white underline">
                                INSTAGRAM
                            </div>
                        </button>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default FirstFooterSectionComponent