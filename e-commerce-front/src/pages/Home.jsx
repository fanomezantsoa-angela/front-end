import Layout from "../components/headerComponent/Layout";
import Produits_type from "../components/headerComponent/Produits_type";
import Products_list from "./Products_list";

function Home() {
    return (
      <div>
        
        <Layout />
        <Produits_type />
        <Products_list />
      </div>
    );
}
export default Home;