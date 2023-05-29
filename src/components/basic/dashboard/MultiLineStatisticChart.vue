<template>
    <div class="ecommerce-dashboard ecommerce-dashboard-v1">
        <div class="columns is-multiline">
            <div v-for="(item, index) in data$" :class="`column is-${cols}`">
                <LineStatWidget :title="getValueByLocale(item.name)"
                                :stats="item.stats" straight>
                    <ApexChart :id="`line-stats-widget-chart-${index}`"
                               :height="getSparkConfig(item)?.chart.height"
                               :type="getSparkConfig(item)?.chart.type"
                               :series="getSparkConfig(item)?.series"
                               :options="getSparkConfig(item)"></ApexChart>
                </LineStatWidget>
            </div>
        </div>
    </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts';
import dashboard from "./dashboard";
import {getValueByLocale} from "../../../utils/helper";
import LineStatWidget from "./LineStatWidget.vue";
import {useThemeColors} from '../../../composable/useThemeColors'

export default {
    name: "MultiLineStatisticChart",
    mixins: [dashboard],
    components: {
        LineStatWidget,
        ApexChart
    },
    setup(props) {
        const themeColors = useThemeColors();

        const getSparkConfig = function (item, index) {
            return {
                series: item.data ?? [],
                chart: {
                    height: 250,
                    type: 'area',
                    offsetY: -10,
                    toolbar: {
                        show: false,
                    },
                },
                colors: [themeColors.accent, themeColors.info, themeColors.primary],
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [2, 2, 2],
                    curve: 'smooth',
                },
                xaxis: item.xaxis,
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                    y: {
                        formatter: function (val) {
                            return '$' + val
                        },
                    },
                },
            };
        }
        return {
            getSparkConfig,
            getValueByLocale,
        }
    }
}
</script>

<style lang="scss">
@import '../../../../dist/scss/abstracts/all';

.ecommerce-dashboard-v1 {
    .dashboard-header {
        display: flex;
        align-items: center;
        font-family: var(--font);
        margin-bottom: 30px;

        .start {
            margin-inline-start: 12px;

            h3 {
                font-family: var(--font-alt);
                font-weight: 600;
                font-size: 1.3rem;
                color: var(--dark-text);
            }
        }

        .end {
            margin-inline-start: auto;
            display: flex;
            justify-content: flex-end;

            .button {
                margin-inline-start: 10px;
            }
        }
    }

    .dashboard-tile {
        @include vuero-s-card;

        font-family: var(--font);

        .tile-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;

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
                margin-inline-end: 20px;

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
            min-width: 160px;

            .multiselect {
                .multiselect-input {
                    .multiselect-single-label {
                        color: var(--light-text);
                    }
                }

                .multiselect-options {
                    inset-inline-start: unset !important;
                    min-width: 180px;
                }
            }
        }
    }
}

.is-dark {
    .ecommerce-dashboard-v1 {
        .dashboard-tile {
            @include vuero-card--dark;
        }
    }
}

@media only screen and (width <= 767px) {
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
