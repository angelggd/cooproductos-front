import { endpoints } from '../config/endpoints';

//esta funcion envia el correo al cliente para la verificacion del email
export const verificaEmail = async(cliente) => {
    try {
        const response = await fetch(`${endpoints.mailers}/usuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion envia el correo al cliente para la verificacion del email
export const verificaSolicitud = async(cliente, token) => {
    try {
        const response = await fetch(`${endpoints.mailers}/validaEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
            body: JSON.stringify(cliente),
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};

//esta funcion envia el correo al cliente con los datos de la solicitud
export const enviaSolicitud = async(datos) => {
    try {
        const response = await fetch(`${endpoints.mailers}/solicitud`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        const data = await response.json();
        return {status: 200, data}
    } catch (error) {
        console.log("Error",JSON.stringify(error))
        return { status: 600, message: "Unhandler error", error: error }
    }
};


