import { useState } from "react"
// import useFetch from "../hooks/useFetch";
export const baseUrl ="https://3t2rtbem8h.execute-api.us-east-1.amazonaws.com/Prod/subscriptions"
export default function Subscription(productId){
const [data, setData]= useState({
  name:"",
  email:""
})
// console.log(data)
const [respons, setResponse] =useState()
const handleChange =(event)=> {
  const {name,value} = event.target
  console.log(value)
  setData({ [name ]: value })

}
// var params = {
//   TableName : tableName,
//   Item: { id : id, name: name }
// };
const SubmitHandler = async ()=>{
const params ={
  Item: {
    productId: productId,
    name: data.name,
    email: data.email,
    createdOn: Date.now()
  }
}
fetch(baseUrl,{
  method:"PUT",
  headers:{
    'Content-Type': 'application/json'
  },
  body:params
})
// const {itesm} = useFetch("/subscriptions",{method:"PUT", body:params})
// return setResponse(itesm)
}
    return (
        <form onSubmit={SubmitHandler}>
          <div>
        <small id="emailHelp" className="form-text text-muted">
            Subscripe for this item.
          </small>
          </div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder={data.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder={data.email}
            onChange={handleChange}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
  
        <button type="submit" className="btn btn-primary mt-3">
          SUBMIT
        </button>
        <p>
        {/* {respons? respons : null} */}
        </p>

      </form>
    )
}