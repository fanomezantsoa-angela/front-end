import Inscription from "../components/form/Inscriptionfrom";



function Signup() {
    return (
        <div className="h-full">
            <div className="w-full h-[100%]
			flex flex-row 
		">
			{/* Image component */}
			<div className="w-[50%]  bg-white hidden 2xl:block lg:block md:hidden bg-cover bg-fixed bg-no-repeat"
				style={{
                backgroundImage: "url('./src/assets/LoginSignupIllustration/pexels-pixabay-248412.jpg')",
                backgroundSize: "50%",
                // backgroundPositionY: "-10px"
			}}
			>
				
			</div>


			{/* Form component */}
			<div className="relative w-full 2xl:w-[50%] lg:w-[50%] h-[100%] px-6 py-8 min-h-full tracking-wide bg-white">

				<div className="flex flex-col justify-center login_form">

					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<svg xmlns="http://www.w3.org/2000/svg" 
						fill="none" 
						viewBox="0 0 24 24" 
						strokeWidth="1.5" 
						stroke="currentColor" 
						className="w-32 h-32 mx-auto stroke-sky-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
						</svg>


						<h2 className="mt-10 text-center text-2xl font-bold leading-9 font-light tracking-tight text-sky-700 font-normal">Creer un compte</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full h-[100%] bg-white sm:max-w-sm">
						<Inscription />
					</div>

				</div>

			</div>
		</div>
        </div>
    );
}
export default Signup;