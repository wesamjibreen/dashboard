<script setup>
    import {useHead} from '@vueuse/head'

    useHead({
        title: 'Not authorized',
    })
</script>

<template>
    <div class="error-container">
        <div class="error-wrapper">
            <div class="error-inner has-text-centered">
                <div class="bg-number dark-inverted">401</div>
                <img
                        class="light-image"
                        src="/panel/images/illustrations/placeholders/error-5.svg"
                        alt=""
                />
                <img
                        class="dark-image"
                        src="/panel/images/illustrations/placeholders/error-5-dark.svg"
                        alt=""
                />
                <h3 class="dark-inverted">Unauthorized</h3>
                <p>
                    Looks like an unexpacted problem occured. Please try again or contact
                    the website administrator.
                </p>
                <div class="button-wrap">
                    <VButton color="primary" elevated rounded @click="$router.go(-1)">
                        Take me Back
                    </VButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '../../scss/abstracts/_mixins.scss';
    @import '../../scss/pages/generic/_utility.scss';
</style>
