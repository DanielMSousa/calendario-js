const anoBissexto = ano => (ano[2] == 0 && ano[3] == 0) || (Number(`${ano[2]}${ano[3]}`)%4 == 0);

const diasFevereiro = ano => anoBissexto(ano) ? 29 : 28

//Datas e valores importantes
const data = new Date();
const anoAtual = data.getFullYear();
const mesAtual = data.getMonth();
const diaAtual = data.getDate();

const meses = [
    {nome: "Janeiro", dias: 31},
    {nome: "Fevereiro", dias: diasFevereiro(`${anoAtual}`)},
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

const mudaMes = n => {
    sessaoDias.innerHTML = '';
    const anoMostrado = ano.innerText;
    console.log(anoMostrado);
    if(mes.innerText == 'Dezembro' && n == 1)
        desenharCalendario(0, Number(anoMostrado)+1); 
    else if(mes.innerText == 'Janeiro' && n == -1)
        desenharCalendario(11, Number(anoMostrado)-1);
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

const desenharCalendario = (m, a) => {
    mes.innerText = meses[m].nome;
    ano.innerText = a;
    const divDias = dias[m].map(e =>
        criarDia(e, m, a)
    );
    const mesCompleto = completarAnterior(divDias, m, a);
    mesCompleto.forEach(e => sessaoDias.appendChild(e));
}


desenharCalendario(mesAtual, anoAtual);