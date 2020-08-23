class Auth {
  constructor() {
    this.authenticated = false;
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
