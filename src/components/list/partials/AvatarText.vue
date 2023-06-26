<template>
    <div class="avatar-text">
        <VAvatar :picture="getValue('avatar')" size="medium" squared/>
        <div>
            <span class="item-name dark-inverted is-font-alt is-weight-600">
                {{ getValue('title') }}
            </span>
            <span class="item-meta">
                <span>
                    {{ getValue('text') }}
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import {useI18n} from "vue-i18n";

export default {
    name: "AvatarText",
    props: {
        row: {
            required: true
        },
        column: {
            required: true,
        },
    },
    setup(props) {
        const { locale } = useI18n();

        const valueByLocale = (value) => {
            return _.get(value, locale.value ?? "ar", value);
        }


        const getValue = function (attribute) {
            let model = props.column?.model ?? {};
            return valueByLocale(_.get(props.row, model[attribute] ?? attribute, ""));
        };
        return {
            getValue,
            valueByLocale
        }
    }
}
</script>

<style>
.avatar-text {
    display: flex;
    padding: 0 10px;
}
</style>
