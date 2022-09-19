<template>
    <GDialog v-model="value" max-width="400">
        <div class="getting-started-example-styled">
            <div class="getting-started-example-styled__content">
                <div class="getting-started-example-styled__title">
                    {{ title$ }}
                </div>
                <span v-if="message$" class="message-span" :class="`is-${type}`">
                   {{ message$ }}
                </span>
                <!--<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione! </p>-->
            </div>

            <div class="getting-started-example-styled__actions">
                <VButton @click="value = false" outlined class="ml-1 mr-1">
                    {{ trans('cancel') }}
                </VButton>
                <VButton :loading="loading" @click="onConfirm" color="success" outlined light class="ml-1 mr-1">
                    {{trans('confirm')}}
                </VButton>
            </div>
        </div>
    </GDialog>
</template>

<script>
    import {GDialog} from 'gitart-vue-dialog'

    export default {
        name: "PopDialog",
        components: {
            GDialog
        },
        data() {
            return {
                loading: false,
                value: false,
                title: "",
                message: "",
                type: "info",
                callback: null
            }
        },
        created() {
            this.$bus.on('Popconfirmation-dialog', (value, config = {}) => {
                this.loading = false;
                this.title = this.trans(config.title);
                this.message = config.message;
                this.type = config.type;
                this.callback = config.callback;
                this.value = value;
            });
        },
        methods: {
            onConfirm() {
                this.loading = true;
                this.callback.bind(this).call();
            }
        },
        computed: {
            title$() {
                return this.title ?? this.trans('sure_to_cancel');
            },
            message$() {
                return this.message ?? null;
            }
        }
    }
</script>

<style lang="scss">
    @import '~gitart-vue-dialog/dist/style.css';

    .getting-started-example-styled {
        &__content {
            padding: 20px;
        }

        &__title {
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 20px;
        }

        &__actions {
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
        }
    }

    .getting-started-example-styled__title {
        text-align: center;
    }

    .getting-started-example-styled__actions {
        justify-content: center;
    }

    .getting-started-example-styled__actions {
        justify-content: center;
        direction: ltr;
    }

    .getting-started-example-styled__title {
        font-size: 20px !important;
    }

    html[dir="rtl"] {
        .getting-started-example-styled__actions {
            justify-content: center;
            direction: rtl !important;
        }

        .getting-started-example-styled__title {
            font-family: 'Cairo', serif;
        }
    }

    .alert-icon img {
        width: 30%;
    }

    .alert-icon {
        display: flex;
        justify-content: center;
    }

    .getting-started-example-styled__actions button {
        width: 40% !important;
        height: 40px !important;
    }
</style>