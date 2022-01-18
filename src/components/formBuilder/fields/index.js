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
    ImageField: "./ImageField.vue",
    TimeField: "./TimeField.vue",
    FileField: "./FileField.vue",
    InputField: "./InputField.vue",
    DropzoneField: "./DropzoneField.vue",
    CheckboxField: "./CheckboxField.vue",
    RadioField: "./RadioField.vue",
    SelectField: "./SelectField.vue",
    TagsField: "./TagsField.vue",
    SwitchField: "./SwitchField.vue",
    TextareaField: "./TextareaField.vue",
    DateRangeField: "./DateRangeField.vue",
    DateField: "./DateField.vue",
    EditorField: "./EditorField.vue",
    MapField: "./MapField.vue",
    CrudField: "./Crud/Index.vue",
    RepeaterField: "./Repeater/Index.vue",
};
export default resolveComponents(components);