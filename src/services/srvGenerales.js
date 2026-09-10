import { endpoints } from '../config/endpoints';

//esta funcion devuelve los paises
export const getPaises = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/paises`, {
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

//esta funcion devuelve los departamentos de un pais
export const getDptos = async(id) => {
    try {
        const response = await fetch(`${endpoints.generales}/dptos/${id}`, {
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

//esta funcion devuelve las ciudades de un departamento
export const getCiudades = async(id) => {
    try {
        const response = await fetch(`${endpoints.generales}/ciudades/${id}`, {
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

//esta funcion devuelve los tipos de documento
export const getTipodoc = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/tipodoc`, {
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

//esta funcion devuelve las responsabilidades fiscales
export const getRespFiscal = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/respfiscal`, {
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

//esta funcion devuelve las ocupaciones
export const getOcupaciones = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/ocupacion`, {
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

//esta funcion devuelve los estados civiles
export const getEstcivil = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/estcivil`, {
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

//esta funcion devuelve los niveles educativos
export const getNivEducativo = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/niveducativo`, {
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

//esta funcion devuelve los tipos de vivienda
export const getVivienda = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/vivienda`, {
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

//esta funcion devuelve los parametros
export const getParametros = async() => {
    try {
        const response = await fetch(`${endpoints.generales}/parametros`, {
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

//esta funcion devuelve los tipos de vivienda
export const getParametroByCod = async(query) => {
    const {codigo} = query;
    try {
        const response = await fetch(`${endpoints.generales}/parametroByCod?codigo=${codigo}`, {
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