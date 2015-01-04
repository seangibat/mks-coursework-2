$(function(){

  var oldGuardians = [
    {
      name: "Star Lord",
      notes: "Team leader"
    },
    {
      name: "Drax the Destroyer"
    },
    {
      name: "Adam Warlock"
    },
    {
      name: "Quasar",
      notes: "Changed name to Martyr in Guardians of the Galaxy vol. 2 #12 (May 2009)."
    },
    {
      name: "Rocket",
      notes: "Served as temporary leader during Star-Lord's absence"
    },
    {
      name: "Gamora"
    }
  ];

  var newGuardians = [
    {
      name: "Mantis",
      notes: "Served as an advisor beginning in Guardians of the Galaxy vol. 2 #1 (July 2008) before becoming an active member."
    },
    {
      name: "Groot",
      notes: "Appeared as a sapling beginning in Guardians of the Galaxy vol. 2 #1 (July 2008); joined active team after fully regrowing."
    },
    {
      name: "Jack Flag"
    },
    {
      name: "Quasar",
      notes: "Changed name to Martyr in Guardians of the Galaxy vol. 2 #12 (May 2009)."
    },
    {
      name: "Cosmo the Spacedog",
      notes: "Assisted the team beginning in Guardians of the Galaxy vol. 2 #1 (July 2008) before officially joining team."
    },
    {
      name: "Major Victory",
      notes: "Also member of the alternate reality Guardians of the Galaxy team."
    },
    {
      name: "Bug"
    },
    {
      name: "Moondragon",
      notes: "Resurrected by Drax and Phyla-Vell."
    }
  ];

  var newArrGuards = oldGuardians.slice(0);

  $.merge(newArrGuards, newGuardians);

  console.log(newArrGuards);

  var keys = $.map(newArrGuards, function(value){
    return Object.keys(value);
  });

  console.log(keys);

  uniqueKeys = keys.filter(function(v,i){
    return keys.indexOf(v) === i;
  });

  var table = $('<table>');

  var header = $('<tr>');


  for (var i=0;i<uniqueKeys.length;i++){
    var colName = $('<th>').append(uniqueKeys[i]);
    header.append(colName);
  }

  table.append(header);

  for (var i=0;i<newArrGuards.length;i++){
    console.log(newArrGuards[i]);
    var row = $('<tr>');
    for (prop in newArrGuards[i]){
      row.append($('<td>').append(newArrGuards[i][prop]));
    }
    table.append(row);
  }

  $('body').append(table);

});