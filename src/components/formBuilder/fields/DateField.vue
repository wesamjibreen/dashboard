<template>

    <div class="field-container">


  <section>
<!--    <o-field >-->
        <a-date-picker v-if="!isMultiple" :value="computedInput"  class="input ddd" :placeholder="placeholder$"   format="YYYY-MM-DD" @change="onDateChange" />
        <a-range-picker v-if="isMultiple"  class="input dqwqwd"  format="YYYY-MM-DD" :placeholder="placeholder$" :value="computedInput"  @change="onDateChange" />
<!--        <o-datepicker-->
<!--                    id="delete"-->
<!--                    class="input"-->
<!--                    type="string"-->
<!--                    :multiple="multiple"-->
<!--                    :range="range"-->
<!--                    icon=" fa fa-calendar"-->
<!--                    iconRight=" fa fa-window-close"-->
<!--                    @icon-right-click="resetData"-->
<!--                    iconRightClickable-->
<!--                    :placeholder="placeholder$"-->
<!--                    @update:modelValue="onDateChange"-->
<!--                    :modelValue="computedInput"-->
<!--                    trap-focus>-->
<!--      </o-datepicker>-->
<!--    </o-field>-->
  </section>
        </div >
</template>

<script>
    import input from "../mixins/input";
    import dayjs from 'dayjs';
    export default {
        name: "DateField",
        mixins: [input],
        props: {
            inline: {
                default: false
            },
            multiple: {
                default: false
            },
            range: {
                default: false
            }
        },
        data() {
            return {
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
            }
        },
        methods: {
            // resetData(){
            //   this.input=null;
            //
            // },

            onDateChange(value,date) {

                if (this.isMultiple)
                    this.$commit(_.map(date ?? [], (date) => {
                        return date ? date :null;
                    }));
                else
                  this.$commit(date);
            },
            // dateCreator() {
            //     return new Date();
            // },
            // dateFormatter(date) {
            //     date = date || new Date(date);
            //     return date && date.hasOwnProperty('toLocaleDateString') ? date.toLocaleDateString('en-GB').split('/').reverse().join('-') : null;
            // },
            // dateParser(date) {
            //     // return date;
            //     date = new Date(date);
            //     return date ? date.toLocaleDateString('en-GB').split('/').reverse().join('-') : null;
            // }
        },
        computed: {
            defaultValue() {
                return this.isMultiple ? [] : null;
            },
            computedInput() {
                if (this.isMultiple)
                    return _.map(this.input ?? [], (date) => {
                        return date? dayjs(date, 'YYYY-MM-DD'):null;
                    });
                return this.input?  dayjs(this.input, 'YYYY-MM-DD') :null;
            },
            isMultiple() {
                return this.range || this.multiple
            }
        }
    }
</script>

