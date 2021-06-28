it("sem testes, ainda", () => { })

//Versao antiga que usa callbacks e nao promisses
/*
const getSomething = callback => {
    setTimeout(() => {
        callback(12);
    }, 1000);
}*/

//Versao moderna com promisses
const getSomething = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000);
    })
}

const system = () => {
    console.log("Init...");
    //Guarda a promisse
    const promisse = getSomething();
    //Quando a promisse chegar THEN executa esse codigo...
    promisse.then(some => {
        console.log(`Something is ${some}`)
    })
    console.log("...End");
}

// chamar o system...
system();