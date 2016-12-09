$(function(){watchSubmit();});

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
//    var insertDate = "2015-05-15";
    var insertDate = $(this).find('.js-query').val();
    console.log(insertDate);
    console.log(12345);
    
   getDataFromApi(insertDate, displayOMDBSearchData);
  //  $('.js-search-results').html(currentValueInvestment);
  });
}

var BitcoinApi = 'https://www.quandl.com/api/v3/datasets/BAVERAGE/USD.json?';

function getDataFromApi(date, callback) {
  var query = {
    start_date: date,
    end_date: date,
    column_index: 1,
    api_key: 'FBrkWkWwcZzmNY9TwkdC',   
  }
  $.getJSON(BitcoinApi, query, callback);
}

function displayOMDBSearchData(data) {
  var resultElement = '';
  if (data) {
    var oldBitcoinPrice = data.dataset.data[0][1];
    console.log(oldBitcoinPrice);
    moneySubmit(oldBitcoinPrice);
  }
   else {
     resultElement += '<p>No results</p>';
   }
  
   $('.js-search-results').html(resultElement);
}

function moneySubmit(oldBitCoinPrice) {
  $('.js-money-form').submit(function(e) {
    e.preventDefault();
    var userMoneyInvestment = $(this).find('.js-query').val();
    var currentInvestmentValue = (userMoneyInvestment / oldBitCoinPrice) * 772;
    
  });
}

/*
MATH
dollarInvested = 1000;
dateInvested = some date
Takes dateInvested, returned oldBitcoinPrice
numberOfBitcoinsBought = (dollarInvested/oldBitcoinPrice);
currentInvestmentValue = numberOfBitcoinsBought * currentBitcoinPrice;
number of bitcoins bought = 1000 / 242.02 = 4.13
4.13 * $700
 = $2,892
*/