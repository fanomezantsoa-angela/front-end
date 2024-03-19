import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../little/Button";
import { postProduct, type_product } from "../Hooks/API";
import { useState, useEffect } from "react";

function Produits() {
    
    const [name, setName, namechange] = Inputhandler("");
    const [desciption, setDescription, descriptionchange] = Inputhandler("");
    const [price, setPrice, pricechange] = Inputhandler("");
    const [expiration_date, setExpiration_date, expirationchange] = Inputhandler("");
    const [type, setType, typechange] = Inputhandler("");
    const [typeOptions, setTypeOptions] = useState([]);
    const formData = {
        name: name,
        description: desciption,
        price: price,
        expiration_date: expiration_date,
        type: type

    }
    const resetform = () => {
        setExpiration_date('')
        setDescription('')
        setName('')
        setPrice('')
        setType('');
    }
    useEffect(() => {
      async function fetchTypeList() {
        try {
            const types = await type_product();
            
          setTypeOptions(types.results);
        } catch (error) {
          console.error("Error fetching type list:", error);
        }
      }
      fetchTypeList();
    }, []);
    const submit = async (e) => {
        e.preventDefault()
        try{
          const responseData = await postProduct(formData);
        // Handle response data as needed
            console.log('Response:', responseData);
            
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        }
        resetform()
    }
    return (
      <div className="Produits-form">
        <form>
          <label htmlFor="name">Name</label> <br />
          <input type="text" value={name} onChange={namechange} /> <br />
          <label htmlFor="desciption">Description</label> <br />
          <input
            type="text"
            value={desciption}
            onChange={descriptionchange}
          />{" "}
          <br />
          <label htmlFor="price">Price</label> <br />
          <input type="number" value={price} onChange={pricechange} /> <br />
          <label htmlFor="expiration_date">Date d'éxpiration</label> <br />
          <input
            type="date"
            value={expiration_date}
            onChange={expirationchange}
          />{" "}
          <br />
          <select value={type} onChange={typechange}>
            <option value="">Select Type</option>
            {typeOptions.map((typeOption, index) => (
              <option key={index} value={typeOption.id}>
                {typeOption.designation}
              </option>
            ))}
          </select>
          <Button
            action="Ajouter Produit"
            buttonhandle={submit}
            classname="ajout-produit"
          />
        </form>
      </div>
    );
}
export default Produits;