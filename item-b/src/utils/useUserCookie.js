import Cookies from 'js-cookie';

/**
 *设置用户的信息
 *
 * @export
 * @param {Object} userInfo(username,appkey,email,role)
 */
export function setUserCookies(userInfo) {
  const arr = Object.entries(userInfo);
  arr.forEach((item) => {
    Cookies.set(item[0], item[1]);
  });
  return true;
}

export function getUserCookies(key) {
  return Cookies.get(key);
}

export function removeUserCookies() {
  const arr = ['username', 'role', 'appkey', 'email'];
  arr.forEach((item) => {
    Cookies.remove(item);
  });
}
