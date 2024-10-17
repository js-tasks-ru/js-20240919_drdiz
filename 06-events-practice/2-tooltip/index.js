class Tooltip {
  element

  constructor() {
    if (Tooltip.justCeated) {
      return Tooltip.justCeated;
    }
    Tooltip.justCeated = this;
    this.initialize();
  }

  initialize() {
    this.body = document.body;
    this.addEvListener();
    this.element = this.createTooltipElement();
  }

  createTooltipElement() {
    let tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    return tooltip;
  }

  addEvListener() {
    this.body.addEventListener(`pointerover`, this.showTooltipText);
    this.body.addEventListener(`pointerout`, this.hideTooltipText);
  }

  removeEvListener() {
    this.body.removeEventListener(`pointerover`, this.showTooltipText);
    this.body.removeEventListener(`pointerout`, this.hideTooltipText);
  }

  showTooltipText = (e) => {
    this.render(e.target.dataset.tooltip);
  }

  render(text) {
    this.element.textContent = text;
    this.body.append(this.element);
  }

  hideTooltipText = () => {
    this.destroy();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default Tooltip;