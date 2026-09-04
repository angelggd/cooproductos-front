import { endpoints } from '../config/endpoints';

//esta funcion devuelve tasa efectiva mensual de un periodo
export const getTasaByPeriodo = async(query) => {
    const {tas_anual, tas_mes} = query;
    try {
        const response = await fetch(`${endpoints.creditos}/tasas/periodo?tas_anual=${tas_anual}&tas_mes=${tas_mes}`, {
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