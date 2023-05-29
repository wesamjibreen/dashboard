<template>
    <div class="ecommerce-dashboard ecommerce-dashboard-v1">
        <div class="columns is-multiline">
            <!--Dashboard tile-->
            <div v-for="(item, index) in data$" :class="`column is-${cols}`">
                <div class="dashboard-tile">
                    <div class="tile-head">
                        <h3>{{ getValueByLocale(item.name) }}</h3>
                        <VIconBox :color="getClass(item)" rounded>
                            <Icon v-if="isIconify($get(item, iconKey))"
                                  :icon="$get(item, iconKey)"
                                  class="is-dark-primary"
                            />
                            <i v-else
                               aria-hidden="true"
                               :class="`is-dark-primary ${$get(item, iconKey)} `"
                            ></i>
                        </VIconBox>
                    </div>
                    <div class="dashboard-tile-inner">
                        <div class="left">
                            <span class="dark-inverted">{{ item.value }}</span>
                        </div>
                        <div class="right">
                            <ApexChart :id="`spark${index+1}`"
                                       :height="getSparkConfig(item,index).chart.height"
                                       :type="getSparkConfig(item,index).chart.type"
                                       :series="getSparkConfig(item,index).series"
                                       :options="getSparkConfig(item,index)">
                            </ApexChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts';
import dashboard from "./dashboard";
import {getValueByLocale} from "../../../utils/helper";
import {useThemeColors} from "../../../composable/useThemeColors";
import VIconBox from "../../base/icon/VIconBox.vue";
export default {
    name: "StatisticChart",
    mixins: [dashboard],
    components: {
        VIconBox,
        ApexChart
    },
    setup(props) {
        const themeColors = useThemeColors();

        const getSparkConfig = function (item, index) {
            return {
                chart: {
                    id: `sparkline${index + 1}`,
                    type: 'line',
                    height: item.height ?? 60,
                    sparkline: {
                        enabled: true,
                    },
                    group: 'sparklines',
                },
                series: [
                    {
                        name: getValueByLocale(item.name),
                        data: item.data ?? [],
                    },
                ],
                stroke: {
                    curve: 'smooth',
                    width: [item.width ?? 3],
                },
                markers: {
                    size: 0,
                },
                yaxis: {
                    min: 0,
                    labels: {
                        minWidth: 100,
                    },
                },
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: 'right',
                    },
                    x: {
                        show: false,
                    },
                },
                colors: themeColors?.[item.class ?? 'info'] ? [themeColors?.[item.class ?? 'info']] : null,
            }
        }
        return {
            getSparkConfig,
        }
    }
}
</script>

<style lang="scss">
@import '../../../../dist/scss/abstracts/_mixins.scss';
@import '../../../../dist/scss/pages/generic/_widgets-stats.scss';

.ecommerce-dashboard-v1 {
    .dashboard-header {
        display: flex;
        align-items: center;
        font-family: var(--font);
        margin-bottom: 30px;

        .start {
            margin-left: 12px;

            h3 {
                font-family: var(--font-alt);
                font-weight: 600;
                font-size: 1.3rem;
                color: var(--dark-text);
            }
        }

        .end {
            margin-left: auto;
            display: flex;
            justify-content: flex-end;

            .button {
                margin-left: 10px;
            }
        }
    }

    .dashboard-tile {
        @include vuero-s-card();

        font-family: var(--font);

        .tile-head {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h3 {
                font-family: var(--font-alt);
                color: var(--light-text);
                font-size: 1rem;
                font-weight: 500;
            }
        }

        .dashboard-tile-inner {
            display: flex;
            align-items: center;

            .left {
                margin-right: 20px;

                span {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--dark-text);
                }
            }

            .right {
                flex-grow: 2;
            }
        }
    }

    .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font);
        margin: 20px 0;

        h3 {
            font-family: var(--font-alt);
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--dark-text);
        }

        .field {
            z-index: 5;
            min-width: 135px;

            .multiselect {
                .multiselect-input {
                    .multiselect-single-label {
                        color: var(--light-text);
                    }
                }

                .multiselect-options {
                    left: unset !important;
                    min-width: 180px;
                }
            }
        }
    }
}

//.is-dark {
//    .ecommerce-dashboard-v1 {
//        .dashboard-tile {
//            @include vuero-card--dark();
//        }
//    }
//}

@media only screen and (max-width: 767px) {
    .ecommerce-dashboard-v1 {
        .dashboard-header {
            text-align: center;
            flex-direction: column;

            .start {
                margin: 10px auto;
            }

            .end {
                margin: 0;
                justify-content: space-between;
            }
        }
    }
}
</style>
