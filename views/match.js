Vue.component('view-match', {
    template: `
    <div class="p-4 bg-gray text-white shadow-lg border-2 border-gray-500 mb-2 flex flex-col justify-center items-center">
        <h5 class="flex justify-between text-xl font-bold mb-2 w-full">
            <div class="flex justify-between align-items-stretch flex-row" v-if="match[oponent_match_id]">
                <i :class="(match[oponent_match_id].life > 0 ? 'fas' : 'far') + ' fa-heart text-purple-500 mr-2 text-xl'"></i>
                <i :class="(match[oponent_match_id].life > 1 ? 'fas' : 'far') + ' fa-heart text-purple-500 mr-2 text-xl'"></i>
                <i :class="(match[oponent_match_id].life > 2 ? 'fas' : 'far') + ' fa-heart text-purple-500 mr-2 text-xl'"></i>
            </div>
            <span>Nicolas</span>
        </h5>
        <div class="bg-green-500 _border-4 border-green-700 mb-4 flip-x" ref="canvas_oponent"></div>
        <h5 class="flex justify-between text-xl font-bold mb-2 w-full">
            <span>Amon</span>
            <div class="flex justify-between align-items-stretch flex-row" v-if="match[player_match_id]">
                <i :class="(match[player_match_id].life > 0 ? 'fas' : 'far') + ' fa-heart text-red-500 mr-2 text-xl'"></i>
                <i :class="(match[player_match_id].life > 1 ? 'fas' : 'far') + ' fa-heart text-red-500 mr-2 text-xl'"></i>
                <i :class="(match[player_match_id].life > 2 ? 'fas' : 'far') + ' fa-heart text-red-500 mr-2 text-xl'"></i>
            </div>
        </h5>
        <div class="bg-green-500 _border-4 border-green-700 mb-1" ref="canvas_player"></div>
    </div>
    <div class="bg-green-500 w-50 text-white border-2 border-gray border-b-0 text-xl text-center px-6 py-4" v-if="match[player_match_id]">
        <i class="fas fa-coins mr-2"></i> {{ match[player_match_id].money.toFixed(2) }}
    </div>
    <div class="flex justify-around items-stretch flex-row w-full border-gray-500" v-if="match[player_match_id]">
        <button
        @click="buyRandomUnit()"
        class="flex justify-center items-center flex-col flex-1 text-white bg-gray border-r-2 border-l-2 border-gray-500 border-r-0 font-medium hover:bg-gray-800 transition px-6 py-4">
            <img src="assets/sprites/enemy.png" class="h-9 mb-2 unknowm">
            <h5 class="font-bold">Random</h5>
            <p>Unit</p>
            <b>
                <i class="fas fa-coins mr-2"></i>
                {{ match[player_match_id].unit_price.toFixed(2) }}
            </b>
        </button>
        <button
        @click="upgradeUnitType(1)"
        v-for="(type, type_name) in match[player_match_id].types"
        class="flex justify-center items-center flex-col bg-gray text-white  border-r-2 border-gray-500 border-r-0 font-medium hover:bg-gray-800 transition px-6 py-4">
            <img :src="'assets/sprites/'+type_name+'_0.png'" class="h-9 mb-2">
            <h5 class="font-bold">{{type_name}}</h5>
            <p>Level Up</p>
            <b>
                <i class="fas fa-coins mr-2"></i>
                100
            </b>
        </button>
    </div>
    <div class="bg-red-500 w-50 text-white border-2  border-t-0 text-xl text-center px-6 py-4 hover:bg-red-700 cursor-pointer" @click="in_match=false">
        <i class="fa fa-sign-out-alt mr-2"></i> Sair
    </div>`
});
