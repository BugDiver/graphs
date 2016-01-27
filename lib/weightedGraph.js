var ld = require('lodash');
var graphs = {};

var initialization = function(vertices,from){
   var init = {parents : {} , distances : {}}
   vertices.forEach(function(vertex){
      init.distances[vertex] = (vertex != from) && Infinity || 0;
      init.parents[vertex] = (vertex != from) && null || from;
   });
   return init;
};

var findMinimalDistanceVertex = function(vertices,distances){
   return vertices.reduce(function(v1 ,v2){
      return (distances[v1] < distances[v2]) ? v1 : v2;
   });
};
var edgeBetween = function(from ,to ,graph){
   return graph[from].reduce(function( e1,e2){
      if(e1.to == to && e1.length < e2.length)
         return e1
      return e2
   });
};

var figureShortestPath = function(destination ,graph,parents ,path){
   var path = path || [];
   if(parents[destination] == destination)
      return path.reverse()
   path.push(edgeBetween(parents[destination] ,destination ,graph));
   return figureShortestPath(parents[destination],graph,parents ,path)
};

graphs.WeightedGraph = function(){
   this.graph = {};
}

graphs.WeightedGraph.prototype = {
   addVertex : function(vertex){
      this.graph[vertex] = this.graph[vertex] || [];
   },
   addEdge : function(edge){
      this.graph[edge.from].push(edge);
   },
   shortestPath : function(from ,to){
      var vertices = Object.keys(this.graph);
      var distances = initialization(vertices ,from).distances;
      var parents = initialization(vertices,from).parents;
      while(vertices.length > 0){
         var vertex = findMinimalDistanceVertex(vertices,distances);
         ld.remove(vertices,function(v){return v == vertex});
         for (var i = 0; i < this.graph[vertex].length; i++) {
            var edge = this.graph[vertex][i];
            if(distances[edge.to] > (distances[vertex] + edge.length)){
               distances[edge.to] = (distances[vertex] + edge.length);
               parents[edge.to] = vertex;
            }
         }
      }
      return figureShortestPath(to,this.graph,parents);
   }
}

graphs.Edge = function(id ,from ,to ,length){
   this.id = id;
   this.from = from;
   this.to = to;
   this.length = length;
}

module.exports =  graphs;
