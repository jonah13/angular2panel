/**
 * Endpoint url.
 * @enum {string}
 */
const URI = {
  //NEW: 'http://beckwayapi.projectsintestserver.com/api/',
  BASE: 'http://beckwayapi.projectsintestserver.com/api/',
  //BASE: 'http://beckway.dotnettestserver.com/api/',
  NEW: 'http://beckwayapi.projectsintestserver.com/api/'
};

/**
 * Keys used in local storage operations.
 * @enum {string}
 * @const
 */
const STORAGEKEYS = {
  'AUTH_TOKEN': 'user: authToken',
  'CURRENT_USER': 'user: currentUser'
};

/**
 * Freezes the object.
 * @const {Object}
 */
export const CONFIG = Object.freeze({
  STORAGE_KEYS: Object.freeze(STORAGEKEYS),
  URI: Object.freeze(URI)
});
