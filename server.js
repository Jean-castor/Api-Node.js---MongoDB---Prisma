 
 import express from "express";
 import { PrismaClient } from "@prisma/client";

 const prisma = new PrismaClient();

 const app = express();

 app.use(express.json()); // NOTE Para o express entender requisições em formato JSON

 //Criando e salvando um usuário em users
 app.post("/users", async (req, res) => {
   await prisma.user.create({
     data: {
       name: req.body.name,
       email: req.body.email,
       age: req.body.age,
     },
   });
   res.status(201).json(req.body);
   console.log(req.body);
   
 }); 

 // Apenas requisitando informações dos usuários 
 app.get("/users", async (req, res) => {
   const users = await prisma.user.findMany();
   res.status(200).json(users);
 });

 // Editando / atualizando todas as informações dos usuários
 // Os dois métodos a seguir manipulam cada usuário pelo id
 // Em ==> "users/:id" id como parâmetro da rota

 
 app.put("/users/:id", async (req, res) => {
   await prisma.user.update({
     where: {
       id: req.params.id
     },
     data: {
       name: req.body.name,
       email: req.body.email,
       age: req.body.age,
     },
   });
   res.status(201).json(req.body);

 });

 // Atualizando parcialmente as informações dos usuários

 app.patch("/users/:id", async (req, res) => {
   await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    },
  })
  res.status(201).json(req.body);
 });

 // Deletando um usuário do sistema
 // "users/:id" é o parâmetro da requisição

 app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

 app.listen(3000);















































































/*
   Criar nossa Api de usuários

    - Criar um usuário
        - o usuário criado deve ser guardado em algum lugar;
        - contendo os seguintes campos:
            - id;
            - nome;
            - email;
            - senha.

    - Listar todos os usuários;
        - Exibir apenas os campos que caracterizam um usuário;

    - Editar um usuário;
        - Editar apenas informações como:
            - nome;
            - email;
            - senha.

    - Deletar um usuário;
*/