import { useRef, useEffect } from 'react';

/**
 * создает DOM-ноду, которая будет рутовым контейнером для портала
 *
 * @param {string} id уникальный id контейнера
 * @returns {HTMLElement} рутовый контейнер
 */
export function createRootElement(id: string): HTMLElement {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

/**
 * добавляет элемент последним в body
 *
 * @param {HTMLElement} elem элемент для вставки
 */
export function addRootElement(elem: HTMLElement, isExists: boolean): void {
  if (isExists) {
    return;
  }
  document.body.appendChild(elem);
}

/**
 * удаляет созданный элемент из body
 *
 * @param {HTMLElement} elem элемент для удаления
 */
export function removeRootElement(elem: HTMLElement, isExists: boolean): void {
  if (isExists) {
    return;
  }
  document.body.removeChild(elem);
}

/**
 * хук для создания портала
 * создает контейнер при отрисовке компонента и вставляет его последним в body
 * лениво инициализирует контейнер для присоединения переданного элемента и переиспользует его без перерисовок
 * следит за тем, чтобы использовалась только одна DOM-нода, к которой будет присоединен контент
 * автоматически удаляет ее, когда компонент с хуком анмаунтится
 *
 * @param {string} id уникальный id контейнера
 * @returns {HTMLElement} DOM-нода, которую нужно использовать как второй аргумент для createPortal
 *
 * @example
 * // returns HTMLElement
 * const YourComponent: FC = (props) => {
 *  const portal = usePortal(your_portal_container_id);
 *  return createPortal(props.children, portal);
 * }
 */
export function usePortal(id: string): HTMLElement {
  const portal = document.getElementById(id);
  const { current } = useRef<{ existingElem: boolean; elem: HTMLElement }>({
    existingElem: !!portal,
    elem: portal || createRootElement(id),
  });

  useEffect(() => {
    addRootElement(current.elem, current.existingElem);
    return () => {
      removeRootElement(current.elem, current.existingElem);
    };
  }, [current]);

  return current.elem;
}
