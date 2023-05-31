
import React from 'react';

import { Table, Modal, ModalBody, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUserCog, faCalendar, faHandPointLeft, faHandPointRight, } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { Select1, ComponenteInputUser, ComponenteInputBuscar_, Footer } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'
import md5 from 'md5'
import { Link } from 'react-router-dom';
const ExcelJS = require('exceljs')



function Usuario() {

    const [lista, setLista] = useState([]);
    const [usuario, setUsuario] = useState([]);


    const [rol, setRol] = useState([])

    const [id, setId] = useState({ campo: null, valido: null })
    const [idRol, setIdRol] = useState({ campo: null, valido: null })


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })
    const [modalVer, setModalVer] = useState(false)
    const [modalRegistrar, setModalRegisttar] = useState(false)
    const [modalActualizar, setModalActualizar] = useState(false)

    const [eliminado, seteliminado] = useState(false)



    const [Pass1, setPass1] = useState({ campo: null, valido: null })
    const [Pass2, setPass2] = useState({ campo: null, valido: null })
    const [modalPass, setModalPass] = useState(false)


    const [username, setUsername] = useState({ campo: '', valido: null })
    const [password, setPassword] = useState({ campo: '', valido: null })
    const [ci, setCi] = useState({ campo: '', valido: null })
    const [nombre, setNombre] = useState({ campo: '', valido: null })
    const [apellido1, setApellido1] = useState({ campo: '', valido: null })
    const [apellido2, setApellido2] = useState({ campo: '', valido: null })
    const [telefono, setTelefono] = useState({ campo: '', valido: null })
    const [direccion, setDireccion] = useState({ campo: '', valido: null })


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
            if (inputBuscar.valido === null && eliminado === false) listarUsuarios()
            if (inputBuscar.valido === 'false' && eliminado === false) listarUsuarios()
            if (inputBuscar.valido === 'false' && eliminado === true) listarReciclaje()
            document.title = 'Usuarios'

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

        const listarUsuarios = async () => {
            try {
                axios.post(URL + '/usuario/all').then(json => {
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
            axios.post(URL + '/usuario/reciclaje').then(json => {
                if (json.data.ok) {
                    setLista(json.data.data)
                }
                else
                    toast.error(json.data.msg)
            })
        }

        const listarRol = async () => {
            axios.post(URL + '/usuario/rol').then(json => {
                setRol(json.data)
            })
        }

        const vaciarDatos = () => {
            setId({ campo: '', valido: null })
            setIdRol({ campo: '', valido: null })
            setIdRol({ campo: '', valido: null })
        }


        const rellenar = async () => {
            listarRol()

            setId({ campo: usuario[0].id, valido: 'true' })
            setIdRol({ campo: usuario[0].idRol, valido: 'true' })
            setCi({ campo: usuario[0].ci, valido: 'true' })
            setNombre({ campo: usuario[0].nombre, valido: 'true' })
            setApellido1({ campo: usuario[0].apellido1, valido: 'true' })
            setApellido2({ campo: usuario[0].apellido2, valido: 'true' })
            setTelefono({ campo: usuario[0].celular, valido: 'true' })
            setDireccion({ campo: usuario[0].direccion, valido: 'true' })
            setModalActualizar(true)
        }





        const eliminar = async (id = null) => {
            const ok = window.confirm('¿está seguro de eliminar este registro?');
            if (ok === true && id != null) {

                axios.post(URL + '/usuario/eliminar', { id: id, fecha: fechaHora }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                        toast.success(json.data.msg)
                        setModalVer(false)
                        setModalActualizar(false)
                    } else toast.error(json.data.msg)
                })
            }
        }


        const restaurar = async (ids) => {

            const ok = window.confirm('¿está seguro de restaurar este registro?');
            if (ok) {
                if (ids !== null) {

                    axios.post(URL + '/usuario/restaurar', { id: ids, fecha: fechaHora }).then(json => {
                        if (json.data.ok) {
                            vaciarDatos()
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
        const siguiente = () => {
            let dir = null
            if (eliminado)
                dir = URL + '/usuario/nextdelete'
            else dir = URL + '/usuario/next'

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
                dir = URL + '/usuario/anterioreliminados'
            else dir = URL + '/usuario/anterior'
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
                dir = URL + '/usuario/buscareliminados'
            else dir = URL + '/usuario/buscar'
            if (inputBuscar.valido === 'true') {
                console.log('pasa validaciones')

                axios.post(dir, { dato: inputBuscar.campo }).then(json => {
                    if (json.data.ok)
                        setLista(json.data.data)
                    else toast.error(json.data.msg)
                })
            }
        }

        const verUsuario = (id) => {
            axios.post(URL + '/usuario/ver', { id: id }).then(json => {
                if (json.data.ok) {
                    setUsuario(json.data.data)
                    setModalVer(true)
                    setIdRol({ campo: json.data.data[0].idRol, valido: 'true' });
                    setId({ campo: json.data.data[0].id, valido: 'true' })
                } else toast.error(json.data.msg)
            })
        }

        const cambiarContraseña = () => {
            if (Pass1.valido === 'true' && Pass2.valido === 'true') {
                if (Pass1.campo === Pass2.campo) {
                    let passMd5 = md5(Pass1.campo)
                    axios.post(URL + '/usuario/recet', { id: id.campo, pass1: passMd5, fecha: fechaHora }).then(j => {
                        if (j.data.ok) {
                            setModalPass(false)
                            toast.success(j.data.msg)
                            setPass1({ campo: null, valido: null })
                            setPass2({ campo: null, valido: null })
                        } else toast.error(j.data.msg)

                    })
                } else { toast.error('Confirme correctamente su nueva contraseña'); return }
            }
            else { toast.error('Complete todos los campos'); return }
        }


        const insertar = async () => {

            if (idRol.valido === 'true' && username.valido === 'true' && password.valido === 'true' && telefono.valido === 'true' && ci.valido === 'true' &&
                nombre.valido === 'true' && apellido1.valido === 'true' && apellido2.valido === 'true' && direccion.valido === 'true') {
                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                const pas = md5(password.campo)
                axios.post(URL + '/usuario/registrar', {
                    idrol: idRol.campo,
                    username: username.campo,
                    xyz: pas,
                    ci: ci.campo,
                    nombre: nombre.campo,
                    apellido1: apellido1.campo,
                    apellido2: apellido2.campo,
                    celular: telefono.campo,
                    direccion: direccion.campo,
                    creado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {

                    if (json.data.ok) {
                        setLista(json.data.data)
                        toast.success(json.data.msg)
                        setModalRegisttar(false)

                    } else toast.error(json.data.msg)
                })
            } else toast.error('Complete todos los campos requeridos en el formulario')
        }



        const actualizar = async () => {

            if (id.valido === 'true' && idRol.valido === 'true' && telefono.valido === 'true' && ci.valido === 'true' &&
                nombre.valido === 'true' && apellido1.valido === 'true' && apellido2.valido === 'true' && direccion.valido === 'true') {
                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                const pas = md5(password.campo)
                axios.post(URL + '/usuario/actualizar', {
                    id: id.campo,
                    idrol: idRol.campo,
                    ci: ci.campo,
                    nombre: nombre.campo,
                    apellido1: apellido1.campo,
                    apellido2: apellido2.campo,
                    celular: telefono.campo,
                    direccion: direccion.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {

                    if (json.data.ok) {
                        setUsuario(json.data.data)
                        toast.success(json.data.msg)
                        setModalActualizar(false)

                    } else toast.error(json.data.msg)
                })
            } else toast.error('Complete todos los campos requeridos en el formulario')
        }

        const descargar = () => {
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'BSCH';
            workbook.lastModifiedBy = 'BSCH';
            // workbook.created = new Date().toISOString();
            // workbook.modified = new Date().toISOString();
            // workbook.lastPrinted = new Date().toISOString();
            // libro de trabajo con cofiguracion de stilos
            const principal = workbook.addWorksheet('Pricipal', { views: [{ showGridLines: true }] },)
            const asgnaciones = workbook.addWorksheet('Asignaciones', { headerFooter: { firstHeader: "ASIGNACIONES", firstFooter: "BSCH" } });
            const gastos = workbook.addWorksheet('Gastos', { headerFooter: { firstHeader: "GASTOS", firstFooter: "BSCH" } });
            principal.pageSetup.margins = {
                left: 0.7, right: 0.7,
                top: 0.75, bottom: 0.75,
                header: 0.3, footer: 0.3
            };
            // agregar imagen al libro del trabjo

            // const imageId1 = workbook.addImage({
            //     filename: '/dist/img/empresa.png',
            //     extension: 'png',
            // });
            // agregar imagen al hoja de trabajo
            // principal.addImage(imageId1, 'B2:D6');

            // congelar fila g10
            principal.views = [
                { state: 'frozen', xSplit: 0, ySplit: 1, topLeftCell: 'G10', activeCell: 'A1' }
            ];

            principal.mergeCells('A4:G5');

            // // convinar valores de celdas
            principal.getCell('B5').value = 'Esta es una celda convinada para mostrar todas la tareas del usaurio';
            // expect(principal.getCell('B5').value).toBe(principal.getCell('A4').value);
            // expect(principal.getCell('B5').master).toBe(principal.getCell('A4'));
            for( let i=0; i<8; i++){
                principal.addRow([, , ]);

            }

            principal.columns = [
                { header: 'Id', key: 'id', width: 10 },
                { header: 'Name', key: 'name', width: 32 },
                { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }, {origin:'A6'}
            ];
            for( let i=0; i<50; i++){
                principal.addRow([3, 'Sam', '12,12,1990']);

            }
            // principal.addRow([33, 'Sam1', '12,12,1990']);
            // principal.addRow([32, 'Sam2', '12,12,1990']);

            // convinar celdar



            // asgnaciones.pageSetup.margins = {
            //     left: 0.7, right: 0.7,
            //     top: 0.75, bottom: 0.75,
            //     header: 0.3, footer: 0.3
            // };
            // gastos.pageSetup.margins = {
            //     left: 0.7, right: 0.7,
            //     top: 0.75, bottom: 0.75,
            //     header: 0.3, footer: 0.3
            // };


            workbook.xlsx.writeBuffer().then(data=>{
                const blob = new Blob([data],{
                    type:"aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = 'REPORTE DE GASTOS-BSCH.xlsx';
                anchor.click();
                window.URL.revokeObjectURL(url);
            })






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
                                        <FontAwesomeIcon icon={faUserCog} /> Gestionar Usuarios <span className='text-eliminado'>{eliminado === false ? null : '[Elementos eliminados]'}</span>
                                    </div >
                                    <div style={{ background: 'white' }}>
                                        <div className='contenedor-cabecera'>
                                            <div className='row'>
                                                {eliminado === false && <>
                                                    <div className='btn-nuevo col-auto mb-2' onClick={() => { listarRol(); setModalRegisttar(true) }}>Registrar Usuario</div>
                                                    <div className="btn-cerrar-ventana col-auto " onClick={() => descargar()} >
                                                        Ver reciclaje</div>
                                                    {/* <div className="btn-cerrar-ventana col-auto " onClick={() => { listarReciclaje(); setInputBuscar({ campo: null, valido: null }); seteliminado(true) }} >
                                                        Ver reciclaje</div> */}
                                                </>
                                                }
                                                {eliminado === true &&
                                                    <div className="btn-nuevo col-auto " onClick={() => { seteliminado(false); listarUsuarios(); setInputBuscar({ campo: null, valido: null }) }} >
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
                                                            <th className="col-1 ">C.I.</th>
                                                            <th className="col-2  ">Nombre</th>
                                                            <th className="col-1  ">Usuario</th>
                                                            <th className="col-1  ">Cel./Tel.</th>
                                                            <th className="col-2  ">Direccion</th>
                                                            <th className="col-1  ">ver más</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {lista.map((u) => (
                                                            <>
                                                                <tr key={u.id} className='item'>

                                                                    <td className="col-1 ">{u.ci}</td>
                                                                    <td className="col-2 ">{u.nombre + ' ' + u.apellido1 + ' ' + u.apellido2}</td>

                                                                    <td className="col-1  ">{u.username}</td>
                                                                    <td className="col-1  ">{u.celular}</td>
                                                                    <td className="col-2  ">{u.direccion}</td>
                                                                    <td className="col-1  " onClick={() => verUsuario(u.id)}> <span className='btn-ver-usuario' >Ver usuario</span></td>
                                                                </tr>
                                                            </>
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

                                        {usuario.length > 0 &&
                                            <div className='title-page' >
                                                Datos del usuario
                                            </div>
                                        }
                                        <ModalBody>
                                            {usuario.length > 0 &&
                                                <div>
                                                    <div className='more-info'>
                                                        <h2 >
                                                            Datos Generales
                                                        </h2>
                                                        <ul>
                                                            <li key={'12a'}>{'Cuenta: ' + usuario[0].nombre + ' ' + usuario[0].apellido1 + ' ' + usuario[0].apellido2}</li>
                                                            <li key={'1va'}> <FontAwesomeIcon icon={faPhone} className='more-icon' />{'Celular y Dirección:  ' + usuario[0].celular + '      ' + usuario[0].direccion}</li>
                                                            <li key={'12ba'}> <FontAwesomeIcon icon={faUserCog} className='more-icon' />{'Username:  ' + usuario[0].username}</li>
                                                            <li key={'12da'}> <FontAwesomeIcon icon={faUserCog} className='more-icon' />{'Username:  ' + usuario[0].username}</li>
                                                            <li > {'Ocupación:  ' + usuario[0].rol}</li>

                                                        </ul>

                                                    </div>
                                                    <div className='more-info-add'>
                                                        <h2>
                                                            Otra información
                                                        </h2>
                                                        <ul>
                                                            <li key={'1c'} className='list-adicional' > {usuario[0].creador ? 'Editor:  ' + usuario[0].creador : 'sin validar'}</li>
                                                            <li key={'1d'} className='list-adicional'>  <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{usuario[0].fechacreacion ? 'Fecha creación : ' + usuario[0].fechacreacion : 'Sin fecha'}</li>
                                                            <li key={'1e'} className='list-adicional'> <FontAwesomeIcon icon={faCalendar} className='more-icon-add' />{usuario[0].fechamodificado ? 'Fecha actualización :  ' + usuario[0].fechamodificado : 'Todavia no se ha actualizado'}</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            }
                                        </ModalBody>
                                        <div className="row botonModal">
                                            {
                                                eliminado === true && <>
                                                    <div className='btn-cerrar-ventana col-auto' onClick={() => { setModalVer(false) }} >Cerrar ventana </div>

                                                    <div className='btn-nuevo col-auto' onClick={() => restaurar(usuario[0].id)} >Restaurar Registro </div>

                                                </>
                                            }

                                            {eliminado === false && usuario.length > 0 && <>
                                                <div className='btn-cerrar-ventana col-auto' onClick={() => {
                                                    setModalVer(false); listarUsuarios()
                                                }} > Cancelar</div>


                                                <div className='btn-nuevo col-auto' onClick={() => { rellenar() }}>Actualizar</div>
                                                <div className='btn-eliminar col-auto' onClick={() => {
                                                    setModalPass(true)
                                                }} >Reset</div>

                                            </>
                                            }

                                        </div>
                                    </Modal>


                                    <Modal isOpen={modalRegistrar}>

                                        <div className='title-page' >
                                            Registrar nuevo Usuario
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={idRol}
                                                        cambiarEstado={setIdRol}
                                                        name="proyecto"
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={rol}
                                                        etiqueta={'Rol'}
                                                    >
                                                    </Select1>
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={username}
                                                        cambiarEstado={setUsername}
                                                        name="username"
                                                        placeholder="Usuario"
                                                        ExpresionRegular={INPUT.INPUT_USUARIO}
                                                        etiqueta={'Usuario'}
                                                        campoUsuario={true}
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={password}
                                                        cambiarEstado={setPassword}
                                                        name="apellidoPat"
                                                        placeholder="Contraseña"
                                                        ExpresionRegular={INPUT.PASSWORD}  //expresion regular
                                                        etiqueta='Contraseña'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={ci}
                                                        cambiarEstado={setCi}
                                                        name="ci"
                                                        placeholder="Carnet de Identidad"
                                                        ExpresionRegular={INPUT.CI}
                                                        etiqueta={'C.I.'}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={nombre}
                                                        cambiarEstado={setNombre}
                                                        name="nombre"
                                                        placeholder="Nombre completo"
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                        etiqueta='Nombre'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={apellido1}
                                                        cambiarEstado={setApellido1}
                                                        name="apellidoPat"
                                                        placeholder="Apellido Paterno"
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                        etiqueta='Apellido Paterno'
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={apellido2}
                                                        cambiarEstado={setApellido2}
                                                        name="apellidoMat"
                                                        placeholder="Apellido Materno"
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                        etiqueta='Apellido Materno'
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={telefono}
                                                        cambiarEstado={setTelefono}
                                                        name="telefono"
                                                        placeholder="Telefono/cel."
                                                        ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                                                        etiqueta='telefono/celular'
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={direccion}
                                                        cambiarEstado={setDireccion}
                                                        name="direccion"
                                                        placeholder="Dirección"
                                                        ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                        etiqueta='Dirección'
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
                                            Actualizar Usuario
                                        </div>
                                        <ModalBody>
                                            <div className="row">
                                                <div className='col-6'>
                                                    <Select1
                                                        estado={idRol}
                                                        cambiarEstado={setIdRol}
                                                        name="proyecto"
                                                        ExpresionRegular={INPUT.ID}
                                                        lista={rol}
                                                        etiqueta={'Rol'}
                                                    >
                                                    </Select1>
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={ci}
                                                        cambiarEstado={setCi}
                                                        name="ci"
                                                        placeholder="Carnet de Identidad"
                                                        ExpresionRegular={INPUT.CI}
                                                        etiqueta={'C.I.'}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={nombre}
                                                        cambiarEstado={setNombre}
                                                        name="nombre"
                                                        placeholder="Nombre completo"
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                        etiqueta='Nombre'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={apellido1}
                                                        cambiarEstado={setApellido1}
                                                        name="apellidoPat"
                                                        placeholder="Apellido Paterno"
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                        etiqueta='Apellido Paterno'
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={apellido2}
                                                        cambiarEstado={setApellido2}
                                                        name="apellidoMat"
                                                        placeholder="Apellido Materno"
                                                        ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                        etiqueta='Apellido Materno'
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={telefono}
                                                        cambiarEstado={setTelefono}
                                                        name="telefono"
                                                        placeholder="Telefono/cel."
                                                        ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                                                        etiqueta='telefono/celular'
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={direccion}
                                                        cambiarEstado={setDireccion}
                                                        name="direccion"
                                                        placeholder="Dirección"
                                                        ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                        etiqueta='Dirección'
                                                    />
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className='btn-cerrar-ventana col-auto' onClick={() => setModalActualizar(false)} >Cancelar </div>
                                            <div className='btn-nuevo col-auto' onClick={() => { actualizar() }}>Actualizar</div>
                                            <div className='btn-eliminar col-auto' onClick={() => eliminar(usuario[0].id)} >Eliminar</div>
                                        </div>
                                    </Modal>



                                    <Modal isOpen={modalPass}>
                                        <div className='title-page' >
                                            Cambiar contraseña
                                        </div>
                                        <ModalBody>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">

                                                <ComponenteInputUser
                                                    estado={Pass1}
                                                    cambiarEstado={setPass1}
                                                    name="pass1"
                                                    placeholder="Nueva contraseña"
                                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                    etiqueta='Nueva contraseña'
                                                    campoUsuario={true}
                                                    msg='Complete este campo'
                                                />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">

                                                <ComponenteInputUser
                                                    estado={Pass2}
                                                    cambiarEstado={setPass2}
                                                    name="pass2"
                                                    placeholder="Confirmar Contraseña"
                                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                    etiqueta='Confirmar Contraseña'
                                                    campoUsuario={true}
                                                    msg='Complete este campo'
                                                /></div>

                                        </ModalBody>
                                        <div className="row botonModal">
                                            <div className="btn-cerrar-ventana col-auto" onClick={() => setModalPass(false)}  >Cancelar</div>
                                            <div className="btn-nuevo col-auto" onClick={() => cambiarContraseña()}>Reiniciar contraseña
                                            </div>
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
export default Usuario;
