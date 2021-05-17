import axios from 'axios';

export class MantenedorService {
    baseURL = "http://localhost:8001/";

    getListar(){
        return axios.get(this.baseURL + "listar").then(res => res.data);
    }

    save(mantenedor){
        return axios.post(this.baseURL + "crear", mantenedor).then(res => res.data);
    }

    delete(identificador){
        return axios.delete(this.baseURL + "eliminar/"+identificador).then(res => res.data);
    }
}