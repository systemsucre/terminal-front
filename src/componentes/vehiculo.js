
import React from 'react';

import { Table, Modal, ModalBody, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUserCog, faCalendar, faHandPointLeft, faHandPointRight, faCar, faBus, faBusAlt, faCog, faCheck, faCheckCircle, faExclamation, } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { Select1, ComponenteInputUser, ComponenteInputBuscar_, Footer, ComponenteInputUserDisabled } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'

import { Taxi, Surubi, MinibusCuatroFilas, MinibusCincoFilas, MinibusSeisFilas } from './asientos/asientos'





function Vehiculo() {

    const [lista, setLista] = useState([]);
    const [vehiculo, setVehiculo] = useState([]);
    const [asiento, setAsiento] = useState([]);
    const [tipo, setTipo] = useState([])
    const [personal, setPersonal] = useState([])

    const [id, setId] = useState({ campo: null, valido: null })
    const [idTipo, setIdTipo] = useState({ campo: null, valido: null })


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })
    const [modalVer, setModalVer] = useState(false)
    const [modalRegistrar, setModalRegisttar] = useState(false)
    const [modalActualizar, setModalActualizar] = useState(false)
    const [modalReconfigurar, setModalReconfigurar] = useState(false)


    const [eliminado, seteliminado] = useState(false)
    const [enviado, setEnviado] = useState(0)
    const [encargado, setEncargado] = useState(null)
    const [placaM, setPlacaM] = useState(null)
    const [tipoM, setTipoM] = useState(null)
    const [capacidadM, setCapacidadM] = useState(null)


    const [idUsuario, setIdUssuario] = useState({ campo: '', valido: null })
    const [placa, setPlaca] = useState({ campo: '', valido: null })
    const [modelo, setModelo] = useState({ campo: '', valido: null })
    const [capacidad, setCapacidad] = useState({ campo: null, valido: null })



    const auth = useAuth()

    let today = new Date()
    let fecha_ = today.toISOString().split('T')[0]
    let hora = new Date().toLocaleTimeString().split(':')[0]
    let min = new Date().toLocaleTimeString().split(':')[1]
    let sec = new Date().toLocaleTimeString().split(':')[2]
    if (hora < 10) hora = '0' + hora
    let horafinal = hora + ':' + min + ':' + sec
    let fechaHora = fecha_ + ' ' + horafinal

    try {

        useEffect(() => {
            if (inputBuscar.valido === null && eliminado === false) listarVehiculos()
            if (inputBuscar.valido === 'false' && eliminado === false) listarVehiculos()
            if (inputBuscar.valido === 'false' && eliminado === true) listarReciclaje()
            document.title = 'vehiculos'

        }, [inputBuscar])

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

        const listarVehiculos = async () => {
            try {
                axios.post(URL + '/vehiculo/all').then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            } catch (error) {
                return error
            }
        }
        const listarReciclaje = async () => {
            setLista([])
            axios.post(URL + '/vehiculo/reciclaje').then(json => {
                if (json.data.ok) {
                    setLista(json.data.data)
                }
                else
                    toast.error(json.data.msg)
            })
        }



        const siguiente = () => {
            let dir = null
            if (eliminado)
                dir = URL + '/vehiculo/nextdelete'
            else dir = URL + '/vehiculo/next'

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
            let dir = null
            if (eliminado)
                dir = URL + '/vehiculo/anterioreliminados'
            else dir = URL + '/vehiculo/anterior'
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
            let dir = null
            if (eliminado)
                dir = URL + '/vehiculo/buscareliminados'
            else dir = URL + '/vehiculo/buscar'
            if (inputBuscar.valido === 'true') {
                axios.post(dir, { dato: inputBuscar.campo }).then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            }
        }

        const verVehiculo = (id) => {
            axios.post(URL + '/vehiculo/ver', { id: id }).then(json => {
                if (json.data.ok) {
                    console.log(json.data.data[0][0])
                    setVehiculo(json.data.data[0])
                    setAsiento(json.data.data[1])
                    setPlacaM(json.data.data[0][0].placa)
                    setCapacidadM(json.data.data[0][0].capacidad)
                    setTipoM(json.data.data[0][0].tipo)
                    setModalVer(true)
                    setIdTipo({ campo: json.data.data[0].idTipo, valido: 'true' });
                    setId({ campo: json.data.data[0].id, valido: 'true' })
                } else toast.error(json.data.msg)
            })
        }

        // listar personal y tipo de vehiculo para proceder a registrar el vehiculo
        const listarTipoPersonal = async () => {
            axios.post(URL + '/vehiculo/tipo-personal').then(json => {
                if (json.data.ok) {
                    setPersonal(json.data.data[0])
                    setTipo(json.data.data[1])
                }
                else toast.error(json.data.msg)
            })
        }


        const vaciarDatos = () => {
            setId({ campo: null, valido: null })
            setIdTipo({ campo: null, valido: null })
            setIdUssuario({ campo: null, valido: null })
            setIdTipo({ campo: null, valido: null })
            setPlaca({ campo: null, valido: null })
            setModelo({ campo: null, valido: null })
            setEnviado(0)
        }


        const rellenar = async () => {
            listarTipoPersonal()
            setId({ campo: vehiculo[0].id, valido: 'true' })
            setIdTipo({ campo: vehiculo[0].idtipo, valido: 'true' })
            setIdUssuario({ campo: vehiculo[0].idusuario, valido: 'true' })
            setPlaca({ campo: vehiculo[0].placa, valido: 'true' })
            setCapacidad({ campo: vehiculo[0].capacidad, valido: 'true' })
            setModelo({ campo: vehiculo[0].modelo, valido: 'true' })
            setModalActualizar(true)
        }

        const rellenarReconfigurar = async () => {
            let ok = window.confirm('LUEGO DE RECONFIGURAR TENDRA QUE VOLVER A REGISTRAR LOS ASIENTOS, Desea reconfigurar este vehículo ?')
            if (ok) {
                listarTipoPersonal()
                setId({ campo: vehiculo[0].id, valido: 'true' })
                setIdTipo({ campo: vehiculo[0].idtipo, valido: 'true' })
                setModalReconfigurar(true)
            }
        }

        // para registrar el vehiculo se comprueba que la capacidad este dentro de los parametros establecidos en la bd
        const registrar = async () => {
            if (idTipo.valido === 'true' && idUsuario.valido === 'true' &&
                placa.valido === 'true' && modelo.valido === 'true' && enviado == 0) {
                setEnviado(1)
                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                axios.post(URL + '/vehiculo/registrar', {
                    idtipo: idTipo.campo,
                    idusuario: idUsuario.campo,
                    placa: placa.campo,
                    modelo: modelo.campo,
                    creado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                        toast.success(json.data.msg)
                        setModalRegisttar(false)
                        vaciarDatos()
                    } else { toast.error(json.data.msg); setEnviado(0) }
                })


            } else toast.error('Complete todos los campos requeridos en el formulario')
        }



        const actualizar = async () => {
            if (id.valido === 'true' && idUsuario.valido === 'true' &&
                placa.valido === 'true' && modelo.valido === 'true' && enviado == 0) {

                setEnviado(1)

                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                axios.post(URL + '/vehiculo/actualizar', {
                    id: id.campo,
                    idusuario: idUsuario.campo,
                    placa: placa.campo,
                    modelo: modelo.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setVehiculo(json.data.data[0])
                        setAsiento(json.data.data[1])
                        setPlacaM(json.data.data[0][0].placa)
                        setCapacidad(json.data.data[0][0].capacidad)
                        setTipoM(json.data.data[0][0].tipo)
                        toast.success(json.data.msg)
                        setModalActualizar(false)
                        vaciarDatos()
                    } else { toast.error(json.data.msg); setEnviado(0) }
                })

            } else toast.error('Complete todos los campos requeridos en el formulario')
        }


        const reConfigurar = async () => {
            if (id.valido === 'true' && idTipo.valido === 'true' && enviado == 0) {
                setEnviado(1)
                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                axios.post(URL + '/vehiculo/re-configurar', {
                    idvehiculo: id.campo,
                    idtipo: idTipo.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setVehiculo(json.data.data[0])
                        setAsiento(json.data.data[1])
                        setPlacaM(json.data.data[0][0].placa)
                        setCapacidad(json.data.data[0][0].capacidad)
                        setTipoM(json.data.data[0][0].tipo)
                        toast.success(json.data.msg)
                        setModalReconfigurar(false)
                        vaciarDatos()
                    } else { toast.error(json.data.msg); setEnviado(0) }
                })

            } else toast.error('Complete todos los campos requeridos en el formulario')
        }

        // al eliminar el registro de cambia el estadoa a no disponible
        const eliminar = async (id = null) => {
            const ok = window.confirm('¿está seguro de desactivar el registro?');
            if (ok === true && id != null) {

                axios.post(URL + '/vehiculo/eliminar', { id: id, fecha: fechaHora }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                        toast.success(json.data.msg)
                        setModalVer(false)
                        setModalActualizar(false)
                    } else toast.error(json.data.msg)
                })
            }
        }

        // el estado se cambia a disponible
        const restaurar = async (ids) => {

            const ok = window.confirm('¿está seguro de activar este registro?');
            if (ok) {
                if (ids !== null) {

                    axios.post(URL + '/vehiculo/restaurar', { id: ids, fecha: fechaHora }).then(json => {
                        if (json.data.ok) {
                            setLista(json.data.data)
                            toast.success(json.data.msg)
                            seteliminado(false)
                            setModalVer(false)
                        }
                        else
                            toast.error(json.data.msg)
                    })
                }
            }
        }





        const registrarAsiento = async (numero, ubi) => {
            let ok = window.confirm('El asiento ' + numero + ' se esta registrando. Desea continuar?')
            if (ok) {
                if (ubi > 0 && numero > 0 && enviado === 0) {
                    if (numero <= vehiculo[0].capacidad) {
                        setEnviado(1)
                        axios.post(URL + '/asiento/registrar', {
                            idvehiculo: vehiculo[0].id,
                            idasientoubi: ubi,
                            numero: numero,
                            capacidad: vehiculo[0].capacidad,
                            creado: fechaHora
                        }).then(json => {
                            if (json.data.ok) {
                                setAsiento(json.data.data)
                                toast.success(json.data.msg)
                                setEnviado(0)
                            }
                            else { toast.error(json.data.msg); setEnviado(0) }
                        })

                    } else toast.error('El numero de asiento esta por encima de la capacidad del vehículo')
                } else { toast.error('Complete el formulario'); setEnviado(0) }
            }
        }


        const eliminarAsiento = async (numero) => {
            let ok = window.confirm('Desea quitar este asiento?')
            if (ok) {
                axios.post(URL + '/asiento/eliminar', {
                    idvehiculo: vehiculo[0].id,
                    numero: numero,
                    modificado: fechaHora
                }).then(json => {
                    if (json.data.ok) {
                        setAsiento(json.data.data)
                        toast.success(json.data.msg)
                    }
                    else
                        toast.error(json.data.msg)
                })
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
                                        <FontAwesomeIcon icon={faUserCog} /> Gestionar Vehículos <span className='text-eliminado'>{eliminado === false ? null : '[Vehículos inactivos]'}</span>
                                    </div >
                                    <div style={{ background: 'white' }}>
                                        <div className='contenedor-cabecera'>
                                            <div className='row'>
                                                {eliminado === false && <>
                                                    <div className='btn-nuevo col-auto mb-2' onClick={() => { listarTipoPersonal(); setModalRegisttar(true) }}>Registrar Vehículo</div>
                                                    {/* <div className="btn-cerrar-ventana col-auto " onClick={() => { listarReciclaje(); setInputBuscar({ campo: null, valido: null }); seteliminado(true) }} >
                                                        Ver Inactivos</div> */}
                                                </>
                                                }
                                                {eliminado === true &&
                                                    <div className="btn-nuevo col-auto mr-2" onClick={() => { seteliminado(false); listarVehiculos(); setInputBuscar({ campo: null, valido: null }) }} >
                                                        Regresar
                                                    </div>
                                                }
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
                                                            <th className="col-1 ">TIPO</th>
                                                            <th className="col-2  ">ENCARGADO</th>
                                                            <th className="col-1  ">EMPRESA</th>
                                                            <th className="col-1  ">CAPACIDAD</th>
                                                            <th className="col-1  ">PLACA</th>
                                                            <th className="col-1  ">MODELO</th>
                                                            <th className="col-1  ">ESTADO</th>
                                                            <th className="col-1  ">VER MAS</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {lista.map((u) => (
                                                            <tr key={u.id} className='item'>

                                                                <td className="col-1 ">{u.tipo}</td>
                                                                <td className="col-2 ">{u.encargado}</td>
                                                                <td className="col-1 ">{u.empresa}</td>
                                                                <td className="col-1  ">{u.capacidad}</td>
                                                                <td className="col-1  ">{u.placa}</td>
                                                                <td className="col-1  ">{u.modelo}</td>
                                                                {u.eliminado === 0 ? <td className="col-1  ">DISPONIBLE</td> : <td className="col-1  ">NO DISPONIBLE</td>}
                                                                <td className="col-1  " onClick={() => {
                                                                    verVehiculo(u.id); setEncargado(u.encargado)
                                                                }}> <span className='btn-ver-usuario' >Ver vehiculo</span></td>
                                                            </tr>
                                                        ))}

                                                    </tbody>

                                                </Table>
                                                {lista.length === 0 &&
                                                    <div style={{ width: '100%' }}><strong>NO SE ENCONTRÓ NINGUNA INFORMACIÓN</strong></div>
                                                }

                                            </div>
                                        </div>
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
                                        <div className='title-page-asientos' style={{ fontSize: '18px' }} >
                                            {/* {infoModalDatos} */}
                                            Configuracion Vehículo

                                        </div>
                                        <ModalBody>
                                            {vehiculo.length > 0 &&
                                                <div className='ver-asiento-seccion'>

                                                    {vehiculo[0].numero === 1 &&
                                                        <>
                                                            <Taxi modelo={asiento} registrar={registrarAsiento} eliminar={eliminarAsiento} placa={placaM} tipo={tipoM} capacidad={capacidadM} encargado={encargado} />

                                                        </>
                                                    }
                                                    {vehiculo[0].numero === 2 &&
                                                        <>
                                                            <Surubi modelo={asiento} registrar={registrarAsiento} eliminar={eliminarAsiento} placa={placaM} tipo={tipoM} capacidad={capacidadM} encargado={encargado} />

                                                        </>
                                                    }
                                                    {vehiculo[0].numero === 3 &&
                                                        <>
                                                            <MinibusCuatroFilas modelo={asiento} registrar={registrarAsiento} eliminar={eliminarAsiento} placa={placaM} tipo={tipoM} capacidad={capacidadM} encargado={encargado} />

                                                        </>
                                                    }

                                                    {vehiculo[0].numero === 4 &&
                                                        <>
                                                            <MinibusCincoFilas modelo={asiento} registrar={registrarAsiento} eliminar={eliminarAsiento} placa={placaM} tipo={tipoM} capacidad={capacidadM} encargado={encargado} />

                                                        </>
                                                    }
                                                    {vehiculo[0].numero === 5 &&
                                                        <>
                                                            <MinibusSeisFilas modelo={asiento} registrar={registrarAsiento} eliminar={eliminarAsiento} placa={placaM} tipo={tipoM} capacidad={capacidadM} encargado={encargado} />

                                                        </>
                                                    }
                                                    <p className='parrafos-asiento mt-2'> Los asientos disponibles estan listos para que el cliente escoja su asiento. Cuando quite este asiento, no estará disponible para el pasajero</p>
                                                    <p className='parrafos-asiento'> Los asientos no disponibles no se ven para el usuario, por lo que no se podran vender dicho pasajes </p>
                                                </div>
                                            }
                                        </ModalBody>
                                        <div className="row botonModal">
                                            {
                                                eliminado === true && <>
                                                    <div className='btn-cerrar-ventana col-auto' onClick={() => { setModalVer(false) }} >Cerrar ventana </div>

                                                    <div className='btn-nuevo col-auto' onClick={() => restaurar(vehiculo[0].id)} >Activar vehículo </div>

                                                </>
                                            }

                                            {eliminado === false && <>
                                                <div className='btn-cerrar-ventana col-auto' onClick={() => {
                                                    setModalVer(false); listarVehiculos()
                                                }} > Cerrar ventana</div>
                                                <div className='btn-nuevo col-auto' onClick={() => { rellenarReconfigurar() }}>Reconfigurar</div>

                                                <div className='btn-nuevo col-auto' onClick={() => { rellenar() }}>Actualizar</div>
                                            </>
                                            }

                                        </div>
                                    </Modal>

                                    <Modal isOpen={modalRegistrar}>

                                        <div className='title-page' >
                                            Registrar nuevo Vehículo
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={idTipo}
                                                        cambiarEstado={setIdTipo}
                                                        name="proyecto"
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={tipo}
                                                        etiqueta={'Tipo Vehículo'}
                                                        msg='Seleccione una opcion'
                                                        asignar={setCapacidad}
                                                    >
                                                    </Select1>
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUserDisabled
                                                        estado={capacidad}
                                                        cambiarEstado={setCapacidad}
                                                        name="placa"
                                                        placeholder="Placa"
                                                        ExpresionRegular={INPUT.NUMEROS_P}
                                                        etiqueta={'Capacidad [Pasajeros]'}
                                                    />
                                                </div>

                                                <div className='col-6'>
                                                    <Select1
                                                        estado={idUsuario}
                                                        cambiarEstado={setIdUssuario}
                                                        name="personal"
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={personal}
                                                        etiqueta={'Encargado'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </Select1>
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={placa}
                                                        cambiarEstado={setPlaca}
                                                        name="placa"
                                                        placeholder="Placa"
                                                        ExpresionRegular={INPUT.PLACA}
                                                        etiqueta={'Placa'}
                                                        msg='Ejemplo: 12333-XXX'
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={modelo}
                                                        cambiarEstado={setModelo}
                                                        name="modelo"
                                                        placeholder="Modelo del Vehículo"
                                                        ExpresionRegular={INPUT.NUMEROS_P}
                                                        etiqueta='Modelo (año)'
                                                        msg='este campo es numérico'
                                                    />
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalRegisttar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { registrar() }}> Registrar</div>

                                        </div>
                                    </Modal>

                                    <Modal isOpen={modalActualizar}>

                                        <div className='title-page' >
                                            Actualizar Vehículo
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={idUsuario}
                                                        cambiarEstado={setIdUssuario}
                                                        name="personal"
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={personal}
                                                        etiqueta={'Encargado'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </Select1>
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={placa}
                                                        cambiarEstado={setPlaca}
                                                        name="placa"
                                                        placeholder="Placa"
                                                        ExpresionRegular={INPUT.PLACA}
                                                        etiqueta={'Placa'}
                                                        msg='Ejemplo: 12333-XXX'
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={modelo}
                                                        cambiarEstado={setModelo}
                                                        name="modelo"
                                                        placeholder="Modelo del Vehículo"
                                                        ExpresionRegular={INPUT.NUMEROS_P}
                                                        etiqueta='Modelo (año)'
                                                        msg='este campo es numérico'
                                                    />
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalActualizar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { actualizar() }}>Actualizar</div>
                                            <div className='btn-eliminar col-auto' onClick={() => eliminar(vehiculo[0].id)} >Eliminar</div>
                                        </div>
                                    </Modal>

                                    <Modal isOpen={modalReconfigurar}>

                                        <div className='title-page' >
                                            Reconnfigurar vehículo
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={idTipo}
                                                        cambiarEstado={setIdTipo}
                                                        name="proyecto"
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={tipo}
                                                        etiqueta={'Tipo Vehículo'}
                                                        msg='Seleccione una opcion'
                                                        asignar={setCapacidad}
                                                    >
                                                    </Select1>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalReconfigurar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { reConfigurar() }}>Configurar</div>
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
export default Vehiculo;
