import { useStorage } from '@vueuse/core'
import { createI18n as createClientI18n } from 'vue-i18n'

const DEFAULT_LANGUAGE = "ar";

const initI18n = function (i18n = {}, config = {}) {
    let defaultLanguage = config.language?.default ?? DEFAULT_LANGUAGE;
    let base = config?.base ?? "default";
    let language = !config.language.hasOwnProperty('navigator') || config.language?.navigator && navigator.language ? navigator.language.split('-')[0] : defaultLanguage;
    const defaultLocale = useStorage(`${base}_locale`, language);
    let messages = {};
    _.forEach(i18n.messages, (value, key) => messages[key] = { ...value, ...common[key] });
    return createClientI18n({
        locale: defaultLocale.value,
        legacy: false,
        ...i18n,
        messages
    });
};

export default initI18n;

export const common = {
    ar: {
        datatable: {
            no_results: "لم نتمكن من العثور على أي نتائج مطابقة.",
            no_results_subtitle: "يبدو أننا لم نتمكن من العثور على أي نتائج مطابقة لمصطلحات البحث التي أدخلتها." +
                "يرجى محاولة مصطلحات أو معايير بحث مختلفة."
        },
        welcome: "مرحباً",
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
        logout: "تسجيل الخروج",
        add_date: "إضافة تاريخ",
        welcome_back_to_account: "آهلا بعودتك .. قم بتسجيل الدخول",
        sure_to_delete: "هل أنت متأكد من الحذف ؟",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        remember_me: "تذكرني؟",
        login: "دخول",
        create: "اضافة",
        edit: "تعديل",
        show: "عرض",
        all: "عرض",
        enter_valid_data: "قم بالتأكد من البيانات المدخلة !",
        export_to_excel: "تصدير إلى إكسل",
        export_to_pdf: "تصدير إلى PDF",
        "Value is required": "هذا الحقل مطلوب",
        download_sample_text: "من فضلك قم بتحميل هذا النموذج أولاً , واجعل بياناتك بنفس تصنيف النموذج وبنفس لغة الموقع  ",
        download_sample: "قم بتحميل النموذج",
        pick_file_text: "قم برفع ملفك هنا ",
        pick_file: "ارفاق الملف",
        upload_file_text: "قم برفع ملفك هنا ",
        upload_file: "رفع الملف ",
        uploading: "يتم الارفاق",
        import_excel: "استيراد البيانات",
        add_marker: "اضافة علامة",
        add_polygon: "اضافة منطقة",
        reset_markers: "حذف العلامات",
        reset_polygons: "حذف المناطق",
        no_notifications: "لا يوجد اشعارات ",
        notifications: "الاشعارات ",
        see_all: "عرض الكل",
        select_all: "اختر الكل",
    },
    en: {
        welcome: "Welcome",
        add_date: "Add Date",
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
        export_to_excel: "Export Excel",
        text: "Text",
        image: "Image",
        select: "Select",
        logout: "Logout",
        actions: "Actions",
        filter_by: "Filter by",
        title: "Title",
        sure_to_delete: "Are you sure to delete?",
        confirm: "Confirm",
        email: "E-mail",
        password: "Password",
        welcome_back_to_account: "Welcome back to your account.",
        remember_me: "Remember Me?",
        login: "Login",
        create: "Create",
        edit: "Edit",
        show: "Show",
        all: "Show",
        "Value is required": "Value is required",
        enter_valid_data: "Make sure that you've entered valid data",
        download_sample_text: "Please download this sample firstly, and make your data matching with sample category and site language",
        download_sample: "Download the form",
        pick_file_text: "Upload your file here",
        pick_file: "attach the file",
        upload_file_text: "Upload your file here",
        upload_file: "upload file",
        uploading: "is attached",
        import_excel: "Import Excel",
        export_to_pdf: "Export PDF",
        add_marker: "Add Marker",
        add_polygon: "Add Polygon",
        reset_markers: "Reset Markers",
        reset_polygons: "Reset Polygons",
        no_notifications: "No Notifications",
        notifications: "Notifications",
        see_all: "See All",
        select_all: "Select All"
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
        title: "Title",
        logout: "Logout",
        password: "Password",
        email: "E-mail",
        welcome_back_to_account: "Welcome back to your account.",
        login: "Login",
        remember_me: "Remember Me?",
        create: "Create",
        edit: "Edit",
        show: "Show",
        all: "Show",
        export_to_excel: "Export Excel",
        export_to_pdf: "Export PDF",
        upload_file: "Upload File",
        no_notifications: "No Notifications",
        notifications: "Notifications",
        see_all: "See All",
        select_all: "Select All"
    }
};
