const resource = "admin";
const columns = [
  {
    text: "name",
    value: "name"
  },
  {
    text: "email",
    value: "email"
  },
  {
    text: "role_name",
    value: "role_name"
  },
];

const filters = [
  {
    component: "input",
    model: "name",
    label: "name"
  },
];
const config = {
  importBtn: false,
  pdfBtn: false,
  excelBtn: false,
}
const actions = [
  {
    slug: "edit",
    color: "success",
    // icon: "fa fa-edit",
    // callback: function (row) {
    //     this.$router.push({name: "country.edit", params: {id: row.id}});
    // }
  },
  {
    slug: "delete",
    color: "danger",
  }
];

export {
  resource,
  filters,
  columns,
  actions,
  config
}
