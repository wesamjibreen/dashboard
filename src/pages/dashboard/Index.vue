<template>
    <div>
        <!-- <KanbanApp /> -->
        <!--        <div class="columns is-multiline">-->
        <!--            <div class="column is-4">-->
        <!--                <div class="card">-->
        <!--                    <div class="card-body p-5">-->
        <!--                        <div class="mb-8 d-flex align-items-center">-->
        <!--                            <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24"-->
        <!--                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
        <!--                                 stroke-linejoin="round"-->
        <!--                                 class="vue-feather text-theme dark-text-theme mr-3 feather feather-users">-->
        <!--                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>-->
        <!--                                <circle cx="9" cy="7" r="4"></circle>-->
        <!--                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>-->
        <!--                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>-->
        <!--                            </svg> &lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt; <b class="text-md font-bold dark:text-gray-200 sm:text-lg">-->
        <!--                            Total Users-->
        <!--                        </b></div>-->
        <!--                        <b class="-mt-3 mb-0.5 block text-2xl font-extrabold sm:text-3xl">-->
        <!--                            1323-->
        <!--                        </b>-->
        <!--                        <a href="/admin/users" class="mt-6 flex items-center"><span-->
        <!--                            class="mr-2 whitespace-nowrap text-xs font-bold">-->
        <!--                            Show All Users-->
        <!--                </span>-->
        <!--                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"-->
        <!--                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
        <!--                                 stroke-linejoin="round" class="text-theme vue-feather feather feather-chevron-right">-->
        <!--                                <polyline points="9 18 15 12 9 6"></polyline>-->
        <!--                            </svg>-->
        <!--                        </a>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="finance-dashboard stock-dashboard">
            <div class="columns is-multiline">
                <div v-for="{ component , index, ...item } in sections " v-bind:key="index"
                     :class="`mb-4 column is-${item.cols ?? 12}`">
                    <component :is="component" v-bind="item" @refetch="fetch"/>
                </div>
            </div>
        </div>
<!--        <div class="columns is-multiline">-->
<!--            <div class="column is-12">-->
<!--                <StraightforwardTable title="Recent Orders."-->
<!--                                      :columns="recentOrdersColumns"-->
<!--                                      :rows="recentOrders">-->
<!--                    <template #column:actions :props="{ row }">-->
<!--                        <VButton class="is-pushed-mobile" dark-outlined>View Order</VButton>-->
<!--                    </template>-->
<!--                </StraightforwardTable>-->
<!--            </div>-->
<!--            <div class="column is-12">-->
<!--                <ProgressBarList-->
<!--                    title="All services are online."-->
<!--                    description="As of September 20, 2020 at 11:08 PM PST."-->
<!--                    :data="progressBarItems"/>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
import Table from "../../components/basic/dashboard/Table";
import Category from "../../components/basic/dashboard/Category";
import Filter from "../../components/basic/dashboard/Filter";
import Statistic from "../../components/basic/dashboard/Statistic";
import Chart from "../../components/basic/dashboard/Chart";
import ApexChart from "../../components/basic/dashboard/ApexChart";
import DashboardCard from "../../components/basic/dashboard/DashboardCard";
import StockCard from "../../components/basic/dashboard/StockCard";
import notificationList from "../../components/basic/dashboard/notificationList";
import TaskList from "../../components/basic/dashboard/TaskList";
import KanbanBoard from "../../components/basic/dashboard/KanbanBoard/KanbanBoard";
import DateField from "../../components/formBuilder/fields/DateField";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {
    messaging,
    firebaseSettings,
    subscribeTokenToTopic,
    getMessagingToken,
} from "../../plugins/firebase";
import StatisticChart from "../../components/basic/dashboard/StatisticChart.vue";
import ProgressBarList from "../../components/basic/dashboard/ProgressBarList.vue";
import MultiLineStatisticChart from "../../components/basic/dashboard/MultiLineStatisticChart.vue";
import StraightforwardTable from "../../components/list/StraightforwardTable.vue";
import FlexTable from "../../components/basic/dashboard/FlexTable.vue";
// {
//     picture: {
//         label: 'Customer',
//             media: true,
//             grow: true,
//     },
//     date: 'Date',
//         amount: 'Amount',
//     status: 'Status',
//     tracking: 'Tracking',
//     actions: {
//     label: 'Actions',
//         align: 'end',
// },
// }
export default {
    name: "Index",
    components: {
        StraightforwardTable,
        MultiLineStatisticChart,
        StatisticChart,
        Filter,
        Category,
        Table,
        DateField,
        Statistic,
        Chart,
        ApexChart,
        ProgressBarList,
        KanbanBoard,
        DashboardCard,
        StockCard,
        notificationList,
        FlexTable,
        TaskList
    },
    data: () => ({
        // recentOrdersColumns: [
        //     {
        //         text: "Customer",
        //         value: "picture",
        //         component: "avatar-text",
        //         model: {
        //             avatar: "picture",
        //             title: "username",
        //             text: "orderId"
        //         },
        //         media: true,
        //         grow: true,
        //     },
        //     {
        //         text: "Date",
        //         value: "date",
        //     },
        //     {
        //         text: "Status",
        //         value: "status",
        //         component: 'tag-label'
        //     },
        //     {
        //         text: "Amount",
        //         value: "amount",
        //     },
        //     {
        //         text: "Actions",
        //         value: "actions",
        //         align: 'end',
        //     },
        // ],
        // progressBarItems: [
        //     {
        //         title: "REST API",
        //         text: "Including replicated servers",
        //         class: "primary",
        //         percent: 99,
        //         image_url: "https://images.wondershare.com/filmora/article-images/what-is-gif.gif"
        //     },
        //     {
        //         title: "CDN Assets",
        //         text: "Assets delivered from our CDN",
        //         class: "success",
        //         percent: 100,
        //         image_url: "https://media3.giphy.com/media/10FHR5A4cXqVrO/giphy.gif"
        //     },
        //     {
        //         title: "Search Indexes",
        //         text: "Including replicated search",
        //         class: "primary",
        //         percent: 99,
        //         image_url: "https://media.tenor.com/zJsxZAOYNzMAAAAC/%D9%8A%D8%B9-%D9%88%D8%AD%D8%B4.gif"
        //     },
        //     {
        //         title: "Integrations",
        //         text: "We are experiencing some issues",
        //         class: "warning",
        //         percent: 72,
        //         image_url: "https://images.wondershare.com/filmora/article-images/what-is-gif.gif"
        //     },
        //     {
        //         title: "Security",
        //         text: "Everything is working fine",
        //         class: "purple",
        //         percent: 88,
        //         image_url: "https://images.wondershare.com/filmora/article-images/what-is-gif.gif"
        //     },
        // ],
        // recentOrders: [
        //     {
        //         id: 0,
        //         picture: '/panel/images/avatars/svg/vuero-1.svg',
        //         username: 'Erik K.',
        //         orderId: '#158456',
        //         date: 'Oct 31, 2020',
        //         amount: 863.42,
        //         status: {
        //             name: "Paid",
        //             value: {class: 'green'}
        //         },
        //         tracking: 'TR-7295',
        //     },
        //     {
        //         id: 1,
        //         picture: '/panel/images/avatars/svg/vuero-2.svg',
        //         username: 'Jimmy H.',
        //         orderId: '#15893',
        //         date: 'Oct 31, 2020',
        //         amount: 128.0,
        //         status: {
        //             name: "Paid",
        //             value: {class: 'green'}
        //         },
        //         tracking: 'TR-6259',
        //     },
        //     {
        //         id: 2,
        //         picture: '/panel/images/avatars/svg/vuero-3.svg',
        //         username: 'Melany W.',
        //         orderId: '#155848',
        //         date: 'Oct 31, 2020',
        //         amount: 236.79,
        //         status: {
        //             name: "Pending",
        //             value: {class: 'orange'}
        //         },
        //         tracking: undefined,
        //     },
        //     {
        //         id: 3,
        //         picture: '/panel/images/avatars/svg/vuero-4.svg',
        //         username: 'Joshua S.',
        //         orderId: '#154736',
        //         date: 'Oct 30, 2020',
        //         amount: 98.31,
        //         status: {
        //             name: "Pending",
        //             value: {class: 'orange'}
        //         },
        //         tracking: 'TR-48951',
        //     },
        //     {
        //         id: 4,
        //         picture: '/panel/images/avatars/svg/vuero-5.svg',
        //         username: 'Tara S.',
        //         orderId: '#158315',
        //         date: 'Oct 30, 2020',
        //         amount: 112.0,
        //         status: {
        //             name: "Paid",
        //             value: {class: 'green'}
        //         },
        //         tracking: 'TR-48555',
        //     },
        // ],
        loading: true,
        data: {},
        form: {
            range: null,
        },
    }),
//       return{
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//      },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// }
// }

    created() {
        this.fetch({});
    },
    methods: {
        fetch(query) {
            setTimeout(
                function () {
                    this.loading = true;
                    this.request(
                        this.homeEndPoint,
                        {params: {...query}},
                        ({data}) => {
                            this.$bus.emit('dashboard-fetched', data.data),
                                this.data = data.data;
                        },
                        (xhr) => {
                            this.errorNotify(xhr.data.message ?? "")
                        },
                        () => {
                            this.loading = false;
                        }
                    );
                }.bind(this)
            );
        },
    },
    computed: {
        homeEndPoint() {
            return this.$endPoint("home.index");
        },
        sections() {
            return this.data ?? [];
        },
        routeQuery() {
            return this.$route;
        },
    },
    watch: {
        routeQuery: {
            handler(newVal) {
            },
            deep: true,
            immediate: true,
        },
        "$route.params": {
            handler: function (value) {
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>


<style lang="scss">
@import "../../../dist/scss/abstracts/_mixins.scss";

.company-dashboard {
    .company-header {
        display: flex;
        padding: 20px;
        background: var(--white);
        border: 1px solid var(--fade-grey-dark-3);
        border-radius: var(--radius-large);
        margin-bottom: 1.5rem;

        .header-item {
            width: 25%;
            border-right: 1px solid var(--fade-grey-dark-3);

            &:last-child {
                border-right: none;
            }

            .item-inner {
                text-align: center;

                .lnil,
                .lnir {
                    font-size: 1.8rem;
                    margin-bottom: 6px;
                    color: var(--primary);
                }

                span {
                    display: block;
                    font-family: var(--font);
                    font-weight: 600;
                    font-size: 1.6rem;
                    color: var(--dark-text);
                }

                p {
                    font-family: var(--font-alt);
                    font-size: 0.95rem;
                }
            }
        }
    }

    .widget {
        height: 100%;
    }

    .dashboard-card {
        @include vuero-s-card();

        height: 100%;

        &.is-company {
            text-align: center;
            padding: 30px;

            .v-avatar {
                display: block;
                margin: 0 auto 10px auto;

                .button {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    max-width: 35px;
                }
            }

            > h3 {
                color: var(--dark-text);
                font-family: var(--font-alt);
                font-size: 1.2rem;
                font-weight: 600;
            }

            > p {
                font-size: 0.9rem;
            }

            .description {
                padding: 10px 0 0 0;
            }

            .company-stats {
                display: flex;
                padding-top: 20px;
                margin-top: 20px;
                border-top: 1px solid var(--fade-grey-dark-3);

                .company-stat {
                    width: 33.3%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;

                    span {
                        display: block;
                        font-family: var(--font);

                        &:first-child {
                            text-transform: uppercase;
                            font-family: var(--font-alt);
                            font-size: 0.75rem;
                            color: var(--light-text);
                        }

                        &:nth-child(2) {
                            color: var(--dark-text);
                            font-size: 1.4rem;
                            font-weight: 600;
                        }
                    }
                }
            }
        }

        &.is-base-chart {
            padding: 0;
            display: flex;
            flex-direction: column;

            .content-box {
                padding: 30px;

                .revenue-stats {
                    display: flex;
                    padding-bottom: 20px;
                    border-bottom: 1px solid var(--fade-grey-dark-3);

                    .revenue-stat {
                        margin-right: 30px;
                        font-family: var(--font);

                        span {
                            display: block;

                            &:first-child {
                                text-transform: uppercase;
                                font-family: var(--font-alt);
                                font-size: 0.75rem;
                                color: var(--light-text);
                            }

                            &:nth-child(2) {
                                color: var(--dark-text);
                                font-size: 1.6rem;
                                font-weight: 600;
                            }

                            &.current {
                                color: var(--primary);
                            }
                        }
                    }
                }
            }

            .chart-container {
                margin-top: auto;
            }
        }

        &.is-tickets {
            padding: 30px;

            .ticket-list {
                padding: 10px 0;

                .media-flex {
                    + .media-flex {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid var(--fade-grey-dark-3);
                    }

                    .flex-meta {
                        span {
                            &:nth-child(2) {
                                font-size: 1rem;
                                margin: 4px 0;
                                color: var(--light-text-dark-20);
                                max-width: 430px;
                            }

                            &:nth-child(3) {
                                font-size: 0.9rem;
                                color: var(--light-text);
                            }
                        }
                    }
                }
            }
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
            }
        }
    }

    .table-wrapper {
        min-height: 0;
    }

    .dataTable-wrapper {
        .dataTable-top {
            padding: 0 !important;
            margin: 0 !important;
        }
    }
}

.is-dark {
    .company-dashboard {
        .dashboard-card {
            @include vuero-card--dark();
        }
    }
}

@media only screen and (max-width: 767px) {
    .company-dashboard {
        .company-header {
            flex-wrap: wrap;

            .header-item {
                width: 50%;
                border-right: none;
                border: none;
                padding: 16px 0;
            }
        }

        .dashboard-card {
            &.is-tickets {
                padding: 30px;

                .ticket-list {
                    .media-flex {
                        .flex-meta {
                            margin-bottom: 1rem;
                        }
                    }
                }
            }
        }
    }
}

.stock-dashboard {
    .stock {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        padding: 5px 0;
        margin: 5px 0;

        .stock-logo {
            position: relative;
            display: flex;
            justify-content: center;
            flex: 0;
            margin-right: 10px;

            &::before {
                content: "";
                width: 36px;
                height: 36px;
                transform: rotate(0);
                border-radius: 7px;
            }

            &.github::before,
            &.apple::before {
                background: var(--github);
                box-shadow: var(--github-box-shadow);
            }

            &.invision::before {
                background: var(--invision);
                box-shadow: var(--invision-box-shadow);
            }

            &.facebook::before,
            &.docker::before {
                background: var(--facebook);
                box-shadow: var(--facebook-box-shadow);
            }

            &.amazon::before {
                background: var(--amazon);
                box-shadow: var(--amazon-box-shadow);
            }

            &.twitter::before {
                background: var(--twitter);
                box-shadow: var(--twitter-box-shadow);
            }

            &.algolia::before {
                background: var(--primary);
                box-shadow: var(--primary-box-shadow);
            }

            &.snapchat::before {
                background: var(--primary);
                box-shadow: var(--primary-box-shadow);
            }

            i {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .stock-info {
            margin-left: 5px;
            flex: 1;
            line-height: 1.2;

            .stock-name {
                font-family: var(--font-alt);
                font-weight: 600;
                font-size: 0.9rem;
                color: var(--dark-text);
            }

            .stock-fullname {
                font-family: var(--font);
                color: var(--light-text);
            }
        }

        .stock-value {
            flex: 1;
            font-weight: bold;
            color: var(--light-text);
            text-align: right;
        }
    }

    .graph {
        position: relative;
        display: inline-block;
        width: 100%;
        padding: 20px;
        background: var(--white);
        border-radius: 10px;
        box-shadow: var(--light-box-shadow);
        border: 1px solid var(--fade-grey);

        .dropdown {
            position: absolute;
            top: 10px;
            right: 10px;
        }

        > svg {
            max-width: 100%;
            min-height: 90px;
            margin: 0 auto 16px auto;
            display: block;

            text {
                font-family: var(--font);
                font-weight: 700;
                font-size: 12px;
                font-style: normal;
            }
        }
    }

    .asset-category {
        display: flex;
        padding: 12px 0;

        .category {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;

            &:hover {
                .asset {
                    .asset-logo {
                        transform: translateY(-5px);

                        &::before {
                            border-color: var(--primary);
                            box-shadow: var(--light-box-shadow);
                        }

                        i {
                            color: var(--primary);
                        }
                    }
                }

                .asset-name {
                    color: var(--primary);
                }
            }

            .asset {
                position: relative;
                display: flex;
                flex-direction: row;
                margin: 10px 0;

                .asset-logo {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    flex: 0;
                    transition: all 0.3s;

                    &::before {
                        content: "";
                        width: 46px;
                        height: 46px;
                        background-color: var(--white);
                        border: 1px solid var(--fade-grey);
                        transform: rotate(45deg);
                        border-radius: 10px;
                        transition: all 0.3s;
                    }

                    i {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: var(--light-text);
                        font-size: 18px;
                        transition: color 0.3s;
                    }
                }
            }

            .asset-name {
                color: var(--dark-text);
                font-size: 0.9rem;
                font-family: var(--font-alt);
                font-weight: 600;
                transition: color 0.3s;
            }
        }
    }

    .stock-card {
        @include vuero-r-card();

        .action-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            h3 {
                font-family: var(--font-alt);
                font-size: 1rem;
                font-weight: 600;
                color: var(--dark-text);
            }
        }

        .stock {
            margin: 8px 0;

            .stock-logo {
                i {
                    font-size: 14px;
                }
            }
        }
    }
}

.is-dark {
    .stock-dashboard {
        .graph {
            background: var(--dark-sidebar-light-6) !important;
            border-color: var(--dark-sidebar-light-12) !important;
        }

        .stock {
            .stock-info {
                .stock-name {
                    color: var(--dark-dark-text);
                }
            }
        }

        .asset-category {
            .category {
                &:hover {
                    .asset {
                        .asset-logo {
                            &::before {
                                border-color: var(--primary) !important;
                            }

                            i {
                                color: var(--primary);
                            }
                        }
                    }

                    .asset-name {
                        color: var(--primary);
                    }
                }

                .asset {
                    .asset-logo {
                        &::before {
                            background: var(--dark-sidebar-light-6) !important;
                            border-color: var(--dark-sidebar-light-12) !important;
                        }
                    }
                }

                .asset-name {
                    color: var(--dark-dark-text);
                }
            }
        }

        .stock-card {
            @include vuero-card--dark();

            .action-bar {
                h3 {
                    color: var(--dark-dark-text);
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .stock-dashboard {
        .asset-category {
            flex-wrap: wrap;

            .category {
                min-width: 25% !important;
                margin-bottom: 12px !important;
            }
        }
    }
}

.lifestyle-dashboard-v2 .dashboard-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-family: var(--font);
}

.lifestyle-dashboard-v2 .dashboard-title.is-main {
    margin-bottom: 30px;
}

.lifestyle-dashboard-v2 .dashboard-title.is-main h2 {
    font-size: 1.8rem;
}

.lifestyle-dashboard-v2 .dashboard-title h2 {
    font-family: var(--font-alt);
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--dark-text);
}

.lifestyle-dashboard-v2 .long-card {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: 16px;
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    position: relative;
    min-height: 300px;
}

.lifestyle-dashboard-v2 .long-card.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.lifestyle-dashboard-v2 .long-card.is-flat {
    box-shadow: none;
}

.lifestyle-dashboard-v2 .long-card.is-raised {
    box-shadow: var(--light-box-shadow);
}

.lifestyle-dashboard-v2 .long-card.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.lifestyle-dashboard-v2 .long-card.is-primary .title,
.lifestyle-dashboard-v2 .long-card.is-primary .subtitle,
.lifestyle-dashboard-v2 .long-card.is-primary h1,
.lifestyle-dashboard-v2 .long-card.is-primary h2,
.lifestyle-dashboard-v2 .long-card.is-primary h3,
.lifestyle-dashboard-v2 .long-card.is-primary h4,
.lifestyle-dashboard-v2 .long-card.is-primary p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .long-card.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.lifestyle-dashboard-v2 .long-card.is-secondary .title,
.lifestyle-dashboard-v2 .long-card.is-secondary .subtitle,
.lifestyle-dashboard-v2 .long-card.is-secondary h1,
.lifestyle-dashboard-v2 .long-card.is-secondary h2,
.lifestyle-dashboard-v2 .long-card.is-secondary h3,
.lifestyle-dashboard-v2 .long-card.is-secondary h4,
.lifestyle-dashboard-v2 .long-card.is-secondary p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .long-card.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.lifestyle-dashboard-v2 .long-card.is-info .title,
.lifestyle-dashboard-v2 .long-card.is-info .subtitle,
.lifestyle-dashboard-v2 .long-card.is-info h1,
.lifestyle-dashboard-v2 .long-card.is-info h2,
.lifestyle-dashboard-v2 .long-card.is-info h3,
.lifestyle-dashboard-v2 .long-card.is-info h4,
.lifestyle-dashboard-v2 .long-card.is-info p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .long-card.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.lifestyle-dashboard-v2 .long-card.is-success .title,
.lifestyle-dashboard-v2 .long-card.is-success .subtitle,
.lifestyle-dashboard-v2 .long-card.is-success h1,
.lifestyle-dashboard-v2 .long-card.is-success h2,
.lifestyle-dashboard-v2 .long-card.is-success h3,
.lifestyle-dashboard-v2 .long-card.is-success h4,
.lifestyle-dashboard-v2 .long-card.is-success p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .long-card.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.lifestyle-dashboard-v2 .long-card.is-warning .title,
.lifestyle-dashboard-v2 .long-card.is-warning .subtitle,
.lifestyle-dashboard-v2 .long-card.is-warning h1,
.lifestyle-dashboard-v2 .long-card.is-warning h2,
.lifestyle-dashboard-v2 .long-card.is-warning h3,
.lifestyle-dashboard-v2 .long-card.is-warning h4,
.lifestyle-dashboard-v2 .long-card.is-warning p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .long-card.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.lifestyle-dashboard-v2 .long-card.is-danger .title,
.lifestyle-dashboard-v2 .long-card.is-danger .subtitle,
.lifestyle-dashboard-v2 .long-card.is-danger h1,
.lifestyle-dashboard-v2 .long-card.is-danger h2,
.lifestyle-dashboard-v2 .long-card.is-danger h3,
.lifestyle-dashboard-v2 .long-card.is-danger h4,
.lifestyle-dashboard-v2 .long-card.is-danger p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .long-card .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.lifestyle-dashboard-v2 .long-card .card-head .left,
.lifestyle-dashboard-v2 .long-card .card-head .right {
    display: flex;
    align-items: center;
}

.lifestyle-dashboard-v2 .long-card .card-head .left .title {
    font-size: 1.2rem;
    font-weight: 500;
}

.lifestyle-dashboard-v2 .long-card .card-head .right {
    justify-content: flex-end;
}

.lifestyle-dashboard-v2 .long-card .card-inner {
    padding-top: 1.75rem;
}

.lifestyle-dashboard-v2 .long-card:hover .long-card-overlay,
.lifestyle-dashboard-v2 .long-card:focus .long-card-overlay {
    opacity: 0.5;
    pointer-events: all;
}

.lifestyle-dashboard-v2 .long-card:hover .long-card-text-overlay,
.lifestyle-dashboard-v2 .long-card:focus .long-card-text-overlay {
    opacity: 1;
    pointer-events: all;
}

.lifestyle-dashboard-v2 .long-card:hover .long-card-text-overlay .top,
.lifestyle-dashboard-v2 .long-card:hover .long-card-text-overlay .bottom,
.lifestyle-dashboard-v2 .long-card:focus .long-card-text-overlay .top,
.lifestyle-dashboard-v2 .long-card:focus .long-card-text-overlay .bottom {
    transform: translateY(0);
    opacity: 1;
}

.lifestyle-dashboard-v2 .long-card .long-card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--dark-sidebar);
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    cursor: pointer;
    border-radius: 16px;
    transition: all 0.3s;
}

.lifestyle-dashboard-v2 .long-card .long-card-text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    font-family: var(--font);
    opacity: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
    cursor: pointer;
}

.lifestyle-dashboard-v2 .long-card .long-card-text-overlay .top,
.lifestyle-dashboard-v2 .long-card .long-card-text-overlay .bottom {
    transition: all 0.2s;
    opacity: 0;
    transition-delay: 0.15s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--smoke-white);
}

.lifestyle-dashboard-v2 .long-card .long-card-text-overlay .top {
    transform: translateY(-30px);
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.lifestyle-dashboard-v2 .long-card .long-card-text-overlay .bottom {
    font-size: 0.9rem;
    transform: translateY(30px);
}

.lifestyle-dashboard-v2 .dashboard-list .inner-list .media-flex-center {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: 16px;
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    display: flex;
    padding: 12px;
    max-height: 66px;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.lifestyle-dashboard-v2 .dashboard-list .inner-list .media-flex-center.is-flat {
    box-shadow: none;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-raised {
    box-shadow: var(--light-box-shadow);
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
.title,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
.subtitle,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
h1,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
h2,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
h3,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
h4,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-primary
p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
.title,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
.subtitle,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
h1,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
h2,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
h3,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
h4,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-secondary
p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2 .dashboard-list .inner-list .media-flex-center.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
.title,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
.subtitle,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
h1,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
h2,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
h3,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
h4,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-info
p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
.title,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
.subtitle,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
h1,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
h2,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
h3,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
h4,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-success
p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
.title,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
.subtitle,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
h1,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
h2,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
h3,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
h4,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-warning
p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
.title,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
.subtitle,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
h1,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
h2,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
h3,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
h4,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center.is-danger
p {
    color: var(--smoke-white) !important;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.card-head
.left,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.card-head
.right {
    display: flex;
    align-items: center;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.card-head
.left
.title {
    font-size: 1.2rem;
    font-weight: 500;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.card-head
.right {
    justify-content: flex-end;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.card-inner {
    padding-top: 1.75rem;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center:hover
.flex-end
.rating,
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center:focus
.flex-end
.rating {
    opacity: 1;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.flex-meta {
    max-width: 160px;
    width: 100%;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.flex-end
.rating {
    padding: 0 20px;
    opacity: 0;
    transition: all 0.3s;
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.flex-end
.rating
i {
    font-size: 12px;
    color: var(--widget-grey-dark-12);
}

.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.flex-end
.rating
i.selected {
    color: var(--yellow);
}

.is-dark .lifestyle-dashboard-v2 .long-card {
    background: var(--dark-sidebar-light-6);
    border-color: var(--dark-sidebar-light-12);
}

.is-dark .lifestyle-dashboard-v2 .long-card .v-avatar img {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .lifestyle-dashboard-v2 .long-card .avatar-stack .v-avatar {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.lifestyle-dashboard-v2
.long-card
.avatar-stack
.v-avatar
.avatar.is-more
.inner {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center {
    background: var(--dark-sidebar-light-6);
    border-color: var(--dark-sidebar-light-12);
}

.is-dark
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.v-avatar
img {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.avatar-stack
.v-avatar {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.lifestyle-dashboard-v2
.dashboard-list
.inner-list
.media-flex-center
.avatar-stack
.v-avatar
.avatar.is-more
.inner {
    border-color: var(--dark-sidebar-light-6) !important;
}

@media only screen and (max-width: 767px) {
    .lifestyle-dashboard-v2 .long-card .long-card-overlay {
        opacity: 0.5 !important;
        pointer-events: all !important;
    }
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay {
        opacity: 1 !important;
        pointer-events: all !important;
        padding: 30px;
    }
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay .top,
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay .bottom {
        font-size: 1rem;
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .lifestyle-dashboard-v2 .is-flex-tablet-p .column.is-3 {
        min-width: 25% !important;
        width: 25% !important;
    }
    .lifestyle-dashboard-v2
    .is-flex-tablet-p
    .column.is-3
    .long-card
    .long-card-overlay {
        opacity: 0.5 !important;
        pointer-events: all !important;
    }
    .lifestyle-dashboard-v2
    .is-flex-tablet-p
    .column.is-3
    .long-card
    .long-card-text-overlay {
        opacity: 1 !important;
        pointer-events: all !important;
    }
    .lifestyle-dashboard-v2
    .is-flex-tablet-p
    .column.is-3
    .long-card
    .long-card-text-overlay
    .top,
    .lifestyle-dashboard-v2
    .is-flex-tablet-p
    .column.is-3
    .long-card
    .long-card-text-overlay
    .bottom {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .lifestyle-dashboard-v2
    .is-flex-tablet-p
    .column.is-3
    .long-card
    .long-card-text-overlay
    .top
    i {
        display: none !important;
    }
    .lifestyle-dashboard-v2
    .is-flex-tablet-p
    .column.is-3
    .long-card
    .long-card-text-overlay
    .bottom
    .avatar-stack {
        display: none !important;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .lifestyle-dashboard-v2 .long-card .long-card-overlay {
        opacity: 0.5 !important;
        pointer-events: all !important;
    }
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay {
        opacity: 1 !important;
        pointer-events: all !important;
    }
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay .top,
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay .bottom {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .lifestyle-dashboard-v2 .long-card .long-card-text-overlay .top i {
        display: none !important;
    }
    .lifestyle-dashboard-v2
    .long-card
    .long-card-text-overlay
    .bottom
    .avatar-stack {
        display: none !important;
    }
}

.flights-dashboard .booking-bar-wrapper {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: var(--radius-large);
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    position: relative;
    background: var(--primary);
    border-color: var(--primary);
    padding: 30px;
    color: var(--white);
    font-family: var(--font);
    box-shadow: var(--primary-box-shadow);
}

.flights-dashboard .booking-bar-wrapper.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.flights-dashboard .booking-bar-wrapper.is-flat {
    box-shadow: none;
}

.flights-dashboard .booking-bar-wrapper.is-raised {
    box-shadow: var(--light-box-shadow);
}

.flights-dashboard .booking-bar-wrapper.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.flights-dashboard .booking-bar-wrapper.is-primary .title,
.flights-dashboard .booking-bar-wrapper.is-primary .subtitle,
.flights-dashboard .booking-bar-wrapper.is-primary h1,
.flights-dashboard .booking-bar-wrapper.is-primary h2,
.flights-dashboard .booking-bar-wrapper.is-primary h3,
.flights-dashboard .booking-bar-wrapper.is-primary h4,
.flights-dashboard .booking-bar-wrapper.is-primary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .booking-bar-wrapper.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.flights-dashboard .booking-bar-wrapper.is-secondary .title,
.flights-dashboard .booking-bar-wrapper.is-secondary .subtitle,
.flights-dashboard .booking-bar-wrapper.is-secondary h1,
.flights-dashboard .booking-bar-wrapper.is-secondary h2,
.flights-dashboard .booking-bar-wrapper.is-secondary h3,
.flights-dashboard .booking-bar-wrapper.is-secondary h4,
.flights-dashboard .booking-bar-wrapper.is-secondary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .booking-bar-wrapper.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.flights-dashboard .booking-bar-wrapper.is-info .title,
.flights-dashboard .booking-bar-wrapper.is-info .subtitle,
.flights-dashboard .booking-bar-wrapper.is-info h1,
.flights-dashboard .booking-bar-wrapper.is-info h2,
.flights-dashboard .booking-bar-wrapper.is-info h3,
.flights-dashboard .booking-bar-wrapper.is-info h4,
.flights-dashboard .booking-bar-wrapper.is-info p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .booking-bar-wrapper.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.flights-dashboard .booking-bar-wrapper.is-success .title,
.flights-dashboard .booking-bar-wrapper.is-success .subtitle,
.flights-dashboard .booking-bar-wrapper.is-success h1,
.flights-dashboard .booking-bar-wrapper.is-success h2,
.flights-dashboard .booking-bar-wrapper.is-success h3,
.flights-dashboard .booking-bar-wrapper.is-success h4,
.flights-dashboard .booking-bar-wrapper.is-success p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .booking-bar-wrapper.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.flights-dashboard .booking-bar-wrapper.is-warning .title,
.flights-dashboard .booking-bar-wrapper.is-warning .subtitle,
.flights-dashboard .booking-bar-wrapper.is-warning h1,
.flights-dashboard .booking-bar-wrapper.is-warning h2,
.flights-dashboard .booking-bar-wrapper.is-warning h3,
.flights-dashboard .booking-bar-wrapper.is-warning h4,
.flights-dashboard .booking-bar-wrapper.is-warning p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .booking-bar-wrapper.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.flights-dashboard .booking-bar-wrapper.is-danger .title,
.flights-dashboard .booking-bar-wrapper.is-danger .subtitle,
.flights-dashboard .booking-bar-wrapper.is-danger h1,
.flights-dashboard .booking-bar-wrapper.is-danger h2,
.flights-dashboard .booking-bar-wrapper.is-danger h3,
.flights-dashboard .booking-bar-wrapper.is-danger h4,
.flights-dashboard .booking-bar-wrapper.is-danger p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .booking-bar-wrapper .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flights-dashboard .booking-bar-wrapper .card-head .left,
.flights-dashboard .booking-bar-wrapper .card-head .right {
    display: flex;
    align-items: center;
}

.flights-dashboard .booking-bar-wrapper .card-head .left .title {
    font-size: 1.2rem;
    font-weight: 500;
}

.flights-dashboard .booking-bar-wrapper .card-head .right {
    justify-content: flex-end;
}

.flights-dashboard .booking-bar-wrapper .card-inner {
    padding-top: 1.75rem;
}

.flights-dashboard .booking-bar-wrapper .travel-illustration {
    position: absolute;
    bottom: 30px;
    right: 30px;
    max-width: 260px;
}

.flights-dashboard .booking-bar-wrapper .booking-bar-info {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.flights-dashboard .booking-bar-wrapper .booking-bar-info .lnil {
    font-size: 2.2rem;
    color: var(--white);
}

.flights-dashboard .booking-bar-wrapper .booking-bar-info .inner {
    margin-left: 16px;
}

.flights-dashboard
.booking-bar-wrapper
.booking-bar-info
.inner
.booking-bar-heading {
    font-family: var(--font-alt);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--white);
}

.flights-dashboard
.booking-bar-wrapper
.booking-bar-info
.inner
.booking-bar-sub-heading {
    font-family: var(--font);
    font-weight: 500;
    font-size: 1.1rem;
    color: var(--white);
}

.flights-dashboard .booking-bar-wrapper .booking-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flights-dashboard .booking-bar-wrapper .booking-bar .booking-bar-inputs {
    display: flex;
    align-items: center;
}

.flights-dashboard
.booking-bar-wrapper
.booking-bar
.booking-bar-inputs
.control:not(:last-of-type) {
    margin-right: 2rem;
}

.flights-dashboard
.booking-bar-wrapper
.booking-bar
.booking-bar-inputs
.input {
    font-family: var(--font);
    color: var(--light-text);
}

.flights-dashboard .flights-toolbar {
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flights-dashboard .flights-toolbar h3 {
    font-family: var(--font);
    font-weight: 600;
    color: var(--dark-text);
}

.flights-dashboard .flights-summary-wrapper .flight-summary {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: var(--radius-large);
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    display: flex;
    align-items: center;
    border: 1px solid var(--fade-grey);
    transition: all 0.3s;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-flat {
    box-shadow: none;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-raised {
    box-shadow: var(--light-box-shadow);
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary .title,
.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-primary
.subtitle,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary h1,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary h2,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary h3,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary h4,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-primary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary .title,
.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-secondary
.subtitle,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary h1,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary h2,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary h3,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary h4,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-secondary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-info .title,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-info .subtitle,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-info h1,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-info h2,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-info h3,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-info h4,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-info p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-success .title,
.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-success
.subtitle,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-success h1,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-success h2,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-success h3,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-success h4,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-success p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning .title,
.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-warning
.subtitle,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning h1,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning h2,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning h3,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning h4,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-warning p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger .title,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger .subtitle,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger h1,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger h2,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger h3,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger h4,
.flights-dashboard .flights-summary-wrapper .flight-summary.is-danger p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .card-head .left,
.flights-dashboard .flights-summary-wrapper .flight-summary .card-head .right {
    display: flex;
    align-items: center;
}

.flights-dashboard
.flights-summary-wrapper
.flight-summary
.card-head
.left
.title {
    font-size: 1.2rem;
    font-weight: 500;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .card-head .right {
    justify-content: flex-end;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .card-inner {
    padding-top: 1.75rem;
}

.flights-dashboard .flights-summary-wrapper .flight-summary:hover {
    border-color: var(--primary);
}

.flights-dashboard .flights-summary-wrapper .flight-summary.is-featured {
    background: var(--primary);
    border-color: var(--primary);
    box-shadow: var(--primary-box-shadow);
}

.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-featured
.flight-price {
    color: var(--white);
}

.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-featured
.meta
span {
    color: var(--white) !important;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .flight-price {
    font-family: var(--font);
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
}

.flights-dashboard
.flights-summary-wrapper
.flight-summary
.flight-price::before {
    content: "$";
    position: relative;
    right: 0;
    font-size: 1.2rem;
    font-weight: 700;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .meta {
    margin-left: 16px;
    line-height: 1.3;
}

.flights-dashboard .flights-summary-wrapper .flight-summary .meta span {
    display: block;
}

.flights-dashboard
.flights-summary-wrapper
.flight-summary
.meta
span:first-child {
    font-family: var(--font-alt);
    color: var(--dark-text);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
}

.flights-dashboard
.flights-summary-wrapper
.flight-summary
.meta
span:nth-child(2) {
    font-family: var(--font);
    color: var(--light-text);
    font-size: 0.9rem;
}

.flights-dashboard .flights {
    padding: 1.5rem 0;
}

.flights-dashboard .flights .flight-card {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: var(--radius-large);
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    box-shadow: none;
}

.flights-dashboard .flights .flight-card.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.flights-dashboard .flights .flight-card.is-flat {
    box-shadow: none;
}

.flights-dashboard .flights .flight-card.is-raised {
    box-shadow: var(--light-box-shadow);
}

.flights-dashboard .flights .flight-card.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.flights-dashboard .flights .flight-card.is-primary .title,
.flights-dashboard .flights .flight-card.is-primary .subtitle,
.flights-dashboard .flights .flight-card.is-primary h1,
.flights-dashboard .flights .flight-card.is-primary h2,
.flights-dashboard .flights .flight-card.is-primary h3,
.flights-dashboard .flights .flight-card.is-primary h4,
.flights-dashboard .flights .flight-card.is-primary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights .flight-card.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.flights-dashboard .flights .flight-card.is-secondary .title,
.flights-dashboard .flights .flight-card.is-secondary .subtitle,
.flights-dashboard .flights .flight-card.is-secondary h1,
.flights-dashboard .flights .flight-card.is-secondary h2,
.flights-dashboard .flights .flight-card.is-secondary h3,
.flights-dashboard .flights .flight-card.is-secondary h4,
.flights-dashboard .flights .flight-card.is-secondary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights .flight-card.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.flights-dashboard .flights .flight-card.is-info .title,
.flights-dashboard .flights .flight-card.is-info .subtitle,
.flights-dashboard .flights .flight-card.is-info h1,
.flights-dashboard .flights .flight-card.is-info h2,
.flights-dashboard .flights .flight-card.is-info h3,
.flights-dashboard .flights .flight-card.is-info h4,
.flights-dashboard .flights .flight-card.is-info p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights .flight-card.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.flights-dashboard .flights .flight-card.is-success .title,
.flights-dashboard .flights .flight-card.is-success .subtitle,
.flights-dashboard .flights .flight-card.is-success h1,
.flights-dashboard .flights .flight-card.is-success h2,
.flights-dashboard .flights .flight-card.is-success h3,
.flights-dashboard .flights .flight-card.is-success h4,
.flights-dashboard .flights .flight-card.is-success p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights .flight-card.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.flights-dashboard .flights .flight-card.is-warning .title,
.flights-dashboard .flights .flight-card.is-warning .subtitle,
.flights-dashboard .flights .flight-card.is-warning h1,
.flights-dashboard .flights .flight-card.is-warning h2,
.flights-dashboard .flights .flight-card.is-warning h3,
.flights-dashboard .flights .flight-card.is-warning h4,
.flights-dashboard .flights .flight-card.is-warning p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights .flight-card.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.flights-dashboard .flights .flight-card.is-danger .title,
.flights-dashboard .flights .flight-card.is-danger .subtitle,
.flights-dashboard .flights .flight-card.is-danger h1,
.flights-dashboard .flights .flight-card.is-danger h2,
.flights-dashboard .flights .flight-card.is-danger h3,
.flights-dashboard .flights .flight-card.is-danger h4,
.flights-dashboard .flights .flight-card.is-danger p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .flights .flight-card .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flights-dashboard .flights .flight-card .card-head .left,
.flights-dashboard .flights .flight-card .card-head .right {
    display: flex;
    align-items: center;
}

.flights-dashboard .flights .flight-card .card-head .left .title {
    font-size: 1.2rem;
    font-weight: 500;
}

.flights-dashboard .flights .flight-card .card-head .right {
    justify-content: flex-end;
}

.flights-dashboard .flights .flight-card .card-inner {
    padding-top: 1.75rem;
}

.flights-dashboard .flights .flight-card:hover,
.flights-dashboard .flights .flight-card:focus {
    box-shadow: var(--light-box-shadow);
}

.flights-dashboard .flights .flight-card:hover .route .line::before,
.flights-dashboard .flights .flight-card:hover .route .line::after,
.flights-dashboard .flights .flight-card:focus .route .line::before,
.flights-dashboard .flights .flight-card:focus .route .line::after {
    opacity: 1;
}

.flights-dashboard .flights .flight-card > img {
    display: block;
    border-radius: var(--radius-rounded);
    max-width: 32px;
}

.flights-dashboard .flights .flight-card .start span,
.flights-dashboard .flights .flight-card .end span {
    display: block;
    color: var(--dark-text);
    font-family: var(--font);
}

.flights-dashboard .flights .flight-card .start span:first-child,
.flights-dashboard .flights .flight-card .end span:first-child {
    font-family: var(--font-alt);
    font-weight: 600;
    color: var(--dark-text);
}

.flights-dashboard .flights .flight-card .start span:nth-child(2),
.flights-dashboard .flights .flight-card .start span:nth-child(3),
.flights-dashboard .flights .flight-card .end span:nth-child(2),
.flights-dashboard .flights .flight-card .end span:nth-child(3) {
    font-family: var(--font);
    font-size: 0.9rem;
    color: var(--light-text);
}

.flights-dashboard .flights .flight-card .start {
    margin-left: 1rem;
}

.flights-dashboard .flights .flight-card .end {
    margin-left: auto;
    margin-right: 1.5rem;
}

.flights-dashboard .flights .flight-card .route {
    flex-grow: 2;
    display: flex;
    align-items: center;
    max-width: 320px;
    margin: 0 auto;
    padding: 0 1rem;
}

.flights-dashboard .flights .flight-card .route .departure {
    height: 16px;
    width: 16px;
    border-radius: var(--radius-rounded);
    border: 1px solid var(--light-text);
}

.flights-dashboard .flights .flight-card .route .line {
    position: relative;
    flex-grow: 2;
    height: 1px;
    border-bottom: 1.6px dashed var(--light-text);
}

.flights-dashboard .flights .flight-card .route .line::before,
.flights-dashboard .flights .flight-card .route .line::after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
}

.flights-dashboard .flights .flight-card .route .line::before {
    content: "";
    position: absolute;
    top: -14px;
    left: 50%;
    right: 50%;
    height: 10px;
    width: 1px;
    border-right: 1px solid var(--light-text);
}

.flights-dashboard .flights .flight-card .route .line::after {
    content: attr(data-content);
    position: absolute;
    top: -32px;
    left: 23%;
    width: 130px;
    font-size: 0.8rem;
    text-align: center;
    color: var(--light-text);
}

.flights-dashboard .flights .flight-card .route .arrival {
    font-size: 1.8rem;
    transform: rotate(90deg);
    height: 26px;
    width: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.flights-dashboard .flights .flight-card .route .arrival .lnil {
    position: relative;
    top: -4px;
    right: 5px;
    color: var(--light-text);
    margin-left: 0.75rem;
}

.flights-dashboard .flights .flight-card .flight-price {
    font-family: var(--font);
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--light-text);
}

.flights-dashboard .flights .flight-card .flight-price::before {
    content: "$";
    position: relative;
    top: -8px;
    right: 0;
    font-size: 1.1rem;
    font-weight: 700;
}

.flights-dashboard .company-card {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: var(--radius-large);
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    padding: 30px;
    margin-bottom: 1.5rem;
}

.flights-dashboard .company-card.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.flights-dashboard .company-card.is-flat {
    box-shadow: none;
}

.flights-dashboard .company-card.is-raised {
    box-shadow: var(--light-box-shadow);
}

.flights-dashboard .company-card.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.flights-dashboard .company-card.is-primary .title,
.flights-dashboard .company-card.is-primary .subtitle,
.flights-dashboard .company-card.is-primary h1,
.flights-dashboard .company-card.is-primary h2,
.flights-dashboard .company-card.is-primary h3,
.flights-dashboard .company-card.is-primary h4,
.flights-dashboard .company-card.is-primary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .company-card.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.flights-dashboard .company-card.is-secondary .title,
.flights-dashboard .company-card.is-secondary .subtitle,
.flights-dashboard .company-card.is-secondary h1,
.flights-dashboard .company-card.is-secondary h2,
.flights-dashboard .company-card.is-secondary h3,
.flights-dashboard .company-card.is-secondary h4,
.flights-dashboard .company-card.is-secondary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .company-card.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.flights-dashboard .company-card.is-info .title,
.flights-dashboard .company-card.is-info .subtitle,
.flights-dashboard .company-card.is-info h1,
.flights-dashboard .company-card.is-info h2,
.flights-dashboard .company-card.is-info h3,
.flights-dashboard .company-card.is-info h4,
.flights-dashboard .company-card.is-info p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .company-card.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.flights-dashboard .company-card.is-success .title,
.flights-dashboard .company-card.is-success .subtitle,
.flights-dashboard .company-card.is-success h1,
.flights-dashboard .company-card.is-success h2,
.flights-dashboard .company-card.is-success h3,
.flights-dashboard .company-card.is-success h4,
.flights-dashboard .company-card.is-success p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .company-card.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.flights-dashboard .company-card.is-warning .title,
.flights-dashboard .company-card.is-warning .subtitle,
.flights-dashboard .company-card.is-warning h1,
.flights-dashboard .company-card.is-warning h2,
.flights-dashboard .company-card.is-warning h3,
.flights-dashboard .company-card.is-warning h4,
.flights-dashboard .company-card.is-warning p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .company-card.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.flights-dashboard .company-card.is-danger .title,
.flights-dashboard .company-card.is-danger .subtitle,
.flights-dashboard .company-card.is-danger h1,
.flights-dashboard .company-card.is-danger h2,
.flights-dashboard .company-card.is-danger h3,
.flights-dashboard .company-card.is-danger h4,
.flights-dashboard .company-card.is-danger p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .company-card .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flights-dashboard .company-card .card-head .left,
.flights-dashboard .company-card .card-head .right {
    display: flex;
    align-items: center;
}

.flights-dashboard .company-card .card-head .left .title {
    font-size: 1.2rem;
    font-weight: 500;
}

.flights-dashboard .company-card .card-head .right {
    justify-content: flex-end;
}

.flights-dashboard .company-card .card-inner {
    padding-top: 1.75rem;
}

.flights-dashboard .company-card .v-avatar {
    display: block;
    margin: 0 auto;
}

.flights-dashboard .filters-card {
    flex: 1;
    display: inline-block;
    width: 100%;
    padding: 20px;
    background-color: var(--white);
    border-radius: var(--radius-large);
    border: 1px solid var(--fade-grey-dark-3);
    transition: all 0.3s;
    padding: 30px;
    margin-bottom: 1.5rem;
}

.flights-dashboard .filters-card.has-margin-bottom {
    margin-bottom: 1.5rem;
}

.flights-dashboard .filters-card.is-flat {
    box-shadow: none;
}

.flights-dashboard .filters-card.is-raised {
    box-shadow: var(--light-box-shadow);
}

.flights-dashboard .filters-card.is-primary {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary--color-invert);
}

.flights-dashboard .filters-card.is-primary .title,
.flights-dashboard .filters-card.is-primary .subtitle,
.flights-dashboard .filters-card.is-primary h1,
.flights-dashboard .filters-card.is-primary h2,
.flights-dashboard .filters-card.is-primary h3,
.flights-dashboard .filters-card.is-primary h4,
.flights-dashboard .filters-card.is-primary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .filters-card.is-secondary {
    background: var(--secondary) !important;
    border-color: var(--secondary) !important;
}

.flights-dashboard .filters-card.is-secondary .title,
.flights-dashboard .filters-card.is-secondary .subtitle,
.flights-dashboard .filters-card.is-secondary h1,
.flights-dashboard .filters-card.is-secondary h2,
.flights-dashboard .filters-card.is-secondary h3,
.flights-dashboard .filters-card.is-secondary h4,
.flights-dashboard .filters-card.is-secondary p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .filters-card.is-info {
    background: var(--info) !important;
    border-color: var(--info) !important;
}

.flights-dashboard .filters-card.is-info .title,
.flights-dashboard .filters-card.is-info .subtitle,
.flights-dashboard .filters-card.is-info h1,
.flights-dashboard .filters-card.is-info h2,
.flights-dashboard .filters-card.is-info h3,
.flights-dashboard .filters-card.is-info h4,
.flights-dashboard .filters-card.is-info p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .filters-card.is-success {
    background: var(--success) !important;
    border-color: var(--success) !important;
}

.flights-dashboard .filters-card.is-success .title,
.flights-dashboard .filters-card.is-success .subtitle,
.flights-dashboard .filters-card.is-success h1,
.flights-dashboard .filters-card.is-success h2,
.flights-dashboard .filters-card.is-success h3,
.flights-dashboard .filters-card.is-success h4,
.flights-dashboard .filters-card.is-success p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .filters-card.is-warning {
    background: var(--warning) !important;
    border-color: var(--warning) !important;
}

.flights-dashboard .filters-card.is-warning .title,
.flights-dashboard .filters-card.is-warning .subtitle,
.flights-dashboard .filters-card.is-warning h1,
.flights-dashboard .filters-card.is-warning h2,
.flights-dashboard .filters-card.is-warning h3,
.flights-dashboard .filters-card.is-warning h4,
.flights-dashboard .filters-card.is-warning p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .filters-card.is-danger {
    background: var(--danger) !important;
    border-color: var(--danger) !important;
}

.flights-dashboard .filters-card.is-danger .title,
.flights-dashboard .filters-card.is-danger .subtitle,
.flights-dashboard .filters-card.is-danger h1,
.flights-dashboard .filters-card.is-danger h2,
.flights-dashboard .filters-card.is-danger h3,
.flights-dashboard .filters-card.is-danger h4,
.flights-dashboard .filters-card.is-danger p {
    color: var(--smoke-white) !important;
}

.flights-dashboard .filters-card .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flights-dashboard .filters-card .card-head .left,
.flights-dashboard .filters-card .card-head .right {
    display: flex;
    align-items: center;
}

.flights-dashboard .filters-card .card-head .left .title {
    font-size: 1.2rem;
    font-weight: 500;
}

.flights-dashboard .filters-card .card-head .right {
    justify-content: flex-end;
}

.flights-dashboard .filters-card .card-inner {
    padding-top: 1.75rem;
}

.flights-dashboard .filters-card .checkboxes-list {
    margin: 0;
    padding: 20px 0 0;
}

.flights-dashboard .filters-card .checkboxes-list .field > h5 {
    font-family: var(--font-alt);
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--dark-text);
    padding-bottom: 6px;
}

.flights-dashboard .filters-card .checkboxes-list .checkbox {
    padding: 8px 0;
}

.is-dark .flights-dashboard .booking-bar-wrapper {
    background: var(--dark-sidebar-light-6);
    border-color: var(--dark-sidebar-light-12);
    background: var(--dark-sidebar-light-4);
    border-color: var(--dark-sidebar-light-12);
    box-shadow: var(--light-box-shadow);
}

.is-dark .flights-dashboard .booking-bar-wrapper .v-avatar img {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .flights-dashboard .booking-bar-wrapper .avatar-stack .v-avatar {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.flights-dashboard
.booking-bar-wrapper
.avatar-stack
.v-avatar
.avatar.is-more
.inner {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .flights-dashboard .flights-summary-wrapper .flight-summary {
    background: var(--dark-sidebar-light-6);
    border-color: var(--dark-sidebar-light-12);
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary
.v-avatar
img {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary
.avatar-stack
.v-avatar {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary
.avatar-stack
.v-avatar
.avatar.is-more
.inner {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .flights-dashboard .flights-summary-wrapper .flight-summary:hover,
.is-dark .flights-dashboard .flights-summary-wrapper .flight-summary:focus {
    border-color: var(--primary) !important;
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-featured {
    background: var(--primary) !important;
    border-color: var(--primary) !important;
    box-shadow: var(--primary-box-shadow) !important;
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary.is-featured
.flight-price {
    color: var(--white);
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary
.flight-price {
    color: var(--primary);
}

.is-dark
.flights-dashboard
.flights-summary-wrapper
.flight-summary
.meta
span:first-child {
    color: var(--dark-dark-text);
}

.is-dark .flights-dashboard .flights .flight-card {
    background: var(--dark-sidebar-light-6);
    border-color: var(--dark-sidebar-light-12);
}

.is-dark .flights-dashboard .flights .flight-card .v-avatar img {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .flights-dashboard .flights .flight-card .avatar-stack .v-avatar {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.flights-dashboard
.flights
.flight-card
.avatar-stack
.v-avatar
.avatar.is-more
.inner {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .flights-dashboard .flights .flight-card .start span:first-child,
.is-dark .flights-dashboard .flights .flight-card .end span:first-child {
    color: var(--dark-dark-text);
}

.is-dark .flights-dashboard .company-card,
.is-dark .flights-dashboard .filters-card {
    background: var(--dark-sidebar-light-6);
    border-color: var(--dark-sidebar-light-12);
}

.is-dark .flights-dashboard .company-card .v-avatar img,
.is-dark .flights-dashboard .filters-card .v-avatar img {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark .flights-dashboard .company-card .avatar-stack .v-avatar,
.is-dark .flights-dashboard .filters-card .avatar-stack .v-avatar {
    border-color: var(--dark-sidebar-light-6) !important;
}

.is-dark
.flights-dashboard
.company-card
.avatar-stack
.v-avatar
.avatar.is-more
.inner,
.is-dark
.flights-dashboard
.filters-card
.avatar-stack
.v-avatar
.avatar.is-more
.inner {
    border-color: var(--dark-sidebar-light-6) !important;
}

@media only screen and (max-width: 767px) {
    .flights-dashboard .booking-bar-wrapper .travel-illustration {
        position: static;
        margin-bottom: 20px;
    }
    .flights-dashboard .booking-bar-wrapper .booking-bar > div {
        width: 100%;
    }
    .flights-dashboard .booking-bar-wrapper .booking-bar .booking-bar-inputs {
        flex-direction: column;
        width: 100%;
    }
    .flights-dashboard
    .booking-bar-wrapper
    .booking-bar
    .booking-bar-inputs
    .control {
        margin: 0 !important;
        width: 100% !important;
    }
    .flights-dashboard
    .booking-bar-wrapper
    .booking-bar
    .booking-bar-inputs
    .control:first-child {
        margin-bottom: 1rem !important;
    }
    .flights-dashboard .flights {
        padding-bottom: 0;
    }
    .flights-dashboard .flights .flight-card {
        flex-direction: column;
    }
    .flights-dashboard .flights .flight-card:last-child {
        margin-bottom: 0;
    }
    .flights-dashboard .flights .flight-card > img {
        max-width: 48px;
        margin-bottom: 12px;
    }
    .flights-dashboard .flights .flight-card .start,
    .flights-dashboard .flights .flight-card .end {
        text-align: center;
        margin: 10px auto;
    }
    .flights-dashboard .flights .flight-card .start span,
    .flights-dashboard .flights .flight-card .end span {
        font-size: 1rem !important;
    }
    .flights-dashboard .flights .flight-card .route {
        width: 100%;
        max-width: 100%;
    }
    .flights-dashboard .flights .flight-card .route .line::before,
    .flights-dashboard .flights .flight-card .route .line::after {
        display: none !important;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .flights-dashboard .booking-bar-wrapper .travel-illustration {
        bottom: 30px;
        right: -25px;
        max-width: 215px;
    }
    .flights-dashboard .flights {
        padding-bottom: 0;
    }
    .flights-dashboard .flights .flight-card:last-child {
        margin-bottom: 0;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .flights-dashboard .booking-bar-wrapper .travel-illustration {
        bottom: 30px;
        right: -12px;
        max-width: 200px;
    }
    .flights-dashboard .flights-summary-wrapper .flight-summary .flight-price {
        font-size: 2.2rem;
    }
}

@media only screen and (max-width: 1300px) and (orientation: landscape) {
    .flights-dashboard .flights-summary-wrapper .flight-summary .flight-price {
        font-size: 2.2rem;
    }
}
</style>

