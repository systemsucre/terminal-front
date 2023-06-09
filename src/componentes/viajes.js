
import React from 'react';

import { Table, Modal, ModalBody, ModalHeader, Button, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusAlt, faCalendar, faHandPointLeft, faHandPointRight, faList, faListUl, faShippingFast, } from '@fortawesome/free-solid-svg-icons';

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
                // console.log('ok', modalVer, data)

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
            console.log(modalVer)
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
                let last =[]
                lista.forEach(e=>{
                    last.push(e.id)                    
                })
                last= Math.max(...last)
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
                                                                <th className="col-1  btn-acciones-ajuste-tbl"></th>
                                                                <th className="col-1 ">FECHA</th>
                                                                <th className="col-1  ">DIA</th>
                                                                <th className="col-1  ">HORA</th>
                                                                <th className="col-2 ">ORIGEN</th>
                                                                <th className="col-2  ">DESTINO</th>
                                                                <th className="col-2  ">VEHICULO</th>

                                                                {/* <th className="col-1  "></th> */}

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {lista.map((u, index) => (
                                                                <tr key={index} className='item'>
                                                                    <td className="col-1 ">
                                                                        <Button className='btn-viaje-tbl'><FontAwesomeIcon  icon={faBusAlt}></FontAwesomeIcon></Button>
                                                                        <Button className='btn-encomienda-tbl'><FontAwesomeIcon  icon={faShippingFast}></FontAwesomeIcon></Button>
                                                                        <Button className='btn-ver-tbl' onClick={() => verViaje(u.id)}><FontAwesomeIcon  icon={faList}></FontAwesomeIcon></Button>

                                                                    </td>
                                                                    <td className="col-1 ">{u.fecha}</td>
                                                                    <td className="col-1 ">{u.dia}</td>
                                                                    <td className="col-1 ">{u.hora}</td>
                                                                    
                                                                    <td className="col-2 ">{u.origen}</td>
                                                                    <td className="col-2 ">{u.destino}</td>
                                                                    <td className="col-2 ">{u.tipo}</td>
                                                                    {/* <td className="col-1  " onClick={() => verViaje(u.id)}> <span className='btn-ver-usuario' >Ver viaje</span></td> */}
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

                                    <Modal isOpen={modalVer} toggle={() => setModalVerViaje(!modalVer)} fullscreen>
                                        <ModalHeader toggle={() => { setModalVerViaje(!modalVer); listarViajes() }}>DATOS GENERALES</ModalHeader>
                                        {viaje.length > 0 &&
                                            <div className='modal-cabecera' >
                                                <p className='fecha-modal'>{'Programación del viaje previsto ' + fechaFormat + ', '}</p>
                                                <p className='dia-modal'>{'Ruta Programado para el dia ' + viaje[0].dia + '  a horas ' + viaje[0].hora}</p>
                                                <p className='duracion-modal'>{'Duración del viaje ' + viaje[0].duracion + ' Horas'}</p>
                                                <Button
                                                    color="primary"
                                                    onClick={() => { rellenar() }}
                                                >
                                                    Actualizar
                                                </Button>
                                            </div>
                                        }
                                        <ModalBody>
                                            {viaje.length > 0 &&
                                                <div>
                                                    <div className='more-info'>

                                                        <div className='row '>
                                                            <div className='col-6'>
                                                                <p className='origen-titulo-modal'>Origen</p>
                                                                <p className='origen-modal'>{viaje[0].origen}</p>
                                                                <p className='origen-especifico-modal'>{viaje[0].lugarorigen}</p>
                                                            </div>

                                                            <div className='col-6'>
                                                                <p className='origen-titulo-modal'>Destino</p>
                                                                <p className='origen-modal'>{viaje[0].destino}</p>
                                                                <p className='origen-especifico-modal'>{viaje[0].lugardestino}</p>


                                                            </div>
                                                        </div>
                                                        <br></br>
                                                        <p className='origen-titulo-modal'>Encargado</p>
                                                        <p className='origen-modal'>{viaje[0].encargado}</p>
                                                        <p className='origen-especifico-modal'>{viaje[0].vehiculo}</p>
                                                        <p className='origen-especifico-modal'>{viaje[0].placa}</p>


                                                    </div>
                                                    <div className='more-info-add mt-5'>
                                                        <div>
                                                            <p className='origen-titulo-modal' > {viaje[0].editor ? viaje[0].editor : 'SIN VALIDAD'}</p>
                                                            <p className='origen-titulo-modal'> <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{viaje[0].creado ? 'CREACION  ' + viaje[0].creado : 'SIN FECHA'}{viaje[0].modificado ? '   -   ACTUALIZACION  ' + viaje[0].modificado : 'YYYY-MM-DD'}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            }
                                        </ModalBody>
                                    </Modal>


                                    <Modal isOpen={modalRegistrar}>

                                        <ModalHeader toggle={() => setModalRegisttar(!modalRegistrar)}>REGISTRAR VIAJE</ModalHeader>
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
                                            <div className='btn-nuevo col-auto' onClick={() => { insertarIO() }}> Registrar</div>
                                        </div>
                                    </Modal>

                                    <Modal isOpen={modalActualizar}>
                                        <ModalHeader toggle={() => setModalActualizar(!modalActualizar)}>ACTUALIZAR VIAJE</ModalHeader>
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
                                        <div className="row botonModal mt-3">
                                            <div className='btn-nuevo col-auto' onClick={() => { actualizarIO() }}>Actualizar</div>
                                            <div className='btn-eliminar ml-2 col-auto' onClick={() => eliminar(viaje[0].id)} >Eliminar</div>
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
