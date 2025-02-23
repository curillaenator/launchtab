const parseUrlWithoutError = (v: string | null | undefined | URL, base?: string | URL) => {
  if (typeof v === 'string' || typeof v === 'object') {
    try {
      return new URL(v!, base);
    } catch (_) {
      return null;
    }
  }
  return null;
};

const getDrawioEditorURL = (drawioEmberUrl: string) => {
  const drawioUrl = parseUrlWithoutError(drawioEmberUrl);

  if (drawioUrl instanceof URL) {
    drawioUrl.searchParams.append('embed', '1');
    drawioUrl.searchParams.append('spin', '1');
    drawioUrl.searchParams.append('modified', 'unsavedChanges');
    drawioUrl.searchParams.append('proto', 'json');
    // drawioUrl.searchParams.append('ui', 'atlas');
  }

  return drawioUrl?.toString() || null;
};

export { getDrawioEditorURL };
