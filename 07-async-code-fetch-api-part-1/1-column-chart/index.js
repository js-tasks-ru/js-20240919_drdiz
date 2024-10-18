import { default as ColumnChartV1 } from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';
import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {

  constructor(props = {}) {
    super(props);
    const {
      url = '',
    } = props;
    this.today = new Date(Date.now());
    this.createURL(url);
  }

  createURL(pathName) {
    this.url = new URL(BACKEND_URL);
    this.url.pathname = pathName;
  }

  async update(from, to) {
    this.element.className = 'column-chart column-chart_loading';
    this.url.searchParams.set('from', from);
    this.url.searchParams.set('to', to);
    const newData = await fetchJson(this.url);
    const dataValue = Object.values(newData);
    super.update(dataValue);
    if (dataValue.length > 0) {
      this.element.className = 'column-chart';
    }
    return newData;
  }
}