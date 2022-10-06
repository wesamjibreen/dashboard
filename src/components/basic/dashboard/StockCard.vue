<template>
  <div class="finance-dashboard stock-dashboard">
        <div class="columns is-multiline">
          <!--Card-->
          <div class="column is-12">
          <div class="stock-card">
            <div class="action-bar">
                <h3 class="dark-inverted">{{title}}</h3>
            </div>
  
            <div class="stock" v-for="(item , index) in items" :key="index" >
              <div class="stock-logo" :style="item.style">
                <img class="image" :src="item.img" />
              </div>
              <div class="stock-info">
                <div class="stock-name">{{item.titles}}</div>
                <div class="stock-fullname">{{item.subtitle}}</div>
              </div>
              <div class="stock-value">{{item.value}}</div>
            </div>
          </div>
        </div>
        </div>
    </div>
</template>
  
<script>
  
  import dashboard from "./dashboard";
  
  export default {
      name: 'StockCard',
      mixins: [dashboard],
      props: {
          title: String ,
          items : {} ,
      },
  
  }
  </script>
<style lang="scss">
    @import './_mixins.scss';
    
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
            content: '';
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
    
          img {
            position: absolute;
            padding: 8px;
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
                content: '';
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
</style>
    