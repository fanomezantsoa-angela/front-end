import Loginform from "../components/form/Loginform";

function Login() {
  return (
    <div>
		<div className="flex flex-col justify-center px-6 py-8 min-h-full tracking-wide bg-white">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				{/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
				<svg xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 16 16" 
					fill="currentColor" 
					className="w-32 h-32 mx-auto fill-sky-500">
					<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
				</svg>

				<h2 className="mt-10 text-center text-2xl font-bold leading-9 font-light tracking-tight text-gray-700 font-normal">Se connecter a votre compte</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<Loginform />
			</div>
		</div>
    </div>
  );
}
export default Login;
