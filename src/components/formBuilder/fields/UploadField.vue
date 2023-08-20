<template>
    <a-upload :action="url" v-model:file-list="filesList" v-bind="config ?? {}">
        <a-button>
            <upload-outlined></upload-outlined>
            {{ trans(uploadText) }}
        </a-button>
    </a-upload>
</template>
<script>
import input from "../mixins/input";
import {useInputField} from "../composable/useInputField";

export default {
    name: "InputField",
    mixins: [input],
    props: {
        uploadText: {
            type: String,
            default: "upload"
        },
        url: {
            type: String,
            default: "/api/file/upload"
        },
        config: {
            type: Object,
            default: {}
        }
    },
    setup(props) {
        return {
            ...useInputField(props)
        };
    },
    methods: {
        sanitizeFiles(files) {
            return (files ?? []).map((el) => {
                if (el.response?.status && el.response?.data?.id)
                    el = el.response?.data;
                return {
                    uid: el.uid ?? el.id,
                    id: el.id,
                    name: el.name ?? el.display_name,
                    status: el.status ?? 'done',
                    url: el.url,
                }
            })
        }
    },
    computed: {
        filesList: {
            set(newValue) {
                this.input = this.sanitizeFiles(newValue);
            },
            get() {
                return this.sanitizeFiles(this.input);

            }
        }
    }
};
</script>
