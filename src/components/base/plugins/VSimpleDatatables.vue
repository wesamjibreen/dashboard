<script setup>
    import 'simple-datatables/src/style.css'

    import {
        isReactive,
        onBeforeUnmount,
        onMounted,
        ref,
        watch,
        reactive,
    } from 'vue'
    import {DataTable} from 'simple-datatables'

    // export interface VSimpleDatatablesProps {
    //   options?: any
    //   autoupdate?: boolean
    // }

    const props = withDefaults(defineProps(), {
        options: () => ({}),
    })

    const tableElement = ref()
    const wrapperElement = ref()
    const datatable = ref(null)
    const hasFocus = ref(false)
    const lastSort = reactive({
        column: 0,
        direction: '',
    })

    const emit = defineEmits([
        'init',
        'refresh',
        'update',
        'page',
        'sort',
        'perpage',
        'search',
    ])

    const onFocus = (event) => {
        if (!hasFocus.value) {
            hasFocus.value = true
        }
    }

    const onBlur = (event) => {
        if (hasFocus.value) {
            hasFocus.value = false
        }
    }

    const registerEvents = () => {
        if (wrapperElement.value) {
            const searchElement = wrapperElement.value.querySelector(
                '.dataTable-input'
            )
            const pageLimitElement = wrapperElement.value.querySelector(
                '.dataTable-selector'
            )
            const paginationElement = wrapperElement.value.querySelector(
                '.dataTable-pagination'
            )
            const sortersElement =
                wrapperElement.value.querySelectorAll('.dataTable-sorter')

            if (searchElement) {
                searchElement.addEventListener('focus', onFocus, false)
                searchElement.addEventListener('blur', onBlur, false)
            }
            if (pageLimitElement) {
                pageLimitElement.addEventListener('focus', onFocus, false)
                pageLimitElement.addEventListener('blur', onBlur, false)
                pageLimitElement.addEventListener('change', onBlur, false)
            }
            if (paginationElement) {
                paginationElement.addEventListener('mousedown', onFocus, false)
                paginationElement.addEventListener('mouseup', onBlur, false)
            }
            sortersElement.forEach((sorterElement) => {
                let sorter = sorterElement;
                if (sorter) {
                    sorter.addEventListener('mousedown', onFocus, false)
                    sorter.addEventListener('mouseup', onBlur, false)
                }
            })
        }

        if (datatable.value) {
            datatable.value.on(`datatable.init`, () => {
                emit('init')
            })
            datatable.value.on(`datatable.refresh`, () => {
                emit('refresh')
            })
            datatable.value.on(`datatable.update`, () => {
                emit('update')
            })
            datatable.value.on(`datatable.page`, (page) => {
                emit('page', page)
            })
            datatable.value.on(
                `datatable.sort`,
                (column, direction ) =>
            {
                lastSort.column = column
                lastSort.direction = direction || ''
                emit('sort', column, direction)
            }
        )
            datatable.value.on(`datatable.perpage`, (perpage) => {
                emit('perpage', perpage)
            })
            datatable.value.on(`datatable.search`, (query, matched =[]) => {
                emit('search', query, matched)
            })
        }
    }

    const unregisterEvents = () => {
        if (datatable.value) {
            datatable.value.destroy()
            datatable.value = null
        }

        if (wrapperElement.value) {
            const searchElement = wrapperElement.value.querySelector(
                '.dataTable-input'
            )
            const pageLimitElement = wrapperElement.value.querySelector(
                '.dataTable-selector'
            )
            const paginationElement = wrapperElement.value.querySelector(
                '.dataTable-pagination'
            )
            const sortersElement =
                wrapperElement.value.querySelectorAll('.dataTable-sorter')

            if (searchElement) {
                searchElement.removeEventListener('focus', onFocus)
                searchElement.removeEventListener('blur', onBlur)
            }
            if (pageLimitElement) {
                pageLimitElement.removeEventListener('focus', onFocus)
                pageLimitElement.removeEventListener('blur', onBlur)
                pageLimitElement.removeEventListener('change', onBlur)
            }
            if (paginationElement) {
                paginationElement.removeEventListener('mousedown', onFocus)
                paginationElement.removeEventListener('mouseup', onBlur)
            }
            sortersElement.forEach((sorterElement) => {
                let sorter = sorterElement
                if (sorter) {
                    sorter.removeEventListener('mousedown', onFocus)
                    sorter.removeEventListener('mouseup', onBlur)
                }
            })
        }
    }

    onMounted(() => {
        if (tableElement.value) {
            datatable.value = new DataTable(tableElement.value, props.options)
        }
        registerEvents()
    })

    onBeforeUnmount(() => {
        unregisterEvents()
    })

    if (isReactive(props.options)) {
        watch([props.options, () => props.autoupdate], () => {
            if (tableElement.value && props.autoupdate && !hasFocus.value) {
                let currentPage = 1
                let perPage = 10
                let search = ''

                if (datatable.value) {
                    currentPage = datatable.value.currentPage
                    search = datatable.value.input?.value
                    perPage = datatable.value.options?.perPage
                    unregisterEvents()
                }

                datatable.value = new DataTable(tableElement.value, {
                    ...props.options,
                    perPage,
                })
                if (props.options.searchable !== false) {
                    datatable.value.input.value = search
                    datatable.value.input.dispatchEvent(new Event('keyup'))
                }
                if (lastSort.direction !== '') {
                    datatable.value.columns().sort(lastSort.column, lastSort.direction)
                }

                datatable.value.page(currentPage)
                registerEvents()
            }
        })
    }
</script>

<template>
    <div ref="wrapperElement">
        <table ref="tableElement">
            <slot></slot>
        </table>
    </div>
</template>
