$(document).ready(function() {
    // Функция для обработки отправки любой формы с классом .application-form
    function handleFormSubmission(event, form) {
        event.preventDefault(); // Отменяем стандартную отправку формы

        // 1. Собираем данные формы
        let formData = form.serializeArray();
        
        // 2. Добавляем итоговую сумму (из элемента .total-value, предполагая, что это его класс)
        let totalSumElement = form.find('.total-value');
        
        // Проверяем, существует ли элемент с суммой
        if (totalSumElement.length) {
            formData.push({
                name: 'totalSum',
                value: totalSumElement.text().trim() // Получаем текст, например '500Р'
            });
        }
        
        // 3. Блокируем кнопку
        let submitBtn = form.find('button[type="submit"]');
        let originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Отправка...');

        // 4. Отправляем данные через AJAX
        $.ajax({
            url: 'submit.php', // Путь к вашему PHP-скрипту
            type: 'POST',
            data: $.param(formData), // Преобразуем массив данных в строку для POST-запроса
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Успех! ' + response.message);
                    form.trigger('reset'); // Очищаем форму
                    // Здесь можно добавить код для закрытия модального окна
                } else {
                    alert('Ошибка: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                alert('Произошла ошибка при отправке заявки. Проверьте консоль.');
                console.error("AJAX Error:", status, error);
            },
            complete: function() {
                // 5. Включаем кнопку обратно
                submitBtn.prop('disabled', false).text(originalText);
            }
        });
    }

    // Привязываем функцию к событию отправки обеих форм (основной и компании)
    $('.application-form').on('submit', function(event) {
        handleFormSubmission(event, $(this));
    });

    // Форма компании (если у нее есть класс .company-form в вашем HTML)
    $('.company-form').on('submit', function(event) {
        handleFormSubmission(event, $(this));
    });
});