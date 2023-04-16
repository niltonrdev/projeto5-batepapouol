
axios.defaults.headers.common['Authorization'] = 'mDgeBaCNqC4q3wJycesAXtWG';
const mensagens = [];
let nome;
let idIntervalStatus;
let idIntervalMsg;


    function receberResposta(){
        console.log("recebida com sucesso");
    }
    function deuErro(){
        console.log("não foi recebida");
    }

    function entraNaSala(){
        nome = prompt("Qual é o seu lindo nome? ")

        const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {name:nome});    

        promessa.then( receberResposta );  
        promessa.catch( deuErro ); 

        receberMensagens();

        idIntervalStatus = setInterval(manterConexao, 5000);
        idIntervalMsg = setInterval(receberMensagens, 3000);
       
    }   

    function statusAtualizado(resposta){
        console.log(resposta);
        console.log("status atualizado");
    }
    function erroStatus(erro){
        console.log(erro);
        console.log("erro ao atualizar staus");
    }


    function manterConexao(){
        const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {name:nome});
        promessa.then(statusAtualizado);
        promessa.catch(erroStatus);
    }

    function receberMensagens(){
        const promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
        console.log(promessa);
        promessa.then(renderizarMensagens);

    }
    
    function renderizarMensagens(resposta){
        const listaMensagens = resposta.data;
        const corpoMensagens = document.querySelector('.corpo');
        corpoMensagens.innerHTML = '';
        
        for(let i = 0; i < listaMensagens.length; i++){
            let msg = listaMensagens[i];
            
            let template;

            if (msg.type === 'status'){
                template = `
                <li data-test="message" class="msg-status">
                    <span class="hora">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                    <span>${msg.text}</span>
                </li>`;
            } else if (msg.to === 'Todos'){
            template = `
                <li data-test="message" class="msg">
                <span class="hora">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                    <span>para</span>
                    <strong>${msg.to}</strong>
                    <span>${msg.text}</span>
                </li>`;
            }else {
                template = `
                <li data-test="message" class="msg-reservada">
                    <span class="hora">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                    <span>reservadamente para</span>
                    <strong>${msg.to}</strong>
                    <span>${msg.text}</span>
                </li>`;

            }

            corpoMensagens.innerHTML += template;
        }

    }
    function msgEnviada(resposta){
        console.log("enviada");
    }
    function msgNaoEnviada(erro){
        console.log("msg não enviada");
    }

    function enviarMensagem(){
        const msg = document.querySelector('.texto').value;
        console.log(msg);
        const novaMsg = {
            from: nome,
            to: "Todos",
            text: msg,
            type: "message"
        }
        const promessa = axios.post(`https://mock-api.driven.com.br/api/vm/uol/messages`, novaMsg);
        promessa.then(msgEnviada);
        promessa.catch(msgNaoEnviada);

    }

    function abrirMenu(){
        const menuFundo = document.querySelector('.menu-fundo');
        const menuLateral = document.querySelector('.menu-lateral');
        menuFundo.classList.toggle('escondido');
        menuLateral.classList.toggle('escondido');
    }


    entraNaSala();