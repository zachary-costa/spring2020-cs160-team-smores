import http from "../http-common";


class StorageService {
    // TODO: /storage/ needs to be updated for logins
    getAll() {
        return http.get("/storage");
    }

    get(id) {
        return http.get(`/storage/${id}`);
    }

    create(data) {
        return http.post("/storage/", data);
    }

    update(id, data) {
        return http.put(`/storage/${id}`, data);
    }

    delete(id) {
        return http.delete(`/storage/${id}`);
    }

    deleteAll() {
        return http.delete("/storage");
    }

}

export default new StorageService();