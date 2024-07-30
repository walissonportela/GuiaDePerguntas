const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Pergunta = require('./database/Pergunta'); // Importa o modelo Pergunta

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(pergunta =>{
        res.render("index",{
            pergunta: pergunta
        });
    });
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/perguntar/:id", (req, res) => {
    const id = req.params.id;
    Pergunta.findOne({ where: { id: id } }).then(pergunta => {
        if (pergunta) {
            res.render("perguntaUnica", { pergunta: pergunta });
        } else {
            res.status(404).send("Pergunta não encontrada!");
        }
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});
