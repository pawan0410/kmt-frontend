/* © AIG Business. See LICENSE file for full copyright & licensing details. */

const state = {
    authenticated: false,
    lastEmail: "Test",
    user: {
        id: null,
        name: ""
    },
    jwt: "",
    files: [],
    currentFile: {
        name: "",
        delta: null,
    },
    companyName: "AIG Business",
    copyrightYear: new Date().getFullYear()
};

export default state;
