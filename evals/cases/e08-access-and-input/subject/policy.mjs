export function canEdit(actor, document) {
  return actor?.id === document.ownerId;
}
