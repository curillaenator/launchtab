import { IMenuItem } from "../contextMenu/ContextMenu";
import { deletePage } from "../../redux/reducers/bookmarks";
import { TDispatch } from "../../redux/store";

export const getContextMenuItems = (knob: string, dispatch: TDispatch) => {
  const contextMenuItems: IMenuItem[] = [
    {
      title: "Edit",
      handler: () => {},
    },
    {
      title: "Delete",
      danger: true,
      handler: () => dispatch(deletePage(knob)),
    },
  ];

  return contextMenuItems;
};
