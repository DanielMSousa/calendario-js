const anoBissexto = ano => 
    ano % 4 == 0 ? 29 : 28

//Datas e valores importantes
const data = new Date();
const anoAtual = data.getFullYear();
const mesAtual = data.getMonth();
const diaAtual = data.getDate();

const meses = [
    {nome: "Janeiro", dias: 31},
    {nome: "Fevereiro", dias: anoBissexto(anoAtual)},
    {nome: "Março", dias: 31},
    {nome: "Abril", dias: 30},
    {nome: "Maio", dias: 31},
    {nome: "Junho", dias: 30},
    {nome: "Julho", dias: 31},
    {nome: "Agosto", dias: 31},
    {nome: "Setembro", dias: 30},
    {nome: "Outubro", dias: 31},
    {nome: "Novembro", dias: 30},
    {nome: "Dezembro", dias: 31},
]

//elementos HTML
const sessaoDias = document.querySelector('.dias');
const mes = document.querySelector('.mes');
const ano = document.querySelector('.ano');
const spans = document.querySelectorAll('.meses > span');

const dias = meses.map(e => {
    const array = new Array(e.dias);
    for(let i = 1; e.dias >= i; i++) array[i-1] = i;
    return array;
});

const mudaAno = (m, n, a) => {
    const diasFevereiro = anoBissexto(Number(a)+n);
    const ArrayDias2 = [];
    for(let i = 1; i <= diasFevereiro; i++) ArrayDias2.push(i);
    dias[1] = ArrayDias2;
    desenharCalendario(m, Number(a)+n);
}

const mudaMes = n => {
    sessaoDias.innerHTML = '';
    const anoMostrado = ano.innerText;
    if(mes.innerText == 'Dezembro' && n == 1){
        mudaAno(0, n, anoMostrado);
    } 
    else if(mes.innerText == 'Janeiro' && n == -1)
        mudaAno(11, n, anoMostrado);
    else{
        const mesMostrado = meses.findIndex(e => e.nome == mes.innerText);
        desenharCalendario(mesMostrado + n, anoMostrado);
    }
}

spans[0].addEventListener('click', () => mudaMes(-1));
spans[1].addEventListener('click', () => mudaMes(1));

const criarDia = (d, m, ano, a=true) => {
    const dia = document.createElement('div');
    dia.className = "dia";
    if(d == diaAtual && m == mesAtual &&
        ano == anoAtual) dia.classList.add("hoje");
    if(!a) dia.classList.add("mesAnterior");
    if(new Date(`${m+1}/${d}/${ano}`).getDay() == 0) dia.classList.add('domingo');
    const texto = document.createTextNode(d);
    dia.appendChild(texto);
    return dia;
}

const completarAnterior = (list, m, a) => {
    const mesPassado = m == 0 ? dias[11] : dias[m-1];
    const dia1 = new Date(`${m+1}/${1}/${a}`).getDay();
    const ultimos = mesPassado.slice(-dia1);

    if(dia1 != 0){
        for(let j = ultimos.length-1; j >= 0; j--){
            list.unshift(criarDia(mesPassado[ultimos[j]-1], m-1, a, false));
        }
    }
    return list;
}

const completarProximo = (list, m, a) => {
    const ultimoDia = new Date(`${m+1}/${dias[m].length}/${a}`).getDay();

    if(ultimoDia != 6){
        if(m == 11){
            for(let i = 1; i <= 6 - ultimoDia; i++) list.push(criarDia(i, m, a+1, false));
        } else{
            for(let i = 1; i <= 6 - ultimoDia; i++) list.push(criarDia(i, m, a, false));
        }
    }

    return list;
}

const completarMes = (list, m, a) => {
    const mesAnterior = completarAnterior(list, m, a);
    const mesInteiro = completarProximo(mesAnterior, m, a);
    return mesInteiro;
}

const desenharCalendario = (m, a) => {
    mes.innerText = meses[m].nome;
    ano.innerText = a;
    const divDias = dias[m].map(e =>
        criarDia(e, m, a)
    );
    const mesCompleto = completarMes(divDias, m, a);
    mesCompleto.forEach(e => sessaoDias.appendChild(e));
}


desenharCalendario(mesAtual, anoAtual);