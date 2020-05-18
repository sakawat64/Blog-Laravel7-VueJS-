export default {
    state: {
        category:[],
        post:[],
        blogpost:[],
        singlepost:[],
        categories:[],
    },
    getters: {
        getCategory(state)
        {
            return state.category
        },
        getPost(state)
        {
            return state.post
        },
        getblogpost(state)
        {
            return state.blogpost
        },
        getsingleblogpost(state)
        {
            return state.singlepost
        },
        getallcategories(state)
        {
            return state.categories
        },
    },
    actions: {
        allCategory(context){
            axios.get('/category')
                .then((response)=>{
                    context.commit('categories',response.data.categories)
                })
        },
        getAllpost(context){
            axios.get('/post')
                .then((response)=>{
                    context.commit('allpost',response.data.posts)
                })
        },
        getblogPost(context){
            axios.get('/blogpost')
                .then((response)=>{
                    context.commit('blogpost',response.data.posts)
                })
        },
        getPostById(context,payload){
            axios.get('/singlepost/'+payload)
                .then((response)=>{
                    context.commit('singlepost',response.data.post)
                })
        },
        allCategories(context){
            axios.get('/categories')
                .then((response)=>{
                    context.commit('allcategories',response.data.categories)
                })
        },
        getPostByCatId(context,payload){
            axios.get('/categorypost/'+payload)
                .then((response)=>{
                    context.commit('categoriesbyid',response.data.posts)
                })
        },
        SearchPost(context,payload){
            axios.get('/search?s='+payload)
                .then((response)=>{
                    context.commit('SearchPost',response.data.posts)
                })
        },
    },
    mutations:{
        categories(state,data){
            return state.category = data
        },
        allpost(state,data){
            return state.post = data
        },
        blogpost(state,data){
            return state.blogpost = data
        },
        singlepost(state,data){
            return state.singlepost = data
        },
        allcategories(state,data){
            return state.categories = data
        },
        categoriesbyid(state,data){
            return state.blogpost = data
        },
        SearchPost(state,data){
            return state.blogpost = data
        },
    }
}