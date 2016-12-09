$(function(){watchSubmit();});

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
//    var insertDate = "2015-05-15";
    var insertDate = $(this).find('.js-query').val();
    console.log(insertDate);    
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

function moneySubmit(oldprice) {
  $('.js-search-form').remove();
  $('.js-money-form').toggleClass('hidden');
  // why is this not hidden?
  $('.js-money-form').submit(function(e) {
    e.preventDefault();
    var userMoneyInvestment = $(this).find('.js-query-money').val();
    // need to make userMoneyInvestment a number
    var currentInvestmentValue = (userMoneyInvestment / oldprice) * 772;
    var result = Math.floor(currentInvestmentValue);
    $('.js-results').html('<p>Your investment would be worth $' + result + ' today.</p>');
    $('.js-results').append('<p>How does that make you feel?</p>');
  });
}

/*
OTHER ISSUES:
-How to make sure inputs have correct format. Throw error for wrong format

*/