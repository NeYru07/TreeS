// Инициализация модального окна (остается без изменений)
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.init();
    }
    
    init() {
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const modal = new Modal('modalOverlay');

// ОБНОВЛЕННЫЙ ОБРАБОТЧИК ДЛЯ ССЫЛКИ
document.querySelector('.open-modal-link').addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    modal.open();
});

// Закрытие по крестику (без изменений)
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.close();
});

// Обработка формы (без изменений)
document.querySelector('.modal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    
    if (city && street) {
        console.log('Заявка отправлена:', { city, street });
        alert('Заявка успешно отправлена! Спасибо за ваш вклад в озеленение города! 🌳');
        modal.close();
        document.querySelector('.modal-form').reset();
    } else {
        alert('Пожалуйста, заполните все поля');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const modalElement = document.getElementById('companyModalOverlay');
    console.log('Modal element:', modalElement);
    
    if (!modalElement) {
        console.error('Modal element #companyModalOverlay not found!');
        return;
    }
    
    const companyModal = new Modal('companyModalOverlay');
    
    // ИСПРАВЛЕНО: используем правильный класс
    const companyButtons = document.querySelectorAll('.open-company-modal');
    
    console.log('Found buttons:', companyButtons.length);

    // Обработчик для всех кнопок
    companyButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked, opening modal');
            companyModal.open();
        });
    });

    // Остальная логика без изменений
    const amountValue = document.querySelector('.amount-value');
    const amountPrice = document.querySelector('.amount-price');
    const totalValue = document.querySelector('.total-value');
    let currentAmount = 1;
    const pricePerSeeding = 500;

    const plusBtn = document.querySelector('.amount-btn.plus');
    const minusBtn = document.querySelector('.amount-btn.minus');
    
    console.log('Plus button:', plusBtn);
    console.log('Minus button:', minusBtn);

    if (plusBtn) {
        plusBtn.addEventListener('click', () => {
            currentAmount++;
            updateAmount();
        });
    }

    if (minusBtn) {
        minusBtn.addEventListener('click', () => {
            if (currentAmount > 1) {
                currentAmount--;
            }
            updateAmount();
        });
    }

    function updateAmount() {
        if (amountValue) amountValue.textContent = currentAmount;
        const totalPrice = currentAmount * pricePerSeeding;
        if (amountPrice) amountPrice.textContent = totalPrice;
        if (totalValue) totalValue.textContent = totalPrice;
    }

    updateAmount();
});