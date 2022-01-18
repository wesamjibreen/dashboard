const Constants = {
    errorCode: {
        /**
         * error : not found
         * Http status code
         *
         * @author WeSSaM
         */
        USER_NOT_FOUND: 100,
        /**
         * error:  user is not active
         * Http status code
         *
         * @author WeSSaM
         */
        USER_NOT_ACTIVE: 101,
        /**
         * error : not authorized access
         * Http status code
         *
         * @author WeSSaM
         */
        NOT_AUTHORIZED_ACCESS: 102,
        /**
         * error : validation exception
         * Http status code
         *
         * @author WeSSaM
         */
        VALIDATION_EXCEPTION: 103,
        /**
         * error : crud error
         * Http status code
         */
        RESOURCE_MANIPULATION: 103,
        /**
         * error : could not delete the resource 'cause it has
         * children
         * Http status code
         */
        UNAUTHENTICATED_ERROR: 106,
        /**
         * error : unknown database
         * Http status code
         */
        UNKNOWN_DATABASE: 105,

        /**
         * error : UNKNOWN_RELATION
         * Http status code
         */
        UNKNOWN_RELATION: 107,

        /**
         * error : UNKNOWN_PAYMENT_METHOD
         * Http status code
         */
        UNKNOWN_PAYMENT_METHOD: 110,

        /**
         * error : UNKNOWN_PAYMENT_TYPE
         * Http status code
         */
        UNKNOWN_PAYMENT_TYPE: 111,


        /**
         * error :  INVALID INPUT
         * Http status code
         */
        INVALID_INPUT: 106,

        /**
         * error : database backup
         * Http status code
         */
        BACKUP_ERROR: 1105,
        /**
         * error : resource not found
         * Http status code
         */
        RESOURCE_NOT_FOUND: 404,
        /**
         * error : could not delete the resource 'cause it has
         * children
         * Http status code
         */
        DELETE_CHILDREN_ERROR: 1106,
        /**
         * error : invalid access code
         *
         * Http status code
         */
        INVALID_ACCESS_CODE: 1107,
        /**
         * error : error while creating database
         *
         * Http status code
         */
        CREATE_DATABASE_ERROR: 1108,
        /**
         *
         * error : INVALID TOKEN
         *
         * Http status code
         */
        INVALID_TOKEN: 1109,
        /**
         * error : mobile is not registered
         *
         * Http status code
         * @author WeSSaM
         */
        MOBILE_IS_NOT_REGISTERED: 1110,
        /**
         * error : error while creating database
         *
         * Http status code
         */
        UPLOADING_ERROR: 1111,
        /**
         * not trial plan
         *
         */
        NOT_TRIAL: 0,
        /**
         * trial plan
         *
         */
        TRIAL: 1,

    },
    /**
     * this is the key that identifies
     * the nationalities in the constants table
     *
     * @author WeSSaM
     */
    NATIONALITY_CONSTANT: 'NATIONALITY',
    /**
     * this is the key of error
     * response
     *
     * @author WeSSaM
     */
    ERROR_RESPONSE: false,
    /**
     * this is the key of success
     * response
     *
     * @author WeSSaM
     */
    SUCCESS_RESPONSE: true,
    /**
     * Http success status
     *
     * @author WeSSaM
     */
    SUCCESS_STATUS: 200,
    /**
     * Super Admin Guard
     *
     * @author WeSSaM
     */

    /**
     * LOG TRANSACTION : LOGIN TYPE
     *
     * @author WeSSaM
     */
    LOGIN_TRANSACTION: 1,
    /**
     * LOG TRANSACTION : LOGOUT TYPE
     *
     * @author WeSSaM
     */
    LOGOUT_TRANSACTION: 2,
    /**
     * ACTIVATION CODE TYPE
     *
     * @author WeSSaM
     */
    ACTIVATION_CODE: 'ACTIVATION_CODE',
    /**
     * INACTIVE status
     *
     * @author WeSSaM
     */
    INACTIVE: 0,
    /**
     * ACTIVE status
     *
     * @author WeSSaM
     */
    ACTIVE: 1,
    /**
     * IS_TRIAL
     *
     * @author WeSSaM
     */
    IS_TRIAL: 1,

    /**
     * MODULES Attribute
     *
     * @author Wessam
     */
    MODULES: 'modules',

    /**
     * MODULES Attribute
     *
     * @author Wessam
     */
    INTERVALS: 'intervals',

    /**
     * SUCCESS STATUS
     *
     * @author Wessam
     */
    SUCCESS: 1,

    /**
     * ERROR STATUS
     *
     * @author Wessam
     */
    ERROR: 0,
    /**
     * this is the duration of access code
     *
     * @author Wessam
     */
    ACCESS_CODE_DURATION: 7,

    /**
     * key for payment type
     *
     * @author Wessam
     */
    NEW_ACCOUNT: 'NEW_ACCOUNT',

    /**
     * key for payment type
     *
     * @author Wessam
     */
    CONVERSION: 'CONVERSION',
    /**
     * key for payment type
     *
     * @author Wessam
     */
    RENEWAL: 'RENEWAL',
    /**
     * key for payment type
     *
     * @author Wessam
     */
    UPGRADE: 'UPGRADE',
    /**
     * type of table in the system
     * @author WeSSaM
     */
    NESTED_TABLE: 2


}

export default Constants;