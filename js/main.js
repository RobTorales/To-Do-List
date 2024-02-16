    const fecha = document.querySelector('#fecha');
    const input = document.querySelector('#input')
    const lista = document.querySelector('#lista');
    const botonEnter = document.querySelector('#enter');
    const check = 'bi-check-circle';
    const uncheck = 'bi-circle';
    const lineThrough = 'line-through'
    let id 
    let LIST 


    const FECHA = new Date()
    fecha.innerHTML = FECHA.toLocaleDateString('ex-MX', {weekday: 'long', month:'short', day:'numeric'})


    function agregarTarea(tarea, id, realizado, eliminado) {

        if(eliminado){
            return
        }

        const REALIZADO = realizado ?check :uncheck

        const LINE = realizado ? lineThrough : ''

        const elemento = `<li id="elemento" class="bg-primary">
                            <i class="${REALIZADO}" data="realizado" id="${id}"></i>
                            <p class="text ${LINE}">${tarea}</p>
                            <i class="bi bi-trash-fill" data="eliminado" id="${id}"></i>
                          </li>`;
        lista.insertAdjacentHTML("beforeend", elemento);
    }

    function tareaRealizada (element){
        element.classList.toggle(check)
        element.classList.toggle(uncheck)
        element.parentNode.querySelector('.text').classList.toggle(lineThrough)
        LIST[element.id].realizado = LIST[element.id].realizado ? false : true
    }

    function tareaEliminada (element){
        element.parentNode.parentNode.removeChild(element.parentNode)
        LIST[element.id].eliminado = true
    }


    botonEnter.addEventListener('click', () => {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea,id,false,false);
            LIST.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = '';
        id++
    });

    document.addEventListener('keyup', function (event){
        if(event.key == "Enter"){
            const tarea = input.value
            if(tarea){
                agregarTarea(tarea,id,false,false)
                LIST.push({
                    nombre: tarea,
                    id:id,
                    realizado:false,
                    eliminado:false
                })
            }
            localStorage.setItem('TODO', JSON.stringify(LIST))
            input.value=''
            id++
        }
    })

    lista.addEventListener('click', function(event){
        const element = event.target
        const elementData = element.attributes.data.value
        if(elementData === 'realizado'){
            tareaRealizada(element)
        }else if (elementData === 'eliminado'){
            tareaEliminada(element)
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
    })

    let data = localStorage.getItem('TODO')
    if(data){
        LIST = JSON.parse(data)
        id = LIST.length
        cargarLista(LIST)
    } else {
        LIST = []
        id = 0
    }

    function cargarLista(DATA){
            DATA.forEach(function(i){
                agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
        })
    }