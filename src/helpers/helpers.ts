// запуск всех переданных в массиве функций

export const compose = (funcs: (() => void)[]) => {
  funcs.forEach((func) => func());
};

// Проверка линка с картинкой на работоспособсноть

export interface CheckImageURL {
  ok: boolean;
  status: string | number;
  url: string;
}

export const DEFAULT_OPTIONS: Record<string, RequestInit> = {};

export const OPTIONS: Record<string, RequestInit> = {
  'https://cdn.worldvectorlogo.com': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },
};

export const getHeaders = () => {};

export const checkImageURL = async (url: string): Promise<CheckImageURL> => {
  const check = await fetch(url, {
    method: 'GET',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'image/svg+xml',
    // },
    credentials: 'omit', // omit, same-origin или include
    mode: 'cors', // mode: 'cors' | 'same-origin' | 'no-cors'
  })
    .then((res) => ({ ok: res.ok, status: res.status }))
    .catch(() => ({ ok: false, status: 'bad' }));

  return { url, ...check };
};
