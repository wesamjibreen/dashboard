const form = {
    config: {
        resource: "country",
    },
    data: [
        {
            title: "Personal Info",
            description: "This helps us to know you",
            inputs: [
                {
                    component: "input",
                    model: "name",
                    label: "name",
                    rules: {
                        required: true
                    },
                    cols: 6,
                    multiLang: true,
                },
                {
                    component: "tags",
                    model: "keywords",
                    label: "keywords",
                    rules: {
                        required: false
                    },
                    cols: 6,
                    multiLang: true
                },
                {
                    component: "input",
                    model: "intro",
                    label: "intro",
                    cols: 6,
                    rules: {
                        required: true
                    }
                },
                {
                    component: "input",
                    model: "telly",
                    label: "telly",
                    cols: 6,
                    rules: {
                        required: true
                    }
                },
                {
                    component: "date",
                    model: "timezone",
                    label: "timezone",
                    cols: 6,
                    rules: {
                        required: true
                    }
                },
                {
                    component: "select",
                    model: "language_ids",
                    cols: 6,
                    label: "language.name",
                    multiple: true,
                    endPoint: {name: "language.index", params: {no_pagination: true}},
                    rules: {
                        required: true
                    }
                },

                {
                    component: "select",
                    model: "currency_id",
                    label: "currency_name",
                    multiple: false,
                    cols: 6,
                    endPoint: {name: "currency.index", params: {no_pagination: true}},
                    rules: {
                        required: false
                    }
                },
                {
                    component: 'textarea',
                    model: 'license_agreement',
                    label: 'license_agreement',
                    rules: {
                        required: true,
                    },
                    multiLang: true

                },
                {
                    component: "image",
                    model: "icon",
                    label: "ICON",
                    image_url_option: "icon_url",
                    class: "col-md-6",
                    styleAttribute: "width:100px !important ;height : 100px !important"
                },
                {
                    component: "crud",
                    label: "order_cancellation_reason",
                    model: "order_cancellation_reason",
                    slug: "order_cancellation_reason",
                    columns: [
                        {
                            label: "title",
                            value: "title"
                        },


                    ],
                    inputs: [
                        {
                            component: 'input',
                            model: 'title',
                            label: 'title',
                            rules: {
                                required: false,
                            },
                            multiLang: true,
                        },
                        {
                            component: "select",
                            model: "type",
                            label: "type",
                            multiple: false,
                            cols: 6,
                            data: [
                                {id: "customer", name: "customer"},
                                {id: "restaurant", name: "restaurant"},
                                {id: "cashier", name: "cashier"},
                            ],
                            rules: {
                                required: true
                            }
                        },
                        // {

                    ],

                },
                {
                    component: "repeater",
                    label: "order_cancellation_reason",
                    model: "order_cancellation_reason_repeater",
                    inputs: [
                        {
                            component: 'input',
                            model: 'title',
                            label: 'title',
                            rules: {
                                required: false,
                            },
                            // multiLang: true,
                        },
                        {
                            component: "select",
                            model: "type",
                            label: "type",
                            multiple: false,
                            cols: 6,
                            data: [
                                {id: "customer", name: "customer"},
                                {id: "restaurant", name: "restaurant"},
                                {id: "cashier", name: "cashier"},
                            ],
                            rules: {
                                required: true
                            }
                        },
                    ],

                },
                // {
                //     component: "crud",
                //     dialog: true,
                //     model: "order_cancellation_reason",
                //     label: "order_cancellation_reason",
                //     dialogResource: "order_cancellation_reason",
                //     addToForm: ({context}) => {
                //         context.$setValue('type', 'customer');
                //     },
                //
                //     inputs: [
                //
                //
                //     ]
                // },

                // {
                //     component: "input",
                //     cols: 6,
                //     label: "name",
                //     model: "name",
                //     multiLang: true,
                // },
                // {
                //     component: "tags",
                //     cols: 6,
                //     label: "keywords",
                //     model: "keywords",
                //     multiLang: true,
                // },
                // {
                //     component: "editor",
                //     model: "licence_agreement",
                //     label : "licence_agreement",
                //     cols: 12,
                // },
            ]
        },
    ]
};

export default form;
