export const checkAddOrUpdate = (current) => {
  let addOrEdit;
  if (Object.keys(current).length === 0) {
    addOrEdit = "Add";
  } else {
    addOrEdit = "Update";
  }
  return addOrEdit;
};
