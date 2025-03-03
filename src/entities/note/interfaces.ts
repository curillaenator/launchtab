type NotesCreateParamType = 'space' | 'note';

interface LaunchNoteProps {
  code: string;
  name: string;

  path: string[];

  createdAt: number;
  createdBy: string;

  updatedAt?: number;
  updatedBy?: string;

  hierarchy?: Record<string, number | null>;
}

interface NotesRouteParams extends Record<string, string | undefined> {
  noteId?: string;
  createPageType?: NotesCreateParamType;
}

export type { NotesCreateParamType, NotesRouteParams, LaunchNoteProps };
