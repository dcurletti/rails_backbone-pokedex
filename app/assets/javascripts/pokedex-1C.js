Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var that = this;
  var pokemon = new Pokedex.Models.Pokemon(attrs);
  pokemon.save({}, {
    success: function () {
      console.log("Saved!");
      that.pokes.push(pokemon);
      that.addPokemonToList(pokemon);
      callback(pokemon);
    },
    error: function () {
      console.log("Not saved!");
    }
  });


};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  var that = this;
  event.preventDefault();
  var $target = $(event.target);
  var json = $target.serializeJSON();
  this.createPokemon(json.pokemon, that.renderPokemonDetail.bind(that))
};
