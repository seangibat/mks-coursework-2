// this is a copy paste from the code box on hackerrank.com/challenges/bus-station.
// solution works. just copied here to save.

function processData(input) {
    // parsing the input
    arr = input.split(' ');
    arr[0] = arr[3];
    
    // Add up all the people at all stops -- that is the max bus size
    maxBusSize = arr.reduce(function(prev, item){ return parseInt(prev) + parseInt(item) }, 0);
    solutions = "";
    
    for(var busSize=1; busSize<=maxBusSize; busSize++){
        possible = true;
        spotsLeft = busSize;
        
        arr.forEach(function(peopleAtStop, n){
            spotsLeft = spotsLeft - peopleAtStop;
            if (spotsLeft < 0)
                possible = false;
            else if (spotsLeft == 0)
                spotsLeft = busSize;
        });
        
        if (possible && spotsLeft == busSize)
            solutions += busSize + " ";
    }
    
    console.log(solutions);
}