<template>
  <div class="field-container">
    <Multiselect
            v-if="!async"
            v-model="input"
            :class="{ input: true }"
            v-bind="getAttributes({})"
            :close-on-select="!multiple"
            :searchable="true"
            :valueProp="optionValue"
            :trackBy="trackValue"

            :label="optionName"
            :placeholder="placeholder$"
            :multiple="multiple"
            :options="optionsData"
            ref="multiselect"
            :group-select="true"
    >
      <template v-slot:beforelist v-if="showSelectAll">
        <VButton
                class="is-pushed-mobile mx-2 my-1"
                dark-outlined
                @click="selectAll"
        >{{ trans("select_all") }}
        </VButton
        >
      </template>

      <template #multiplelabel="{ values }">
        <div class="multiple-label">
          <span class="value-label" v-for="(value, index) in values">
            {{ value?.[optionName] }}
            <i
                    class="close-label fas fa-times"
                    @click="removeItem(value, index)"
            ></i>
          </span>
        </div>
      </template>
    </Multiselect>

    <treeselect
            :placeholder="placeholder$"
            v-if="async"
            :class="{
        'form-control custom-treeselect form-control-custome': true,
        'is-invalid': invalid && validated,
        cselect: true,
      }"
            v-model="input"
            :multiple="isMultiple"
            :options="optionsData"
            :defaultOptions="asyncOptions"
            :normalizer="normalizer$"
            :loadOptions="loadOptions"
            search-nested
            :async="async"
            :value="optionValue"
            :label="optionName"
            :auto-load-root-options="false"
    ></treeselect>


    <span class="invalid" v-if="hasError">
      {{ trans($error?.$message) }}
    </span>
  </div>
</template>


<script>
  import input from "../mixins/input";
  import options from "../mixins/options";
  import Multiselect from "@vueform/multiselect";
  import Treeselect from "vue3-treeselect";
  import "vue3-treeselect/dist/vue3-treeselect.css";

  export default {
    name: "SelectField",
    components: {
      Multiselect,
      Treeselect,
    },
    props: {
      asyncOptionsKey: String
    },
    data: () => ({
      q: null,
      loading: false,
      value: [],
      key: 0,
      valuaae: null,
      options: [],
    }),
    mixins: [input, options],
    computed: {
      asyncOptionsKey$() {
        return this.asyncOptionsKey ?? `${this.model}_options`
      },
      isMultiple() {
        return this.multiple ?? true;
      },
      selectFieldRepeaterInput() {
        if (!this.repeater) return null;
        return this.repeater.repeaterRef.inputs$.find(
                (input) => input.model === this.model
        );
      },
      asyncOptions() {
        return this.currentRow?.[this.asyncOptionsKey$] ?? (this.form?.[this.asyncOptionsKey$] ?? []);
      }
    },
    methods: {
      selectAll() {
        this.$refs.multiselect.selectAll();
        return;
        console.log("yooo", this.input, this.optionsData);
        this.input = [];
        const input$ = [];
        this.optionsData.forEach(
                function (item) {
                  input$.push(item.id);
                }.bind(this)
        );
        this.input = input$;
      },
      removeItem(item, index) {
        this.input = (this.input ?? []).filter((option) => {
          return option !== item?.[this.optionValue];
        });
      },
      getAttributes(field) {
        if (this.multiple) field["mode"] = "multiple";

        return field;
      },
      normalizer$(node) {
        if (this.normalizer && this.normalizer instanceof Function)
          return this.normalizer(node);
        return {
          id: _.get(node, this.optionValue),
          label: node?.[this.optionName],
          children: node.children,
        };
      },
      /**
       * this method removes the empty
       * child from the object
       * @param options
       * @return {[]|}
       * @author WeSSaM
       */
      sanitizer(options) {
        if (!(options instanceof Array)) return options;
        return options.map(this.childrenMap);
      },

      /**
       *  check if the object's children array
       *  is empty or not
       *  if so remove it, otherwise
       *  call method again 'till removing
       *  the all empty children
       *
       * @param child
       * @return {*}
       * @author WeSSaM
       */
      removeEmptyChild(child) {
        if (!child.children || child.children.length == 0) {
          delete child["children"];
          return child;
        }
        child.children = child.children.map(this.childrenMap);
        return child;
      },
      /**
       * the body of removeEmptyChild and sanitizer
       * map function
       *
       * @param item
       */
      childrenMap: function (item) {
        return this.removeEmptyChild(item);
      },
      async loadOptions({action, callback, searchQuery}) {
        callback(null, this.options);
        this.request(
                this.$endPoint(this.endPoint.name),
                {
                  params: {q: searchQuery, ...this.endPoint?.params},
                },
                ({data}) => {
                  let options = _.map(data.data, (option) => {
                    return {
                      id: option[this.optionValue],
                      name: this.getValueByLocale(option[this.optionName]),
                    };
                  });
                  this.options = options;
                  // callback(null, this.options);
                  console.log("loadOptions", callback, options);
                },
                () => {
                  callback(null, []);
                }
        );
      },
    },
  };
</script>

<style>
  .multiple-label {
    position: absolute;
  }

  span.value-label {
    background-color: #f0f0f0;
    padding: 5px;
    margin-left: 5px;
    margin-right: 6px;
    font-size: 14px;
    border-radius: 5px;
  }

  i.close-label {
    margin: 0 5px;
  }

  span.invalid {
    color: var(--danger) !important;
    font-size: 14px !important;
    font-family: "Cairo", serif !important;
  }
</style>


<style>
  .multiple-label {
    position: absolute;
  }

  span.value-label {
    background-color: #f0f0f0;
    padding: 5px;
    margin-left: 5px;
    margin-right: 6px;
    font-size: 14px;
    border-radius: 5px;
  }

  i.close-label {
    margin: 0 5px;
  }

  span.invalid {
    color: var(--danger) !important;
    font-size: 14px !important;
    font-family: "Cairo", serif !important;
  }

  .vue-treeselect__placeholder.vue-treeselect-helper-zoom-effect-off {
    font-family: "CAIRO", serif;
    font-size: 13px;
    margin: 0 25px;
  }

  .vue-treeselect__single-value {
    font-family: "CAIRO", serif;
    font-size: 15px;
    margin: 0 25px;
  }

  .vue-treeselect__menu {
    font-family: "CAIRO", serif;
    font-size: 15px !important;
  }
</style>