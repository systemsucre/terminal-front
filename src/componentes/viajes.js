
import React from 'react';

import { Table, Modal, ModalBody, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusAlt, faCalendar, faHandPointLeft, faHandPointRight, } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { Select1, ComponenteInputUser, ComponenteInputBuscar_, Footer } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'
import { io } from 'socket.io-client';

import { alert2, confirmarActualizar, confirmarEliminar } from './elementos/alert2'

const socket = io(URL)


function Viajes() {


    const [lista, setLista] = useState([]);
    const [viaje, setViaje] = useState([]);
    const [rutas, setRutas] = useState([])
    const [vehiculo, setVehiculo] = useState([])

    const [id, setId] = useState({ campo: null, valido: null })
    const [idRuta, setIdRuta] = useState({ campo: null, valido: null })
    const [fecha, setFecha] = useState({ campo: null, valido: null })
    const [idVehiculo, setIdVehiculo] = useState({ campo: null, valido: null })



    const [enviado, setEnviado] = useState(0)
    const [modalVer, setModalVerViaje] = useState(false)
    const [modalRegistrar, setModalRegisttar] = useState(false)
    const [modalActualizar, setModalActualizar] = useState(false)
    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })

    const [fechaFormat, setFechaFormat] = useState(null)
    const [ventana, setventana] = useState(0)
    const [room, setRoom] = useState(localStorage.getItem('minuto'));




    const opciones = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


    const auth = useAuth()

    let today = new Date()
    let fecha_ = today.toISOString().split('T')[0]
    let hora_ = new Date().toLocaleTimeString().split(':')[0]
    let min = new Date().toLocaleTimeString().split(':')[1]
    let sec = new Date().toLocaleTimeString().split(':')[2]
    if (hora_ < 10) hora_ = '0' + hora_
    let horafinal = hora_ + ':' + min + ':' + sec
    let fechaHora = fecha_ + ' ' + horafinal

    try {





        useEffect(() => {
            if (inputBuscar.valido === null) listarViajes()
            if (inputBuscar.valido === 'false') listarViajes()
            document.title = 'Viajes'

            if (socket) socket.emit('join', room);

            socket.on('listaViajes', (data) => {
                setLista(data)
                console.log('ok')

                if (modalVer) {
                    console.log('ok, q')
                    data.forEach(e => {

                        if (parseInt(viaje[0].id) === parseInt(e.id)) {
                            verViaje(viaje[0].id)
                            if (modalActualizar === true) { rellenar(); alert2({ icono: 'warning', titulo: 'Actualizado', boton: 'ok', texto: 'Este registro fue actualizado, por otro usuario, Revise la información!' }) }
                            else alert2({ icono: 'warning', titulo: 'Actualizado', boton: 'ok', texto: 'Este registro fue actualizado, por otro usuario, Revise la información!' })
                        }
                    })
                }

            })
            socket.on('error', (data) => {
                alert2({ icono: 'error', titulo: 'Error', boton: 'ok', texto: data })
                setEnviado(0)
            })
            socket.on('exito', (data) => {
                // toast.success(data)
                alert2({ icono: 'success', titulo: 'Exito', boton: 'Ok', texto: data })
                setEnviado(0)
            })

            return () => {
                if (socket) socket.disconnect();
            }
        }, [inputBuscar, room])



        const token = localStorage.getItem("token")
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${token}`
                return config
            },
            error => {
                auth.logout()
                return Promise.reject(error)
            }
        )

        const listarViajes = async () => {
            try {
                axios.post(URL + '/viaje/all').then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            } catch (error) {
                return error
            }
        }


        const siguiente = () => {
            let dir = URL + '/viaje/siguiente'

            if (lista.length > 0) {
                const last = lista[lista.length - 1].id
                // console.log(last, lista)
                axios.post(dir, { id: last }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                    } else {
                        toast.error(json.data.msg)
                    }
                })
            }
        }

        const anterior = () => {
            let dir = URL + '/viaje/anterior'
            if (lista.length > 0) {
                const last = lista[0].id
                console.log(last, lista)
                axios.post(dir, { id: last }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                    } else {
                        toast.error(json.data.msg)
                    }
                })
            }
        }


        const buscar = () => {
            let dir = URL + '/viaje/buscar'
            if (inputBuscar.valido === 'true') {

                axios.post(dir, { dato: inputBuscar.campo }).then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            }
        }

        const formatDate = (date) => {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + (d.getDate() + 1),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            // console.log(year, month, day)
            // let fecha = new Date([year, month, day].join('-'))

            setFechaFormat(new Date([year, month, (parseInt(day) + 1)].join('-')).toLocaleDateString('es-ES', opciones))

        }

        const verViaje = (id) => {
            axios.post(URL + '/viaje/ver', { id: id }).then(json => {
                if (json.data.ok) {
                    // console.log(json.data.data)
                    setViaje(json.data.data)
                    formatDate(json.data.data[0].fecha)
                    setModalVerViaje(true)
                } else toast.error(json.data.msg)
            })
        }


        const vaciarDatos = () => {
            setId({ campo: null, valido: null })
            setIdRuta({ campo: null, valido: null })
            setFecha({ campo: null, valido: null })
            setIdVehiculo({ campo: null, valido: null })
            setModalRegisttar(false)
            setModalActualizar(false)
            setEnviado(0)
        }

        const rellenar = async () => {
            listarRutas()
            setId({ campo: viaje[0].id, valido: 'true' })
            setIdRuta({ campo: viaje[0].idruta, valido: 'true' })
            setFecha({ campo: viaje[0].fecha, valido: 'true' })
            setIdVehiculo({ campo: viaje[0].idvehiculo, valido: 'true' })
            setModalActualizar(true)
            setEnviado(0)
        }

        const listarRutas = (id) => {
            axios.post(URL + '/viaje/listarrutas', { id: id }).then(json => {
                if (json.data.ok) {
                    setRutas(json.data.data[0])
                    setVehiculo(json.data.data[1])
                } else toast.error(json.data.msg)
            })
        }




        const insertarIO = async () => {

            if (enviado === 0 && idRuta.valido === 'true' && fecha.valido === 'true' && idVehiculo.valido === 'true') {
                setEnviado(1)
                socket.emit('guardar', {
                    token: localStorage.getItem('token'),
                    idruta: idRuta.campo,
                    fecha: fecha.campo,
                    idvehiculo: idVehiculo.campo,
                    creado: fechaHora,
                    room: localStorage.getItem('minuto')
                })
                console.log(socket)
                vaciarDatos()
                listarViajes()
            } else toast.error('Complete todos los campos requeridos en el formulario')


        }


        const actualizarIO = async () => {

            if (id.valido === 'true' && enviado === 0 && idRuta.valido === 'true' && fecha.valido === 'true' && idVehiculo.valido === 'true') {
                setEnviado(1)
                socket.emit('actualizar', {
                    token: localStorage.getItem('token'),
                    id: id.campo,
                    idruta: idRuta.campo,
                    fecha: fecha.campo,
                    idvehiculo: idVehiculo.campo,
                    modificado: fechaHora,
                    room: localStorage.getItem('minuto')
                })
                vaciarDatos()
                listarViajes()
                verViaje(id.campo)
            } else toast.error('Complete todos los campos requeridos en el formulario')
        }

        const eliminar = async (id = null) => {


            let accion = await confirmarEliminar({ titulo: 'Quitar información', boton: 'ok', texto: 'Ok para continuar.' })
            if (accion.isConfirmed && id != null) {

                socket.emit('eliminar', {
                    token: localStorage.getItem('token'),
                    id: id,
                    fecha: fechaHora,
                    room: localStorage.getItem('minuto')
                })
                vaciarDatos()
                setModalVerViaje(false)
                setModalActualizar(false)
                listarViajes()
            }
        }




        return (
            <div>

                <div className="hold-transition sidebar-mini" >
                    <div className="wrapper">
                        <Home />
                        <div className="content-wrapper" >
                            <div className="content">
                                <div className="container-fluid pt-1">
                                    <div className='col-12 title-page'>
                                        <FontAwesomeIcon icon={faBusAlt} /> Gestionar viajes
                                    </div >
                                    <div style={{ background: 'white' }}>
                                        {ventana === 0 && <>
                                            <div className='contenedor-cabecera'>
                                                <div className='row'>
                                                    <div className='btn-nuevo col-auto mb-2' onClick={() => { listarRutas(); setModalRegisttar(true) }}>Registrar Viaje</div>
                                                </div>

                                            </div>
                                            <div className='contenedor'>
                                                <div className="container-4">
                                                    <ComponenteInputBuscar_
                                                        estado={inputBuscar}
                                                        cambiarEstado={setInputBuscar}
                                                        name="inputBuscar"
                                                        ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                        placeholder="Escriba para filtrar ..."
                                                        eventoBoton={buscar}
                                                        etiqueta={'Buscar'}
                                                    />
                                                </div>
                                                <div className=" table table-responsive  custom" >

                                                    <Table className="table  table-sm p-2 especific">
                                                        <thead>
                                                            <tr >
                                                                <th className="col-1 ">FECHA</th>
                                                                <th className="col-1  ">DIA</th>
                                                                <th className="col-1  ">HORA</th>
                                                                <th className="col-1 ">ORIGEN</th>
                                                                <th className="col-1  ">DESTINO</th>
                                                                <th className="col-2  ">ENCARGADO</th>
                                                                <th className="col-2  ">VEHICULO</th>

                                                                <th className="col-1  "></th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {lista.map((u, index) => (
                                                                <tr key={index} className='item'>
                                                                    <td className="col-1 ">{u.fecha}</td>
                                                                    <td className="col-1 ">{u.dia}</td>
                                                                    <td className="col-1 ">{u.hora}</td>
                                                                    <td className="col-1 ">{u.origen}</td>
                                                                    <td className="col-1 ">{u.destino}</td>
                                                                    <td className="col-2 ">{u.encargado}</td>
                                                                    <td className="col-2 ">{u.tipo}</td>


                                                                    <td className="col-1  " onClick={() => verViaje(u.id)}> <span className='btn-ver-usuario' >Ver viaje</span></td>
                                                                </tr>
                                                            ))}

                                                        </tbody>

                                                    </Table>
                                                    {lista.length === 0 &&
                                                        <div style={{ width: '100%' }}><strong>NO SE ENCONTRO NINGUNA INFORMACIÓN</strong></div>
                                                    }

                                                </div>
                                            </div>
                                        </>}
                                    </div>
                                    <div className='contenedor-foot'>
                                        <div className='navegador-tabla'>
                                            <div className='row'>
                                                {lista.length > 0 ? <>

                                                    <div className=' col-auto now' onClick={() => anterior()} >
                                                        <FontAwesomeIcon className='anterior' icon={faHandPointLeft} /> Anterior
                                                    </div>
                                                    <div className=' col-auto now' onClick={() => siguiente()}>Siguiente
                                                        <FontAwesomeIcon className=' next' icon={faHandPointRight} />
                                                    </div>

                                                </>
                                                    : <div className=' col-auto now'> Lista vacía</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <Modal isOpen={modalVer}>
                                        <div className='title-page' >
                                            Datos de la viaje
                                        </div>
                                        <ModalBody>
                                            {viaje.length > 0 &&
                                                <div>
                                                    <div className='more-info'>

                                                        <table style={{ width: '100%' }}>
                                                            <thead className='tbl-head'> <th>FECHA</th></thead>
                                                            <tr> <td className='dia-tbl' style={{ border: '0px', fontSize: '18px' }}>{fechaFormat}</td> </tr>
                                                            <br />
                                                        </table >
                                                        <table style={{ width: '60%' }}>
                                                            <thead className='tbl-head'> <th>DIA</th> <th>HORA</th></thead>
                                                            <tr> <td className='dia-tbl'>{viaje[0].dia}</td> <td className='hora-tbl'>{viaje[0].hora}</td></tr>
                                                            <br />
                                                        </table >
                                                        <table style={{ width: '100%', marginBottom: '10px' }} >
                                                            <thead className='tbl-head'> <th> ORIGEN</th> <th></th></thead>
                                                            <tr > <td className='dia-tbl'>{viaje[0].origen}</td><td className='hora-tbl'>{viaje[0].lugarorigen}</td></tr>
                                                        </table>

                                                        <table style={{ width: '100%', marginBottom: '20px' }} >
                                                            <thead className='tbl-head'> <th>DESTINO</th> <th></th></thead>
                                                            <tr className='horadia-tbl'> <td className='dia-tbl'> {viaje[0].destino}</td><td className='hora-tbl'>{viaje[0].lugardestino}</td></tr>
                                                        </table>


                                                        <table style={{ width: '50%' }} >
                                                            <thead className='tbl-head'> <th>DURACION VIAJE</th> <th></th></thead>
                                                            <tr className='horadia-tbl'> <td className='dia-tbl'> {viaje[0].duracion + ' HRS.'}</td></tr>
                                                        </table>

                                                    </div>
                                                    <div className='more-info-add mt-5'>
                                                        <h2>
                                                            Otra información
                                                        </h2>
                                                        <ul>
                                                            <li key={'1c'} className='list-adicional' > {viaje[0].editor ? 'Editor:  ' + viaje[0].editor : 'sin validar'}</li>
                                                            <li key={'1d'} className='list-adicional'>  <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{viaje[0].creado ? 'Fecha creación : ' + viaje[0].creado : 'Sin fecha'}</li>
                                                            <li key={'1e'} className='list-adicional'> <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{viaje[0].modificado ? 'Fecha actualización :  ' + viaje[0].modificado : 'Todavia no se ha actualizado'}</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            }
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => {
                                                setModalVerViaje(false); listarViajes()
                                            }} > Cancelar</div>

                                            <div className='btn-nuevo col-auto' onClick={() => { rellenar() }}>Actualizar</div>
                                        </div>
                                    </Modal>


                                    <Modal isOpen={modalRegistrar}>

                                        <div className='title-page' >
                                            Registrar viaje
                                        </div>
                                        <ModalBody>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Select1
                                                        estado={idRuta}
                                                        cambiarEstado={setIdRuta}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={rutas}
                                                        etiqueta={'Ruta'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </Select1>
                                                </div>

                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={fecha}
                                                        cambiarEstado={setFecha}
                                                        ExpresionRegular={INPUT.FECHA}
                                                        etiqueta={'Fecha'}
                                                        tipo='date'
                                                    />
                                                </div>

                                                <div className='col-12'>
                                                    <Select1
                                                        estado={idVehiculo}
                                                        cambiarEstado={setIdVehiculo}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={vehiculo}
                                                        etiqueta={'Transporte'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </Select1>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalRegisttar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { insertarIO() }}> Registrar</div>

                                        </div>
                                    </Modal>

                                    <Modal isOpen={modalActualizar}>

                                        <div className='title-page' >
                                            Actualizar viaje
                                        </div>
                                        <ModalBody>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Select1
                                                        estado={idRuta}
                                                        cambiarEstado={setIdRuta}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={rutas}
                                                        etiqueta={'Ruta'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </Select1>
                                                </div>

                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={fecha}
                                                        cambiarEstado={setFecha}
                                                        ExpresionRegular={INPUT.FECHA}
                                                        etiqueta={'Fecha'}
                                                        tipo='date'
                                                    />
                                                </div>

                                                <div className='col-12'>
                                                    <Select1
                                                        estado={idVehiculo}
                                                        cambiarEstado={setIdVehiculo}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={vehiculo}
                                                        etiqueta={'Transporte'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </Select1>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalActualizar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { actualizarIO() }}>Actualizar</div>
                                            <div className='btn-eliminar col-auto' onClick={() => eliminar(viaje[0].id)} >Eliminar</div>
                                        </div>
                                    </Modal>



                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div >
                </div >
                <Toaster position='top-right' />
            </div >
        );
    } catch (error) {
        // auth.logout()
    }

}
export default Viajes;
