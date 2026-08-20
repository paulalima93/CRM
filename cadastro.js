let nome;
const nomeInput = document.getElementById('nome')


// 1. Lendo a URL para ver se existe um ID de edição
const urlParams = new URLSearchParams(window.location.search);
const idEdicao = urlParams.get('id'); // Pega o valor que vier depois do ?id=

// 2. Se tiver um ID na URL, estamos no modo EDIÇÃO
if (idEdicao) {
    carregarDadosParaEdicao(idEdicao);
}

// 3. Função que busca os dados no banco e preenche a tela
async function carregarDadosParaEdicao(id) {
    try {
        const doc = await db.collection("clientes").doc(id).get();
        
        if (doc.exists) {
            const cliente = doc.data();
            
            // Preenche os campos sozinhos!
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('email').value = cliente.email;
            document.getElementById('telefone').value = cliente.telefone;
            document.getElementById('cep').value = cliente.cep;
            document.getElementById('rua').value = cliente.rua;
            document.getElementById('numero').value = cliente.numero;
            document.getElementById('bairro').value = cliente.bairro;
            document.getElementById('cidade').value = cliente.cidade;
            document.getElementById('estado').value = cliente.estado;

            // Bônus de UX: Muda o texto do botão para fazer sentido
            document.querySelector('#userForm button').innerText = "Atualizar Cadastro";
        }
    } catch (error) {
        console.error("Erro ao buscar cliente para edição: ", error);
    }
}

//--------------------------

document.getElementById('cep').addEventListener('blur', async function () {
    const cep = this.value;

    if (cep.length === 8 || cep.length === 9) {
        try {
            const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
            const data = await response.json();

            if (data.address === undefined) {
                alert("CEP não encontrado, digite novamente");
            } else {
                document.getElementById('rua').value = data.address;
                document.getElementById('bairro').value = data.district;
                document.getElementById('cidade').value = data.city;
                document.getElementById('estado').value = data.state;
            }
        } catch (error) {
            console.log(error.message);
            limparCamposCEP();
            alert("Erro ao buscar o CEP, tente novamente");
        }
    } else {
        alert("CEP Inválido. Prencha com 8 dígitos.");
    }
})

// Função para salvar dados no Firebase ao enviar o formulário
document.getElementById('userForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        alert("Por favor, insira um endereço de e-mail válido! Ex: nome@dominio.com");
        return;
    }

    const cliente = {
        nome: nome,
        email: email,
        telefone: telefone,
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
    }

    try {
        if (idEdicao) {
            // MODO EDIÇÃO: Atualiza o documento existente
            console.log("⏳ Atualizando dados no banco...");
            await db.collection("clientes").doc(idEdicao).update(cliente);
            
            alert(`Sucesso! Os dados de ${cliente.nome} foram atualizados!`);
            window.location.href = 'listagem.html'; // Devolve o usuário para a lista
            
        } else {
            // MODO CRIAÇÃO: Adiciona um novo documento (Como já era antes)
            console.log("⏳ Enviando dados para o banco...");
            const docRef = await db.collection("clientes").add(cliente);
            
            alert(`Seja bem vindo(a), ${cliente.nome}! Seus dados foram salvos!`);
            document.getElementById('userForm').reset(); 
            limparCampos();
        }
    } catch (error) {
        console.error("❌ Erro ao salvar/atualizar no Firebase: ", error);
        alert("Ocorreu um erro. Verifique sua internet.");
    }
});

function limparCamposCEP() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

function limparCampos(){
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('cep').value = "";
    document.getElementById('numero').value = "";
}

//mascara de telefone
document.getElementById('telefone').addEventListener('input', function(event){
    let textoDigitado = event.target.value;

    let numeros = textoDigitado.replace(/\D/g, '');

    if(numeros.length > 11){
        numeros = numeros.substring(0, 11);
    }

    let numeroFormatado = '';

    if(numeros.length > 0) {
        numeroFormatado = '(' + numeros.substring(0, 2)
    }

    if(numeros.length>2) {
        numeroFormatado += ') ' + numeros.substring(2, 7) 
    }

    if(numeros.length>7) {
        numeroFormatado += '-' + numeros.substring(7, 11) 
    }

    event.target.value = numeroFormatado;
})

