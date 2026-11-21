import { View, Text, Alert, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Alumno } from '../Modelos/Alumno'
import { Asignatura } from '../Modelos/Asignatura'
import api from '../service/Api'

export default function Formulario() {

    const [id, setId] = useState<number>(0)
    const [nombre, setNombre] = useState<string>('')
    const [apellido, setApellido] = useState<string>('')


     const [idAsignatura, setIdAsignatura] = useState<number>(0)
    const [Anombre, setANombre] = useState<string>('')
    const [codigo, setCodigo] = useState<string>('')

    const [idEstudiante, setIdEstudiante] = useState<number>(0)

    const [Carrera, setCarrera] = useState<string>('')

    const [registro, setRegistro] = useState<string>('')

    const [fotoPlataforma, setFotoPlataforma] = useState<string>('')

    const [alumnos, setAlumnos] = useState<Alumno[]>([]);

    const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);



    async function getAlumno() {

        try {

            console.log('llamando la consulta...')
            const response = await api.get('/alumno')
            setAlumnos(response.data)
        } catch (error) {
          
            Alert.alert('Error al consultar alumnos')
        }
    }



    
    async function getAsignatura() {

        try {

            console.log('llamando la consulta...')
            const response = await api.get('/asignatura')
            setAsignaturas(response.data)
        } catch (error) {
          
            Alert.alert('Error al consultar alumnos')
        }
    }




    async function guardarAlumno() {
        try{

            const nuevoAlumno: Alumno = {
                id: 0,
                nombre: nombre,    
                apellido: apellido,
                Carrera: Carrera,
                registro: registro,
                fotoPlataforma: fotoPlataforma
            } 

            const response = await api.post('/alumno', nuevoAlumno)
            getAlumno()
            Alert.alert('Alumno guardado correctamente')

        }
        catch(error){
            Alert.alert('Error al guardar alumno')
        }
    }






     async function guardarAsignatura() {
        try{

            const nuevaAsignatura: Asignatura = {
                idAsignatura: idAsignatura,
                nombre: nombre,    
                codigo: codigo,
                idEstudiante: idEstudiante,
                
            } 

            const response = await api.post('/asignatura', nuevaAsignatura)
            getAsignatura()
            Alert.alert('Asignatura guardada correctamente')

        }
        catch(error){
            Alert.alert('Error al guardar asignatura')
        }
    }




    async function eliminarAlumno(id: number) {
        try {
            await api.delete(`/alumno/${id}`);    
            getAlumno();
            Alert.alert('Alumno eliminado correctamente');
        }
        catch (error) {
            Alert.alert('Error al eliminar alumno');
        }      
    }

     async function eliminarAsignatura(id: number) {
        try {
            await api.delete(`/asignatura/${id}`);    
            getAsignatura();
            Alert.alert('Asignatura eliminada correctamente');
        }
        catch (error) {
            Alert.alert('Error al eliminar alumno');
        }      
    }

    useEffect(() => {
        getAlumno();
        getAsignatura();
    }, [])



    return (
        <View>
            <Text>Formulario</Text>

            <TextInput placeholder="ID" value={id.toString()} onChangeText={(text) => setId(parseInt(text) || 0)} />
            <TextInput placeholder="Nombre" value={Anombre} onChangeText={setANombre} />
            <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} />
            <TextInput placeholder="Carrera" value={Carrera} onChangeText={setCarrera} />
            <TextInput placeholder="Registro" value={registro} onChangeText={setRegistro} />
            <Button title="Guardar Alumno" onPress={guardarAlumno} />


             <TextInput placeholder="IdAsignatura" value={idAsignatura.toString()} onChangeText={(text) => setIdAsignatura(parseInt(text) || 0)} />
            <TextInput placeholder="Nombre Asignatura" value={nombre} onChangeText={setNombre} />
            <TextInput placeholder="Codigo" value={codigo} onChangeText={setCodigo} />
            <TextInput placeholder="ID EStudiante" value={idEstudiante.toString()} onChangeText={(text) => setIdEstudiante(parseInt(text) || 0) } />
             <Button title="Guardar Asignatura" onPress={guardarAsignatura} />

            {
                alumnos.map((alumno) => (
                    <View key={alumno.id}>
                        <Text>{alumno.nombre} {alumno.apellido}</Text>
                        <Text>{alumno.Carrera}</Text>
                        <Text>{alumno.registro}</Text>
                        
                        <Button title="Eliminar" onPress={() => eliminarAlumno(alumno.id)} />
                    </View>
                ))
            }


                {
                asignaturas.map((asignatura) => (
                    <View key={asignatura.idAsignatura}>
                        <Text>{asignatura.nombre} </Text>
                        <Text>{asignatura.codigo}</Text>
                        <Text>{asignatura.idEstudiante}</Text>
                        
                        <Button title="Eliminar" onPress={() => eliminarAsignatura(asignatura.idAsignatura)} />
                    </View>
                ))
            }
        </View>
    )
}