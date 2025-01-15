import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const get = (key: string) => {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

const set = (key: string, value: string, expires?: Date) => {
  if (!expires) {
    expires = dayjs().add(2, 'year').utc().toDate();
  }
  document.cookie = `${key}=${value};expires=${expires};path=/`;
};

const remove = (key: string) => {
  const expires = dayjs().subtract(1, 'hour');
  document.cookie = `${key}="";expires=${expires.utc().toDate()};path=/`;
};

export const useCookies = {
  get,
  set,
  remove,
};
