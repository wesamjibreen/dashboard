const form = {
    config: {
        resource: "form",
    },
    data: [
        {
            title: "Test 1",
            description: "This helps us to know you",
            inputs: [
                {
                    component: "repeater",
                    label: "repeater",
                    model: "repeater",
                    inputs: [
                        {
                            component: 'input',
                            model: 'title',
                            label: 'title',
                        },
                        {
                            component: "select",
                            model: "country_id",
                            label: "country_name",
                            endPoint: {name: "country.index", params: {no_pagination: true}},
                        },
                        // {
                        //     component: "image",
                        //     model: "icon",
                        //     label: "ICON",
                        //     image_url_option: "icon_url"
                        // },
                    ],

                },


                {
                    component: "select",
                    model: "type",
                    label: "type",
                    data: [
                        {
                            id: 1,
                            name: "Customer"
                        },
                        {
                            id: 2,
                            name: "Restaurant"
                        },
                        {
                            id: 3,
                            name: "Admin"
                        }
                    ],
                },
                {
                    component: "checkbox",
                    model: "checkbox",
                    label: "checkbox",
                    cols: 6,
                    endPoint: {name: "country.index", params: {no_pagination: true}},
                },
                {
                    component: "radio",
                    model: "radio_button",
                    label: "radio",
                    cols: 6,
                    endPoint: {name: "language.index", params: {no_pagination: true}},
                },
            ]
        },
        {
            title: "Test 2",
            description: "This helps us to know you",

            // show: function () {
            //     // alert('ok');
            //     // console.log('polygon input', form);
            //     return !this.form?.type
            // },
            inputs: [

                {
                    component: "file",
                    label: "images",
                    model: "multiple_image",
                    crop: true,
                    ratio: 1
                },
                {
                    component: "multiple-date",
                    model: "multiple_date_picker",
                    label: "datepicker",
                },

                {
                    component: "date",
                    model: "date_picker",
                    label: "datepicker",
                    // inline : true,
                    cols: 6,
                    mode: 'multiple'
                },

                {
                    component: "date-range",
                    model: "date_range_picker",
                    label: "date_range_picker",
                    cols: 6,
                },
                {
                    component: "time",
                    model: "time_picker",
                    label: "time_picker",
                    cols: 6,
                },
                {
                    component: "map",
                    model: "coordinates",
                    label: "coordinates",
                    mode: "marker",
                    // mode: "marker",
                    multiple: true,
                    // show  : "this.form?.type !== 1",

                    // show: function (form) {
                    //     alert('ok');
                    //     console.log('polygon input', form);
                    //     return form?.type === 1
                    // }
                }
            ]
        }
    ],
    // inputs: [
    //
    //
    //     // {
    //     //     component: "dropzone",
    //     //     label: "images",
    //     //     model: "multiple_image",
    //     // },
    //
    //
    //     // {
    //     //     component : "checkbox",
    //     //     model: "checkbox",
    //     //     options : [
    //     //         {
    //     //             id : 1,
    //     //             name : "customer"
    //     //         },
    //     //         {
    //     //             id : 2,
    //     //             name : "tech"
    //     //         },
    //     //
    //     //     ]
    //     //     // endPoint: {name: "country.index", params: {no_pagination: true}},
    //     // }
    //
    //
    //     // {
    //     //     component: "input",
    //     //     model: "name",
    //     //     label: "name",
    //     //     rules: {
    //     //         required: true
    //     //     },
    //     //     multiLang: true,
    //     // },
    //     // {
    //     //     component: 'editor',
    //     //     model: 'terms',
    //     //     label: 'terms_and_conditions',
    //     //     rules: {
    //     //         required: true,
    //     //     },
    //     //     multiLang: true
    //     // },
    //     // {
    //     //     component: "input",
    //     //     model: "intro",
    //     //     label: "mobile_intro",
    //     //     rules: {
    //     //         required: true
    //     //     },
    //     //     cols: 6,
    //     // },
    //     //
    //     // {
    //     //     component: "select",
    //     //     model: "languages",
    //     //     label: "languages",
    //     //     multiple: true,
    //     //     endPoint: {name: "language.index", params: {no_pagination: true}},
    //     //     rules: {
    //     //         required: true
    //     //     }
    //     // },
    //     // {
    //     //     component: "crud",
    //     //     label: "cities",
    //     //     model: "cities",
    //     //     slug: "city",
    //     //     columns: [
    //     //         {
    //     //             label: "name",
    //     //             value: "name"
    //     //         },
    //     //     ],
    //     //     inputs: [
    //     //         {
    //     //             component: 'input',
    //     //             model: 'name',
    //     //             label: 'name',
    //     //             rules: {
    //     //                 required: true,
    //     //             },
    //     //             multiLang: true,
    //     //         },
    //     //     ],
    //     //
    //     // },
    //     // {
    //     //     component: "crud",
    //     //     label: "on_boarding_screens",
    //     //     model: "on_boarding_screens",
    //     //     slug: "on_boarding_screen",
    //     //     columns: [
    //     //         {
    //     //             label: "text",
    //     //             value: "title"
    //     //         },
    //     //         {
    //     //             label: "image",
    //     //             value: "image_url",
    //     //             component: "image-holder",
    //     //             classes: ["on-boarding-screen"]
    //     //         }
    //     //     ],
    //     //     inputs: [
    //     //         {
    //     //             component: 'editor',
    //     //             model: 'title',
    //     //             label: 'text',
    //     //             // rules: {
    //     //             //     required: true,
    //     //             // },
    //     //             multiLang: true,
    //     //         },
    //     //         {
    //     //             component: "image",
    //     //             model: "image",
    //     //             label: "image",
    //     //             image_url_option: "image_url",
    //     //         },
    //     //     ],
    //     //
    //     // },
    //
    //
    //     // 'currency_id',
    //     // 'code',
    //     // 'intro',
    //     // 'terms',
    //     // 'name'
    //
    //
    //     // {
    //     //     component: "tags",
    //     //     model: "keywords",
    //     //     label: "keywords",
    //     //     rules: {
    //     //         required: false
    //     //     },
    //     //     cols: 6,
    //     //     multiLang: true
    //     // },
    //     // {
    //     //     component: "input",
    //     //     model: "intro",
    //     //     label: "intro",
    //     //     cols: 6,
    //     //     rules: {
    //     //         required: true
    //     //     }
    //     // },
    //     //
    //     //
    //     // {
    //     //     component: "date",
    //     //     model: "timezone",
    //     //     label: "timezone",
    //     //     cols: 6,
    //     //     rules: {
    //     //         required: true
    //     //     }
    //     // },
    //     // {
    //     //     component: "date-range",
    //     //     model: "timezone_range",
    //     //     label: "timezone_range",
    //     //     cols: 6,
    //     //     rules: {
    //     //         required: true
    //     //     }
    //     // },
    //     // {
    //     //     component: "select",
    //     //     model: "language_ids",
    //     //     cols: 6,
    //     //     label: "language.name",
    //     //     multiple: true,
    //     //     endPoint: {name: "language.index", params: {no_pagination: true}},
    //     //     rules: {
    //     //         required: true
    //     //     }
    //     // },
    //     //
    //     // {
    //     //     component: "select",
    //     //     model: "currency_id",
    //     //     label: "currency_name",
    //     //     multiple: false,
    //     //     cols: 6,
    //     //     endPoint: {name: "language.index", params: {no_pagination: true}},
    //     //
    //     //     // endPoint: {name: "currency.index", params: {no_pagination: true}},
    //     //     rules: {
    //     //         required: false
    //     //     }
    //     // },
    //     //
    //     // {
    //     //     component: "image",
    //     //     model: "icon",
    //     //     label: "ICON",
    //     //     image_url_option: "icon_url",
    //     //     // class: "col-md-6",
    //     //     // styleAttribute: "width:100px !important ;height : 100px !important"
    //     // },
    //     //
    //     // {
    //     //     component: "crud",
    //     //     label: "order_cancellation_reason",
    //     //     model: "order_cancellation_reason",
    //     //     slug: "order_cancellation_reason",
    //     //     columns: [
    //     //         {
    //     //             label: "title",
    //     //             value: "title"
    //     //         },
    //     //     ],
    //     //     inputs: [
    //     //         {
    //     //             component: 'input',
    //     //             model: 'title',
    //     //             label: 'title',
    //     //             rules: {
    //     //                 required: false,
    //     //             },
    //     //             multiLang: true,
    //     //         },
    //     //         {
    //     //             component: "select",
    //     //             model: "type",
    //     //             label: "type",
    //     //             multiple: false,
    //     //             cols: 6,
    //     //             data: [
    //     //                 {id: "customer", name: "customer"},
    //     //                 {id: "restaurant", name: "restaurant"},
    //     //                 {id: "cashier", name: "cashier"},
    //     //             ],
    //     //             rules: {
    //     //                 required: true
    //     //             }
    //     //         },
    //     //         // {
    //     //         //     component: "switch",
    //     //         //     model: "shown_text",
    //     //         //     label: "shown_text",
    //     //         //     value:0
    //     //         // },
    //     //
    //     //     ],
    //     //
    //     // },
    //
    //     // {
    //     //     component: "file",
    //     //     model: "attachments",
    //     //     label: "attachments",
    //     // },
    //
    //     // {
    //     //     component: "editor",
    //     //     model: "licence_agreement",
    //     //     label : "licence_agreement",
    //     //     cols: 12,
    //     // },
    // ]
};

export default form;
