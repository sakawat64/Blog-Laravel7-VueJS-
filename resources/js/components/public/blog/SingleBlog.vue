<template>
    <span id="singleblog">
        <section id="content">
      <div class="container">
        <div class="row">
          <div class="span8">
            <article>
              <div class="row">
                <div class="span8">
                  <div class="post-image">
                    <div class="post-heading">
                      <h3><a href="#"> {{singlepost.title}}</a></h3>
                    </div>
                    <img :src="singlepost.photo" alt="" />
                  </div>
                  <p>
                    {{singlepost.description}}
                  </p>
                  <div class="bottom-article">
                    <ul class="meta-post">
                      <li><i class="icon-user"></i><a href="#" v-if="singlepost.user">{{singlepost.user.name}}</a></li>
                      <li><i class="icon-folder-open"></i><a href="#" v-if="singlepost.category"> {{singlepost.category.cat_name}}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
        </div>
        <BlogSidebar/>
      </div>
      </div>
    </section>
    </span>
</template>
<script>
import BlogSidebar from "./BlogSideBar.vue"
export default {
     data(){
        return{
            id:""
        }
    },
    components:
    {
        BlogSidebar
    },
    mounted()
    {
      this.singlePost_reload();
    },
    watch:{
        $route(to,form)
        {
            this.singlePost_reload();
        }
    },
    computed:{
      singlepost(){
        return this.$store.getters.getsingleblogpost
      }
    },
    methods:{
        singlePost_reload(){
            this.$store.dispatch('getPostById',this.$route.params.id);
        }
    }
}
</script>
<style scoped>

</style>