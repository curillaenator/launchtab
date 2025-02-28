type NotesCreateParamType = 'space' | 'note';

interface NotesRouteParams extends Record<string, string | undefined> {
  noteId?: string;
  createPageType?: NotesCreateParamType;
}

export type { NotesCreateParamType, NotesRouteParams };
