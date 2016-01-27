var graphs=require('./lib/graph');
var assert=require('chai').assert;
describe("add Edges",function(){
    it("should be able to determine if an edge is present",function(){
        var g=new graphs.UndirectedGraph();
        g.addVertex('A');
        g.addVertex('B');
        g.addEdge('A','B');
        assert.ok(g.hasEdgeBetween('A','B'));
        assert.ok(g.hasEdgeBetween('B','A'));
    });
});

describe("paths",function(){
    var g;
    beforeEach(function(){
        g=new graphs.UndirectedGraph();
        g.addVertex('A');
        g.addVertex('B');
        g.addVertex('C');
        g.addVertex('D');
        g.addVertex('E');
        g.addVertex('F');
        g.addVertex('G');
        g.addVertex('H');
        g.addVertex('I');
    });

    it("should determine a path between two adjacent vertices",function(){
        g.addEdge('A','B');
        g.addEdge('A','H');
        g.addEdge('B','D');
        g.addEdge('B','C');
        g.addEdge('C','E');
        g.addEdge('C','G');
        g.addEdge('E','F');
        g.addEdge('H','I');

        assert.deepEqual([ 'A', 'B', 'C', 'E' ],g.pathBetween('A','E'));
        assert.deepEqual([ 'A', 'B', 'C','G' ],g.pathBetween('A','G'));
        assert.deepEqual([ 'D', 'B', 'A', 'H', 'I' ],g.pathBetween('D','I'));
        assert.deepEqual([ 'D', 'B', 'C', 'G'],g.pathBetween('D','G'));


    });
});
