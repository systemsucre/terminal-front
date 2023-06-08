

function Taxi({ modelo, registrar, eliminar, placa, tipo, capacidad, encargado }) {

    const filas = [1, 2]
    let asiento = []
    modelo.forEach(element => {
        asiento.push(element.numeroAsiento)
    });
    return (

        <div className="row mt-5">
            <div className="col-6">
                <table >
                    <tbody >
                        {filas.map((element) => (

                            element === 1 ?
                                <tr   key={element}>
                                    <td><div className="asiento-conductor" ></div> </td>
                                    <td> <div></div></td>
                                    {/* {asiento.indexOf(1) === -1 ? <td onClick={() => registrar(1, 1)}><div className="asiento-inactivo-taxi" >1</div> </td> : <tr onClick={() => eliminar(1)}><div className="asiento-activo-taxi" >1</div></tr>} */}
                                    {asiento.indexOf(1) === -1 ? <td onClick={() => registrar(1, 1)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 1</span></div> </td> : <tr onClick={() => eliminar(1)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 1</span></div></tr>}
                                </tr>
                                :
                                <tr style={{ height: '90px' }} key={element}>
                                    {asiento.indexOf(2) === -1 ? <td onClick={() => registrar(2, 1)}><div className="asiento-inactivo-taxi"><span className="num-asiento"> 2</span></div> </td> : <td onClick={() => eliminar(2)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 2</span></div></td>}
                                    {asiento.indexOf(3) === -1 ? <td onClick={() => registrar(3, 2)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 3</span></div></td> : <td onClick={() => eliminar(3)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 3</span></div></td>}
                                    {asiento.indexOf(4) === -1 ? <td onClick={() => registrar(4, 1)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 4</span></div></td> : <td onClick={() => eliminar(4)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 4</span></div></td>}
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-6">
                <div className="row item-center">
                    <div className="col-1 disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento registrado</p></div>
                </div>
                <div className="row item-center">
                    <div className="col-1 no-disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento no registrado</p></div>
                </div>
                <div className="row image-taxi">
                </div>
                <p className="descripcion-vehiculo">{'ENCARGADO : '+encargado}</p>
                <p className="descripcion-vehiculo">{'TIPO : '+tipo}</p>
                <p className="descripcion-vehiculo">{'CAPACIDAD : '+ capacidad}</p>
                <p className="descripcion-vehiculo">{'PLACA DE CONTROL : '+placa}</p>
            </div>
        </div>


    )
}


function Surubi({ modelo, registrar, eliminar , placa, tipo, capacidad, encargado}) {

    const filas = [1, 2]
    let asiento = []
    modelo.forEach(element => {
        asiento.push(element.numeroAsiento)
    });
    return (

        <div className="row mt-4">
            <div className="col-6">
                <table >

                    <tbody >
                        <tr key={'primera-fila'}>
                            <td><div className="asiento-conductor" ></div> </td>
                            <td> <div></div></td>
                            {asiento.indexOf(1) === -1 ? <td onClick={() => registrar(1, 1)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 1</span></div> </td> : <tr onClick={() => eliminar(1)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 1</span></div></tr>}
                        </tr>
                        <tr style={{ height: '80px' }}>
                            {asiento.indexOf(2) === -1 ? <td onClick={() => registrar(2, 1)}><div className="asiento-inactivo-taxi"><span className="num-asiento"> 2</span></div> </td> : <td onClick={() => eliminar(2)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 2</span></div></td>}
                            {asiento.indexOf(3) === -1 ? <td onClick={() => registrar(3, 2)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 3</span></div></td> : <td onClick={() => eliminar(3)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 3</span></div></td>}
                            {asiento.indexOf(4) === -1 ? <td onClick={() => registrar(4, 1)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 4</span></div></td> : <td onClick={() => eliminar(4)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 4</span></div></td>}
                        </tr>
                        <tr style={{ height: '80px' }}>
                            {asiento.indexOf(5) === -1 ? <td onClick={() => registrar(5, 1)}><div className="asiento-inactivo-taxi"><span className="num-asiento"> 5</span></div> </td> : <td onClick={() => eliminar(5)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 5</span></div></td>}
                            {asiento.indexOf(6) === -1 ? <td onClick={() => registrar(6, 2)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 6</span></div></td> : <td onClick={() => eliminar(6)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 6</span></div></td>}
                            {asiento.indexOf(7) === -1 ? <td onClick={() => registrar(7, 1)}><div className="asiento-inactivo-taxi" ><span className="num-asiento"> 7</span></div></td> : <td onClick={() => eliminar(7)}><div className="asiento-activo-taxi" ><span className="num-asiento"> 7</span></div></td>}
                        </tr>
                    </tbody>

                </table>
            </div>
            <div className="col-6">
                <div className="row item-center">
                    <div className="col-1 disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento registrado</p></div>
                </div>
                <div className="row item-center">
                    <div className="col-1 no-disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento no registrado</p></div>
                </div>
                <div className="row image-surubi">
                </div>
                <p className="descripcion-vehiculo">{'ENCARGADO : '+encargado}</p>
                <p className="descripcion-vehiculo">{'TIPO : '+tipo}</p>
                <p className="descripcion-vehiculo">{'CAPACIDAD : '+ capacidad}</p>
                <p className="descripcion-vehiculo">{'PLACA DE CONTROL : '+placa}</p>
            </div>
        </div>


    )
}



function MinibusCuatroFilas({ modelo, registrar, eliminar, placa, tipo, capacidad, encargado }) {

    const filas = [1, 2]
    let asiento = []
    modelo.forEach(element => {
        asiento.push(element.numeroAsiento)
    });
    return (

        <div className="row mt-4">
            <div className="col-5">
                <table >

                    <tbody >
                        <tr key={'primera-fila'}>
                            <td><div className="asiento-conductor-mini" ></div> </td>
                            <td> <div></div></td>
                            {asiento.indexOf(1) === -1 ? <td onClick={() => registrar(1, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini"> 1</span></div> </td> : <td onClick={() => eliminar(1)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 1</span></div></td>}
                            {asiento.indexOf(2) === -1 ? <td onClick={() => registrar(2, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini"> 2</span></div> </td> : <td onClick={() => eliminar(2)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 2</span></div></td>}

                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(3) === -1 ? <td onClick={() => registrar(3, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">3</span></div> </td> : <td onClick={() => eliminar(3)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 3</span></div></td>}
                            {asiento.indexOf(4) === -1 ? <td onClick={() => registrar(4, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">4</span></div></td> : <td onClick={() => eliminar(4)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 4</span></div></td>}
                            <td> <div></div></td>
                            <td> <div></div></td>
                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(5) === -1 ? <td onClick={() => registrar(5, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 5</span></div> </td> : <td onClick={() => eliminar(5)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 5</span></div></td>}
                            {asiento.indexOf(6) === -1 ? <td onClick={() => registrar(6, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">6</span></div></td> : <td onClick={() => eliminar(6)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 6</span></div></td>}
                            <td> <div></div></td>
                            {asiento.indexOf(7) === -1 ? <td onClick={() => registrar(7, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">7</span></div></td> : <td onClick={() => eliminar(7)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 7</span></div></td>}
                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(8) === -1 ? <td onClick={() => registrar(8, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 8</span></div> </td> : <td onClick={() => eliminar(8)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 8</span></div></td>}
                            {asiento.indexOf(9) === -1 ? <td onClick={() => registrar(9, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">9</span></div></td> : <td onClick={() => eliminar(9)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 9</span></div></td>}
                            {asiento.indexOf(10) === -1 ? <td onClick={() => registrar(10, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">10</span></div></td> : <td onClick={() => eliminar(10)}><div className="asiento-activo-mini" ><span className="num-asiento-mini">10</span></div></td>}
                            {asiento.indexOf(11) === -1 ? <td onClick={() => registrar(11, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-minissss"> 11</span></div> </td> : <td onClick={() => eliminar(11)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 11</span></div></td>}

                        </tr>
                    </tbody>

                </table>
            </div>
            <div className="col-7">
                <div className="row item-center">
                    <div className="col-1 disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento registrado</p></div>
                </div>
                <div className="row item-center">
                    <div className="col-1 no-disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento no registrado</p></div>
                </div>
                <div className="row image-minibus">
                </div>
                <p className="descripcion-vehiculo">{'ENCARGADO : '+encargado}</p>
                <p className="descripcion-vehiculo">{'TIPO : '+tipo}</p>
                <p className="descripcion-vehiculo">{'CAPACIDAD : '+ capacidad}</p>
                <p className="descripcion-vehiculo">{'PLACA DE CONTROL : '+placa}</p>
            </div>
        </div>


    )
}


function MinibusCincoFilas({ modelo, registrar, eliminar , placa, tipo, capacidad, encargado}) {

    const filas = [1, 2]
    let asiento = []
    modelo.forEach(element => {
        asiento.push(element.numeroAsiento)
    });
    return (

        <div className="row mt-4">
            <div className="col-5">
                <table >

                    <tbody >
                        <tr key={'primera-fila'}>
                            <td><div className="asiento-conductor-mini" ></div> </td>
                            <td> <div></div></td>
                            {asiento.indexOf(1) === -1 ? <td onClick={() => registrar(1, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini"> 1</span></div> </td> : <td onClick={() => eliminar(1)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 1</span></div></td>}
                            {asiento.indexOf(2) === -1 ? <td onClick={() => registrar(2, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini"> 2</span></div> </td> : <td onClick={() => eliminar(2)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 2</span></div></td>}

                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(3) === -1 ? <td onClick={() => registrar(3, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">3</span></div> </td> : <td onClick={() => eliminar(3)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 3</span></div></td>}
                            {asiento.indexOf(4) === -1 ? <td onClick={() => registrar(4, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">4</span></div></td> : <td onClick={() => eliminar(4)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 4</span></div></td>}
                            <td> <div></div></td>
                            <td> <div></div></td>
                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(5) === -1 ? <td onClick={() => registrar(5, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 5</span></div> </td> : <td onClick={() => eliminar(5)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 5</span></div></td>}
                            {asiento.indexOf(6) === -1 ? <td onClick={() => registrar(6, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">6</span></div></td> : <td onClick={() => eliminar(6)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 6</span></div></td>}
                            <td> <div></div></td>
                            {asiento.indexOf(7) === -1 ? <td onClick={() => registrar(7, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">7</span></div></td> : <td onClick={() => eliminar(7)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 7</span></div></td>}
                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(8) === -1 ? <td onClick={() => registrar(8, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 8</span></div> </td> : <td onClick={() => eliminar(8)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 8</span></div></td>}
                            {asiento.indexOf(9) === -1 ? <td onClick={() => registrar(9, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">9</span></div></td> : <td onClick={() => eliminar(9)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 9</span></div></td>}
                           
                            <td> <div></div></td> 
                            {asiento.indexOf(10) === -1 ? <td onClick={() => registrar(10, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-minissss"> 10</span></div> </td> : <td onClick={() => eliminar(10)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 10</span></div></td>}

                        </tr>
                        <tr style={{ height: '70px' }}>
                            {asiento.indexOf(11) === -1 ? <td onClick={() => registrar(11, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 11</span></div> </td> : <td onClick={() => eliminar(11)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 11</span></div></td>}
                            {asiento.indexOf(12) === -1 ? <td onClick={() => registrar(12, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">12</span></div></td> : <td onClick={() => eliminar(12)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 12</span></div></td>}
                            {asiento.indexOf(13) === -1 ? <td onClick={() => registrar(13, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">13</span></div></td> : <td onClick={() => eliminar(13)}><div className="asiento-activo-mini" ><span className="num-asiento-mini">13</span></div></td>}
                            {asiento.indexOf(14) === -1 ? <td onClick={() => registrar(14, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-minissss"> 14</span></div> </td> : <td onClick={() => eliminar(14)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 14</span></div></td>}

                        </tr>
                    </tbody>

                </table>
            </div>
            <div className="col-7">
                <div className="row item-center">
                    <div className="col-1 disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento registrado</p></div>
                </div>
                <div className="row item-center">
                    <div className="col-1 no-disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento no registrado</p></div>
                </div>
                <div className="row image-minibus-largo">
                </div>
                <p className="descripcion-vehiculo">{'ENCARGADO : '+encargado}</p>
                <p className="descripcion-vehiculo">{'TIPO : '+tipo}</p>
                <p className="descripcion-vehiculo">{'CAPACIDAD : '+ capacidad}</p>
                <p className="descripcion-vehiculo">{'PLACA DE CONTROL : '+placa}</p>
            </div>
        </div>


    )
}



function MinibusSeisFilas({ modelo, registrar, eliminar , placa, tipo, capacidad, encargado}) {

    const filas = [1, 2]
    let asiento = []
    modelo.forEach(element => {
        asiento.push(element.numeroAsiento)
    });
    return (

        <div className="row mt-3 mb-3">
            <div className="col-5">
                <table >

                    <tbody >
                        <tr key={'primera-fila'}>
                            <td><div className="asiento-conductor-mini" ></div> </td>
                            <td> <div></div></td>
                            {asiento.indexOf(1) === -1 ? <td onClick={() => registrar(1, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini"> 1</span></div> </td> : <td onClick={() => eliminar(1)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 1</span></div></td>}
                            {asiento.indexOf(2) === -1 ? <td onClick={() => registrar(2, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini"> 2</span></div> </td> : <td onClick={() => eliminar(2)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 2</span></div></td>}

                        </tr>
                        <tr style={{ height: '50px' }}>
                            {asiento.indexOf(3) === -1 ? <td onClick={() => registrar(3, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">3</span></div> </td> : <td onClick={() => eliminar(3)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 3</span></div></td>}
                            {asiento.indexOf(4) === -1 ? <td onClick={() => registrar(4, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">4</span></div></td> : <td onClick={() => eliminar(4)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 4</span></div></td>}
                            <td> <div></div></td>
                            <td> <div></div></td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            {asiento.indexOf(5) === -1 ? <td onClick={() => registrar(5, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 5</span></div> </td> : <td onClick={() => eliminar(5)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 5</span></div></td>}
                            {asiento.indexOf(6) === -1 ? <td onClick={() => registrar(6, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">6</span></div></td> : <td onClick={() => eliminar(6)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 6</span></div></td>}
                            <td> <div></div></td>
                            {asiento.indexOf(7) === -1 ? <td onClick={() => registrar(7, 1)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">7</span></div></td> : <td onClick={() => eliminar(7)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 7</span></div></td>}
                        </tr>
                        <tr style={{ height: '50px' }}>
                            {asiento.indexOf(8) === -1 ? <td onClick={() => registrar(8, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 8</span></div> </td> : <td onClick={() => eliminar(8)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 8</span></div></td>}
                            {asiento.indexOf(9) === -1 ? <td onClick={() => registrar(9, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">9</span></div></td> : <td onClick={() => eliminar(9)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 9</span></div></td>}
                           
                            <td> <div></div></td> 
                            {asiento.indexOf(10) === -1 ? <td onClick={() => registrar(10, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-minissss"> 10</span></div> </td> :<td onClick={() => eliminar(10)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 10</span></div></td>}

                        </tr>
                        <tr style={{ height: '50px' }}>
                            {asiento.indexOf(11) === -1 ? <td onClick={() => registrar(11, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 11</span></div> </td> : <td onClick={() => eliminar(11)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 11</span></div></td>}
                            {asiento.indexOf(12) === -1 ? <td onClick={() => registrar(12, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">12</span></div></td> : <td onClick={() => eliminar(12)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 12</span></div></td>}
                            <td> <div></div></td> 
                            {asiento.indexOf(13) === -1 ? <td onClick={() => registrar(13, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-minissss"> 13</span></div> </td> : <td onClick={() => eliminar(13)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 13</span></div></td>}

                        </tr>
                        <tr style={{ height: '50px' }}>
                            {asiento.indexOf(14) === -1 ? <td onClick={() => registrar(14, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-mini"> 14</span></div> </td> : <td onClick={() => eliminar(14)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 15</span></div></td>}
                            {asiento.indexOf(15) === -1 ? <td onClick={() => registrar(15, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">15</span></div></td> : <td onClick={() => eliminar(15)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 16</span></div></td>}
                            {asiento.indexOf(16) === -1 ? <td onClick={() => registrar(16, 2)}><div className="asiento-inactivo-mini" ><span className="num-asiento-mini">16</span></div></td> : <td onClick={() => eliminar(16)}><div className="asiento-activo-mini" ><span className="num-asiento-mini">17</span></div></td>}
                            {asiento.indexOf(17) === -1 ? <td onClick={() => registrar(17, 1)}><div className="asiento-inactivo-mini"><span className="num-asiento-minissss"> 17</span></div> </td> : <td onClick={() => eliminar(17)}><div className="asiento-activo-mini" ><span className="num-asiento-mini"> 18</span></div></td>}

                        </tr>
                    </tbody>

                </table>
            </div>
            <div className="col-7">
                <div className="row item-center">
                    <div className="col-1 disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento registrado</p></div>
                </div>
                <div className="row item-center">
                    <div className="col-1 no-disponible"></div>
                    <div className="col-10 "><p className="parrafos-asiento">Asiento no registrado</p></div>
                </div>
                <div className="row image-minibus-largo">
                </div>
                <p className="descripcion-vehiculo">{'ENCARGADO : '+encargado}</p>
                <p className="descripcion-vehiculo">{'TIPO : '+tipo}</p>
                <p className="descripcion-vehiculo">{'CAPACIDAD : '+ capacidad}</p>
                <p className="descripcion-vehiculo">{'PLACA DE CONTROL : '+placa}</p>
            </div>
        </div>


    )
}


export { Taxi, Surubi, MinibusCuatroFilas, MinibusCincoFilas, MinibusSeisFilas }