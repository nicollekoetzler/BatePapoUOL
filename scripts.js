let nome;
let objetoNome;
let requisicao;
pegarNome();

function pegarNome(){ 
    nome = prompt("Digite seu nome"); 
    objetoNome = {
        name: nome
    }; 
    requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objetoNome);
    requisicao.catch(tratarErro); 
} 

function tratarErro(erro){
    let statusCode = erro.response.status;
    if (statusCode != 200){
        alert("Esse nome já existe");
        pegarNome();
    }
}

function adicionarMensagens(response){
    const dadosMensagens = response.data;
    for (let i = 0; dadosMensagens.length > i ;i++){
        if("status" === dadosMensagens[i].type){
            //TODO: adicionar mensagem status
        }
        break;
    }
}
carregarMensagens();

function carregarMensagens(){
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(adicionarMensagens);
}

function verificaOnline(){
    requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objetoNome);
//    requisicao.catch();
}


//    setInterval(verificaOnline, 5000);