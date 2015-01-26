Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var that = this;
  var $div = $('<div>').addClass('detail').append("<img src='" + pokemon.attributes.image_url + "'>");
  var attr = _.pairs(pokemon.attributes);
  _.each(attr, function (pair) {
    if (pair[0] === "image_url") {
    } else {
      $div.append(pair[0] + ": " + pair[1]);
      $div.append("<br>")
    }
  })

  var $ul = $("<ul>").addClass("toys");
  $div.append($ul);
  pokemon.fetch({
    success: function () {
      _.each(pokemon.toys().models, function(toy){
        that.addToyToList(toy)
      })
    }
  })

  this.$pokeDetail.html($div);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var $target = $(event.target);
  var id = $target.attr("data-id");
  var pokemon = this.pokes.get(id);
  this.renderPokemonDetail(pokemon);
};
