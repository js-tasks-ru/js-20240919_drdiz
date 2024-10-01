export default class ColumnChart {
    element = '';
    chartHeight = 50;

    constructor(dataObj) {
        this.dataObj = dataObj;
        this.data = dataObj.data;
        this.label = dataObj.label;
        this.value = dataObj.value;
        this.link = dataObj.link;

        this.element = this.render().firstElementChild;
    };

    chartScale(dataArr) {
        if (dataArr.length  > 0) {
        const maxChartValue = Math.max(...dataArr);        
          dataArr = dataArr.map(e => Math.floor(e * this.chartHeight / maxChartValue));
        }
        return dataArr
    };


    linker() {
        return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ``;
    }

    get html() {
        return `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">        
      <div class="column-chart__title"> 
      Total ${this.label}
             ${this.linker()} 
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">
        ${this.chartScale(this.data).map((item) => `<div style="--value: ${item}" data-tooltip=""></div>`).join('')}          
        </div>
      </div>
      </div>`
    };

    render() {
        let elemHtmlCode = this.createElement(this.html);
        this.data.length ? elemHtmlCode.firstElementChild.classList.remove(`column-chart_loading`) : false;
        return elemHtmlCode;
    };

    createElement(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div
    }

    remove() {
        this.element.remove();
    }
}