// O Firebase vigia a tela de login/registro
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //Se o usuário JÁ TIVER um crachá (estiver logado)...
        //Chuta ele direto para a área interna do sistema!
        window.location.href = "cadastro.html";
    }
});

document.getElementById('formLogin').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    try {
        console.log("⏳ Verificando credenciais...");
        
        //Tenta fazer o login no Firebase
        const credencial = await firebase.auth().signInWithEmailAndPassword(email, senha);
        
        const nomeUsuario = credencial.user.displayName || "Funcionário";
        alert(`Bem-vindo de volta, ${nomeUsuario}!`);
        
        //Redireciona para a página principal da sua aplicação (Cadastro/Listagem)
        window.location.href = "cadastro.html";

    } catch (error) {
        console.error("Erro no login: ", error);
        
        //Tratamento de erros para feedback visual
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            alert("E-mail ou senha incorretos.");
        } else {
            alert("Erro ao fazer login. Verifique seus dados.");
        }
    }
});