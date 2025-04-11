document.getElementById('currencyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let strategy = document.getElementById('strategy').value;
  let resultText = '';

  switch (strategy) {
      case 'trend':
          resultText = 'Trend Following სტრატეგიისთვის საუკეთესო ვალუტები: USD/JPY, EUR/USD.';
          break;
      case 'breakout':
          resultText = 'Breakout სტრატეგიისთვის საუკეთესო ვალუტები: GBP/USD, USD/CHF.';
          break;
      case 'scalping':
          resultText = 'Scalping სტრატეგიისთვის საუკეთესო ვალუტები: EUR/USD, USD/JPY.';
          break;
      case 'range':
          resultText = 'Range Trading სტრატეგიისთვის საუკეთესო ვალუტები: AUD/USD, NZD/USD.';
          break;
      default:
          resultText = 'გთხოვთ აირჩიოთ სტრატეგია.';
  }

  document.getElementById('currencyResult').innerText = resultText;
});
// RSI ფუნქცია
function calculateRSI(prices, period = 14) {
    let gains = 0;
    let losses = 0;

    // პირველი ნაბიჯი: გაიანგარიშოთ დადასტურებული ცვლილებები
    for (let i = 1; i < period; i++) {
        let change = prices[i] - prices[i - 1];
        if (change > 0) {
            gains += change;
        } else {
            losses -= change;  // უარყოფითი ცვლილებები
        }
    }

    // მეორე ნაბიჯი: განვსაზღვროთ საშუალო მოგება და ზარალი
    let avgGain = gains / period;
    let avgLoss = losses / period;

    // მესამე ნაბიჯი: განვსაზღვროთ RSI
    let rs = avgGain / avgLoss;
    let rsi = 100 - (100 / (1 + rs));

    return rsi;
}
let prices = [1.1, 1.2, 1.3, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4];
let rsi = calculateRSI(prices);
console.log("RSI:", rsi);
function calculateSMA(prices, period) {
    let sma = [];
    for (let i = 0; i <= prices.length - period; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += prices[i + j];
        }
        sma.push(sum / period);
    }
    return sma;
}
let prices = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
let sma = calculateSMA(prices, 3);
console.log("SMA:", sma);

let ema = calculateEMA(prices, 3);
console.log("EMA:", ema);
function calculateMACD(prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    let fastEMA = calculateEMA(prices, fastPeriod);
    let slowEMA = calculateEMA(prices, slowPeriod);

    let macdLine = [];
    for (let i = 0; i < fastEMA.length; i++) {
        macdLine.push(fastEMA[i] - slowEMA[i]);
    }

    let signalLine = calculateEMA(macdLine, signalPeriod);

    let histogram = [];
    for (let i = 0; i < macdLine.length; i++) {
        histogram.push(macdLine[i] - signalLine[i]);
    }

    return { macdLine, signalLine, histogram };
}
let prices = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
let macd = calculateMACD(prices);
console.log("MACD Line:", macd.macdLine);
console.log("Signal Line:", macd.signalLine);
console.log("Histogram:", macd.histogram);
function generateTradeSignal(prices) {
    let rsi = calculateRSI(prices);
    let sma = calculateSMA(prices, 14);
    let ema = calculateEMA(prices, 12);
    let macd = calculateMACD(prices);

    let signal = '';

    // RSI სიგნალი
    if (rsi < 30) {
        signal += 'კრიპტო Oversold: შესაფერისია ყიდვისთვის. ';
    } else if (rsi > 70) {
        signal += 'კრიპტო Overbought: შესაფერისია გაყიდვისთვის. ';
    }

    // MACD სიგნალი
    if (macd.macdLine[macd.macdLine.length - 1] > macd.signalLine[macd.signalLine.length - 1]) {
        signal += 'MACD Cross: ყიდვის სიგნალი. ';
    } else {
        signal += 'MACD Cross: გაყიდვის სიგნალი. ';
    }

    // EMA და SMA სიგნალი
    if (ema[ema.length - 1] > sma[sma.length - 1]) {
        signal += 'EMA არის SMA-ზე მაღლა: ყიდვის სიგნალი.';
    } else {
        signal += 'EMA არის SMA-ზე დაბლა: გაყიდვის სიგნალი.';
    }

    return signal;
}
function executeTrade(prices) {
    let tradeSignal = generateTradeSignal(prices);

    if (tradeSignal.includes('ყიდვის სიგნალი')) {
        console.log('ყიდვა ხდება: ვალუტა ახლა ყიდვისთვის შესაბამისია!');
    } else if (tradeSignal.includes('გაყიდვის სიგნალი')) {
        console.log('გაყიდვა ხდება: ვალუტა ახლა გაყიდვისთვის შესაბამისია!');
    } else {
        console.log('ბაზარი სტაბილურია, არ არის აუცილებელი მოქმედება!');
    }
}
