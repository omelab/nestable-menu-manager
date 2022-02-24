const fs = require("fs");
let navs = require("../_data/navs.json");

export const navRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return navs;
}

function getById(id) {
  return navs.find((x) => x.id.toString() === id.toString());
}

function create({ title, firstName, lastName, email, role, password }) {
  const nav = { title, firstName, lastName, email, role, password };

  // validate
  if (navs.find((x) => x.email === nav.email))
    throw `User with the email ${user.email} already exists`;

  // generate new user id
  nav.id = navs.length ? Math.max(...navs.map((x) => x.id)) + 1 : 1;

  // set date created and updated
  nav.dateCreated = new Date().toISOString();
  nav.dateUpdated = new Date().toISOString();

  // add and save user
  navs.push(nav);
  saveData();
}

function update(id, { title, firstName, lastName, email, role, password }) {
  const params = { title, firstName, lastName, email, role, password };
  const nav = navs.find((x) => x.id.toString() === id.toString());

  // validate
  if (params.email !== user.email && navs.find((x) => x.email === params.email))
    throw `User with the email ${params.email} already exists`;

  // only update password if entered
  if (!params.password) {
    delete params.password;
  }

  // set date updated
  nav.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(nav, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  navs = navs.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync("../data/navs.json", JSON.stringify(navs, null, 4));
}
