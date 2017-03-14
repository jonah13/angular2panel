import * as _ from 'lodash';
/**
 * String specific utilities
 */
export class StringUtils {
  /**
   * checks if a variable is of type string
   * @param test
   * @returns {boolean}
   */
  static isString(test) {
    return !!(typeof test === 'string' || test instanceof String);
  };

  /**
   * checks if a string is an email
   * @param str
   */
  static isEmail(str) {
    if (!this.isString(str)) {
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    return re.test(str);
  }

  /**
   * Convert object to query string
   * @param obj
   * @returns {string}
   */
  static toQueryString(obj) {
    return _(obj).map((v, k) => encodeURIComponent(<string>k) + '=' + encodeURIComponent(<string>v))
      .join('&');
  };

  /**
   * If object exists, convert it to query string and append it to base url
   * @param base
   * @param obj
   * @returns {any}
   */
  static appendAsQueryString(base, obj) {
    if (_.isEmpty(obj)) return base;
    return base + '?' + this.toQueryString(obj);
  }
}
