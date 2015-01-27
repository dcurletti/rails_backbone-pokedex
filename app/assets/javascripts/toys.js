// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

Pokedex.RootView.prototype.reassignToy = function(event){
  var $target = $(event.target);
  console.log($target.attr('data-pokemon-id'));
  console.log($target.attr('data-toy-id'));
}
