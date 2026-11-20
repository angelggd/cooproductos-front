import { endpoints } from '../config/endpoints';

//esta funcion devuelve tasa efectiva mensual de un periodo
export const getTasaByPeriodo = async(query, token) => {
    const {tas_anual, tas_mes} = query;
    try {
        const response = await fetch(`${endpoints.creditos}/tasas/periodo?tas_anual=${tas_anual}&tas_mes=${tas_mes}`, {
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



//esta funcion devuelve los vendedores
export const getVendedor = async(query, token) => {
    const {act} = query;
    try {
        const response = await fetch(`${endpoints.creditos}/vendedores?act=${act}`, {
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

//esta funcion devuelve los modelos de credito
export const getModelos = async(query, token) => {
    const {act} = query;
    try {
        const response = await fetch(`${endpoints.creditos}/modelos?act=${act}`, {
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


//esta funcion devuelve el numero de registros de las tasas
export const conteoTasas = async(token) => {
    try {
        const response = await fetch(`${endpoints.creditos}/tasas/count`, {
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


//esta funcion devuelve los registros de las tasas
export const getTasas = async(query, token) => {
    const { lim, npag } = query;
    try {
        const response = await fetch(`${endpoints.creditos}/tasas?lim=${lim}&npag=${npag}`, {
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


//esta funcion guarda nueva tasa
export const saveTasa = async(datos, token) => {
    try {
        const response = await fetch(`${endpoints.creditos}/tasas`, {
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

//esta funcion guarda nueva tasa
export const updateTasa = async(datos, id, token) => {
    try {
        const response = await fetch(`${endpoints.creditos}/tasas/${id}`, {
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

//esta funcion devuelve el numero de registros de las pagadurias
export const conteoPagadurias = async(token) => {
    try {
        const response = await fetch(`${endpoints.creditos}/pagadurias/count`, {
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

//esta funcion devuelve las pagadurias en convenio
export const getPagadurias = async(query, token) => {
    const {pag, lim, npag, act} = query;
    try {
        const response = await fetch(`${endpoints.creditos}/pagadurias?pag=${pag}&act=${act}&lim=${lim}&npag=${npag}`, {
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


//esta funcion guarda nueva pagaduria
export const savePagaduria = async(datos, token) => {
    try {
        const response = await fetch(`${endpoints.creditos}/pagadurias`, {
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


//esta funcion cambia estado pagaduria
export const togglePagaduria = async(id, token) => {
    try {
        const response = await fetch(`${endpoints.creditos}/pagadurias/toggle/${id}`, {
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

