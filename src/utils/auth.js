function isLogged() {
  return !!localStorage.token;
}

export { isLogged };
