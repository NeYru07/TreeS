
// Пигнитация для слайдера
document.addEventListener("DOMContentLoaded", function () {
	const swiper = new Swiper(".mySwiper", {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: false,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		on: {
			// Событие при переключении слайдов
			slideChange: function () {
				updatePagination(this.activeIndex);
			},
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: false,
		 },
	});

	// Функция для обновления пагинации
	function updatePagination(activeIndex) {
		const paginationSvgs = document.querySelectorAll(".pagination-svg");

		// Убираем все активные и завершенные состояния
		paginationSvgs.forEach((svg) => {
			svg.classList.remove("active", "completed");
		});

		// Закрашиваем все элементы до текущего слайда
		for (let i = 0; i <= activeIndex; i++) {
			const svg = document.querySelector(`.pagination-svg[data-slide-index="${i}"]`);
			if (svg) {
				if (i === activeIndex) {
					svg.classList.add("active"); // Текущий слайд
				} else {
					svg.classList.add("completed"); // Предыдущие слайды
				}
			}
		}
	}

	// Инициализация пагинации при загрузке страницы
	updatePagination(0);

	// Обработка кликов по элементам пагинации для переключения слайдов
	document.querySelectorAll(".pagination-svg").forEach((svg) => {
		svg.addEventListener("click", function () {
			const slideIndex = parseInt(this.getAttribute("data-slide-index"));
			swiper.slideTo(slideIndex);
		});
	});
});
var swiper = new Swiper(".mySwiper3", {
	slidesPerView: 1.17,
		spaceBetween: 16,
		loop: false,
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
 });