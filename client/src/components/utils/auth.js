class Auth {
  constructor() {
    const cookies = document.cookie.split(";");
    const tokenExist = cookies.some((row) => row.trim().startsWith("token="));

    if (tokenExist) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  signIn(cb) {
    this.authenticated = true;
    cb();
  }

  signOut(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
