import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm';

// validation.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация масок для полей ввода
    const phoneInput = document.querySelector('input[type="tel"]');
    const emailInput = document.querySelector('input[type="email"]');
    const nameInput = document.querySelector('input[name="name"]');
    const lastNameInput = document.querySelector('input[name="lastname"]');
    
    // Маска для телефона
    if (phoneInput) {
        const phoneMask = IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00',
            lazy: false,
            placeholderChar: '_'
        });
        console.log('Phone mask initialized');
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
    }
    
    // Валидация имени
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName(this.value, nameInput, 'Имя');
        });
        
        // Ограничение на ввод только букв для имени
        nameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
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
        });
    }
    
    // Функции валидации
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isValid = emailRegex.test(email);
        
        if (email && !isValid) {
            showError(emailInput, 'Введите корректный email (только английские символы)');
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }
    
    function validateName(name, input, fieldName) {
        // Проверяем, что имя не пустое и содержит только буквы
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/;
        const isValid = nameRegex.test(name);
        
        if (name && !isValid) {
            showError(input, `${fieldName} должно содержать только буквы (минимум 2 символа)`);
            return false;
        } else if (!name) {
            showError(input, `${fieldName} обязательно для заполнения`);
            return false;
        } else {
            clearError(input);
            return true;
        }
    }
    
    function validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        const isValid = cleanPhone.length >= 11;
        
        if (phone && !isValid) {
            showError(phoneInput, 'Введите корректный номер телефона');
            return false;
        } else if (!phone) {
            showError(phoneInput, 'Телефон обязателен для заполнения');
            return false;
        } else {
            clearError(phoneInput);
            return true;
        }
    }
    
    function showError(input, message) {
        if (!input) return;
        
        clearError(input);
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.75rem';
        errorElement.style.marginTop = '0.3125rem';
        
        input.parentNode.appendChild(errorElement);
    }
    
    function clearError(input) {
        if (!input) return;
        
        input.classList.remove('error');
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
            
            const isNameValid = validateName(nameInput?.value, nameInput, 'Имя');
            const isLastNameValid = validateName(lastNameInput?.value, lastNameInput, 'Фамилия');
            const isEmailValid = validateEmail(emailInput?.value);
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
        // Показываем сообщение об успешной отправке
        alert('Форма успешно отправлена!');
        // Или создайте красивый попап вместо alert
    }
    
    // Дополнительно: валидация в реальном времени
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value) {
                validateEmail(this.value);
            } else {
                clearError(emailInput);
            }
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value) {
                validateName(this.value, nameInput, 'Имя');
            } else {
                clearError(nameInput);
            }
        });
    }
    
    if (lastNameInput) {
        lastNameInput.addEventListener('input', function() {
            if (this.value) {
                validateName(this.value, lastNameInput, 'Фамилия');
            } else {
                clearError(lastNameInput);
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value) {
                validatePhone(this.value);
            } else {
                clearError(phoneInput);
            }
        });
    }
});