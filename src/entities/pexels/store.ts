import type { PhotosWithTotalResults } from 'pexels';
import { createStore, createEvent } from 'effector';

const PEXELS_INITIAL_STATE: PhotosWithTotalResults = {
  total_results: 0,
  page: 1,
  per_page: 8,
  photos: [],
  next_page: 2,
};

interface PexelsStore {
  pexelsQuery: string;
  pexelsLoading: boolean;
  pexels: PhotosWithTotalResults;
}

const setPexels = createEvent<PhotosWithTotalResults>();
const setPexelsQuery = createEvent<string>();
const setPexelsLoading = createEvent<boolean>();

const $pexelsStore = createStore<PexelsStore>({
  pexelsQuery: '',
  pexelsLoading: false,
  pexels: PEXELS_INITIAL_STATE,
});

$pexelsStore
  .on(setPexels, (prevState, pexels) => ({
    ...prevState,
    pexels,
  }))
  .on(setPexelsQuery, (prevState, pexelsQuery) => ({
    ...prevState,
    pexelsQuery,
  }))
  .on(setPexelsLoading, (prevState, pexelsLoading) => ({
    ...prevState,
    pexelsLoading,
  }));

export { $pexelsStore, setPexels, setPexelsQuery, setPexelsLoading };
