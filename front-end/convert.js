// Для курсов валют
rates = {};

// При загрузке документа
$(document).ready(function(){
    // Загружаем курсы валют
    $.ajax({
        // Откуда загружаем курсы валют
        url: 'http://www.apilayer.net/api/live?access_key=f7b0290451fb34988f80cb79090eb096&format=1',
        // Запрос к стороннему домену
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data){
            rates = data.rates;
        },
        error: function(){
            alert('Не удалось загрузить курсы валют. Перевод не будет работать.');
        }
    });

    // При клике на кнопку "Вычислить"
    $('#calculate').click(function(){
        var result, vfrom, vto, vcash;

        // Получаем сумму, которую нужно перевести
        vcash = $('#cash').val();
        vfrom = $('#from').val();
        vto   = $('#to').val();

        // Заменяем в значении переводимой валюты одни символы на другие
        vcash = vcash.replace(',', '\.')
            .replace(' ', '')
            .replace(' ', '');

        // Вычисляем результат
        result = rates[vto] * vcash / rates[vfrom];

        // Переводим
        result = result.toFixed(2)
            .toString()
            .replace('\.', ',');

        result = '<span class="result">Результат перевода: ' + result + '&nbsp;' + vto + '</span>';

        // Выводим результат
        $('#result').html( result );
    });
});