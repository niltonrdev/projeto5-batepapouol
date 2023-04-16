
axios.defaults.headers.common['Authorization'] = 'mDgeBaCNqC4q3wJycesAXtWG';

function abrirMenu(){
    const menuFundo = document.querySelector('.menu-fundo');
    const menuLateral = document.querySelector('.menu-lateral');
    menuFundo.classList.toggle('escondido');
    menuLateral.classList.toggle('escondido');
}

const mensagens = [];
/*
    function entraNaSala(){
        let nome = {
            name: "João"
        }

        const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nome);    

        promessa.then( receberResposta );  
        promessa.catch( deuErro ); 
        console.log('receita foi enviada ao servidor');   
        
        receberMensagens();
    }   

    function receberResposta(){
        console.log("recebida com sucesso");
    }
    function deuErro(){
        console.log("não foi recebida");
    }
*/
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

    receberMensagens();