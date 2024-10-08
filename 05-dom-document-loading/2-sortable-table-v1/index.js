export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
    this.subElements = this.getSubElements();
    this.sort()       
  }


  get templateHeaderTable() {
    return `    
  <div data-element="header" class="sortable-table__header sortable-table__row">
  ${this.headerConfig.map((e) => `    
      <div class="sortable-table__cell" data-id="${e.title}" data-sortable="${e.sortable}" data-order="asc">
        <span>${e.title}</span>
      </div>      
    `).join('')}  
    </div>`;
  }
  get templateBodyTable() {
    return `    
    <div data-element="body" class="sortable-table__body">
      ${this.data.map((e) => `
        <a href="/products/${e.id}" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${(e.images) ? e.images[0].url : false}">
        </div>
        <div class="sortable-table__cell">${e.title}</div>
        <div class="sortable-table__cell">${e.quantity}</div>
        <div class="sortable-table__cell">${e.price}</div>
        <div class="sortable-table__cell">${e.sales}</div>
      </a>
        `).join('')}
    </div>`;
  }


  render() {
    const elemHtmlCode = this.createElement(`<div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">${this.templateHeaderTable}${this.templateBodyTable}</div></div>`);   
    this.element = elemHtmlCode;
    this.subElements = this.getSubElements();    
  }

  createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    return [...elements].reduce((collect, el) => {
      collect[el.dataset.element] = el;
      return collect;
    }, {});
  }

  sort(fieldValue , orderValue) {
    const sortOrder = orderValue === 'asc' ? 1 : -1;
    const sortedData = [...this.data].sort((a, b) => {
      const aValue = a[fieldValue];
      const bValue = b[fieldValue];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder * (aValue - bValue);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder * aValue.localeCompare(bValue, 'ru', { caseFirst: 'upper'});
      }
      return 0;
    });

    this.data = sortedData;
    this.subElements.body.innerHTML = ''   
    this.subElements.body.append(this.createElement(this.templateBodyTable));      
  }
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}