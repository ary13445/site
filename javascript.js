let count=1;
document.getElementById('radio1').checked= true;

setInterval( function (){
    nextImage();
},2000)

function nextImage(){
    count++;
    if (count>4){
        count=1;
    }

    document.getElementById('radio'+count).checked= true;

}

let show = true;

const burg = document.querySelector(".burg")
const menuu = document.querySelector("bx-menu")




burg.addEventListener("click", (e) => {
e.preventDefault()
    document.body.style.overflow = show ? "hidden" : "initial"
    
    
    burg.classList.toggle("on", show)
    show = ! show;
    
})

let modalKey = 0

let quantPizzas = 1

let cart = [] 
// carrinho
// /aula 05

/*const catton = document.querySelector('.carttt')
const cartt= document.querySelector('.cart')



   catton.addEventListener('click', ()=>{

    
    cartt.classList.add('on',)
    


    show = ! show;
   })
*/
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
// do .pizza-item ele vai pegar o valor do atributo data-key
let key = e.target.closest('.padaria').getAttribute('data-key')
console.log('Pizza clicada ' + key)
console.log(produtosss[key])
 
// garantir que a quantidade inicial de pizzas é 1
quantPizzas = 1

// Para manter a informação de qual pizza foi clicada
modalKey = key

return key
}
const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    document.querySelector('.mais').addEventListener('click', () => {
        quantPizzas++
        document.querySelector('.quantidade').innerHTML = quantPizzas
    })

    document.querySelector('.menos').addEventListener('click', () => {
        if(quantPizzas > 1) {
            quantPizzas--
            document.querySelector('.quantidade').innerHTML = quantPizzas	
        }
    })
}
const preencheDadosDasPizzas = (produtoitem, item, index )=>{
   
    //preeencherdados
    produtoitem.setAttribute('data-key', index)
    produtoitem.querySelector('.produto img').src = item.img
    produtoitem.querySelector ('.valor ').innerHTML = item.price
    produtoitem.querySelector('.descrisao').innerHTML = item.name
    produtoitem.querySelector('.button').innerHTML = "adicione ao <br>carrinho"

}

/*const preencheDadosModal = (item) => {
    document.querySelector('.cart-item img').src = item.img
    document.querySelector('.name').innerHTML = item.name
    //document.querySelector('.pizzaInfo--desc').innerHTML = item.description
   document.querySelector('valor').innerHTML = item.price[2]
}*/
const adicionarNoCarrinho = () => {
    document.querySelector('.button').addEventListener('click', () => {
        console.log('Adicionar no carrinho')


        // pegar dados da janela modal atual
    	// qual pizza? pegue o modalKey para usar pizzaJson[modalKey]
    	console.log("Pizza " + modalKey)
    	// tamanho
	    let size = document.querySelector('.button').getAttribute('data-key')
	    //console.log("Tamanho " + size )
	    // quantidade
    	console.log("Quant. " + quantPizzas)
        // preco
        let price = document.querySelector('.valor').innerHTML.replace('R$&nbsp;', '')
    
        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = produtosss[modalKey].id+'t'+size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantPizzas
        } else {
            // adicionar objeto pizza no carrinho
            let pizza = {
                identificador,
                id: produtosss[modalKey].id,
                 size: size,
                qt: quantPizzas,
                price: parseFloat(price) // price: price
            }
            cart.push(pizza)
            console.log(pizza)
            console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))





        }

        //fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}
const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	   document.querySelector('.cart').classList.add('on')
       document.querySelector('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    document.querySelector('.cartt').addEventListener('click', () => {
        if(cart.length > 0) {
            document.querySelector('.cart').classList.add('on')
            document.querySelector('.cart').style.left = '0'
        }
    })
}

/*const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    document.querySelector('.cartt').addEventListener('click', () => {
        document.querySelector('.cart').style.left = '100vw' // usando 100vw ele ficara fora da tela
        document.querySelector('header').style.display = 'flex'
        
         // usando 100vw ele ficara fora da tela
        //document.querySelector('header').style.display = 'flex'
    })
  
}*/
const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	document.querySelector('.cart ').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		document.querySelector('.cart').classList.add('on')

		// zerar meu .cart para nao fazer insercoes duplicadas
		document.querySelector('.carttt').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoitem = produtosss.find( (item) => item.id == cart[i].id )
			console.log(produtoitem)

            // em cada item pegar o subtotal
        	 cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = document.querySelector('.cart-item').cloneNode(true)
			document.querySelector('.carttt').append(cartItem)

			let pizzaSizeName = cart[i].size

			let pizzaName = `${produtoitem.name} (${pizzaSizeName})`

			// preencher as informacoes
			cartItem.querySelector('.cart-item img').src = produtoitem.img
			cartItem.querySelector('.naame').innerHTML = pizzaName
			cartItem.querySelector('.quantidade').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.mais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.menos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			document.querySelector('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
        document.querySelector('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        document.querySelector('.desconto span:last-child').innerHTML = formatoReal(desconto)
        document.querySelector('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
        document.querySelector('.cart').classList.remove('on')
        //document.querySelector('.cart').style.left = '100vw'
	}
}

/*const finalizarCompra = () => {
    document.querySelector('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        document.querySelector('aside').classList.remove('show')
        document.querySelector('aside').style.left = '100vw'
        document.querySelector('header').style.display = 'flex'
    })
}*/

// /aula 06

// MAPEAR pizzaJson para gerar lista de pizzas
produtosss.map((item, index,  ) => {
    console.log(item)
    let produtoitem = document.querySelector('.padaria').cloneNode(true)
    console.log(produtoitem)
    //document.querySelector('.cart').append(produtoitem)
    document.querySelector('.produtos-mer').append(produtoitem)

    // preencher os dados de cada pizza
    preencheDadosDasPizzas(produtoitem, item, index)
    
    // pizza clicada
    produtoitem.querySelector('.button').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na pizza')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05

        // abrir janela modal
        adicionarNoCarrinho()

    

        // aula 05
        // pegar tamanho selecionado
        //preencherTamanhos(chave)

		// definir quantidade inicial como 1
		document.querySelector('.button').innerHTML = quantPizzas

        // selecionar o tamanho e preco com o clique no botao
     //   escolherTamanhoPreco(chave)
        // /aula 05
        
    })
  
    //botoesFechar()

}) // fim do MAPEAR pizzaJson para gerar lista de pizzas

// aula 05
// mudar quantidade com os botoes + e -
     mudarQuantidade()
// /aula 05

// aula 06

adicionarNoCarrinho()
atualizarCarrinho()
//fecharCarrinho()
//finalizarCompra()
// /aula 06