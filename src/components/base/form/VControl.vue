<script>
    import {mapState} from "vuex";

    export default {
        props: {
            icon: String,
            isValid: Boolean,
            hasError: Boolean,
            loading: Boolean,
            expanded: Boolean,
            textaddon: Boolean,
            nogrow: Boolean,
            subcontrol: Boolean,
            model: String,
        },
        inject: ['formModule'],

        computed: {
            isIconify() {
                return this.icon && this.icon.indexOf(':') !== -1
            },
            $error() {
                return _.find(this.$validator ?? [], (error) => {
                    return error.$property === this.model;
                })
            },
            $validator() {
                return _.get(this, `form.validator`, []);
            },
            form() {
                return _.get(this, `state.${this.formModule}`, {});
            },
            hasError() {
                return this.$error?.$message && this.form?.isSubmitted;
            },
            isValid() {
                return false && !this.hasError;
            },
            ...mapState({
                state: (state) => state,
                // errorsBag: (state) => {
                //     return _.get(state,`${this.formModule}.errors.${this.model}`,[])
                // }
            })
        }
    }
</script>

<template>
    <div class="control" :class="[
      icon && 'has-icon',
      loading && 'is-loading',
      expanded && 'is-expanded',
      nogrow && 'is-nogrow',
      textaddon && 'is-textarea-addon',
      isValid && 'has-validation has-success',
      hasError && 'has-validation has-error',
      subcontrol && 'subcontrol',
    ]">
        <slot></slot>
        <div v-if="icon" class="form-icon">
            <Icon v-if="isIconify" aria-hidden="true" class="iconify" :icon="icon"></Icon>
            <i v-else aria-hidden="true" :class="icon"></i>
        </div>
        <div v-if="isValid" class="validation-icon is-success">
            <Icon aria-hidden="true" class="iconify" icon="feather:check"></Icon>
        </div>
        <div v-else-if="hasError" class="validation-icon is-error">
            <Icon aria-hidden="true" class="iconify" icon="feather:x"></Icon>
        </div>
        <slot name="extra">

        </slot>
    </div>
</template>

<style lang="scss">
    .is-nogrow {
        flex-grow: 0 !important;
    }

    .control.has-validation.has-error .multiselect {
        border-color: var(--danger) !important;
        box-shadow: var(--light-box-shadow);
        border: solid 1px;
        border-radius: 5px;
    }

    .control.has-icon.has-validation.has-error textarea.textarea {
        border-color: var(--danger) !important;
        box-shadow: var(--light-box-shadow);
        border: solid 1px;
        border-radius: 5px;
    }

</style>
