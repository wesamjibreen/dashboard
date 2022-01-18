import {useStorage} from '@vueuse/core'
import {createI18n as createClientI18n} from 'vue-i18n'

const DEFAULT_LANGUAGE = "ar";

const initI18n = function (i18n = {}, config = {}) {
    let defaultLanguage = config.language?.default ?? DEFAULT_LANGUAGE;
    let base = config?.base ?? "default";
    let language = !config.language.hasOwnProperty('navigator') || config.language?.navigator && navigator.language ? navigator.language.split('-')[0] : defaultLanguage;
    const defaultLocale = useStorage(`${base}_locale`, language);
    let messages = {};
    _.forEach(i18n.messages, (value, key) => messages[key] = {...value, ...common[key]});
    return createClientI18n({
        locale: defaultLocale.value,
        legacy: false,
        ...i18n,
        messages
    });
};

export default initI18n;

const common = {
    ar: {
        datatable: {
            no_results: "لم نتمكن من العثور على أي نتائج مطابقة.",
            no_results_subtitle: "يبدو أننا لم نتمكن من العثور على أي نتائج مطابقة لمصطلحات البحث التي أدخلتها." +
                "يرجى محاولة مصطلحات أو معايير بحث مختلفة."
        },
        sign_in: "تسجيل الدخول",
        select_country: "قم بإختيار الدولة",
        select_language: "قم بإختيار اللغة",
        add_new: "إضافة جديد",
        enter: "أدخل",
        text: "النص",
        save: "حفظ",
        search_text: "إبحث ...",
        image: "الصورة",
        cancel: "إلغاء",
        actions: "الإجراءات",
        select: "قم بإختيار",
        filter_by: "فلترة حسب",
        confirm: "تأكيد",
        title: "العنوان",
        sure_to_delete: "هل أنت متأكد من الحذف ؟",
    },
    en: {
        datatable: {
            no_results: "We couldn't find any matching results.",
            no_results_subtitle: "Too bad. Looks like we couldn't find any matching results for the search terms you've entered." +
                " Please try different search terms or criteria.",
        },
        sign_in: "Sign In",
        search_text: "Search...",
        select_country: "Select Country",
        select_language: "Select language",
        add_new: "Add New",
        save: "Save",
        cancel: "Cancel",
        enter: "Enter",
        text: "Text",
        image: "Image",
        select: "Select",
        actions: "Actions",
        filter_by: "Filter by",
        title: "Title",
        sure_to_delete: "Are you sure to delete?",
        confirm: "Confirm",
    },
    tr: {
        datatable: {
            no_results: "We couldn't find any matching results.",
            no_results_subtitle: "Too bad. Looks like we couldn't find any matching results for the search terms you've entered." +
                " Please try different search terms or criteria.",
        },
        select_country: "Select Country",
        select_language: "Dil Seçin",
        add_new: "Add New",
        save: "Save",
        cancel: "Cancel",
        enter: "Enter",
        select: "Select",
        title: "Title"
    }
};