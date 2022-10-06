<template>
  <div class="personal-dashboard personal-dashboard-v1">
    <div class="dashboard-body">
      <div class="columns is-multiline">
        <!--Card-->
        <div class="column is-12">
          <div class="dashboard-card">
            <h4 class="dark-inverted">{{title}}</h4>

            <div class="quick-stats">
              <div class="quick-stats-inner">
                <!--Stat-->
                <div class="quick-stat" v-for="(item , index) in items" :key="index" >
                    <VBlock
                        :title="item.titles"
                        :subtitle="item.subtitle"
                        center
                        m-responsive
                        t-responsive
                            >

                        <template #icon>
                            <VIconBox style="background-color:#ffeee5;  border-radius:50%" rounded>
                                <i
                                    aria-hidden="true"
                                    :class="item.class"
                                    style="color:#ffaf88"
                                >
                                </i>
                            </VIconBox>
                        </template>
                    </VBlock>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import dashboard from "./dashboard";

export default {
    name: 'DashboardCard',
    mixins: [dashboard],
    props: {
        title: String ,
        items : {} ,
    },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import '../../../scss/abstracts/_mixins.scss';
    .is-navbar {
      .personal-dashboard {
        margin-top: 30px;
      }
    }

    .personal-dashboard-v1 {
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

      .dashboard-body {
        .dashboard-card {
          @include vuero-s-card();

          font-family: var(--font);

          > h4,
          .ApexCharts-title-text {
            font-family: var(--font-alt);
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark-text);
            margin-bottom: 12px;
          }

          .quick-stats {
            .quick-stats-inner {
              display: flex;
              flex-wrap: wrap;
              margin-left: -8px;
              margin-right: -8px;

              .quick-stat {
                width: calc(50% - 16px);
                padding: 40px 20px;
                background: var(--widget-grey);
                margin: 8px;
                border-radius: var(--radius-large);
                transition: all 0.3s;

                ::v-deep(.media-flex-center) {
                  .flex-meta {
                    span {
                      &:first-child {
                        font-size: 1.4rem;
                        font-weight: 600;
                        color: var(--dark-text);
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .dashboard-card {
          &.is-upgrade {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--primary-light-8);
            border-color: var(--primary-light-8);
            padding: 20px 40px;
            min-height: 320px;
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

            .cta-content {
              text-align: center;

              h4 {
                font-family: var(--font-alt);
                font-weight: 600;
                font-size: 1.2rem;
                color: var(--smoke-white);
                margin-bottom: 8px;
              }
            }

            .link {
              display: block;
              font-family: var(--font-alt);
              font-weight: 500;
              margin-top: 0.5rem;

              &:hover {
                color: var(--smoke-white);
                opacity: 0.6;
              }
            }
          }
          &.is-gauge {
            position: relative;

            .people {
              position: absolute;
              top: 80px;
              left: 0;
              right: 0;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              z-index: 5;

              .v-avatar {
                margin: 0 4px;
              }
            }
          }
        }
      }
    }

    .is-dark {
      .personal-dashboard-v1 {
        .dashboard-header {
          .start {
            h3 {
              color: var(--dark-dark-text);
            }
          }
        }

        .dashboard-body {
          .dashboard-card {
            @include vuero-card--dark();

            &.is-upgrade {
              background: var(--primary);
              border-color: var(--primary);
              box-shadow: var(--primary-box-shadow);
            }

            .quick-stats {
              .quick-stats-inner {
                .quick-stat {
                  background: var(--dark-sidebar-light-2);
                  border: 1px solid var(--dark-sidebar-light-12);

                  .media-flex-center {
                    .flex-meta {
                      span {
                        &:first-child {
                          color: var(--dark-dark-text);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    @media only screen and (max-width: 767px) {
      .personal-dashboard-v1 {
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

        .dashboard-body {
          .dashboard-card {
            .quick-stats {
              .quick-stats-inner {
                .quick-stat {
                  padding: 20px;

                  .media-flex-center {
                    flex-direction: column;

                    .flex-meta {
                      margin: 10px 0;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
      .personal-dashboard-v1 {
        .dashboard-body {
          .dashboard-card {
            .quick-stats {
              .quick-stats-inner {
                .quick-stat {
                  padding: 20px 20px;

                  .media-flex-center {
                    flex-direction: column;

                    .flex-meta {
                      margin: 2px 0 0 0;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    </style>

