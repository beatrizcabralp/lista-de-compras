//push = é um método que insira/clona objetos e coloca na lista/array
//objeto: conseguimos guardar tudo, até mesmo funções. obs: const (objeto) e let (array)
let listaDeItens = [] //array
let itemAEditar

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage()
{
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens)) //o stringify é um método que pega qualquer dado e transforma para o tipo texto, nesse caso o 'listaDeItens' e envia para o JSON. O JSON é um arquivo que guarda dados do tipo string, ou seja, ele trabalha com o mesmo tipo de dado que o local storageo aceita receber. Após armazenado no json, o setItem pega esses itens e passa para o localStorageo
}

if(listaRecuperada)
{
    listaDeItens = JSON.parse(listaRecuperada) //o método parse faz o oposto do método stringify. Ele pega qualquer elemento e o transforma no tipo javascript
    mostrarItem()
}
else
{
    listaDeItens = []
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault() //o preventDefault impede que o comportamento padrão do navegador aconteça. Ou seja, você o diz para não executar uma ação que normalmente ocorreria. Nesse caso, ao clicar em submit, o navegador enviaria esses dados para uma página específica e a recarregaria e, por consequência, o dado digitado e enviado para o usuário seria perdido. Mas aqui, o preventDefault faz com que esse dado, esse comportamento não aconteça, fazendo que a proxima função seja executada, a salvaritem(), que faz o valor que foi digitado pelo usuário ser adicionado ao array (lista de compra)
    salvarItem()
    mostrarItem()
    itensInput.focus()

})

function salvarItem()
{
    const comprasItem = itensInput.value
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase()) //o some percorre o array

    if(checarDuplicado)
    {
        alert("Item já existe")
    }
    else 
    {
        listaDeItens.push({
            valor: comprasItem,
            checar: false
        })  
    }

    itensInput.value = ''
}

function mostrarItem()
{
    ulItens.innerHTML = ``
    ulItensComprados.innerHTML = ``
    listaDeItens.forEach((elemento, index) => {
        if(elemento.checar)
        {
            ulItensComprados.innerHTML += `
             <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
            `

        }
        else
        {
            ulItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>
        <div>
         ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
        `
        }
        
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]') //selecionando o checkbox pela tag html

    inputsCheck.forEach(i => { 
        i.addEventListener('click', (evento) => {
        const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
        listaDeItens[valorDoElemento].checar = evento.target.checked
        console.log(listaDeItens[valorDoElemento].checar)
        mostrarItem()
        })
    })

    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => { 
        i.addEventListener('click', (evento) => {
        const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
        listaDeItens.splice(valorDoElemento, 1)
        mostrarItem()
        })
    })

    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => { 
        i.addEventListener('click', (evento) => {
        itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
        mostrarItem()
        })
    })

    atualizaLocalStorage()
}



function salvarEdicao()
{
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    //console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value
    itemAEditar = -1
    console.log(listaDeItens)
    mostrarItem()
}

