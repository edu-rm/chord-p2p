
const ativos = [0, 6, 13, 4]

const arquivos = ['anotacao.txt', 'mus1.mp3', 'relatorio.pdf', 'index.js', 'outro.jpg', 'retrato.png', 'trabalho.docx', 'gtasa.exe', 'abc.txt', 'ade.txt', 'afg.txt', '1.txt'];

const inicio = {
    responsabilidade: null,
    prox: null,
    anterior: null,
    id: 0,
    ativo: ativos.includes(0),
    arquivos: []
}
const fim = {
    responsabilidade: null,
    prox: null,
    anterior: null,
    id: 16,
    ativo: ativos.includes(16),
    arquivos: []
}

inicio.anterior = fim;
fim.prox = inicio;


const quantidade = 16
function gerarListaCircular() {
    let pos = 0;

    let atual = inicio;
    for(;;) {
        if (pos > 16) break;
        if (pos === 0) {
            atual.prox = {
                responsabilidade: null,
                prox: null,
                anterior: inicio,
                id: pos+1,
                ativo: ativos.includes(pos+1),
                arquivos: []
            }
        }


        if (pos !== 16 && pos !== 0) {
            if (pos === 15) {
                atual.prox = fim;
                fim.anterior = atual
            } else {

                atual.prox = {
                    responsabilidade: null,
                    prox: null,
                    anterior: atual,
                    id: pos+1,
                    ativo: ativos.includes(pos+1),
                    arquivos: []
                }
            }
        }

        atual = atual.prox;

        pos++;
    }
}

function printarLista () {
    let pos = 0;

    let atual = inicio;
    for(;;) {
        if (pos > 16) break;
        // if (pos === 16) {
        //     console.log(atual)
        // }
        console.log('\nAnterior: ', atual.anterior.id)
        console.log('Node: ', atual.id)
        console.log('Prox: ', atual.prox.id)
        console.log('Ativo: ', atual.ativo)
        if (atual.ativo) {
            console.log('ARQUIVOS NODOS FILHOS', atual.listaNodosFilhos)
        }
        console.log('Arquivos: ', atual.arquivos)
        
        console.log('Responsabilidade: ', atual.responsabilidade)

        pos++;
        atual = atual.prox;
    }
}


function setResponsabilidade () {
    let pos = 0;

    let atual = inicio;
    for(;;) {
        if (pos > 16) break;
        
        if (atual.ativo) {
            let auxAtivo = atual;

            const hash = new Map();
            do  {
                for (const arquivo of auxAtivo.arquivos) {
                    hash.set(arquivo, auxAtivo.id)
                }
                auxAtivo = auxAtivo.anterior;
                if (auxAtivo.ativo) {
                    atual.responsabilidade = auxAtivo.id;
                    atual.listaNodosFilhos = hash;
                }
            } while (!auxAtivo.ativo)

        }
    
        pos++;
        atual = atual.prox;
    }

}

function hashFunction (string) {
    return (string.charCodeAt(0) + string.charCodeAt(1) + string.charCodeAt(2)) % 16;
}

function inserirArquivo(nodo, arquivo) {
    let atual = inicio;

    for(;;) {
       if (atual.id === nodo) {
           atual.arquivos.push(arquivo);
           break;
       }
       atual = atual.prox;
    }
}

function distribuirArquivos() {
    for (const arquivo of arquivos) {
        const lugarParaColcarArq = hashFunction(arquivo);
        inserirArquivo(lugarParaColcarArq, arquivo)
    }
}

function addAtivo (nodoParaAtivar) {
    let atual = inicio;

    for(;;) {
       if (atual.id === nodoParaAtivar) {
           if(atual.ativo) {
               return console.log('O nodo ', nodoParaAtivar, ' j?? est?? ativo');
           } else {
                atual.ativo = true;
                setResponsabilidade();
           }

           break;
       }
       atual = atual.prox;
    }
}

function removeAtivo (nodoParaDesativar) {
    let atual = inicio;

    for(;;) {
       if (atual.id === nodoParaDesativar) {
           if(!atual.ativo) {
               return console.log('O nodo ', nodoParaAtivar, ' j?? est?? n??o ativo');
           } else {
                atual.ativo = false;
                atual.responsabilidade = null;
                setResponsabilidade();
           }

           break;
       }
       atual = atual.prox;
    }
}


function responsavelPeloNodo(emQualNodoEleEsta) {
    let atual = inicio;

    for(;;) {

        if (typeof atual.responsabilidade === 'number') {
            let responsabilidades = [];

            let aux = atual;
            const responsavelAte = aux.responsabilidade;
            
            let achou = false;
            do {
                if (responsavelAte === aux.id) {
                    achou = true;
                } else {
                    responsabilidades.push(aux.id);
                    aux = aux.anterior;
                }
            } while(!achou)

            if (responsabilidades.includes(emQualNodoEleEsta)) {
                return atual.id;
            }
        }

        atual = atual.prox;
    }
}

function getFile (nomeArquivo) {

    let atual = inicio;
    let count = 0;
    let encontrado = false;
    for(;;) {
        if (count>16) break;
        if (atual.ativo) {
            let aux = atual;
            const estaNesseNodo = atual.listaNodosFilhos.get(nomeArquivo);
            if (estaNesseNodo) {
                return console.log('Arquivo', nomeArquivo, 'encontrado no nodo', estaNesseNodo, ' atrav??s do nodo ativo', aux.id )
            }
        }

        atual = atual.prox;
        count ++;
    }

    if (!encontrado) {
        return console.log('Arquivo', nomeArquivo, 'n??o encontrado')
    }

}

function pesquisarArquivo (nomeArquivo) {
    // const emQualNodoEleEsta = hashFunction(nomeArquivo);
    // const nodoResponsavel = responsavelPeloNodo(emQualNodoEleEsta);

    const arquivo = getFile(nomeArquivo); 
    return arquivo ? console.log('Arquivo encontrado', arquivo): null;
}

function inicializar () {
    gerarListaCircular();
    setResponsabilidade();
    distribuirArquivos();
}

inicializar();
printarLista();

addAtivo(7)
addAtivo(10)
addAtivo(11)

console.log('\n\n\n')
pesquisarArquivo('gtasa.exe')
pesquisarArquivo('afg.txt')
pesquisarArquivo('abc.txt')
pesquisarArquivo('fdsfsdf.txt')


// printarLista();


