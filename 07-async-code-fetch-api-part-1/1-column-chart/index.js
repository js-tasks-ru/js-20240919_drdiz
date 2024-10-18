import { default as ColumnChartV1 } from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';
import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {

  constructor(props = {}) {
    super(props);
    const {
      url = '',
    } = props;    
    this.baseURL = url;
  }

  createURL(from, to) {
    const url = new URL(this.baseURL, BACKEND_URL);
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    return url;
  }

  async update(from, to) {
    this.element.className = 'column-chart column-chart_loading';    
    const newData = await fetchJson(this.createURL(from, to));
    const dataValue = Object.values(newData);
    super.update(dataValue);
    if (dataValue.length > 0) {
      this.element.className = 'column-chart';
    }
    return newData;
  }
}