import { endpoints } from '../config/endpoints';

//esta funcion devuelve el numero de registros 
export const countClientes = async() => {
    try {
        const response = await fetch(`${endpoints.clientes}/count`, {
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

//esta funcion devuelve los clientes 
export const getClientes = async(query) => {
    const {pag, lim, npag} = query;
    try {
        const response = await fetch(`${endpoints.clientes}?pag=${pag}&lim=${lim}&npag=${npag}`, {
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

//esta funcion devuelve cliente por su id 
export const getClienteById = async(id) => {
    try {
        const response = await fetch(`${endpoints.clientes}/${id}`, {
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

//esta funcion que guarda un cliente nuevo
export const saveCliente = async(datos) => {
    try {
        const response = await fetch(`${endpoints.clientes}`, {
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

//esta funcion que actualiza un cliente
export const updateCliente = async(datos, id) => {
    try {
        const response = await fetch(`${endpoints.clientes}/${id}`, {
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
