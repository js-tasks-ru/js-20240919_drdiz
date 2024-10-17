import SortableTable from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTable {
  isSortLocally;

  constructor(headersConfig, {
    data = [],
    sorted = {},
    isSortLocally = true,
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;
    this.sort(this.sorted.id, this.sorted.order);
    this.addEvListeners();
    this.arrowElement = this.createArrow();
    this.initDefaultArrowSort();
  }

  initDefaultArrowSort() {
    this.subElements.header.querySelector('[data-id="title"]').dataset.order = this.sorted.order;
    this.subElements.header.querySelector('[data-id="title"]').append(this.arrowElement);
  }

  addEvListeners() {
    this.element.addEventListener('pointerdown', this.onClickHeadSort);
  }

  removeEvListeners() {
    this.element.removeEventListener('pointerdown', this.onClickHeadSort);
  }

  onClickHeadSort = (e) => {

    const target = e.target.closest('.sortable-table__cell');
    if (!target) {
      return;
    }

    target.dataset.order = target.dataset.order == 'desc' ? 'asc' : 'desc';
    target.append(this.arrowElement);
    this.sort(target.dataset.id, target.dataset.order);
  }

  createArrow() {
    let div = this.createElement('div');
    div.innerHTML = `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
    return div.lastElementChild;
  }

  destroy() {
    super.destroy();
    this.removeEvListeners();
  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      super.sort(sortField, sortOrder);
    } else {
      this.sortOnServer(sortField, sortOrder);
    }
  }
  sortOnServer(sortField, sortOrder) { }
}