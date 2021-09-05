Vue.component('view-login', {
    template: `
    <div class="p-4 bg-gray text-white shadow-lg border-2 border-gray-500 mb-2 flex justify-between align-center flex-col">
        <h2 class="text-2xl font-bold text-center mb-3">Tiny Towers</h2>
        <p class="mn-3">{{message}}</p>
        <div class="mb-3">
            <p><b>Username</b></p>
            <input ref="input_username" type="text" v-model="username" class="px-2 py-1 bg-gray text-white border-2 border-gray-500">
        </div>
        <div class="mb-3">
            <p><b>Password</b></p>
            <input ref="input_password" type="password" v-model="password" class="px-2 py-1 bg-gray text-white border-2 border-gray-500">
        </div>
        <div class="mb-3" v-show="create_account">
            <p>Confirm Password</p>
            <input ref="input_password_confirm" type="password" v-model="password_confirm" class="px-2 py-1 bg-gray text-white border-2 border-gray-500">
        </div>
        <button class="bg-gray border-gray-500 text-center p-4 text-white border-2 text-xl font-bold hover:bg-gray-800 transition cursor-pointer" @click="submitForm">
            <i :class="!create_account ? 'fas fa-sign-in-alt mr-2' : 'fas fa-user-plus mr-2'"></i>
            {{!create_account?'Login':'Register'}}
        </button>
        <a
        class="mt-5 underline cursor-pointer hover:opacity-50"
        @click="create_account=!create_account"
        v-html="create_account?'Login':'Register account'"
        />
    </div>`,
    data(){
        return {
            message:            '',
            username:           '',
            password:           '',
            password_confirm:   '',
            create_account:     false,
        }
    },
    methods: {
        submitForm() {
            if(this.create_account){
                if(this.password == this.password_confirm){
                    this.$emit('register', this.username, this.password);
                }else{
                    this.$refs.input_password_confirm.classList.add('border-red-500');
                    this.$refs.input_password_confirm.focus();
                }
            }else{
                this.$emit('login', this.username, this.password);
            }
        },
        setMessage(message) {
            this.message = message;
        }
    },
    watch: {
        username(newVal) {
            if(newVal.length < 3 && newVal.length > 0) {
                this.$refs.input_username.classList.add('border-red-500');
            }else{
                this.$refs.input_username.classList.remove('border-red-500');
            }
        },
        password(newVal) {
            if(newVal.length < 3 && newVal.length > 0) {
                this.$refs.input_password.classList.add('border-red-500');
            }else{
                this.$refs.input_password.classList.remove('border-red-500');
            }
        }
    }
});