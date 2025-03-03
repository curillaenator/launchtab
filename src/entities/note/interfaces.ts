type NotesCreateParamType = 'space' | 'note';

interface LaunchUnitProps {
  code: string;
  name: string;

  path: string[];

  createdAt: number;
  createdBy: string;

  updatedAt?: number;
  updatedBy?: string;

  hierarchy?: Record<string, number>;
}

interface NotesRouteParams extends Record<string, string | undefined> {
  noteId?: string;
  createPageType?: NotesCreateParamType;
}

export type { NotesCreateParamType, NotesRouteParams, LaunchUnitProps };
