// State
let state = {
  currentPrice: 0,
  oldPrice: 0
}

// State modification functions
function setCurrentPrice(data) {
  let price = data.bpi.USD.rate;
  price = parseFloat(price.replace(/[^\d\.\-]/g, ""));
  state.currentPrice = price;
  moneySubmit();
}


function setHistoricalPrice(data) {
  var resultElement = '';
  if (data) {
    state.oldPrice = data.bpi[Object.keys(data.bpi)];
    getNewPrice(setCurrentPrice);
    
  }
   else {
     resultElement += '<p>No results</p>';
   }
  
   $('.js-search-results').html(resultElement);
}
// Render functions
function moneySubmit() {
  $('.js-search-form').remove();
  $('.js-money-form').toggleClass('hidden');
  $('.js-money-form').submit(function(e) {
    e.preventDefault();
    var userMoneyInvestment = $(this).find('.js-query-money').val();
    getNewPrice(setCurrentPrice);
    var currentInvestmentValue = (userMoneyInvestment / state.oldPrice) * state.currentPrice;
    var dollars = Math.floor(currentInvestmentValue);
    $('.container').delay(0).fadeOut(200);
    $('.container').delay(100).fadeIn(300);
    $('.js-money-form').remove();
    $('.js-results').delay(500).html('<h3>Your investment would be worth </h3><h1>$' + dollars + '</h1><h3> today.</h3>');
    $('.js-results').delay(500).append('<h3>How does that make you feel?</h3>');

    createRestartButton();
  });
}

function createRestartButton () {
    $('.js-results').append('<button class="button2" type="submit">Try Again</button>')
}

// Event Listeners and AJAX
$(function(){watchSubmit();});

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var insertDate = $(this).find('.js-query').val();
    $('.container').delay(0).fadeOut(300);
    $('.container').delay(100).fadeIn(300);
   getDataFromApi(insertDate, setHistoricalPrice);
  });
}

var bitcoinApi = 'https://api.coindesk.com/v1/bpi/currentprice.json';
function getNewPrice(callback) {
  $.getJSON(bitcoinApi, callback);
}

var historicalApi = 'https://api.coindesk.com/v1/bpi/historical/close.json&';
function getDataFromApi(date, callback) {
  var query = {
    start: date,
    end: date
  }
  $.getJSON(historicalApi, query, callback);
}

$("#welcome").click(function() {
     $("#hi").animate({width:'toggle'},700);
});


$('.js-results').on('click', 'button', function(event) {
    location.reload();
});




