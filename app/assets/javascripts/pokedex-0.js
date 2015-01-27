window.Pokedex = (window.Pokedex || {});
window.Pokedex.Models = {};
window.Pokedex.Collections = {};

Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: "/pokemon",
  toys: function (){
    this._toys = this._toys || new Pokedex.Collections.PokemonToys();
    return this._toys;
  },

  parse: function(payload) {
    if (payload.toys) {
      this.toys().set(payload.toys, {parse: true});
      delete payload.toys;
    }

    return payload;
  }
}); // WRITE ME

Pokedex.Models.Toy = Backbone.Model.extend({
  urlRoot: "/toys"
}); // WRITE ME IN PHASE 2

Pokedex.Collections.Pokemon = Backbone.Collection.extend({
  url: "/pokemon",
  model: Pokedex.Models.Pokemon
}); // WRITE ME

Pokedex.Collections.PokemonToys = Backbone.Collection.extend({
  url: "/toys",
  model: Pokedex.Models.Toy
}); // WRITE ME IN PHASE 2

window.Pokedex.Test = {
  testShow: function (id) {
    var pokemon = new Pokedex.Models.Pokemon({ id: id });
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  },

  testIndex: function () {
    var pokemon = new Pokedex.Collections.Pokemon();
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  }
};

window.Pokedex.RootView = function ($el) {
  var that = this;
  this.$el = $el;
  this.pokes = new Pokedex.Collections.Pokemon();
  this.$pokeList = this.$el.find('.pokemon-list');
  this.$pokeDetail = this.$el.find('.pokemon-detail');
  this.$newPoke = this.$el.find('.new-pokemon');
  this.$toyDetail = this.$el.find('.toy-detail');

  // Click handlers go here.

  this.$pokeList.on('click', function(event) {
    return that.selectPokemonFromList(event);
  })

  this.$newPoke.on("submit", function(event) {
    return that.submitPokemonForm(event);
  })

  this.$pokeDetail.on("click", function(event) {
    return that.selectToyFromList(event);
  })

  this.$toyDetail.on("change", "select", function (event) {
    return that.reassignToy(event);
  })
};

$(function() {
  var $rootEl = $('#pokedex');
	window.Pokedex.rootView = new Pokedex.RootView($rootEl);
  window.Pokedex.rootView.refreshPokemon();
});
