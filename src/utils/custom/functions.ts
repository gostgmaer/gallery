export const deletekeys = <T extends Record<string, any>>(query: T): T => {
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (value === "" || value == null || value === undefined) {
      delete query[key];
    }
  });
  return query;
};
