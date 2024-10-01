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
      this.formatHeading = formatHeading     
      this.render();
    }

    optimizeChartScale(dataArr) {     
      
      if (dataArr) {
        const maxChartValue = Math.max(...dataArr);
        return dataArr.map((e) => `<div style="--value: ${Math.floor(this.chartHeight * e / maxChartValue)}" data-tooltip="${(e / maxChartValue * 100).toFixed(0)}%"></div>`).join('');
      } else return dataArr
    }

    createLink() {
      return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ``;
    }

    getHeaderValue(data) {
      return this.formatHeading(data);
    }

    get html() {
      return `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">      
      <div class="column-chart__title"> 
      Total ${this.label}
             ${this.createLink()} 
      </div>
      <div class="column-chart__container">
        <div  data-element="header" class="column-chart__header">${this.getHeaderValue(this.value)}</div>
        <div  data-element="body" class="column-chart__chart">
        ${this.optimizeChartScale(this.data)}        
        </div>
      </div>
      </div>`;
    }

    render() {
      let elemHtmlCode = this.createElement(this.html);      
      this.element = elemHtmlCode.firstElementChild;
      this.data.length ? this.element.classList.remove(`column-chart_loading`) : false;
      this.someElements = this.collectSubElements(this.element);      
      
    }

    createElement(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div;
    }

    collectSubElements(element) {
      const elements = element.querySelectorAll('[data-element="body"]');        
      return [...elements].reduce((collect, el) => {
        collect[el.dataset.element] = el;               
        return collect;
      }, {});
    }    

    update(data) {      
      this.someElements.body.innerHTML = this.optimizeChartScale(data);
    }
  
    remove () {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
      this.someElements = {};
    }
}