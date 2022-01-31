import {defineAsyncComponent} from 'vue'


const resolveComponents = function (components) {
    let resolvedComponents = {};
    Object.entries(components).forEach((component) => {
        resolvedComponents[component[0]] = defineAsyncComponent(() =>
            import(`${component[1]}`)
        );
    });
    return resolvedComponents;
};


const components = {
    ImageField:  "./ImageField.vue",
    TimeField: "./TimeField.vue",
    FileField: "./FileField.vue",
    InputField: "./InputField.vue",
    CheckboxField: "./CheckboxField.vue",
    RadioField: "./RadioField.vue",
    SelectField: "./SelectField.vue",
    TagsField: "./TagsField.vue",
    SwitchField: "./SwitchField.vue",
    TextareaField: "./TextareaField.vue",
    DateRangeField: "./DateRangeField.vue",
    DateField: "./DateField.vue",
    ColorField: "./ColorField.vue",
    MultipleDateField: "./MultipleDateField.vue",
    EditorField: "./EditorField.vue",
    MapField: "./MapField.vue",
    CrudField: "./Crud/Index.vue",
    RepeaterField: "./Repeater/Index.vue",
};
export default resolveComponents(components);


// import ImageField  from "./ImageField.vue";
// import TimeField  from "./TimeField.vue";
// import FileField  from "./FileField.vue";
// import InputField  from "./InputField.vue";
// import DropzoneField  from "./DropzoneField.vue";
// import CheckboxField  from "./CheckboxField.vue";
// import RadioField  from "./RadioField.vue";
// import RepeaterField  from "./Repeater/Index.vue";
// import CrudField  from "./Crud/Index.vue";
// import MapField  from "./MapField.vue";
// import EditorField  from "./EditorField.vue";
// import ColorField  from "./ColorField.vue";
// import DateField  from "./DateField.vue";
// import TextareaField  from "./TextareaField.vue";
// import SwitchField  from "./SwitchField.vue";
// import TagsField  from "./TagsField.vue";
// import SelectField  from "./SelectField.vue";
//
// const components = {
//     ImageField,
//     TimeField,
//     FileField,
//     InputField,
//     DropzoneField,
//     CheckboxField,
//     RadioField,
//     SelectField,
//     TagsField,
//     SwitchField,
//     TextareaField,
//     DateField,
//     ColorField,
//     EditorField,
//     MapField,
//     CrudField,
//     RepeaterField,
// };