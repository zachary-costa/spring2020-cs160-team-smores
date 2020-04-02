import http from "../http-common";


class ListService {
    // TODO: /list/ needs to be updated for logins
    getAll() {
        return http.get("/list");
    }

    get(id) {
        return http.get(`/list/${id}`);
    }

    create(data) {
        return http.post("/list/", data);
    }

    update(id, data) {
        return http.put(`/list/${id}`, data);
    }

    delete(id) {
        return http.delete(`/list/${id}`);
    }

    deleteAll() {
        return http.delete("/list");
    }

}

export default new ListService();