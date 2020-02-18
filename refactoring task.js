//invoice.json
let invoice = {
    "customer": "MDT",
    "performance": [{
            "playId": "Гамлет",
            "audience": 55,
            "type": "tragedy"
        },
        {
            "playId": "Ромео и Джульетта",
            "audience": 35,
            "type": "tragedy"
        },
        {
            "playId": "Отелло",
            "audience": 40,
            "type": "comedy"
        }
    ]
}

//plays.json
let plays = {
    "Гамлет": {
        "name": "Гамлет",
        "type": "tragedy"
    },
    "Ромео и Джульетта": {
        "name": "Ромео и Джульетта",
        "type": "tragedy"
    },
    "Отелло": {
        "name": "Отелло",
        "type": "comedy"
    }
}


 
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;

    for (let onePerformance of invoice.performance) {

        volumeCredits += bonus(onePerformance, onePlay(onePerformance))
        // Вывод строки счета
        result += ` ${onePlay(onePerformance).name}: ${toRUB(countThisAmount(onePerformance, onePlay(onePerformance)))} (${onePerformance.audience} мест)\n`;

        totalAmount += countThisAmount(onePerformance, onePlay(onePerformance));
    }

    result += `Итого с вас ${toRUB(totalAmount)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
   // console.log(result);
    return result;
};


function onePlay(onePerformance) {
    return plays[onePerformance.playId];
}

function countThisAmount(onePerformance, play) {
    let result = 0;
    switch (play.type) {
        case "tragedy":
            result = 40000;
            if (onePerformance.audience > 30) {
                result += 1000 * (onePerformance.audience - 30);
            }
            break;

        case "comedy":
            result = 30000;
            if (onePerformance.audience > 20) {
                result += 10000 + 500 * (onePerformance.audience - 20);
            }
            result += 300 * onePerformance.audience;
            break;

        default:
            throw new Error(`неизвестный тип: ${play.type}`);
    }
    return result;
}


function toRUB(amount) {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2
    }).format(amount / 100);
}


// Добавление бонусов
function bonus(onePerformance, play) {
    let result = 0;

    result += Math.max(onePerformance.audience - 30, 0);
    // Дополнительный бонус за каждые 10 комедий
    ("comedy" === play.type) ?
    result += Math.floor(onePerformance.audience / 5): result
    return result;
}

 
statement(invoice, plays);