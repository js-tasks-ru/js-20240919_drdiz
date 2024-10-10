export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();    
    this.subElements = this.getSubElements();

  }

  get templateHeaderTable() {
    return `    
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map((e) => `    
            <div class="sortable-table__cell" data-id="${e.title}" data-sortable="${e.sortable}" data-order="">
              <span>${e.title}</span>
            </div>      
          `).join('')}  
      </div>`;
  }

  get templateBodyTable() {
    return `
    ${this.data.map((itemData) =>
    `<a href="/products/${itemData.id}" class="sortable-table__row">
      ${this.headerConfig.map((elemHeader) => {
    if (elemHeader['template']) {
      return elemHeader['template'](itemData[elemHeader['id']]);
    }

    return `<div class="sortable-table__cell">${itemData[elemHeader['id']]}</div>`;
  }).join('')
}
      </a>`).join('')
}`;
  }
  render() {
    const elemHtmlCode = this.createElement(`
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.templateHeaderTable}
          <div data-element="body" class="sortable-table__body">
            ${this.templateBodyTable}
          </div>
        </div>
      </div>`).firstElementChild;
    this.element = elemHtmlCode;
    this.subElements = this.getSubElements();    
  }

  createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div;
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    return [...elements].reduce((collect, el) => {
      collect[el.dataset.element] = el;
      return collect;
    }, {});
  }

  sort(fieldValue, orderValue = 'asc') {
    const sortOrder = orderValue === 'asc' ? 1 : -1;

    this.data = [...this.data].sort((a, b) => {
      if (typeof a[fieldValue] === 'number' && typeof b[fieldValue] === 'number') {
        return sortOrder * (a[fieldValue] - b[fieldValue]);
      }

      if (typeof a[fieldValue] === 'string' && typeof b[fieldValue] === 'string') {
        return sortOrder * a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en'], { caseFirst: 'upper' });
      }
      return 0;
    });

    this.subElements.body.innerHTML = this.templateBodyTable;    
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}