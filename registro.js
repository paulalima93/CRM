// O Firebase vigia a tela de login/registro
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Se o usuário JÁ TIVER um crachá (estiver logado)...
        // Chuta ele direto para a área interna do sistema!
        window.location.href = "cadastro.html";
    }
});

document.getElementById('formRegistro').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    //Validação extra do Front-End
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        console.log("⏳ Criando conta no Firebase...");
        
        // 1. Cria o usuário com E-mail e Senha
        const credencial = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        
        // 2. Atualiza o perfil do usuário recém-criado para incluir o Nome
        await credencial.user.updateProfile({
            displayName: nome
        });

        alert(`Sucesso! Funcionário ${nome} cadastrado.`);
        
        // Redireciona para o login ou direto para o painel principal
        window.location.href = "index.html";

    } catch (error) {
        console.error("Erro ao registrar: ", error);
        
        // Tratamento de erros comuns do Firebase para o usuário
        if (error.code === 'auth/email-already-in-use') {
            alert("Este e-mail já está cadastrado!");
        } else if (error.code === 'auth/weak-password') {
            alert("A senha é muito fraca. Use pelo menos 6 caracteres.");
        } else {
            alert("Erro ao criar conta. Tente novamente.");
        }
    }
});