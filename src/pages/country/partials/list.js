const resource = "country";
const columns = [
    {
        text: "ICON",
        value: "icon_url",
        component: "image-holder",
    },
    {
        text: "NAME",
        value: "name",
        sortable: true
    },
    {
        text: "INTRO",
        value: "intro",
        sortable: true
    },
    // {
    //     text: "ACTIONS",
    //     value: "actions"
    // },
];

const actions = [
    {
        slug: "edit",
        color: "success",
        icon: "fa fa-edit",
        callback: function (row) {
            this.$router.push({ name: "country.edit", params: { id: row.id } });
        }
    },
    {
        slug: "delete",
        color: "danger",
        icon: "fa fa-trash",
        callback: function (row, resource) {
            console.log('deleteRow', row);
            Bus.emit('confirmation-dialog',
                true,
                {
                    title: "sure_to_delete",
                    message: "",
                    type: "warning",
                    callback: () => {
                        this.loading = true;
                        this.request(
                            this.$endPoint('country.delete', row.id),
                            {},
                            ({ data }) => {
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
                        )
                        alert('delete');
                    }
                },
            );
            // this.$router.push({name: "country.edit", params: {id: 1}});
        }
    },
    // {
    //     slug: "cancel",
    //     color: "danger",
    // },
];

export {
    resource,
    columns,
    actions,
}
