export { NOTE_DEBOUNCE_TIME } from './constants';

export { $noteStore, setNoteLastInputTimestamp, setSaveNoteHandler, setIsNoteSaving } from './store';

export { getNoteBodyQuery, updateNoteBodyMutation } from './api';

export { useNoteBodyData } from './hooks/useNoteBodyData';
export { useNoteBodyUpdate } from './hooks/useNoteBodyUpdate';
export { useNoteCreate } from './hooks/useNoteCreate';

export type { NotesCreateParamType, NotesRouteParams, LaunchNoteProps } from './interfaces';
