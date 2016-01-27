var ld = require('lodash');
var graphs = {};

var initialization = function(vertices,from){
   init = {parents : {} , distances : {}}
   var distance =  vertices.reduce(function(init,vertex){
      init.distances[vertex] = Infinity;
      init.parents[vertex] = null;
      return init;
   },init);
   init.distances[from] = 0;
   init.parents[from] = from;
   return distance;
}
var findMinimalDistanceVertex = function(source ,vertices,distances){
   return vertices.reduce(function(v1 ,v2){
      return (distances[v1] < distances[v2]) ? v1 : v2
   });
};
var edgeBetween = function(from ,to ,graph){
   return ld.find(graph[from],function(e){
      return e.to == to;
   })
}

var figureShortestPath = function(from ,to ,graph,parents ,path){
   path = path || [];
   if(parents[to] == to){
      return path.reverse()
   }
   path.push(edgeBetween(parents[to] ,to ,graph));
   return figureShortestPath(from ,parents[to],graph,parents ,path)
};

graphs.WeightedGraph = function(){
   this.graph = {};
   this.count = 0
}

graphs.WeightedGraph.prototype = {
   addVertex : function(vertex){
      this.graph[vertex] = this.graph[vertex] || [];
   },
   addEdge : function(edge){
      this.graph[edge.from].push(edge);
      this.count++;
   },
   shortestPath : function(from ,to){
      var vertices = Object.keys(this.graph);
      var distances = initialization(vertices ,from).distances;
      var parents = initialization(vertices,from).parents;
      while(vertices.length > 0){
         var vertex = findMinimalDistanceVertex(from ,vertices,distances);
         vertices.shift();
         for (var i = 0; i < this.graph[vertex].length; i++) {
            var edge = this.graph[vertex][i];
            if(distances[edge.to] > (distances[vertex] + edge.length)){
               distances[edge.to] = (distances[vertex] + edge.length);
               parents[edge.to] = vertex;
            }
         }
      }
      return figureShortestPath(from ,to,this.graph,parents);
   }
}

graphs.Edge = function(id ,from ,to ,length){
   this.id = id;
   this.from = from;
   this.to = to;
   this.length = length;
}

module.exports =  graphs;
