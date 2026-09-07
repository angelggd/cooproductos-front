import { endpoints } from '../config/endpoints';

//esta funcion genera el archivo pdf de la solicitud de credito
export const generarSolicitud = async(datos) => {
    try {
        const response = await fetch(`${endpoints.reportes}/solicitud`, {
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