const inputTarefa = document.querySelector(".input-tarefa input"),
    filtros = document.querySelectorAll(".filtros span"),
    btnLimpar = document.querySelector(".btn-limpar"),
    caixaTarefas = document.querySelector(".caixa-tarefas");

let idEdicao,
    estaEditandoTarefa = false,
    tarefas = JSON.parse(localStorage.getItem("lista-tarefas"));

filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.ativo").classList.remove("ativo");
        btn.classList.add("ativo");
        mostrarTarefas(btn.id);
    });
});

function mostrarTarefas(filtro) {
    let liTag = "";
    if (tarefas) {
        tarefas.forEach((tarefa, id) => {
            let completada = tarefa.status == "completada" ? "checked" : "";
            if (filtro == tarefa.status || filtro == "todas") {
                liTag += `<li class="tarefa">
                    <label for="${id}">
                        <input onclick="atualizarStatus(this)" type="checkbox" id="${id}" ${completada}>
                        <p class="${completada}">${tarefa.nome}</p>
                    </label>
                    <div class="configuracoes">
                        <i onclick="mostrarMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu-tarefa">
                            <li onclick='editarTarefa(${id}, "${tarefa.nome}")'><i class="uil uil-pen"></i>Editar</li>
                            <li onclick='deletarTarefa(${id}, "${filtro}")'><i class="uil uil-trash"></i>Deletar</li>
                        </ul>
                    </div>
                </li>`;
            }
        });
    }

    caixaTarefas.innerHTML = liTag || `<span>Você não tem nenhuma tarefa aqui</span>`;
    let verificarTarefa = caixaTarefas.querySelectorAll(".tarefa");
    !verificarTarefa.length ? btnLimpar.classList.remove("ativo") : btnLimpar.classList.add("ativo");
    caixaTarefas.offsetHeight >= 300 ? caixaTarefas.classList.add("overflow") : caixaTarefas.classList.remove("overflow");

}
mostrarTarefas("todas");

function mostrarMenu(tarefaSelecionada) {
    let menuDiv = tarefaSelecionada.parentElement.lastElementChild;
    menuDiv.classList.add("mostrar");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != tarefaSelecionada) {
            menuDiv.classList.remove("mostrar");
        }
    });
}

function atualizarStatus(tarefaSelecionada) {
    let nomeTarefa = tarefaSelecionada.parentElement.lastElementChild;
    if (tarefaSelecionada.checked) {
        nomeTarefa.classList.add("checked");
        tarefas[tarefaSelecionada.id].status = "completada";
    } else {
        nomeTarefa.classList.remove("checked");
        tarefas[tarefaSelecionada.id].status = "pendente";
    }
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas))
}

function editarTarefa(idTarefa, nomeTexto) {
    idEdicao = idTarefa;
    estaEditandoTarefa = true;
    inputTarefa.value = nomeTexto;
    inputTarefa.focus();
    inputTarefa.classList.add("ativo");
}

function deletarTarefa(idDeletar, filtro) {
    estaEditandoTarefa = false;
    tarefas.splice(idDeletar, 1);
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
    mostrarTarefas(filtro);
}

btnLimpar.addEventListener("click", () => {
    estaEditandoTarefa = false;
    tarefas.splice(0, tarefas.length);
    localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
    mostrarTarefas();
});

inputTarefa.addEventListener("keyup", e => {
    let tarefaUsuario = inputTarefa.value.trim();
    if (e.key == "Enter" && tarefaUsuario) {
        if (!estaEditandoTarefa) {
            tarefas = !tarefas ? [] : tarefas;
            let infoTarefa = { nome: tarefaUsuario, status: "pendente" };
            tarefas.push(infoTarefa);
        } else {
            estaEditandoTarefa = false;
            tarefas[idEdicao].nome = tarefaUsuario;
        }
        inputTarefa.value = "";
        localStorage.setItem("lista-tarefas", JSON.stringify(tarefas));
        mostrarTarefas(document.querySelector("span.ativo").id);
    }
});
