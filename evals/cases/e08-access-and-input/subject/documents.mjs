export function renameDocument(actor, id, title, store) {
  if (!actor) return { status: 401 };
  const document = store.get(id);
  if (!document) return { status: 404 };
  document.title = title;
  return { status: 200, body: { id: document.id, title: document.title } };
}
