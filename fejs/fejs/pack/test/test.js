function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

var assert = require('assert');
const contract1 = `contract Foo:

    pub def bar() -> u256:
        if true:
            y: u256 = 1
            return y
        else:
            y: u256 = 1
            return y`

suite('I');


test('possible to import', function() {
var fe = require('..');
ok(fe);
});
var fe = require('..');

test('parses some tokens from example contract', function() {
ok(fe.get_token(contract1).length > 5);
});
test('parses the ast from example contract', function() {
ok(fe.compile_to_ast(contract1).body.length>0);
});
test('parses some tokens from example contract', function() {
ok(fe.compile_to_lowered_ast(contract1).body.length > 0);
});
test('parses some tokens from example contract', function() {
ok(fe.compile_to_ast_str(contract1).length > 5);
});
test('parses some tokens from example contract', function() {
ok(fe.compile(contract1));
});
test('parses some tokens from example contract', function() {
cc=fe.compile(contract1)
	ok(cc.lowered_ast.length>5);
	ok(cc.src_ast.length>5);
	ok(cc.contracts);
	ok(cc.contracts.Foo);
	ok(cc.contracts.Foo.json_abi.length>5);
	ok(cc.contracts.Foo.yul.length>5);
});
test('was bytecode generated?', function() {
	ok(cc.contracts.Foo.bytecode.length>5);
});
cc=fe.compile(contract1)
