import ContactUsComponent from "../form/ContactUsComponent"


function IncitationComponent() {


    return (

        <div className="w-[90%] bg-white mx-auto p-10">
            <div className="text-center text-sky-800 text-2xl mb-4">
                NOUS CONTACTER
            </div>

            <div className="flex flex-col justify-between md:flex-row items-center
            rounded-md space-y-10">
                <div className="w-[100%] md:w-[50%]">
                    <p className="ubuntu-regular-italic text-md md:text-xl font-thin px-12 text-slate-500">
                    <span className="text-6xl  text-sky-300">"</span>Chez Socolait, nous sommes ouverts à toutes les formes de collaboration. 
                    Que vous ayez une demande de produits en gros, une proposition de partenariat ou simplement une idée à partager, 
                    n'hésitez pas à nous contacter en remplissant le formulaire ci-dessous.
                    </p>
                </div>

                <div className="w-[100%] md:w-[50%]">
                    <ContactUsComponent />
                </div>
            </div>
        </div>

    )
}

export default IncitationComponent