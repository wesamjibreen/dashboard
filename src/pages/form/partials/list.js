// import countries from "../../../../../../../panel/src/data/countries";

const resource = "country";

const columns = [
    {
        text: "icon",
        value: "icon_url",
        component: "image-holder",
    },
    {
        text: "name",
        value: "name",
    },
    {
        text: "mobile_intro",
        value: "intro",
    },
    {
        text: "country_code",
        value: "code",
    }
    // {
    //     text: "telly",
    //     value: "value",
    //     sortable: true
    // },
    // {
    //     text: "ACTIONS",
    //     value: "actions"
    // },
];

const filters = [
    {
        component: "input",
        model: "name",
        label: "name"
    }
];

const actions = [
    {
        slug: "edit",
        color: "success",
        icon: "fa fa-edit",
        callback: function (resource, row) {
            this.$router.push({name: "form.edit", params: {id: row.id}});
        }
    },
    {
        slug: "delete",
        color: "danger",
        icon: "fa fa-trash",
        callback: function (resource, row) {
            Bus.emit('confirmation-dialog',
                true,
                {
                    title: "sure_to_delete",
                    message: "",
                    type: "warning",
                    callback: () => {
                        this.loading = true;
                        this.request(
                            this.$endPoint('form.delete', row.id),
                            {},
                            ({data}) => {
                                this.value = false;
                                Bus.emit('confirmation-dialog', false);
                                Bus.emit(`reload-table-${resource}`);
                            },
                            () => {
                                alert('error');
                            },
                            () => {
                                this.loading = false;
                            }
                        );
                        alert('delete');
                    }
                },
            );
            // this.$router.push({name: "country.edit", params: {id: 1}});
        }
    }
];

export {
    resource,
    filters,
    columns,
    actions
}
