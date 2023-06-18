<template>
    <VDropdown id="profile_drop_down" right spaced class="user-dropdown is-spaced profile-dropdown">
        <template #button="{ toggle }">
            <a
                class="is-trigger dropdown-trigger"
                aria-haspopup="true"
                @click="toggle"
            >
                <VAvatar picture="/panel/images/avatars/svg/vuero-1.svg"/>
            </a>
        </template>

        <template #content>
            <div class="dropdown-head py-2">
                <VAvatar
                    size="medium"
                    picture="/panel/images/avatars/svg/vuero-1.svg"
                />

                <div class="meta">
          <span>
            {{ user?.name }}
          </span>
                    <span>{{ user?.email }}</span>
                </div>
            </div>
            <div v-for="(item, index) in profileQuickMenu">
                <div style="cursor: pointer" @click="action(item, index)" role="menuitem" class="dropdown-item is-media">
                    <div class="icon">
                        <i aria-hidden="true" :class="`${item.icon}`"></i>
                    </div>
                    <div class="meta">
                        <span>{{ trans(item?.label) }}</span>
                        <span>{{ trans(item?.description) }}</span>
                    </div>
                </div>

                <hr class="dropdown-divider"/>
            </div>


            <!--      <a href="#" role="menuitem" class="dropdown-item is-media">-->
            <!--        <div class="icon">-->
            <!--        <i aria-hidden="true" class="lnil lnil-briefcase"></i>-->
            <!--        </div>-->
            <!--        <div class="meta">-->
            <!--        <span>Projects</span>-->
            <!--        <span>All my projects</span>-->
            <!--        </div>-->
            <!--      </a>-->
            <!--        <hr class="dropdown-divider"/>-->
            <!--      <a href="#" role="menuitem" class="dropdown-item is-media">-->
            <!--        <div class="icon">-->
            <!--        <i aria-hidden="true" class="lnil lnil-users-alt"></i>-->
            <!--        </div>-->
            <!--        <div class="meta">-->
            <!--        <span>Team</span>-->
            <!--        <span>Manage your team</span>-->
            <!--        </div>-->
            <!--      </a>-->

            <!--      <hr class="dropdown-divider"/>-->

            <!--      <a href="#" role="menuitem" class="dropdown-item is-media">-->
            <!--        <div class="icon">-->
            <!--        <i aria-hidden="true" class="lnil lnil-cog"></i>-->
            <!--        </div>-->
            <!--        <div class="meta">-->
            <!--        <span>Settings</span>-->
            <!--        <span>Account settings</span>-->
            <!--        </div>-->
            <!--      </a>-->

            <!--      <hr class="dropdown-divider"/>-->

            <div class="dropdown-item is-button">
                <VButton
                    class="logout-button"
                    icon="feather:log-out"
                    color="primary"
                    role="menuitem"
                    raised
                    @click="logout"
                    fullwidth
                >
                    {{ trans("logout") }}
                </VButton>
            </div>
        </template>
    </VDropdown>
</template>
<script>
import {LOGOUT} from "../../../store/modules/auth.module";
import {mapState} from "vuex";

export default {
    methods: {
        logout() {
            this.$router.push({name: "login"}).then(() => {
                this.$store.dispatch(LOGOUT);
                this.$bus.emit("logout");

                // clear local storage data
                // localStorage.removeItem(`${this.$base}_determinant`);
                // localStorage.removeItem(`${this.$base}_determinant_key`);
            });
        },
        action(item, index) {
            var profileDropdown = document.getElementById("profile_drop_down");
            profileDropdown.classList.remove("is-active");
            this.$router.push(item.to);
        }
    },
    computed: {
        ...mapState({
            user: (state) => state.auth.user,
        }),
        profileQuickMenu() {
            return this.appConfig("profile_quick_menu", []);

        },
    },
};
</script>
