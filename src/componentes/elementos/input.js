import {
    LeyendaError, Input, Inputfecha, SelectStyle, InputDisabled, ContenedorCheck, InputArea, InputBuscador
} from './estilos';

import React from 'react';

import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faSearch, faCaretLeft, } from '@fortawesome/free-solid-svg-icons';
import ReactPrint from 'react-to-print'
import { useRef } from 'react'

import './new-Style.css';
import { URL } from '../../Auth/config';
import { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast'

import Select from 'react-select';
import { Link } from 'react-router-dom';


const Select2_ = ({ estado, cambiarEstado, Name, ExpresionRegular, lista, funcion, etiqueta, nombre = null, msg, important = true }) => {
    const [mensaje, setMensaje] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000)
    }, [mensaje])

    // console.log(estado)
    const onChange_ = (e) => {
        // console.log(e, 'datos')
        cambiarEstado({ campo: e.value, valido: 'true' })
        // console.log(estado.campo)
    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                if (funcion) {
                    funcion()
                }
                setMensaje(null)
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
                setMensaje(msg)
            }
        }
    }

    if (nombre) {
        lista.forEach(e => {
            // console.log(e, estado, 'nombre asignados sin el if')
            if (e.value == estado.campo) {
                // console.log(e, estado, 'asignado con if')
                nombre(e.label)
            }

        })
    }
    // console.log(estado, 'estado seleccionado')

    return (
        <div >
            <div className="field" style={{ position: 'relative' }}>
                <label>   {important ? etiqueta + '   *  ' : etiqueta}
                    <Select
                        name={Name}
                        onClick={validacion}
                        theme={(theme) => ({
                            ...theme,

                            borderRadius: 3,
                            border: 0,
                            colors: {
                                ...theme.colors,
                                primary25: 'primary50',
                                primary: '#17a2b8',
                            },
                        })}

                        // value={estado.campo}
                        // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                        // onBlur={validacion}  //si presionamos fuera del input
                        placeholder={'Seleccione'}
                        onChange={onChange_}
                        options={lista}
                    />

                    {/* <Select
                        name={Name}
                        className="form-control form-control-sm "
                        onChange={onChange}
                        // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                        // onBlur={validacion}  //si presionamos fuera del input
                        valido={estado.valido}
                        value={estado.campo || ''}
                        onClick={validacion}
                    >
                    </Select> */}
                    <LeyendaError>{mensaje}</LeyendaError>
                </label>
            </div>
        </div>
    )
}


const Select1 = ({ estado, cambiarEstado, Name, ExpresionRegular, lista, nombre = null, funcion, etiqueta, msg, asignar = null, lugares = null }) => {
    const [mensaje, setMensaje] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000)
    }, [mensaje])

    const onChange = (e) => {
        cambiarEstado({ campo: parseInt(e.target.value), valido: 'true' });
    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo) && estado.campo != 'Seleccionar') {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                if (funcion) {
                    funcion()
                }
                if (asignar) {
                    lista.forEach(e => {
                        if (estado.campo == e.id)
                            asignar({ campo: e.capacidad, valido: 'true' })
                    })
                }

                // cuando los lugares origen y destino son iguales
                if (lugares) {
                    if (lugares === estado.campo) {
                        alert('Ops!, no puedes elegir el mismo lugar en el destino')
                        cambiarEstado({ valido: 'false' })
                    }
                }
                setMensaje(null)

            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
                setMensaje(msg)
            }
        }
    }

    if (nombre) {
        lista.forEach(e => {
            // console.log(e, estado, 'nombre asignados sin el if')
            if (e.id == estado.campo) {
                // console.log(e, estado, 'asignado con if')
                nombre(e.nombre)
            }

        })
    }


    return (
        <div >
            <div className="field">
                <p className='origen-titulo-modal'>  {etiqueta + '   *  '}

                    <SelectStyle
                        name={Name}
                        className="form-control form-control-sm"
                        onChange={onChange}
                        // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                        // onBlur={validacion}  //si presionamos fuera del input
                        valido={estado.valido}
                        value={estado.campo || ''}
                        onClick={validacion}
                    >
                        <option>Seleccionar</option>

                        {lista.map((r) => (

                            <option key={r.id} value={r.id}>{r.nombre}</option>
                        ))}
                    </SelectStyle>
                    <LeyendaError>{mensaje}</LeyendaError>
                </p>
            </div>
        </div>
    )
}


const SelectString = ({ estado, cambiarEstado, Name, ExpresionRegular, lista, nombre = null, funcion, etiqueta, msg, asignar = null, lugares = null }) => {
    const [mensaje, setMensaje] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000)
    }, [mensaje])

    const onChange = (e) => {
        cambiarEstado({ campo: e.target.value, valido: 'true' })
    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo) && estado.campo != 'Seleccionar') {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                if (funcion) {
                    funcion()
                }
                if (asignar) {
                    lista.forEach(e => {
                        if (estado.campo == e.id)
                            asignar({ campo: e.capacidad, valido: 'true' })
                    })
                }

                // cuando los lugares origen y destino son iguales
                if (lugares) {
                    if (lugares === estado.campo) {
                        alert('Ops!, no puedes elegir el mismo lugar en el destino')
                        cambiarEstado({ valido: 'false' })
                    }
                }
                setMensaje(null)

            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
                setMensaje(msg)
            }
        }
    }

    if (nombre) {
        lista.forEach(e => {
            // console.log(e, estado, 'nombre asignados sin el if')
            if (e.id == estado.campo) {
                // console.log(e, estado, 'asignado con if')
                nombre(e.nombre)
            }

        })
    }


    return (
        <div >
            <div className="field">
                <label>  {etiqueta + '   *  '}

                    <SelectStyle
                        name={Name}
                        className="form-control form-control-sm"
                        onChange={onChange}
                        // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                        // onBlur={validacion}  //si presionamos fuera del input
                        valido={estado.valido}
                        value={estado.campo || ''}
                        onClick={validacion}
                    >
                        <option>Seleccionar</option>

                        {lista.map((r) => (

                            <option key={r.id} value={r.id}>{r.nombre}</option>
                        ))}
                    </SelectStyle>
                    <LeyendaError>{mensaje}</LeyendaError>
                </label>
            </div>
        </div>
    )
}





const InputUsuario = ({ estado, cambiarEstado, tipo, name, placeholder, ExpresionRegular, eventoBoton, span }) => {

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)

        }, 10000)
    }, [mensaje])

    // console.log(estado)
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
                setMensaje('campo invalido !! ')
            }
        }
    }

    let tipoinput = ''
    if (tipo === 'password')
        tipoinput = tipo
    else
        tipoinput = 'text'

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            eventoBoton()
        }
    }

    return (
        <div>
            <div className="input-group mb-0" style={{ position: 'relative' }}>
                <Input
                    type={tipoinput}
                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    value={estado.campo || ''}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}  //si presionamos fuera del input
                    onKeyDown={handleKeyPress}
                    valido={estado.valido}
                    style={{ fontSize: '12px', height: '20px' }}
                />

                <div className="input-group-append">
                    <div className="input-group-text styles" >
                        <span className={span}></span>
                    </div>
                </div>
            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{mensaje}</LeyendaError>}
        </div>
    )
}

const ComponenteInputUser = ({ estado, cambiarEstado, name, placeholder, tipo = 'text', ExpresionRegular, etiqueta, campoUsuario = false, msg, important = true }) => {

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000)
    }, [mensaje])

    const onChange = (e) => {
        if (campoUsuario === true)
            cambiarEstado({ ...estado, campo: e.target.value })
        else
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                setMensaje(null)
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
                setMensaje(msg)
            }
        }
    }


    return (
        <div >
            <div className=" field" style={{ position: 'relative', paddingBottom: '0px' }}>
                <p className='origen-titulo-modal'>{important ? etiqueta + '   *' : etiqueta}

                    <Input
                        type={tipo}
                        className="form-control form-control-sm"
                        id={name}
                        name={name}
                        expresionRegular={ExpresionRegular}
                        placeholder={placeholder}
                        value={estado.campo || ''}
                        onChange={onChange}
                        onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                        onBlur={validacion}  //si presionamos fuera del input
                        valido={estado.valido}
                    />
                    <LeyendaError>{mensaje}</LeyendaError>
                </p>
            </div>
        </div >

    )
}








const ComponenteInputUserDisabled = ({ estado, name, ExpresionRegular, span = '', etiqueta }) => {


    return (
        <div className="field" >
            <label> {etiqueta}
                <Input
                    type='text'
                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    expresionRegular={ExpresionRegular}
                    value={estado.campo || ''}
                    valido={estado.valido}
                    toUpperCase
                    disabled={true}
                />
                {span !== '' && <div className="input-group-append">
                    <div className="input-group-text styles" >
                        <span className={span}></span>
                    </div>
                </div>}
            </label>
        </div>
    )
}


const ComponenteInputfecha = ({ estado, cambiarEstado, name, ExpresionRegular, etiqueta, msg }) => {

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000)
    }, [mensaje])
    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                setMensaje(null)
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
                setMensaje(msg)
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div>
            <div className="field" style={{ position: 'relative' }}>
                <label>{etiqueta + '   *'}
                    <Inputfecha
                        type='date'
                        className="form-control form-control-sm"
                        id={name}
                        name={name}
                        expresionRegular={ExpresionRegular}
                        min='1900-12-12'
                        // placeholder={placeholder}
                        value={estado.campo || ''}
                        onChange={onChange}
                        onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                        onBlur={validacion}  //si presionamos fuera del input
                        valido={estado.valido}
                    />
                    <LeyendaError  >{mensaje}</LeyendaError>
                </label>
            </div>
        </div >
    )
}


const ComponenteInputFile = ({ cambiarEstado, name, etiqueta, ExpresionRegular, msg }) => {

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000)
    }, [mensaje])


    const onchange = e => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(e.target.files[0].name)) {
                cambiarEstado(e.target.files[0])  //el valor del campo valido, debe ser una cadena 
                setMensaje(null)
            }
            else {
                toast.error('archivo invalido')
                cambiarEstado(null)
                setMensaje(msg)
            }
        }
    }

    // console.log(estado.campo.name)
    return (
        <div className=" field">
            <label >{etiqueta}
                < input
                    type='file'
                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    onChange={onchange}
                />
                <LeyendaError  >{mensaje}</LeyendaError>
            </label>
            <Toaster position='top-right' />
        </div>
    )
}

const ComponenteCheck = ({ id, item, admitidos, examen, mostrar }) => {

    const onChange = (e) => {
        if (e.target.checked) {
            admitidos.push(parseInt(e.target.value))
        }

        if (e.target.checked === false) {
            let indiceEliminar = null
            admitidos.forEach(x => {
                if (x == parseInt(e.target.value)) {
                    indiceEliminar = admitidos.indexOf(parseInt(e.target.value))
                    admitidos.splice(indiceEliminar, 1);
                }
            })
        }


        mostrar([])
        let nombres = []
        admitidos.forEach(x => {
            examen.forEach(y => {
                if (x === y.idItemServicio) {
                    nombres.push({ nombre: y.servicioSolicitado })
                }

            })
        })
        mostrar(nombres)
    }


    let check = false
    admitidos.forEach(e => {
        // console.log(e, id, 'comparacion')
        if (parseInt(id) === e) {
            check = true
        }
    })


    // console.log('seleccionados ', admitidos)

    return (
        <ContenedorCheck>
            <label htmlFor={id + 'ser'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={id}
                    value={id}
                    id={id + 'ser'}
                    onChange={onChange}
                    defaultChecked={check}
                />
                <small>{item}</small>
            </label>
        </ContenedorCheck>
    )
}




const ComponenteInputUserArea = ({ estado, cambiarEstado, name, placeholder, tipo = 'text', ExpresionRegular, etiqueta, campoUsuario = false }) => {

    const onChange = (e) => {
        if (campoUsuario === true)
            cambiarEstado({ ...estado, campo: e.target.value })
        else
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }


    return (
        <div className=" field">
            <label >{etiqueta}</label>
            <InputArea
                type={tipo}
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
            />
        </div>
    )
}





const ComponenteInputMes = ({ estado, cambiarEstado, name, ExpresionRegular, etiqueta, setIni, setFin, funcion }) => {

    const onChange = (e) => {
        // cambiarEstado({ campo: e.target.value, valido : 'true' }) // cambiarEstado({ ...estado, campo: e.target})
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ campo: e.target.value, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                let año = new Date(e.target.value + '-01').getFullYear();
                let mes = new Date(e.target.value + '-01').getMonth() + 1;


                const dias = new Date(año, mes + 1, 0).getDate()
                const ini = new Date(año, mes, 1).toISOString().split('T')[0]
                const fin = new Date(año, mes, dias).toISOString().split('T')[0]
                setIni({ campo: ini, valido: 'true' })
                setFin({ campo: fin, valido: 'true' })
                if (funcion)
                    funcion(ini, fin)
                console.log('fecha inicial y final resp', ini, fin)

            }
            else {
                cambiarEstado({ campo: null, valido: 'false' })
                console.log('fcha incompleto')
            }
        }
    }

    const validacion = () => {
        //     console.log('cambios')
        //     if (ExpresionRegular) {
        //         if (ExpresionRegular.test(estado.campo)) {
        //             cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
        //             console.log(estado.campo, new Date(estado.campo+'-01'),'mes actual en el componenete fecha')
        //         }
        //         else {
        //             cambiarEstado({ ...estado, valido: 'false' })
        //             console.log('fcha incompleto')
        //         }
        //     }
        //     // console.log("fechas: ", estado)

    }
    // console.log(estado)

    return (
        <div className="field" >
            <label>{etiqueta}</label>
            <Inputfecha
                type='month'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                min='1900-12-12'
                // placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}




const ComponenteInputHora = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, etiqueta }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div className="field" >
            <label>{etiqueta}</label>
            <Inputfecha
                type='time'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
            />
        </div>
    )
}













































const GenerarPdf = ({ informe, setEstado, lab, numero = null }) => {
    // console.log(lab[0][0].red, 'laboratorio')
    const ref = useRef()
    let hoy = new Date()
    let antes = new Date(informe[0].fechaNac) // formato: yyyy-MM-dd
    let edad1 = hoy.getFullYear() - antes.getFullYear()
    let mes = hoy.getMonth() - antes.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
        edad1--
    }
    let data = []
    let codigos = []
    informe.forEach(element => {
        data.push(element.codigo)
    });
    codigos = data.filter((item, index) => {
        return data.indexOf(item) === index
    })

    let tam = window.innerWidth
    return (
        <div className='row' style={{ background: 'white' }} >
            <div className='m-auto  col-12 col-sm-12 col-md-10 col-lg-8 ' style={{ background: 'white' }} >
                {/* style={{ paddingLeft: '100px', paddingRight: '0px', background: 'white' }} */}
                <div ref={ref} className='pl-xl-5 pr-xl-5 pl-lg-5 pr-lg-5 pl-md-5 pr-md-5  pl-sm-5 pr-sm-5 pl-0 pr-0 mt-5'>
                    <div className='title' style={{ padding: '5px' }}>
                        <img src="dist/img/sp.png" alt="perfil" className="img-circle elevation-4" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                        <label>LABORATORIO DE ANALISIS CLINICO</label>
                    </div>
                    {/* <div style={{ fontSize: '15px', textAlign: 'center', margin: '20px' }}>Resultados siempre confiables</div> */}
                    <div style={{ fontSize: '12px', textAlign: 'center', margin: '10' }}>DATOS DEL PACIENTE</div>
                    <div className='row'>
                        <div className='col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12' >
                            <div style={{ height: '20px' }} ><label className='subtitulo'>NOMBRE  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].paciente}</label></div>
                            <div style={{ height: '20px' }}><label className='subtitulo'>FECHA DE NACIMIENTO  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].fechaNac.split('T')[0]}</label></div>
                            <div style={{ height: '20px' }}><label className='subtitulo'> EDAD  </label><label style={{ fontSize: '12px' }}>{': ' + edad1 + ' años'}</label></div>
                            <div style={{ height: '20px' }}><label className='subtitulo'> SEXO  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].sexo}</label></div>
                            <div style={{ height: '20px' }}><label className='subtitulo'> MEDICO  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].solicitante}</label></div>
                        </div>
                        <div className='col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12'>
                            <div style={{ height: '20px' }} ><label className='subtitulo'> FECHA DE REPORTE  </label><label style={{ fontSize: '12px' }}>{' :  ' + informe[0].fechaHoraPublicacionRes.split('T')[0]}</label></div>
                            {/* {
                            informe.map((e) => (
                                e.encabezado === 1 &&
                                <div style={{ height: '20px' }}><label className='subtitulo'> {"Numero de muestra  " + "( " + e.prueba + ' )'}  </label><label style={{ fontSize: '12px' }}>{': ' + e.numIdentificacionLab}</label></div>

                            ))} */}
                        </div>
                    </div>

                    <div className="card-body table table-responsive mt-3" style={{ padding: '0px' }}>
                        <div style={{ height: '20px' }}><p className='subtitulo '> Servicios Solicitados </p></div>
                        <div className='table-responsive'>
                            <Table id="example12" className=" table table-sm">
                                <thead style={{ color: '#006572', background: 'white' }}>
                                    <tr >
                                        <th className="col-4 ">PARAMETRO</th>
                                        <th className="col-2 ">RESULTADO</th>
                                        <th className="col-2 ">UNIDAD</th>
                                        <th className="col-4 ">INDICE DE REFERENCIA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {codigos.map(cod => (
                                        informe.map(e => (
                                            cod === e.codigo &&
                                            <>
                                                {e.encabezado === 1 ?
                                                    <tr style={{ margin: '0px', padding: '0px', color: '#006572', fontSize: '14px' }} key={e.id}>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.prueba}</td>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.resultado}</td>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.unidad ? e.unidad : 'No adminite'}</td>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.intervalo ? e.intervalo : 'No admite'}</td>
                                                    </tr> :
                                                    <tr style={{ margin: '0px', padding: '0px' }} key={e.id}>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.prueba}</td>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.resultado}</td>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.unidad ? e.unidad : 'No adminite'}</td>
                                                        <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.intervalo ? e.intervalo : 'No admite'}</td>
                                                    </tr>
                                                }
                                            </>
                                        ))
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <p className='nhc'> {'SERVICIO(S) SOLICITADO '}</p>
                    {codigos.map(cod => (
                        informe.map(e => (
                            cod === e.codigo && e.encabezado === 1 &&
                            <div key={e.id}>
                                <li key={e.id} style={{ color: '#006572', fontSize: '14px', margin: '2px', paddingBottom: '15px' }}>{e.prueba}</li>
                                {e.metodologia && <p style={{ fontSize: '11px', margin: '2px', padding: '2px' }}>{'APLICA LA METODOLOGIA ' + e.metodologia}</p>}


                            </div>
                        ))
                    ))}

                    <div style={{ textAlign: 'right' }}>

                        {informe[0].firma && <img src={URL + '/' + informe[0].firma} alt="frima concedida por El laboratorio de San Pedro Claver" style={{ width: '150px', fontSize: '10', height: '150px', margin: '10px' }} />}
                    </div>



                    <div className='mt-4' style={{ fontSize: '15px' }}><label className='subtitulo'>IMPORTANTE: Los resultados incluidos en este reporte no sustituyen la consulta médica. Para una interpretación adecuada,
                        es necesario que un médico los revise y coleccione con información clínica (signos, síntomas, antecedentes) y la obtenida de
                        otras pruebas complementarias. </label>
                    </div>

                    <div style={{ minHeigh: '20px', fontSize: '10px', color: '#757575', marginTop: '40px', fontFamily: 'Verdana' }}><p > {lab[0][0].red + '  -  ' + lab[0][0].nombre + '   |   ' + lab[0][0].direccion + '   ' + lab[0][0].telefono} </p></div>
                    {/* <div style={{ height: '20px', fontSize: '12px', color: '#757575', marginTop: '0px', fontFamily: 'Verdana' }}><p > {} </p></div> */}
                </div>
            </div>
            <div className='col-12 col-sm-12 col-md-2 col-lg-2 mt-5'>
                <div className='float-left'>
                    <div className='col-auto mb-2'>
                        <Button className=' cancelarVentanaSolicitud ' onClick={() => setEstado(numero ? numero : 5)}>Cerrar <span className='btnNuevoIcono'><FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon></span> </Button>
                    </div>
                    <div className='col-auto'>
                        {tam > 600 && <ReactPrint trigger={() => <Button className=' Historial ' >Imprimir <span className='btnNuevoIcono'><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></span> </Button>} content={() => ref.current} documentTitle={informe[0].fecha.split('T')[0] + '_' + informe[0].paciente} />}
                    </div>
                </div>
            </div>
        </div >
    )
}


















































































const ComponenteInputBuscar_ = ({ estado, cambiarEstado, name, ExpresionRegular, placeholder, eventoBoton, etiqueta }) => {

    const onchange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
    }
    const validacion = () => {
        if (ExpresionRegular) {

            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 && estado.valido === 'true') {
            eventoBoton()
        }
    }

    return (
        <div className="" >
            {/* <label className='mr-3'>{etiqueta + ' : '}</label> */}
            <InputBuscador
                type='text'
                value={estado.campo || ''}
                id={'idBuscador'}
                className="form-control form-control-sm "
                name={name}
                placeholder={placeholder}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                onChange={onchange}
                valido={estado.valido}
                onKeyDown={handleKeyPress}
            // keyup = {teclaenter}
            />
            <button className="icon" onClick={eventoBoton}> <FontAwesomeIcon icon={faSearch} /></button>
        </div>
    )
}




const Footer = () => {
    return (
        <div className='footer-pague'> @COPYRIGHT  <Link className='ml-3' to={'#'} onClick={() => { window.location.href = 'https://wa.me/59171166513' }}>
            <span className='spam-footer'> Desarrollador: Gustavo Aguilar Torres</span></Link> </div>
    )
}





























export {
    InputUsuario,
    ComponenteInputUser,
    Select1, Select2_, SelectString,

    ComponenteInputFile,
    GenerarPdf,

    ComponenteInputBuscar_,

    ComponenteInputfecha, ComponenteCheck, ComponenteInputUserDisabled, ComponenteInputHora, ComponenteInputUserArea,

    ComponenteInputMes, Footer

}



