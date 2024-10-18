export default class ColumnChart {
  element = '';
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    link = '',
    value = 0,
    formatHeading = data => data
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.render();
  }
  createTemplate(dataArr) {

    if (!dataArr) {
      return '';
    }
    const maxChartValue = Math.max(...dataArr);
    return dataArr.map((e) => `<div style="--value: ${Math.floor(this.chartHeight * e / maxChartValue)}" data-tooltip="${(e / maxChartValue * 100).toFixed(0)}%"></div>`).join('');
  }
  createLink() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ``;
  }
  get html() {
    return `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">      
      <div class="column-chart__title"> 
      Total ${this.label}
             ${this.createLink()} 
      </div>
      <div class="column-chart__container">
        <div  data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div  data-element="body" class="column-chart__chart">
        ${this.createTemplate(this.data)}        
        </div>
      </div>
      </div>`;
  }
  render() {
    const elemHtmlCode = this.createElement(this.html);
    this.element = elemHtmlCode;
    if (this.data.length) {
      this.element.classList.remove(`column-chart_loading`);
    }
    this.subElements = this.subElements(this.element);
  }
  createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }
  subElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }
  update(newData) {
    this.data = newData;
    this.value = newData.reduce((a, b)=>a + b, 0);    
    this.subElements.header.innerHTML = this.formatHeading(this.value);
    this.subElements.body.innerHTML = this.createTemplate(this.data);
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}