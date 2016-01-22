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
   pathBetween : function(from ,to,visited){
      var visited = visited || [];
      if(this.hasEdgeBetween(from,to)){
         return visited.concat(from,to);
      }
      for (var i = this.graphs[from].length-1; i >= 0 ;i--) {
         if(visited.indexOf(this.graphs[from][i])== -1 ){
            visited.push(from)
            return this.pathBetween(this.graphs[from][i],to,visited);
         }
      }
      return visited;
   }
}

module.exports = graph;
