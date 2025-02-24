import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

const getNoteBodyQuery = async (noteId: string) => {
  const bodySnap = await getDoc(doc(fsdb, 'notes', noteId));

  if (!bodySnap.exists()) return null;

  return bodySnap.data()['tiptap'] as string;
};

async function updateNoteBodyMutation(noteId: string, noteBody: string) {
  let response = { routerNoteId: false };

  setDoc(doc(fsdb, 'notes', noteId), { tiptap: noteBody }).then(() => (response.routerNoteId = true));

  return response;
}

export { getNoteBodyQuery, updateNoteBodyMutation };
