import numeral from 'numeral';

export default class Helpers {
  static getCurrency(value) {
    return numeral(value).format('$0,0.00');
  }
}
