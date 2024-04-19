import Layout from "../components/headerComponent/Layout";
import Produits_type from "../components/headerComponent/Produits_type";
import Products_list from "./Products_list";
import FirstFooterSectionComponent from "../components/footer/FIrstFooterSectionComponent"
import SecondFooterSectionComponent from "../components/footer/SecondFooterSectionComponent";


function Home() {
    return (
      <div className="w-full h-[100%] min-h-screen">
        <Layout />
        <Produits_type />
        <Products_list />
        <div className="sticky top-[100vh]">
          <FirstFooterSectionComponent  />
          <SecondFooterSectionComponent />
        </div>
      </div>
    );
}
export default Home;