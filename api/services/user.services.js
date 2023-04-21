const boom = require('@hapi/boom');

class UserService {
  constructor() {
    /*usuarios de ejemplo con persistencia en memoria, se debe conectar ba se de datos*/
    this.users = [
      {
        id: '1',
        name: 'Ivan',
        role: 'admin1',
      },
      {
        id: '2',
        name: 'Gina',
        role: 'admin1',
      },
    ];
  }

  async create(data) {
    const newUser = {
      id: (
        Number(this.users[this.users.length - 1].id) + 1
      ).toString() /*agrega automaticante id + 1 al crear nuevo usuario*/,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
