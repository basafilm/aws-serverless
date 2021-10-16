import { useEffect, useState } from "react";

export  const baseUrl= "https://3t2rtbem8h.execute-api.us-east-1.amazonaws.com/Prod"

export default function useFetch (path, {method, body}){
  const [items,setItems]= useState()

    useEffect(() => {
        try {
          fetch(baseUrl + path,{
            method:method,
            headers: {
              "Access-Control-Allow-Headers":
                "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
              "Access-Control-Allow-Origin": "*", // Allow from anywhere
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH", // Allow only GET request
            },
           body:body? body:null
          })
          .then(response => response.json())
          .then(data => {
            const   products = data.Items.map((item) => {
              return { ...item, selected: false };
            })
            setItems(products)
          } )
        } catch (error) {
         throw error
        }
      
      },[path ,method, body])
      return {items}
}