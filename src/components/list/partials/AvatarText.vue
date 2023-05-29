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
        const getValue = function (attribute) {
            let model = props.column?.model ?? {};
            return _.get(props.row, model[attribute] ?? attribute, "");
        };
        return {
            getValue
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
