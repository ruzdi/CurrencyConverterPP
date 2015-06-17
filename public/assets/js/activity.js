var socket = io('http://localhost:3000');

var targetObject;

var updateRate = function(){
    var data = {
        date: this.getAttribute("data-date"),
        currencyCode: this.getAttribute("data-currency-code"),
        targetCurrencyCode: this.options[this.selectedIndex].value,
        amount: parseFloat(this.getAttribute("data-amount"))
    };
    currenctObject = this;
    socket.emit('getConvertedCurrency', data);
};

var updateActivityPageRate = function(data){
    currenctObject.parentNode.nextSibling.firstChild.nodeValue = (data.error)?data.errorMessage:data.symbol+data.amount;
};

var currencySelectors = document.getElementsByClassName("currency-selector");
for(var i=0;i<currencySelectors.length;i++){
    currencySelectors[i].addEventListener("change", updateRate);
}

socket.on('setConvertedCurrency', function (data) {
    updateActivityPageRate(data);
});


