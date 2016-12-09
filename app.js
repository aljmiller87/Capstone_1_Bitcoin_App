$(function(){watchSubmit();});

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
//    var insertDate = "2015-05-15";
    var insertDate = $(this).find('.js-query').val();
    console.log(insertDate);    
    $('.container').delay(0).fadeOut(300);
    $('.container').delay(100).fadeIn(300);
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
  $('.js-money-form').submit(function(e) {
    e.preventDefault();
    var userMoneyInvestment = $(this).find('.js-query-money').val();
    var currentInvestmentValue = (userMoneyInvestment / oldprice) * 772;
    var result = Math.floor(currentInvestmentValue);
    $('.container').delay(0).fadeOut(200);
//    $('.js-results').toggleClass('hidden');
    $('.container').delay(100).fadeIn(300);
    $('.js-money-form').remove();
    $('.js-results').delay(500).html('<h3>Your investment would be worth </h3><strong>$' + result + '</strong><h3> today.</h3>');
    $('.js-results').delay(500).append('<h3>How does that make you feel?</h3>');
//    $('.js-results').toggleClass('hidden');

    createRestartButton();
  });
}

/*
OTHER ISSUES:
-How to make sure inputs have correct format. Throw error for wrong format

*/

//CSS stuff-----------------------------------------------------------------


$("#welcome").click(function() {
     $("#hi").animate({width:'toggle'},700);
//    $('#welcome').delay(100).fadeOut(2800)
});


$('.js-results').on('click', 'button', function(event) {
    location.reload();
});

function createRestartButton () {
    $('.js-results').append('<button class="button2" type="submit">Try Again</button>')
}
   

