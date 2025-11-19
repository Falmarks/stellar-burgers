interface CookieProps {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  samesite?: 'strict' | 'lax' | 'none';
  [key: string]: string | number | Date | boolean | undefined;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: CookieProps = {}
): void {
  const options: CookieProps = {
    path: '/',
    ...props
  };

  let { expires } = options;

  if (typeof expires === 'number' && expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    expires = options.expires = date;
  }

  if (expires instanceof Date) {
    options.expires = expires.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);
  let cookieString = `${name}=${encodedValue}`;

  Object.entries(options).forEach(([propName, propValue]) => {
    cookieString += `; ${propName}`;

    if (propValue !== true) {
      cookieString += `=${String(propValue)}`;
    }
  });

  document.cookie = cookieString;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}
