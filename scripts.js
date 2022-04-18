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

function mensagemStatus(mensagem){
    document.querySelector(".mensagens").innerHTML += `
    <div class="linha status">
        <p>
            <span class="horario">
                (${mensagem.time})
            </span> <!-- separar texto -->
            <span class="remetente">
                ${mensagem.from}
            </span>
                ${mensagem.text}
        </p>
    </div>
    `
}

function mensagemNormal(mensagem){
    document.querySelector(".mensagens").innerHTML += `
    <div class="linha para">
            <p>
                <span class="horario">
                    (${mensagem.time})
                </span> <!-- separar texto -->
                <span class="remetente">
                    ${mensagem.from}
                </span>
                    para
                <span class="destinatario">
                    ${mensagem.to}:
                </span>
                    ${mensagem.text}
            </p>
    </div>
    `
}

function adicionarMensagens(response){
    const dadosMensagens = response.data;
    for (let i = 0; dadosMensagens.length > i ;i++){
        if("status" === dadosMensagens[i].type){
            mensagemStatus(dadosMensagens[i]);
        } else if("message" === dadosMensagens[i].type){
            mensagemNormal(dadosMensagens[i]);
        }
    } 
    document.querySelector(".linha:last-child").scrollIntoView()
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