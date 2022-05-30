const e = require('express')
const user = require ('../models/user')
const router = require('express').Router()
//CRIAR NOVO USUARIO
router.post('/users', async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)

    if(!name) return  res.status(400).send('O nome não foi fornecido')
    else if(!email) return res.status(400).send('O email não foi fornecido')
    else if(!password)  return res.status(400).send('A senha não foi fornecido')

    try {
        const userTest = await user.findOne({email: email})
        if(userTest && userTest.matchedCount  !== 0) return res.status(409).send('Usuario ja existe!')
        user.create(req.body)
        res.status(201).send('Usuario criado com sucesso.')
    } catch (err) {
        res.status(500).send('Erro interno do servidor')
        throw err
    }
 })
//OBTER LISTA DE USUARIOS EXISTENTES
router.get('/users', async (req, res) => {
    try {
        const userlist = await user.find()
        res.status(200).send(userlist)
    } catch (error) {
        res.status(500).send('Erro interno do servidor')
        throw error
    }

})
//OBTER DADOS DE UM USUARIO ESPECIFICO ATRAVES DO ID: EMAIL
router.get('/users/:email', async (req, res) => {
    const emailId = req.params.email
  
    try {
      const selectedUser = await user.findOne({ email: emailId })
  
      if (!selectedUser) {
        res.status(422).send({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).send(selectedUser)
    } catch (error) {
      res.status(500).send('Erro interno do servidor')
    }
  })
//FAZER UPDATE NOS DADOS DE UM USUARIO ESPECIFICO DEFINIDO ATRAVES DO ID: EMAIL
router.patch('/users/:email', async (req, res) =>{
    try {
        const emailId = req.params.email

        if(!emailId) return res.status(400).send('Email não foi fornecido pelo usuário.')
        
        const { name, email, password } = req.body

        const userActual = {
            name,
            email,
            password
        }

        const selectedUser = await user.updateOne({ email: emailId }, userActual)

        if(selectedUser.matchedCount === 0) return res.status(422).send('Usuário não encontrado.')
        return res.status(200).send('Parametro alterado com sucesso!')
    } catch (error) {
        res.status(500).send('Erro interno do servidor')
        throw error
    }
})
//DELETAR USUARIO DEFINIDO ATRAVES DO ID: EMAIL
router.delete('/users/:email', async (req, res) => {
    try {
        const emailId = req.params.email

        if(!emailId) return res.status(400).send('Email não foi fornecido pelo usuário.')
        
        const selectedUser = await user.deleteOne({ email: emailId })
        if(selectedUser.deletedCount === 0) return res.status(422).send('Usuário não encontrado.')

        return res.status(200).send('Usuario deletado com sucesso')
    } catch (error) {
        res.status(500).send('Erro interno do servidor')
        throw error
    }
})
 module.exports = router