(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $gicentre$elm_vegalite$VegaLite$combineSpecs = function (specs) {
	return $elm$json$Json$Encode$object(specs);
};
var $author$project$Data$Species$EasternBluebird = {$: 'EasternBluebird'};
var $author$project$Data$Species$NorthernBobwhite = {$: 'NorthernBobwhite'};
var $author$project$Data$Species$SummerTanager = {$: 'SummerTanager'};
var $author$project$Data$Species$WoodThrush = {$: 'WoodThrush'};
var $gicentre$elm_vegalite$VegaLite$VLData = {$: 'VLData'};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $gicentre$elm_vegalite$VegaLite$dataTypeLabel = function (dType) {
	switch (dType.$) {
		case 'FoNum':
			return 'number';
		case 'FoBoo':
			return 'boolean';
		case 'FoDate':
			var dateFmt = dType.a;
			return (dateFmt === '') ? 'date' : ('date:\'' + (dateFmt + '\''));
		default:
			var dateFmt = dType.a;
			return (dateFmt === '') ? 'utc' : ('utc:\'' + (dateFmt + '\''));
	}
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$json$Json$Encode$string = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$strExpr = F2(
	function (objName, s) {
		switch (s.$) {
			case 'Str':
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$string(x))
					]);
			case 'NoStr':
				return _List_fromArray(
					[
						_Utils_Tuple2(objName, $elm$json$Json$Encode$null)
					]);
			default:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(x))
								])))
					]);
		}
	});
var $elm$core$String$trim = _String_trim;
var $gicentre$elm_vegalite$VegaLite$formatProperties = function (fmt) {
	switch (fmt.$) {
		case 'JSON':
			var s = fmt.a;
			switch (s.$) {
				case 'Str':
					var propertyName = s.a;
					return ($elm$core$String$trim(propertyName) === '') ? _List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string('json'))
						]) : _List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string('json')),
							_Utils_Tuple2(
							'property',
							$elm$json$Json$Encode$string(propertyName))
						]);
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string('json'))
						]);
				default:
					var st = s.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'expr',
										$elm$json$Json$Encode$string(st))
									])))
						]);
			}
		case 'CSV':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('csv'))
				]);
		case 'TSV':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('tsv'))
				]);
		case 'DSV':
			var delim = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('dsv')),
					_Utils_Tuple2(
					'delimiter',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromChar(delim)))
				]);
		case 'Arrow':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('arrow'))
				]);
		case 'TopojsonFeature':
			var s = fmt.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('topojson')),
				A2($gicentre$elm_vegalite$VegaLite$strExpr, 'feature', s));
		case 'TopojsonMesh':
			var s = fmt.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('topojson')),
				A2($gicentre$elm_vegalite$VegaLite$strExpr, 'mesh', s));
		default:
			var fmts = fmt.a;
			return _Utils_eq(fmts, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('parse', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'parse',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							function (_v2) {
								var field = _v2.a;
								var fFormat = _v2.b;
								return _Utils_Tuple2(
									field,
									$elm$json$Json$Encode$string(
										$gicentre$elm_vegalite$VegaLite$dataTypeLabel(fFormat)));
							},
							fmts)))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$dataFromUrl = F2(
	function (u, fmts) {
		return _Utils_eq(fmts, _List_Nil) ? _Utils_Tuple2(
			$gicentre$elm_vegalite$VegaLite$VLData,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						$elm$json$Json$Encode$string(u))
					]))) : _Utils_Tuple2(
			$gicentre$elm_vegalite$VegaLite$VLData,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						$elm$json$Json$Encode$string(u)),
						_Utils_Tuple2(
						'format',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$formatProperties, fmts)))
					])));
	});
var $gicentre$elm_vegalite$VegaLite$FoDate = function (a) {
	return {$: 'FoDate', a: a};
};
var $gicentre$elm_vegalite$VegaLite$foDate = $gicentre$elm_vegalite$VegaLite$FoDate;
var $gicentre$elm_vegalite$VegaLite$FoNum = {$: 'FoNum'};
var $gicentre$elm_vegalite$VegaLite$foNum = $gicentre$elm_vegalite$VegaLite$FoNum;
var $gicentre$elm_vegalite$VegaLite$Parse = function (a) {
	return {$: 'Parse', a: a};
};
var $gicentre$elm_vegalite$VegaLite$parse = $gicentre$elm_vegalite$VegaLite$Parse;
var $author$project$Data$Mbbs$mbbsData = A2(
	$gicentre$elm_vegalite$VegaLite$dataFromUrl,
	'../data/mbbs.csv',
	_List_fromArray(
		[
			$gicentre$elm_vegalite$VegaLite$parse(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'year',
					$gicentre$elm_vegalite$VegaLite$foDate('%Y')),
					_Utils_Tuple2('count', $gicentre$elm_vegalite$VegaLite$foNum)
				]))
		]));
var $gicentre$elm_vegalite$VegaLite$X = {$: 'X'};
var $gicentre$elm_vegalite$VegaLite$Y = {$: 'Y'};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $gicentre$elm_vegalite$VegaLite$toList = $elm$json$Json$Encode$list($elm$core$Basics$identity);
var $gicentre$elm_vegalite$VegaLite$aggregate = F2(
	function (ops, groups) {
		return $elm$core$List$cons(
			_Utils_Tuple2(
				'multiSpecs',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'aggregate',
							$gicentre$elm_vegalite$VegaLite$toList(ops)),
							_Utils_Tuple2(
							'groupby',
							A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, groups))
						]))));
	});
var $gicentre$elm_vegalite$VegaLite$AFit = {$: 'AFit'};
var $gicentre$elm_vegalite$VegaLite$asFit = $gicentre$elm_vegalite$VegaLite$AFit;
var $gicentre$elm_vegalite$VegaLite$APadding = {$: 'APadding'};
var $gicentre$elm_vegalite$VegaLite$asPadding = $gicentre$elm_vegalite$VegaLite$APadding;
var $gicentre$elm_vegalite$VegaLite$AResize = {$: 'AResize'};
var $gicentre$elm_vegalite$VegaLite$asResize = $gicentre$elm_vegalite$VegaLite$AResize;
var $gicentre$elm_vegalite$VegaLite$vlPropertyLabel = function (spec) {
	switch (spec.$) {
		case 'VLName':
			return 'name';
		case 'VLParams':
			return 'params';
		case 'VLDescription':
			return 'description';
		case 'VLTitle':
			return 'title';
		case 'VLWidth':
			return 'width';
		case 'VLWidthStep':
			return 'width';
		case 'VLHeight':
			return 'height';
		case 'VLHeightStep':
			return 'height';
		case 'VLPadding':
			return 'padding';
		case 'VLAutosize':
			return 'autosize';
		case 'VLBackground':
			return 'background';
		case 'VLUserMeta':
			return 'usermeta';
		case 'VLBackgroundExpr':
			return 'background';
		case 'VLData':
			return 'data';
		case 'VLDatasets':
			return 'datasets';
		case 'VLProjection':
			return 'projection';
		case 'VLMark':
			return 'mark';
		case 'VLTransform':
			return 'transform';
		case 'VLEncoding':
			return 'encoding';
		case 'VLConfig':
			return 'config';
		case 'VLSelection':
			return 'selection';
		case 'VLConcat':
			return 'concat';
		case 'VLColumns':
			return 'columns';
		case 'VLHConcat':
			return 'hconcat';
		case 'VLVConcat':
			return 'vconcat';
		case 'VLLayer':
			return 'layer';
		case 'VLRepeat':
			return 'repeat';
		case 'VLFacet':
			return 'facet';
		case 'VLSpacing':
			return 'spacing';
		case 'VLAlign':
			return 'align';
		case 'VLBounds':
			return 'bounds';
		case 'VLCenter':
			return 'center';
		case 'VLSpec':
			return 'spec';
		case 'VLResolve':
			return 'resolve';
		default:
			return 'view';
	}
};
var $gicentre$elm_vegalite$VegaLite$asSpec = function (specs) {
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var s = _v0.a;
				var v = _v0.b;
				return _Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$vlPropertyLabel(s),
					v);
			},
			specs));
};
var $gicentre$elm_vegalite$VegaLite$VLAutosize = {$: 'VLAutosize'};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$autosizeProperty = function (asCfg) {
	switch (asCfg.$) {
		case 'APad':
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('pad'));
		case 'AFit':
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit'));
		case 'AFitX':
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit-x'));
		case 'AFitY':
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit-y'));
		case 'ANone':
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('none'));
		case 'AResize':
			return _Utils_Tuple2(
				'resize',
				$elm$json$Json$Encode$bool(true));
		case 'AContent':
			return _Utils_Tuple2(
				'contains',
				$elm$json$Json$Encode$string('content'));
		default:
			return _Utils_Tuple2(
				'contains',
				$elm$json$Json$Encode$string('padding'));
	}
};
var $gicentre$elm_vegalite$VegaLite$autosize = function (aus) {
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLAutosize,
		$elm$json$Json$Encode$object(
			A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$autosizeProperty, aus)));
};
var $gicentre$elm_vegalite$VegaLite$AxGrid = function (a) {
	return {$: 'AxGrid', a: a};
};
var $gicentre$elm_vegalite$VegaLite$Boo = function (a) {
	return {$: 'Boo', a: a};
};
var $gicentre$elm_vegalite$VegaLite$axGrid = function (b) {
	return $gicentre$elm_vegalite$VegaLite$AxGrid(
		$gicentre$elm_vegalite$VegaLite$Boo(b));
};
var $gicentre$elm_vegalite$VegaLite$AxTitle = function (a) {
	return {$: 'AxTitle', a: a};
};
var $gicentre$elm_vegalite$VegaLite$Str = function (a) {
	return {$: 'Str', a: a};
};
var $gicentre$elm_vegalite$VegaLite$axTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$AxTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$calculateAs = F2(
	function (ex, label) {
		return $elm$core$List$cons(
			_Utils_Tuple2(
				'multiSpecs',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'calculate',
							$elm$json$Json$Encode$string(ex)),
							_Utils_Tuple2(
							'as',
							$elm$json$Json$Encode$string(label))
						]))));
	});
var $gicentre$elm_vegalite$VegaLite$Circle = {$: 'Circle'};
var $gicentre$elm_vegalite$VegaLite$VLMark = {$: 'VLMark'};
var $gicentre$elm_vegalite$VegaLite$markLabel = function (m) {
	switch (m.$) {
		case 'Arc':
			return 'arc';
		case 'Area':
			return 'area';
		case 'Bar':
			return 'bar';
		case 'Boxplot':
			return 'boxplot';
		case 'Circle':
			return 'circle';
		case 'Errorband':
			return 'errorband';
		case 'Errorbar':
			return 'errorbar';
		case 'Image':
			return 'image';
		case 'Line':
			return 'line';
		case 'Geoshape':
			return 'geoshape';
		case 'Point':
			return 'point';
		case 'Rect':
			return 'rect';
		case 'Rule':
			return 'rule';
		case 'Square':
			return 'square';
		case 'Text':
			return 'text';
		case 'Tick':
			return 'tick';
		default:
			return 'trail';
	}
};
var $gicentre$elm_vegalite$VegaLite$ArAria = function (a) {
	return {$: 'ArAria', a: a};
};
var $gicentre$elm_vegalite$VegaLite$TTNone = {$: 'TTNone'};
var $gicentre$elm_vegalite$VegaLite$booExpr = F2(
	function (objName, n) {
		if (n.$ === 'Boo') {
			var b = n.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$bool(b))
				]);
		} else {
			var s = n.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $gicentre$elm_vegalite$VegaLite$ariaProperty = function (arProp) {
	switch (arProp.$) {
		case 'ArAria':
			var b = arProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'aria', b);
		case 'ArDescription':
			var s = arProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'description', s);
		default:
			var s = arProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aria',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$blendModeSpec = function (bm) {
	switch (bm.$) {
		case 'BMNormal':
			return $elm$json$Json$Encode$null;
		case 'BMMultiply':
			return $elm$json$Json$Encode$string('multiply');
		case 'BMScreen':
			return $elm$json$Json$Encode$string('screen');
		case 'BMOverlay':
			return $elm$json$Json$Encode$string('overlay');
		case 'BMDarken':
			return $elm$json$Json$Encode$string('darken');
		case 'BMLighten':
			return $elm$json$Json$Encode$string('lighten');
		case 'BMColorDodge':
			return $elm$json$Json$Encode$string('color-dodge');
		case 'BMColorBurn':
			return $elm$json$Json$Encode$string('color-burn');
		case 'BMHardLight':
			return $elm$json$Json$Encode$string('hard-light');
		case 'BMSoftLight':
			return $elm$json$Json$Encode$string('soft-light');
		case 'BMDifference':
			return $elm$json$Json$Encode$string('difference');
		case 'BMExclusion':
			return $elm$json$Json$Encode$string('exclusion');
		case 'BMHue':
			return $elm$json$Json$Encode$string('hue');
		case 'BMSaturation':
			return $elm$json$Json$Encode$string('saturation');
		case 'BMColor':
			return $elm$json$Json$Encode$string('color');
		case 'BMLuminosity':
			return $elm$json$Json$Encode$string('luminosity');
		default:
			var s = bm.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$colorGradientLabel = function (gr) {
	if (gr.$ === 'GrLinear') {
		return 'linear';
	} else {
		return 'radial';
	}
};
var $gicentre$elm_vegalite$VegaLite$cursorSpec = function (cur) {
	switch (cur.$) {
		case 'CAuto':
			return $elm$json$Json$Encode$string('auto');
		case 'CDefault':
			return $elm$json$Json$Encode$string('default');
		case 'CNone':
			return $elm$json$Json$Encode$string('none');
		case 'CContextMenu':
			return $elm$json$Json$Encode$string('context-menu');
		case 'CHelp':
			return $elm$json$Json$Encode$string('help');
		case 'CPointer':
			return $elm$json$Json$Encode$string('pointer');
		case 'CProgress':
			return $elm$json$Json$Encode$string('progress');
		case 'CWait':
			return $elm$json$Json$Encode$string('wait');
		case 'CCell':
			return $elm$json$Json$Encode$string('cell');
		case 'CCrosshair':
			return $elm$json$Json$Encode$string('crosshair');
		case 'CText':
			return $elm$json$Json$Encode$string('text');
		case 'CVerticalText':
			return $elm$json$Json$Encode$string('vertical-text');
		case 'CAlias':
			return $elm$json$Json$Encode$string('alias');
		case 'CCopy':
			return $elm$json$Json$Encode$string('copy');
		case 'CMove':
			return $elm$json$Json$Encode$string('move');
		case 'CNoDrop':
			return $elm$json$Json$Encode$string('no-drop');
		case 'CNotAllowed':
			return $elm$json$Json$Encode$string('not-allowed');
		case 'CAllScroll':
			return $elm$json$Json$Encode$string('all-scroll');
		case 'CColResize':
			return $elm$json$Json$Encode$string('col-resize');
		case 'CRowResize':
			return $elm$json$Json$Encode$string('row-resize');
		case 'CNResize':
			return $elm$json$Json$Encode$string('n-resize');
		case 'CEResize':
			return $elm$json$Json$Encode$string('e-resize');
		case 'CSResize':
			return $elm$json$Json$Encode$string('s-resize');
		case 'CWResize':
			return $elm$json$Json$Encode$string('w-resize');
		case 'CNEResize':
			return $elm$json$Json$Encode$string('ne-resize');
		case 'CNWResize':
			return $elm$json$Json$Encode$string('nw-resize');
		case 'CSEResize':
			return $elm$json$Json$Encode$string('se-resize');
		case 'CSWResize':
			return $elm$json$Json$Encode$string('sw-resize');
		case 'CEWResize':
			return $elm$json$Json$Encode$string('ew-resize');
		case 'CNSResize':
			return $elm$json$Json$Encode$string('ns-resize');
		case 'CNESWResize':
			return $elm$json$Json$Encode$string('nesw-resize');
		case 'CNWSEResize':
			return $elm$json$Json$Encode$string('nwse-resize');
		case 'CZoomIn':
			return $elm$json$Json$Encode$string('zoom-in');
		case 'CZoomOut':
			return $elm$json$Json$Encode$string('zoom-out');
		case 'CGrab':
			return $elm$json$Json$Encode$string('grab');
		case 'CGrabbing':
			return $elm$json$Json$Encode$string('grabbing');
		default:
			var s = cur.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$json$Json$Encode$float = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$extentSpec = function (ext) {
	switch (ext.$) {
		case 'ExCI':
			return $elm$json$Json$Encode$string('ci');
		case 'ExStderr':
			return $elm$json$Json$Encode$string('stderr');
		case 'ExStdev':
			return $elm$json$Json$Encode$string('stdev');
		case 'ExIqr':
			return $elm$json$Json$Encode$string('iqr');
		case 'ExRange':
			return $elm$json$Json$Encode$string('min-max');
		default:
			var sc = ext.a;
			switch (sc.$) {
				case 'Num':
					var x = sc.a;
					return $elm$json$Json$Encode$float(x);
				case 'NoNum':
					return $elm$json$Json$Encode$float(0);
				default:
					var s = sc.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							]));
			}
	}
};
var $gicentre$elm_vegalite$VegaLite$fontWeightSpec = function (w) {
	switch (w.$) {
		case 'Normal':
			return $elm$json$Json$Encode$string('normal');
		case 'Bold':
			return $elm$json$Json$Encode$string('bold');
		case 'Bolder':
			return $elm$json$Json$Encode$string('bolder');
		case 'Lighter':
			return $elm$json$Json$Encode$string('lighter');
		case 'FWExpr':
			var s = w.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 'W100':
			return $elm$json$Json$Encode$float(100);
		case 'W200':
			return $elm$json$Json$Encode$float(200);
		case 'W300':
			return $elm$json$Json$Encode$float(300);
		case 'W400':
			return $elm$json$Json$Encode$float(400);
		case 'W500':
			return $elm$json$Json$Encode$float(500);
		case 'W600':
			return $elm$json$Json$Encode$float(600);
		case 'W700':
			return $elm$json$Json$Encode$float(700);
		case 'W800':
			return $elm$json$Json$Encode$float(800);
		default:
			return $elm$json$Json$Encode$float(900);
	}
};
var $gicentre$elm_vegalite$VegaLite$numExpr = F2(
	function (objName, n) {
		switch (n.$) {
			case 'Num':
				var x = n.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$float(x))
					]);
			case 'NoNum':
				return _List_fromArray(
					[
						_Utils_Tuple2(objName, $elm$json$Json$Encode$null)
					]);
			default:
				var s = n.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(s))
								])))
					]);
		}
	});
var $gicentre$elm_vegalite$VegaLite$stopSpec = function (_v0) {
	var x = _v0.a;
	var c = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'offset',
				$elm$json$Json$Encode$float(x)),
				_Utils_Tuple2(
				'color',
				$elm$json$Json$Encode$string(c))
			]));
};
var $gicentre$elm_vegalite$VegaLite$gradientProperty = function (gp) {
	switch (gp.$) {
		case 'GrX1':
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x1', x);
		case 'GrY1':
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y1', x);
		case 'GrX2':
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x2', x);
		case 'GrY2':
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y2', x);
		case 'GrR1':
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'r1', x);
		case 'GrR2':
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'r2', x);
		default:
			var grs = gp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'stops',
					A2($elm$json$Json$Encode$list, $gicentre$elm_vegalite$VegaLite$stopSpec, grs))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$hAlignSpec = function (al) {
	switch (al.$) {
		case 'HAlignLeft':
			return $elm$json$Json$Encode$string('left');
		case 'HAlignCenter':
			return $elm$json$Json$Encode$string('center');
		case 'HAlignRight':
			return $elm$json$Json$Encode$string('right');
		default:
			var s = al.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$markInterpolationSpec = function (interp) {
	switch (interp.$) {
		case 'Linear':
			return $elm$json$Json$Encode$string('linear');
		case 'LinearClosed':
			return $elm$json$Json$Encode$string('linear-closed');
		case 'Stepwise':
			return $elm$json$Json$Encode$string('step');
		case 'StepBefore':
			return $elm$json$Json$Encode$string('step-before');
		case 'StepAfter':
			return $elm$json$Json$Encode$string('step-after');
		case 'Basis':
			return $elm$json$Json$Encode$string('basis');
		case 'BasisOpen':
			return $elm$json$Json$Encode$string('basis-open');
		case 'BasisClosed':
			return $elm$json$Json$Encode$string('basis-closed');
		case 'Cardinal':
			return $elm$json$Json$Encode$string('cardinal');
		case 'CardinalOpen':
			return $elm$json$Json$Encode$string('cardinal-open');
		case 'CardinalClosed':
			return $elm$json$Json$Encode$string('cardinal-closed');
		case 'Bundle':
			return $elm$json$Json$Encode$string('bundle');
		case 'Monotone':
			return $elm$json$Json$Encode$string('monotone');
		default:
			var s = interp.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$markOrientationLabel = function (orient) {
	if (orient.$ === 'MOHorizontal') {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
var $gicentre$elm_vegalite$VegaLite$numsExpr = F2(
	function (objName, ns) {
		if (ns.$ === 'Nums') {
			var xs = ns.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs))
				]);
		} else {
			var s = ns.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $gicentre$elm_vegalite$VegaLite$multilineTextSpec = function (tText) {
	var _v0 = A2($elm$core$String$split, '\n', tText);
	if (!_v0.b) {
		return $elm$json$Json$Encode$string('');
	} else {
		if (!_v0.b.b) {
			var s = _v0.a;
			return $elm$json$Json$Encode$string(s);
		} else {
			var ss = _v0;
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
		}
	}
};
var $gicentre$elm_vegalite$VegaLite$strExprMultiline = F2(
	function (objName, s) {
		switch (s.$) {
			case 'Str':
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$gicentre$elm_vegalite$VegaLite$multilineTextSpec(x))
					]);
			case 'NoStr':
				return _List_fromArray(
					[
						_Utils_Tuple2(objName, $elm$json$Json$Encode$null)
					]);
			default:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(x))
								])))
					]);
		}
	});
var $gicentre$elm_vegalite$VegaLite$strokeCapSpec = function (cap) {
	switch (cap.$) {
		case 'CButt':
			return $elm$json$Json$Encode$string('butt');
		case 'CRound':
			return $elm$json$Json$Encode$string('round');
		case 'CSquare':
			return $elm$json$Json$Encode$string('square');
		default:
			var s = cap.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$strokeJoinSpec = function (jn) {
	switch (jn.$) {
		case 'JMiter':
			return $elm$json$Json$Encode$string('miter');
		case 'JRound':
			return $elm$json$Json$Encode$string('round');
		case 'JBevel':
			return $elm$json$Json$Encode$string('bevel');
		default:
			var s = jn.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$symbolLabel = function (sym) {
	switch (sym.$) {
		case 'SymCircle':
			return 'circle';
		case 'SymSquare':
			return 'square';
		case 'SymCross':
			return 'cross';
		case 'SymDiamond':
			return 'diamond';
		case 'SymTriangleUp':
			return 'triangle-up';
		case 'SymTriangleDown':
			return 'triangle-down';
		case 'SymTriangleLeft':
			return 'triangle-left';
		case 'SymTriangleRight':
			return 'triangle-right';
		case 'SymTriangle':
			return 'triangle';
		case 'SymStroke':
			return 'stroke';
		case 'SymArrow':
			return 'arrow';
		case 'SymWedge':
			return 'wedge';
		case 'SymPath':
			var svgPath = sym.a;
			return svgPath;
		default:
			var s = sym.a;
			return s;
	}
};
var $gicentre$elm_vegalite$VegaLite$symbolSpec = function (sym) {
	if (sym.$ === 'SymExpr') {
		var s = sym.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'expr',
					$elm$json$Json$Encode$string(s))
				]));
	} else {
		return $elm$json$Json$Encode$string(
			$gicentre$elm_vegalite$VegaLite$symbolLabel(sym));
	}
};
var $gicentre$elm_vegalite$VegaLite$textDirectionSpec = function (td) {
	switch (td.$) {
		case 'LeftToRight':
			return $elm$json$Json$Encode$string('ltr');
		case 'RightToLeft':
			return $elm$json$Json$Encode$string('rtl');
		default:
			var s = td.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$ttContentSpec = function (ttContent) {
	switch (ttContent.$) {
		case 'TTEncoding':
			return $elm$json$Json$Encode$string('encoding');
		case 'TTData':
			return $elm$json$Json$Encode$string('data');
		default:
			return $elm$json$Json$Encode$string('null');
	}
};
var $gicentre$elm_vegalite$VegaLite$vAlignSpec = function (al) {
	switch (al.$) {
		case 'VAlignTop':
			return $elm$json$Json$Encode$string('top');
		case 'VAlignLineTop':
			return $elm$json$Json$Encode$string('line-top');
		case 'VAlignMiddle':
			return $elm$json$Json$Encode$string('middle');
		case 'VAlignBottom':
			return $elm$json$Json$Encode$string('bottom');
		case 'VAlignLineBottom':
			return $elm$json$Json$Encode$string('line-bottom');
		case 'VAlignAlphabetic':
			return $elm$json$Json$Encode$string('alphabetic');
		default:
			var s = al.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$lineMarkerSpec = function (pm) {
	if (pm.$ === 'LMNone') {
		return $elm$json$Json$Encode$bool(false);
	} else {
		var mps = pm.a;
		return $elm$json$Json$Encode$object(
			A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps));
	}
};
var $gicentre$elm_vegalite$VegaLite$markProperty = function (mProp) {
	switch (mProp.$) {
		case 'MAria':
			var aps = mProp.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 'MFilled':
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'filled', b);
		case 'MBlend':
			var bm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'blend',
					$gicentre$elm_vegalite$VegaLite$blendModeSpec(bm))
				]);
		case 'MClip':
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clip', b);
		case 'MColor':
			var s = mProp.a;
			switch (s.$) {
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2('color', $elm$json$Json$Encode$null)
						]);
				case 'Str':
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('color', $elm$json$Json$Encode$null)
						]) : A2($gicentre$elm_vegalite$VegaLite$strExpr, 'color', s);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'color', s);
			}
		case 'MCornerRadius':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', n);
		case 'MCornerRadiusEnd':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusEnd', n);
		case 'MCornerRadiusBL':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusBottomLeft', n);
		case 'MCornerRadiusBR':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusBottomRight', n);
		case 'MCornerRadiusTL':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusTopLeft', n);
		case 'MCornerRadiusTR':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusTopRight', n);
		case 'MCursor':
			var cur = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$gicentre$elm_vegalite$VegaLite$cursorSpec(cur))
				]);
		case 'MExtent':
			var ext = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'extent',
					$gicentre$elm_vegalite$VegaLite$extentSpec(ext))
				]);
		case 'MHRef':
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'href', s);
		case 'MRemoveInvalid':
			var bl = mProp.a;
			if (bl.$ === 'Boo') {
				var b = bl.a;
				return b ? _List_fromArray(
					[
						_Utils_Tuple2(
						'invalid',
						$elm$json$Json$Encode$string('filter'))
					]) : _List_fromArray(
					[
						_Utils_Tuple2('invalid', $elm$json$Json$Encode$null)
					]);
			} else {
				return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'invalid', bl);
			}
		case 'MFill':
			var s = mProp.a;
			switch (s.$) {
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2('fill', $elm$json$Json$Encode$null)
						]);
				case 'Str':
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('fill', $elm$json$Json$Encode$null)
						]) : A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
			}
		case 'MFillGradient':
			var cGrad = mProp.a;
			var props = mProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fill',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$colorGradientLabel(cGrad))),
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$gradientProperty, props))))
				]);
		case 'MColorGradient':
			var cGrad = mProp.a;
			var props = mProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'color',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$colorGradientLabel(cGrad))),
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$gradientProperty, props))))
				]);
		case 'MStrokeGradient':
			var cGrad = mProp.a;
			var props = mProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'stroke',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$colorGradientLabel(cGrad))),
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$gradientProperty, props))))
				]);
		case 'MStroke':
			var s = mProp.a;
			switch (s.$) {
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2('stroke', $elm$json$Json$Encode$null)
						]);
				case 'Str':
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('stroke', $elm$json$Json$Encode$null)
						]) : A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
			}
		case 'MStrokeCap':
			var sc = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(sc))
				]);
		case 'MStrokeJoin':
			var sj = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$gicentre$elm_vegalite$VegaLite$strokeJoinSpec(sj))
				]);
		case 'MStrokeMiterLimit':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeMiterLimit', n);
		case 'MOpacity':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'opacity', n);
		case 'MFillOpacity':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', n);
		case 'MStrokeOpacity':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', n);
		case 'MStrokeWidth':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', n);
		case 'MStrokeDash':
			var ns = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', ns);
		case 'MStrokeDashOffset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', n);
		case 'MStyle':
			var styles = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styles))
				]);
		case 'MInterpolate':
			var interp = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interpolate',
					$gicentre$elm_vegalite$VegaLite$markInterpolationSpec(interp))
				]);
		case 'MTension':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tension', n);
		case 'MOrient':
			var orient = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(orient)))
				]);
		case 'MShape':
			var sym = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'shape',
					$gicentre$elm_vegalite$VegaLite$symbolSpec(sym))
				]);
		case 'MSize':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'size', n);
		case 'MAngle':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'angle', n);
		case 'MAlign':
			var al = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'align',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(al))
				]);
		case 'MBaseline':
			var va = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'baseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'MdX':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dx', n);
		case 'MdY':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dy', n);
		case 'MFont':
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'font', s);
		case 'MFontSize':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fontSize', n);
		case 'MFontStyle':
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fontStyle', s);
		case 'MFontWeight':
			var w = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 'MRadius':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radius', n);
		case 'MInnerRadius':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'innerRadius', n);
		case 'MOuterRadius':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'outerRadius', n);
		case 'MPadAngle':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padAngle', n);
		case 'MText':
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'text', s);
		case 'MLineHeight':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'lineHeight', n);
		case 'MLimit':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'limit', n);
		case 'MEllipsis':
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'ellipsis', s);
		case 'MDir':
			var td = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'dir',
					$gicentre$elm_vegalite$VegaLite$textDirectionSpec(td))
				]);
		case 'MTheta':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'theta', n);
		case 'MTheta2':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'theta2', n);
		case 'MThetaOffset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'thetaOffset', n);
		case 'MTheta2Offset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'theta2Offset', n);
		case 'MBinSpacing':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'binSpacing', n);
		case 'MContinuousBandSize':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousBandSize', n);
		case 'MDiscreteBandSize':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'discreteBandSize', n);
		case 'MShortTimeLabels':
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'shortTimeLabels', b);
		case 'MBandSize':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandSize', n);
		case 'MThickness':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'thickness', n);
		case 'MRule':
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'rule',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'rule',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
					]);
			}
		case 'MBorders':
			var props = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'borders',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
				]);
		case 'MMedian':
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'median',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'median',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
					]);
			}
		case 'MBox':
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'box',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'box',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
					]);
			}
		case 'MOutliers':
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'outliers',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'outliers',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
					]);
			}
		case 'MTicks':
			var props = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'ticks',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
				]);
		case 'MTooltip':
			var ttContent = mProp.a;
			return _Utils_eq(ttContent, $gicentre$elm_vegalite$VegaLite$TTNone) ? _List_fromArray(
				[
					_Utils_Tuple2('tooltip', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'tooltip',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'content',
								$gicentre$elm_vegalite$VegaLite$ttContentSpec(ttContent))
							])))
				]);
		case 'MPoint':
			var pm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'point',
					$gicentre$elm_vegalite$VegaLite$pointMarkerSpec(pm))
				]);
		case 'MLine':
			var lm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'line',
					$gicentre$elm_vegalite$VegaLite$lineMarkerSpec(lm))
				]);
		case 'MWidth':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'width', n);
		case 'MWidthBand':
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'width',
					$elm$json$Json$Encode$object(
						A2($gicentre$elm_vegalite$VegaLite$numExpr, 'band', n)))
				]);
		case 'MHeight':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'height', n);
		case 'MHeightBand':
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'height',
					$elm$json$Json$Encode$object(
						A2($gicentre$elm_vegalite$VegaLite$numExpr, 'band', n)))
				]);
		case 'MX':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x', n);
		case 'MY':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y', n);
		case 'MX2':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x2', n);
		case 'MY2':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y2', n);
		case 'MOrder':
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'order', b);
		case 'MXOffset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'xOffset', n);
		case 'MX2Offset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x2Offset', n);
		case 'MYOffset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'yOffset', n);
		case 'MY2Offset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y2Offset', n);
		case 'MRadiusOffset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radiusOffset', n);
		case 'MRadius2Offset':
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radius2Offset', n);
		case 'MAspect':
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'aspect', b);
		default:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'url', s);
	}
};
var $gicentre$elm_vegalite$VegaLite$pointMarkerSpec = function (pm) {
	switch (pm.$) {
		case 'PMTransparent':
			return $elm$json$Json$Encode$string('transparent');
		case 'PMNone':
			return $elm$json$Json$Encode$bool(false);
		default:
			var mps = pm.a;
			return _Utils_eq(mps, _List_Nil) ? $elm$json$Json$Encode$bool(true) : $elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps));
	}
};
var $gicentre$elm_vegalite$VegaLite$mark = F2(
	function (m, mProps) {
		if (!mProps.b) {
			return _Utils_Tuple2(
				$gicentre$elm_vegalite$VegaLite$VLMark,
				$elm$json$Json$Encode$string(
					$gicentre$elm_vegalite$VegaLite$markLabel(m)));
		} else {
			return _Utils_Tuple2(
				$gicentre$elm_vegalite$VegaLite$VLMark,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string(
								$gicentre$elm_vegalite$VegaLite$markLabel(m))),
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mProps))));
		}
	});
var $gicentre$elm_vegalite$VegaLite$circle = $gicentre$elm_vegalite$VegaLite$mark($gicentre$elm_vegalite$VegaLite$Circle);
var $gicentre$elm_vegalite$VegaLite$arrangementLabel = function (arrng) {
	switch (arrng.$) {
		case 'Row':
			return 'row';
		case 'Column':
			return 'column';
		case 'Flow':
			return 'repeat';
		default:
			return 'layer';
	}
};
var $gicentre$elm_vegalite$VegaLite$binProperty = function (binProp) {
	switch (binProp.$) {
		case 'MaxBins':
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxbins', x);
		case 'BiAnchor':
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'anchor', x);
		case 'Base':
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'base', x);
		case 'Step':
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'step', x);
		case 'Steps':
			var xs = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'steps', xs);
		case 'MinStep':
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minstep', x);
		case 'Divides':
			var xs = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'divide', xs);
		case 'Extent':
			var ns = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'extent', ns);
		case 'SelectionExtent':
			var se = binProp.a;
			switch (se.$) {
				case 'Str':
					var s = se.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'extent',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'param',
										$elm$json$Json$Encode$string(s))
									])))
						]);
				case 'StrExpr':
					var s = se.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'extent',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'param',
										$elm$json$Json$Encode$string(s))
									])))
						]);
				default:
					return _List_fromArray(
						[
							_Utils_Tuple2('extent', $elm$json$Json$Encode$null)
						]);
			}
		default:
			var b = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'nice', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$bin = function (bProps) {
	return _Utils_eq(bProps, _List_Nil) ? _Utils_Tuple2(
		'bin',
		$elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
		'bin',
		$elm$json$Json$Encode$object(
			A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$binProperty, bProps)));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $gicentre$elm_vegalite$VegaLite$dayLabel = function (dayName) {
	switch (dayName.$) {
		case 'Mon':
			return 'Mon';
		case 'Tue':
			return 'Tue';
		case 'Wed':
			return 'Wed';
		case 'Thu':
			return 'Thu';
		case 'Fri':
			return 'Fri';
		case 'Sat':
			return 'Sat';
		default:
			return 'Sun';
	}
};
var $gicentre$elm_vegalite$VegaLite$monthNameLabel = function (mon) {
	switch (mon.$) {
		case 'Jan':
			return 'Jan';
		case 'Feb':
			return 'Feb';
		case 'Mar':
			return 'Mar';
		case 'Apr':
			return 'Apr';
		case 'May':
			return 'May';
		case 'Jun':
			return 'Jun';
		case 'Jul':
			return 'Jul';
		case 'Aug':
			return 'Aug';
		case 'Sep':
			return 'Sep';
		case 'Oct':
			return 'Oct';
		case 'Nov':
			return 'Nov';
		default:
			return 'Dec';
	}
};
var $gicentre$elm_vegalite$VegaLite$dateTimeProperty = function (dtp) {
	switch (dtp.$) {
		case 'DTYear':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'year', x);
		case 'DTQuarter':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'quarter', x);
		case 'DTMonth':
			var mon = dtp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'month',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$monthNameLabel(mon)))
				]);
		case 'DTMonthNum':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'month', x);
		case 'DTDate':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'date', x);
		case 'DTDay':
			var d = dtp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'day',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$dayLabel(d)))
				]);
		case 'DTHours':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'hours', x);
		case 'DTMinutes':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minutes', x);
		case 'DTSeconds':
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'seconds', x);
		default:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'milliseconds', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$dataValueSpec = function (val) {
	switch (val.$) {
		case 'Number':
			var x = val.a;
			return $elm$json$Json$Encode$float(x);
		case 'DStr':
			var s = val.a;
			return $elm$json$Json$Encode$string(s);
		case 'Boolean':
			var b = val.a;
			return $elm$json$Json$Encode$bool(b);
		case 'DateTime':
			var d = val.a;
			return $elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
		case 'DExpr':
			var s = val.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 'NullValue':
			return $elm$json$Json$Encode$null;
		case 'DConcat':
			var vals = val.a;
			return $gicentre$elm_vegalite$VegaLite$dataValuesSpecs(vals);
		case 'DObject':
			var kvs = val.a;
			return $elm$json$Json$Encode$object(
				A2(
					$elm$core$List$map,
					function (_v3) {
						var k = _v3.a;
						var v = _v3.b;
						return _Utils_Tuple2(
							k,
							$gicentre$elm_vegalite$VegaLite$dataValueSpec(v));
					},
					kvs));
		default:
			var xs = val.a;
			return A2($elm$json$Json$Encode$list, $gicentre$elm_vegalite$VegaLite$dataValueSpec, xs);
	}
};
var $gicentre$elm_vegalite$VegaLite$dataValuesSpecs = function (dvs) {
	switch (dvs.$) {
		case 'Numbers':
			var xs = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$float, xs));
		case 'Strings':
			var ss = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$string, ss));
		case 'DateTimes':
			var dtss = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$concatMap($gicentre$elm_vegalite$VegaLite$dateTimeProperty),
						$elm$json$Json$Encode$object),
					dtss));
		case 'DExprs':
			var s = dvs.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 'Booleans':
			var bs = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$bool, bs));
		case 'DObjects':
			var obs = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$map(
							function (_v1) {
								var k = _v1.a;
								var v = _v1.b;
								return _Utils_Tuple2(
									k,
									$gicentre$elm_vegalite$VegaLite$dataValueSpec(v));
							}),
						$elm$json$Json$Encode$object),
					obs));
		default:
			var ds = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$dataValuesSpecs, ds));
	}
};
var $gicentre$elm_vegalite$VegaLite$filterProperties = function (f) {
	switch (f.$) {
		case 'FEqual':
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'equal',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(val))
				]);
		case 'FLessThan':
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'lt',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(val))
				]);
		case 'FLessThanEq':
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'lte',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(val))
				]);
		case 'FGreaterThan':
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'gt',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(val))
				]);
		case 'FGreaterThanEq':
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'gte',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(val))
				]);
		case 'FSelection':
			var selName = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(selName))
				]);
		case 'FSelectionEmpty':
			var selName = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(selName)),
					_Utils_Tuple2(
					'empty',
					$elm$json$Json$Encode$bool(false))
				]);
		case 'FRange':
			var field = f.a;
			var vals = f.b;
			var fromTs = function (ts) {
				if (ts.$ === 'TimestampExpr') {
					var s = ts.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							]));
				} else {
					if (!ts.a.b) {
						return $elm$json$Json$Encode$null;
					} else {
						var d = ts.a;
						return $elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
					}
				}
			};
			var values = function () {
				if (vals.$ === 'NumberRange') {
					var ns = vals.a;
					if (ns.$ === 'Nums') {
						var xs = ns.a;
						if ((xs.b && xs.b.b) && (!xs.b.b.b)) {
							var mn = xs.a;
							var _v4 = xs.b;
							var mx = _v4.a;
							return A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$float,
								_List_fromArray(
									[mn, mx]));
						} else {
							return $elm$json$Json$Encode$null;
						}
					} else {
						var s = ns.a;
						return $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(s))
								]));
					}
				} else {
					var ts1 = vals.a;
					var ts2 = vals.b;
					return $gicentre$elm_vegalite$VegaLite$toList(
						_List_fromArray(
							[
								fromTs(ts1),
								fromTs(ts2)
							]));
				}
			}();
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2('range', values)
				]);
		case 'FOneOf':
			var field = f.a;
			var vals = f.b;
			var values = function () {
				switch (vals.$) {
					case 'Numbers':
						var xs = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs);
					case 'DateTimes':
						var ds = vals.a;
						return A2(
							$elm$json$Json$Encode$list,
							function (d) {
								return $elm$json$Json$Encode$object(
									A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
							},
							ds);
					case 'Strings':
						var ss = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
					case 'DExprs':
						var s = vals.a;
						return $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(s))
								]));
					case 'Booleans':
						var bs = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$bool, bs);
					case 'DObjects':
						var obs = vals.a;
						return A2(
							$elm$json$Json$Encode$list,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$List$map(
									function (_v7) {
										var k = _v7.a;
										var v = _v7.b;
										return _Utils_Tuple2(
											k,
											$gicentre$elm_vegalite$VegaLite$dataValueSpec(v));
									}),
								$elm$json$Json$Encode$object),
							obs);
					default:
						var ds = vals.a;
						return A2($elm$json$Json$Encode$list, $gicentre$elm_vegalite$VegaLite$dataValuesSpecs, ds);
				}
			}();
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2('oneOf', values)
				]);
		case 'FValid':
			var field = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'valid',
					$elm$json$Json$Encode$bool(true))
				]);
		default:
			return _List_Nil;
	}
};
var $gicentre$elm_vegalite$VegaLite$anchorSpec = function (an) {
	switch (an.$) {
		case 'AnStart':
			return $elm$json$Json$Encode$string('start');
		case 'AnMiddle':
			return $elm$json$Json$Encode$string('middle');
		case 'AnEnd':
			return $elm$json$Json$Encode$string('end');
		default:
			var s = an.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$compositionAlignmentLabel = function (ca) {
	switch (ca.$) {
		case 'CANone':
			return 'none';
		case 'CAEach':
			return 'each';
		default:
			return 'all';
	}
};
var $gicentre$elm_vegalite$VegaLite$legendOrientSpec = function (orient) {
	switch (orient.$) {
		case 'Left':
			return $elm$json$Json$Encode$string('left');
		case 'TopLeft':
			return $elm$json$Json$Encode$string('top-left');
		case 'Top':
			return $elm$json$Json$Encode$string('top');
		case 'TopRight':
			return $elm$json$Json$Encode$string('top-right');
		case 'Right':
			return $elm$json$Json$Encode$string('right');
		case 'BottomRight':
			return $elm$json$Json$Encode$string('bottom-right');
		case 'Bottom':
			return $elm$json$Json$Encode$string('bottom');
		case 'BottomLeft':
			return $elm$json$Json$Encode$string('bottom-left');
		default:
			return $elm$json$Json$Encode$string('none');
	}
};
var $gicentre$elm_vegalite$VegaLite$overlapStrategySpec = function (strat) {
	switch (strat.$) {
		case 'ONone':
			return $elm$json$Json$Encode$bool(false);
		case 'OParity':
			return $elm$json$Json$Encode$string('parity');
		case 'OGreedy':
			return $elm$json$Json$Encode$string('greedy');
		default:
			var s = strat.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$legendProperty = function (legendProp) {
	switch (legendProp.$) {
		case 'LAria':
			var aps = legendProp.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 'LClipHeight':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipHeight', n);
		case 'LColumnPadding':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columnPadding', n);
		case 'LRowPadding':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rowPadding', n);
		case 'LColumns':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', n);
		case 'LCornerRadius':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', n);
		case 'LFillColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fillColor', s);
		case 'LDirection':
			var d = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'direction',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 'LType':
			var lType = legendProp.a;
			if (lType.$ === 'Gradient') {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('gradient'))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('symbol'))
					]);
			}
		case 'LFormat':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 'LFormatAsNum':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 'LFormatAsTemporal':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 'LFormatAsCustom':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 'LGradientLength':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLength', n);
		case 'LGradientOpacity':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientOpacity', n);
		case 'LGradientThickness':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientThickness', n);
		case 'LGradientStrokeColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gradientStrokeColor', s);
		case 'LGradientStrokeWidth':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientStrokeWidth', n);
		case 'LGridAlign':
			var ga = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridAlign',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$compositionAlignmentLabel(ga)))
				]);
		case 'LLabelAlign':
			var ha = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'LLabelBaseline':
			var va = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'LLabelColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 'LLabelExpr':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 'LLabelFont':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 'LLabelFontSize':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', n);
		case 'LLabelFontStyle':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 'LLabelFontWeight':
			var fw = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'LLabelLimit':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', n);
		case 'LLabelOffset':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', n);
		case 'LLabelOverlap':
			var lo = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(lo))
				]);
		case 'LOffset':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', n);
		case 'LOrient':
			var orient = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$legendOrientSpec(orient))
				]);
		case 'LPadding':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padding', n);
		case 'LStrokeColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'strokeColor', s);
		case 'LStrokeWidth':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', n);
		case 'LSymbolDash':
			var sd = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'symbolDash', sd);
		case 'LSymbolDashOffset':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolDashOffset', n);
		case 'LSymbolFillColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolFillColor', s);
		case 'LSymbolLimit':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolLimit', n);
		case 'LSymbolOffset':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOffset', n);
		case 'LSymbolOpacity':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOpacity', n);
		case 'LSymbolStrokeColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolStrokeColor', s);
		case 'LSymbolType':
			var s = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolType',
					$gicentre$elm_vegalite$VegaLite$symbolSpec(s))
				]);
		case 'LSymbolSize':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolSize', n);
		case 'LSymbolStrokeWidth':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolStrokeWidth', n);
		case 'LTickCount':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickCount', n);
		case 'LTitle':
			var txt = legendProp.a;
			switch (txt.$) {
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2('title', $elm$json$Json$Encode$null)
						]);
				case 'Str':
					var s = txt.a;
					return (s === '') ? _List_fromArray(
						[
							_Utils_Tuple2('title', $elm$json$Json$Encode$null)
						]) : _List_fromArray(
						[
							_Utils_Tuple2(
							'title',
							$gicentre$elm_vegalite$VegaLite$multilineTextSpec(s))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'title', txt);
			}
		case 'LTitleAlign':
			var ha = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'LTitleAnchor':
			var an = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 'LTitleBaseline':
			var va = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'LTitleColor':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 'LTitleFont':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 'LTitleFontSize':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', n);
		case 'LTitleFontStyle':
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 'LTitleFontWeight':
			var fw = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'LTitleLimit':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', n);
		case 'LTitleLineHeight':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', n);
		case 'LTitleOpacity':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', n);
		case 'LTitleOrient':
			var orient = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleOrient',
					$gicentre$elm_vegalite$VegaLite$legendOrientSpec(orient))
				]);
		case 'LTitlePadding':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', n);
		case 'LValues':
			var vals = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'values',
					$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(vals))
				]);
		case 'LeX':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendX', n);
		case 'LeY':
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendY', n);
		default:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'zindex', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$measurementLabel = function (mType) {
	switch (mType.$) {
		case 'Nominal':
			return 'nominal';
		case 'Ordinal':
			return 'ordinal';
		case 'Quantitative':
			return 'quantitative';
		case 'Temporal':
			return 'temporal';
		default:
			return 'geojson';
	}
};
var $elm$core$String$length = _String_length;
var $gicentre$elm_vegalite$VegaLite$operationSpec = function (op) {
	switch (op.$) {
		case 'ArgMax':
			var maybeField = op.a;
			if (maybeField.$ === 'Nothing') {
				return $elm$json$Json$Encode$string('argmax');
			} else {
				var f = maybeField.a;
				return (!$elm$core$String$length(
					$elm$core$String$trim(f))) ? $elm$json$Json$Encode$string('argmax') : $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'argmax',
							$elm$json$Json$Encode$string(f))
						]));
			}
		case 'ArgMin':
			var maybeField = op.a;
			if (maybeField.$ === 'Nothing') {
				return $elm$json$Json$Encode$string('argmin');
			} else {
				var f = maybeField.a;
				return (!$elm$core$String$length(
					$elm$core$String$trim(f))) ? $elm$json$Json$Encode$string('argmin') : $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'argmin',
							$elm$json$Json$Encode$string(f))
						]));
			}
		case 'Count':
			return $elm$json$Json$Encode$string('count');
		case 'CI0':
			return $elm$json$Json$Encode$string('ci0');
		case 'CI1':
			return $elm$json$Json$Encode$string('ci1');
		case 'Distinct':
			return $elm$json$Json$Encode$string('distinct');
		case 'Max':
			return $elm$json$Json$Encode$string('max');
		case 'Mean':
			return $elm$json$Json$Encode$string('mean');
		case 'Median':
			return $elm$json$Json$Encode$string('median');
		case 'Min':
			return $elm$json$Json$Encode$string('min');
		case 'Missing':
			return $elm$json$Json$Encode$string('missing');
		case 'Product':
			return $elm$json$Json$Encode$string('product');
		case 'Q1':
			return $elm$json$Json$Encode$string('q1');
		case 'Q3':
			return $elm$json$Json$Encode$string('q3');
		case 'Stdev':
			return $elm$json$Json$Encode$string('stdev');
		case 'StdevP':
			return $elm$json$Json$Encode$string('stdevp');
		case 'Sum':
			return $elm$json$Json$Encode$string('sum');
		case 'Stderr':
			return $elm$json$Json$Encode$string('stderr');
		case 'Valid':
			return $elm$json$Json$Encode$string('valid');
		case 'Variance':
			return $elm$json$Json$Encode$string('variance');
		default:
			return $elm$json$Json$Encode$string('variancep');
	}
};
var $gicentre$elm_vegalite$VegaLite$cInterpolateSpec = function (iType) {
	switch (iType.$) {
		case 'Rgb':
			var gamma = iType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('rgb')),
						_Utils_Tuple2(
						'gamma',
						$elm$json$Json$Encode$float(gamma))
					]));
		case 'Hsl':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hsl'))
					]));
		case 'HslLong':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hsl-long'))
					]));
		case 'Lab':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('lab'))
					]));
		case 'Hcl':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hcl'))
					]));
		case 'HclLong':
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hcl-long'))
					]));
		case 'CubeHelix':
			var gamma = iType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('cubehelix')),
						_Utils_Tuple2(
						'gamma',
						$elm$json$Json$Encode$float(gamma))
					]));
		default:
			var gamma = iType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('cubehelix-long')),
						_Utils_Tuple2(
						'gamma',
						$elm$json$Json$Encode$float(gamma))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$channelLabel = function (ch) {
	switch (ch.$) {
		case 'ChX':
			return 'x';
		case 'ChY':
			return 'y';
		case 'ChX2':
			return 'x2';
		case 'ChY2':
			return 'y2';
		case 'ChXOffset':
			return 'xOffset';
		case 'ChYOffset':
			return 'yOffset';
		case 'ChColor':
			return 'color';
		case 'ChOpacity':
			return 'opacity';
		case 'ChShape':
			return 'shape';
		case 'ChSize':
			return 'size';
		default:
			return 'strokeDash';
	}
};
var $gicentre$elm_vegalite$VegaLite$scaleDomainSpec = function (sdType) {
	var numsSpec = function (ns) {
		if (ns.$ === 'Nums') {
			var xs = ns.a;
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs);
		} else {
			var s = ns.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		}
	};
	var numSpec = function (n) {
		switch (n.$) {
			case 'Num':
				var x = n.a;
				return $elm$json$Json$Encode$float(x);
			case 'NoNum':
				return $elm$json$Json$Encode$null;
			default:
				var s = n.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
		}
	};
	switch (sdType.$) {
		case 'DNumbers':
			var xs = sdType.a;
			return numsSpec(xs);
		case 'DMinNumber':
			var x = sdType.a;
			return numSpec(x);
		case 'DMidNumber':
			var x = sdType.a;
			return numSpec(x);
		case 'DMaxNumber':
			var x = sdType.a;
			return numSpec(x);
		case 'DDateTimes':
			var ds = sdType.a;
			return A2(
				$elm$json$Json$Encode$list,
				function (d) {
					return $elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
				},
				ds);
		case 'DDateTimesExpr':
			var s = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 'DMinDateTime':
			var ts = sdType.a;
			if (ts.$ === 'Timestamp') {
				var d = ts.a;
				return $elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
			} else {
				var s = ts.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
			}
		case 'DMaxDateTime':
			var ts = sdType.a;
			if (ts.$ === 'Timestamp') {
				var d = ts.a;
				return $elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
			} else {
				var s = ts.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
			}
		case 'DStrings':
			var cats = sdType.a;
			if (cats.$ === 'Strs') {
				var ss = cats.a;
				return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
			} else {
				var s = cats.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
			}
		case 'DSelection':
			var selName = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName))
					]));
		case 'DSelectionChannel':
			var selName = sdType.a;
			var ch = sdType.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName)),
						_Utils_Tuple2(
						'encoding',
						$elm$json$Json$Encode$string(
							$gicentre$elm_vegalite$VegaLite$channelLabel(ch)))
					]));
		case 'DSelectionField':
			var selName = sdType.a;
			var f = sdType.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName)),
						_Utils_Tuple2(
						'field',
						$elm$json$Json$Encode$string(f))
					]));
		case 'Unaggregated':
			return $elm$json$Json$Encode$string('unaggregated');
		default:
			var scDo = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'unionWith',
						$gicentre$elm_vegalite$VegaLite$scaleDomainSpec(scDo))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$scaleLabel = function (sc) {
	switch (sc.$) {
		case 'ScLinear':
			return 'linear';
		case 'ScPow':
			return 'pow';
		case 'ScSymLog':
			return 'symlog';
		case 'ScSqrt':
			return 'sqrt';
		case 'ScLog':
			return 'log';
		case 'ScTime':
			return 'time';
		case 'ScUtc':
			return 'utc';
		case 'ScOrdinal':
			return 'ordinal';
		case 'ScBand':
			return 'band';
		case 'ScPoint':
			return 'point';
		case 'ScBinOrdinal':
			return 'bin-ordinal';
		case 'ScQuantile':
			return 'quantile';
		case 'ScQuantize':
			return 'quantize';
		default:
			return 'threshold';
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$timeUnitLabel = function (tu) {
	switch (tu.$) {
		case 'Year':
			return 'year';
		case 'YearDayOfYear':
			return 'yeardayofyear';
		case 'YearQuarter':
			return 'yearquarter';
		case 'YearQuarterMonth':
			return 'yearquartermonth';
		case 'YearMonth':
			return 'yearmonth';
		case 'YearMonthDate':
			return 'yearmonthdate';
		case 'YearMonthDateHours':
			return 'yearmonthdatehours';
		case 'YearMonthDateHoursMinutes':
			return 'yearmonthdatehoursminutes';
		case 'YearMonthDateHoursMinutesSeconds':
			return 'yearmonthdatehoursminutesseconds';
		case 'YearWeek':
			return 'yearweek';
		case 'YearWeekDay':
			return 'yearweekday';
		case 'YearWeekDayHours':
			return 'yearweekdayhours';
		case 'YearWeekDayHoursMinutes':
			return 'yearweekdayhoursminutes';
		case 'YearWeekDayHoursMinutesSeconds':
			return 'yearweekdayhoursminutesseconds';
		case 'Quarter':
			return 'quarter';
		case 'QuarterMonth':
			return 'quartermonth';
		case 'Month':
			return 'month';
		case 'MonthDate':
			return 'monthdate';
		case 'MonthDateHours':
			return 'monthdatehours';
		case 'MonthDateHoursMinutes':
			return 'monthdatehoursminutes';
		case 'MonthDateHoursMinutesSeconds':
			return 'monthdatehoursminutesseconds';
		case 'Week':
			return 'week';
		case 'WeekDay':
			return 'weekday';
		case 'WeekDayHours':
			return 'weekdayhours';
		case 'WeekDayHoursMinutes':
			return 'weekdayhoursminutes';
		case 'WeekDayHoursMinutesSeconds':
			return 'weekdayhoursminutesseconds';
		case 'Date':
			return 'date';
		case 'Day':
			return 'day';
		case 'DayOfYear':
			return 'dayofyear';
		case 'DayHours':
			return 'dayhours';
		case 'DayHoursMinutes':
			return 'dayhoursminutes';
		case 'DayHoursMinutesSeconds':
			return 'dayhoursminutesseconds';
		case 'Hours':
			return 'hours';
		case 'HoursMinutes':
			return 'hoursminutes';
		case 'HoursMinutesSeconds':
			return 'hoursminutesseconds';
		case 'Minutes':
			return 'minutes';
		case 'MinutesSeconds':
			return 'minutesseconds';
		case 'Seconds':
			return 'seconds';
		case 'SecondsMilliseconds':
			return 'secondsmilliseconds';
		case 'Milliseconds':
			return 'milliseconds';
		case 'Utc':
			return '';
		case 'TUMaxBins':
			return '';
		default:
			return '';
	}
};
var $gicentre$elm_vegalite$VegaLite$scaleNiceSpec = function (ni) {
	switch (ni.$) {
		case 'NMillisecond':
			return $elm$json$Json$Encode$string('millisecond');
		case 'NSecond':
			return $elm$json$Json$Encode$string('second');
		case 'NMinute':
			return $elm$json$Json$Encode$string('minute');
		case 'NHour':
			return $elm$json$Json$Encode$string('hour');
		case 'NDay':
			return $elm$json$Json$Encode$string('day');
		case 'NWeek':
			return $elm$json$Json$Encode$string('week');
		case 'NMonth':
			return $elm$json$Json$Encode$string('month');
		case 'NYear':
			return $elm$json$Json$Encode$string('year');
		case 'NInterval':
			var tu = ni.a;
			var step = ni.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'interval',
						$elm$json$Json$Encode$string(
							$gicentre$elm_vegalite$VegaLite$timeUnitLabel(tu))),
						_Utils_Tuple2(
						'step',
						$elm$json$Json$Encode$int(step))
					]));
		case 'NTrue':
			return $elm$json$Json$Encode$bool(true);
		case 'NFalse':
			return $elm$json$Json$Encode$bool(false);
		case 'NTickCount':
			var n = ni.a;
			return $elm$json$Json$Encode$int(n);
		default:
			var s = ni.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$schemeProperty = F2(
	function (clrs, extent) {
		var nameSpec = function () {
			if (clrs.$ === 'Strs') {
				var ss = clrs.a;
				if (!ss.b) {
					return A2(
						$elm$json$Json$Encode$list,
						$elm$json$Json$Encode$string,
						_List_fromArray(
							['rgb(86,119,164)', 'rgb(86,119,164)']));
				} else {
					if (!ss.b.b) {
						var sch = ss.a;
						return $elm$json$Json$Encode$string(sch);
					} else {
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
					}
				}
			} else {
				var ex = clrs.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(ex))
						]));
			}
		}();
		if (!extent.b) {
			return _Utils_Tuple2('scheme', nameSpec);
		} else {
			if (!extent.b.b) {
				var n = extent.a;
				return _Utils_Tuple2(
					'scheme',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('name', nameSpec),
								_Utils_Tuple2(
								'count',
								$elm$json$Json$Encode$float(n))
							])));
			} else {
				if (!extent.b.b.b) {
					var mn = extent.a;
					var _v1 = extent.b;
					var mx = _v1.a;
					return _Utils_Tuple2(
						'scheme',
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2('name', nameSpec),
									_Utils_Tuple2(
									'extent',
									A2(
										$elm$json$Json$Encode$list,
										$elm$json$Json$Encode$float,
										_List_fromArray(
											[mn, mx])))
								])));
				} else {
					return _Utils_Tuple2('scheme', nameSpec);
				}
			}
		}
	});
var $gicentre$elm_vegalite$VegaLite$strsExpr = F2(
	function (objName, ss) {
		if (ss.$ === 'Strs') {
			var xs = ss.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, xs))
				]);
		} else {
			var s = ss.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $gicentre$elm_vegalite$VegaLite$scaleProperty = function (scaleProp) {
	switch (scaleProp.$) {
		case 'ScType':
			var sType = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$scaleLabel(sType)))
				]);
		case 'ScDomainExpr':
			var s = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domain',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		case 'ScDomain':
			var sdType = scaleProp.a;
			switch (sdType.$) {
				case 'DMinNumber':
					var x = sdType.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainMin', x);
				case 'DMidNumber':
					var x = sdType.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainMid', x);
				case 'DMaxNumber':
					var x = sdType.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainMax', x);
				case 'DMinDateTime':
					var ts = sdType.a;
					if (ts.$ === 'Timestamp') {
						var d = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMin',
								$elm$json$Json$Encode$object(
									A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d)))
							]);
					} else {
						var s = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMin',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'expr',
											$elm$json$Json$Encode$string(s))
										])))
							]);
					}
				case 'DMaxDateTime':
					var ts = sdType.a;
					if (ts.$ === 'Timestamp') {
						var d = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMax',
								$elm$json$Json$Encode$object(
									A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d)))
							]);
					} else {
						var s = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMax',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'expr',
											$elm$json$Json$Encode$string(s))
										])))
							]);
					}
				default:
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'domain',
							$gicentre$elm_vegalite$VegaLite$scaleDomainSpec(sdType))
						]);
			}
		case 'ScRange':
			var range = scaleProp.a;
			switch (range.$) {
				case 'RMinNumber':
					var x = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rangeMin', x);
				case 'RMaxNumber':
					var x = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rangeMax', x);
				case 'RNumbers':
					var xs = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'range', xs);
				case 'RExprs':
					var ss = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							A2(
								$elm$json$Json$Encode$list,
								function (s) {
									return $elm$json$Json$Encode$object(
										_List_fromArray(
											[
												_Utils_Tuple2(
												'expr',
												$elm$json$Json$Encode$string(s))
											]));
								},
								ss))
						]);
				case 'RNumberLists':
					var xss = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$list($elm$json$Json$Encode$float),
								xss))
						]);
				case 'RStrings':
					var ss = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'range', ss);
				case 'RName':
					var s = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							$elm$json$Json$Encode$string(s))
						]);
				default:
					var s = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'field',
										$elm$json$Json$Encode$string(s))
									])))
						]);
			}
		case 'ScScheme':
			var schName = scaleProp.a;
			var extent = scaleProp.b;
			return _List_fromArray(
				[
					A2($gicentre$elm_vegalite$VegaLite$schemeProperty, schName, extent)
				]);
		case 'ScSchemeExpr':
			var schExpr = scaleProp.a;
			var extent = scaleProp.b;
			return _List_fromArray(
				[
					A2($gicentre$elm_vegalite$VegaLite$schemeProperty, schExpr, extent)
				]);
		case 'ScAlign':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'align', x);
		case 'ScPadding':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padding', x);
		case 'ScBase':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'base', x);
		case 'ScExponent':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'exponent', x);
		case 'ScConstant':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'constant', x);
		case 'ScPaddingInner':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'paddingInner', x);
		case 'ScPaddingOuter':
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'paddingOuter', x);
		case 'ScRound':
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'round', b);
		case 'ScClamp':
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clamp', b);
		case 'ScInterpolate':
			var interp = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interpolate',
					$gicentre$elm_vegalite$VegaLite$cInterpolateSpec(interp))
				]);
		case 'ScNice':
			var ni = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'nice',
					$gicentre$elm_vegalite$VegaLite$scaleNiceSpec(ni))
				]);
		case 'ScZero':
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'zero', b);
		default:
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'reverse', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$sortProperties = function (sp) {
	switch (sp.$) {
		case 'Ascending':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					$elm$json$Json$Encode$string('ascending'))
				]);
		case 'Descending':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					$elm$json$Json$Encode$string('descending'))
				]);
		case 'ByChannel':
			var ch = sp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'encoding',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$channelLabel(ch)))
				]);
		case 'ByFieldOp':
			var field = sp.a;
			var op = sp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'op',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 'ByRepeatOp':
			var arr = sp.a;
			var op = sp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$arrangementLabel(arr)))
							]))),
					_Utils_Tuple2(
					'op',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		default:
			return _List_Nil;
	}
};
var $gicentre$elm_vegalite$VegaLite$timeUnitProperties = function (tUnit) {
	switch (tUnit.$) {
		case 'Utc':
			var tu = tUnit.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'utc',
					$elm$json$Json$Encode$bool(true)),
				$gicentre$elm_vegalite$VegaLite$timeUnitProperties(tu));
		case 'TUMaxBins':
			var n = tUnit.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'maxbins',
					$elm$json$Json$Encode$int(n))
				]);
		case 'TUStep':
			var x = tUnit.a;
			var tu = tUnit.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'step',
					$elm$json$Json$Encode$float(x)),
				$gicentre$elm_vegalite$VegaLite$timeUnitProperties(tu));
		default:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'unit',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$timeUnitLabel(tUnit)))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$timeUnitSpec = function (tUnit) {
	return $elm$json$Json$Encode$object(
		$gicentre$elm_vegalite$VegaLite$timeUnitProperties(tUnit));
};
var $gicentre$elm_vegalite$VegaLite$booleanOpSpec = function (bo) {
	switch (bo.$) {
		case 'Expr':
			var ex = bo.a;
			return $elm$json$Json$Encode$string(ex);
		case 'FilterOp':
			var f = bo.a;
			return $gicentre$elm_vegalite$VegaLite$filterSpec(f);
		case 'FilterOpTrans':
			var tr = bo.a;
			var f = bo.b;
			return A2($gicentre$elm_vegalite$VegaLite$trFilterSpec, tr, f);
		case 'And':
			var operand1 = bo.a;
			var operand2 = bo.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'and',
						A2(
							$elm$json$Json$Encode$list,
							$gicentre$elm_vegalite$VegaLite$booleanOpSpec,
							_List_fromArray(
								[operand1, operand2])))
					]));
		case 'Or':
			var operand1 = bo.a;
			var operand2 = bo.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'or',
						A2(
							$elm$json$Json$Encode$list,
							$gicentre$elm_vegalite$VegaLite$booleanOpSpec,
							_List_fromArray(
								[operand1, operand2])))
					]));
		case 'Not':
			var operand = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'not',
						$gicentre$elm_vegalite$VegaLite$booleanOpSpec(operand))
					]));
		case 'BooleanParam':
			var p = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(p))
					]));
		case 'SelectionName':
			var selName = bo.a;
			return $elm$json$Json$Encode$string(selName);
		default:
			var sel = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'selection',
						$elm$json$Json$Encode$string(sel))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$filterSpec = function (f) {
	switch (f.$) {
		case 'FExpr':
			var ex = f.a;
			return $elm$json$Json$Encode$string(ex);
		case 'FCompose':
			var boolExpr = f.a;
			return $gicentre$elm_vegalite$VegaLite$booleanOpSpec(boolExpr);
		default:
			return $elm$json$Json$Encode$object(
				$gicentre$elm_vegalite$VegaLite$filterProperties(f));
	}
};
var $gicentre$elm_vegalite$VegaLite$markChannelProperties = function (field) {
	switch (field.$) {
		case 'MName':
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 'MDatum':
			var d = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(d))
				]);
		case 'MRepeat':
			var arr = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 'MRepeatDatum':
			var arr = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 'MmType':
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(t)))
				]);
		case 'MScale':
			var sps = field.a;
			return _Utils_eq(sps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('scale', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$scaleProperty, sps)))
				]);
		case 'MLegend':
			var lps = field.a;
			return _Utils_eq(lps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('legend', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'legend',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$legendProperty, lps)))
				]);
		case 'MBin':
			var bps = field.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 'MBand':
			var x = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'band', x);
		case 'MSort':
			var sps = field.a;
			_v3$4:
			while (true) {
				if (!sps.b) {
					return _List_fromArray(
						[
							_Utils_Tuple2('sort', $elm$json$Json$Encode$null)
						]);
				} else {
					if (!sps.b.b) {
						switch (sps.a.$) {
							case 'Ascending':
								var _v4 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('ascending'))
									]);
							case 'Descending':
								var _v5 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('descending'))
									]);
							case 'CustomSort':
								var dvs = sps.a.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(dvs))
									]);
							default:
								break _v3$4;
						}
					} else {
						break _v3$4;
					}
				}
			}
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'sort',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$sortProperties, sps)))
				]);
		case 'MBinned':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 'MCondition':
			var predicate = field.a;
			var ifClause = field.b;
			var elseClause = field.c;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					$elm$json$Json$Encode$object(
						_Utils_ap(
							$gicentre$elm_vegalite$VegaLite$predicateProperties(predicate),
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markChannelProperties, ifClause)))),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markChannelProperties, elseClause));
		case 'MConditions':
			var ifClauses = field.a;
			var elseClause = field.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					A2(
						$elm$json$Json$Encode$list,
						function (_v6) {
							var predicate = _v6.a;
							var ifClause = _v6.b;
							return $elm$json$Json$Encode$object(
								_Utils_ap(
									$gicentre$elm_vegalite$VegaLite$predicateProperties(predicate),
									A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markChannelProperties, ifClause)));
						},
						ifClauses)),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markChannelProperties, elseClause));
		case 'MTimeUnit':
			var tu = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		case 'MTitle':
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', s);
		case 'MAggregate':
			var op = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 'MPath':
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'value', s);
		case 'MNumber':
			var x = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'value', x);
		case 'MString':
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'value', s);
		default:
			var b = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'value', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$predicateProperties = function (predicate) {
	switch (predicate.$) {
		case 'Param':
			var p = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(p))
				]);
		case 'ParamEmpty':
			var p = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(p)),
					_Utils_Tuple2(
					'empty',
					$elm$json$Json$Encode$bool(false))
				]);
		default:
			var bo = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'test',
					$gicentre$elm_vegalite$VegaLite$booleanOpSpec(bo))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$trFilterSpec = F2(
	function (mc, f) {
		switch (f.$) {
			case 'FExpr':
				var ex = f.a;
				return $elm$json$Json$Encode$string(ex);
			case 'FCompose':
				var boolExpr = f.a;
				return $gicentre$elm_vegalite$VegaLite$booleanOpSpec(boolExpr);
			default:
				return $elm$json$Json$Encode$object(
					_Utils_ap(
						$gicentre$elm_vegalite$VegaLite$markChannelProperties(mc),
						$gicentre$elm_vegalite$VegaLite$filterProperties(f)));
		}
	});
var $gicentre$elm_vegalite$VegaLite$color = function (markProps) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'color',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markChannelProperties, markProps))));
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $gicentre$elm_vegalite$VegaLite$VLEncoding = {$: 'VLEncoding'};
var $gicentre$elm_vegalite$VegaLite$encoding = function (channels) {
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLEncoding,
		$elm$json$Json$Encode$object(channels));
};
var $gicentre$elm_vegalite$VegaLite$FOneOf = F2(
	function (a, b) {
		return {$: 'FOneOf', a: a, b: b};
	});
var $gicentre$elm_vegalite$VegaLite$fiOneOf = $gicentre$elm_vegalite$VegaLite$FOneOf;
var $gicentre$elm_vegalite$VegaLite$filter = function (f) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'filter',
			$gicentre$elm_vegalite$VegaLite$filterSpec(f)));
};
var $gicentre$elm_vegalite$VegaLite$HAlignLeft = {$: 'HAlignLeft'};
var $gicentre$elm_vegalite$VegaLite$haLeft = $gicentre$elm_vegalite$VegaLite$HAlignLeft;
var $gicentre$elm_vegalite$VegaLite$VLHeight = {$: 'VLHeight'};
var $gicentre$elm_vegalite$VegaLite$height = function (h) {
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLHeight,
		$elm$json$Json$Encode$float(h));
};
var $gicentre$elm_vegalite$VegaLite$VLLayer = {$: 'VLLayer'};
var $gicentre$elm_vegalite$VegaLite$layer = function (specs) {
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLLayer,
		$gicentre$elm_vegalite$VegaLite$toList(specs));
};
var $gicentre$elm_vegalite$VegaLite$Line = {$: 'Line'};
var $gicentre$elm_vegalite$VegaLite$line = $gicentre$elm_vegalite$VegaLite$mark($gicentre$elm_vegalite$VegaLite$Line);
var $gicentre$elm_vegalite$VegaLite$MLegend = function (a) {
	return {$: 'MLegend', a: a};
};
var $gicentre$elm_vegalite$VegaLite$mLegend = $gicentre$elm_vegalite$VegaLite$MLegend;
var $gicentre$elm_vegalite$VegaLite$MName = function (a) {
	return {$: 'MName', a: a};
};
var $gicentre$elm_vegalite$VegaLite$mName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$MmType = function (a) {
	return {$: 'MmType', a: a};
};
var $gicentre$elm_vegalite$VegaLite$Nominal = {$: 'Nominal'};
var $gicentre$elm_vegalite$VegaLite$mNominal = $gicentre$elm_vegalite$VegaLite$MmType($gicentre$elm_vegalite$VegaLite$Nominal);
var $gicentre$elm_vegalite$VegaLite$MAlign = function (a) {
	return {$: 'MAlign', a: a};
};
var $gicentre$elm_vegalite$VegaLite$maAlign = $gicentre$elm_vegalite$VegaLite$MAlign;
var $gicentre$elm_vegalite$VegaLite$MdX = function (a) {
	return {$: 'MdX', a: a};
};
var $gicentre$elm_vegalite$VegaLite$Num = function (a) {
	return {$: 'Num', a: a};
};
var $gicentre$elm_vegalite$VegaLite$maDx = function (n) {
	return $gicentre$elm_vegalite$VegaLite$MdX(
		$gicentre$elm_vegalite$VegaLite$Num(n));
};
var $gicentre$elm_vegalite$VegaLite$MOpacity = function (a) {
	return {$: 'MOpacity', a: a};
};
var $gicentre$elm_vegalite$VegaLite$maOpacity = function (n) {
	return $gicentre$elm_vegalite$VegaLite$MOpacity(
		$gicentre$elm_vegalite$VegaLite$Num(n));
};
var $gicentre$elm_vegalite$VegaLite$MStrokeWidth = function (a) {
	return {$: 'MStrokeWidth', a: a};
};
var $gicentre$elm_vegalite$VegaLite$maStrokeWidth = function (n) {
	return $gicentre$elm_vegalite$VegaLite$MStrokeWidth(
		$gicentre$elm_vegalite$VegaLite$Num(n));
};
var $gicentre$elm_vegalite$VegaLite$ArgMax = function (a) {
	return {$: 'ArgMax', a: a};
};
var $gicentre$elm_vegalite$VegaLite$opArgMax = $gicentre$elm_vegalite$VegaLite$ArgMax;
var $gicentre$elm_vegalite$VegaLite$opAs = F3(
	function (op, field, label) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'op',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op)),
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'as',
					$elm$json$Json$Encode$string(label))
				]));
	});
var $gicentre$elm_vegalite$VegaLite$Distinct = {$: 'Distinct'};
var $gicentre$elm_vegalite$VegaLite$opDistinct = $gicentre$elm_vegalite$VegaLite$Distinct;
var $gicentre$elm_vegalite$VegaLite$Max = {$: 'Max'};
var $gicentre$elm_vegalite$VegaLite$opMax = $gicentre$elm_vegalite$VegaLite$Max;
var $gicentre$elm_vegalite$VegaLite$Sum = {$: 'Sum'};
var $gicentre$elm_vegalite$VegaLite$opSum = $gicentre$elm_vegalite$VegaLite$Sum;
var $gicentre$elm_vegalite$VegaLite$PAggregate = function (a) {
	return {$: 'PAggregate', a: a};
};
var $gicentre$elm_vegalite$VegaLite$pAggregate = $gicentre$elm_vegalite$VegaLite$PAggregate;
var $gicentre$elm_vegalite$VegaLite$PAxis = function (a) {
	return {$: 'PAxis', a: a};
};
var $gicentre$elm_vegalite$VegaLite$pAxis = $gicentre$elm_vegalite$VegaLite$PAxis;
var $gicentre$elm_vegalite$VegaLite$PName = function (a) {
	return {$: 'PName', a: a};
};
var $gicentre$elm_vegalite$VegaLite$pName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$PName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$PmType = function (a) {
	return {$: 'PmType', a: a};
};
var $gicentre$elm_vegalite$VegaLite$Quantitative = {$: 'Quantitative'};
var $gicentre$elm_vegalite$VegaLite$pQuant = $gicentre$elm_vegalite$VegaLite$PmType($gicentre$elm_vegalite$VegaLite$Quantitative);
var $gicentre$elm_vegalite$VegaLite$Temporal = {$: 'Temporal'};
var $gicentre$elm_vegalite$VegaLite$pTemporal = $gicentre$elm_vegalite$VegaLite$PmType($gicentre$elm_vegalite$VegaLite$Temporal);
var $gicentre$elm_vegalite$VegaLite$AxGridColor = function (a) {
	return {$: 'AxGridColor', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridDash = function (a) {
	return {$: 'AxGridDash', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridDashOffset = function (a) {
	return {$: 'AxGridDashOffset', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridOpacity = function (a) {
	return {$: 'AxGridOpacity', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridWidth = function (a) {
	return {$: 'AxGridWidth', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelAlign = function (a) {
	return {$: 'AxLabelAlign', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelColor = function (a) {
	return {$: 'AxLabelColor', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelFont = function (a) {
	return {$: 'AxLabelFont', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelFontSize = function (a) {
	return {$: 'AxLabelFontSize', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelFontStyle = function (a) {
	return {$: 'AxLabelFontStyle', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelOffset = function (a) {
	return {$: 'AxLabelOffset', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelOpacity = function (a) {
	return {$: 'AxLabelOpacity', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelPadding = function (a) {
	return {$: 'AxLabelPadding', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickColor = function (a) {
	return {$: 'AxTickColor', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickDash = function (a) {
	return {$: 'AxTickDash', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickDashOffset = function (a) {
	return {$: 'AxTickDashOffset', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickOpacity = function (a) {
	return {$: 'AxTickOpacity', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickSize = function (a) {
	return {$: 'AxTickSize', a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickWidth = function (a) {
	return {$: 'AxTickWidth', a: a};
};
var $gicentre$elm_vegalite$VegaLite$axLabelAlign = $gicentre$elm_vegalite$VegaLite$AxLabelAlign;
var $gicentre$elm_vegalite$VegaLite$AxLabelBaseline = function (a) {
	return {$: 'AxLabelBaseline', a: a};
};
var $gicentre$elm_vegalite$VegaLite$axLabelBaseline = $gicentre$elm_vegalite$VegaLite$AxLabelBaseline;
var $gicentre$elm_vegalite$VegaLite$AxLabelFontWeight = function (a) {
	return {$: 'AxLabelFontWeight', a: a};
};
var $gicentre$elm_vegalite$VegaLite$axLabelFontWeight = $gicentre$elm_vegalite$VegaLite$AxLabelFontWeight;
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $gicentre$elm_vegalite$VegaLite$maybeNumExpr = F2(
	function (objName, n) {
		if (n.$ === 'MaybeNum') {
			var maybeX = n.a;
			if (maybeX.$ === 'Just') {
				var x = maybeX.a;
				return (x === 1) ? _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$bool(true))
					]) : _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$float(x))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$bool(false))
					]);
			}
		} else {
			var s = n.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $gicentre$elm_vegalite$VegaLite$sideSpec = function (side) {
	switch (side.$) {
		case 'STop':
			return $elm$json$Json$Encode$string('top');
		case 'SBottom':
			return $elm$json$Json$Encode$string('bottom');
		case 'SLeft':
			return $elm$json$Json$Encode$string('left');
		case 'SRight':
			return $elm$json$Json$Encode$string('right');
		default:
			var ex = side.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(ex))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$tickBandSpec = function (tb) {
	switch (tb.$) {
		case 'TBCenter':
			return $elm$json$Json$Encode$string('center');
		case 'TBExtent':
			return $elm$json$Json$Encode$string('extent');
		default:
			var s = tb.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $gicentre$elm_vegalite$VegaLite$axisProperty = function (axisProp) {
	switch (axisProp.$) {
		case 'AxAria':
			var aps = axisProp.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 'AxBandPosition':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPosition', n);
		case 'AxDataCondition':
			var predicate = axisProp.a;
			var cap = axisProp.b;
			var firstProp = A2(
				$elm$core$Basics$composeR,
				$elm$core$List$head,
				$elm$core$Maybe$withDefault(
					_Utils_Tuple2('', $elm$json$Json$Encode$null)));
			var _v2 = function () {
				switch (cap.$) {
					case 'CAxLabelAlign':
						var ha1 = cap.a;
						var ha2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelAlign(ha1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelAlign(ha2))));
					case 'CAxLabelBaseline':
						var va1 = cap.a;
						var va2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelBaseline(va1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelBaseline(va2))));
					case 'CAxLabelColor':
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelColor(c1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelColor(c2))));
					case 'CAxLabelFont':
						var f1 = cap.a;
						var f2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFont(f1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFont(f2))));
					case 'CAxLabelFontSize':
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontSize(s1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontSize(s2))));
					case 'CAxLabelFontStyle':
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontStyle(s1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontStyle(s2))));
					case 'CAxLabelFontWeight':
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelFontWeight(w1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelFontWeight(w2))));
					case 'CAxLabelOffset':
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOffset(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOffset(o2))));
					case 'CAxLabelOpacity':
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOpacity(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOpacity(o2))));
					case 'CAxLabelPadding':
						var p1 = cap.a;
						var p2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelPadding(p1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelPadding(p2))));
					case 'CAxTickColor':
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickColor(c1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickColor(c2))));
					case 'CAxTickDash':
						var d1 = cap.a;
						var d2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDash(d1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDash(d2))));
					case 'CAxTickDashOffset':
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDashOffset(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDashOffset(o2))));
					case 'CAxTickOpacity':
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickOpacity(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickOpacity(o2))));
					case 'CAxTickSize':
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickSize(s1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickSize(s2))));
					case 'CAxTickWidth':
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickWidth(w1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickWidth(w2))));
					case 'CAxGridColor':
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridColor(c1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridColor(c2))));
					case 'CAxGridDash':
						var d1 = cap.a;
						var d2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDash(d1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDash(d2))));
					case 'CAxGridDashOffset':
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDashOffset(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDashOffset(o2))));
					case 'CAxGridOpacity':
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridOpacity(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridOpacity(o2))));
					default:
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridWidth(w1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridWidth(w2))));
				}
			}();
			var ifProp = _v2.a;
			var elseProp = _v2.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					ifProp.a,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'condition',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'test',
											$gicentre$elm_vegalite$VegaLite$booleanOpSpec(predicate)),
											_Utils_Tuple2('value', ifProp.b)
										]))),
								_Utils_Tuple2('value', elseProp.b)
							])))
				]);
		case 'AxFormat':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 'AxTemporalFormats':
			var fmts = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'format',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							function (_v4) {
								var tu = _v4.a;
								var s = _v4.b;
								return _Utils_Tuple2(
									$gicentre$elm_vegalite$VegaLite$timeUnitLabel(tu),
									$elm$json$Json$Encode$string(s));
							},
							fmts)))
				]);
		case 'AxFormatAsNum':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 'AxFormatAsTemporal':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 'AxFormatAsCustom':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 'AxGridCap':
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 'AxGridColor':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gridColor', s);
		case 'AxGridDash':
			var ns = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'gridDash', ns);
		case 'AxGridDashOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridDashOffset', n);
		case 'AxGridOpacity':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridOpacity', n);
		case 'AxGridWidth':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridWidth', n);
		case 'AxLabels':
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'labels', b);
		case 'AxLabelAlign':
			var ha = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'AxLabelBaseline':
			var va = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'AxLabelBound':
			var mn = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$maybeNumExpr, 'labelBound', mn);
		case 'AxLabelAngle':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelAngle', n);
		case 'AxLabelColor':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 'AxLabelExpr':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 'AxLabelFlush':
			var n = axisProp.a;
			switch (n.$) {
				case 'Num':
					var x = n.a;
					return (!x) ? _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(true))
						]) : A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
				case 'NoNum':
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
			}
		case 'AxLabelFlushOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlushOffset', n);
		case 'AxLabelFont':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 'AxLabelFontSize':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', n);
		case 'AxLabelFontStyle':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 'AxLabelFontWeight':
			var fw = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'AxLabelLimit':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', n);
		case 'AxLabelLineHeight':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLineHeight', n);
		case 'AxLabelOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', n);
		case 'AxLabelOpacity':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOpacity', n);
		case 'AxLabelOverlap':
			var strat = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(strat))
				]);
		case 'AxLabelPadding':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelPadding', n);
		case 'AxLabelSeparation':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelSeparation', n);
		case 'AxDomain':
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'domain', b);
		case 'AxDomainCap':
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domainCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 'AxDomainColor':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'domainColor', s);
		case 'AxDomainDash':
			var ns = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'domainDash', ns);
		case 'AxDomainDashOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainDashOffset', n);
		case 'AxDomainOpacity':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainOpacity', n);
		case 'AxDomainWidth':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainWidth', n);
		case 'AxGrid':
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'grid', b);
		case 'AxMaxExtent':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxExtent', n);
		case 'AxMinExtent':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minExtent', n);
		case 'AxOrient':
			var side = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(side))
				]);
		case 'AxOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', n);
		case 'AxPosition':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'position', n);
		case 'AxTranslate':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'translate', n);
		case 'AxStyle':
			var ss = axisProp.a;
			if (ss.$ === 'Strs') {
				var xs = ss.a;
				if (xs.b && (!xs.b.b)) {
					var s = xs.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'style',
							$elm$json$Json$Encode$string(s))
						]);
				} else {
					return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'style', ss);
				}
			} else {
				return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'style', ss);
			}
		case 'AxZIndex':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'zindex', n);
		case 'AxTicks':
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'ticks', b);
		case 'AxTickBand':
			var tb = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickBand',
					$gicentre$elm_vegalite$VegaLite$tickBandSpec(tb))
				]);
		case 'AxTickCap':
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 'AxTickColor':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'tickColor', s);
		case 'AxTickCount':
			var tc = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCount',
					$gicentre$elm_vegalite$VegaLite$scaleNiceSpec(tc))
				]);
		case 'AxTickDash':
			var ns = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'tickDash', ns);
		case 'AxTickDashOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickDashOffset', n);
		case 'AxTickExtra':
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickExtra', b);
		case 'AxTickOffset':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOffset', n);
		case 'AxTickOpacity':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOpacity', n);
		case 'AxTickRound':
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickRound', b);
		case 'AxTickMinStep':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickMinStep', n);
		case 'AxTickSize':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickSize', n);
		case 'AxTickWidth':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickWidth', n);
		case 'AxValues':
			var vals = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'values',
					$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(vals))
				]);
		case 'AxTitle':
			var s = axisProp.a;
			if (s.$ === 'Str') {
				var ttl = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'title',
						$gicentre$elm_vegalite$VegaLite$multilineTextSpec(ttl))
					]);
			} else {
				return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'title', s);
			}
		case 'AxTitleAlign':
			var al = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(al))
				]);
		case 'AxTitleAngle':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleAngle', n);
		case 'AxTitleAnchor':
			var an = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 'AxTitleBaseline':
			var va = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'AxTitleColor':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 'AxTitleFont':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 'AxTitleFontSize':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', n);
		case 'AxTitleFontStyle':
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 'AxTitleFontWeight':
			var fw = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'AxTitleLimit':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', n);
		case 'AxTitleLineHeight':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', n);
		case 'AxTitleOpacity':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', n);
		case 'AxTitlePadding':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', n);
		case 'AxTitleX':
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleX', n);
		default:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleY', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$imMethodLabel = function (method) {
	switch (method.$) {
		case 'ImValue':
			return 'value';
		case 'ImMean':
			return 'mean';
		case 'ImMedian':
			return 'median';
		case 'ImMax':
			return 'max';
		default:
			return 'min';
	}
};
var $gicentre$elm_vegalite$VegaLite$imputeProperty = function (ip) {
	switch (ip.$) {
		case 'ImFrame':
			if (ip.a.$ === 'Just') {
				if (ip.b.$ === 'Just') {
					var n1 = ip.a.a;
					var n2 = ip.b.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'frame',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$int,
								_List_fromArray(
									[n1, n2])))
						]);
				} else {
					var n1 = ip.a.a;
					var _v2 = ip.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'frame',
							$gicentre$elm_vegalite$VegaLite$toList(
								_List_fromArray(
									[
										$elm$json$Json$Encode$int(n1),
										$elm$json$Json$Encode$null
									])))
						]);
				}
			} else {
				if (ip.b.$ === 'Just') {
					var _v1 = ip.a;
					var n2 = ip.b.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'frame',
							$gicentre$elm_vegalite$VegaLite$toList(
								_List_fromArray(
									[
										$elm$json$Json$Encode$null,
										$elm$json$Json$Encode$int(n2)
									])))
						]);
				} else {
					var _v3 = ip.a;
					var _v4 = ip.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'frame',
							$gicentre$elm_vegalite$VegaLite$toList(
								_List_fromArray(
									[$elm$json$Json$Encode$null, $elm$json$Json$Encode$null])))
						]);
				}
			}
		case 'ImKeyVals':
			var dVals = ip.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'keyvals',
					$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(dVals))
				]);
		case 'ImKeyValSequence':
			var start = ip.a;
			var stop = ip.b;
			var step = ip.c;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'keyvals',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'start',
								$elm$json$Json$Encode$float(start)),
								_Utils_Tuple2(
								'stop',
								$elm$json$Json$Encode$float(stop)),
								_Utils_Tuple2(
								'step',
								$elm$json$Json$Encode$float(step))
							])))
				]);
		case 'ImMethod':
			var method = ip.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'method',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$imMethodLabel(method)))
				]);
		case 'ImNewValue':
			var dVal = ip.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(dVal))
				]);
		default:
			var ss = ip.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'groupby', ss);
	}
};
var $gicentre$elm_vegalite$VegaLite$stackOffsetSpec = function (sp) {
	switch (sp.$) {
		case 'OfZero':
			return $elm$json$Json$Encode$string('zero');
		case 'OfNormalize':
			return $elm$json$Json$Encode$string('normalize');
		case 'OfCenter':
			return $elm$json$Json$Encode$string('center');
		default:
			return $elm$json$Json$Encode$null;
	}
};
var $gicentre$elm_vegalite$VegaLite$stackOffsetProperty = function (offset) {
	return _Utils_Tuple2(
		'stack',
		$gicentre$elm_vegalite$VegaLite$stackOffsetSpec(offset));
};
var $gicentre$elm_vegalite$VegaLite$positionChannelProperty = function (pDef) {
	switch (pDef.$) {
		case 'PName':
			var s = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 'PDatum':
			var d = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(d))
				]);
		case 'PmType':
			var measure = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(measure)))
				]);
		case 'PBin':
			var bps = pDef.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 'PBinned':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 'PAggregate':
			var op = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 'PTimeUnit':
			var tu = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		case 'PTitle':
			var s = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', s);
		case 'PSort':
			var sps = pDef.a;
			_v1$4:
			while (true) {
				if (!sps.b) {
					return _List_fromArray(
						[
							_Utils_Tuple2('sort', $elm$json$Json$Encode$null)
						]);
				} else {
					if (!sps.b.b) {
						switch (sps.a.$) {
							case 'Ascending':
								var _v2 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('ascending'))
									]);
							case 'Descending':
								var _v3 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('descending'))
									]);
							case 'CustomSort':
								var dvs = sps.a.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(dvs))
									]);
							default:
								break _v1$4;
						}
					} else {
						break _v1$4;
					}
				}
			}
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'sort',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$sortProperties, sps)))
				]);
		case 'PBandPosition':
			var x = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPosition', x);
		case 'PScale':
			var sps = pDef.a;
			return _Utils_eq(sps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('scale', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$scaleProperty, sps)))
				]);
		case 'PAxis':
			var aps = pDef.a;
			return _Utils_eq(aps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('axis', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'axis',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisProperty, aps)))
				]);
		case 'PStack':
			var so = pDef.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$stackOffsetProperty(so)
				]);
		case 'PRepeat':
			var arr = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 'PRepeatDatum':
			var arr = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 'PWidth':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string('width'))
				]);
		case 'PHeight':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string('height'))
				]);
		case 'PNumber':
			var x = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'value', x);
		default:
			var ips = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'impute',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$imputeProperty, ips)))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$positionLabel = function (pChannel) {
	switch (pChannel.$) {
		case 'X':
			return 'x';
		case 'Y':
			return 'y';
		case 'X2':
			return 'x2';
		case 'Y2':
			return 'y2';
		case 'XOffset':
			return 'xOffset';
		case 'YOffset':
			return 'yOffset';
		case 'Theta':
			return 'theta';
		case 'Theta2':
			return 'theta2';
		case 'R':
			return 'radius';
		case 'R2':
			return 'radius2';
		case 'XError':
			return 'xError';
		case 'YError':
			return 'yError';
		case 'XError2':
			return 'xError2';
		case 'YError2':
			return 'yError2';
		case 'Longitude':
			return 'longitude';
		case 'Latitude':
			return 'latitude';
		case 'Longitude2':
			return 'longitude2';
		default:
			return 'latitude2';
	}
};
var $gicentre$elm_vegalite$VegaLite$position = F2(
	function (pos, pDefs) {
		return $elm$core$List$cons(
			_Utils_Tuple2(
				$gicentre$elm_vegalite$VegaLite$positionLabel(pos),
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$positionChannelProperty, pDefs))));
	});
var $author$project$Data$Species$speciesToString = function (species) {
	switch (species.$) {
		case 'AmericanCrow':
			return 'American Crow';
		case 'CarolinaWren':
			return 'Carolina Wren';
		case 'EasternBluebird':
			return 'Eastern Bluebird';
		case 'NorthernBobwhite':
			return 'Northern Bobwhite';
		case 'NorthernCardinal':
			return 'Northern Cardinal';
		case 'SummerTanager':
			return 'Summer Tanager';
		default:
			return 'Wood Thrush';
	}
};
var $gicentre$elm_vegalite$VegaLite$Strings = function (a) {
	return {$: 'Strings', a: a};
};
var $gicentre$elm_vegalite$VegaLite$strs = $gicentre$elm_vegalite$VegaLite$Strings;
var $gicentre$elm_vegalite$VegaLite$TAggregate = function (a) {
	return {$: 'TAggregate', a: a};
};
var $gicentre$elm_vegalite$VegaLite$tAggregate = $gicentre$elm_vegalite$VegaLite$TAggregate;
var $gicentre$elm_vegalite$VegaLite$TFormat = function (a) {
	return {$: 'TFormat', a: a};
};
var $gicentre$elm_vegalite$VegaLite$tFormat = function (s) {
	return $gicentre$elm_vegalite$VegaLite$TFormat(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$TName = function (a) {
	return {$: 'TName', a: a};
};
var $gicentre$elm_vegalite$VegaLite$tName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$TName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$TmType = function (a) {
	return {$: 'TmType', a: a};
};
var $gicentre$elm_vegalite$VegaLite$tQuant = $gicentre$elm_vegalite$VegaLite$TmType($gicentre$elm_vegalite$VegaLite$Quantitative);
var $gicentre$elm_vegalite$VegaLite$tTemporal = $gicentre$elm_vegalite$VegaLite$TmType($gicentre$elm_vegalite$VegaLite$Temporal);
var $gicentre$elm_vegalite$VegaLite$TTitle = function (a) {
	return {$: 'TTitle', a: a};
};
var $gicentre$elm_vegalite$VegaLite$tTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$TTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$textChannelProperties = function (tDef) {
	switch (tDef.$) {
		case 'TName':
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 'TRepeat':
			var arr = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 'TmType':
			var measure = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(measure)))
				]);
		case 'TBin':
			var bps = tDef.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 'TBinned':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 'TAggregate':
			var op = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 'TTimeUnit':
			var tu = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		case 'TTitle':
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', s);
		case 'TFormat':
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 'TFormatAsNum':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 'TFormatAsTemporal':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 'TFormatAsCustom':
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 'TCondition':
			var predicate = tDef.a;
			var ifClause = tDef.b;
			var elseClause = tDef.c;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					$elm$json$Json$Encode$object(
						_Utils_ap(
							$gicentre$elm_vegalite$VegaLite$predicateProperties(predicate),
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$textChannelProperties, ifClause)))),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$textChannelProperties, elseClause));
		case 'TConditions':
			var ifClauses = tDef.a;
			var elseClause = tDef.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					A2(
						$elm$json$Json$Encode$list,
						function (_v1) {
							var predicate = _v1.a;
							var ifClause = _v1.b;
							return $elm$json$Json$Encode$object(
								_Utils_ap(
									$gicentre$elm_vegalite$VegaLite$predicateProperties(predicate),
									A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$textChannelProperties, ifClause)));
						},
						ifClauses)),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$textChannelProperties, elseClause));
		case 'TString':
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'value', s);
		default:
			var d = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(d))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$text = function (tDefs) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'text',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$textChannelProperties, tDefs))));
};
var $gicentre$elm_vegalite$VegaLite$Text = {$: 'Text'};
var $gicentre$elm_vegalite$VegaLite$textMark = $gicentre$elm_vegalite$VegaLite$mark($gicentre$elm_vegalite$VegaLite$Text);
var $gicentre$elm_vegalite$VegaLite$toVegaLite = function (spec) {
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'$schema',
				$elm$json$Json$Encode$string('https://vega.github.io/schema/vega-lite/v5.json')),
			A2(
				$elm$core$List$map,
				function (_v0) {
					var s = _v0.a;
					var v = _v0.b;
					return _Utils_Tuple2(
						$gicentre$elm_vegalite$VegaLite$vlPropertyLabel(s),
						v);
				},
				spec)));
};
var $gicentre$elm_vegalite$VegaLite$tooltips = function (tDefss) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'tooltip',
			A2(
				$elm$json$Json$Encode$list,
				function (tDefs) {
					return $elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$textChannelProperties, tDefs));
				},
				tDefss)));
};
var $gicentre$elm_vegalite$VegaLite$VLTransform = {$: 'VLTransform'};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $gicentre$elm_vegalite$VegaLite$transform = function (transforms) {
	var assemble = function (_v1) {
		var trName = _v1.a;
		var val = _v1.b;
		if (trName === 'multiSpecs') {
			return val;
		} else {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(trName, val)
					]));
		}
	};
	return $elm$core$List$isEmpty(transforms) ? _Utils_Tuple2($gicentre$elm_vegalite$VegaLite$VLTransform, $elm$json$Json$Encode$null) : _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLTransform,
		A2($elm$json$Json$Encode$list, assemble, transforms));
};
var $gicentre$elm_vegalite$VegaLite$VLWidth = {$: 'VLWidth'};
var $gicentre$elm_vegalite$VegaLite$width = function (w) {
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLWidth,
		$elm$json$Json$Encode$float(w));
};
var $author$project$Specs$ExampleTrends$mkExampleTrendsSpec = F2(
	function (data, species) {
		var trans = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						A2(
							$elm$core$Basics$composeL,
							A2(
								$elm$core$Basics$composeL,
								$gicentre$elm_vegalite$VegaLite$transform,
								$gicentre$elm_vegalite$VegaLite$filter(
									A2(
										$gicentre$elm_vegalite$VegaLite$fiOneOf,
										'common_name',
										$gicentre$elm_vegalite$VegaLite$strs(
											A2($elm$core$List$map, $author$project$Data$Species$speciesToString, species))))),
							A2(
								$gicentre$elm_vegalite$VegaLite$aggregate,
								_List_fromArray(
									[
										A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'count', 'speciesCount')
									]),
								_List_fromArray(
									['year', 'mbbs_county', 'route', 'common_name', 'sci_name']))),
						A2(
							$gicentre$elm_vegalite$VegaLite$aggregate,
							_List_fromArray(
								[
									A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'speciesCount', 'routeCount')
								]),
							_List_fromArray(
								['year', 'mbbs_county', 'route', 'common_name', 'sci_name']))),
					A2(
						$gicentre$elm_vegalite$VegaLite$aggregate,
						_List_fromArray(
							[
								A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'routeCount', 'countyCount'),
								A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opDistinct, 'route', 'nRoutesRun')
							]),
						_List_fromArray(
							['year', 'mbbs_county', 'common_name', 'sci_name']))),
				A2(
					$gicentre$elm_vegalite$VegaLite$aggregate,
					_List_fromArray(
						[
							A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'countyCount', 'yearCount'),
							A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'nRoutesRun', 'yearRoutes')
						]),
					_List_fromArray(
						['year', 'common_name', 'sci_name']))),
			A2($gicentre$elm_vegalite$VegaLite$calculateAs, '\n                    datum.yearCount / datum.yearRoutes\n                    ', 'avgCount'));
		var lineEnc = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$gicentre$elm_vegalite$VegaLite$encoding,
					A2(
						$gicentre$elm_vegalite$VegaLite$position,
						$gicentre$elm_vegalite$VegaLite$X,
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$pName('year'),
								$gicentre$elm_vegalite$VegaLite$pTemporal,
								$gicentre$elm_vegalite$VegaLite$pAxis(
								_List_fromArray(
									[
										$gicentre$elm_vegalite$VegaLite$axTitle(''),
										$gicentre$elm_vegalite$VegaLite$axGrid(false)
									]))
							]))),
				A2(
					$gicentre$elm_vegalite$VegaLite$position,
					$gicentre$elm_vegalite$VegaLite$Y,
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$pName('avgCount'),
							$gicentre$elm_vegalite$VegaLite$pQuant,
							$gicentre$elm_vegalite$VegaLite$pAxis(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$axTitle('Average Count per Route'),
									$gicentre$elm_vegalite$VegaLite$axGrid(false)
								]))
						]))),
			$gicentre$elm_vegalite$VegaLite$tooltips(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('common_name'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Common name')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('sci_name'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Scientific name')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('year'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Year'),
							$gicentre$elm_vegalite$VegaLite$tTemporal,
							$gicentre$elm_vegalite$VegaLite$tFormat('%Y')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('avgCount'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Average Count'),
							$gicentre$elm_vegalite$VegaLite$tQuant,
							$gicentre$elm_vegalite$VegaLite$tFormat('.2f')
						])
					])));
		var labelEnc = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$gicentre$elm_vegalite$VegaLite$encoding,
					A2(
						$gicentre$elm_vegalite$VegaLite$position,
						$gicentre$elm_vegalite$VegaLite$X,
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$pName('year'),
								$gicentre$elm_vegalite$VegaLite$pAggregate($gicentre$elm_vegalite$VegaLite$opMax),
								$gicentre$elm_vegalite$VegaLite$pTemporal
							]))),
				A2(
					$gicentre$elm_vegalite$VegaLite$position,
					$gicentre$elm_vegalite$VegaLite$Y,
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$pName('avgCount'),
							$gicentre$elm_vegalite$VegaLite$pQuant,
							$gicentre$elm_vegalite$VegaLite$pAggregate(
							$gicentre$elm_vegalite$VegaLite$opArgMax(
								$elm$core$Maybe$Just('year')))
						]))),
			$gicentre$elm_vegalite$VegaLite$text(
				_List_fromArray(
					[
						$gicentre$elm_vegalite$VegaLite$tName('common_name'),
						$gicentre$elm_vegalite$VegaLite$tAggregate(
						$gicentre$elm_vegalite$VegaLite$opArgMax(
							$elm$core$Maybe$Just('year')))
					])));
		var enc = A2(
			$elm$core$Basics$composeL,
			$gicentre$elm_vegalite$VegaLite$encoding,
			$gicentre$elm_vegalite$VegaLite$color(
				_List_fromArray(
					[
						$gicentre$elm_vegalite$VegaLite$mName('common_name'),
						$gicentre$elm_vegalite$VegaLite$mNominal,
						$gicentre$elm_vegalite$VegaLite$mLegend(_List_Nil)
					])));
		return $gicentre$elm_vegalite$VegaLite$toVegaLite(
			_List_fromArray(
				[
					data,
					$gicentre$elm_vegalite$VegaLite$width(450),
					$gicentre$elm_vegalite$VegaLite$height(300),
					$gicentre$elm_vegalite$VegaLite$autosize(
					_List_fromArray(
						[$gicentre$elm_vegalite$VegaLite$asFit, $gicentre$elm_vegalite$VegaLite$asPadding, $gicentre$elm_vegalite$VegaLite$asResize])),
					enc(_List_Nil),
					$gicentre$elm_vegalite$VegaLite$layer(
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									lineEnc(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(_List_Nil)
								])),
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									lineEnc(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maStrokeWidth(12),
											$gicentre$elm_vegalite$VegaLite$maOpacity(0)
										]))
								])),
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									labelEnc(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$circle(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$textMark(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maAlign($gicentre$elm_vegalite$VegaLite$haLeft),
											$gicentre$elm_vegalite$VegaLite$maDx(1.5)
										]))
								]))
						])),
					trans(_List_Nil)
				]));
	});
var $author$project$Main$exampleTrendsSpec = A2(
	$author$project$Specs$ExampleTrends$mkExampleTrendsSpec,
	$author$project$Data$Mbbs$mbbsData,
	_List_fromArray(
		[$author$project$Data$Species$WoodThrush, $author$project$Data$Species$NorthernBobwhite, $author$project$Data$Species$EasternBluebird, $author$project$Data$Species$SummerTanager]));
var $gicentre$elm_vegalite$VegaLite$View = function (a) {
	return {$: 'View', a: a};
};
var $gicentre$elm_vegalite$VegaLite$coView = $gicentre$elm_vegalite$VegaLite$View;
var $gicentre$elm_vegalite$VegaLite$axisConfigProperty = function (axisCfg) {
	switch (axisCfg.$) {
		case 'AxcoStyle':
			var ss = axisCfg.a;
			if (ss.$ === 'Strs') {
				var xs = ss.a;
				if (xs.b && (!xs.b.b)) {
					var s = xs.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'style',
							$elm$json$Json$Encode$string(s))
						]);
				} else {
					return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'style', ss);
				}
			} else {
				return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'style', ss);
			}
		case 'AxcoAria':
			var aps = axisCfg.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 'AxcoDisable':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'disable', b);
		case 'AxcoBandPosition':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPosition', x);
		case 'AxcoDomain':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'domain', b);
		case 'AxcoDomainCap':
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domainCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 'AxcoDomainColor':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'domainColor', s);
		case 'AxcoDomainDash':
			var xs = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'domainDash', xs);
		case 'AxcoDomainDashOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainDashOffset', x);
		case 'AxcoDomainOpacity':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainOpacity', x);
		case 'AxcoDomainWidth':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainWidth', x);
		case 'AxcoMaxExtent':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxExtent', x);
		case 'AxcoMinExtent':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minExtent', x);
		case 'AxcoOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', x);
		case 'AxcoGrid':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'grid', b);
		case 'AxcoGridCap':
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 'AxcoGridColor':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gridColor', s);
		case 'AxcoGridDash':
			var xs = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'gridDash', xs);
		case 'AxcoGridDashOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridDashOffset', x);
		case 'AxcoGridOpacity':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridOpacity', x);
		case 'AxcoGridWidth':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridWidth', x);
		case 'AxcoLabels':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'labels', b);
		case 'AxcoLabelAlign':
			var ha = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'AxcoLabelAngle':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelAngle', x);
		case 'AxcoLabelBaseline':
			var va = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'AxcoLabelBound':
			var mn = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$maybeNumExpr, 'labelBound', mn);
		case 'AxcoLabelColor':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 'AxcoLabelExpr':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 'AxcoLabelFlush':
			var n = axisCfg.a;
			switch (n.$) {
				case 'Num':
					var x = n.a;
					return (!x) ? _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(true))
						]) : A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
				case 'NoNum':
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
			}
		case 'AxcoLabelFlushOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlushOffset', x);
		case 'AxcoLabelFont':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 'AxcoLabelFontStyle':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 'AxcoLabelFontSize':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', x);
		case 'AxcoLabelFontWeight':
			var fw = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'AxcoLabelLimit':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', x);
		case 'AxcoLabelLineHeight':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLineHeight', x);
		case 'AxcoLabelOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', x);
		case 'AxcoLabelOpacity':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOpacity', x);
		case 'AxcoLabelOverlap':
			var strat = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(strat))
				]);
		case 'AxcoLabelPadding':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelPadding', x);
		case 'AxcoLabelSeparation':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelSeparation', x);
		case 'AxcoTicks':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'ticks', b);
		case 'AxcoTickBand':
			var tb = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickBand',
					$gicentre$elm_vegalite$VegaLite$tickBandSpec(tb))
				]);
		case 'AxcoTickCap':
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 'AxcoTickColor':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'tickColor', s);
		case 'AxcoTickCount':
			var tc = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCount',
					$gicentre$elm_vegalite$VegaLite$scaleNiceSpec(tc))
				]);
		case 'AxcoTickDash':
			var xs = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'tickDash', xs);
		case 'AxcoTickDashOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickDashOffset', x);
		case 'AxcoTickExtra':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickExtra', b);
		case 'AxcoTickOffset':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOffset', x);
		case 'AxcoTickOpacity':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOpacity', x);
		case 'AxcoTickMinStep':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickMinStep', x);
		case 'AxcoTickRound':
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickRound', b);
		case 'AxcoTickSize':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickSize', x);
		case 'AxcoTickWidth':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickWidth', x);
		case 'AxcoTitleAlign':
			var al = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(al))
				]);
		case 'AxcoTitleAngle':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleAngle', x);
		case 'AxcoTitleAnchor':
			var an = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 'AxcoTitleBaseline':
			var va = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'AxcoTitleColor':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 'AxcoTitleFont':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 'AxcoTitleFontStyle':
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 'AxcoTitleFontWeight':
			var w = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 'AxcoTitleFontSize':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', x);
		case 'AxcoTitleLimit':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', x);
		case 'AxcoTitleLineHeight':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', x);
		case 'AxcoTitleOpacity':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', x);
		case 'AxcoTitlePadding':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', x);
		case 'AxcoTitleX':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleX', x);
		case 'AxcoTitleY':
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleY', x);
		default:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'translate', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$axisLabel = function (axChoice) {
	switch (axChoice.$) {
		case 'AxX':
			return 'axisX';
		case 'AxY':
			return 'axisY';
		default:
			return 'axis';
	}
};
var $gicentre$elm_vegalite$VegaLite$concatConfigProperty = function (ccp) {
	if (ccp.$ === 'CoColumns') {
		var x = ccp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', x);
	} else {
		var x = ccp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'spacing', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$facetConfigProperty = function (fcp) {
	if (fcp.$ === 'FCColumns') {
		var x = fcp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', x);
	} else {
		var x = fcp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'spacing', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$fieldTitleLabel = function (ftp) {
	switch (ftp.$) {
		case 'FTVerbal':
			return 'verbal';
		case 'FTFunction':
			return 'functional';
		default:
			return 'plain';
	}
};
var $gicentre$elm_vegalite$VegaLite$NoStr = {$: 'NoStr'};
var $gicentre$elm_vegalite$VegaLite$headerProperty = function (hProp) {
	switch (hProp.$) {
		case 'HFormat':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 'HFormatAsNum':
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 'HFormatAsTemporal':
			return A2(
				$gicentre$elm_vegalite$VegaLite$strExpr,
				'formatType',
				$gicentre$elm_vegalite$VegaLite$Str('time'));
		case 'HFormatAsCustom':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 'HLabelAlign':
			var ha = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'HLabelAnchor':
			var a = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(a))
				]);
		case 'HLabelAngle':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelAngle', x);
		case 'HLabelBaseline':
			var va = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'HLabelColor':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 'HLabelExpr':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 'HLabelFont':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 'HLabelFontSize':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', x);
		case 'HLabelFontStyle':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 'HLabelFontWeight':
			var fw = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'HLabelLimit':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', x);
		case 'HLabelLineHeight':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLineHeight', x);
		case 'HLabelOrient':
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOrient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(orient))
				]);
		case 'HLabelPadding':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelPadding', x);
		case 'HLabels':
			var b = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'labels', b);
		case 'HOrient':
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(orient))
				]);
		case 'HTitle':
			var ttl = hProp.a;
			if (ttl.$ === 'Str') {
				var s = ttl.a;
				if (s === '') {
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'title', $gicentre$elm_vegalite$VegaLite$NoStr);
				} else {
					return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', ttl);
				}
			} else {
				return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'title', ttl);
			}
		case 'HTitleAnchor':
			var a = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(a))
				]);
		case 'HTitleAlign':
			var ha = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'HTitleAngle':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleAngle', x);
		case 'HTitleBaseline':
			var va = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'HTitleColor':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 'HTitleFont':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 'HTitleFontWeight':
			var fw = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'HTitleFontSize':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', x);
		case 'HTitleFontStyle':
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 'HTitleLimit':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', x);
		case 'HTitleLineHeight':
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', x);
		case 'HTitleOrient':
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleOrient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(orient))
				]);
		default:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$legendConfigProperty = function (legendConfig) {
	switch (legendConfig.$) {
		case 'LecoAria':
			var aps = legendConfig.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 'LecoDisable':
			var b = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'disable', b);
		case 'LecoClipHeight':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipHeight', x);
		case 'LecoColumnPadding':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columnPadding', x);
		case 'LecoRowPadding':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rowPadding', x);
		case 'LecoColumns':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', x);
		case 'LecoCornerRadius':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', x);
		case 'LecoDirection':
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'direction',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 'LecoFillColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fillColor', s);
		case 'LecoOrient':
			var orient = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$legendOrientSpec(orient))
				]);
		case 'LecoOffset':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', x);
		case 'LecoStrokeColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'strokeColor', s);
		case 'LecoStrokeDash':
			var xs = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', xs);
		case 'LecoStrokeWidth':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', x);
		case 'LecoPadding':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padding', x);
		case 'LecoGradientDirection':
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gradientDirection',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 'LecoGradientHorizontalMaxLength':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientHorizontalMaxLength', x);
		case 'LecoGradientHorizontalMinLength':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientHorizontalMinLength', x);
		case 'LecoGradientVerticalMaxLength':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientVerticalMaxLength', x);
		case 'LecoGradientVerticalMinLength':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientVerticalMinLength', x);
		case 'LecoGradientLabelLimit':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLabelLimit', x);
		case 'LecoGradientLength':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLength', x);
		case 'LecoGradientLabelOffset':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLabelOffset', x);
		case 'LecoGradientOpacity':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientOpacity', x);
		case 'LecoGradientStrokeColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gradientStrokeColor', s);
		case 'LecoGradientStrokeWidth':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientStrokeWidth', x);
		case 'LecoGradientThickness':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientThickness', x);
		case 'LecoGridAlign':
			var ga = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridAlign',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$compositionAlignmentLabel(ga)))
				]);
		case 'LecoLabelAlign':
			var ha = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'LecoLabelBaseline':
			var va = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'LecoLabelColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 'LecoLabelFont':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 'LecoLabelFontSize':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', x);
		case 'LecoLabelFontStyle':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 'LecoLabelFontWeight':
			var fw = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'LecoLabelLimit':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', x);
		case 'LecoLabelOffset':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', x);
		case 'LecoLabelOverlap':
			var lo = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(lo))
				]);
		case 'LecoSymbolDirection':
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolDirection',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 'LecoSymbolLimit':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolLimit', x);
		case 'LecoSymbolFillColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolFillColor', s);
		case 'LecoSymbolBaseFillColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolBaseFillColor', s);
		case 'LecoSymbolStrokeColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolStrokeColor', s);
		case 'LecoSymbolBaseStrokeColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolBaseStrokeColor', s);
		case 'LecoSymbolDash':
			var xs = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'symbolDash', xs);
		case 'LecoSymbolDashOffset':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolDashOffset', x);
		case 'LecoSymbolOffset':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOffset', x);
		case 'LecoSymbolOpacity':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOpacity', x);
		case 'LecoSymbolType':
			var s = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolType',
					$gicentre$elm_vegalite$VegaLite$symbolSpec(s))
				]);
		case 'LecoSymbolSize':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolSize', x);
		case 'LecoSymbolStrokeWidth':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolStrokeWidth', x);
		case 'LecoNoTitle':
			return _List_fromArray(
				[
					_Utils_Tuple2('title', $elm$json$Json$Encode$null)
				]);
		case 'LecoTitleAlign':
			var ha = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 'LecoTitleBaseline':
			var va = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'LecoTitleAnchor':
			var an = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 'LecoTitleColor':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 'LecoTitleFont':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 'LecoTitleFontSize':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', x);
		case 'LecoTitleFontStyle':
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 'LecoTitleFontWeight':
			var fw = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 'LecoTitleLimit':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', x);
		case 'LecoTitleLineHeight':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', x);
		case 'LecoTitleOpacity':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', x);
		case 'LecoTitlePadding':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', x);
		case 'LecoUnselectedOpacity':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'unselectedOpacity', x);
		case 'LecoPositionX':
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendX', x);
		default:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendY', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$localeProperty = function (lp) {
	switch (lp.$) {
		case 'LoDecimal':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'decimal', s);
		case 'LoThousands':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'thousands', s);
		case 'LoGrouping':
			var grp = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'grouping', grp);
		case 'LoCurrency':
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'currency', ss);
		case 'LoNumerals':
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'numerals', ss);
		case 'LoPercent':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'percent', s);
		case 'LoMinus':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'minus', s);
		case 'LoNan':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'nan', s);
		case 'LoDateTime':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'dateTime', s);
		case 'LoDate':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'date', s);
		case 'LoTime':
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'time', s);
		case 'LoPeriods':
			var ps = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'periods', ps);
		case 'LoDays':
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'days', ss);
		case 'LoShortDays':
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'shortDays', ss);
		case 'LoMonths':
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'months', ss);
		default:
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'shortMonths', ss);
	}
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $gicentre$elm_vegalite$VegaLite$localeProperties = function (lps) {
	var splitNumDate = function (lp) {
		switch (lp.$) {
			case 'LoDecimal':
				return true;
			case 'LoThousands':
				return true;
			case 'LoGrouping':
				return true;
			case 'LoCurrency':
				return true;
			case 'LoNumerals':
				return true;
			case 'LoPercent':
				return true;
			case 'LoMinus':
				return true;
			case 'LoNan':
				return true;
			default:
				return false;
		}
	};
	return A3(
		$elm$core$Tuple$mapBoth,
		$elm$core$List$concatMap($gicentre$elm_vegalite$VegaLite$localeProperty),
		$elm$core$List$concatMap($gicentre$elm_vegalite$VegaLite$localeProperty),
		A2($elm$core$List$partition, splitNumDate, lps));
};
var $gicentre$elm_vegalite$VegaLite$paddingSpec = function (pad) {
	switch (pad.$) {
		case 'PSize':
			var x = pad.a;
			switch (x.$) {
				case 'Num':
					var n = x.a;
					return $elm$json$Json$Encode$float(n);
				case 'NoNum':
					return $elm$json$Json$Encode$null;
				default:
					var s = x.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							]));
			}
		case 'PEdges':
			var s = pad.a;
			if (s.$ === 'Nums') {
				var ns = s.a;
				if ((((ns.b && ns.b.b) && ns.b.b.b) && ns.b.b.b.b) && (!ns.b.b.b.b.b)) {
					var l = ns.a;
					var _v4 = ns.b;
					var t = _v4.a;
					var _v5 = _v4.b;
					var r = _v5.a;
					var _v6 = _v5.b;
					var b = _v6.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'left',
								$elm$json$Json$Encode$float(l)),
								_Utils_Tuple2(
								'top',
								$elm$json$Json$Encode$float(t)),
								_Utils_Tuple2(
								'right',
								$elm$json$Json$Encode$float(r)),
								_Utils_Tuple2(
								'bottom',
								$elm$json$Json$Encode$float(b))
							]));
				} else {
					return $elm$json$Json$Encode$null;
				}
			} else {
				var ee = s.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(ee))
						]));
			}
		default:
			var s = pad.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $gicentre$elm_vegalite$VegaLite$numStr = function (n) {
	switch (n.$) {
		case 'Num':
			var x = n.a;
			return $elm$core$String$fromFloat(x);
		case 'NoNum':
			return 'null';
		default:
			var s = n.a;
			return s;
	}
};
var $gicentre$elm_vegalite$VegaLite$projectionSpec = function (proj) {
	switch (proj.$) {
		case 'Albers':
			return $elm$json$Json$Encode$string('albers');
		case 'AlbersUsa':
			return $elm$json$Json$Encode$string('albersUsa');
		case 'AzimuthalEqualArea':
			return $elm$json$Json$Encode$string('azimuthalEqualArea');
		case 'AzimuthalEquidistant':
			return $elm$json$Json$Encode$string('azimuthalEquidistant');
		case 'ConicConformal':
			return $elm$json$Json$Encode$string('conicConformal');
		case 'ConicEqualArea':
			return $elm$json$Json$Encode$string('conicEqualarea');
		case 'ConicEquidistant':
			return $elm$json$Json$Encode$string('conicEquidistant');
		case 'Custom':
			var projName = proj.a;
			return $elm$json$Json$Encode$string(projName);
		case 'EqualEarth':
			return $elm$json$Json$Encode$string('equalEarth');
		case 'Equirectangular':
			return $elm$json$Json$Encode$string('equirectangular');
		case 'Gnomonic':
			return $elm$json$Json$Encode$string('gnomonic');
		case 'Identity':
			return $elm$json$Json$Encode$string('identity');
		case 'Mercator':
			return $elm$json$Json$Encode$string('mercator');
		case 'NaturalEarth1':
			return $elm$json$Json$Encode$string('naturalEarth1');
		case 'Orthographic':
			return $elm$json$Json$Encode$string('orthographic');
		case 'Stereographic':
			return $elm$json$Json$Encode$string('stereographic');
		case 'TransverseMercator':
			return $elm$json$Json$Encode$string('transverseMercator');
		default:
			var s = proj.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$projectionProperty = function (pp) {
	switch (pp.$) {
		case 'PrType':
			var proj = pp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$gicentre$elm_vegalite$VegaLite$projectionSpec(proj))
				]);
		case 'PrFit':
			var spec = pp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2('fit', spec)
				]);
		case 'PrClipAngle':
			var n = pp.a;
			switch (n.$) {
				case 'Num':
					var x = n.a;
					return (x > 0) ? A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipAngle', n) : _List_fromArray(
						[
							_Utils_Tuple2('clipAngle', $elm$json$Json$Encode$null)
						]);
				case 'NoNum':
					return _List_fromArray(
						[
							_Utils_Tuple2('clipAngle', $elm$json$Json$Encode$null)
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipAngle', n);
			}
		case 'PrClipExtent':
			var rClip = pp.a;
			switch (rClip.$) {
				case 'NoClip':
					return _List_fromArray(
						[
							_Utils_Tuple2('clipExtent', $elm$json$Json$Encode$null)
						]);
				case 'LTRB':
					var l = rClip.a;
					var t = rClip.b;
					var r = rClip.c;
					var b = rClip.d;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'clipExtent',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$list($elm$json$Json$Encode$float),
								_List_fromArray(
									[
										_List_fromArray(
										[l, t]),
										_List_fromArray(
										[r, b])
									])))
						]);
				default:
					var l = rClip.a;
					var t = rClip.b;
					var r = rClip.c;
					var b = rClip.d;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'clipExtent',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'expr',
										$elm$json$Json$Encode$string('[[' + (l + (',' + (t + ('],[' + (r + (',' + (b + ']]')))))))))
									])))
						]);
			}
		case 'PrReflectX':
			var b = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'reflectX', b);
		case 'PrReflectY':
			var b = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'reflectY', b);
		case 'PrCenter':
			var lambda = pp.a;
			var phi = pp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'center',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($gicentre$elm_vegalite$VegaLite$numStr(lambda) + (',' + ($gicentre$elm_vegalite$VegaLite$numStr(phi) + ']')))))
							])))
				]);
		case 'PrScale':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'scale', x);
		case 'PrTranslate':
			var tx = pp.a;
			var ty = pp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'translate',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($gicentre$elm_vegalite$VegaLite$numStr(tx) + (',' + ($gicentre$elm_vegalite$VegaLite$numStr(ty) + ']')))))
							])))
				]);
		case 'PrRotate':
			var lambda = pp.a;
			var phi = pp.b;
			var gamma = pp.c;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'rotate',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($gicentre$elm_vegalite$VegaLite$numStr(lambda) + (',' + ($gicentre$elm_vegalite$VegaLite$numStr(phi) + (',' + ($gicentre$elm_vegalite$VegaLite$numStr(gamma) + ']')))))))
							])))
				]);
		case 'PrPointRadius':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'pointRadius', x);
		case 'PrPrecision':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'precision', x);
		case 'PrCoefficient':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'coefficient', x);
		case 'PrDistance':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'distance', x);
		case 'PrFraction':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fraction', x);
		case 'PrLobes':
			var n = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'lobes', n);
		case 'PrParallel':
			var lat = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'parallel', lat);
		case 'PrParallels':
			var lat1 = pp.a;
			var lat2 = pp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'parallels',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($gicentre$elm_vegalite$VegaLite$numStr(lat1) + (',' + ($gicentre$elm_vegalite$VegaLite$numStr(lat2) + ']')))))
							])))
				]);
		case 'PrRadius':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radius', x);
		case 'PrRatio':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'ratio', x);
		case 'PrSpacing':
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'spacing', x);
		default:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tilt', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$rangeConfigProperty = function (rangeCfg) {
	switch (rangeCfg.$) {
		case 'RacoCategory':
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'category',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 'RacoDiverging':
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'diverging',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 'RacoHeatmap':
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'heatmap',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 'RacoOrdinal':
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'ordinal',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 'RacoRamp':
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'ramp',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 'RacoSymbols':
			var syms = rangeCfg.a;
			return _Utils_Tuple2(
				'symbol',
				A2($elm$json$Json$Encode$list, $gicentre$elm_vegalite$VegaLite$symbolSpec, syms));
		default:
			var s = rangeCfg.a;
			return _Utils_Tuple2(
				'symbol',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'signal',
							$elm$json$Json$Encode$string(s))
						])));
	}
};
var $gicentre$elm_vegalite$VegaLite$scaleConfigProperty = function (scaleCfg) {
	switch (scaleCfg.$) {
		case 'SacoBandPaddingInner':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPaddingInner', x);
		case 'SacoBandPaddingOuter':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPaddingOuter', x);
		case 'SacoBarBandPaddingInner':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'barBandPaddingInner', x);
		case 'SacoRectBandPaddingInner':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rectBandPaddingInner', x);
		case 'SacoContinuousPadding':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousPadding', x);
		case 'SacoClamp':
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clamp', b);
		case 'SacoMaxBandSize':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxBandSize', x);
		case 'SacoMinBandSize':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minBandSize', x);
		case 'SacoMaxFontSize':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxFontSize', x);
		case 'SacoMinFontSize':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minFontSize', x);
		case 'SacoMaxOpacity':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxOpacity', x);
		case 'SacoMinOpacity':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minOpacity', x);
		case 'SacoMaxSize':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxSize', x);
		case 'SacoMinSize':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minSize', x);
		case 'SacoMaxStrokeWidth':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxStrokeWidth', x);
		case 'SacoMinStrokeWidth':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minStrokeWidth', x);
		case 'SacoPointPadding':
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'pointPadding', x);
		case 'SacoRound':
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'round', b);
		case 'SacoUseUnaggregatedDomain':
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'useUnaggregatedDomain', b);
		default:
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'xReverse', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionLabel = function (seType) {
	if (seType.$ === 'SePoint') {
		return 'point';
	} else {
		return 'interval';
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionMarkProperty = function (markProp) {
	switch (markProp.$) {
		case 'SMFill':
			var ss = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', ss);
		case 'SMFillOpacity':
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', x);
		case 'SMStroke':
			var s = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
		case 'SMStrokeOpacity':
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', x);
		case 'SMStrokeWidth':
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', x);
		case 'SMStrokeDash':
			var xs = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', xs);
		case 'SMStrokeDashOffset':
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', x);
		default:
			var cur = markProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$gicentre$elm_vegalite$VegaLite$cursorSpec(cur))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionResolutionLabel = function (res) {
	switch (res.$) {
		case 'SeGlobal':
			return 'global';
		case 'SeUnion':
			return 'union';
		default:
			return 'intersect';
	}
};
var $gicentre$elm_vegalite$VegaLite$togglePredicateSpec = function (tp) {
	switch (tp.$) {
		case 'TpFalse':
			return $elm$json$Json$Encode$bool(false);
		case 'TpExpr':
			var ex = tp.a;
			return $elm$json$Json$Encode$string(ex);
		case 'TpShiftKey':
			return $elm$json$Json$Encode$string('event.shiftKey');
		case 'TpCtrlKey':
			return $elm$json$Json$Encode$string('event.ctrlKey');
		default:
			return $elm$json$Json$Encode$string('event.altKey');
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionProperties = function (selProp) {
	switch (selProp.$) {
		case 'Fields':
			var fNames = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fields',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, fNames))
				]);
		case 'Encodings':
			var channels = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'encodings',
					A2(
						$elm$json$Json$Encode$list,
						A2($elm$core$Basics$composeL, $elm$json$Json$Encode$string, $gicentre$elm_vegalite$VegaLite$channelLabel),
						channels))
				]);
		case 'On':
			var s = selProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'on', s);
		case 'Clear':
			var es = selProp.a;
			switch (es.$) {
				case 'Str':
					var s = es.a;
					return ($elm$core$String$trim(s) === '') ? _List_fromArray(
						[
							_Utils_Tuple2(
							'clear',
							$elm$json$Json$Encode$bool(false))
						]) : _List_fromArray(
						[
							_Utils_Tuple2(
							'clear',
							$elm$json$Json$Encode$string(
								$elm$core$String$trim(s)))
						]);
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'clear',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'clear', es);
			}
		case 'ResolveSelections':
			var res = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'resolve',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$selectionResolutionLabel(res)))
				]);
		case 'SelectionMark':
			var markProps = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mark',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$selectionMarkProperty, markProps)))
				]);
		case 'Nearest':
			var b = selProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'nearest', b);
		case 'Toggle':
			var tp = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'toggle',
					$gicentre$elm_vegalite$VegaLite$togglePredicateSpec(tp))
				]);
		case 'Translate':
			var es = selProp.a;
			switch (es.$) {
				case 'Str':
					var s = es.a;
					return ($elm$core$String$trim(s) === '') ? _List_fromArray(
						[
							_Utils_Tuple2(
							'translate',
							$elm$json$Json$Encode$bool(false))
						]) : _List_fromArray(
						[
							_Utils_Tuple2(
							'translate',
							$elm$json$Json$Encode$string(
								$elm$core$String$trim(s)))
						]);
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'translate',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'translate', es);
			}
		default:
			var es = selProp.a;
			switch (es.$) {
				case 'Str':
					var s = es.a;
					return ($elm$core$String$trim(s) === '') ? _List_fromArray(
						[
							_Utils_Tuple2(
							'zoom',
							$elm$json$Json$Encode$bool(false))
						]) : _List_fromArray(
						[
							_Utils_Tuple2(
							'zoom',
							$elm$json$Json$Encode$string(
								$elm$core$String$trim(s)))
						]);
				case 'NoStr':
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'zoom',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'zoom', es);
			}
	}
};
var $gicentre$elm_vegalite$VegaLite$tfSpec = function (tf) {
	switch (tf.$) {
		case 'FrGroup':
			return $elm$json$Json$Encode$string('group');
		case 'FrBounds':
			return $elm$json$Json$Encode$string('bounds');
		default:
			var s = tf.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $gicentre$elm_vegalite$VegaLite$titleConfigProperty = function (titleCfg) {
	switch (titleCfg.$) {
		case 'TiAnchor':
			var an = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'anchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 'TiAngle':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'angle', n);
		case 'TiBaseline':
			var va = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'baseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 'TiColor':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'color', s);
		case 'TiDx':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dx', n);
		case 'TiDy':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dy', n);
		case 'TiFont':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'font', s);
		case 'TiFontSize':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fontSize', n);
		case 'TiFontStyle':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fontStyle', s);
		case 'TiFrame':
			var tf = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'frame',
					$gicentre$elm_vegalite$VegaLite$tfSpec(tf))
				]);
		case 'TiFontWeight':
			var w = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 'TiLimit':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'limit', n);
		case 'TiLineHeight':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'lineHeight', n);
		case 'TiOffset':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', n);
		case 'TiOrient':
			var sd = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(sd))
				]);
		case 'TiStyle':
			var ss = titleCfg.a;
			if (ss.b && (!ss.b.b)) {
				var s = ss.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'style',
						$elm$json$Json$Encode$string(s))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'style',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss))
					]);
			}
		case 'TiSubtitle':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'subtitle', s);
		case 'TiSubtitleColor':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'subtitleColor', s);
		case 'TiSubtitleFont':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'subtitleFont', s);
		case 'TiSubtitleFontSize':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'subtitleFontSize', n);
		case 'TiSubtitleFontStyle':
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'subtitleFontStyle', s);
		case 'TiSubtitleFontWeight':
			var w = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'subtitleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 'TiSubtitleLineHeight':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'subtitleLineHeight', n);
		case 'TiSubtitlePadding':
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'subtitlePadding', n);
		default:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'zindex', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$viewBackgroundProperty = function (vb) {
	switch (vb.$) {
		case 'VBStyle':
			var ss = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'style', ss);
		case 'VBCornerRadius':
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', n);
		case 'VBFill':
			var s = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
		case 'VBFillOpacity':
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', n);
		case 'VBOpacity':
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'opacity', n);
		case 'VBStroke':
			var s = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
		case 'VBStrokeOpacity':
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', n);
		case 'VBStrokeCap':
			var cap = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(cap))
				]);
		case 'VBStrokeJoin':
			var jn = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$gicentre$elm_vegalite$VegaLite$strokeJoinSpec(jn))
				]);
		case 'VBStrokeWidth':
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', n);
		case 'VBStrokeDash':
			var ns = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', ns);
		case 'VBStrokeDashOffset':
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', n);
		default:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeMiterLimit', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$viewConfigProperties = function (viewCfg) {
	switch (viewCfg.$) {
		case 'VContinuousWidth':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousWidth', x);
		case 'VContinuousHeight':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousHeight', x);
		case 'VDiscreteWidth':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'discreteWidth', x);
		case 'VDiscreteHeight':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'discreteHeight', x);
		case 'VClip':
			var b = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clip', b);
		case 'VCornerRadius':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', x);
		case 'VCursor':
			var cur = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$gicentre$elm_vegalite$VegaLite$cursorSpec(cur))
				]);
		case 'VFill':
			var s = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
		case 'VFillOpacity':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', x);
		case 'VOpacity':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'opacity', x);
		case 'VStep':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'step', x);
		case 'VStroke':
			var s = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
		case 'VStrokeOpacity':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', x);
		case 'VStrokeCap':
			var cap = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(cap))
				]);
		case 'VStrokeJoin':
			var jn = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$gicentre$elm_vegalite$VegaLite$strokeJoinSpec(jn))
				]);
		case 'VStrokeWidth':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', x);
		case 'VStrokeDash':
			var xs = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', xs);
		case 'VStrokeDashOffset':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', x);
		case 'VStrokeMiterLimit':
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeMiterLimit', x);
		default:
			var vbs = viewCfg.a;
			return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$viewBackgroundProperty, vbs);
	}
};
var $gicentre$elm_vegalite$VegaLite$configProperty = function (configProp) {
	switch (configProp.$) {
		case 'Aria':
			var b = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'aria', b);
		case 'Autosize':
			var aus = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'autosize',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$autosizeProperty, aus)))
				]);
		case 'Background':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'background', s);
		case 'CountTitle':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'countTitle', s);
		case 'Locale':
			var lps = configProp.a;
			var _v1 = $gicentre$elm_vegalite$VegaLite$localeProperties(lps);
			if (!_v1.a.b) {
				if (!_v1.b.b) {
					return _List_fromArray(
						[
							_Utils_Tuple2('locale', $elm$json$Json$Encode$null)
						]);
				} else {
					var dtps = _v1.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'locale',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'time',
										$elm$json$Json$Encode$object(dtps))
									])))
						]);
				}
			} else {
				if (!_v1.b.b) {
					var nps = _v1.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'locale',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'number',
										$elm$json$Json$Encode$object(nps))
									])))
						]);
				} else {
					var nps = _v1.a;
					var dtps = _v1.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'locale',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'number',
										$elm$json$Json$Encode$object(nps)),
										_Utils_Tuple2(
										'time',
										$elm$json$Json$Encode$object(dtps))
									])))
						]);
				}
			}
		case 'FieldTitle':
			var ftp = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fieldTitle',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$fieldTitleLabel(ftp)))
				]);
		case 'NormalizedNumberFormat':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'normalizedNumberFormat', s);
		case 'NormalizedNumberFormatType':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'normalizedNumberFormatType', s);
		case 'NumberFormat':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'numberFormat', s);
		case 'NumberFormatType':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'numberFormatType', s);
		case 'Padding':
			var pad = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'padding',
					$gicentre$elm_vegalite$VegaLite$paddingSpec(pad))
				]);
		case 'TimeFormat':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'timeFormat', s);
		case 'TimeFormatType':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'timeFormatType', s);
		case 'Axis':
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType),
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisLeft':
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisLeft',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisRight':
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisRight',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisTop':
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisTop',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisBottom':
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisBottom',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisBand':
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Band',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisDiscrete':
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Discrete',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisPoint':
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Point',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisQuant':
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Quantitative',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'AxisTemporal':
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Temporal',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 'Legend':
			var lcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'legend',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$legendConfigProperty, lcs)))
				]);
		case 'Font':
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'font', s);
		case 'MarkStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mark',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'Projection':
			var pps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'projection',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$projectionProperty, pps)))
				]);
		case 'AreaStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'area',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'BarStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bar',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'CircleStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'circle',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'FacetStyle':
			var fps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'facet',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$facetConfigProperty, fps)))
				]);
		case 'ConcatStyle':
			var cps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'concat',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$concatConfigProperty, cps)))
				]);
		case 'CustomFormatTypes':
			var b = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'customFormatTypes', b);
		case 'GeoshapeStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'geoshape',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'HeaderStyle':
			var hps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'header',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$headerProperty, hps)))
				]);
		case 'LineStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'line',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'PointStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'point',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'RectStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'rect',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'RuleStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'rule',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'SquareStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'square',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'TextStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'text',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'TickStyle':
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tick',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 'TitleStyle':
			var tcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$titleConfigProperty, tcs)))
				]);
		case 'MarkStyles':
			var styles = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							function (_v2) {
								var sName = _v2.a;
								var mps = _v2.b;
								return _Utils_Tuple2(
									sName,
									$elm$json$Json$Encode$object(
										A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)));
							},
							styles)))
				]);
		case 'AxisStyles':
			var styles = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							function (_v3) {
								var sName = _v3.a;
								var mps = _v3.b;
								return _Utils_Tuple2(
									sName,
									$elm$json$Json$Encode$object(
										A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisProperty, mps)));
							},
							styles)))
				]);
		case 'Scale':
			var scs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$scaleConfigProperty, scs)))
				]);
		case 'Range':
			var rcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'range',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$rangeConfigProperty, rcs)))
				]);
		case 'SelectionStyle':
			var selConfig = configProp.a;
			var selProp = function (_v4) {
				var sel = _v4.a;
				var sps = _v4.b;
				return _Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$selectionLabel(sel),
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$selectionProperties, sps)));
			};
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'selection',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, selProp, selConfig)))
				]);
		case 'View':
			var vcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'view',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$viewConfigProperties, vcs)))
				]);
		default:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'trail',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$configuration = function (cfg) {
	return $elm$core$Basics$append(
		$gicentre$elm_vegalite$VegaLite$configProperty(cfg));
};
var $gicentre$elm_vegalite$VegaLite$VLConfig = {$: 'VLConfig'};
var $gicentre$elm_vegalite$VegaLite$configure = function (configs) {
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLConfig,
		$elm$json$Json$Encode$object(configs));
};
var $gicentre$elm_vegalite$VegaLite$DName = function (a) {
	return {$: 'DName', a: a};
};
var $gicentre$elm_vegalite$VegaLite$dName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$DName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$detailChannelProperty = function (field) {
	switch (field.$) {
		case 'DName':
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 'DmType':
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(t)))
				]);
		case 'DBin':
			var bps = field.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 'DTimeUnit':
			var tu = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		default:
			var op = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
	}
};
var $gicentre$elm_vegalite$VegaLite$detail = function (detailProps) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'detail',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$detailChannelProperty, detailProps))));
};
var $gicentre$elm_vegalite$VegaLite$FEqual = F2(
	function (a, b) {
		return {$: 'FEqual', a: a, b: b};
	});
var $gicentre$elm_vegalite$VegaLite$fiEqual = $gicentre$elm_vegalite$VegaLite$FEqual;
var $gicentre$elm_vegalite$VegaLite$FSelection = function (a) {
	return {$: 'FSelection', a: a};
};
var $gicentre$elm_vegalite$VegaLite$fiSelection = $gicentre$elm_vegalite$VegaLite$FSelection;
var $gicentre$elm_vegalite$VegaLite$InOptions = function (a) {
	return {$: 'InOptions', a: a};
};
var $gicentre$elm_vegalite$VegaLite$Strs = function (a) {
	return {$: 'Strs', a: a};
};
var $gicentre$elm_vegalite$VegaLite$inOptions = function (ss) {
	return $gicentre$elm_vegalite$VegaLite$InOptions(
		$gicentre$elm_vegalite$VegaLite$Strs(ss));
};
var $gicentre$elm_vegalite$VegaLite$IPSelect = function (a) {
	return {$: 'IPSelect', a: a};
};
var $gicentre$elm_vegalite$VegaLite$ipSelect = $gicentre$elm_vegalite$VegaLite$IPSelect;
var $gicentre$elm_vegalite$VegaLite$MColor = function (a) {
	return {$: 'MColor', a: a};
};
var $gicentre$elm_vegalite$VegaLite$maColor = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MColor(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$Mean = {$: 'Mean'};
var $gicentre$elm_vegalite$VegaLite$opMean = $gicentre$elm_vegalite$VegaLite$Mean;
var $gicentre$elm_vegalite$VegaLite$PBind = function (a) {
	return {$: 'PBind', a: a};
};
var $gicentre$elm_vegalite$VegaLite$paBind = $gicentre$elm_vegalite$VegaLite$PBind;
var $gicentre$elm_vegalite$VegaLite$PSelect = F2(
	function (a, b) {
		return {$: 'PSelect', a: a, b: b};
	});
var $gicentre$elm_vegalite$VegaLite$paSelect = $gicentre$elm_vegalite$VegaLite$PSelect;
var $gicentre$elm_vegalite$VegaLite$inputProperty = function (prop) {
	switch (prop.$) {
		case 'InMin':
			var x = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'min', x);
		case 'InMax':
			var x = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'max', x);
		case 'InStep':
			var x = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'step', x);
		case 'Debounce':
			var x = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'debounce', x);
		case 'InName':
			var s = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'name', s);
		case 'InOptions':
			var ss = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'options', ss);
		case 'InDatumOptions':
			var opts = prop.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'options',
					A2($elm$json$Json$Encode$list, $gicentre$elm_vegalite$VegaLite$dataValueSpec, opts))
				]);
		case 'InDataOptions':
			var opts = prop.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'options',
					A2($elm$json$Json$Encode$list, $gicentre$elm_vegalite$VegaLite$dataValuesSpecs, opts))
				]);
		case 'InPlaceholder':
			var s = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'placeholder', s);
		default:
			var s = prop.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'element', s);
	}
};
var $gicentre$elm_vegalite$VegaLite$pBindingProperties = function (bnd) {
	switch (bnd.$) {
		case 'IPRange':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('range')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPCheckbox':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('checkbox')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPRadio':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('radio')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPSelect':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('select')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPText':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('text')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPNumber':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('number')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPDate':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('date')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPTime':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('time')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPMonth':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('month')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPWeek':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('week')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPDateTimeLocal':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('datetimelocal')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		case 'IPTel':
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('tel')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
		default:
			var props = bnd.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'input',
					$elm$json$Json$Encode$string('color')),
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$inputProperty, props));
	}
};
var $gicentre$elm_vegalite$VegaLite$paramProperty = function (pp) {
	switch (pp.$) {
		case 'PBind':
			var bps = pp.a;
			return _Utils_Tuple2(
				'bind',
				$elm$json$Json$Encode$object(
					$gicentre$elm_vegalite$VegaLite$pBindingProperties(bps)));
		case 'PBindings':
			var binds = pp.a;
			return _Utils_Tuple2(
				'bind',
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var bName = _v1.a;
							var bps = _v1.b;
							return _Utils_Tuple2(
								bName,
								$elm$json$Json$Encode$object(
									$gicentre$elm_vegalite$VegaLite$pBindingProperties(bps)));
						},
						binds)));
		case 'PBindScales':
			return _Utils_Tuple2(
				'bind',
				$elm$json$Json$Encode$string('scales'));
		case 'PBindLegend':
			var s = pp.a;
			return (!$elm$core$String$length(
				$elm$core$String$trim(s))) ? _Utils_Tuple2(
				'bind',
				$elm$json$Json$Encode$string('legend')) : _Utils_Tuple2(
				'bind',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'legend',
							$elm$json$Json$Encode$string(s))
						])));
		case 'PExpr':
			var s = pp.a;
			return _Utils_Tuple2(
				'expr',
				$elm$json$Json$Encode$string(s));
		case 'PValue':
			var d = pp.a;
			return _Utils_Tuple2(
				'value',
				$gicentre$elm_vegalite$VegaLite$dataValueSpec(d));
		case 'PValues':
			var ds = pp.a;
			return _Utils_Tuple2(
				'value',
				$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(ds));
		default:
			var s = pp.a;
			var sps = pp.b;
			if (!sps.b) {
				return _Utils_Tuple2(
					'select',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$selectionLabel(s)));
			} else {
				return _Utils_Tuple2(
					'select',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'type',
								$elm$json$Json$Encode$string(
									$gicentre$elm_vegalite$VegaLite$selectionLabel(s))),
							A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$selectionProperties, sps))));
			}
	}
};
var $gicentre$elm_vegalite$VegaLite$param = F2(
	function (nme, pps) {
		return $elm$core$List$cons(
			_Utils_Tuple2(
				nme,
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$paramProperty, pps))));
	});
var $gicentre$elm_vegalite$VegaLite$VLParams = {$: 'VLParams'};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $gicentre$elm_vegalite$VegaLite$params = function (prms) {
	var toLabelledSpecs = function (obj) {
		return A2(
			$elm$core$Result$withDefault,
			_List_Nil,
			A2(
				$elm$json$Json$Decode$decodeValue,
				$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$value),
				obj));
	};
	var extract = function (_v0) {
		var nme = _v0.a;
		var obj = _v0.b;
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(nme)),
				toLabelledSpecs(obj)));
	};
	return _Utils_Tuple2(
		$gicentre$elm_vegalite$VegaLite$VLParams,
		A2($elm$json$Json$Encode$list, extract, prms));
};
var $gicentre$elm_vegalite$VegaLite$Fields = function (a) {
	return {$: 'Fields', a: a};
};
var $gicentre$elm_vegalite$VegaLite$seFields = $gicentre$elm_vegalite$VegaLite$Fields;
var $gicentre$elm_vegalite$VegaLite$SePoint = {$: 'SePoint'};
var $gicentre$elm_vegalite$VegaLite$sePoint = $gicentre$elm_vegalite$VegaLite$SePoint;
var $gicentre$elm_vegalite$VegaLite$DStr = function (a) {
	return {$: 'DStr', a: a};
};
var $gicentre$elm_vegalite$VegaLite$str = $gicentre$elm_vegalite$VegaLite$DStr;
var $gicentre$elm_vegalite$VegaLite$VLTitle = {$: 'VLTitle'};
var $gicentre$elm_vegalite$VegaLite$title = F2(
	function (txt, tps) {
		return _Utils_Tuple2(
			$gicentre$elm_vegalite$VegaLite$VLTitle,
			$elm$json$Json$Encode$object(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'text',
						$gicentre$elm_vegalite$VegaLite$multilineTextSpec(txt)),
					A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$titleConfigProperty, tps))));
	});
var $gicentre$elm_vegalite$VegaLite$VBackground = function (a) {
	return {$: 'VBackground', a: a};
};
var $gicentre$elm_vegalite$VegaLite$vicoBackground = $gicentre$elm_vegalite$VegaLite$VBackground;
var $gicentre$elm_vegalite$VegaLite$VBStroke = function (a) {
	return {$: 'VBStroke', a: a};
};
var $gicentre$elm_vegalite$VegaLite$viewStroke = function (ms) {
	if (ms.$ === 'Just') {
		var s = ms.a;
		return $gicentre$elm_vegalite$VegaLite$VBStroke(
			$gicentre$elm_vegalite$VegaLite$Str(s));
	} else {
		return $gicentre$elm_vegalite$VegaLite$VBStroke($gicentre$elm_vegalite$VegaLite$NoStr);
	}
};
var $author$project$Specs$SpeciesTrend$mkSpeciesTrendSpec = F2(
	function (countData, species) {
		var trans = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$gicentre$elm_vegalite$VegaLite$transform,
				$gicentre$elm_vegalite$VegaLite$filter(
					$gicentre$elm_vegalite$VegaLite$fiSelection('countySelection'))),
			$gicentre$elm_vegalite$VegaLite$filter(
				A2(
					$gicentre$elm_vegalite$VegaLite$fiEqual,
					'common_name',
					$gicentre$elm_vegalite$VegaLite$str(
						$author$project$Data$Species$speciesToString(species)))));
		var ps = A2(
			$elm$core$Basics$composeL,
			$gicentre$elm_vegalite$VegaLite$params,
			A2(
				$gicentre$elm_vegalite$VegaLite$param,
				'countySelection',
				_List_fromArray(
					[
						A2(
						$gicentre$elm_vegalite$VegaLite$paSelect,
						$gicentre$elm_vegalite$VegaLite$sePoint,
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$seFields(
								_List_fromArray(
									['mbbs_county']))
							])),
						$gicentre$elm_vegalite$VegaLite$paBind(
						$gicentre$elm_vegalite$VegaLite$ipSelect(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$inOptions(
									_List_fromArray(
										['', 'orange', 'chatham', 'durham']))
								])))
					])));
		var enc = A2(
			$elm$core$Basics$composeL,
			$gicentre$elm_vegalite$VegaLite$encoding,
			A2(
				$gicentre$elm_vegalite$VegaLite$position,
				$gicentre$elm_vegalite$VegaLite$X,
				_List_fromArray(
					[
						$gicentre$elm_vegalite$VegaLite$pName('year'),
						$gicentre$elm_vegalite$VegaLite$pTemporal,
						$gicentre$elm_vegalite$VegaLite$pAxis(
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$axTitle(''),
								$gicentre$elm_vegalite$VegaLite$axGrid(false)
							]))
					])));
		var encMean = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				enc,
				A2(
					$gicentre$elm_vegalite$VegaLite$position,
					$gicentre$elm_vegalite$VegaLite$Y,
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$pName('count'),
							$gicentre$elm_vegalite$VegaLite$pAggregate($gicentre$elm_vegalite$VegaLite$opMean),
							$gicentre$elm_vegalite$VegaLite$pAxis(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$axGrid(false)
								]))
						]))),
			$gicentre$elm_vegalite$VegaLite$tooltips(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('common_name'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Common name')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('year'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Year'),
							$gicentre$elm_vegalite$VegaLite$tTemporal,
							$gicentre$elm_vegalite$VegaLite$tFormat('%Y')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('count'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Avg. count'),
							$gicentre$elm_vegalite$VegaLite$tQuant,
							$gicentre$elm_vegalite$VegaLite$tFormat('.2f'),
							$gicentre$elm_vegalite$VegaLite$tAggregate($gicentre$elm_vegalite$VegaLite$opMean)
						])
					])));
		var encRoutes = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				enc,
				A2(
					$gicentre$elm_vegalite$VegaLite$position,
					$gicentre$elm_vegalite$VegaLite$Y,
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$pName('count'),
							$gicentre$elm_vegalite$VegaLite$pQuant,
							$gicentre$elm_vegalite$VegaLite$pAggregate($gicentre$elm_vegalite$VegaLite$opSum),
							$gicentre$elm_vegalite$VegaLite$pAxis(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$axTitle('Count'),
									$gicentre$elm_vegalite$VegaLite$axGrid(false)
								]))
						]))),
			$gicentre$elm_vegalite$VegaLite$detail(
				_List_fromArray(
					[
						$gicentre$elm_vegalite$VegaLite$dName('route')
					])));
		var cfg = A2(
			$elm$core$Basics$composeL,
			$gicentre$elm_vegalite$VegaLite$configure,
			$gicentre$elm_vegalite$VegaLite$configuration(
				$gicentre$elm_vegalite$VegaLite$coView(
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$vicoBackground(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$viewStroke($elm$core$Maybe$Nothing)
								]))
						]))));
		return $gicentre$elm_vegalite$VegaLite$toVegaLite(
			_List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$width(400),
					$gicentre$elm_vegalite$VegaLite$height(300),
					cfg(_List_Nil),
					A2(
					$gicentre$elm_vegalite$VegaLite$title,
					$author$project$Data$Species$speciesToString(species),
					_List_Nil),
					countData,
					trans(_List_Nil),
					$gicentre$elm_vegalite$VegaLite$layer(
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									encRoutes(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maColor('black'),
											$gicentre$elm_vegalite$VegaLite$maOpacity(0.2),
											$gicentre$elm_vegalite$VegaLite$maStrokeWidth(0.5)
										])),
									ps(_List_Nil)
								])),
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									encMean(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maColor('gray')
										]))
								])),
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									encMean(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maStrokeWidth(15),
											$gicentre$elm_vegalite$VegaLite$maOpacity(0)
										]))
								]))
						]))
				]));
	});
var $author$project$Main$speciesTrendSpec = A2($author$project$Specs$SpeciesTrend$mkSpeciesTrendSpec, $author$project$Data$Mbbs$mbbsData, $author$project$Data$Species$EasternBluebird);
var $author$project$Data$Traits$WinterBiome = {$: 'WinterBiome'};
var $gicentre$elm_vegalite$VegaLite$lookup = F4(
	function (key1, _v0, key2, lufs) {
		var spec = _v0.b;
		return $elm$core$List$cons(
			_Utils_Tuple2(
				'multiSpecs',
				function () {
					switch (lufs.$) {
						case 'LUFields':
							var fs = lufs.a;
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'lookup',
										$elm$json$Json$Encode$string(key1)),
										_Utils_Tuple2(
										'from',
										$elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2('data', spec),
													_Utils_Tuple2(
													'key',
													$elm$json$Json$Encode$string(key2)),
													_Utils_Tuple2(
													'fields',
													A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, fs))
												])))
									]));
						case 'LUFieldsAs':
							var fas = lufs.a;
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'lookup',
										$elm$json$Json$Encode$string(key1)),
										_Utils_Tuple2(
										'from',
										$elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2('data', spec),
													_Utils_Tuple2(
													'key',
													$elm$json$Json$Encode$string(key2)),
													_Utils_Tuple2(
													'fields',
													A2(
														$elm$json$Json$Encode$list,
														function (_v2) {
															var f = _v2.a;
															return $elm$json$Json$Encode$string(f);
														},
														fas))
												]))),
										_Utils_Tuple2(
										'as',
										A2(
											$elm$json$Json$Encode$list,
											function (_v3) {
												var a = _v3.b;
												return $elm$json$Json$Encode$string(a);
											},
											fas))
									]));
						case 'LUAs':
							var s = lufs.a;
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'lookup',
										$elm$json$Json$Encode$string(key1)),
										_Utils_Tuple2(
										'from',
										$elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2('data', spec),
													_Utils_Tuple2(
													'key',
													$elm$json$Json$Encode$string(key2))
												]))),
										_Utils_Tuple2(
										'as',
										$elm$json$Json$Encode$string(s))
									]));
						case 'LUFieldsWithDefault':
							var fs = lufs.a;
							var def = lufs.b;
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'lookup',
										$elm$json$Json$Encode$string(key1)),
										_Utils_Tuple2(
										'from',
										$elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2('data', spec),
													_Utils_Tuple2(
													'key',
													$elm$json$Json$Encode$string(key2)),
													_Utils_Tuple2(
													'fields',
													A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, fs))
												]))),
										_Utils_Tuple2(
										'default',
										$elm$json$Json$Encode$string(def))
									]));
						case 'LUFieldsAsWithDefault':
							var fas = lufs.a;
							var def = lufs.b;
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'lookup',
										$elm$json$Json$Encode$string(key1)),
										_Utils_Tuple2(
										'from',
										$elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2('data', spec),
													_Utils_Tuple2(
													'key',
													$elm$json$Json$Encode$string(key2)),
													_Utils_Tuple2(
													'fields',
													A2(
														$elm$json$Json$Encode$list,
														function (_v4) {
															var f = _v4.a;
															return $elm$json$Json$Encode$string(f);
														},
														fas))
												]))),
										_Utils_Tuple2(
										'as',
										A2(
											$elm$json$Json$Encode$list,
											function (_v5) {
												var a = _v5.b;
												return $elm$json$Json$Encode$string(a);
											},
											fas)),
										_Utils_Tuple2(
										'default',
										$elm$json$Json$Encode$string(def))
									]));
						default:
							var s = lufs.a;
							var def = lufs.b;
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'lookup',
										$elm$json$Json$Encode$string(key1)),
										_Utils_Tuple2(
										'from',
										$elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2('data', spec),
													_Utils_Tuple2(
													'key',
													$elm$json$Json$Encode$string(key2))
												]))),
										_Utils_Tuple2(
										'as',
										$elm$json$Json$Encode$string(s)),
										_Utils_Tuple2(
										'default',
										$elm$json$Json$Encode$string(def))
									]));
					}
				}()));
	});
var $gicentre$elm_vegalite$VegaLite$LUFieldsAs = function (a) {
	return {$: 'LUFieldsAs', a: a};
};
var $gicentre$elm_vegalite$VegaLite$luFieldsAs = $gicentre$elm_vegalite$VegaLite$LUFieldsAs;
var $gicentre$elm_vegalite$VegaLite$MTitle = function (a) {
	return {$: 'MTitle', a: a};
};
var $gicentre$elm_vegalite$VegaLite$mTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $gicentre$elm_vegalite$VegaLite$SeGlobal = {$: 'SeGlobal'};
var $gicentre$elm_vegalite$VegaLite$seGlobal = $gicentre$elm_vegalite$VegaLite$SeGlobal;
var $gicentre$elm_vegalite$VegaLite$ResolveSelections = function (a) {
	return {$: 'ResolveSelections', a: a};
};
var $gicentre$elm_vegalite$VegaLite$seResolve = $gicentre$elm_vegalite$VegaLite$ResolveSelections;
var $author$project$Data$Traits$traitToString = function (x) {
	switch (x.$) {
		case 'BreedingBiome':
			return 'Breeding_Biome';
		case 'WinterBiome':
			return 'Winter_Biome';
		default:
			return 'Diet_5Cat';
	}
};
var $author$project$Specs$TrendByTrait$mkTrendByTraitSpec = F3(
	function (countData, traitData, trait) {
		var trans = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						A2(
							$elm$core$Basics$composeL,
							A2(
								$elm$core$Basics$composeL,
								A2(
									$elm$core$Basics$composeL,
									$gicentre$elm_vegalite$VegaLite$transform,
									A4(
										$gicentre$elm_vegalite$VegaLite$lookup,
										'common_name',
										traitData,
										'english_common_name',
										$gicentre$elm_vegalite$VegaLite$luFieldsAs(
											_List_fromArray(
												[
													_Utils_Tuple2(
													$author$project$Data$Traits$traitToString(trait),
													'group')
												])))),
								$gicentre$elm_vegalite$VegaLite$filter(
									$gicentre$elm_vegalite$VegaLite$fiSelection('countySelection'))),
							A2(
								$gicentre$elm_vegalite$VegaLite$aggregate,
								_List_fromArray(
									[
										A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'count', 'speciesCount')
									]),
								_List_fromArray(
									['year', 'group', 'mbbs_county', 'route', 'common_name']))),
						A2(
							$gicentre$elm_vegalite$VegaLite$aggregate,
							_List_fromArray(
								[
									A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'speciesCount', 'routeCount')
								]),
							_List_fromArray(
								['year', 'group', 'mbbs_county', 'route']))),
					A2(
						$gicentre$elm_vegalite$VegaLite$aggregate,
						_List_fromArray(
							[
								A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'routeCount', 'countyCount'),
								A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opDistinct, 'route', 'nRoutesRun')
							]),
						_List_fromArray(
							['year', 'group', 'mbbs_county']))),
				A2(
					$gicentre$elm_vegalite$VegaLite$aggregate,
					_List_fromArray(
						[
							A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'countyCount', 'yearCount'),
							A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'nRoutesRun', 'yearRoutes')
						]),
					_List_fromArray(
						['year', 'group']))),
			A2($gicentre$elm_vegalite$VegaLite$calculateAs, '\n                    datum.yearCount / datum.yearRoutes\n                    ', 'yBar'));
		var ps = A2(
			$elm$core$Basics$composeL,
			$gicentre$elm_vegalite$VegaLite$params,
			A2(
				$gicentre$elm_vegalite$VegaLite$param,
				'countySelection',
				_List_fromArray(
					[
						A2(
						$gicentre$elm_vegalite$VegaLite$paSelect,
						$gicentre$elm_vegalite$VegaLite$sePoint,
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$seFields(
								_List_fromArray(
									['mbbs_county'])),
								$gicentre$elm_vegalite$VegaLite$seResolve($gicentre$elm_vegalite$VegaLite$seGlobal)
							])),
						$gicentre$elm_vegalite$VegaLite$paBind(
						$gicentre$elm_vegalite$VegaLite$ipSelect(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$inOptions(
									_List_fromArray(
										['', 'orange', 'chatham', 'durham']))
								])))
					])));
		var enc = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						$gicentre$elm_vegalite$VegaLite$encoding,
						A2(
							$gicentre$elm_vegalite$VegaLite$position,
							$gicentre$elm_vegalite$VegaLite$X,
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$pName('year'),
									$gicentre$elm_vegalite$VegaLite$pTemporal,
									$gicentre$elm_vegalite$VegaLite$pAxis(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$axTitle('')
										]))
								]))),
					A2(
						$gicentre$elm_vegalite$VegaLite$position,
						$gicentre$elm_vegalite$VegaLite$Y,
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$pName('yBar'),
								$gicentre$elm_vegalite$VegaLite$pQuant,
								$gicentre$elm_vegalite$VegaLite$pAggregate($gicentre$elm_vegalite$VegaLite$opMean),
								$gicentre$elm_vegalite$VegaLite$pAxis(
								_List_fromArray(
									[
										$gicentre$elm_vegalite$VegaLite$axTitle('Average Count per Route')
									]))
							]))),
				$gicentre$elm_vegalite$VegaLite$color(
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$mName('group'),
							$gicentre$elm_vegalite$VegaLite$mTitle(
							A3(
								$elm$core$String$replace,
								'_',
								' ',
								$author$project$Data$Traits$traitToString(trait))),
							$gicentre$elm_vegalite$VegaLite$mNominal
						]))),
			$gicentre$elm_vegalite$VegaLite$tooltips(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('group'),
							$gicentre$elm_vegalite$VegaLite$tTitle(
							A3(
								$elm$core$String$replace,
								'_',
								' ',
								$author$project$Data$Traits$traitToString(trait)))
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('year'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Year'),
							$gicentre$elm_vegalite$VegaLite$tTemporal,
							$gicentre$elm_vegalite$VegaLite$tFormat('%Y')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('yBar'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Avg. count'),
							$gicentre$elm_vegalite$VegaLite$tQuant,
							$gicentre$elm_vegalite$VegaLite$tFormat('.2f'),
							$gicentre$elm_vegalite$VegaLite$tAggregate($gicentre$elm_vegalite$VegaLite$opMean)
						])
					])));
		return $gicentre$elm_vegalite$VegaLite$toVegaLite(
			_List_fromArray(
				[
					countData,
					$gicentre$elm_vegalite$VegaLite$width(500),
					$gicentre$elm_vegalite$VegaLite$height(400),
					enc(_List_Nil),
					$gicentre$elm_vegalite$VegaLite$layer(
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									ps(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(_List_Nil)
								])),
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$line(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maStrokeWidth(15),
											$gicentre$elm_vegalite$VegaLite$maOpacity(0)
										]))
								]))
						])),
					trans(_List_Nil)
				]));
	});
var $author$project$Data$Traits$traitsData = A2($gicentre$elm_vegalite$VegaLite$dataFromUrl, '../data/NC_species_traits.csv', _List_Nil);
var $author$project$Main$trendByTraitSpec = A3($author$project$Specs$TrendByTrait$mkTrendByTraitSpec, $author$project$Data$Mbbs$mbbsData, $author$project$Data$Traits$traitsData, $author$project$Data$Traits$WinterBiome);
var $author$project$Main$specs = $gicentre$elm_vegalite$VegaLite$combineSpecs(
	_List_fromArray(
		[
			_Utils_Tuple2('exampleTrends', $author$project$Main$exampleTrendsSpec),
			_Utils_Tuple2('trendByTrait', $author$project$Main$trendByTraitSpec),
			_Utils_Tuple2('speciesTrend', $author$project$Main$speciesTrendSpec)
		]));
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$Main$vegaLite = _Platform_outgoingPort('vegaLite', $elm$core$Basics$identity);
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Main$main = $elm$core$Platform$worker(
	{
		init: $elm$core$Basics$always(
			_Utils_Tuple2(
				$author$project$Main$specs,
				$author$project$Main$vegaLite($author$project$Main$specs))),
		subscriptions: $elm$core$Basics$always($elm$core$Platform$Sub$none),
		update: F2(
			function (_v0, model) {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));