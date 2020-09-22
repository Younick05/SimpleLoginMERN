import http from "../http-common";

const getAll = () => {
  return http.get("/user");
};

const get = id => {
  return http.get(`/user/dashboard/${id}`);
};

const create = data => {
  return http.post("/user", data);
};

const update = (id, data) => {
  return http.put(`/user/dashboard/${id}`, data);
};

const remove = id => {
  return http.delete(`/user/dashboard/${id}`);
};

const removeAll = () => {
  return http.delete(`/user/dashboard`);
};

const findByEmail = currentUserDetail => {
  return http.post('/user/login', currentUserDetail);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByEmail
};