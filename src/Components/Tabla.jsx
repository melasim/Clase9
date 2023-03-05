import React from 'react';
import { useState } from "react";
import '../Styles.css';
import { useImperativeHandle } from 'react';



const Tabla = React.forwardRef(({valores, show}, ref) => {
    const [tabla, setTabla]=useState(
        [
            {
                asignatura: "Base de datos",
                cantAlumnos: 0,
                promedio: 0
            },
            {
                asignatura: "Desarrollo front-end",
                cantAlumnos: 0,
                promedio: 0
            },
            {
                asignatura: "Desarrollo back-end",
                cantAlumnos: 0,
                promedio: 0
            }
        ]
        )
        
        const [notas, setNotas] = useState([0]);
        const [promedio, setPromedio] = useState(0);
        const agregarNota = (nota) => {
            setNotas([...notas, nota]);
            const sumatoria = notas.reduce((acumulador, valor) => acumulador + valor, nota);
            setPromedio(sumatoria / (notas.length + 1));
        };
        
        const updateTable = () => {
            const index = valores.materia;
            const cantidadAlumnos = parseInt(tabla[index].cantAlumnos + 1);
            console.log(notas)
            let suma = 0;
            let promedioFinal = 0;
            if (valores.nota !== 0){ 
                    agregarNota(parseInt(valores.nota))
                    promedioFinal = promedio;
                    console.log("promedio: "+promedioFinal)
            }
                show && 
                setTabla(tabla.map((item, i) => i === index ? {...item, 
                    cantAlumnos: cantidadAlumnos 
                    ,promedio: promedioFinal
                } : item));
                console.log("index: " + index)
            }
            
            useImperativeHandle(ref, () => ({
                updateTable,
            }));
            
            
            
        return (
        <div className="container">
        <table border="1" className="line_title">
            <thead>
                <tr>
                <th>Carrera</th>
                <th>Cantidad de Estudiantes</th>
                <th>Promedio de Calificaciones de los Estudiantes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{tabla[0].asignatura}</td>
                <td>{tabla[0].cantAlumnos}</td>
                <td>{tabla[0].promedio}</td>
                </tr>

                <tr>
                <td>{tabla[1].asignatura}</td>
                <td>{tabla[1].cantAlumnos}</td>
                <td>{tabla[1].promedio}</td>
                </tr>

                <tr>
                <td>{tabla[2].asignatura}</td>
                <td>{tabla[2].cantAlumnos}</td>
                <td>{tabla[2].promedio}</td>
                </tr>
            </tbody>
            </table>
        </div>
        )
        

})

export default Tabla