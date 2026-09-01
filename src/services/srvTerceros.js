import { endpoints } from '../config/endpoints';

//esta funcion devuelve el numero de registros de la tabla de terceros
export const countTerceros = async() => {
    try {
        const response = await fetch(`${endpoints.terceros}/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion devuelve los terceros
export const getTerceros = async(query) => {
    const {pag, lim, npag} = query;
    try {
        const response = await fetch(`${endpoints.users}/count?pag=${pag}&lim=${lim}&npag=${npag}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion devuelve tercero por su id
export const getTerceroById = async(id) => {
    try {
        const response = await fetch(`${endpoints.users}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};


//esta funcion guarda la informacion del nuevo tercero
export const saveTercero = async(datos) => {
    try {
        const response = await fetch(`${endpoints.terceros}`, {
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

//esta funcion actualiza la informacion del tercero
export const updateTercero = async(datos, id) => {
    try {
        const response = await fetch(`${endpoints.terceros}/${id}`, {
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