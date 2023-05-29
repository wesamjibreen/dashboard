<template>
    <div class="status-page-wrapper">
        <div class="status-block">
            <div class="status-header">
                <div class="indicator"></div>
                <div class="title is-4">{{ title }}</div>
                <div class="subtitle is-6">{{ description }}</div>
            </div>

            <!--            <div class="status-uptime">-->
            <!--                <div class="title">Services</div>-->
            <!--                <div class="uptime">Uptime of the past 90 days</div>-->
            <!--            </div>-->

            <div class="status-list">
                <!--Status item-->

                <template v-for="item in data">
                    <div class="list-block api">
                        <div class="icon-wrap">
                            <img :src="getValue(item,'image')" alt=""/>
                        </div>
                        <div class="progress-wrap">
                            <div class="progress-wrap-inner">
                                <div>
                                    <div class="label">{{ getValue(item, 'title') }}</div>
                                    <p>{{ getValue(item, 'text') }}</p>
                                </div>
                                <div class="amount has-text-centered">
                                    <span>{{ getValue(item, 'percent') }}%</span>
                                </div>
                            </div>
                            <progress :class="`progress is-${getValue(item,'class')} is-smaller`"
                                      :value="getValue(item, 'percent')"
                                      max="100">
                                {{ getValue(item, 'percent') }}%
                            </progress>
                        </div>
                    </div>
                    <hr/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {getValueByLocale} from "../../utils/helper";

export default {
    name: "ProgressBarList",
    props: {
        title: String,
        description: String,
        titleKey: {
            type: String,
            default: "title"
        },
        textKey: {
            type: String,
            default: "text"
        },
        imageKey: {
            type: String,
            default: "image_url"
        },
        classKey: {
            type: String,
            default: 'class'
        },
        percentKey: {
            default: 'percent'
        },
        data: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const getValue = function (item, attribute = "title") {
            return getValueByLocale(_.get(item, props[`${attribute}Key`], ""));
        }

        return {
            getValueByLocale,
            getValue
        }
    }
}
</script>


<style lang="scss">
.status-page-wrapper {
    //max-width: 720px;
    //margin: 0 auto;
    //padding: 60px 16px;

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .logo {
            display: block;
            width: 50px;
            min-width: 50px;
            height: 50px;
        }
    }

    .status-block {
        background: var(--white);
        margin-bottom: 40px;
        border: 1px solid var(--fade-grey-dark-3);
        border-radius: var(--radius-large);

        .status-header {
            padding: 40px;

            .indicator {
                display: inline-block;
                width: 15px;
                height: 15px;
                border-radius: 100%;
                margin-inline-end: 20px;
                background: var(--success);
            }

            .title {
                display: inline-block;
                font-family: var(--font-alt);
                font-weight: 600;
                color: var(--dark-text);
            }

            .subtitle {
                display: block;
                margin-inline-start: 35px;
                color: var(--light-text);
            }
        }

        .status-uptime {
            border-top: 1px solid var(--fade-grey-dark-3);
            border-bottom: 1px solid var(--fade-grey-dark-3);
            padding: 16px 40px;
            font-family: var(--font);

            .title {
                display: inline-block;
                font-size: 14px;
                font-family: var(--font-alt);
                margin-bottom: 0;
                font-weight: 500;
                color: var(--light-text);
            }

            .uptime {
                display: inline-block;
                margin-inline-start: 60px;
                font-size: 14px;
                color: var(--light-text);
            }
        }

        .status-list {
            padding: 40px;

            .list-block {
                display: flex;
                align-items: center;

                .icon-wrap {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 54px;
                    width: 54px;
                    min-width: 54px;
                    border-radius: var(--radius-rounded);
                    background: var(--white);
                    border: 1px solid var(--fade-grey-dark-3);
                    box-shadow: var(--light-box-shadow);
                    color: var(--primary);
                    margin-inline-end: 12px;

                    img {
                        display: block;
                        max-width: 54px;
                        border-radius: var(--radius-rounded);
                    }
                }

                .progress-wrap {
                    flex-grow: 2;

                    .progress-wrap-inner {
                        display: flex;
                        align-items: center;
                        margin-bottom: 4px;
                    }
                }
            }

            .label {
                font-family: var(--font-alt);
                font-size: 0.95rem;
                font-weight: 600;
                margin-bottom: 0;
                line-height: 1.2;
            }

            p {
                font-size: 0.9rem;
                font-family: var(--font);
            }

            .amount {
                position: relative;
                top: -2px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                color: var(--light-text);
                margin-inline-start: auto;
                height: 40px;
                width: 40px;
                border-radius: 12px;
                border: 1px solid var(--fade-grey-dark-3);
                box-shadow: var(--light-box-shadow);

                span {
                    font-family: var(--font);
                    color: var(--dark-text);
                    font-weight: 600;
                    font-size: 0.85rem;
                }
            }
        }
    }

    .tweets-header {
        display: flex;
        align-items: center;
        padding: 24px 40px;
        border-bottom: 1px solid var(--fade-grey-dark-3);

        .icon i {
            font-size: 1.6rem;
            color: var(--twitter);
        }

        .username {
            margin-inline-start: 10px;
            font-family: var(--font-alt);
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--dark-text);
        }

        .action-link {
            margin-inline-start: auto;
        }
    }

    .status-tweets {
        .updates {
            padding: 20px 40px 40px;

            .update {
                display: flex;
                align-items: center;

                &:not(:last-child) {
                    margin-bottom: 30px;
                }

                .update-content {
                    margin-inline-start: 12px;

                    .timestamp {
                        color: var(--light-text);
                    }

                    .tweet {
                        font-family: var(--font);
                        color: var(--dark-text);
                    }
                }
            }
        }
    }

    .status-footer {
        display: flex;
        padding: 20px;
        align-items: center;

        .dark-mode {
            display: inline-block;
            transform: scale(0.5);
        }

        a {
            font-family: var(--font);
            color: var(--light-text-dark-8);
            padding: 0 10px;
            transition: color 0.3s;

            &:hover,
            &:focus {
                font-weight: 500;
                color: var(--primary);
            }
        }

        .copyright {
            margin-inline-start: auto;
            font-family: var(--font);
            color: var(--light-text);
        }
    }
}

.is-dark {
    .status-page-wrapper {
        .status-block {
            background: var(--dark-sidebar-light-6);
            border-color: var(--dark-sidebar-light-12);

            .status-uptime {
                border-color: var(--dark-sidebar-light-12);
            }

            .status-list {
                hr {
                    background-color: var(--dark-sidebar-light-12);
                    height: 1px;
                }

                .list-block {
                    .progress-wrap {
                        .progress-wrap-inner {
                            .amount {
                                background: var(--dark-sidebar-light-2);
                                border-color: var(--dark-sidebar-light-12);

                                span {
                                    color: var(--dark-dark-text);
                                }
                            }
                        }
                    }
                }
            }

            .tweets-header {
                border-color: var(--dark-sidebar-light-12);
            }

            .status-tweets {
                .updates {
                    .update {
                        .update-content {
                            .tweet {
                                color: var(--dark-dark-text);
                            }
                        }
                    }
                }
            }
        }

        .status-footer {
            a {
                &:hover {
                    color: var(--primary);
                }
            }
        }
    }
}

@media only screen and (width <= 767px) {
    .status-page-wrapper {
        padding-top: 20px;

        .status-block {
            .status-header {
                padding: 30px;
            }

            .status-uptime {
                padding: 16px 30px;

                .uptime {
                    display: none;
                }
            }

            .status-list {
                padding: 30px;

                .list-block {
                    .icon-wrap {
                        display: none;
                    }
                }
            }
        }

        .tweets-header {
            padding: 24px 30px;
        }

        .status-tweets {
            .updates {
                padding: 20px 30px 30px;

                .update {
                    .v-avatar {
                        display: none;
                    }

                    .update-content {
                        margin-inline-start: 0;
                    }
                }
            }
        }

        .status-footer {
            flex-direction: column;
            align-items: center;

            .copyright {
                margin: 10px 0;
            }
        }
    }
}
</style>
