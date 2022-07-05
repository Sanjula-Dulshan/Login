export const isLength = (password) => {
  if (password.length < 8) return true;
  return false;
};

export const isMatch = (password, cPassword) => {
  if (password === cPassword) return true;
  return false;
};
