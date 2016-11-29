/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import VueRouter      from "vue-router";

import Files from "./components/Files";
import Login from "./components/Login";

const routes = [
    { path: "/login", component: Login },
    { path: "/files", component: Files },
    { path: "*", redirect: "files" }
];

const router = new VueRouter({ routes });

export default router;
