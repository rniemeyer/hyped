var should = require( "should" ); // jshint ignore: line
var _ = require( "lodash" );
var when = require( "when" );
var model = require( "./model.js" );
var HyperModel = require( "../src/hyperModel.js" );

var board1 = model.board1;
var board2 = model.board2;
var deepCompare = model.deepCompare;

describe( "with property filter", function() {
	var resource = {
		name: "board",
		actions: {
			self: {
				method: "get",
				url: "/board/:id",
				filter: function( value, key ) {
					return key.charAt( 0 ) !== "_" && key !== "lanes";
				}
			}
		}
	};

	var self;
	var expectedSelf = {
		id: 100,
		title: "Test Board",
		tags: [ "one", "two", "three" ],
		description: "This is a board and stuff!",
		_origin: { href: "/board/100", method: "GET" },
		_links: {
			self: { href: "/board/100", method: "GET" }
		}
	};

	before( function() {
		var hypermodel = HyperModel( { board: resource } );
		self = hypermodel( board1, "board", "self" ).render();
	} );

	it( 'should generate self hypermedia object model', function() {
		self.should.eql( expectedSelf );
	} );
} );