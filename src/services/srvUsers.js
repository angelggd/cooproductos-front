import { endpoints } from '../config/endpoints';

//esta funcion devuelve el numero de registros de la tabla de usuarios de un roll definido
export const countUsers = async(query) => {
    const {roll_id} = query;
    try {
        const response = await fetch(`${endpoints.users}/count?roll_id=${roll_id}`, {
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

//esta funcion devuelve los usuarios 
export const getUsers = async(query) => {
    const {pag, lim, npag, roll_id} = query;
    try {
        const response = await fetch(`${endpoints.users}/count?roll_id=${roll_id}&pag=${pag}&lim=${lim}&npag=${npag}`, {
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

//esta funcion guarda la informacion del nuevo usuario
export const saveUser = async(datos) => {
    try {
        const response = await fetch(`${endpoints.users}`, {
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

//esta funcion hace login real de usuarios
export const loginUser = async(query) => {
    try {
        const response = await fetch(`${endpoints.users}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query)

        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};