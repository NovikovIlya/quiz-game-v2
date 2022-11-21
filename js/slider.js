// Реализовываем слайдер-подсказку
const slider = document.querySelector('#slider');
// отдельные слайды и превращаем отдельные славйды в массив 
const sliderItems = Array.from(slider.children);

const btnNext = document.querySelector('#btnNext');

const btnPrev = document.querySelector('#btnPrev');



// перебираем
sliderItems.forEach(function(slide, index){
	
	//Скрываем все слайды, кроме первого
	if (index !== 0) {
		//Добавляем к слайдам (каждую элементу перебора) класс хиден - скрыть
		slide.classList.add('hidden');
	}


	//Добавляем индексы
	slide.dataset.index = index;

	//Добавляем дата-атрибут active для первого-активного слайда
	sliderItems[0].setAttribute('data-active', '');


	//Клик по слайдам
	slide.addEventListener('click',  clickslider);

	function clickslider(){
		//Скрываем первый(текущий) слайд
		slide.classList.add('hidden');
		//Удаляем у первый(текущий) слайд дата атрибут
		slide.removeAttribute('data-active');

		// создаем переменную, которая обозначается индекс следующего слайда
		let nextSlideIndex;

		// Если индекс это последний слайд - то следующий индекс это 0, иначе добавляем +1
		if (index + 1 === sliderItems.length){
			nextSlideIndex = 0;
		} else {
			nextSlideIndex = index + 1;
		}



		// создаем переменную, которая находит (содержит) индекс следующеего слайда и содержит след слайд 
		const nextSlide =  slider.querySelector(`[data-index="${nextSlideIndex}"]`);

		// Удаляем у след слайда хиден (в результате он отображается, а предыдущий скрывается)
		nextSlide.classList.remove('hidden');
		nextSlide.setAttribute('data-active', '');

		

	}
});


btnNext.onclick = function() {
	showNextSlide('next');
}

btnPrev.onclick = function() {
	showNextSlide('prev');
}

// Показ слайда вперед-назад
function showNextSlide(napravlenie){
	// Скрываем текущий слайд
	// Получаем инфу по текущему отображаемому слайду
	const currentSlide =  slider.querySelector('[data-active]');

	// Индекс текущего слайда
	const currentSlideIndex = +currentSlide.dataset.index;

	// Скрываем
	currentSlide.classList.add('hidden');
	currentSlide.removeAttribute('data-active');

	//смотрим на направление
	let nextSlideIndex;
	if (napravlenie === 'next'){
		 nextSlideIndex  = (currentSlideIndex + 1 === sliderItems.length) ? 0 : currentSlideIndex + 1;
	} else if (napravlenie === 'prev'){
		 nextSlideIndex  = (currentSlideIndex === 0) ? sliderItems.length-1 : currentSlideIndex -1 ;
	}


	const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
	nextSlide.classList.remove('hidden');
	nextSlide.setAttribute('data-active', '');
}
