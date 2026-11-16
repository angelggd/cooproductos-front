import { endpoints } from '../config/endpoints';

//esta funcion devuelve el numero de registros 
export const countClientes = async(query, token) => {
    const {lim, npag, act} = query;
    try {
        const response = await fetch(`${endpoints.clientes}/count?lim=${lim}&npag=${npag}&act=${act}`, {
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

//esta funcion devuelve los clientes 
export const getClientes = async(query, token) => {
    const {lim, npag, act} = query;
    try {
        const response = await fetch(`${endpoints.clientes}?lim=${lim}&npag=${npag}&act=${act}`, {
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

//esta funcion devuelve cliente por su id 
export const getClienteById = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.clientes}/${id}`, {
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

//esta funcion devuelve cliente por el id de tercero
export const getClienteByTerceroId = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.clientes}/tercero_id/${id}`, {
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

//esta funcion que guarda un cliente nuevo
export const saveCliente = async(datos, token) => {
    try {
        const response = await fetch(`${endpoints.clientes}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token,
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
export const updateCliente = async(datos, id, token) => {
    try {
        const response = await fetch(`${endpoints.clientes}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "token": token,
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


//esta funcion que actualiza el estado activo a un cliente
export const toggleCliente = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.clientes}/toggle/${id}`, {
            method: "PATCH",
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