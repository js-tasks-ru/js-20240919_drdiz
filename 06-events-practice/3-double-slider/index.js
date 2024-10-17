export default class DoubleSlider {
    constructor(data = {}) {
        const {
            min = 0,
            max = 100,
            formatValue = value => value,
            selected = {
                from: min,
                to: max
            },
        } = data;
        this.min = min;
        this.max = max;
        this.formatValue = formatValue;
        this.selected = selected;
        this.render();
    }

    render() {
        const wrapperElement = document.createElement("div");
        wrapperElement.innerHTML = this.createTemplate();
        this.element = wrapperElement.firstElementChild;
        this.subElements = this.getSubElements(this.element);
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('pointerdown', this.onThumbDown);
        document.addEventListener('pointerup', this.onThumbUp);
    }

    removeEventListeners() {
        document.removeEventListener('pointerdown', this.onThumbDown);
        document.removeEventListener('pointerup', this.onThumbUp);
        document.removeEventListener('pointermove', this.onThumbMoving);
    }

    onThumbDown = (e) => {
        const element = e.target.closest('[data-element]');
        this.currentThumb = element.dataset.element;
        this.thumbPosition = this.currentThumb === 'left' ? 'from' : 'to';
        this.element.classList.add('range-slider_dragging');
        document.addEventListener('pointermove', this.onThumbMoving);
    }

    onThumbUp = (e) => {
        this.element.classList.remove('range-slider_dragging');
        document.removeEventListener('pointermove', this.onThumbMoving);
        this.selected[this.thumbPosition] = this.selectAmount;
        this.currentThumb = null;
        this.dispatchCustomEvents();
    }

    dispatchCustomEvents() {
        this.element.dispatchEvent(new CustomEvent("range-select", {
            detail: this.selected
        }));
    }

    onThumbMoving = (e) => {
        this.selectAmount = this.getSelectAmount(e.clientX);
        const newThumbPosition = this.calculateThumbPosition(this.currentThumb, this.selectAmount);
        this.subElements[this.currentThumb].style[this.currentThumb] = `${newThumbPosition}%`;
        this.subElements['progress'].style[this.currentThumb] = `${newThumbPosition}%`;
        this.subElements[this.thumbPosition].textContent = this.formatValue(Math.floor(this.selectAmount));
    }

    getSelectAmount(clientX) {
        const scaleSlider = this.subElements['thumb'];
        const sliderWidth = scaleSlider.getBoundingClientRect().width;
        const sliderLeftBorder = scaleSlider.getBoundingClientRect().left;
        const coefficient = sliderWidth / (this.max - this.min);
        const selectedAmount = (clientX - sliderLeftBorder) / coefficient;
        return this.getUpdAmount(selectedAmount, this.currentThumb);
    }

    getUpdAmount(amount, thumb) {
        const leftMovingAmount = amount + this.min;
        const params = {
            value: leftMovingAmount,
            min: this.min,
            max: this.max,
            selected: this.selected
        };
        return this.borderUpd[thumb](params);
    }

    calculateThumbPosition(thumb, amount) {
        const value = thumb === 'right'
            ? this.max - amount
            : amount - this.min;
        const overallPercent = this.max - this.min;
        return (this.max + this.min) * value / (overallPercent > 0 ? overallPercent : 1);
    }

    createTemplate() {
        return (
            `<div class="range-slider">
        ${this.createValueTemplate('from', this.selected.from)}
          <div class="range-slider__inner" data-element="thumb">
            ${this.createScaleTemplate()}
          </div>
        ${this.createValueTemplate('to', this.selected.to)}
    </div>`
        );
    }

    borderUpd = {
        left: (data) => {
            const { value, min, selected } = data;
            const tempValue = Math.min(value, selected.to);
            return Math.max(tempValue, min);
        },
        right: (data) => {
            const { value, max, selected } = data;
            const tempValue = Math.max(value, selected.from);
            return Math.min(tempValue, max);
        },
    };

    createValueTemplate(dataValue, value) {
        return `
        <span data-element="${dataValue}">${this.formatValue(value)}</span>
        `
       
    }

    createScaleTemplate() {
        const left = this.calculateThumbPosition('left', this.selected.from);
        const right = this.calculateThumbPosition('right', this.selected.to);
        return `
       <span class="range-slider__progress" data-element="progress" style="left: ${left}%; right: ${right}%"></span>
       <span class="range-slider__thumb-left" data-element="left" style="left: ${left}%"></span>
       <span class="range-slider__thumb-right" data-element="right" style="right: ${right}%"></span>
       `
    }

    getSubElements(collectElement) {
        const elements = collectElement.querySelectorAll('[data-element]');
        const collectElements = {};
        elements.forEach(subElement => {
            const elementValue = subElement.dataset.element;
            collectElements[elementValue] = subElement;
        });
        return collectElements;
    }

    destroy() {
        this.element.remove();
        this.removeEventListeners();
    }
}