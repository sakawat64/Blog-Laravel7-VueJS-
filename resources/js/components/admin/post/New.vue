<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row justify-content-around">
                <!-- left column -->
                <div class="col-md-10">
                    <!-- general form elements -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Add New Post</h3>
                        </div>
                        <!-- /.card-header -->
                        <!-- form start -->
                        <form role="form" enctype="multipart/form-data" @submit.prevent="addnewPost()">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="postId">Title</label>
                                    <input type="text" class="form-control" id="postId" placeholder="Provide Post Title" name="title" v-model="form.title" :class="{ 'is-invalid': form.errors.has('title') }">
                                    <has-error :form="form" field="title"></has-error>
                                </div>
                                <div class="form-group">
                                    <label for="descriptionId">Description</label>
                                    <!-- <textarea class="form-control" id="descriptionId" placeholder="Provide Post Description" name="description" v-model="form.description" :class="{ 'is-invalid': form.errors.has('description') }">
                                    </textarea> -->
                                    <markdown-editor name="description" id="descriptionId"  :class="{ 'is-invalid': form.errors.has('description') }" v-model="form.description"></markdown-editor>
                                    <has-error :form="form" field="description"></has-error>
                                </div>
                                <div class="form-group">
                                    <label for="categoryId">Select Category</label>
                                    <select class="form-control" name="cat_id" :class="{ 'is-invalid': form.errors.has('cat_id') }" v-model="form.cat_id">
                                        <option disabled value="">Select One</option>
                                        <option :value="category.id" v-for="category in getallCategory">{{category.cat_name}}</option>
                                    </select>
                                    <has-error :form="form" field="cat_id"></has-error>
                                </div>
                                <div class="form-group">
                                    <input type="file" @change="changePhoto($event)" name="photo" :class="{ 'is-invalid': form.errors.has('photo') }">
                                    <img :src="form.photo" width="80" height="80" alt="">
                                    <has-error :form="form" field="photo"></has-error>
                                </div>

                            </div>
                            <!-- /.card-body -->

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                    <!-- /.card -->

                </div>

            </div>
            <!-- /.row -->
        </div><!-- /.container-fluid -->
    </section>
</template>
<script>
export default {
    name:"New",
    data()
    {
        return{
            form: new Form({
                title:'',
                description:'',
                cat_id:'',
                photo:'',
            })
        }
    },
    mounted(){
        this.$store.dispatch("allCategory")
    },
    computed:{
        getallCategory(){
        return this.$store.getters.getCategory
      }
    },
    methods:{
        changePhoto(event){
            let file = event.target.files[0];
            if(file.size > 1048576)
            {
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'File Size not more tham 1 MB!',
                footer: '<a href>Why do I have this issue?</a>'
                })
            }
            else
            {
                let reader = new FileReader();
                reader.onload = event => {
                this.form.photo = event.target.result
                };
                reader.readAsDataURL(file);
            }
        },
        addnewPost()
        {
           this.form.post('/savepost')
           .then((response)=>{
               this.$router.push('/post-list')
                Toast.fire({
                icon: 'success',
                title: 'Post added successfully'
                })
           })
           .catch(()=>{
                console.log("Error");
            })
        }
    }
}
</script>
<style scoped>

</style>