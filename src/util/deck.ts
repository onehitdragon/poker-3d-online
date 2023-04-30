function randomCard(amount: number, existed: number[]){
    let result: number;
    do{
        result = parseInt(Math.random() * 10000 + "") % amount;
    }
    while(existed.find(e => e === result));

    return result;
}

export { randomCard }
