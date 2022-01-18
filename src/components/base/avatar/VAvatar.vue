<script>
    import {useViaPlaceholderError} from '../../../composable/useViaPlaceholderError';
    export default {
        setup() {
            return {
                useViaPlaceholderError
            }
        },
        props: {
            picture: {
                default: undefined
            },
            pictureDark: {
                default: undefined
            },
            placeholder : {
                default:  'https://via.placeholder.com/50x50'
            },
            initials : {
                default:  '?'
            },
            badge : {
                default: undefined
            },
            size : {
                default: undefined
            },
            color : {
                default: undefined
            },
            squared : {
                default: undefined
            },
            dotColor : {
                default: undefined
            }
        }
    }
</script>

<template>
    <div class="v-avatar"
            :class="[
      size && `is-${size}`,
      dot && 'has-dot',
      dotColor && `dot-${dotColor}`,
      squared && dot && 'has-dot-squared',
    ]">
        <slot name="avatar">
            <img v-if="picture" class="avatar" :class="[ squared && 'is-squared', pictureDark && 'light-image' ]"
                 :src="picture"
                 alt=""
                 @error.once="(event) => useViaPlaceholderError(event, '150x150')"/>
            <span
                    v-else
                    class="avatar is-fake"
                    :class="[
          squared && 'is-squared',
          color && `is-${color}`,
        ]"
            >
        <span>{{ initials }}</span>
      </span>
            <img
                    v-if="picture && pictureDark"
                    class="avatar dark-image"
                    :class="[squared && 'is-squared']"
                    :src="pictureDark"
                    alt=""
                    @error.once="(event) => useViaPlaceholderError(event, '150x150')"
            />
        </slot>

        <slot name="badge">
            <img
                    v-if="badge"
                    class="badge"
                    :src="badge"
                    alt=""
                    @error.once="(event) => useViaPlaceholderError(event, '150x150')"
            />
        </slot>
    </div>
</template>
