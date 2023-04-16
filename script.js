
axios.defaults.headers.common['Authorization'] = 'mDgeBaCNqC4q3wJycesAXtWG';

function abrirMenu(){
    const menuFundo = document.querySelector('.menu-fundo');
    const menuLateral = document.querySelector('.menu-lateral');
    menuFundo.classList.toggle('escondido');
    menuLateral.classList.toggle('escondido');
}

const mensagens = [];

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

    function receberMensagens(){
        const promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
        console.log(promessa);

        renderizarMensagens();

    }
    
    function renderizarMensagens(){
        let divMensagens = document.querySelector('.corpo');
        divMensagens = '';

        for( let i = 0; i < mensagens.length; i++){
            let msg = mensagens[i];
        console.log(divMensagens);

        divMensagens.innerHTML += 
              ` <div class="msg">
                ${msg.from}
                ${msg.text}
                ${msg.time}
                ${msg.to}
                ${msg.type}
                </div>
              `
        }
        console.log(divMensagens);
    }