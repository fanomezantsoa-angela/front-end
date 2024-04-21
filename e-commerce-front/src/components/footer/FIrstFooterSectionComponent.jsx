

function FirstFooterSectionComponent() {




    return (

        <div className="w-full p-8 bg-slate-300 mt-20">
            <div className="mb-10">
                <p className="text-2xl text-sky-700">Liens utiles :</p>
            </div>

            <div className="flex flex-row justify-start items-center space-x-20">
                <div>
                    <p>Hello</p>
                    <a href="https://web.facebook.com/socolait/?_rdc=1&_rdr">Facebook</a>
                </div>


                <div>
                    <p>World</p>
                    <a href="https://www.instagram.com/socolait.mg/">Instagram</a>
                </div>
            </div>
        </div>

    )
}

export default FirstFooterSectionComponent