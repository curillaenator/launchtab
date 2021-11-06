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

export const checkImageURL = async (url: string): Promise<CheckImageURL> => {
  const check = await fetch(url, { credentials: "omit", mode: "cors" })
    .then((res) => ({ ok: res.ok, status: res.status }))
    .catch(() => ({ ok: false, status: "bad" }));

  return { url, ...check };
};
