export const setTokenWithExpiry = (key, token) => {
    const now = new Date();
    const item = {
      token: token,
      expiry: now.getTime() + 60 * 1000 // 1 hour in milliseconds 
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const removeToken = (key) => {
  localStorage.removeItem(key);
};
