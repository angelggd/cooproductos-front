import { endpoints } from '../config/endpoints';


//esta funcion devuelve el conteo de los vendedores
export const countVendedores = async(query) => {
    const {act,out} = query;
    try {
        const response = await fetch(`${endpoints.vendedores}/count?act=${act}&out=${out}`, {
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

//esta funcion devuelve los vendedores paginados
export const cargarVendedores = async(query) => {
    const {lim, npag, act, out} = query;
    try {
        const response = await fetch(`${endpoints.vendedores}/paginacion?lim=${lim}&npag=${npag}&act=${act}&out=${out}`, {
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


//esta funcion devuelve los vendedores
export const getVendedores = async(query) => {
    const {act} = query;
    try {
        const response = await fetch(`${endpoints.vendedores}?act=${act}`, {
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

//esta funcion devuelve los vendedores
export const getVendedorById = async(id) => {
    try {
        const response = await fetch(`${endpoints.vendedores}/${id}`, {
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


//esta funcion devuelve los vendedores
export const saveVendedor = async(datos) => {
    try {
        const response = await fetch(`${endpoints.vendedores}`, {
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

//esta funcion devuelve los vendedores
export const updateVendedor = async(datos, id) => {
    try {
        const response = await fetch(`${endpoints.vendedores}/${id}`, {
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

//esta funcion cambia estado de un vendedor
export const toggleVendedor = async(id) => {
    try {
        const response = await fetch(`${endpoints.vendedores}/toggle/${id}`, {
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