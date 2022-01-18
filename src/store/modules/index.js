import auth from "./auth.module";
import setting from "./setting.module";
// import form from "./form.module";
// import dialog from "./dialog.module";

const buildModules = function ({base}) {
    return {
        auth: auth(base),
        setting
    };
};

export {
    buildModules
};