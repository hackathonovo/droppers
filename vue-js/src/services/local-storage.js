const LOCAL_STORAGE_KEY_PREFIX = 'hgss';

function getName(name) {
  return `${LOCAL_STORAGE_KEY_PREFIX}-${name}`;
}

function localStorageCall(methodName, name, args = []) {
  try {
    return localStorage[methodName](getName(name), ...args);
  } catch (e) {
    console.warn('Error with local storage service!'); // eslint-disable-line no-console
    return false;
  }
}

export function setItem(name, value) {
  localStorageCall('setItem', name, [value]);
}

export function getItem(name) {
  return localStorageCall('getItem', name);
}

export function removeItem(name) {
  localStorageCall('removeItem', name);
}
