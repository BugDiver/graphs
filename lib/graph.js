var graph = {};
graph.UndirectedGraph = function(){
   this.graphs = {};
};

graph.UndirectedGraph.prototype = {
   addVertex : function(vertex){
      this.graphs[vertex] = this.graphs[vertex] || [];
   },
   addEdge : function(from ,to){
      this.graphs[from].push(to);
      this.graphs[to].push(from);
   },
   hasEdgeBetween : function(from ,to){
      return this.graphs[from].indexOf(to) != -1;
   },
   order : function(){
      return Object.keys(this.graphs).length;
   },
   size : function(){
      var graphs = this.graphs;
      return Object.keys(graphs).reduce(function(edges,vertex){
         return edges + graphs[vertex].length;
      },0)/2;
   },
}

module.exports = graph;
