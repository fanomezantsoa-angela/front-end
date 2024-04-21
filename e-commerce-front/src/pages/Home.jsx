import Layout from "../components/headerComponent/Layout";
import Produits_type from "../components/headerComponent/Produits_type";
import Products_list from "./Products_list";
import FirstFooterSectionComponent from "../components/footer/FIrstFooterSectionComponent"
import SecondFooterSectionComponent from "../components/footer/SecondFooterSectionComponent";
import { ProductTypesProvider } from "../Hooks/Product_typesContext";
import { SearchProvider } from "../Hooks/SearchContext";

function Home() {
 
    return (
      <div className="w-full h-[100%] min-h-screen">
        <SearchProvider>
          <ProductTypesProvider>
            <Layout />
            <Produits_type />
            <Products_list />
            <div className="sticky top-[100vh]">
              <FirstFooterSectionComponent />
              <SecondFooterSectionComponent />
            </div>
          </ProductTypesProvider>
        </SearchProvider>
      </div>
    );
}
export default Home;