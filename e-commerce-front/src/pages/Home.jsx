import Layout from "../components/headerComponent/Layout";
import Produits_type from "../components/headerComponent/Produits_type";
import Products_list from "./Products_list";
import AddComponent from "../components/Addvertisement/AddComponent";
import IncitationComponent from "../components/Contact us/IncitationComponent";
import FirstFooterSectionComponent from "../components/footer/FIrstFooterSectionComponent"
import SecondFooterSectionComponent from "../components/footer/SecondFooterSectionComponent";
import { refresh_Token } from "../Hooks/Tokencheck";
import Swal from "sweetalert2";
import { ProductTypesProvider } from "../Hooks/Product_typesContext";
import { SearchProvider } from "../Hooks/SearchContext";
import {  useEffect, useContext } from "react";
import { AuthContext } from "../Hooks/Auth";

function Home() {
const {logout} = useContext(AuthContext)
  useEffect(() =>{
    const token = localStorage.getItem("token");
    const refreshToken= localStorage.getItem("refreshToken")
    if(!token){
     
      if(refreshToken){
        
        refresh_Token()
        .then((response)=>{
            const newtoken = response.access
            const newrefresh= response.refresh
            localStorage.setItem("token", newtoken)
            localStorage.setItem("refreshToken", newrefresh)

        })
        .catch((error)=>{
          Swal.fire({
            title: "Erreur",
            text: "renouvellement de token echoué, veuillez vous connecter",
            icon: "error",
          
          });
          
        })
        
      }
      if(!refreshToken){
        Swal.fire({
          title: "Erreur",
          text: "renouvellement de token echoué, veuillez vous connecter",
          icon: "error",
         
        });
        logout();
      }

      
      
        
    
    } 
    
  }, []);
    
   




    return (
       

      <div className="w-full h-[100%] min-h-screen space-y-28">
        <SearchProvider>
          <ProductTypesProvider>
            {/* Header */}
            <div>
              {/* Top section */}
              <Layout />

              {/* Link of product types */}
              <Produits_type />
            </div>

            {/* List of product */}
            <Products_list />


            {/* Add section */}
            <div className="w-full py-8">
              <AddComponent />
            </div>

            {/* Contact section */}
            <div className="w-full py-8">
                <IncitationComponent />
            </div>

            {/* Footer section */}
            <div className="sticky top-[100vh]">
              <FirstFooterSectionComponent  />
              <SecondFooterSectionComponent />
            </div>

          </ProductTypesProvider>
        </SearchProvider>
      </div>
    );
}
export default Home;