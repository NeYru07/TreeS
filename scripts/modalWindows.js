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

// Второе модальное окно
document.addEventListener('DOMContentLoaded', function() {
    const companyModal = new Modal('companyModalOverlay');
    const companyButtons = document.querySelectorAll('.open-company-modal');
    
    // Обработчик для кнопки
companyButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked, opening modal');
            companyModal.open();
        });
    });
    
    // Остальная логика модального окна остается без изменений
    const amountValue = document.querySelector('.amount-value');
    const amountPrice = document.querySelector('.amount-price');
    const totalValue = document.querySelector('.total-value');
    let currentAmount = 1;
    const pricePerSeedling = 500;

    // Кнопки +/-
    document.querySelector('.amount-btn.plus').addEventListener('click', () => {
        currentAmount++;
        updateAmount();
    });

    document.querySelector('.amount-btn.minus').addEventListener('click', () => {
        if (currentAmount > 1) {
            currentAmount--;
            updateAmount();
        }
    });

    function updateAmount() {
        amountValue.textContent = currentAmount;
        const totalPrice = currentAmount * pricePerSeedling;
        amountPrice.textContent = `${totalPrice}Р`;
        totalValue.textContent = `${totalPrice}Р`;
        
        document.querySelectorAll('.hectare-option').forEach(option => {
            option.classList.remove('active');
        });
    }

    // Логика выбора гектаров
    document.querySelectorAll('.hectare-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.hectare-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            this.classList.add('active');
            
            const price = this.getAttribute('data-price');
            totalValue.textContent = `${price}Р`;
            
            currentAmount = 1;
            amountValue.textContent = '1';
            amountPrice.textContent = '500Р';
        });
    });

    // Обработка формы
    document.querySelector('.company-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const city = this.querySelector('select').value;
        const companyType = this.querySelectorAll('select')[1].value;
        const amount = currentAmount;
        const total = totalValue.textContent;
        
        if (city && companyType) {
            console.log('Заявка от компании:', { city, companyType, amount, total });
            alert('Заявка от компании успешно отправлена! 🌳');
            companyModal.close();
            this.reset();
            currentAmount = 1;
            updateAmount();
            document.querySelectorAll('.hectare-option').forEach(opt => {
                opt.classList.remove('active');
            });
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
	 });

	//  burger menu
	document.addEventListener('DOMContentLoaded', function() {
		const burgerToggle = document.querySelector('.burger-menu-toggle');
		const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
		const closeMenuBtn = document.querySelector('.close-menu-btn');
		const body = document.body;
	 
		if (burgerToggle && mobileMenuOverlay && closeMenuBtn) {
		  burgerToggle.addEventListener('click', function() {
			 mobileMenuOverlay.classList.toggle('open');
			 burgerToggle.classList.toggle('open');
			 body.classList.toggle('no-scroll');
		  });
	 
		  closeMenuBtn.addEventListener('click', function() {
			 mobileMenuOverlay.classList.remove('open');
			 burgerToggle.classList.remove('open');
			 body.classList.remove('no-scroll');
		  });
	 
		  // Закрытие по клику вне меню (на оверлее)
		  mobileMenuOverlay.addEventListener('click', function(e) {
			 if (e.target === mobileMenuOverlay) {
				mobileMenuOverlay.classList.remove('open');
				burgerToggle.classList.remove('open');
				body.classList.remove('no-scroll');
			 }
		  });
		}
		const style = document.createElement('style');
		style.textContent = `
		  body.no-scroll {
			 overflow: hidden;
		  }
		`;
		document.head.append(style);
	 });