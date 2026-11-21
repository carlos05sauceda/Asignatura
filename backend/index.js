const express = require('express')
const Alumno = require('./Modelos/Alumno')
const Asignatura = require('./Modelos/Asignatura')

const app = express()

app.use(express.json())



app.get('/alumno', async (req, resp) => {
    try {

        

        const alumno = await Alumno.findAll();

        if (alumno.length > 0) {
            resp.status(200).json(alumno)
        }
        else {
            resp.status(402).json({ 'mensaje': 'Sin alumnos para mostrar' })
        }


    } catch (error) {
        resp.status(500).json(error)
    }
})



app.get('/asignatura', async (req, resp) => {
    try {

        

        const asignatura = await Asignatura.findAll();

        if (asignatura.length > 0) {
            resp.status(200).json(asignatura)
        }
        else {
            resp.status(402).json({ 'mensaje': 'Sin asignatura para mostrar' })
        }


    } catch (error) {
        resp.status(500).json(error)
    }
})


app.post('/alumno', async (req, resp) => {
    try {

       

        const alumno = await Alumno.create(req.body)
        resp.status(200).json(alumno)

    } catch (error) {
        resp.status(500).json(error)
    }
})


app.post('/asignatura', async (req, resp) => {
    try {

       

        const asignatura = await Asignatura.create(req.body)
        resp.status(200).json(asignatura)

    } catch (error) {
        resp.status(500).json(error)
    }
})






app.put('/alumno/:id', async (req, resp) => {

    try {


       

        const [updated] = await Alumno.update(req.body, {
            where: { id: req.params.id }
        })

        if (updated) {
            resp.status(200).json({ mensaje: 'Alumno actualziado' })
        }
        else {
            resp.status(400).json({ mensaje: 'Alumno no se actualizo' })
        }

    } catch (error) {
        resp.status(500).json(error)
    }
})



app.put('/asignatura/:idAsignatura', async (req, resp) => {

    try {


       

        const [updated] = await Asignatura.update(req.body, {
            where: { idAsignatura: req.params.idAsignatura }
        })

        if (updated) {
            resp.status(200).json({ mensaje: 'Asignatura actualziada' })
        }
        else {
            resp.status(400).json({ mensaje: 'La asignatura no se actualizo' })
        }

    } catch (error) {
        resp.status(500).json(error)
    }
})






app.delete('/alumno/:id', async (req, resp) => {
    try {

      

        const deleted = await Alumno.destroy({
            where: { id: req.params.id }
        })

        if (deleted) {
            resp.status(200).json({ mensaje: 'Alumno eliminado' })
        }
        else {
            resp.status(400).json({ mensaje: 'Alumno no se elimno' })
        }

    } catch (error) {
        resp.status(500).json(error)
    }
})




app.delete('/asignatura/:idAsignatura', async (req, resp) => {
    try {

      

        const deleted = await Asignatura.destroy({
            where: { idAsignatura: req.params.idAsignatura }
        })

        if (deleted) {
            resp.status(200).json({ mensaje: 'Asignatura eliminada' })
        }
        else {
            resp.status(400).json({ mensaje: 'La asignatura no se elimno' })
        }

    } catch (error) {
        resp.status(500).json(error)
    }
})




app.listen(5000, () => {
    console.log('Aplicacion ejecutando')
})