import common from "./common"
import request from "./request"
import sidebar from "./sidebar"
import permissions from "./permissions"

const GlobalMixins = [
    request,
    common,
];


export {
    GlobalMixins,
    sidebar,
    permissions
}
