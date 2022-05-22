const form = {
    config: {
        resource: "admin",
    },

    inputs: [
      {
        component: 'input',
        model: 'name',
        label: 'name',
        cols : 6,
        rules: {
          required: true,
        },
        multiLang: false,
      },
      {
        component: 'input',
        model: 'email',
        label: 'email',
        cols : 6,
        rules: {
          required: true,
        },
        multiLang: false,
      },
      {
        component: "select",
        model: "role_id",
        label: "role_menu",
        multiple: false,
        cols: 6,
        endPoint: {name: "role.index", params: {no_pagination: true,admin:true}},

        rules: {
          required: false
        }
      },
      {
        component: 'input',
        model: 'password',
        label: 'password',
        cols : 6,
        rules: {
          required: false,
        },
        multiLang: false,
      },
    ]
};

export default form;
