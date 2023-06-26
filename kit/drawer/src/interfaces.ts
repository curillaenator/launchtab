export interface BaseDrawerProps {
  /** тест id */
  dataTestId?: string;
  /** id div'a, в который будет порталиться модалка */
  portalId: string;
  /** состояние открытия/закрытия */
  open: boolean;
  /** обработчик для открытия/закрытия шторки */
  onClose: () => void;
  /** отключить закрытие модалки по клику на оверлей. По умолчанию - false */
  disableBackgroundClick?: boolean;
  /** класснейм для оверлея */
  overlayClassName?: string;
  /** класснейм темного скролла */
  scrollClassName?: string;
  /** класснейм для передачи переменных настройки анимации */
  transitionClassName?: string;
  /** класснейм для передачи переменных настройки контента */
  contentClassName?: string;
  /** венрсия темного компонента */
  version?: string;
  /** позиционирование компонента */
  placement?: 'left' | 'right';
}

export type OmitedBaseDrawerProps = Omit<
  BaseDrawerProps,
  'overlayClassName' | 'scrollClassName' | 'transitionClassName' | 'version'
>;
