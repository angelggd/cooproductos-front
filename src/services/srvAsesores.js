import { endpoints } from '../config/endpoints';


//esta funcion devuelve los asesores
export const getAsesores = async(query, token) => {
    const {act} = query;
    try {
        const response = await fetch(`${endpoints.asesores}?act=${act}`, {
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

//esta funcion devuelve los asesores
export const getAsesorById = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.asesores}/${id}`, {
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


//esta funcion devuelve los asesores
export const saveAsesor = async(datos, token) => {
    try {
        const response = await fetch(`${endpoints.asesores}`, {
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

//esta funcion activa o inactiva asesores
export const toggleAsesor = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.asesores}/toggle/${id}`, {
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