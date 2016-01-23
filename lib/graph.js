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
      if(from == to)
         return visited.concat(from);
      for (var i = 0; i < this.graphs[from].length ;i++) {
         if(visited.indexOf(this.graphs[from][i]) == -1){
            var path = this.pathBetween(this.graphs[from][i], to, visited.concat(from));
            if(path.slice(-1) == to) return path;
         };
      }
      return [];
   },
   farthestVertex : function(vertex){
      var self = this;
      return Object.keys(self.graphs).reduce(function(longestTrip ,v){
         if(vertex != v && self.pathBetween(vertex,v).length > longestTrip.length)
            return self.pathBetween(vertex,v);
         return longestTrip;
      },[]).slice(-1);
   },
   allPaths : function(from ,to ,visited ,paths){
      var visited = visited || [];
      var paths = paths || [];
      if(from == to)
         return visited.concat(from);
      for (var i = 0; i < this.graphs[from].length ;i++) {
         if(visited.indexOf(this.graphs[from][i]) == -1){
            var path = this.allPaths(this.graphs[from][i], to, visited.concat(from) ,paths);
            if(path.slice(-1) == to) {
               paths.push(path)
            };
         };
      }
      return paths;
   }
};


//===================================================================================================

graph.DirectedGraph = function(){
   this.graphs = {};
};

graph.DirectedGraph.prototype = {
   addVertex : function(vertex){
      this.graphs[vertex] = this.graphs[vertex] || [];
   },
   addEdge : function(from ,to){
      this.graphs[from] = this.graphs[from] && this.graphs[from].concat(to) || [to];
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
      },0);
   },
   pathBetween : function(from ,to,visited){
      var visited = visited || [];
      if(from == to)
         return visited.concat(from);
      for (var i = 0; i < this.graphs[from].length; i++) {
         if(visited.indexOf(this.graphs[from][i]) == -1){
            var path = this.pathBetween(this.graphs[from][i], to, visited.concat(from));
            if(path.slice(-1) == to) return path;
         };
      }
      return [];
   },
   farthestVertex : function(vertex){
      var self = this;
      return Object.keys(self.graphs).reduce(function(longestTrip ,v){
         if(vertex != v && self.pathBetween(vertex,v).length > longestTrip.length)
            return self.pathBetween(vertex,v);
         return longestTrip;
      },[]).slice(-1);
   },
   allPaths : function(from ,to ,visited ,paths){
      var visited = visited || [];
      var paths = paths || [];
      if(from == to)
         return visited.concat(from);
      for (var i = 0; i < this.graphs[from].length ;i++) {
         if(visited.indexOf(this.graphs[from][i]) == -1){
            var path = this.allPaths(this.graphs[from][i], to, visited.concat(from) ,paths);
            if(path.slice(-1) == to) {
               paths.push(path)
            };
         };
      }
      return paths;
   }
};


module.exports = graph;
