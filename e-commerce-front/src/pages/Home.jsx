import Layout from "../components/headerComponent/Layout";
import Produits_type from "../components/headerComponent/Produits_type";
import Products_list from "./Products_list";
import FirstFooterSectionComponent from "../components/footer/FIrstFooterSectionComponent"
import SecondFooterSectionComponent from "../components/footer/SecondFooterSectionComponent";
import { ProductTypesProvider } from "../Hooks/Product_typesContext";
import { SearchProvider } from "../Hooks/SearchContext";
import IncitationComponent from "../components/Contact us/IncitationComponent";



function Home() {
 
    return (

 
       

      <div className="w-full h-[100%] min-h-screen space-y-28">
            {/* Header */}
            <SearchProvider>
          <ProductTypesProvider>
        <div>
          {/* Top section */}
          <Layout />

          {/* Link of product types */}
          <Produits_type />
        </div>

        {/* List of product */}
        <Products_list />


        {/* Add section */}
        <div >
          <p>Add section</p>
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