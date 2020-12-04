import express from 'express';
import { JsonErrorResponse } from 'express-with-json';
import { getManager } from 'typeorm';

import { Order } from '../models/order';
import { User } from '../models/user';

export async function createUser(req: express.Request, res: express.Response) {
  const { name, } = req.params;

  const user = new User();
  user.name = name;
  console.log(req);

  const userRepository = getManager().getRepository(User);
  await userRepository.save(user);
  res.send(user);
}

export async function removeUser(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const userRepository = getManager().getRepository(User);
  console.log(req.body);
  userRepository.findOneOrFail(id)
    .then((user)=>{
      userRepository.remove(user)
      .then(()=>{
        res.send( { ok: true });
      })

    })
    .catch(e=>{
      res.send(JSON.stringify(e));
    })

}

export const getAllUser = async (req: express.Request, res: express.Response) => {

  // get a user repository to perform operations with User
  const userRepository = getManager().getRepository(User);

  // load a user by a given user id
  const users = await userRepository.find();

  // return loaded users
  res.send(users);
}

export async function getUser(req: express.Request, res: express.Response) {
  const { id } = req.params;
  console.log(req.body);
   // get a user repository to perform operations with User
   const userRepository = getManager().getRepository(User);

   userRepository.findOneOrFail(id)
   .then((user)=>{
     res.send(user);
   })
   .catch(e=>{
     res.send(JSON.stringify(e))
   });
}

export async function updateUser(req: express.Request) {
  const { id } = req.params;
  const { name, price } = req.body;
  const manager = getManager();

  const user = await manager.findOneOrFail(User, id);

  user.name = name;
  user.price = price;

  return await manager.save(user);
}

export default (app: express.Application) => {
  app.post('/user', createUser);
  app.delete('/user/:id', removeUser);
  app.get('/user', getAllUser);
  app.get('/user/:id', getUser);
  app.patch('/user/:id', updateUser);
}