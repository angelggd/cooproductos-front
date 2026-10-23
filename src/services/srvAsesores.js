import { endpoints } from '../config/endpoints';


//esta funcion devuelve los asesores
export const getAsesores = async(query) => {
    const {act} = query;
    try {
        const response = await fetch(`${endpoints.asesores}?act=${act}`, {
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

//esta funcion devuelve los asesores
export const getAsesorById = async(id) => {
    try {
        const response = await fetch(`${endpoints.asesores}/${id}`, {
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


//esta funcion devuelve los asesores
export const saveAsesor = async(datos) => {
    try {
        const response = await fetch(`${endpoints.asesores}`, {
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

//esta funcion devuelve los asesores
export const toggleAsesor = async(id) => {
    console.log("Asesor",id)
    try {
        const response = await fetch(`${endpoints.asesores}/${id}`, {
            method: "PATCH",
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