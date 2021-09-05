/*
{
    "money": 0,
    "unlockedTowerTypes": [
        {
            "name": "Gelo",
            "isDefault": true,
            "effect": "slow",
            "price": 300,
            "range": 900,
            "rate": 4,
            "color": [
                255,
                255,
                255
            ],
            "bullet": {
                "size": 5,
                "speed": 10,
                "damage": 1,
                "duration": 10
            },
            "id": "6109d182fa72e6a02f2f4723"
        }
    ],
    "selectedTowerTypes": [
        {
            "name": "Gelo",
            "isDefault": true,
            "effect": "slow",
            "price": 300,
            "range": 900,
            "rate": 4,
            "color": [
                255,
                255,
                255
            ],
            "bullet": {
                "size": 5,
                "speed": 10,
                "damage": 1,
                "duration": 10
            },
            "id": "6109d182fa72e6a02f2f4723"
        }
    ],
    "_id": "6110671c7f702ffa1823c6de",
    "username": "iago",
    "password": "$2b$08$cz.z7TltbpfxCLeZlGNjauJre7igC0y78VE6NKNgKF7X.MXets7rO",
    "createdAt": "2021-08-08T23:22:04.599Z",
    "__v": 0
}
*/

Vue.component('view-menu', {
    props: {
        user: Object,
        tower_types: Array
    },
    created() {
        console.log(this.user);
        console.log(this.tower_types);
    },
    data() {
        return {
            text: 'aaaaaaaaaaaaaa'
        }
    },
    methods: {
        signOut() {
            this.$parent.current_view = 'LOGIN';
        },
        toggleTower(tower_id) {
            this.$emit('toggle', tower_id);
        },
        buyTower(tower_id) {
            this.$emit('buy', tower_id);
        }
    },
    template: `
    <div v-if="user">
        <div class="p-4 bg-gray text-white shadow-lg border-2 border-gray-500 mb-2 flex justify-between align-center flex-row">
            <h5 class="text-xl font-bold">Welcome, {{user.username}}!</h5>
            <span class="font-bold text-xl">
                <i class="fas fa-coins mr-2"></i>
                {{user.money}}
            </span>
        </div>
        <h5 class="font-bold text-xl text-white">Your Units ({{user.selectedTowerTypes.length}}/3)</h5>
        <div class="flex flex-row mb-2">
            <div
            v-for="(tower, index) in user.unlockedTowerTypes"
            :key="'unlocked_tower_'+index"
            :class="tower.selected ? 'border-blue-500':'border-gray-500'"
            class="flex justify-center items-center text-white bg-gray border-2 flex-col p-2 w-32">
                <img :src="'assets/sprites/'+tower.name.toLowerCase()+'.png'" class="h-16 mb-2">
                <h5 class="text-xl font-bold">
                    {{tower.name}}
                </h5>
                <table>
                    <tr>
                        <td><i class="fa-sm fas fa-bullseye mr-3"></i></td>
                        <td>{{tower.range}}</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-ellipsis-h mr-3"></i></td>
                        <td>{{10 - tower.rate}}</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-location-arrow mr-3"></i></td>
                        <td>{{10 - tower.bullet.damage}}</td>
                    </tr>
                </table>
                <button
                v-on:click="toggleTower(tower.id)"
                :class="tower.selected ? 'border-blue-500 text-blue-500':'border-gray-500'"
                class="w-full bg-gray text-sm text-center p-2 text-white border-2 text-xl font-bold hover:bg-gray-800 transition cursor-pointer" @click="in_match=true">
                    <i class="fa-sm fas fa-check"></i>
                </button>
            </div>
        </div>
        <h5 class="font-bold text-xl text-white">Shop</h5>
        <div class="flex flex-row mb-6">
            <div
            v-for="(tower, index) in tower_types"
            :key="'unlocked_tower_'+index"
            :class="tower.unlocked?'':''"
            class="flex justify-between items-center text-white bg-gray border-2 border-gray-500 flex-col p-2 w-32">
                <img
                :src="'assets/sprites/'+tower.name.toLowerCase()+'.png'" 
                :class="tower.unlocked ? '' : 'unknowm'"
                class="h-16 mb-2">
                <h5 class="text-xl font-bold">
                    {{tower.name}}
                </h5>
                <button
                v-if="!tower.unlocked"
                v-on:click="buyTower(tower.id)"
                class="w-full bg-gray text-sm text-center p-2 text-white border-2 text-xl font-bold hover:bg-gray-800 transition cursor-pointer" @click="in_match=true">
                    <i class="fas fa-coins mr-2"></i>
                    {{tower.price}}
                </button>
                <table v-else>
                    <tr>
                        <td><i class="fa-sm fas fa-bullseye mr-3"></i></td>
                        <td>{{tower.range}}</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-ellipsis-h mr-3"></i></td>
                        <td>{{10 - tower.rate}}</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-location-arrow mr-3"></i></td>
                        <td>{{10 - tower.bullet.damage}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <button class="bg-gray border-gray-500 text-center p-4 text-white border-2 text-xl font-bold hover:bg-gray-800 transition cursor-pointer" @click="in_match=true">
            <i class="fas fa-user-friends mr-2"></i> Find Match
        </button>
        <button
        v-on:click="signOut"
        class="bg-gray border-gray-500 text-center p-4 text-white border-2 text-xl font-bold hover:bg-gray-800 transition cursor-pointer">
            <i class="fas fa-sign-out-alt"></i> Sign Out
        </button>
    </div>
    <div v-else>
        <h4 class="text-center text-white text-2xl">
            Error loading account information, reload the page to try again.
        </h4>
    </div>`
});