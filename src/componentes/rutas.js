
import React from 'react';

import { Table, Modal, ModalBody, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHandPointLeft, faHandPointRight, faMap, } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { Select1, ComponenteInputUser, ComponenteInputBuscar_, Footer, SelectString } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'


function Rutas() {

    const [lista, setLista] = useState([]);
    const [ruta, setRuta] = useState([]);
    const [listaRuta, setListaRuta] = useState([])
    const listaDia = [{ id: 'DOMINGO', nombre: 'DOMINGO' }, { id: 'LUNES', nombre: 'LUNES' }, { id: 'MARTES', nombre: 'MARTES' }, { id: 'MIERCOLES', nombre: 'MIERCOLES' },
    { id: 'JUEVES', nombre: 'JUEVES' }, { id: 'VIERNES', nombre: 'VIERNES' }
        , { id: 'SABADO', nombre: 'SABADO' }]

    const [id, setId] = useState({ campo: null, valido: null })
    const [origen, setOrigen] = useState({ campo: null, valido: null })
    const [destino, setDestino] = useState({ campo: null, valido: null })
    const [lugarDestino, setLugarDestino] = useState({ campo: null, valido: null })
    const [lugarOrigen, setLugarOrigen] = useState({ campo: null, valido: null })
    const [dia, setDia] = useState({ campo: null, valido: null })
    const [hora, setHora] = useState({ campo: null, valido: null })
    const [duracion, setDuracion] = useState({ campo: null, valido: null })


    const [enviado, setEnviado] = useState(0)
    const [modalVer, setModalVer] = useState(false)
    const [modalRegistrar, setModalRegisttar] = useState(false)
    const [modalActualizar, setModalActualizar] = useState(false)


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })




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
            if (inputBuscar.valido === null) listarRutas()
            if (inputBuscar.valido === 'false') listarRutas()
            document.title = 'Rutas'

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

        const listarRutas = async () => {
            try {
                axios.post(URL + '/ruta/all').then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            } catch (error) {
                return error
            }
        }

        const listarLugares = async () => {
            axios.post(URL + '/ruta/lugares').then(json => {
                if (json.data.ok)
                    setListaRuta(json.data.data)
                else toast.error(json.data.msg)
            })
        }








        const eliminar = async (id = null) => {
            const ok = window.confirm('¿está seguro de eliminar este registro?');
            if (ok === true && id != null) {

                axios.post(URL + '/ruta/eliminar', { id: id, fecha: fechaHora }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                        toast.success(json.data.msg)
                        setModalVer(false)
                        setModalActualizar(false)
                    } else toast.error(json.data.msg)
                })
            }
        }

        const siguiente = () => {
            let dir = URL + '/ruta/siguiente'

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
            let dir = URL + '/ruta/anterior'
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
            let dir = URL + '/ruta/buscar'
            if (inputBuscar.valido === 'true') {

                axios.post(dir, { dato: inputBuscar.campo }).then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            }
        }

        const verRuta = (id) => {
            axios.post(URL + '/ruta/ver', { id: id }).then(json => {
                if (json.data.ok) {
                    setRuta(json.data.data)
                    setModalVer(true)
                    setOrigen({ campo: json.data.data[0].origen, valido: 'true' });
                    setOrigen({ campo: json.data.data[0].origen, valido: 'true' });
                    setId({ campo: json.data.data[0].id, valido: 'true' })
                } else toast.error(json.data.msg)
            })
        }


        const vaciarDatos = () => {
            setId({ campo: null, valido: null })
            setOrigen({ campo: null, valido: null })
            setDestino({ campo: null, valido: null })
            setLugarOrigen({ campo: null, valido: null })
            setLugarDestino({ campo: null, valido: null })
            setHora({ campo: null, valido: null })
            setDia({ campo: null, valido: null })
            setDuracion({ campo: null, valido: null })
            setEnviado(0)
        }

        const rellenar = async () => {
            listarLugares()

            setId({ campo: ruta[0].id, valido: 'true' })
            setOrigen({ campo: ruta[0].idorigen, valido: 'true' })
            setDestino({ campo: ruta[0].iddestino, valido: 'true' })
            setLugarDestino({ campo: ruta[0].lugardestino, valido: 'true' })
            setLugarOrigen({ campo: ruta[0].lugarorigen, valido: 'true' })
            setDia({ campo: ruta[0].dia, valido: 'true' })
            setHora({ campo: ruta[0].hora, valido: 'true' })
            setDuracion({ campo: ruta[0].duracion, valido: 'true' })
            setModalActualizar(true)
            setEnviado(0)
        }

        const insertar = async () => {
            // console.log(origen, destino, lugarDestino, lugarOrigen, dia, hora, duracion, enviado)

            if (origen.valido === 'true' && destino.valido === 'true' && lugarOrigen.valido === 'true' && lugarDestino.valido === 'true' && dia.valido === 'true' &&
                hora.valido === 'true' && duracion.valido === 'true' && enviado === 0) {
                setEnviado(1)
                axios.post(URL + '/ruta/registrar', {
                    origen: origen.campo,
                    destino: destino.campo,
                    lugarorigen: lugarDestino.campo,
                    lugardestino: lugarDestino.campo,
                    duracion: duracion.campo,
                    dia: dia.campo,
                    hora: hora.campo,
                    creado: fechaHora
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

            if (origen.valido === 'true' && destino.valido === 'true' && lugarOrigen.valido === 'true' && lugarDestino.valido === 'true' && dia.valido === 'true' &&
                hora.valido === 'true' && duracion.valido === 'true' && enviado === 0 && id.valido === 'true') {
                setEnviado(1)
                axios.post(URL + '/ruta/actualizar', {
                    id: id.campo,
                    origen: origen.campo,
                    destino: destino.campo,
                    lugarorigen: lugarOrigen.campo,
                    lugardestino: lugarDestino.campo,
                    duracion: duracion.campo,
                    dia: dia.campo,
                    hora: hora.campo,
                    modificado: fechaHora
                }).then(json => {
                    if (json.data.ok) {
                        setRuta(json.data.data)
                        toast.success(json.data.msg)
                        setModalActualizar(false)

                    } else { toast.error(json.data.msg); setEnviado(0) }
                })
            } else toast.error('Complete todos los campos requeridos en el formulario')
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
                                        <FontAwesomeIcon icon={faMap} /> Gestionar Rutas
                                    </div >
                                    <div style={{ background: 'white' }}>
                                        <div className='contenedor-cabecera'>
                                            <div className='row'>
                                                <div className='btn-nuevo col-auto mb-2' onClick={() => { listarLugares(); setModalRegisttar(true) }}>Registrar Ruta</div>

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
                                                            <th className="col-1 ">ORIGEN</th>
                                                            <th className="col-2  ">DESTINO</th>
                                                            <th className="col-1  ">DURACION</th>
                                                            <th className="col-1  ">DIA</th>
                                                            <th className="col-2  ">HORA</th>
                                                            <th className="col-1  ">ver más</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {lista.map((u) => (
                                                            <tr key={u.id} className='item'>

                                                                <td className="col-1 ">{u.origen}</td>
                                                                <td className="col-2 ">{u.destino}</td>

                                                                <td className="col-1  ">{u.duracion}</td>
                                                                <td className="col-1  ">{u.dia}</td>
                                                                <td className="col-2  ">{u.hora}</td>
                                                                <td className="col-1  " onClick={() => verRuta(u.id)}> <span className='btn-ver-usuario' >Ver ruta</span></td>
                                                            </tr>
                                                        ))}

                                                    </tbody>

                                                </Table>
                                                {lista.length === 0 &&
                                                    <div style={{ width: '100%' }}><strong>NO SE ENCONTRO NINGUNA INFORMACIÓN</strong></div>
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
                                        <div className='title-page' >
                                            Datos de la ruta
                                        </div>
                                        <ModalBody>
                                            {ruta.length > 0 &&
                                                <div>
                                                    <div className='more-info'>
                                                        <table style={{ width: '60%' }}>
                                                            <thead className='tbl-head'> <th>DIA</th> <td>HORA</td></thead>
                                                            <tr> <td className='dia-tbl'>{ruta[0].dia}</td> <td className='hora-tbl'>{ruta[0].hora}</td></tr>
                                                            <br />
                                                        </table >
                                                        <table style={{ width: '100%', marginBottom: '10px' }} >
                                                            <thead className='tbl-head'> <th> ORIGEN</th> <td></td></thead>
                                                            <tr > <td className='dia-tbl'>{ruta[0].origen}</td><td className='hora-tbl'>{ruta[0].lugarorigen}</td></tr>
                                                        </table>

                                                        <table style={{ width: '100%', marginBottom: '20px' }} >
                                                            <thead className='tbl-head'> <th>DESTINO</th> <td></td></thead>
                                                            <tr className='horadia-tbl'> <td className='dia-tbl'> {ruta[0].destino}</td><td className='hora-tbl'>{ruta[0].lugardestino}</td></tr>
                                                        </table>


                                                        <table style={{ width: '50%' }} >
                                                            <thead className='tbl-head'> <th>DURACION VIAJE</th> <td></td></thead>
                                                            <tr className='horadia-tbl'> <td className='dia-tbl'> {ruta[0].duracion + ' HRS.'}</td></tr>
                                                        </table>

                                                    </div>
                                                    <div className='more-info-add mt-5'>
                                                        <h2>
                                                            Otra información
                                                        </h2>
                                                        <ul>
                                                            <li key={'1c'} className='list-adicional' > {ruta[0].editor ? 'Editor:  ' + ruta[0].editor : 'sin validar'}</li>
                                                            <li key={'1d'} className='list-adicional'>  <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{ruta[0].creado ? 'Fecha creación : ' + ruta[0].creado : 'Sin fecha'}</li>
                                                            <li key={'1e'} className='list-adicional'> <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{ruta[0].modificado ? 'Fecha actualización :  ' + ruta[0].modificado : 'Todavia no se ha actualizado'}</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            }
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => {
                                                setModalVer(false); listarRutas()
                                            }} > Cancelar</div>

                                            <div className='btn-nuevo col-auto' onClick={() => { rellenar() }}>Actualizar</div>
                                        </div>
                                    </Modal>


                                    <Modal isOpen={modalRegistrar}>

                                        <div className='title-page' >
                                            Registrar nueva Ruta
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={origen}
                                                        cambiarEstado={setOrigen}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={listaRuta}
                                                        etiqueta={'ORIGEN'}
                                                        lugares={destino.campo}
                                                        msg='Selecciones una opcion'
                                                    >
                                                    </Select1>
                                                </div>
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={destino}
                                                        cambiarEstado={setDestino}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={listaRuta}
                                                        etiqueta={'DESTINO'}
                                                        msg='Selecciones una opcion'
                                                        lugares={origen.campo}
                                                    >
                                                    </Select1>
                                                </div>
                                                <div className="col-10">
                                                    <ComponenteInputUser
                                                        estado={lugarOrigen}
                                                        cambiarEstado={setLugarOrigen}
                                                        placeholder="LUGAR ORIGEN"
                                                        ExpresionRegular={INPUT.DIRECCION}
                                                        etiqueta={'ESPECIFICA LUGAR ORIGEN'}
                                                        msg='Este campo acepta caracteres alfanuméricos'
                                                    />
                                                </div>
                                                <div className="col-10">
                                                    <ComponenteInputUser
                                                        estado={lugarDestino}
                                                        cambiarEstado={setLugarDestino}
                                                        placeholder="LUGAR DESTINO"
                                                        ExpresionRegular={INPUT.DIRECCION}
                                                        etiqueta={'ESPECIFICA LUGAR DESTINO'}
                                                        msg='Este campo acepta caracteres alfanuméricos'
                                                    />
                                                </div>

                                                <div className='col-6'>
                                                    <SelectString
                                                        estado={dia}
                                                        cambiarEstado={setDia}
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}
                                                        lista={listaDia}
                                                        etiqueta={'DIA VIAJE'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </SelectString>
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={hora}
                                                        cambiarEstado={setHora}
                                                        ExpresionRegular={INPUT.HORA}  //expresion regular
                                                        tipo='time'
                                                        etiqueta='HORA SALIDA'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={duracion}
                                                        cambiarEstado={setDuracion}
                                                        placeholder="Carnet de Identidad"
                                                        ExpresionRegular={INPUT.NUMEROS_P}
                                                        etiqueta={'DURACION HORAS'}
                                                        msg='Este campo es numérico'

                                                    />
                                                </div>

                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalRegisttar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { insertar() }}> Registrar</div>

                                        </div>
                                    </Modal>

                                    <Modal isOpen={modalActualizar}>

                                        <div className='title-page' >
                                            Actualizar Ruta
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={origen}
                                                        cambiarEstado={setOrigen}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={listaRuta}
                                                        etiqueta={'ORIGEN'}
                                                        lugares={destino.campo}
                                                        msg='Selecciones una opcion'
                                                    >
                                                    </Select1>
                                                </div>
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={destino}
                                                        cambiarEstado={setDestino}
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={listaRuta}
                                                        etiqueta={'DESTINO'}
                                                        msg='Selecciones una opcion'
                                                        lugares={origen.campo}
                                                    >
                                                    </Select1>
                                                </div>
                                                <div className="col-10">
                                                    <ComponenteInputUser
                                                        estado={lugarOrigen}
                                                        cambiarEstado={setLugarOrigen}
                                                        placeholder="LUGAR ORIGEN"
                                                        ExpresionRegular={INPUT.DIRECCION}
                                                        etiqueta={'ESPECIFICA LUGAR ORIGEN'}
                                                        msg='Este campo acepta caracteres alfanuméricos'
                                                    />
                                                </div>
                                                <div className="col-10">
                                                    <ComponenteInputUser
                                                        estado={lugarDestino}
                                                        cambiarEstado={setLugarDestino}
                                                        placeholder="LUGAR DESTINO"
                                                        ExpresionRegular={INPUT.DIRECCION}
                                                        etiqueta={'ESPECIFICA LUGAR DESTINO'}
                                                        msg='Este campo acepta caracteres alfanuméricos'
                                                    />
                                                </div>

                                                <div className='col-6'>
                                                    <SelectString
                                                        estado={dia}
                                                        cambiarEstado={setDia}
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}
                                                        lista={listaDia}
                                                        etiqueta={'DIA VIAJE'}
                                                        msg='Seleccione una opcion'
                                                    >
                                                    </SelectString>
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={hora}
                                                        cambiarEstado={setHora}
                                                        ExpresionRegular={INPUT.HORA}  //expresion regular
                                                        tipo='time'
                                                        etiqueta='HORA SALIDA'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={duracion}
                                                        cambiarEstado={setDuracion}
                                                        placeholder="Carnet de Identidad"
                                                        ExpresionRegular={INPUT.NUMEROS_P}
                                                        etiqueta={'DURACION HORAS'}
                                                        msg='Este campo es numérico'

                                                    />
                                                </div>

                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalActualizar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { actualizar() }}>Actualizar</div>
                                            <div className='btn-eliminar col-auto' onClick={() => eliminar(ruta[0].id)} >Eliminar</div>
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
        auth.logout()
    }

}
export default Rutas;
