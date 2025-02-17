import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

interface TocNodeItem {
  /** ProseMirrorNode */
  node: ProseMirrorNode;
  /** позиция в типтап документе */
  pos: number;
  /** обработчик для скролла к заголовку в документе */
  scrollTo?: () => void;
}

interface TocNodeConfig {
  dataTestId?: string;
  /** заголовок для обоих представлений ТоС - aside, proseMirror node */
  title?: string;
  /** id контейнера с прокручивающимся контентом, в котором должен произойти скролл при нажатии на элемент ТоС */
  scrollContainerId?: string;
  /** длительность прокрутки */
  scrollDuration?: number;
  /** вертикальный сдвиг */
  scrollOffset?: number;
}

interface TocNodeAttributes {
  /** заголовок */
  title?: string;
  /** отображать заголовки H с указанного, 1-5 */
  minLevel: number;
  /** отображать заголовки H по указанный, 2-6 */
  maxLevel: number;
  /** технический проп, обновляя который через updateAttributes можно принуджительно перендерить PM-ноду, предполагается Date.now() */
  timestamp?: number;
}

export type { TocNodeConfig, TocNodeAttributes, TocNodeItem };
