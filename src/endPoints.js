import _ from "./plugins/lodash"

class EndPoints {
    endPoints;

    /**
     * EndPoints constructor
     *
     * @param baseURL
     * @return {string}
     * @author WeSSaM
     */
    constructor(baseURL) {
        this.baseURL = `/api/${baseURL}/`;
    }

    /**
     *
     * init base api url and endpoints object for specific module
     *
     * @author WeSSaM
     */
    init(endPoints) {
        this.endPoints = endPoints;
    }

    /**
     * return request method and url based on route name
     * endpoint called as function with parsed arguments
     *
     * @param $routeName
     * @param args
     * @return {Object}
     * @author WeSSaM
     */
    route($routeName, ...args) {
        return _.get(this.endPoints, $routeName) instanceof Function ? _.get(this.endPoints, $routeName)(...args) : {};
    }

    /**
     * Build Rest-full routes functions according to resource
     *
     * @param uri
     * @param others
     * @return {Object}
     * @author WeSSaM
     */
    resource(uri, others = {}) {
        return {
            index: ($params) => {
                return this.generateURL('GET', $params, uri);
            },
            store: ($params) => {
                return this.generateURL('POST', $params, uri);
            },
            find: (id) => {
                return this.generateURL('GET', {}, uri, id);
            },
            update: (id) => {
                return this.generateURL('PUT', {}, uri, id);
            },
            status: (id) => {
                return this.generateURL('PATCH', {}, uri, id, 'status');
            },
            multi_delete: ($params) => {
                return this.generateURL('PATCH', $params, uri, 'delete', 'group');
            },
            order: ($params) => {
                return this.generateURL('PATCH', $params, uri, 'order', 'list');
            },
            delete: (id) => {
                return this.generateURL('DELETE', {}, uri, id);
            },
            
            ...others
        }
    }


    /**
     * Generate EndPoint
     *
     * @param $method
     * @param $params
     * @param args
     * @return {Object}
     * @author WeSSaM
     */
    generateURL($method, $params, ...args) {
        let url = this.baseURL;
        url += _.join(args, '/');
        return {
            method: $method, // set method from end point object
            url: url
        };
    }
}


export default EndPoints;
