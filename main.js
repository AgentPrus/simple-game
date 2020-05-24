function generateAttackDamage() {
  return Math.floor(Math.random() * 10 + 3);
}

function heal() {
  return Math.floor(Math.random() * 10 + 3);
}

// TODO: Create Pop Up when games will end

new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    // Property which represents amount of damage
    myDamage: 0,
    monsterDamage: 0,
    // Array of attacks messages
    healMsg: "",
    monsterAttackMsg: "",
    myAttackMsg: "",
    msgsLog: [],
  },
  watch: {
    myDamage: function (val) {
      if (val > 0) {
        this.myAttackMsg = `Player Hits Monster For ${val}`;
        this.msgsLog.unshift(this.myAttackMsg);
      }
    },
    monsterDamage: function (val) {
      if (val > 0) {
        this.monsterAttackMsg = `Monster Hits Player For ${val}`;
        this.msgsLog.unshift(this.monsterAttackMsg);
      }
    },
    playerHealth: function (val) {
      console.log(val);
      if (val < 0) {
        let result = confirm("You are loose! Try Again?");
        result ? this.startGame() : this.quit();
      }
    },
    monsterHealth: function (val) {
      if (val < 0) {
        let result = confirm("Congratulations you are win! Play Again ?");
        result ? this.startGame() : this.quit();
      }
    },
  },

  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      // Reset all properties
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.myDamage = 0;
      this.monsterDamage = 0;
      this.msgsLog = [];
    },
    quit: function () {
      this.gameIsRunning = false;
    },
    monsterAttack: function () {
      this.monsterDamage = generateAttackDamage();
      // Monster Attack Me
      this.playerHealth -= this.monsterDamage;
    },
    myAttack: function () {
      this.myDamage = generateAttackDamage();
      // I Attack Monster
      this.monsterHealth -= this.myDamage;
    },
    specialAttack: function () {
      this.myDamage = generateAttackDamage() + 3;

      // I Special Attack Monster
      this.monsterHealth -= this.myDamage;
    },
    heal: function () {
      // Heal yourself
      this.playerHealth += heal();

      // Log Heal
      this.healMsg = `Player heals himself for ${heal()}`;
      this.msgsLog.unshift(this.healMsg);
    },
    getMsgClass: function (index) {
      if (index % 2 === 0) {
        return "alert alert-danger";
      } else {
        return "alert alert-primary";
      }
    },
  },
});
