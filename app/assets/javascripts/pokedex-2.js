Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $li = $("<li>")
              .append("Name: " + toy.get("name"))
              .append("Happiness: " + toy.get("happiness"))
              .append("Price :" + toy.get("price"))
              .attr("data-toy-id", toy.get("id"))
              .attr("data-pokemon-id", toy.get("pokemon_id"));

  this.$pokeDetail.find('ul.toys').append($li);

};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $div = $("<div>")
                .addClass("detail")
                .append("<img src='" + toy.attributes.image_url + "'>");

  var attr = _.pairs(toy.attributes);
  _.each(attr, function (pair) {
    if (pair[0] === "image_url") {
    } else {
      $div.append(pair[0] + ": " + pair[1]);
      $div.append("<br>")
    }
  })

  this.$toyDetail.html($div);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  event.preventDefault();
  var $target = $(event.target);
  var id = $target.attr("data-toy-id");
  var pokemonId = $target.attr("data-pokemon-id")
  var pokemon = this.pokes.get(pokemonId);

  var toy = pokemon.toys().get(id)

  this.renderToyDetail(toy);
};
