import IconPlus from '@sbt_swtr/kit-tracker.icon/dist/assets/duotone/PlusIcon';

import type { DropdownItemProps } from '../../../Dropdown';
import type { AttachmentCommand } from '../../interfaces';

const ATTACHMENT_ITEMS: DropdownItemProps<AttachmentCommand>[] = [{ id: 'chooseAttachment', Icon: IconPlus }];

export { ATTACHMENT_ITEMS };
