import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm';

// validation.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация масок для полей ввода
    const phoneInput = document.querySelector('input[type="tel"]');
    const emailInput = document.querySelector('input[type="email"]');
    const nameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');
    
    // Маска для телефона
    if (phoneInput) {
        // Убедитесь, что библиотека IMask доступна
        if (typeof IMask !== 'undefined') {
            const phoneMask = IMask(phoneInput, {
                mask: '+{7} (000) 000-00-00',
                lazy: false,
                placeholderChar: '_'
            });
            console.log('Phone mask initialized');
        } else {
            console.error('IMask library not found. Please ensure it is loaded.');
        }

        // Дополнительная валидация телефона при вводе через маску
        phoneInput.addEventListener('input', function() {
            validatePhone(this.value);
        });
        
        phoneInput.addEventListener('blur', function() {
            validatePhone(this.value);
        });
    }
    
    // Ограничение для email - только английские символы
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            // Разрешаем только английские буквы, цифры и стандартные символы email
            this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, '');
        });
        
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value);
        });
        
        // Валидация в реальном времени
        emailInput.addEventListener('input', function() {
            if (this.value) {
                validateEmail(this.value);
            } else {
                clearError(emailInput);
            }
        });
    }
    
    // Валидация имени
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName(this.value, nameInput, 'Имя');
        });
        
        // Ограничение на ввод только букв для имени
        nameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
            // Валидация в реальном времени
            if (this.value) {
                validateName(this.value, nameInput, 'Имя');
            } else {
                clearError(nameInput);
            }
        });
    }
    
    // Валидация фамилии
    if (lastNameInput) {
        lastNameInput.addEventListener('blur', function() {
            validateName(this.value, lastNameInput, 'Фамилия');
        });
        
        // Ограничение на ввод только букв для фамилии
        lastNameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
            // Валидация в реальном времени
            if (this.value) {
                validateName(this.value, lastNameInput, 'Фамилия');
            } else {
                clearError(lastNameInput);
            }
        });
    }
    
    // Функции валидации
    function validateEmail(email) {
        // Убедимся, что проверяем поле input, а не значение.
        const input = emailInput; 
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isValid = emailRegex.test(email);
        
        if (!email) {
            showError(input, 'Email обязателен для заполнения');
            return false;
        } else if (!isValid) {
            showError(input, 'Введите корректный email (только английские символы)');
            return false;
        } else {
            clearError(input);
            return true;
        }
    }
    
    function validateName(name, input, fieldName) {
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/;
        const isValid = nameRegex.test(name);
        
        if (!name) {
            showError(input, `${fieldName} обязательно для заполнения`);
            return false;
        } else if (!isValid) {
            showError(input, `${fieldName} должно содержать только буквы (минимум 2 символа)`);
            return false;
        } else {
            clearError(input);
            return true;
        }
    }
    
    function validatePhone(phone) {
        // Если телефон не инициализирован IMask, используем phoneInput
        const input = phoneInput; 
        const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
        const isValid = cleanPhone.length === 11;
        
        if (!phone || cleanPhone.length === 0) {
            showError(input, 'Телефон обязателен для заполнения');
            return false;
        } else if (!isValid) {
            showError(input, 'Введите корректный номер телефона (11 цифр)');
            return false;
        } else {
            // Успешная валидация
            clearError(input);
            return true;
        }
    }
    
    /**
     * Отображает сообщение об ошибке и добавляет класс 'error'
     * @param {HTMLElement} input - Поле ввода
     * @param {string} message - Текст ошибки
     */
    function showError(input, message) {
        if (!input) return;
        
        clearError(input); // Очищаем существующие классы и сообщения
        input.classList.add('error');
        input.classList.remove('success'); // Удаляем класс успеха

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Вставляем сообщение об ошибке сразу после поля ввода
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    /**
     * Очищает сообщение об ошибке и добавляет класс 'success'
     * @param {HTMLElement} input - Поле ввода
     */
    function clearError(input) {
        if (!input) return;
        
        input.classList.remove('error');
        
        // Добавляем класс success, только если поле не пустое
        if (input.value && input.value.replace(/\s/g, '') !== '') {
            input.classList.add('success');
        } else {
             input.classList.remove('success');
        }

        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Валидация при отправке формы
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Вызываем валидацию для всех полей, чтобы отобразить все ошибки
            const isNameValid = validateName(nameInput?.value, nameInput, 'Имя');
            const isLastNameValid = validateName(lastNameInput?.value, lastNameInput, 'Фамилия');
            const isEmailValid = validateEmail(emailInput?.value);
            // Если IMask используется, .value может содержать символы маски
            const isPhoneValid = validatePhone(phoneInput?.value); 
            
            if (isNameValid && isLastNameValid && isEmailValid && isPhoneValid) {
                console.log('Форма валидна, отправляем данные');
                // form.submit(); // Раскомментируйте когда будете готовы отправлять форму
                showSuccessMessage();
            } else {
                console.log('Форма содержит ошибки');
            }
        });
    }
    
    function showSuccessMessage() {
        alert('Форма успешно отправлена!');
    }
    
});