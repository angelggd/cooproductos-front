import { endpoints } from '../config/endpoints';

export const devuelveFechaFormateada = (hoy) => {
   const anio = hoy.getFullYear();
   const mes = String(hoy.getMonth() + 1).padStart(2, '0');
   const dia = String(hoy.getDate()).padStart(2, '0');
   const fechaGenerada = `${anio}-${mes}-${dia}`;
   return fechaGenerada
};

//esta funcion devuelve el numero de registros de la tabla de solicitudes
export const countSolicitudes = async(query, token) => {
    const {estado, vendedor, usuario_id, cliente, lim, npag} = query;    
    try {
        const response = await fetch(`${endpoints.solicitudes}/count?cliente=${cliente}&lim=${lim}&npag=${npag}&estado=${estado}&vendedor=${vendedor}&usuario_id=${usuario_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion devuelve las solicitudes
export const getSolicitudes = async(query, token) => {
    const {estado, vendedor, usuario_id, cliente, lim, npag} = query;   
    try {
        const response = await fetch(`${endpoints.solicitudes}?cliente=${cliente}&lim=${lim}&npag=${npag}&estado=${estado}&vendedor=${vendedor}&usuario_id=${usuario_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion devuelve la solicitud por su id
export const getSolicitudById = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.solicitudes}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion guarda una solicitud
export const saveSolicitud = async(datos) => {
    try {
        const response = await fetch(`${endpoints.solicitudes}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};


//esta funcion actualiza una solicitud
export const updateSolicitud = async(datos, id) => {
    try {
        const response = await fetch(`${endpoints.solicitudes}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

