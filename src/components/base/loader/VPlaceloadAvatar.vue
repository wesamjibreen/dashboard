<script>
// export type VPlaceloadAvatarSize = 'small' | 'medium' | 'large' | 'big' | 'xl'
// export type VPlaceloadAvatarRounded = 'full' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export default {
    props: {
        size: {
            default: undefined
        },
        rounded: {
            default: "full"
        },
        centered: Boolean,
        disabled: Boolean,
    },
    setup(props) {
        return {
            props
        }
    }
}
</script>

<template>
    <div class="placeload-avatar" :class="[
      !props.disabled && `loads`,
      props.size && `is-${props.size}`,
      props.centered && `is-centered`,
      props.rounded && `is-rounded-${props.rounded}`,
    ]"></div>
</template>
