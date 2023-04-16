
axios.defaults.headers.common['Authorization'] = 'mDgeBaCNqC4q3wJycesAXtWG';
const mensagens = [];
let nome;
let idIntervalStatus;

    function abrirMenu(){
        const menuFundo = document.querySelector('.menu-fundo');
        const menuLateral = document.querySelector('.menu-lateral');
        menuFundo.classList.toggle('escondido');
        menuLateral.classList.toggle('escondido');
    }

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
                <li class="msg-status">
                    <span class="hora">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                    <span>${msg.text}</span>
                </li>`;
            } else if (msg.to === 'Todos'){
            template = `
                <li class="msg">
                <span class="hora">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                    <span>para</span>
                    <strong>${msg.to}</strong>
                    <span>${msg.text}</span>
                </li>`;
            }else {
                template = `
                <li class="msg-reservada">
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
    entraNaSala();