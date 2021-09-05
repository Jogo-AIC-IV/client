
const EVENTS_RECEIVED = {
    general: {
        'SETUP': () => {},
        'ERROR': () => {},
    },
    match: {
        'SETUP_MATCH': () => {},
        'FOUND_MATCH': () => {},
        'MATCH_STATE': () => {},
        'FINISH_MATCH': () => {},
    },
    player: {
        'PLAYER_LOGIN': () => {},
        'PLAYER_LOST_LIFE': () => {},
        'PLAYER_DIED': () => {},
    },
    tower: {
        'TOWER_ADDED': () => {},
        'TOWER_COMBINED': () => {},
        'TOWER_TYPE_UP': () => {},
        'TOWER_SHOT': () => {},
    },
    enemy: {
        'ENEMY_DIED': () => {},
        'ENEMY_ADDED': () => {},
    }
}

const EVENTS_SEND = {
    general: {
        'LOGIN': () => {},
        'SIGNUP': () => {},
    },
    match: {
        'SEARCH_MATCH': () => {},
        'SEARCH_STOP': () => {},
        'QUIT_MATCH': () => {},
    },
    tower: {
        'ADD_TOWER': () => {},
        'COMBINE_TOWER': () => {},
        'UPGRADE_TOWER_TYPE': () => {},
    },
    tower_management: {
        'ADD_TOWER_TYPE': () => {},
        'SELECT_TOWER_TYPES': () => {},
    }

}

const SERVER_INFO_ICONS = {
    'player': 'fa fa-user',
    'tower': 'fas fa-chess-pawn',
    'enemy': 'fas fa-pastafarianism',
    'check': 'fa fa-check',
    'times': 'fa fa-times'
};

var app = new Vue({
    el: '#app',
    data(){
        return {
            // Current view
            current_view: 'LOGIN',
            socket: {},

            user: null,

            static: {
                effects:     null,
                tower_types: null
            },

            server_info_timeout:    null,
            server_info_type:       null,
            server_info_show:       false,
            server_info:            null

        }
    },
    methods: {
        emit(event_name, data) {
            if(this.socket) {
                this.socket.emit(event_name, data);
            }
        },
        emitLogin(username, password) {
            this.emit('LOGIN', {username, password});
        },
        emitRegister(username, password) {
            this.emit('SIGNUP', {username, password});
        },
        showServerInfo() {
            console.log('mostrar informação');
            this.server_info_show = true;
            clearTimeout(this.server_info_timeout);
            this.server_info_timeout = setTimeout(() => {
                this.server_info_show = false;
            }, 4000);
        }
    },
    created: function() {
        this.socket = io('localhost:3005');
        this.socket.on('SETUP', (data) => {
            console.log(data);
            this.static.effects = data.setup.effects;
            this.static.tower_types = data.setup.tower_types;
        });
        this.socket.on('INFO', (data) => {
            this.server_info_type = data.status ? 'check' : 'times';
            this.server_info = data.message;
            this.showServerInfo();
        });
        this.socket.on('ERROR', (data) => {
            this.server_info_type = data.type;
            this.server_info = data.message; 
            this.showServerInfo();
        });
        this.socket.on('PLAYER_LOGIN', (data) => {
            if(!data.status) {
                return this.$refs.view_login.setMessage(data.message);
            }else{
                this.user = data.message;
                this.current_view = 'MENU';
            }
        });
        this.socket.on('UPDATE_USER_DATA', (data) => {
            console.log(data);
            this.user = data.user;
        });
    },
    watch: {
        current_view(newVal) {
            console.log(`Abrindo componente ${newVal}.js`);
            switch(newVal) {
                case 'LOGIN':
                    this.socket.disconnect();
                    this.socket.connect();
                break;
                default:
                    console.log(`Abrindo componente ${newVal}.js`);
                break;
            }
        },
        user: {
            deep: true,
            handler() {
                let unlocked_names = this.user.unlockedTowerTypes.map((tower) => (tower.name));
                let selected_names = this.user.selectedTowerTypes.map((tower) => (tower.name));
                this.user.unlockedTowerTypes.forEach((tower) => {
                    tower.selected = selected_names.includes(tower.name);
                });
                Object.keys(this.static.tower_types).forEach((tower_id) => {
                    const tower = this.static.tower_types[tower_id];
                    tower.unlocked = unlocked_names.includes(tower.name);
                });
            }
        },
        server_info() {
            this.showServerInfo();
        }
    },
    mounted: function() {

    }
});
