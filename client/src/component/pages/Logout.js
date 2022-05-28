function Logout() {
    localStorage.clear("email");
    localStorage.clear("userID");
    localStorage.clear("role");
    window.location = "/signin"
}

export default Logout;