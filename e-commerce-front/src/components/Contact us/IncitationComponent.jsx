import ContactUsComponent from "../form/ContactUsComponent"


function IncitationComponent() {


    return (

        <div className=" w-[90%]  bg-white mx-auto p-10
            flex flex-col justify-between md:flex-row items-center
            rounded-md space-y-10
        ">
            <div className="w-[100%] md:w-[50%]">
                <p className="ubuntu-regular-italic font-thin text-xl px-12 text-slate-500">
                <span className="text-6xl  text-sky-300">"</span>Chez Socolait, nous sommes ouverts à toutes les formes de collaboration. 
                Que vous ayez une demande de produits en gros, une proposition de partenariat ou simplement une idée à partager, 
                n'hésitez pas à nous contacter en remplissant le formulaire ci-dessous.
                </p>
            </div>

            <div className="w-[100%] md:w-[50%]">
                <ContactUsComponent />
            </div>
        </div>

    )
}

export default IncitationComponent