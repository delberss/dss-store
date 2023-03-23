const connect = require('./dataBase/connect');
const express = require('express')
const cors = require('cors')
connect();


const port = process.env.PORT || 3001;

const products = require("./products")

const bcrypt = require("bcrypt");


const app = express();

const User = require("./models/User")

app.use(cors());
app.use(express.json());


// PEGA TODOS USUARIOS DO BANCO
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PEGA USUARIO DADO UM ID
app.get('/user/:id',  async (req, res) => {
  try{
    const id = req.params.id;

    const user = await User.findById(id);

    if(user){
      res.status(201).json(user)
    }
    else{
      res.status(400).json("Usuário não encontrado!");
    }
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
})

// PEGA TODOS OS PRODUTOS
app.get('/products', async (req, res) => {
  try{
    res.status(200).json(products);
  } catch(err){
    res.status(400).json({message: `Erro. ${err.message}`})
  }
});

// ADICIONA UM PRODUTO DADO O ID DO USUARIO E DO PRODUTO
app.post('/add/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const productExists = user.products.find(item => item?.id === produto.id);

    if (productExists) {
      productExists.quantidade = Number(productExists.quantidade) + 1;
      
      await User.findByIdAndUpdate(id, { products: user.products });
      res.status(200).json({message: 'Produto existente atualizado com sucesso!'});
    } 
    else{
      user.products.push(produto);
      await user.save();
      res.status(200).json({message: 'Produto adicionado com sucesso!'});
    }
  } catch (error) {
      throw new(error.message);
      res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
});


// REMOVE UM PRODUTO DADO O ID DO USUARIO
app.post('/remove/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const productExists = user.products.find(item => item?.id === produto.id);

    if (productExists) {
      const newProducts = user.products.filter(item => item.id !== produto.id);
      await User.findByIdAndUpdate(id, { products: newProducts });
      res.status(200).json({message: 'Produto removido com sucesso!'});
    } 
    else{
      res.status(200).json({message: 'Produto não existe'});
    }
  } catch (error) {
      throw new(error.message);
      res.status(400).json({ message: 'Erro ao remover produto' });
    }
});

// DIMINUI UM ITEM DADO O ID DO USUARIO
app.post('/decrease/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const productExists = user.products.find(item => item?.id === produto.id);

    if (productExists) {
      productExists.quantidade = Number(productExists.quantidade) - 1;
      if (productExists.quantidade <= 0) {
        user.products = user.products.filter(item => item.id !== produto.id);
      }
      await User.findByIdAndUpdate(id, { products: user.products });
      res.status(200).json({message: 'Produto atualizado com suceso!'});
    } 
    else{
      res.status(200).json({message: 'Produto não existe'});
    }
  } catch (error) {
      res.status(400).json({ message: 'Erro ao remover produto' });
    }
});

// AUMENTA UM ITEM DADO O ID DO USUARIO
app.post('/increase/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const productExists = user.products.find(item => item?.id === produto.id);

    if (productExists) {
      productExists.quantidade = Number(productExists.quantidade) + 1;
      await User.findByIdAndUpdate(id, { products: user.products });
      res.status(200).json('Produto atualizado com sucesso!');
    } 
    else{
      res.status(200).json('Produto não existe');
    }
  } catch (error) {
      res.status(400).json({ message: 'Erro ao remover produto' });
    }
});





// PEGA PRODUTOS DE UM USUARIO
app.get('/products/:id', async (req, res) => {
  try {
      const userId = req.params.id;

      const user = await User.findById(userId)
      res.status(200).json({ products: user.products });  

  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// FAZ LOGIN DE USUARIO
app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
          return res.status(400).json({ message: "email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...userWithoutPassword } = user.toObject();
        return res.status(200).json({ message: "Logado com sucesso!", user: userWithoutPassword });
      } else {
          return res.status(400).json({ message: "Senha inválida" });
      }
  } catch (err) {
      return res.status(400).json({ message: err.message });
  }
});

// FAZ REGISTRO DE USUARIO
app.post('/register', async (req, res) => {
    try{
      const { name, email, password} = req.body;

      const userExists = await User.findOne({ email });

      if(userExists){
        return res.status(400).json({message: "Email já cadastrado"});
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: passwordHash
      });

      await user.save();

      res.status(201).json({message: "Usuário cadastrado!"});
    } catch(err){
      res.status(400).json({ message: err.message });
    }
})


app.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})