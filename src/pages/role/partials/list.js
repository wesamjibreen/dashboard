// import countries from "../../../../../../../panel/src/data/countries";

const resource = "role";

const columns = [
  {
    text: "name",
    value: "name",
  }
];

const config = {
  importBtn: false,
  pdfBtn: false,
  excelBtn: false
};

const filters = [];

const actions = [
  {
    slug: "edit",
    color: "success",

  },
  {
    slug: "delete",
    color: "danger",
  },
];

export {
  resource,
  filters,
  columns,
  config,
  actions
}
