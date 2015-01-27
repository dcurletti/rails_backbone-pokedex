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
  var pokes = this.pokes;
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

  var $select = $("<select>").addClass("select-pokes");
  pokes.forEach( function (poke) {
    var $option = $("<option>")
          .val(poke.get("id"))
          .text(poke.get("name"))
          .attr("data-toy-id", toy.get("id"))
          .attr("data-pokemon-id", toy.get("pokemon_id"));

    if (poke.get("id") === toy.get("pokemon_id")) {
      $option.prop("selected", true);
    }

    $select.append($option)
  })

  $div.append($select);
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


Pokedex.RootView.prototype.reassignToy = function(event){
  var that = this;
  var $target = $(event.target);
  var $selected = $target.find(":selected");
  var old_pokemon_id = $selected.attr("data-pokemon-id");
  var new_pokemon_id = $selected.val();
  var toy_id = $selected.attr("data-toy-id");
  var old_pokemon = this.pokes.get(old_pokemon_id);
  var toy = old_pokemon.toys().get(toy_id);
  toy.set("pokemon_id", new_pokemon_id);
  toy.save({}, {
    success: function () {
      old_pokemon.toys().remove(toy);
      that.renderPokemonDetail(old_pokemon);
      that.$toyDetail.empty();
    }
  })

}
