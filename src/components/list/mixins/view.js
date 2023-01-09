// import {getValueByLocale} from "../../../utils/helper";
import Action from "../partials/Action";
import Cancel from "../partials/Cancel";
import ImageHolder from "../partials/ImageHolder";
import EditableInput from "../partials/EditableInput";
import SwitchStatus from "../partials/SwitchStatus";
import StatusLabel from "../partials/StatusLabel";
import CheckboxField from "../../formBuilder/fields/CheckboxField";

export default {
    props: {
        resource: String,
        selectable: String,
        selectableCallback: Function,
        rows: Array,
        actions: Array,
        actionGroups: Array,
        columns: Array
    },
    components: {
        CheckboxField,
        StatusLabel,
        SwitchStatus,
        EditableInput,
        ImageHolder,
        Action,
        Cancel
    },
    data: () => ({
        selected: []
    }),
    methods: {
        getRowValue(column, row, defaultVal = "") {
            if (column.value instanceof Function)
                return column.value(row);

            return this.getValueByLocale(_.get(row, column.value, defaultVal ?? ""));
        },
        onSelectAllChange($event) {
            let value = $event.target.checked;
            if (value)
                this.selected = _.map(this.rows, (row) => {
                    return row.id
                });
            else
                this.selected = [];
        },
        isSelectable(row) {
            if (this.selectableCallback)
                return this.selectableCallback(row);
            return true;
        }
    },
    watch: {
        selected: {
            deep: true,
            handler(newVal) {
                this.$emit('select', newVal);
            }
        }
    }
}