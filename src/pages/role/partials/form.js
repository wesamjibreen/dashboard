const form = {
    config: {
        resource: "role",
    },
    inputs: [
        {
            component: "input",
            model: "name",
            label : "role_name",
        },
        {
            component: "permission",
            model: "permissions",
            label: "permissions",
            endPoint: {name: "role.permissions"}
        },
    ]

};

export default form;
