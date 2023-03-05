import React, { useState } from "react";
import "./Styles.css";
import Tabla from "./Components/Tabla";
import { useRef } from "react";
import { useEffect } from "react";

function App() {
  
  const [valores, setValores] = useState(
    {
      materia:0,
      nota:0
    }
  ) 
  let [show, setShow] = useState(false)
  const tablaRef = useRef();
  

  //---------------------------------------------------------------------------
  
  function handleChange(event) {
    setValores({...valores, materia: event.target.selectedIndex});
    console.log(event.target.selectedIndex)
  }
  
  function validacionNota(){
    let validacion = false
    const regex = /^(?:10|[1-9])$/;
    const esValido = regex.test(valores.nota);
    esValido?
      validacion = true :
      alert('La nota ingresada no es válida. Por favor ingrese un valor del 1 al 10.');
    return validacion;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShow(false);
    setShow(validacionNota);
    
  }
  
  const ejecutarUpdateEnTabla = ()=>{
    tablaRef.current.updateTable();
    
  }
  
//useEffect para que tablaRef esté inicializado antes de llamar a la función ejecutarUpdateEnTabla.
  useEffect(() => {
    if (show && tablaRef.current ) {
      ejecutarUpdateEnTabla();
    }
    setShow(false)
  });

  return (
    <div className="container">
      <h1>Promedio de estudiantes por carrera</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="container_input">
          <select name="materias" onChange={handleChange} value={valores.materia} required>---------------------------
            
            <option value={0}>Base de Datos</option>
            <option value={1}>Desarrollo Backend</option>
            <option value={2}>Desarrollo Frontend</option>
            <option value={3}>Devops</option>
          </select>
          <input type="number" placeholder="Nota del Alumno" 
          onChange={(event)=>setValores({...valores, nota: event.target.value})} required/>
        </div>
        <input type="submit" value="Salvar"/>
      </form>

      
      <Tabla valores={valores} show={show} ref={tablaRef}/>
      
    </div>
  );
}

export default App;
