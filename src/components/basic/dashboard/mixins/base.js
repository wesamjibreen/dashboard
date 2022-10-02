export default {
    props: {
        resource: {
            required: false,
            default: null
        },
    },
    methods: {
        execution(action) {
            console.log('action',action.type)
            action.loading = true ;
            
            this[`execution${action.type}`](action);


            setTimeout(function() {
                action.loading = false ;
            }, 500)
        

            
        },
        executionRoute(action) {
            this.$router.push(action.url);
        },
        executionEndpoint(action) {

            this.request(
                action.url,
                {
                    params: {
                        no_pagination: true,
            
                    }
                },
                function ({ data }) {
            
                }.bind(this),
                function (err) {
                    this.$router.push(action.redirect);   
                }.bind(this)
              );
         
        },
    },
}