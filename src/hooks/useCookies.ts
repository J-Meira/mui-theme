const get = (key: string) => {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

const defaultExpires = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 2);
  return date;
};

const set = (key: string, value: string, expires?: Date) => {
  const expiresAt = expires ?? defaultExpires();
  document.cookie = `${key}=${value};expires=${expiresAt.toUTCString()};path=/`;
};

const remove = (key: string) => {
  document.cookie = `${key}=;expires=${new Date(0).toUTCString()};path=/`;
};

export const useCookies = {
  get,
  set,
  remove,
};
