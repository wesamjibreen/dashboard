<template>
    <div class="dashboard-card">
        <div class="card-head">
            <h3 class="dark-inverted">Todo Today</h3>
            <a class="action-link">View All</a>
        </div>
        <div class="active-list">
            <div class="checkboxes-list">
                <!-- List item -->
                <div class="list-item">
                    <!-- Animated checkbox-->
                    <checkbox-field v-model="check" value="value_1"/>
                    <div class="item-meta">
                        <span class="dark-inverted">Call Mr. Markstrom</span>
                        <span>Review the project initial wireframes</span>
                    </div>
                </div>
                <!-- List item -->
                <div class="list-item">
                    <!-- Animated checkbox-->
                    <checkbox-field v-model="check" value="value_2"/>
                    <div class="item-meta">
                        <span class="dark-inverted">Finish wireframes</span>
                        <span>Make all requested changes and publish</span>
                    </div>
                </div>
                <!-- List item -->
                <div class="list-item">
                    <!-- Animated checkbox-->
                    <checkbox-field v-model="check" value="value_3"/>
                    <div class="item-meta">
                        <span class="dark-inverted">Update timesheets</span>
                        <span>Update all the team timesheets</span>
                    </div>
                </div>
                <!-- List item -->
                <div class="list-item">
                    <!-- Animated checkbox-->
                    <checkbox-field v-model="check" value="value_4"/>
                    <div class="item-meta">
                        <span class="dark-inverted">Request payout</span>
                        <span>send project invoice to client</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "TodoList",
    data() {
        return {
            check: false,



        };
    },
    props: {
    
    },
    setup(props, context) {

    }
}
</script>
<style lang="scss">
@import '../../../scss/abstracts/mixins';

.is-navbar {
    .personal-dashboard {
        margin-top: 30px;
    }
}

.personal-dashboard-v2 {
    .dashboard-header {
        @include vuero-s-card();

        display: flex;
        align-items: center;
        padding: 30px;

        .user-meta {
            padding: 0 3rem;
            border-right: 1px solid var(--fade-grey-dark-3) h3 {
                max-width: 180px;
            }
        }

        .user-action {
            padding: 0 3rem;
        }

        .cta {
            position: relative;
            flex-grow: 2;
            max-width: 275px;
            margin-left: auto;
            background: var(--primary-light-8);
            padding: 20px;
            border-radius: var(--radius-large);
            box-shadow: var(--primary-box-shadow);

            .lnil,
            .lnir {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                font-size: 4rem;
                opacity: 0.3;
            }

            .link {
                font-family: var(--font-alt);
                display: block;
                font-weight: 500;
                margin-top: 0.5rem;

                &:hover {
                    color: var(--smoke-white);
                    opacity: 0.6;
                }
            }
        }
    }

    .dashboard-card {
        @include vuero-s-card();

        padding: 30px;

        &:not(:last-child) {
            margin-bottom: 1.5rem;
        }

        .card-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;

            h3 {
                font-family: var(--font-alt);
                font-size: 1rem;
                font-weight: 600;
                color: var(--dark-text);
                margin-bottom: 0;
            }
        }

        .active-projects,
        .active-team,
        .active-list {
            padding: 10px 0;
        }
    }
}

.is-dark {
    .personal-dashboard-v2 {
        .dashboard-header,
        .dashboard-card {
            @include vuero-card--dark();
        }

        .home-header {
            .cta {
                background: var(--primary-light-2);
                box-shadow: var(--primary-box-shadow);
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .personal-dashboard-v2 {
        .dashboard-header {
            flex-direction: column;
            text-align: center;

            .v-avatar {
                margin-bottom: 10px;
            }

            .user-meta {
                padding-top: 10px;
                padding-bottom: 10px;
                border: none;
            }

            .user-action {
                padding-bottom: 30px;
            }

            .cta {
                margin-left: 0;
            }
        }

        .active-projects {
            .media-flex-center {
                .flex-end {
                    .avatar-stack {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>
