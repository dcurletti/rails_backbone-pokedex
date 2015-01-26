Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $("<li>")
              .append("Name:" + pokemon.get("name") + " ")
              .append("Type:" + pokemon.get("poke_type"))
              .addClass("poke-list-item")
              .attr('data-id', pokemon.get("id"));
  this.$pokeList.append($li);
};

Pokedex.RootView.prototype.refreshPokemon = function (callback) {
  var that = this;
  that.pokes.fetch({
    success: function(){
      that.pokes.each( function (poke) {
        that.addPokemonToList(poke);
      })
    }
  });
};
