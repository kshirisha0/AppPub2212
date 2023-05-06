import './App.css';
import {useState} from "react"

function App() {


  let [employees,setEmployees] = useState([])

   let getDataServerFromServer=async()=>{
    let reqOptions={
      method:"GET"
    }

    let JSONData = await fetch("/getEmployees",reqOptions)
    
    let JSOData = await JSONData.json()

      setEmployees(JSOData)
      console.log(JSOData)
   }



  return (
    <div className="App">

      <button onClick={()=>{
        getDataServerFromServer()
      }}>Get Data From Server</button>
      {employees.map((employee)=>{
      return (
        <div>
          <h1>{employee.name}</h1>
          <h2>{employee.email}</h2>
          <h2>{employee.gender}</h2>
          <h2>{employee.age}</h2>

        </div>
      )
      })}
       </div>
  );
}

export default App;
