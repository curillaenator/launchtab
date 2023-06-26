import styles from './styles.module.scss';

type TransitionProps = 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo';

export const overlayTransitions: Record<TransitionProps, string> = {
  enter: styles.overlay_enter,
  enterFrom: styles.overlay_enter_from,
  enterTo: styles.overlay_enter_to,
  leave: styles.overlay_leave,
  leaveFrom: styles.overlay_leave_from,
  leaveTo: styles.overlay_leave_to,
};
