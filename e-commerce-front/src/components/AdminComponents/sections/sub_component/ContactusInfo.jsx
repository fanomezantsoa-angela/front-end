import { useState, useEffect } from "react"
import { GetContact } from "../../../../actions/ContactActions"
import Divider from '@mui/material/Divider';
export default function ContactuInfo(){
    const[contacts, setContacts]= useState([])
      const getAllContactus= async()=>{
        const contacts= await GetContact()
        console.log(contacts)
        if(contacts.res){
          console.log(contacts.response)
          setContacts(contacts.response)
        }
        else{
            console.log(contacts.error)
        }
      }
      useEffect(()=>{
        getAllContactus();
      }
      )
    return(
        <div className="m-5 w-9/12 text-justify">
          {contacts.map((contact, index)=>(
            <section key={index} className="p-2">
            
              <p className="font-bold">{contact.name}</p>
              <p className="text-slate-600">{contact.email}</p>
              <p className="text-lg text-sm py-2">{contact.text}</p>
              <Divider />
            </section>
          ))}
         
    

        </div>
        
    )
}