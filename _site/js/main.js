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




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
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
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
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
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
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
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Data$County$Combined = {$: 'Combined'};
var $Confidenceman02$elm_select$Select$Mouse = {$: 'Mouse'};
var $Confidenceman02$elm_select$Select$Internal$NothingMousedown = {$: 'NothingMousedown'};
var $Confidenceman02$elm_select$Select$State = function (a) {
	return {$: 'State', a: a};
};
var $Confidenceman02$elm_select$Select$initState = function (id_) {
	return $Confidenceman02$elm_select$Select$State(
		{activeTargetIndex: 0, controlUiFocused: $elm$core$Maybe$Nothing, headlessEvent: $elm$core$Maybe$Nothing, initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing, jsOptimize: false, keepOpen: false, menuListScrollTop: 0, menuNavigation: $Confidenceman02$elm_select$Select$Mouse, menuOpen: false, menuViewportFocusNodes: $elm$core$Maybe$Nothing, selectId: id_});
};
var $Confidenceman02$elm_select$Select$SelectId = function (a) {
	return {$: 'SelectId', a: a};
};
var $Confidenceman02$elm_select$Select$selectIdentifier = function (id_) {
	return $Confidenceman02$elm_select$Select$SelectId(id_ + '__elm-select');
};
var $author$project$Data$Species$AmericanCrow = {$: 'AmericanCrow'};
var $author$project$Data$Species$CarolinaWren = {$: 'CarolinaWren'};
var $author$project$Data$Species$EasternBluebird = {$: 'EasternBluebird'};
var $author$project$Data$Species$NorthernBobwhite = {$: 'NorthernBobwhite'};
var $author$project$Data$Species$NorthernCardinal = {$: 'NorthernCardinal'};
var $author$project$Data$Species$SummerTanager = {$: 'SummerTanager'};
var $author$project$Data$Species$WoodThrush = {$: 'WoodThrush'};
var $author$project$Data$Species$allSpecies = _List_fromArray(
	[$author$project$Data$Species$AmericanCrow, $author$project$Data$Species$CarolinaWren, $author$project$Data$Species$EasternBluebird, $author$project$Data$Species$NorthernBobwhite, $author$project$Data$Species$NorthernCardinal, $author$project$Data$Species$SummerTanager, $author$project$Data$Species$WoodThrush]);
var $Confidenceman02$elm_select$Select$Basic = function (a) {
	return {$: 'Basic', a: a};
};
var $Confidenceman02$elm_select$Select$basicMenuItem = function (bscItem) {
	return $Confidenceman02$elm_select$Select$Basic(
		{filterable: true, group: $elm$core$Maybe$Nothing, item: bscItem.item, label: bscItem.label, styles: $elm$core$Maybe$Nothing});
};
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
var $author$project$Main$speciesToMenuItem = function (species) {
	return $Confidenceman02$elm_select$Select$basicMenuItem(
		{
			item: $author$project$Data$Species$speciesToString(species),
			label: $author$project$Data$Species$speciesToString(species)
		});
};
var $author$project$Main$speciesMenuItems = A2($elm$core$List$map, $author$project$Main$speciesToMenuItem, $author$project$Data$Species$allSpecies);
var $author$project$Main$init = {
	countyAggregation: $author$project$Data$County$Combined,
	items: $author$project$Main$speciesMenuItems,
	selectState: $Confidenceman02$elm_select$Select$initState(
		$Confidenceman02$elm_select$Select$selectIdentifier('SpeciesSelector')),
	selectedItem: $elm$core$Maybe$Nothing,
	selectedSpecies: $elm$core$Maybe$Nothing
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$String$cons = _String_cons;
var $robinheghan$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $robinheghan$murmur3$Murmur3$c1 = 3432918353;
var $robinheghan$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $robinheghan$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $robinheghan$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $robinheghan$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$robinheghan$murmur3$Murmur3$multiplyBy,
		$robinheghan$murmur3$Murmur3$c2,
		A2(
			$robinheghan$murmur3$Murmur3$rotlBy,
			15,
			A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $robinheghan$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$robinheghan$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$robinheghan$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$robinheghan$murmur3$Murmur3$multiplyBy,
					$robinheghan$murmur3$Murmur3$c2,
					A2(
						$robinheghan$murmur3$Murmur3$rotlBy,
						15,
						A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $robinheghan$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($robinheghan$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $robinheghan$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $robinheghan$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$robinheghan$murmur3$Murmur3$hashFold,
				A4($robinheghan$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$initialSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($robinheghan$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$initialSeed, str)));
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				return styles;
			} else {
				return A3(
					$elm$core$Dict$insert,
					cssTemplate,
					$rtfeldman$elm_css$Hash$fromString(cssTemplate),
					styles);
			}
		} else {
			return styles;
		}
	});
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string(classname));
			} else {
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string('_unstyled'));
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', classname);
			} else {
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', '_unstyled');
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin = '\u0007';
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration = F3(
	function (template, classname, declaration) {
		return declaration + ('\n' + A3($elm$core$String$replace, $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, classname, template));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return A3($elm$core$Dict$foldl, $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration, '', dict);
};
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = F2(
	function (maybeNonce, styles) {
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			'span',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'style', 'display: none;'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'class', 'elm-css-style-wrapper')
				]),
			_List_fromArray(
				[
					A3(
					$elm$virtual_dom$VirtualDom$node,
					'style',
					function () {
						if (maybeNonce.$ === 'Just') {
							var nonce = maybeNonce.a.a;
							return _List_fromArray(
								[
									A2($elm$virtual_dom$VirtualDom$attribute, 'nonce', nonce)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					$elm$core$List$singleton(
						$elm$virtual_dom$VirtualDom$text(
							$rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F4(
	function (maybeNonce, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, styles);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F3(
	function (maybeNonce, allStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F4(
	function (maybeNonce, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, maybeNonce, styles, keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F5(
	function (maybeNonce, ns, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, maybeNonce, styles, keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F5(
	function (maybeNonce, ns, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, styles);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyle, $elm$core$Maybe$Nothing, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, $elm$core$Maybe$Nothing, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $author$project$Main$SelectSpecies = function (a) {
	return {$: 'SelectSpecies', a: a};
};
var $elm$core$Platform$Cmd$map = _Platform_map;
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
var $gicentre$elm_vegalite$VegaLite$VLData = {$: 'VLData'};
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
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
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
var $gicentre$elm_vegalite$VegaLite$MTitle = function (a) {
	return {$: 'MTitle', a: a};
};
var $gicentre$elm_vegalite$VegaLite$mTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$MColor = function (a) {
	return {$: 'MColor', a: a};
};
var $gicentre$elm_vegalite$VegaLite$maColor = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MColor(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$Mean = {$: 'Mean'};
var $gicentre$elm_vegalite$VegaLite$opMean = $gicentre$elm_vegalite$VegaLite$Mean;
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
var $author$project$Specs$SpeciesTrend$mkSpeciesTrendSpec = F3(
	function (countData, counties, species) {
		var withCountyAggregation = F3(
			function (combined, split, x) {
				if (counties.$ === 'Combined') {
					return combined(x);
				} else {
					return split(x);
				}
			});
		var trans = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$gicentre$elm_vegalite$VegaLite$transform,
				$gicentre$elm_vegalite$VegaLite$filter(
					A2(
						$gicentre$elm_vegalite$VegaLite$fiEqual,
						'common_name',
						$gicentre$elm_vegalite$VegaLite$str(
							$author$project$Data$Species$speciesToString(species))))),
			A2(
				$gicentre$elm_vegalite$VegaLite$aggregate,
				_List_fromArray(
					[
						A3($gicentre$elm_vegalite$VegaLite$opAs, $gicentre$elm_vegalite$VegaLite$opSum, 'count', 'speciesCount')
					]),
				_List_fromArray(
					['year', 'common_name', 'sci_name', 'mbbs_county', 'route', 'route_num'])));
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
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						enc,
						A2(
							$gicentre$elm_vegalite$VegaLite$position,
							$gicentre$elm_vegalite$VegaLite$Y,
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$pName('speciesCount'),
									$gicentre$elm_vegalite$VegaLite$pAggregate($gicentre$elm_vegalite$VegaLite$opMean),
									$gicentre$elm_vegalite$VegaLite$pAxis(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$axGrid(false)
										]))
								]))),
					A2(
						withCountyAggregation,
						function (x) {
							return x;
						},
						$gicentre$elm_vegalite$VegaLite$color(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$mName('mbbs_county'),
									$gicentre$elm_vegalite$VegaLite$mTitle('County'),
									$gicentre$elm_vegalite$VegaLite$mNominal
								])))),
				A2(
					withCountyAggregation,
					function (x) {
						return x;
					},
					$gicentre$elm_vegalite$VegaLite$detail(
						_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$dName('mbbs_county')
							])))),
			A2(
				withCountyAggregation,
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
								$gicentre$elm_vegalite$VegaLite$tName('speciesCount'),
								$gicentre$elm_vegalite$VegaLite$tTitle('Avg. count'),
								$gicentre$elm_vegalite$VegaLite$tQuant,
								$gicentre$elm_vegalite$VegaLite$tFormat('.2f'),
								$gicentre$elm_vegalite$VegaLite$tAggregate($gicentre$elm_vegalite$VegaLite$opMean)
							])
						])),
				$gicentre$elm_vegalite$VegaLite$tooltips(
					_List_fromArray(
						[
							_List_fromArray(
							[
								$gicentre$elm_vegalite$VegaLite$tName('mbbs_county'),
								$gicentre$elm_vegalite$VegaLite$tTitle('County')
							]),
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
								$gicentre$elm_vegalite$VegaLite$tName('speciesCount'),
								$gicentre$elm_vegalite$VegaLite$tTitle('Avg. count'),
								$gicentre$elm_vegalite$VegaLite$tQuant,
								$gicentre$elm_vegalite$VegaLite$tFormat('.2f'),
								$gicentre$elm_vegalite$VegaLite$tAggregate($gicentre$elm_vegalite$VegaLite$opMean)
							])
						]))));
		var encRoutes = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						enc,
						A2(
							$gicentre$elm_vegalite$VegaLite$position,
							$gicentre$elm_vegalite$VegaLite$Y,
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$pName('speciesCount'),
									$gicentre$elm_vegalite$VegaLite$pQuant,
									$gicentre$elm_vegalite$VegaLite$pAggregate($gicentre$elm_vegalite$VegaLite$opSum),
									$gicentre$elm_vegalite$VegaLite$pAxis(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$axTitle('Count'),
											$gicentre$elm_vegalite$VegaLite$axGrid(false)
										]))
								]))),
					A2(
						withCountyAggregation,
						function (x) {
							return x;
						},
						$gicentre$elm_vegalite$VegaLite$color(
							_List_fromArray(
								[
									$gicentre$elm_vegalite$VegaLite$mName('mbbs_county'),
									$gicentre$elm_vegalite$VegaLite$mTitle('County'),
									$gicentre$elm_vegalite$VegaLite$mNominal
								])))),
				$gicentre$elm_vegalite$VegaLite$detail(
					_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$dName('route')
						]))),
			$gicentre$elm_vegalite$VegaLite$tooltips(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('mbbs_county'),
							$gicentre$elm_vegalite$VegaLite$tTitle('County')
						]),
						_List_fromArray(
						[
							$gicentre$elm_vegalite$VegaLite$tName('route_num'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Route')
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
							$gicentre$elm_vegalite$VegaLite$tName('speciesCount'),
							$gicentre$elm_vegalite$VegaLite$tTitle('Count'),
							$gicentre$elm_vegalite$VegaLite$tQuant
						])
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
										]))
								])),
							$gicentre$elm_vegalite$VegaLite$asSpec(
							_List_fromArray(
								[
									encRoutes(_List_Nil),
									$gicentre$elm_vegalite$VegaLite$line(
									_List_fromArray(
										[
											$gicentre$elm_vegalite$VegaLite$maOpacity(0.0),
											$gicentre$elm_vegalite$VegaLite$maStrokeWidth(10)
										]))
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
var $author$project$Main$speciesTrendSpec = $author$project$Specs$SpeciesTrend$mkSpeciesTrendSpec($author$project$Data$Mbbs$mbbsData);
var $author$project$Data$Traits$WinterBiome = {$: 'WinterBiome'};
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
var $gicentre$elm_vegalite$VegaLite$SeGlobal = {$: 'SeGlobal'};
var $gicentre$elm_vegalite$VegaLite$seGlobal = $gicentre$elm_vegalite$VegaLite$SeGlobal;
var $gicentre$elm_vegalite$VegaLite$SePoint = {$: 'SePoint'};
var $gicentre$elm_vegalite$VegaLite$sePoint = $gicentre$elm_vegalite$VegaLite$SePoint;
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
var $author$project$Main$specs = F2(
	function (x, species) {
		return $gicentre$elm_vegalite$VegaLite$combineSpecs(
			_List_fromArray(
				[
					_Utils_Tuple2('exampleTrends', $author$project$Main$exampleTrendsSpec),
					_Utils_Tuple2('trendByTrait', $author$project$Main$trendByTraitSpec),
					_Utils_Tuple2(
					'speciesTrend',
					A2($author$project$Main$speciesTrendSpec, x, species))
				]));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Data$Species$stringToSpecies = function (s) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var x = _v0.a;
				var y = _v0.b;
				return _Utils_eq(y, s) ? $elm$core$Maybe$Just(x) : $elm$core$Maybe$Nothing;
			},
			A2(
				$elm$core$List$map,
				function (x) {
					return _Utils_Tuple2(
						x,
						$author$project$Data$Species$speciesToString(x));
				},
				$author$project$Data$Species$allSpecies)));
};
var $Confidenceman02$elm_select$Select$Clear = {$: 'Clear'};
var $Confidenceman02$elm_select$Select$Internal$Clearable = {$: 'Clearable'};
var $Confidenceman02$elm_select$Select$CloseMenu = {$: 'CloseMenu'};
var $Confidenceman02$elm_select$Select$Internal$ContainerMousedown = {$: 'ContainerMousedown'};
var $Confidenceman02$elm_select$Select$Internal$ControlInput = {$: 'ControlInput'};
var $Confidenceman02$elm_select$Select$Deselect = function (a) {
	return {$: 'Deselect', a: a};
};
var $Confidenceman02$elm_select$Select$Internal$Down = {$: 'Down'};
var $Confidenceman02$elm_select$Select$FocusSet = {$: 'FocusSet'};
var $Confidenceman02$elm_select$Select$FocusingClearableH = {$: 'FocusingClearableH'};
var $Confidenceman02$elm_select$Select$FocusingInputH = {$: 'FocusingInputH'};
var $Confidenceman02$elm_select$Select$InputChange = function (a) {
	return {$: 'InputChange', a: a};
};
var $Confidenceman02$elm_select$Select$Keyboard = {$: 'Keyboard'};
var $Confidenceman02$elm_select$Select$Internal$MenuItemMousedown = function (a) {
	return {$: 'MenuItemMousedown', a: a};
};
var $Confidenceman02$elm_select$Select$Internal$MultiItemMousedown = function (a) {
	return {$: 'MultiItemMousedown', a: a};
};
var $Confidenceman02$elm_select$Select$OnInputFocused = function (a) {
	return {$: 'OnInputFocused', a: a};
};
var $Confidenceman02$elm_select$Select$OnMenuClearableFocus = function (a) {
	return {$: 'OnMenuClearableFocus', a: a};
};
var $Confidenceman02$elm_select$Select$OpenMenu = {$: 'OpenMenu'};
var $Confidenceman02$elm_select$Select$Select = function (a) {
	return {$: 'Select', a: a};
};
var $Confidenceman02$elm_select$Select$SelectBatch = function (a) {
	return {$: 'SelectBatch', a: a};
};
var $Confidenceman02$elm_select$Select$Internal$Up = {$: 'Up'};
var $Confidenceman02$elm_select$Select$Internal$calculateNextActiveTarget = F3(
	function (currentTargetIndex, totalTargetCount, direction) {
		if (direction.$ === 'Up') {
			return (!currentTargetIndex) ? (totalTargetCount - 1) : ((_Utils_cmp(totalTargetCount, currentTargetIndex + 1) < 0) ? 0 : (currentTargetIndex - 1));
		} else {
			return _Utils_eq(currentTargetIndex + 1, totalTargetCount) ? 0 : ((_Utils_cmp(totalTargetCount, currentTargetIndex + 1) < 0) ? 0 : (currentTargetIndex + 1));
		}
	});
var $Confidenceman02$elm_select$Select$clearableId = function (_v0) {
	var id_ = _v0.a;
	return id_ + '__Clearable';
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $Confidenceman02$elm_select$Select$internalFocus = F2(
	function (id, msg) {
		return A2(
			$elm$core$Task$attempt,
			msg,
			$elm$browser$Browser$Dom$focus(id));
	});
var $Confidenceman02$elm_select$Select$Above = {$: 'Above'};
var $Confidenceman02$elm_select$Select$Below = {$: 'Below'};
var $Confidenceman02$elm_select$Select$Both = {$: 'Both'};
var $Confidenceman02$elm_select$Select$Within = {$: 'Within'};
var $Confidenceman02$elm_select$Select$calculateMenuBoundaries = function (_v0) {
	var menuListElem = _v0.a;
	return _Utils_Tuple2(menuListElem.element.y, menuListElem.element.y + menuListElem.element.height);
};
var $Confidenceman02$elm_select$Select$isMenuItemWithinBottomBoundary = F2(
	function (_v0, bottomBoundary) {
		var menuItemElement = _v0.a;
		return _Utils_cmp(menuItemElement.element.y + menuItemElement.element.height, bottomBoundary) < 1;
	});
var $Confidenceman02$elm_select$Select$isMenuItemWithinTopBoundary = F2(
	function (_v0, topBoundary) {
		var menuItemElement = _v0.a;
		return _Utils_cmp(topBoundary, menuItemElement.element.y) < 1;
	});
var $Confidenceman02$elm_select$Select$menuItemOrientationInViewport = F2(
	function (menuListElem, menuItemElem) {
		var _v0 = $Confidenceman02$elm_select$Select$calculateMenuBoundaries(menuListElem);
		var topBoundary = _v0.a;
		var bottomBoundary = _v0.b;
		var _v1 = _Utils_Tuple2(
			A2($Confidenceman02$elm_select$Select$isMenuItemWithinTopBoundary, menuItemElem, topBoundary),
			A2($Confidenceman02$elm_select$Select$isMenuItemWithinBottomBoundary, menuItemElem, bottomBoundary));
		if (_v1.a) {
			if (_v1.b) {
				return $Confidenceman02$elm_select$Select$Within;
			} else {
				return $Confidenceman02$elm_select$Select$Below;
			}
		} else {
			if (_v1.b) {
				return $Confidenceman02$elm_select$Select$Above;
			} else {
				return $Confidenceman02$elm_select$Select$Both;
			}
		}
	});
var $Confidenceman02$elm_select$Select$FocusMenuViewport = function (a) {
	return {$: 'FocusMenuViewport', a: a};
};
var $Confidenceman02$elm_select$Select$MenuItemElement = function (a) {
	return {$: 'MenuItemElement', a: a};
};
var $Confidenceman02$elm_select$Select$MenuListElement = function (a) {
	return {$: 'MenuListElement', a: a};
};
var $elm$browser$Browser$Dom$getElement = _Browser_getElement;
var $Confidenceman02$elm_select$Select$menuItemId = F2(
	function (_v0, index) {
		var id_ = _v0.a;
		return 'select-menu-item-' + ($elm$core$String$fromInt(index) + ('-' + id_));
	});
var $Confidenceman02$elm_select$Select$queryActiveTargetElement = F2(
	function (selectId, index) {
		return $elm$browser$Browser$Dom$getElement(
			A2($Confidenceman02$elm_select$Select$menuItemId, selectId, index));
	});
var $Confidenceman02$elm_select$Select$menuListId = function (_v0) {
	var id_ = _v0.a;
	return 'select-menu-list-' + id_;
};
var $Confidenceman02$elm_select$Select$queryMenuListElement = function (selectId) {
	return $elm$browser$Browser$Dom$getElement(
		$Confidenceman02$elm_select$Select$menuListId(selectId));
};
var $Confidenceman02$elm_select$Select$queryNodesForViewportFocus = F2(
	function (selectId, menuItemIndex) {
		return A2(
			$elm$core$Task$attempt,
			$Confidenceman02$elm_select$Select$FocusMenuViewport,
			A3(
				$elm$core$Task$map2,
				F2(
					function (menuListElem, menuItemElem) {
						return _Utils_Tuple2(
							$Confidenceman02$elm_select$Select$MenuListElement(menuListElem),
							$Confidenceman02$elm_select$Select$MenuItemElement(menuItemElem));
					}),
				$Confidenceman02$elm_select$Select$queryMenuListElement(selectId),
				A2($Confidenceman02$elm_select$Select$queryActiveTargetElement, selectId, menuItemIndex)));
	});
var $Confidenceman02$elm_select$Select$resetState = function (_v0) {
	var state_ = _v0.a;
	return $Confidenceman02$elm_select$Select$State(
		_Utils_update(
			state_,
			{activeTargetIndex: 0, headlessEvent: $elm$core$Maybe$Nothing, menuListScrollTop: 0, menuNavigation: $Confidenceman02$elm_select$Select$Mouse, menuOpen: false, menuViewportFocusNodes: $elm$core$Maybe$Nothing}));
};
var $Confidenceman02$elm_select$Select$DoNothing = {$: 'DoNothing'};
var $Confidenceman02$elm_select$Select$listBoxBorder = 6;
var $Confidenceman02$elm_select$Select$listBoxPaddingBottom = 6;
var $Confidenceman02$elm_select$Select$listBoxPaddingTop = 4;
var $elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var $Confidenceman02$elm_select$Select$setMenuViewportPosition = F5(
	function (selectId, menuListViewport, _v0, _v1, menuItemVisibility) {
		var menuListElem = _v0.a;
		var menuItemElem = _v1.a;
		switch (menuItemVisibility.$) {
			case 'Within':
				return _Utils_Tuple2($elm$core$Platform$Cmd$none, menuListViewport);
			case 'Above':
				var menuItemDistanceAbove = ((menuListElem.element.y - menuItemElem.element.y) + $Confidenceman02$elm_select$Select$listBoxPaddingTop) + $Confidenceman02$elm_select$Select$listBoxBorder;
				return _Utils_Tuple2(
					A2(
						$elm$core$Task$attempt,
						function (_v3) {
							return $Confidenceman02$elm_select$Select$DoNothing;
						},
						A3(
							$elm$browser$Browser$Dom$setViewportOf,
							$Confidenceman02$elm_select$Select$menuListId(selectId),
							0,
							menuListViewport - menuItemDistanceAbove)),
					menuListViewport - menuItemDistanceAbove);
			case 'Below':
				var menuItemDistanceBelow = (((menuItemElem.element.y + menuItemElem.element.height) + $Confidenceman02$elm_select$Select$listBoxPaddingBottom) + $Confidenceman02$elm_select$Select$listBoxBorder) - (menuListElem.element.y + menuListElem.element.height);
				return _Utils_Tuple2(
					A2(
						$elm$core$Task$attempt,
						function (_v4) {
							return $Confidenceman02$elm_select$Select$DoNothing;
						},
						A3(
							$elm$browser$Browser$Dom$setViewportOf,
							$Confidenceman02$elm_select$Select$menuListId(selectId),
							0,
							menuListViewport + menuItemDistanceBelow)),
					menuListViewport + menuItemDistanceBelow);
			default:
				var menuItemDistanceAbove = menuListElem.element.y - menuItemElem.element.y;
				return _Utils_Tuple2(
					A2(
						$elm$core$Task$attempt,
						function (_v5) {
							return $Confidenceman02$elm_select$Select$DoNothing;
						},
						A3(
							$elm$browser$Browser$Dom$setViewportOf,
							$Confidenceman02$elm_select$Select$menuListId(selectId),
							0,
							menuListViewport - menuItemDistanceAbove)),
					menuListViewport - menuItemDistanceAbove);
		}
	});
var $Confidenceman02$elm_select$Select$Internal$shouldQueryNextTargetElement = F2(
	function (nextTargetIndex, activeTargetIndex) {
		return !_Utils_eq(nextTargetIndex, activeTargetIndex);
	});
var $Confidenceman02$elm_select$Select$unwrapItem = function (mi) {
	if (mi.$ === 'Custom') {
		var i = mi.a;
		return i.item;
	} else {
		var i = mi.a;
		return i.item;
	}
};
var $Confidenceman02$elm_select$Select$update = F2(
	function (msg, wrappedState) {
		update:
		while (true) {
			var state_ = wrappedState.a;
			var _v0 = state_.selectId;
			var idString = _v0.a;
			switch (msg.$) {
				case 'HeadlessMsg':
					var _v2 = msg.a;
					var updatedState = $Confidenceman02$elm_select$Select$State(
						_Utils_update(
							state_,
							{
								headlessEvent: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$FocusingInputH),
								menuOpen: true
							}));
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						updatedState,
						A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
				case 'InputChangedNativeSingle':
					var orderedItems = msg.a;
					var hasCurrentSelection = msg.b;
					var selectedOptionIndex = msg.c;
					var resolveIndex = hasCurrentSelection ? selectedOptionIndex : (selectedOptionIndex - 1);
					var _v3 = A2($elm_community$list_extra$List$Extra$getAt, resolveIndex, orderedItems);
					if (_v3.$ === 'Nothing') {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(state_),
							$elm$core$Platform$Cmd$none);
					} else {
						var mi = _v3.a;
						return _Utils_Tuple3(
							$elm$core$Maybe$Just(
								$Confidenceman02$elm_select$Select$Select(
									$Confidenceman02$elm_select$Select$unwrapItem(mi))),
							$Confidenceman02$elm_select$Select$State(state_),
							$elm$core$Platform$Cmd$none);
					}
				case 'InputChangedNativeMulti':
					var orderedItems = msg.a;
					var selectedIndices = msg.b;
					var getItem = F2(
						function (ix, acc) {
							return _Utils_ap(
								acc,
								function () {
									var _v4 = A2($elm_community$list_extra$List$Extra$getAt, ix, orderedItems);
									if (_v4.$ === 'Just') {
										var i = _v4.a;
										return _List_fromArray(
											[
												$elm$core$Maybe$Just(
												$Confidenceman02$elm_select$Select$unwrapItem(i))
											]);
									} else {
										return _List_fromArray(
											[$elm$core$Maybe$Nothing]);
									}
								}());
						});
					var allSelected = A2(
						$elm$core$List$filterMap,
						$elm$core$Basics$identity,
						A3($elm$core$List$foldl, getItem, _List_Nil, selectedIndices));
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$SelectBatch(allSelected)),
						$Confidenceman02$elm_select$Select$State(state_),
						$elm$core$Platform$Cmd$none);
				case 'EnterSelect':
					var menuItem = msg.a;
					var _v5 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v5.b.a;
					var cmdWithClosedMenu = _v5.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(
								$Confidenceman02$elm_select$Select$unwrapItem(menuItem))),
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								stateWithClosedMenu,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing})),
						cmdWithClosedMenu);
				case 'EnterSelectMulti':
					var menuItem = msg.a;
					var _v6 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v6.b.a;
					var cmdWithClosedMenu = _v6.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(
								$Confidenceman02$elm_select$Select$unwrapItem(menuItem))),
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								stateWithClosedMenu,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing})),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									cmdWithClosedMenu,
									A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
								])));
				case 'HoverFocused':
					var i = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{activeTargetIndex: i})),
						$elm$core$Platform$Cmd$none);
				case 'InputChanged':
					var inputValue = msg.a;
					var _v7 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$OpenMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithOpenMenu = _v7.b.a;
					var cmdWithOpenMenu = _v7.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$InputChange(inputValue)),
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								stateWithOpenMenu,
								{
									inputValue: $elm$core$Maybe$Just(inputValue)
								})),
						cmdWithOpenMenu);
				case 'InputReceivedFocused':
					var variant = msg.a;
					var _v8 = function () {
						if (variant.$ === 'CustomVariant') {
							var _v10 = state_.headlessEvent;
							if ((_v10.$ === 'Just') && (_v10.a.$ === 'FocusingInputH')) {
								var _v11 = _v10.a;
								return _Utils_Tuple2(
									$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$FocusSet),
									_Utils_update(
										state_,
										{
											controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput),
											headlessEvent: $elm$core$Maybe$Nothing,
											initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown,
											menuOpen: true
										}));
							} else {
								return _Utils_Tuple2(
									$elm$core$Maybe$Nothing,
									_Utils_update(
										state_,
										{
											controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput)
										}));
							}
						} else {
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								_Utils_update(
									state_,
									{
										controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput)
									}));
						}
					}();
					var action = _v8.a;
					var updatedState = _v8.b;
					return _Utils_Tuple3(
						action,
						$Confidenceman02$elm_select$Select$State(updatedState),
						$elm$core$Platform$Cmd$none);
				case 'SelectedItem':
					var item = msg.a;
					var _v12 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v12.b.a;
					var cmdWithClosedMenu = _v12.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(item)),
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								stateWithClosedMenu,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing})),
						cmdWithClosedMenu);
				case 'SelectedItemMulti':
					var item = msg.a;
					var _v13 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v13.b.a;
					var cmdWithClosedMenu = _v13.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(item)),
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								stateWithClosedMenu,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing})),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									cmdWithClosedMenu,
									A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
								])));
				case 'DeselectedMultiItem':
					var deselectedItem = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Deselect(
								_List_fromArray(
									[deselectedItem]))),
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown})),
						A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
				case 'OnInputFocused':
					var focusResult = msg.a;
					if (focusResult.$ === 'Ok') {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown})),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple3($elm$core$Maybe$Nothing, wrappedState, $elm$core$Platform$Cmd$none);
					}
				case 'OnMenuClearableFocus':
					var focusResult = msg.a;
					if (focusResult.$ === 'Ok') {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{
										controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$Clearable),
										headlessEvent: $elm$core$Maybe$Nothing,
										initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown
									})),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{headlessEvent: $elm$core$Maybe$Nothing})),
							$elm$core$Platform$Cmd$none);
					}
				case 'FocusMenuViewport':
					if (msg.a.$ === 'Ok') {
						var _v16 = msg.a.a;
						var menuListElem = _v16.a;
						var menuItemElem = _v16.b;
						var _v17 = A5(
							$Confidenceman02$elm_select$Select$setMenuViewportPosition,
							state_.selectId,
							state_.menuListScrollTop,
							menuListElem,
							menuItemElem,
							A2($Confidenceman02$elm_select$Select$menuItemOrientationInViewport, menuListElem, menuItemElem));
						var viewportFocusCmd = _v17.a;
						var newViewportY = _v17.b;
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{
										menuListScrollTop: newViewportY,
										menuViewportFocusNodes: $elm$core$Maybe$Just(
											_Utils_Tuple2(menuListElem, menuItemElem))
									})),
							viewportFocusCmd);
					} else {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{menuViewportFocusNodes: $elm$core$Maybe$Nothing})),
							$elm$core$Platform$Cmd$none);
					}
				case 'DoNothing':
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(state_),
						$elm$core$Platform$Cmd$none);
				case 'OnInputBlurred':
					var variant = msg.a;
					var resolveAction = function () {
						var _v24 = state_.inputValue;
						if (_v24.$ === 'Just') {
							if (_v24.a === '') {
								return $elm$core$Maybe$Nothing;
							} else {
								return $elm$core$Maybe$Just(
									$Confidenceman02$elm_select$Select$InputChange(''));
							}
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}();
					var _v18 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v18.b.a;
					var cmdWithClosedMenu = _v18.c;
					var _v19 = function () {
						var _v20 = state_.initialAction;
						switch (_v20.$) {
							case 'ContainerMousedown':
								if ((variant.$ === 'CustomVariant') && (variant.a.$ === 'SingleMenu')) {
									return _Utils_Tuple3(
										_Utils_update(
											stateWithClosedMenu,
											{controlUiFocused: $elm$core$Maybe$Nothing, initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[cmdWithClosedMenu, $elm$core$Platform$Cmd$none])),
										resolveAction);
								} else {
									return _Utils_Tuple3(
										_Utils_update(
											state_,
											{inputValue: $elm$core$Maybe$Nothing}),
										$elm$core$Platform$Cmd$none,
										resolveAction);
								}
							case 'MultiItemMousedown':
								return _Utils_Tuple3(state_, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
							default:
								return _Utils_Tuple3(
									_Utils_update(
										stateWithClosedMenu,
										{activeTargetIndex: 0, controlUiFocused: $elm$core$Maybe$Nothing, initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, inputValue: $elm$core$Maybe$Nothing}),
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[cmdWithClosedMenu, $elm$core$Platform$Cmd$none])),
									resolveAction);
						}
					}();
					var updatedState = _v19.a;
					var updatedCmds = _v19.b;
					var action = _v19.c;
					var _v22 = state_.headlessEvent;
					if ((_v22.$ === 'Just') && (_v22.a.$ === 'FocusingClearableH')) {
						var _v23 = _v22.a;
						return _Utils_Tuple3($elm$core$Maybe$Nothing, wrappedState, $elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple3(
							action,
							$Confidenceman02$elm_select$Select$State(updatedState),
							updatedCmds);
					}
				case 'OnMenuInputTabbed':
					var clearButtonVisible = msg.a;
					if (clearButtonVisible) {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{
										headlessEvent: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$FocusingClearableH)
									})),
							A2(
								$Confidenceman02$elm_select$Select$internalFocus,
								$Confidenceman02$elm_select$Select$clearableId(state_.selectId),
								$Confidenceman02$elm_select$Select$OnMenuClearableFocus));
					} else {
						var $temp$msg = $Confidenceman02$elm_select$Select$CloseMenu,
							$temp$wrappedState = wrappedState;
						msg = $temp$msg;
						wrappedState = $temp$wrappedState;
						continue update;
					}
				case 'OnMenuClearableShiftTabbed':
					var shiftKey = msg.a;
					if (shiftKey) {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							$Confidenceman02$elm_select$Select$State(
								_Utils_update(
									state_,
									{
										headlessEvent: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$FocusingInputH)
									})),
							A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
					} else {
						var $temp$msg = $Confidenceman02$elm_select$Select$CloseMenu,
							$temp$wrappedState = wrappedState;
						msg = $temp$msg;
						wrappedState = $temp$wrappedState;
						continue update;
					}
				case 'OnMenuClearableBlurred':
					var _v25 = state_.initialAction;
					if (_v25.$ === 'NothingMousedown') {
						var _v26 = state_.headlessEvent;
						if ((_v26.$ === 'Just') && (_v26.a.$ === 'FocusingInputH')) {
							var _v27 = _v26.a;
							return _Utils_Tuple3($elm$core$Maybe$Nothing, wrappedState, $elm$core$Platform$Cmd$none);
						} else {
							var $temp$msg = $Confidenceman02$elm_select$Select$CloseMenu,
								$temp$wrappedState = wrappedState;
							msg = $temp$msg;
							wrappedState = $temp$wrappedState;
							continue update;
						}
					} else {
						return _Utils_Tuple3($elm$core$Maybe$Nothing, wrappedState, $elm$core$Platform$Cmd$none);
					}
				case 'MenuItemClickFocus':
					var i = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{
									initialAction: $Confidenceman02$elm_select$Select$Internal$MenuItemMousedown(i)
								})),
						$elm$core$Platform$Cmd$none);
				case 'MultiItemMousedown':
					var index = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{
									initialAction: $Confidenceman02$elm_select$Select$Internal$MultiItemMousedown(index)
								})),
						$elm$core$Platform$Cmd$none);
				case 'InputMousedowned':
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown})),
						$elm$core$Platform$Cmd$none);
				case 'InputEscape':
					var resolveAction = function () {
						var _v29 = state_.inputValue;
						if (_v29.$ === 'Just') {
							if (_v29.a === '') {
								return $elm$core$Maybe$Nothing;
							} else {
								return $elm$core$Maybe$Just(
									$Confidenceman02$elm_select$Select$InputChange(''));
							}
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}();
					var _v28 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v28.b.a;
					var cmdWithClosedMenu = _v28.c;
					return _Utils_Tuple3(
						resolveAction,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								stateWithClosedMenu,
								{inputValue: $elm$core$Maybe$Nothing})),
						cmdWithClosedMenu);
				case 'ClearFocusedItem':
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown})),
						$elm$core$Platform$Cmd$none);
				case 'SearchableSelectContainerClicked':
					var variant = msg.a;
					var _v30 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$OpenMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithOpenMenu = _v30.b.a;
					var cmdWithOpenMenu = _v30.c;
					var _v31 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v31.b.a;
					var cmdWithClosedMenu = _v31.c;
					var _v32 = function () {
						var _v33 = state_.initialAction;
						switch (_v33.$) {
							case 'MultiItemMousedown':
								var _v34 = state_.controlUiFocused;
								if (_v34.$ === 'Just') {
									if (_v34.a.$ === 'ControlInput') {
										var _v35 = _v34.a;
										return _Utils_Tuple2(state_, $elm$core$Platform$Cmd$none);
									} else {
										var _v36 = _v34.a;
										return _Utils_Tuple2(state_, $elm$core$Platform$Cmd$none);
									}
								} else {
									return _Utils_Tuple2(
										state_,
										A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
								}
							case 'NothingMousedown':
								if (state_.menuOpen) {
									if (variant.$ === 'SingleMenu') {
										return (state_.keepOpen && _Utils_eq(state_.controlUiFocused, $elm$core$Maybe$Nothing)) ? _Utils_Tuple2(
											_Utils_update(
												state_,
												{initialAction: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
											A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)) : _Utils_Tuple2(
											_Utils_update(
												state_,
												{initialAction: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
											$elm$core$Platform$Cmd$none);
									} else {
										return _Utils_Tuple2(
											_Utils_update(
												stateWithClosedMenu,
												{initialAction: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
											$elm$core$Platform$Cmd$batch(
												_List_fromArray(
													[
														cmdWithClosedMenu,
														A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
													])));
									}
								} else {
									return _Utils_Tuple2(
										_Utils_update(
											stateWithOpenMenu,
											{initialAction: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													cmdWithOpenMenu,
													A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
												])));
								}
							case 'ContainerMousedown':
								if (variant.$ === 'SingleMenu') {
									return _Utils_Tuple2(
										_Utils_update(
											state_,
											{initialAction: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
										$elm$core$Platform$Cmd$none);
								} else {
									return state_.menuOpen ? _Utils_Tuple2(
										_Utils_update(
											stateWithClosedMenu,
											{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													cmdWithClosedMenu,
													A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
												]))) : _Utils_Tuple2(
										_Utils_update(
											stateWithOpenMenu,
											{initialAction: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													cmdWithOpenMenu,
													A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
												])));
								}
							default:
								return state_.menuOpen ? _Utils_Tuple2(
									stateWithClosedMenu,
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												cmdWithClosedMenu,
												A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
											]))) : _Utils_Tuple2(
									stateWithOpenMenu,
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												cmdWithOpenMenu,
												A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
											])));
						}
					}();
					var updatedState = _v32.a;
					var updatedCmds = _v32.b;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								updatedState,
								{
									controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput)
								})),
						updatedCmds);
				case 'UnsearchableSelectContainerClicked':
					var focusCmd = function () {
						var _v41 = state_.controlUiFocused;
						if ((_v41.$ === 'Just') && (_v41.a.$ === 'ControlInput')) {
							var _v42 = _v41.a;
							return $elm$core$Platform$Cmd$none;
						} else {
							return A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused);
						}
					}();
					var _v39 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$OpenMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithOpenMenu = _v39.b.a;
					var _v40 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v40.b.a;
					var updatedState = state_.menuOpen ? stateWithClosedMenu : stateWithOpenMenu;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								updatedState,
								{
									controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput)
								})),
						focusCmd);
				case 'ToggleMenuAtKey':
					var _v43 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$OpenMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithOpenMenu = _v43.b.a;
					var cmdWithOpenMenu = _v43.c;
					var _v44 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$CloseMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithClosedMenu = _v44.b.a;
					var cmdWithClosedMenu = _v44.c;
					var _v45 = state_.menuOpen ? _Utils_Tuple2(stateWithClosedMenu, cmdWithClosedMenu) : _Utils_Tuple2(stateWithOpenMenu, cmdWithOpenMenu);
					var updatedState = _v45.a;
					var updatedCmd = _v45.b;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								updatedState,
								{
									controlUiFocused: $elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput)
								})),
						updatedCmd);
				case 'KeyboardDown':
					var totalTargetCount = msg.a;
					var nextActiveTargetIndex = A3($Confidenceman02$elm_select$Select$Internal$calculateNextActiveTarget, state_.activeTargetIndex, totalTargetCount, $Confidenceman02$elm_select$Select$Internal$Down);
					var nodeQueryForViewportFocus = A2($Confidenceman02$elm_select$Select$Internal$shouldQueryNextTargetElement, nextActiveTargetIndex, state_.activeTargetIndex) ? A2($Confidenceman02$elm_select$Select$queryNodesForViewportFocus, state_.selectId, nextActiveTargetIndex) : $elm$core$Platform$Cmd$none;
					var _v46 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$OpenMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithOpenMenu = _v46.b.a;
					var cmdWithOpenMenu = _v46.c;
					var _v47 = state_.menuOpen ? _Utils_Tuple2(
						_Utils_update(
							state_,
							{activeTargetIndex: nextActiveTargetIndex, menuNavigation: $Confidenceman02$elm_select$Select$Keyboard}),
						nodeQueryForViewportFocus) : _Utils_Tuple2(
						_Utils_update(
							stateWithOpenMenu,
							{menuNavigation: $Confidenceman02$elm_select$Select$Keyboard}),
						cmdWithOpenMenu);
					var updatedState = _v47.a;
					var updatedCmd = _v47.b;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(updatedState),
						updatedCmd);
				case 'KeyboardUp':
					var totalTargetCount = msg.a;
					var nextActiveTargetIndex = A3($Confidenceman02$elm_select$Select$Internal$calculateNextActiveTarget, state_.activeTargetIndex, totalTargetCount, $Confidenceman02$elm_select$Select$Internal$Up);
					var nodeQueryForViewportFocus = A2($Confidenceman02$elm_select$Select$Internal$shouldQueryNextTargetElement, nextActiveTargetIndex, state_.activeTargetIndex) ? A2($Confidenceman02$elm_select$Select$queryNodesForViewportFocus, state_.selectId, nextActiveTargetIndex) : $elm$core$Platform$Cmd$none;
					var _v48 = A2(
						$Confidenceman02$elm_select$Select$update,
						$Confidenceman02$elm_select$Select$OpenMenu,
						$Confidenceman02$elm_select$Select$State(state_));
					var stateWithOpenMenu = _v48.b.a;
					var cmdWithOpenMenu = _v48.c;
					var _v49 = state_.menuOpen ? _Utils_Tuple2(
						_Utils_update(
							state_,
							{activeTargetIndex: nextActiveTargetIndex, menuNavigation: $Confidenceman02$elm_select$Select$Keyboard}),
						nodeQueryForViewportFocus) : _Utils_Tuple2(
						_Utils_update(
							stateWithOpenMenu,
							{activeTargetIndex: nextActiveTargetIndex, menuNavigation: $Confidenceman02$elm_select$Select$Keyboard}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[cmdWithOpenMenu, nodeQueryForViewportFocus])));
					var updatedState = _v49.a;
					var updatedCmd = _v49.b;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(updatedState),
						updatedCmd);
				case 'OpenMenu':
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{activeTargetIndex: 0, menuOpen: true})),
						$elm$core$Platform$Cmd$none);
				case 'CloseMenu':
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						state_.keepOpen ? $Confidenceman02$elm_select$Select$State(state_) : $Confidenceman02$elm_select$Select$resetState(
							$Confidenceman02$elm_select$Select$State(state_)),
						$elm$core$Platform$Cmd$none);
				case 'MenuListScrollTop':
					var position = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{menuListScrollTop: position})),
						$elm$core$Platform$Cmd$none);
				case 'SetMouseMenuNavigation':
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						$Confidenceman02$elm_select$Select$State(
							_Utils_update(
								state_,
								{menuNavigation: $Confidenceman02$elm_select$Select$Mouse})),
						$elm$core$Platform$Cmd$none);
				case 'ClearButtonMouseDowned':
					var variant = msg.a;
					_v50$2:
					while (true) {
						if (variant.$ === 'CustomVariant') {
							switch (variant.a.$) {
								case 'SingleMenu':
									return _Utils_Tuple3(
										$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
										$Confidenceman02$elm_select$Select$State(
											_Utils_update(
												state_,
												{inputValue: $elm$core$Maybe$Nothing})),
										$elm$core$Platform$Cmd$none);
								case 'Multi':
									return _Utils_Tuple3(
										$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
										$Confidenceman02$elm_select$Select$State(state_),
										A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
								default:
									break _v50$2;
							}
						} else {
							break _v50$2;
						}
					}
					return _Utils_Tuple3(
						$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
						$Confidenceman02$elm_select$Select$State(state_),
						$elm$core$Platform$Cmd$none);
				default:
					var variant = msg.a;
					_v51$2:
					while (true) {
						if (variant.$ === 'CustomVariant') {
							switch (variant.a.$) {
								case 'SingleMenu':
									return _Utils_Tuple3(
										$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
										$Confidenceman02$elm_select$Select$State(
											_Utils_update(
												state_,
												{inputValue: $elm$core$Maybe$Nothing})),
										A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
								case 'Multi':
									var selectedItems = variant.a.a;
									return _Utils_Tuple3(
										$elm$core$Maybe$Just(
											$Confidenceman02$elm_select$Select$Deselect(
												A2($elm$core$List$map, $Confidenceman02$elm_select$Select$unwrapItem, selectedItems))),
										$Confidenceman02$elm_select$Select$State(
											_Utils_update(
												state_,
												{inputValue: $elm$core$Maybe$Nothing})),
										A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
								default:
									break _v51$2;
							}
						} else {
							break _v51$2;
						}
					}
					return _Utils_Tuple3(
						$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
						$Confidenceman02$elm_select$Select$State(state_),
						A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
			}
		}
	});
var $author$project$Main$vegaLite = _Platform_outgoingPort('vegaLite', $elm$core$Basics$identity);
var $author$project$Main$update = F2(
	function (msg, model) {
		if (msg.$ === 'SelectSpecies') {
			var sm = msg.a;
			var _v1 = A2($Confidenceman02$elm_select$Select$update, sm, model.selectState);
			var maybeAction = _v1.a;
			var selectState = _v1.b;
			var cmds = _v1.c;
			var specMsg = function () {
				if ((maybeAction.$ === 'Just') && (maybeAction.a.$ === 'Select')) {
					var i = maybeAction.a.a;
					var _v7 = $author$project$Data$Species$stringToSpecies(i);
					if (_v7.$ === 'Nothing') {
						return $elm$core$Platform$Cmd$none;
					} else {
						var s = _v7.a;
						return $author$project$Main$vegaLite(
							A2($author$project$Main$specs, model.countyAggregation, s));
					}
				} else {
					return $elm$core$Platform$Cmd$none;
				}
			}();
			var updateSelectedItem = function () {
				_v4$3:
				while (true) {
					if (maybeAction.$ === 'Just') {
						switch (maybeAction.a.$) {
							case 'Select':
								var i = maybeAction.a.a;
								return $elm$core$Maybe$Just(i);
							case 'InputChange':
								var s = maybeAction.a.a;
								return $elm$core$Maybe$Just(s);
							case 'Clear':
								var _v5 = maybeAction.a;
								return $elm$core$Maybe$Nothing;
							default:
								break _v4$3;
						}
					} else {
						break _v4$3;
					}
				}
				return model.selectedItem;
			}();
			var updateSelectedSpecies = function () {
				_v2$2:
				while (true) {
					if (maybeAction.$ === 'Just') {
						switch (maybeAction.a.$) {
							case 'Select':
								var i = maybeAction.a.a;
								return $author$project$Data$Species$stringToSpecies(i);
							case 'Clear':
								var _v3 = maybeAction.a;
								return $elm$core$Maybe$Nothing;
							default:
								break _v2$2;
						}
					} else {
						break _v2$2;
					}
				}
				return model.selectedSpecies;
			}();
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{selectState: selectState, selectedItem: updateSelectedItem, selectedSpecies: updateSelectedSpecies}),
				A2(
					$elm$core$Platform$Cmd$map,
					$author$project$Main$SelectSpecies,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[specMsg, cmds]))));
		} else {
			var opt = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{countyAggregation: opt}),
				function () {
					var _v8 = model.selectedSpecies;
					if (_v8.$ === 'Nothing') {
						return $elm$core$Platform$Cmd$none;
					} else {
						var s = _v8.a;
						return $author$project$Main$vegaLite(
							A2($author$project$Main$specs, opt, s));
					}
				}());
		}
	});
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
var $Confidenceman02$elm_select$Select$Config = function (a) {
	return {$: 'Config', a: a};
};
var $Confidenceman02$elm_select$Select$clearable = F2(
	function (clear, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Config(
			_Utils_update(
				config,
				{clearable: clear}));
	});
var $author$project$Main$CountySwitch = function (a) {
	return {$: 'CountySwitch', a: a};
};
var $author$project$Data$County$Split = {$: 'Split'};
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = {$: 'AsColumn'};
var $mdgriffith$elm_ui$Internal$Model$asColumn = $mdgriffith$elm_ui$Internal$Model$AsColumn;
var $mdgriffith$elm_ui$Internal$Style$classes = {above: 'a', active: 'atv', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', alignedHorizontally: 'ah', alignedVertically: 'av', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'ctr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fcs', focusedWithin: 'focus-within', fullSize: 'fs', grid: 'g', hasBehind: 'hbh', heightContent: 'hc', heightExact: 'he', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', imageContainer: 'ic', inFront: 'fr', inputLabel: 'lbl', inputMultiline: 'iml', inputMultilineFiller: 'imlf', inputMultilineParent: 'imlp', inputMultilineWrapper: 'implw', inputText: 'it', italic: 'i', link: 'lnk', nearby: 'nb', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'ui', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sbt', single: 'e', sizeByCapital: 'cap', spaceEvenly: 'sev', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp', wrapped: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 'Generic'};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 'NoNearbyChildren'};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.column);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.grid);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.page);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.row);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 'AsColumn':
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 'AsEl':
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 'AsGrid':
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 'AsParagraph':
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsEl = {$: 'AsEl'};
var $mdgriffith$elm_ui$Internal$Model$asEl = $mdgriffith$elm_ui$Internal$Model$AsEl;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var $mdgriffith$elm_ui$Internal$Model$asParagraph = $mdgriffith$elm_ui$Internal$Model$AsParagraph;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 'Second', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 'PaddingStyle':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'BorderWidth':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.row) + ('-' + ($elm$core$String$fromInt(pos.col) + ('-' + ($elm$core$String$fromInt(pos.width) + ('-' + $elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector.$) {
					case 'Focus':
						return 'fs';
					case 'Hover':
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.blur) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.size) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.color))
				])));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 'AllChildren', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Internal$Style$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Internal$Style$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Internal$Style$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[$mdgriffith$elm_ui$Internal$Style$Top, $mdgriffith$elm_ui$Internal$Style$Bottom, $mdgriffith$elm_ui$Internal$Style$Right, $mdgriffith$elm_ui$Internal$Style$Left, $mdgriffith$elm_ui$Internal$Style$CenterX, $mdgriffith$elm_ui$Internal$Style$CenterY]);
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(
					$mdgriffith$elm_ui$Internal$Style$Content(alignment)),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.seButton),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment.$) {
				case 'Top':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 'Bottom':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 'Right':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 'Left':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 'CenterX':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Internal$Style$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Internal$Style$Below = {$: 'Below'};
var $mdgriffith$elm_ui$Internal$Style$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Internal$Style$OnRight = {$: 'OnRight'};
var $mdgriffith$elm_ui$Internal$Style$Within = {$: 'Within'};
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = $mdgriffith$elm_ui$Internal$Style$Above;
	var _v0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[$mdgriffith$elm_ui$Internal$Style$Above, $mdgriffith$elm_ui$Internal$Style$Below, $mdgriffith$elm_ui$Internal$Style$OnRight, $mdgriffith$elm_ui$Internal$Style$OnLeft, $mdgriffith$elm_ui$Internal$Style$Within, $mdgriffith$elm_ui$Internal$Style$Behind]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.imageContainer))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.root),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc.$) {
							case 'Above':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Below':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 'OnRight':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'OnLeft':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Within':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.wrapped),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorPointer),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.capturePointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transparent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.opaque),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transition),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbars),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clip),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderNone),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDashed),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDotted),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderSolid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.link),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 'Bottom':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 'Right':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 'Left':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 'CenterX':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.page),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Left)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Right)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textThin),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textNormalWeight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textMedium),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textSemiBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textHeavy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.italic),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textUnitalicized),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustify),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustifyAll),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textCenter),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textRight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLeft),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'AllChildren':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.props;
		if (!_v2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0.a;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.others)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.mode;
	switch (_v0.$) {
		case 'Layout':
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 'NoStaticStyleSheet':
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 'Serif':
			return 'serif';
		case 'SansSerif':
			return 'sans-serif';
		case 'Monospace':
			return 'monospace';
		case 'Typeface':
			var name = font.a;
			return '\"' + (name + '\"');
		case 'ImportFont':
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.name;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return name === 'smcp';
		case 'VariantOff':
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.variants);
	} else {
		return false;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 'Nothing') {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo.$) {
				case 'Hover':
					var _v2 = options.hover;
					switch (_v2.$) {
						case 'NoHover':
							return _List_Nil;
						case 'ForceHover':
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 'Focus':
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return '\"' + (name + '\"');
		case 'VariantOff':
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.variants)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 'Style':
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 'Shadows':
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 'Transparency':
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 'FontSize':
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 'FontFamily':
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 'Single':
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 'Colored':
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 'SpacingStyle':
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.single;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.row;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.wrapped + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.page;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.column;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.any;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 'PaddingStyle':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 'BorderWidth':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 'GridTemplateStyle':
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 'Px':
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 'Content':
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 'Nothing') {
										if (_v2.b.$ === 'Nothing') {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 'Nothing') {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Fill':
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 'Nothing') {
										if (_v7.b.$ === 'Nothing') {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 'Nothing') {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Min':
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.spacing.a);
				var ySpacing = toGridLength(template.spacing.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.rows)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.columns)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 'GridPosition':
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.row) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.height) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.col) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.width) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.row) + (' / ' + ($elm$core$String$fromInt(position.row + position.height) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.col) + (' / ' + ($elm$core$String$fromInt(position.col + position.width) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.row) + ('-' + ($elm$core$String$fromInt(position.col) + ('-' + ($elm$core$String$fromInt(position.width) + ('-' + $elm$core$String$fromInt(position.height)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 'PseudoSelector':
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((_v12.a.$ === 'Just') && (_v12.b.$ === 'Just')) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fullSize, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {height: height / size, size: size, vertical: vertical};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.capital, adjustment.baseline, adjustment.descender, adjustment.lowercase]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.descender,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.baseline,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.capital,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		capital: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		full: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.height)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.vertical) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.size) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 'Nothing') {
					if (face.$ === 'FontWith') {
						var _with = face.a;
						var _v2 = _with.adjustment;
						if (_v2.$ === 'Nothing') {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.full;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.capital;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 'ImportFont') {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 'FontFamily') {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					rules: _Utils_ap(
						rendered.rules,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					topLevel: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 'Nothing') {
							return rendered.topLevel;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.topLevel);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{rules: _List_Nil, topLevel: _List_Nil},
			stylesheet);
		var topLevel = _v0.topLevel;
		var rules = _v0.rules;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.mode;
		switch (_v0.$) {
			case 'Layout':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 'NoStaticStyleSheet':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return keyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return unkeyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A2(createNode, 'div', attributes);
				case 'NodeName':
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single))
									]))
							]));
			}
		}();
		switch (parentContext.$) {
			case 'AsRow':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthContent + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightContent)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFill + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightFill)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 'Keyed') {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children))),
						styles: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children))),
						styles: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 'ChildrenBehind', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 'ChildrenBehindAndInFront', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 'ChildrenInFront', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location.$) {
							case 'Above':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.above]));
							case 'Below':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.below]));
							case 'OnRight':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onRight]));
							case 'OnLeft':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onLeft]));
							case 'InFront':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.inFront]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.behind]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 'Empty':
							return $elm$virtual_dom$VirtualDom$text('');
						case 'Text':
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 'Unstyled':
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 'NoNearbyChildren':
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenBehind':
				var existingBehind = existing.a;
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenInFront':
				var existingInFront = existing.a;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'Right':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 'FullTransform', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 'Moved', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 'Untransformed':
				switch (component.$) {
					case 'MoveX':
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 'MoveY':
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 'MoveZ':
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 'Moved':
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 'MoveY':
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 'MoveZ':
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 'MoveY':
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 'MoveZ':
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 'MoveXYZ':
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 'Rotate':
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 'Px':
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightContent,
				_List_Nil);
		case 'Fill':
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 'Px':
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthContent,
				_List_Nil);
		case 'Fill':
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $elm$core$Basics$ge = _Utils_ge;
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 'Single') {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 'FontSize':
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 'PaddingStyle':
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 'Nothing') {
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: styles
					};
				} else {
					var _class = _v1.a;
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 'NoAttribute':
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Class':
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 'Attr':
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'StyleClass':
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 'TransformComponent':
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Width':
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 'Px':
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthContent),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Height':
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 'Px':
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightContent + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightFill + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Describe':
						var description = attribute.a;
						switch (description.$) {
							case 'Main':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Navigation':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'ContentInfo':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Complementary':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Heading':
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 'Paragraph':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Button':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Label':
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'LivePolite':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 'Nearby':
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 'Empty':
									return styles;
								case 'Text':
									var str = elem.a;
									return styles;
								case 'Unstyled':
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.styles);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'AlignX':
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x.$) {
									case 'CenterX':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 'Right':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y.$) {
									case 'CenterY':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 'Bottom':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 'Untransformed'};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 'Content'};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentTop + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentLeft)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 'Label', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Element$Input$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Element$Input$labelLeft = $mdgriffith$elm_ui$Element$Input$Label($mdgriffith$elm_ui$Element$Input$OnLeft);
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 'OnlyDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 'StaticRootAndDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = {$: 'AllowHover'};
var $mdgriffith$elm_ui$Internal$Model$Layout = {$: 'Layout'};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	backgroundColor: $elm$core$Maybe$Nothing,
	borderColor: $elm$core$Maybe$Nothing,
	shadow: $elm$core$Maybe$Just(
		{
			blur: 0,
			color: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _v4 = record.hover;
					if (_v4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _v5 = record.focus;
					if (_v5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.mode;
					if (_v6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _v0 = record.focus;
				if (_v0.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _v1 = record.hover;
				if (_v1.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$AllowHover;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _v2 = record.mode;
				if (_v2.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$Layout;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{focus: $elm$core$Maybe$Nothing, hover: $elm$core$Maybe$Nothing, mode: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.mode;
			if (_v0.$ === 'NoStaticStyleSheet') {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 'SansSerif'};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 'ImportFont':
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.name;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.options;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.root, $mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{options: _List_Nil});
var $mdgriffith$elm_ui$Element$Input$Option = F2(
	function (a, b) {
		return {$: 'Option', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$Left);
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 'Empty'};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Model$AsRow = {$: 'AsRow'};
var $mdgriffith$elm_ui$Internal$Model$asRow = $mdgriffith$elm_ui$Internal$Model$AsRow;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 'SpacingStyle', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 'BorderWidth', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $mdgriffith$elm_ui$Element$Input$defaultRadioOption = F2(
	function (optionLabel, status) {
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$alignLeft,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$px(14)),
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$px(14)),
							$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
							$mdgriffith$elm_ui$Element$Border$rounded(7),
							function () {
							if (status.$ === 'Selected') {
								return $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
							} else {
								return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
							}
						}(),
							$mdgriffith$elm_ui$Element$Border$width(
							function () {
								switch (status.$) {
									case 'Idle':
										return 1;
									case 'Focused':
										return 1;
									default:
										return 5;
								}
							}()),
							$mdgriffith$elm_ui$Element$Border$color(
							function () {
								switch (status.$) {
									case 'Idle':
										return A3($mdgriffith$elm_ui$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									case 'Focused':
										return A3($mdgriffith$elm_ui$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									default:
										return A3($mdgriffith$elm_ui$Element$rgb, 59 / 255, 153 / 255, 252 / 255);
								}
							}())
						]),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Internal$Model$htmlClass('unfocusable')
						]),
					optionLabel)
				]));
	});
var $mdgriffith$elm_ui$Element$Input$option = F2(
	function (val, txt) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$Option,
			val,
			$mdgriffith$elm_ui$Element$Input$defaultRadioOption(txt));
	});
var $mdgriffith$elm_ui$Element$Input$Row = {$: 'Row'};
var $mdgriffith$elm_ui$Element$Input$AfterFound = {$: 'AfterFound'};
var $mdgriffith$elm_ui$Element$Input$BeforeFound = {$: 'BeforeFound'};
var $mdgriffith$elm_ui$Element$Input$Idle = {$: 'Idle'};
var $mdgriffith$elm_ui$Element$Input$NotFound = {$: 'NotFound'};
var $mdgriffith$elm_ui$Element$Input$Selected = {$: 'Selected'};
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 'LivePolite'};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 'HiddenLabel') {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position.$) {
				case 'Above':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 'Below':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 'OnRight':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Element$Input$column = F2(
	function (attributes, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					attributes)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Input$downArrow = 'ArrowDown';
var $mdgriffith$elm_ui$Internal$Model$filter = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (x, _v0) {
				var found = _v0.a;
				var has = _v0.b;
				switch (x.$) {
					case 'NoAttribute':
						return _Utils_Tuple2(found, has);
					case 'Class':
						var key = x.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'Attr':
						var attr = x.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'StyleClass':
						var style = x.b;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'Width':
						var width = x.a;
						return A2($elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'width', has));
					case 'Height':
						var height = x.a;
						return A2($elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'height', has));
					case 'Describe':
						var description = x.a;
						return A2($elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'described', has));
					case 'Nearby':
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'AlignX':
						return A2($elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'align-x', has));
					case 'AlignY':
						return A2($elm$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'align-y', has));
					default:
						return A2($elm$core$Set$member, 'transform', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'transform', has));
				}
			}),
		_Utils_Tuple2(_List_Nil, $elm$core$Set$empty),
		attrs).a;
};
var $mdgriffith$elm_ui$Internal$Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? A2($elm$core$List$cons, x, found) : found;
				}),
			_List_Nil,
			$mdgriffith$elm_ui$Internal$Model$filter(attrs));
	});
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 'Label', a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 'HiddenLabel') {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Element$Input$leftArrow = 'ArrowLeft';
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorPointer);
var $mdgriffith$elm_ui$Element$Input$rightArrow = 'ArrowRight';
var $mdgriffith$elm_ui$Element$Input$row = F2(
	function (attributes, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				attributes),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$tabindex = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$tabindex);
var $mdgriffith$elm_ui$Element$Input$upArrow = 'ArrowUp';
var $mdgriffith$elm_ui$Element$Input$radioHelper = F3(
	function (orientation, attrs, input) {
		var track = F2(
			function (opt, _v14) {
				var found = _v14.a;
				var prev = _v14.b;
				var nxt = _v14.c;
				var val = opt.a;
				switch (found.$) {
					case 'NotFound':
						return _Utils_eq(
							$elm$core$Maybe$Just(val),
							input.selected) ? _Utils_Tuple3($mdgriffith$elm_ui$Element$Input$BeforeFound, prev, nxt) : _Utils_Tuple3(found, val, nxt);
					case 'BeforeFound':
						return _Utils_Tuple3($mdgriffith$elm_ui$Element$Input$AfterFound, prev, val);
					default:
						return _Utils_Tuple3(found, prev, nxt);
				}
			});
		var renderOption = function (_v11) {
			var val = _v11.a;
			var view = _v11.b;
			var status = _Utils_eq(
				$elm$core$Maybe$Just(val),
				input.selected) ? $mdgriffith$elm_ui$Element$Input$Selected : $mdgriffith$elm_ui$Element$Input$Idle;
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$pointer,
						function () {
						if (orientation.$ === 'Row') {
							return $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink);
						} else {
							return $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill);
						}
					}(),
						$mdgriffith$elm_ui$Element$Events$onClick(
						input.onChange(val)),
						function () {
						if (status.$ === 'Selected') {
							return $mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'aria-checked', 'true'));
						} else {
							return $mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'aria-checked', 'false'));
						}
					}(),
						$mdgriffith$elm_ui$Internal$Model$Attr(
						A2($elm$html$Html$Attributes$attribute, 'role', 'radio'))
					]),
				view(status));
		};
		var prevNext = function () {
			var _v5 = input.options;
			if (!_v5.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var _v6 = _v5.a;
				var val = _v6.a;
				return function (_v7) {
					var found = _v7.a;
					var b = _v7.b;
					var a = _v7.c;
					switch (found.$) {
						case 'NotFound':
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						case 'BeforeFound':
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						default:
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, a));
					}
				}(
					A3(
						$elm$core$List$foldl,
						track,
						_Utils_Tuple3($mdgriffith$elm_ui$Element$Input$NotFound, val, val),
						input.options));
			}
		}();
		var optionArea = function () {
			if (orientation.$ === 'Row') {
				return A2(
					$mdgriffith$elm_ui$Element$Input$row,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.label),
						attrs),
					A2($elm$core$List$map, renderOption, input.options));
			} else {
				return A2(
					$mdgriffith$elm_ui$Element$Input$column,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.label),
						attrs),
					A2($elm$core$List$map, renderOption, input.options));
			}
		}();
		var events = A2(
			$mdgriffith$elm_ui$Internal$Model$get,
			attrs,
			function (attr) {
				_v3$3:
				while (true) {
					switch (attr.$) {
						case 'Width':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _v3$3;
							}
						case 'Height':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _v3$3;
							}
						case 'Attr':
							return true;
						default:
							break _v3$3;
					}
				}
				return false;
			});
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$elm$core$Maybe$Just($mdgriffith$elm_ui$Element$alignLeft),
							$elm$core$Maybe$Just(
							$mdgriffith$elm_ui$Element$Input$tabindex(0)),
							$elm$core$Maybe$Just(
							$mdgriffith$elm_ui$Internal$Model$htmlClass('focus')),
							$elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Region$announce),
							$elm$core$Maybe$Just(
							$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'role', 'radiogroup'))),
							function () {
							if (prevNext.$ === 'Nothing') {
								return $elm$core$Maybe$Nothing;
							} else {
								var _v1 = prevNext.a;
								var prev = _v1.a;
								var next = _v1.b;
								return $elm$core$Maybe$Just(
									$mdgriffith$elm_ui$Element$Input$onKeyLookup(
										function (code) {
											if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$leftArrow)) {
												return $elm$core$Maybe$Just(
													input.onChange(prev));
											} else {
												if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$upArrow)) {
													return $elm$core$Maybe$Just(
														input.onChange(prev));
												} else {
													if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$rightArrow)) {
														return $elm$core$Maybe$Just(
															input.onChange(next));
													} else {
														if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$downArrow)) {
															return $elm$core$Maybe$Just(
																input.onChange(next));
														} else {
															if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space)) {
																var _v2 = input.selected;
																if (_v2.$ === 'Nothing') {
																	return $elm$core$Maybe$Just(
																		input.onChange(prev));
																} else {
																	return $elm$core$Maybe$Nothing;
																}
															} else {
																return $elm$core$Maybe$Nothing;
															}
														}
													}
												}
											}
										}));
							}
						}()
						])),
				events),
			input.label,
			optionArea);
	});
var $mdgriffith$elm_ui$Element$Input$radioRow = $mdgriffith$elm_ui$Element$Input$radioHelper($mdgriffith$elm_ui$Element$Input$Row);
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Main$countyRadio = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_Nil,
		A2(
			$mdgriffith$elm_ui$Element$column,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$Input$radioRow,
					_List_Nil,
					{
						label: A2(
							$mdgriffith$elm_ui$Element$Input$labelLeft,
							_List_Nil,
							$mdgriffith$elm_ui$Element$text('Counties:')),
						onChange: $author$project$Main$CountySwitch,
						options: _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$Input$option,
								$author$project$Data$County$Combined,
								$mdgriffith$elm_ui$Element$text('Combined')),
								A2(
								$mdgriffith$elm_ui$Element$Input$option,
								$author$project$Data$County$Split,
								$mdgriffith$elm_ui$Element$text('Split'))
							]),
						selected: $elm$core$Maybe$Just(model.countyAggregation)
					})
				])));
};
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactDeclarations = function (declarations) {
	var _v0 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v0.a;
	var compactedDeclarations = _v0.b;
	return A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
};
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return {
		charset: charset,
		declarations: $rtfeldman$elm_css$Css$Structure$compactDeclarations(declarations),
		imports: imports,
		namespaces: namespaces
	};
};
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $rtfeldman$elm_css$Css$String$mapJoinHelp = F4(
	function (map, sep, strs, result) {
		mapJoinHelp:
		while (true) {
			if (!strs.b) {
				return result;
			} else {
				if (!strs.b.b) {
					var first = strs.a;
					return result + (map(first) + '');
				} else {
					var first = strs.a;
					var rest = strs.b;
					var $temp$map = map,
						$temp$sep = sep,
						$temp$strs = rest,
						$temp$result = result + (map(first) + (sep + ''));
					map = $temp$map;
					sep = $temp$sep;
					strs = $temp$strs;
					result = $temp$result;
					continue mapJoinHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$Css$String$mapJoin = F3(
	function (map, sep, strs) {
		return A4($rtfeldman$elm_css$Css$String$mapJoinHelp, map, sep, strs, '');
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, ' and ', expressions);
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
		'\n',
		mediaQueries);
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		function (_v0) {
			var prop = _v0.a;
			return prop + ';';
		},
		'',
		properties);
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors);
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return $rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator) + (' ' + $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement));
	return A2(
		$elm$core$String$append,
		A2($elm$core$String$join, ' ', segments),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = function (_v0) {
	var firstSelector = _v0.a;
	var otherSelectors = _v0.b;
	var properties = _v0.c;
	var selectorStr = A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
		',',
		A2($elm$core$List$cons, firstSelector, otherSelectors));
	return selectorStr + ('{' + ($rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties) + '}'));
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, ', ', mediaQueries);
			var blocks = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, '\n', styleBlocks);
			return '@media ' + (query + ('{' + (blocks + '}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + ('{' + (declaration + '}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return $rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$importToString, '\n', imports) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, '\n', namespaces) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, '\n', declarations) + '')));
};
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = function (a) {
	return {$: 'PageRule', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Property = function (a) {
	return {$: 'Property', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$PageRule(properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = $rtfeldman$elm_css$Css$Structure$Property('animation-name:' + name);
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$PageRule(properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$templateSelector = $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$ClassSelector($rtfeldman$elm_css$VirtualDom$Styled$classnameStandin)
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate = function (styles) {
	if (!styles.b) {
		return '';
	} else {
		var otherwise = styles;
		return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$VirtualDom$Styled$makeSnippet, styles, $rtfeldman$elm_css$VirtualDom$Styled$templateSelector)
					])));
	}
};
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classProperty = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, true, cssTemplate);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = $rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var $rtfeldman$elm_css$Html$Styled$fromUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
	function (a, b, c) {
		return {$: 'KeyedNode', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 'KeyedNodeNS', a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 'NodeNS', a: a, b: b, c: c, d: d};
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $rtfeldman$elm_css$VirtualDom$Styled$mapAttribute = F2(
	function (transform, _v0) {
		var prop = _v0.a;
		var isCssStyle = _v0.b;
		var cssTemplate = _v0.c;
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$mapAttribute, transform, prop),
			isCssStyle,
			cssTemplate);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$map = F2(
	function (transform, vdomNode) {
		switch (vdomNode.$) {
			case 'Node':
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					$rtfeldman$elm_css$VirtualDom$Styled$Node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 'NodeNS':
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					$rtfeldman$elm_css$VirtualDom$Styled$NodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 'KeyedNode':
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					$rtfeldman$elm_css$VirtualDom$Styled$KeyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						function (_v1) {
							var key = _v1.a;
							var child = _v1.b;
							return _Utils_Tuple2(
								key,
								A2($rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			case 'KeyedNodeNS':
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					$rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						function (_v2) {
							var key = _v2.a;
							var child = _v2.b;
							return _Utils_Tuple2(
								key,
								A2($rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			default:
				var vdom = vdomNode.a;
				return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
					A2($elm$virtual_dom$VirtualDom$map, transform, vdom));
		}
	});
var $rtfeldman$elm_css$Html$Styled$map = $rtfeldman$elm_css$VirtualDom$Styled$map;
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $rtfeldman$elm_css$Css$marginRight = $rtfeldman$elm_css$Css$prop1('margin-right');
var $rtfeldman$elm_css$Css$marginTop = $rtfeldman$elm_css$Css$prop1('margin-top');
var $Confidenceman02$elm_select$Select$menuItems = F2(
	function (items, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Config(
			_Utils_update(
				config,
				{menuItems: items}));
	});
var $rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PercentageUnits, '%');
var $Confidenceman02$elm_select$Select$placeholder = F2(
	function (plc, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Config(
			_Utils_update(
				config,
				{placeholder: plc}));
	});
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $Confidenceman02$elm_select$Select$searchable = F2(
	function (pred, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Config(
			_Utils_update(
				config,
				{searchable: pred}));
	});
var $Confidenceman02$elm_select$Select$CustomVariant = function (a) {
	return {$: 'CustomVariant', a: a};
};
var $Confidenceman02$elm_select$Select$Single = function (a) {
	return {$: 'Single', a: a};
};
var $Confidenceman02$elm_select$Select$Styles$Config = function (a) {
	return {$: 'Config', a: a};
};
var $Confidenceman02$elm_select$Select$Styles$ControlConfig = function (a) {
	return {$: 'ControlConfig', a: a};
};
var $rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2(
		$elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var $rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: $rtfeldman$elm_css$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $rtfeldman$elm_css$Css$validHex = F5(
	function (str, _v0, _v1, _v2, _v3) {
		var r1 = _v0.a;
		var r2 = _v0.b;
		var g1 = _v1.a;
		var g2 = _v1.b;
		var b1 = _v2.a;
		var b2 = _v2.b;
		var a1 = _v3.a;
		var a2 = _v3.b;
		var toResult = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$fromList,
			A2($elm$core$Basics$composeR, $elm$core$String$toLower, $rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _v5 = results.a;
			var red = _v5.a.a;
			var green = _v5.b.a;
			var _v6 = results.b;
			var blue = _v6.a.a;
			var alpha = _v6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: $rtfeldman$elm_css$Css$Structure$Compatible,
				green: green,
				red: red,
				value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return $rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var $rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	_v0$4:
	while (true) {
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			if (!_v0.b.b.b.b) {
				var r = _v0.a;
				var _v1 = _v0.b;
				var g = _v1.a;
				var _v2 = _v1.b;
				var b = _v2.a;
				return A5(
					$rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_v0.b.b.b.b.b) {
					var r = _v0.a;
					var _v3 = _v0.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var b = _v4.a;
					var _v5 = _v4.b;
					var a = _v5.a;
					return A5(
						$rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_v0.b.b.b.b.b.b) {
						if (!_v0.b.b.b.b.b.b.b) {
							var r1 = _v0.a;
							var _v6 = _v0.b;
							var r2 = _v6.a;
							var _v7 = _v6.b;
							var g1 = _v7.a;
							var _v8 = _v7.b;
							var g2 = _v8.a;
							var _v9 = _v8.b;
							var b1 = _v9.a;
							var _v10 = _v9.b;
							var b2 = _v10.a;
							return A5(
								$rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_v0.b.b.b.b.b.b.b.b && (!_v0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _v0.a;
								var _v11 = _v0.b;
								var r2 = _v11.a;
								var _v12 = _v11.b;
								var g1 = _v12.a;
								var _v13 = _v12.b;
								var g2 = _v13.a;
								var _v14 = _v13.b;
								var b1 = _v14.a;
								var _v15 = _v14.b;
								var b2 = _v15.a;
								var _v16 = _v15.b;
								var a1 = _v16.a;
								var _v17 = _v16.b;
								var a2 = _v17.a;
								return A5(
									$rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _v0$4;
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
		} else {
			break _v0$4;
		}
	}
	return $rtfeldman$elm_css$Css$erroneousHex(str);
};
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ',', args) + ')'));
	});
var $rtfeldman$elm_css$Css$rgb = F3(
	function (r, g, b) {
		return {
			alpha: 1,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgb',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					_List_fromArray(
						[r, g, b])))
		};
	});
var $Confidenceman02$elm_select$Select$Styles$defaultsControl = {
	backgroundColor: $rtfeldman$elm_css$Css$hex('#FFFFFF'),
	backgroundColorHover: $rtfeldman$elm_css$Css$hex('#F0F1F4'),
	borderColor: $rtfeldman$elm_css$Css$hex('#898BA9'),
	borderColorFocus: $rtfeldman$elm_css$Css$hex('#0168b3'),
	borderColorHover: $rtfeldman$elm_css$Css$hex('#4B4D68'),
	borderRadius: 7,
	clearIndicatorColor: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	clearIndicatorColorHover: A3($rtfeldman$elm_css$Css$rgb, 51, 51, 51),
	color: $rtfeldman$elm_css$Css$hex('#000000'),
	disabledOpacity: 0.3,
	dropdownIndicatorColor: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	dropdownIndicatorColorHover: A3($rtfeldman$elm_css$Css$rgb, 51, 51, 51),
	loadingIndicatorColor: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	minHeight: 48,
	multiTagBackgroundColor: $rtfeldman$elm_css$Css$hex('#E1E2EA'),
	multiTagBorderRadius: 16,
	multiTagColor: $rtfeldman$elm_css$Css$hex('#35374A'),
	multiTagDismissibleBackgroundColor: $rtfeldman$elm_css$Css$hex('#6B6E94'),
	multiTagDismissibleBackgroundColorHover: $rtfeldman$elm_css$Css$hex('#4B4D68'),
	multiTagTruncationWidth: $elm$core$Maybe$Nothing,
	placeholderOpacity: 0.5,
	selectedColor: $rtfeldman$elm_css$Css$hex('#35374A'),
	separatorColor: A3($rtfeldman$elm_css$Css$rgb, 204, 204, 204)
};
var $Confidenceman02$elm_select$Select$Styles$controlDefault = $Confidenceman02$elm_select$Select$Styles$ControlConfig($Confidenceman02$elm_select$Select$Styles$defaultsControl);
var $Confidenceman02$elm_select$Select$Styles$MenuConfig = function (a) {
	return {$: 'MenuConfig', a: a};
};
var $Confidenceman02$elm_select$Select$Styles$MenuControlConfig = function (a) {
	return {$: 'MenuControlConfig', a: a};
};
var $Confidenceman02$elm_select$Select$Styles$Px = function (a) {
	return {$: 'Px', a: a};
};
var $rtfeldman$elm_css$Css$absolute = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var $rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			alpha: alpha,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgba',
				_Utils_ap(
					A2(
						$elm$core$List$map,
						$elm$core$String$fromInt,
						_List_fromArray(
							[r, g, b])),
					_List_fromArray(
						[
							$elm$core$String$fromFloat(alpha)
						])))
		};
	});
var $Confidenceman02$elm_select$Select$Styles$defaultsMenu = {
	backgroundColor: $rtfeldman$elm_css$Css$hex('#FFFFFF'),
	borderRadius: 7,
	borderWidth: 6,
	boxShadowBlur: 12,
	boxShadowColor: A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.19),
	boxShadowHOffset: 0,
	boxShadowVOffset: 0,
	control: $Confidenceman02$elm_select$Select$Styles$MenuControlConfig(
		{
			backgroundColor: $rtfeldman$elm_css$Css$hex('#FFFFFF'),
			backgroundColorHover: $rtfeldman$elm_css$Css$hex('#F0F1F4'),
			borderColor: $rtfeldman$elm_css$Css$hex('#898BA9'),
			borderColorFocus: $rtfeldman$elm_css$Css$hex('#0168b3'),
			borderColorHover: $rtfeldman$elm_css$Css$hex('#4B4D68'),
			borderRadius: 7,
			clearIndicatorColor: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
			clearIndicatorColorHover: A3($rtfeldman$elm_css$Css$rgb, 51, 51, 51),
			color: $rtfeldman$elm_css$Css$hex('#000000'),
			disabledOpacity: 0.3,
			loadingIndicatorColor: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
			minHeight: 35,
			placeholderOpacity: 0.5,
			searchIndicatorColor: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102)
		}),
	dividerColor: A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.1),
	maxHeight: $Confidenceman02$elm_select$Select$Styles$Px(
		$rtfeldman$elm_css$Css$px(215)),
	position: $rtfeldman$elm_css$Css$absolute
};
var $Confidenceman02$elm_select$Select$Styles$menuDefault = $Confidenceman02$elm_select$Select$Styles$MenuConfig($Confidenceman02$elm_select$Select$Styles$defaultsMenu);
var $Confidenceman02$elm_select$Select$Styles$MenuItemConfig = function (a) {
	return {$: 'MenuItemConfig', a: a};
};
var $Confidenceman02$elm_select$Select$Styles$defaultsMenuItem = {
	backgroundColorClicked: $rtfeldman$elm_css$Css$hex('#E6F0F7'),
	backgroundColorNotSelected: $rtfeldman$elm_css$Css$hex('#E6F0F7'),
	backgroundColorSelected: $rtfeldman$elm_css$Css$hex('#E6F0F7'),
	blockPadding: 8,
	borderRadius: 4,
	color: $rtfeldman$elm_css$Css$hex('#000000'),
	colorHoverNotSelected: $rtfeldman$elm_css$Css$hex('#0168B3'),
	colorHoverSelected: $rtfeldman$elm_css$Css$hex('#0168B3'),
	inlinePadding: 8
};
var $Confidenceman02$elm_select$Select$Styles$menuItemDefault = $Confidenceman02$elm_select$Select$Styles$MenuItemConfig($Confidenceman02$elm_select$Select$Styles$defaultsMenuItem);
var $Confidenceman02$elm_select$Select$Styles$GroupConfig = function (a) {
	return {$: 'GroupConfig', a: a};
};
var $rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
var $rtfeldman$elm_css$Css$int = function (val) {
	return {
		fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible,
		intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessInteger,
		value: $elm$core$String$fromInt(val)
	};
};
var $rtfeldman$elm_css$Css$uppercase = {textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'uppercase'};
var $Confidenceman02$elm_select$Select$Styles$defaultsGroup = {
	color: $rtfeldman$elm_css$Css$hex('#9e9e9e'),
	fontSizeLabel: $rtfeldman$elm_css$Css$px(14).value,
	fontWeightLabel: $rtfeldman$elm_css$Css$int(500).value,
	textTransformationLabel: $rtfeldman$elm_css$Css$uppercase.value
};
var $Confidenceman02$elm_select$Select$Styles$menuItemGroupDefault = $Confidenceman02$elm_select$Select$Styles$GroupConfig($Confidenceman02$elm_select$Select$Styles$defaultsGroup);
var $Confidenceman02$elm_select$Select$Styles$defaults = {controlConfig: $Confidenceman02$elm_select$Select$Styles$controlDefault, menuConfig: $Confidenceman02$elm_select$Select$Styles$menuDefault, menuItemConfig: $Confidenceman02$elm_select$Select$Styles$menuItemDefault, menuItemGroup: $Confidenceman02$elm_select$Select$Styles$menuItemGroupDefault};
var $Confidenceman02$elm_select$Select$Styles$default = $Confidenceman02$elm_select$Select$Styles$Config($Confidenceman02$elm_select$Select$Styles$defaults);
var $Confidenceman02$elm_select$Select$defaults = {
	ariaDescribedBy: $elm$core$Maybe$Nothing,
	clearable: false,
	disabled: false,
	isLoading: false,
	labelledBy: $elm$core$Maybe$Nothing,
	loadingMessage: 'Loading...',
	menuItems: _List_Nil,
	name: $elm$core$Maybe$Nothing,
	placeholder: 'Select...',
	searchable: true,
	state: $Confidenceman02$elm_select$Select$initState(
		$Confidenceman02$elm_select$Select$selectIdentifier('elm-select')),
	styles: $Confidenceman02$elm_select$Select$Styles$default,
	variant: $Confidenceman02$elm_select$Select$CustomVariant(
		$Confidenceman02$elm_select$Select$Single($elm$core$Maybe$Nothing))
};
var $Confidenceman02$elm_select$Select$single = function (maybeSelectedItem) {
	return $Confidenceman02$elm_select$Select$Config(
		_Utils_update(
			$Confidenceman02$elm_select$Select$defaults,
			{
				variant: $Confidenceman02$elm_select$Select$CustomVariant(
					$Confidenceman02$elm_select$Select$Single(maybeSelectedItem))
			}));
};
var $Confidenceman02$elm_select$Select$state = F2(
	function (state_, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Config(
			_Utils_update(
				config,
				{state: state_}));
	});
var $Confidenceman02$elm_select$Select$BuildPlaceholderData = F4(
	function (variant, state, controlStyles, placeholder) {
		return {controlStyles: controlStyles, placeholder: placeholder, state: state, variant: variant};
	});
var $Confidenceman02$elm_select$Select$BuildViewableMenuItemsData = F4(
	function (searchable, inputValue, menuItems, variant) {
		return {inputValue: inputValue, menuItems: menuItems, searchable: searchable, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewClearIndicatorData = F5(
	function (disabled, clearable, variant, state, styles) {
		return {clearable: clearable, disabled: disabled, state: state, styles: styles, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewControlWrapperData = F6(
	function (disabled, state, controlStyles, menuStyles, variant, searchable) {
		return {controlStyles: controlStyles, disabled: disabled, menuStyles: menuStyles, searchable: searchable, state: state, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewCustomControlData = function (state) {
	return function (controlStyles) {
		return function (styles) {
			return function (enterSelectTargetItem) {
				return function (totalMenuItems) {
					return function (variant) {
						return function (placeholder) {
							return function (disabled) {
								return function (searchable) {
									return function (labelledBy) {
										return function (ariaDescribedBy) {
											return function (clearable) {
												return function (loading) {
													return {ariaDescribedBy: ariaDescribedBy, clearable: clearable, controlStyles: controlStyles, disabled: disabled, enterSelectTargetItem: enterSelectTargetItem, labelledBy: labelledBy, loading: loading, placeholder: placeholder, searchable: searchable, state: state, styles: styles, totalMenuItems: totalMenuItems, variant: variant};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $Confidenceman02$elm_select$Select$ViewDropdownIndicatorData = F2(
	function (disabled, controlStyles) {
		return {controlStyles: controlStyles, disabled: disabled};
	});
var $Confidenceman02$elm_select$Select$ViewDummyInputData = function (id) {
	return function (variant) {
		return function (maybeTargetItem) {
			return function (totalViewableMenuItems) {
				return function (menuOpen) {
					return function (labelledBy) {
						return function (ariaDescribedBy) {
							return function (disabled) {
								return function (clearable) {
									return function (state) {
										return {ariaDescribedBy: ariaDescribedBy, clearable: clearable, disabled: disabled, id: id, labelledBy: labelledBy, maybeTargetItem: maybeTargetItem, menuOpen: menuOpen, state: state, totalViewableMenuItems: totalViewableMenuItems, variant: variant};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $Confidenceman02$elm_select$Select$ViewLoadingMenuData = F3(
	function (variant, loadingText, menuStyles) {
		return {loadingText: loadingText, menuStyles: menuStyles, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewLoadingSpinnerData = F2(
	function (isLoading, loadingIndicatorColor) {
		return {isLoading: isLoading, loadingIndicatorColor: loadingIndicatorColor};
	});
var $Confidenceman02$elm_select$Select$ViewMenuData = function (variant) {
	return function (selectId) {
		return function (viewableMenuItems) {
			return function (initialAction) {
				return function (activeTargetIndex) {
					return function (menuNavigation) {
						return function (menuStyles) {
							return function (menuItemStyles) {
								return function (menuItemGroupStyles) {
									return function (disabled) {
										return function (controlUiFocused) {
											return {activeTargetIndex: activeTargetIndex, controlUiFocused: controlUiFocused, disabled: disabled, initialAction: initialAction, menuItemGroupStyles: menuItemGroupStyles, menuItemStyles: menuItemStyles, menuNavigation: menuNavigation, menuStyles: menuStyles, selectId: selectId, variant: variant, viewableMenuItems: viewableMenuItems};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $Confidenceman02$elm_select$Select$ViewMenuItemsData = function (menuItemStyles) {
	return function (menuItemGroupStyles) {
		return function (selectId) {
			return function (variant) {
				return function (initialAction) {
					return function (activeTargetIndex) {
						return function (menuNavigation) {
							return function (viewableMenuItems) {
								return function (disabled) {
									return function (controlUiFocused) {
										return {activeTargetIndex: activeTargetIndex, controlUiFocused: controlUiFocused, disabled: disabled, initialAction: initialAction, menuItemGroupStyles: menuItemGroupStyles, menuItemStyles: menuItemStyles, menuNavigation: menuNavigation, selectId: selectId, variant: variant, viewableMenuItems: viewableMenuItems};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $Confidenceman02$elm_select$Select$ViewMenuItemsWrapperData = F4(
	function (variant, menuStyles, menuNavigation, selectId) {
		return {menuNavigation: menuNavigation, menuStyles: menuStyles, selectId: selectId, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewNativeData = F9(
	function (controlStyles, variant, menuItems, selectId, labelledBy, ariaDescribedBy, placeholder, disabled, name) {
		return {ariaDescribedBy: ariaDescribedBy, controlStyles: controlStyles, disabled: disabled, labelledBy: labelledBy, menuItems: menuItems, name: name, placeholder: placeholder, selectId: selectId, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewSelectInputData = F8(
	function (maybeActiveTarget, totalViewableMenuItems, variant, labelledBy, ariaDescribedBy, disabled, clearable, state) {
		return {ariaDescribedBy: ariaDescribedBy, clearable: clearable, disabled: disabled, labelledBy: labelledBy, maybeActiveTarget: maybeActiveTarget, state: state, totalViewableMenuItems: totalViewableMenuItems, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewWrapperData = F4(
	function (state, searchable, variant, disabled) {
		return {disabled: disabled, searchable: searchable, state: state, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewPlaceholderData = F2(
	function (placeholderOpac, placeholder) {
		return {placeholder: placeholder, placeholderOpac: placeholderOpac};
	});
var $Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity = function (_v0) {
	var config = _v0.a;
	return config.placeholderOpacity;
};
var $Confidenceman02$elm_select$Select$isEmptyInputValue = function (inputValue) {
	return $elm$core$String$isEmpty(
		A2($elm$core$Maybe$withDefault, '', inputValue));
};
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $rtfeldman$elm_css$Css$borderBox = {backgroundClip: $rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'border-box'};
var $rtfeldman$elm_css$Css$boxSizing = $rtfeldman$elm_css$Css$prop1('box-sizing');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return $elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A3(
			$rtfeldman$elm_css$Css$String$mapJoin,
			function ($) {
				return $.value;
			},
			' ',
			list)
	};
};
var $rtfeldman$elm_css$Css$transforms = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('transform'),
	$rtfeldman$elm_css$Css$valuesOrNone);
var $rtfeldman$elm_css$Css$transform = function (only) {
	return $rtfeldman$elm_css$Css$transforms(
		_List_fromArray(
			[only]));
};
var $rtfeldman$elm_css$Css$translateY = function (_v0) {
	var value = _v0.value;
	return {
		transform: $rtfeldman$elm_css$Css$Structure$Compatible,
		value: A2(
			$rtfeldman$elm_css$Css$cssFunction,
			'translateY',
			_List_fromArray(
				[value]))
	};
};
var $Confidenceman02$elm_select$Select$basePlaceholderStyles = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$property,
		'margin-inline-start',
		$rtfeldman$elm_css$Css$px(2).value),
		$rtfeldman$elm_css$Css$marginRight(
		$rtfeldman$elm_css$Css$px(2)),
		$rtfeldman$elm_css$Css$top(
		$rtfeldman$elm_css$Css$pct(50)),
		$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
		$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
		$rtfeldman$elm_css$Css$transform(
		$rtfeldman$elm_css$Css$translateY(
			$rtfeldman$elm_css$Css$pct(-50)))
	]);
var $rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var $rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessFloat,
		value: $elm$core$String$fromFloat(val)
	};
};
var $rtfeldman$elm_css$Css$opacity = $rtfeldman$elm_css$Css$prop1('opacity');
var $Confidenceman02$elm_select$Select$placeholderStyles = function (opac) {
	return A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$opacity(
			$rtfeldman$elm_css$Css$num(opac)),
		$Confidenceman02$elm_select$Select$basePlaceholderStyles);
};
var $Confidenceman02$elm_select$Select$viewPlaceholder = function (data) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				$Confidenceman02$elm_select$Select$placeholderStyles(data.placeholderOpac))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(data.placeholder)
			]));
};
var $rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$attribute, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$attribute = $rtfeldman$elm_css$VirtualDom$Styled$attribute;
var $rtfeldman$elm_css$Css$calcExpressionToString = function (expression) {
	if (expression.$ === 'Addition') {
		return '+';
	} else {
		return '-';
	}
};
var $rtfeldman$elm_css$Css$calc = F3(
	function (firstExpr, expression, secondExpr) {
		var withoutCalcStr = function (l) {
			return A2($elm$core$String$startsWith, 'calc(', l.value) ? A2($elm$core$String$dropLeft, 4, l.value) : l.value;
		};
		var calcs = withoutCalcStr(firstExpr) + (' ' + ($rtfeldman$elm_css$Css$calcExpressionToString(expression) + (' ' + withoutCalcStr(secondExpr))));
		var value = A2(
			$rtfeldman$elm_css$Css$cssFunction,
			'calc',
			_List_fromArray(
				[calcs]));
		return {calc: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, fontSize: $rtfeldman$elm_css$Css$Structure$Compatible, length: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, textIndent: $rtfeldman$elm_css$Css$Structure$Compatible, value: value};
	});
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $rtfeldman$elm_css$Css$ellipsis = {textOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'ellipsis'};
var $rtfeldman$elm_css$Css$fontWeight = function (_v0) {
	var value = _v0.value;
	return A2($rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var $Confidenceman02$elm_select$Select$Styles$getControlSelectedColor = function (_v0) {
	var config = _v0.a;
	return config.selectedColor;
};
var $Confidenceman02$elm_select$Select$getMenuItemLabel = function (item) {
	if (item.$ === 'Basic') {
		var config = item.a;
		return config.label;
	} else {
		var config = item.a;
		return config.label;
	}
};
var $rtfeldman$elm_css$Css$hidden = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'hidden', visibility: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $rtfeldman$elm_css$Css$Subtraction = {$: 'Subtraction'};
var $rtfeldman$elm_css$Css$minus = $rtfeldman$elm_css$Css$Subtraction;
var $rtfeldman$elm_css$Css$noWrap = {flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'nowrap', whiteSpace: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Css$overflow = $rtfeldman$elm_css$Css$prop1('overflow');
var $rtfeldman$elm_css$Css$textOverflow = $rtfeldman$elm_css$Css$prop1('text-overflow');
var $rtfeldman$elm_css$Css$whiteSpace = $rtfeldman$elm_css$Css$prop1('white-space');
var $Confidenceman02$elm_select$Select$viewSelectedPlaceholder = F2(
	function (styles, item) {
		var addedStyles = _List_fromArray(
			[
				$rtfeldman$elm_css$Css$maxWidth(
				A3(
					$rtfeldman$elm_css$Css$calc,
					$rtfeldman$elm_css$Css$pct(100),
					$rtfeldman$elm_css$Css$minus,
					$rtfeldman$elm_css$Css$px(8))),
				$rtfeldman$elm_css$Css$textOverflow($rtfeldman$elm_css$Css$ellipsis),
				$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$noWrap),
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$hidden),
				$rtfeldman$elm_css$Css$color(
				$Confidenceman02$elm_select$Select$Styles$getControlSelectedColor(styles)),
				$rtfeldman$elm_css$Css$fontWeight(
				$rtfeldman$elm_css$Css$int(400))
			]);
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_Utils_ap($Confidenceman02$elm_select$Select$basePlaceholderStyles, addedStyles)),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'selectedItem')
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(
					$Confidenceman02$elm_select$Select$getMenuItemLabel(item))
				]));
	});
var $Confidenceman02$elm_select$Select$buildPlaceholder = function (data) {
	if ($Confidenceman02$elm_select$Select$isEmptyInputValue(data.state.inputValue)) {
		var _v0 = data.variant;
		switch (_v0.$) {
			case 'Multi':
				if (!_v0.a.b) {
					return $Confidenceman02$elm_select$Select$viewPlaceholder(
						A2(
							$Confidenceman02$elm_select$Select$ViewPlaceholderData,
							$Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity(data.controlStyles),
							data.placeholder));
				} else {
					return $rtfeldman$elm_css$Html$Styled$text('');
				}
			case 'Single':
				if (_v0.a.$ === 'Just') {
					var v = _v0.a.a;
					return A2($Confidenceman02$elm_select$Select$viewSelectedPlaceholder, data.controlStyles, v);
				} else {
					var _v1 = _v0.a;
					return $Confidenceman02$elm_select$Select$viewPlaceholder(
						A2(
							$Confidenceman02$elm_select$Select$ViewPlaceholderData,
							$Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity(data.controlStyles),
							data.placeholder));
				}
			default:
				return $Confidenceman02$elm_select$Select$viewPlaceholder(
					A2(
						$Confidenceman02$elm_select$Select$ViewPlaceholderData,
						$Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity(data.controlStyles),
						data.placeholder));
		}
	} else {
		return $rtfeldman$elm_css$Html$Styled$text('');
	}
};
var $Confidenceman02$elm_select$Select$enterSelectTargetItem = F2(
	function (state_, viewableMenuItems) {
		return (state_.menuOpen && (!$elm$core$List$isEmpty(viewableMenuItems))) ? A2($elm_community$list_extra$List$Extra$getAt, state_.activeTargetIndex, viewableMenuItems) : $elm$core$Maybe$Nothing;
	});
var $Confidenceman02$elm_select$Select$filterMultiSelectedItems = F2(
	function (selectedItems, currentMenuItems) {
		return $elm$core$List$isEmpty(selectedItems) ? currentMenuItems : A2(
			$elm$core$List$filter,
			function (i) {
				return !A2(
					$elm$core$List$any,
					function (si) {
						return _Utils_eq(
							$Confidenceman02$elm_select$Select$unwrapItem(i),
							$Confidenceman02$elm_select$Select$unwrapItem(si));
					},
					selectedItems);
			},
			currentMenuItems);
	});
var $Confidenceman02$elm_select$Select$isMenuItemFilterable = function (mi) {
	if (mi.$ === 'Basic') {
		var obj = mi.a;
		return obj.filterable;
	} else {
		var obj = mi.a;
		return obj.filterable;
	}
};
var $Confidenceman02$elm_select$Select$filterViewableMenuItems = function (data) {
	var filterMenuItem = F2(
		function (query, item) {
			return A2(
				$elm$core$String$contains,
				$elm$core$String$toLower(query),
				$elm$core$String$toLower(
					$Confidenceman02$elm_select$Select$getMenuItemLabel(item))) || (!$Confidenceman02$elm_select$Select$isMenuItemFilterable(item));
		});
	var filteredMenuItems = function () {
		var _v1 = _Utils_Tuple2(data.searchable, data.inputValue);
		if (_v1.a && (_v1.b.$ === 'Just')) {
			var value = _v1.b.a;
			return $elm$core$String$isEmpty(value) ? data.menuItems : A2(
				$elm$core$List$filter,
				filterMenuItem(value),
				data.menuItems);
		} else {
			return data.menuItems;
		}
	}();
	var _v0 = data.variant;
	if (_v0.$ === 'CustomVariant') {
		switch (_v0.a.$) {
			case 'Single':
				return filteredMenuItems;
			case 'Multi':
				var maybeSelectedMenuItems = _v0.a.a;
				return A2($Confidenceman02$elm_select$Select$filterMultiSelectedItems, maybeSelectedMenuItems, filteredMenuItems);
			default:
				return filteredMenuItems;
		}
	} else {
		return _List_Nil;
	}
};
var $Confidenceman02$elm_select$Select$Styles$getControlConfig = function (_v0) {
	var config = _v0.a;
	return config.controlConfig;
};
var $Confidenceman02$elm_select$Select$Styles$getControlLoadingIndicatorColor = function (_v0) {
	var config = _v0.a;
	return config.loadingIndicatorColor;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupConfig = function (_v0) {
	var config = _v0.a;
	return config.menuItemGroup;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuConfig = function (_v0) {
	var config = _v0.a;
	return config.menuConfig;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlLoadingIndicatorColor = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.loadingIndicatorColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlSearchIndicatorColor = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.searchIndicatorColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemConfig = function (_v0) {
	var config = _v0.a;
	return config.menuItemConfig;
};
var $Confidenceman02$elm_select$Select$getSelectId = function (_v0) {
	var selectId = _v0.a.selectId;
	var _v1 = selectId;
	var idString = _v1.a;
	return idString;
};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$alignSelf = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignSelf',
		'align-self',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var $Confidenceman02$elm_select$Select$Styles$getControlSeparatorColor = function (_v0) {
	var config = _v0.a;
	return config.separatorColor;
};
var $rtfeldman$elm_css$Css$marginBottom = $rtfeldman$elm_css$Css$prop1('margin-bottom');
var $rtfeldman$elm_css$Html$Styled$span = $rtfeldman$elm_css$Html$Styled$node('span');
var $rtfeldman$elm_css$Css$stretch = $rtfeldman$elm_css$Css$prop1('stretch');
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $Confidenceman02$elm_select$Select$indicatorSeparator = function (styles) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$span,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$alignSelf($rtfeldman$elm_css$Css$stretch),
						$rtfeldman$elm_css$Css$backgroundColor(
						$Confidenceman02$elm_select$Select$Styles$getControlSeparatorColor(styles)),
						$rtfeldman$elm_css$Css$marginBottom(
						$rtfeldman$elm_css$Css$px(8)),
						$rtfeldman$elm_css$Css$marginTop(
						$rtfeldman$elm_css$Css$px(8)),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$px(1)),
						$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox)
					]))
			]),
		_List_Nil);
};
var $elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var $rtfeldman$elm_css$VirtualDom$Styled$lazyHelp = F2(
	function (fn, arg) {
		return $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled(
			fn(arg));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$lazy = F2(
	function (fn, arg) {
		return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
			A3($elm$virtual_dom$VirtualDom$lazy2, $rtfeldman$elm_css$VirtualDom$Styled$lazyHelp, fn, arg));
	});
var $rtfeldman$elm_css$Html$Styled$Lazy$lazy = $rtfeldman$elm_css$VirtualDom$Styled$lazy;
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.value + (' ' + (argB.value + (' ' + (argC.value + (' ' + argD.value))))));
	});
var $rtfeldman$elm_css$Css$boxShadow4 = $rtfeldman$elm_css$Css$prop4('box-shadow');
var $Confidenceman02$elm_select$Select$Styles$getMenuBackgroundColor = function (_v0) {
	var config = _v0.a;
	return config.backgroundColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBorderRadius = function (_v0) {
	var config = _v0.a;
	return config.borderRadius;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowBlur = function (_v0) {
	var config = _v0.a;
	return config.boxShadowBlur;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowColor = function (_v0) {
	var config = _v0.a;
	return config.boxShadowColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowHOffset = function (_v0) {
	var config = _v0.a;
	return config.boxShadowHOffset;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowVOffset = function (_v0) {
	var config = _v0.a;
	return config.boxShadowVOffset;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuPosition = function (_v0) {
	var config = _v0.a;
	return config.position;
};
var $Confidenceman02$elm_select$Select$menuMarginTop = 8;
var $rtfeldman$elm_css$Css$paddingBottom = $rtfeldman$elm_css$Css$prop1('padding-bottom');
var $rtfeldman$elm_css$Css$paddingTop = $rtfeldman$elm_css$Css$prop1('padding-top');
var $rtfeldman$elm_css$Css$zIndex = $rtfeldman$elm_css$Css$prop1('z-index');
var $Confidenceman02$elm_select$Select$menuWrapperStyles = function (menuStyles) {
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$paddingBottom(
			$rtfeldman$elm_css$Css$px($Confidenceman02$elm_select$Select$listBoxPaddingBottom)),
			$rtfeldman$elm_css$Css$paddingTop(
			$rtfeldman$elm_css$Css$px($Confidenceman02$elm_select$Select$listBoxPaddingTop)),
			$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
			$rtfeldman$elm_css$Css$top(
			$rtfeldman$elm_css$Css$pct(100)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$Confidenceman02$elm_select$Select$Styles$getMenuBackgroundColor(menuStyles)),
			$rtfeldman$elm_css$Css$position(
			$Confidenceman02$elm_select$Select$Styles$getMenuPosition(menuStyles)),
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(100)),
			$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuBorderRadius(menuStyles))),
			A4(
			$rtfeldman$elm_css$Css$boxShadow4,
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowHOffset(menuStyles)),
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowVOffset(menuStyles)),
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowBlur(menuStyles)),
			$Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowColor(menuStyles)),
			$rtfeldman$elm_css$Css$marginTop(
			$rtfeldman$elm_css$Css$px($Confidenceman02$elm_select$Select$menuMarginTop)),
			$rtfeldman$elm_css$Css$zIndex(
			$rtfeldman$elm_css$Css$int(2))
		]);
};
var $rtfeldman$elm_css$VirtualDom$Styled$keyedNode = $rtfeldman$elm_css$VirtualDom$Styled$KeyedNode;
var $rtfeldman$elm_css$Html$Styled$Keyed$node = $rtfeldman$elm_css$VirtualDom$Styled$keyedNode;
var $rtfeldman$elm_css$Css$none = {backgroundImage: $rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, display: $rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: $rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, outline: $rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, resize: $rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, transform: $rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$pointerEvents = $rtfeldman$elm_css$Css$prop1('pointer-events');
var $rtfeldman$elm_css$Css$relative = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
var $rtfeldman$elm_css$Css$right = $rtfeldman$elm_css$Css$prop1('right');
var $Confidenceman02$elm_select$Select$ClearIndicatorData = F5(
	function (disabled, indicatorColor, indicatorColorHover, variant, selectId) {
		return {disabled: disabled, indicatorColor: indicatorColor, indicatorColorHover: indicatorColorHover, selectId: selectId, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ShowClearButtonData = F4(
	function (variant, disabled, clearable, state) {
		return {clearable: clearable, disabled: disabled, state: state, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ClearButtonKeyDowned = function (a) {
	return {$: 'ClearButtonKeyDowned', a: a};
};
var $Confidenceman02$elm_select$Select$ClearButtonMouseDowned = function (a) {
	return {$: 'ClearButtonMouseDowned', a: a};
};
var $Confidenceman02$elm_select$Select$OnMenuClearableBlurred = {$: 'OnMenuClearableBlurred'};
var $Confidenceman02$elm_select$Select$OnMenuClearableShiftTabbed = function (a) {
	return {$: 'OnMenuClearableShiftTabbed', a: a};
};
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$cursor = $rtfeldman$elm_css$Css$prop1('cursor');
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $rtfeldman$elm_css$Css$displayFlex = A2($rtfeldman$elm_css$Css$property, 'display', 'flex');
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$hover = $rtfeldman$elm_css$Css$pseudoClass('hover');
var $rtfeldman$elm_css$Css$border = $rtfeldman$elm_css$Css$prop1('border');
var $rtfeldman$elm_css$Css$borderColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'border-color', c.value);
};
var $rtfeldman$elm_css$Css$initial = {alignItems: $rtfeldman$elm_css$Css$Structure$Compatible, all: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundAttachment: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundBlendMode: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundImage: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundOrigin: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeat: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeatShorthand: $rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: $rtfeldman$elm_css$Css$Structure$Compatible, color: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, display: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirection: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: $rtfeldman$elm_css$Css$Structure$Compatible, fontFamily: $rtfeldman$elm_css$Css$Structure$Compatible, fontSize: $rtfeldman$elm_css$Css$Structure$Compatible, fontStyle: $rtfeldman$elm_css$Css$Structure$Compatible, fontVariant: $rtfeldman$elm_css$Css$Structure$Compatible, fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContent: $rtfeldman$elm_css$Css$Structure$Compatible, keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, length: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, listStylePosition: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, number: $rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textIndent: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, value: 'initial', visibility: $rtfeldman$elm_css$Css$Structure$Compatible, whiteSpace: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Css$inherit = _Utils_update(
	$rtfeldman$elm_css$Css$initial,
	{value: 'inherit'});
var $rtfeldman$elm_css$Css$transparent = {color: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'transparent'};
var $Confidenceman02$elm_select$Select$iconButtonStyles = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$displayFlex,
		$rtfeldman$elm_css$Css$backgroundColor($rtfeldman$elm_css$Css$transparent),
		$rtfeldman$elm_css$Css$padding(
		$rtfeldman$elm_css$Css$px(0)),
		$rtfeldman$elm_css$Css$borderColor(
		A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0)),
		$rtfeldman$elm_css$Css$border(
		$rtfeldman$elm_css$Css$px(0)),
		$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit)
	]);
var $Confidenceman02$elm_select$Select$Events$Enter = {$: 'Enter'};
var $Confidenceman02$elm_select$Select$Events$Backspace = {$: 'Backspace'};
var $Confidenceman02$elm_select$Select$Events$DownArrow = {$: 'DownArrow'};
var $Confidenceman02$elm_select$Select$Events$Escape = {$: 'Escape'};
var $Confidenceman02$elm_select$Select$Events$Other = {$: 'Other'};
var $Confidenceman02$elm_select$Select$Events$Shift = {$: 'Shift'};
var $Confidenceman02$elm_select$Select$Events$Space = {$: 'Space'};
var $Confidenceman02$elm_select$Select$Events$Tab = {$: 'Tab'};
var $Confidenceman02$elm_select$Select$Events$UpArrow = {$: 'UpArrow'};
var $Confidenceman02$elm_select$Select$Events$backspace = 8;
var $Confidenceman02$elm_select$Select$Events$downArrow = 40;
var $Confidenceman02$elm_select$Select$Events$enter = 13;
var $Confidenceman02$elm_select$Select$Events$escape = 27;
var $Confidenceman02$elm_select$Select$Events$shift = 16;
var $Confidenceman02$elm_select$Select$Events$space = 32;
var $Confidenceman02$elm_select$Select$Events$tab = 9;
var $Confidenceman02$elm_select$Select$Events$upArrow = 38;
var $Confidenceman02$elm_select$Select$Events$keyCodeToKey = function (keyCode) {
	return _Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$escape) ? $Confidenceman02$elm_select$Select$Events$Escape : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$backspace) ? $Confidenceman02$elm_select$Select$Events$Backspace : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$upArrow) ? $Confidenceman02$elm_select$Select$Events$UpArrow : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$downArrow) ? $Confidenceman02$elm_select$Select$Events$DownArrow : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$enter) ? $Confidenceman02$elm_select$Select$Events$Enter : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$space) ? $Confidenceman02$elm_select$Select$Events$Space : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$shift) ? $Confidenceman02$elm_select$Select$Events$Shift : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$tab) ? $Confidenceman02$elm_select$Select$Events$Tab : $Confidenceman02$elm_select$Select$Events$Other)))))));
};
var $Confidenceman02$elm_select$Select$Events$decoder = $Confidenceman02$elm_select$Select$Events$keyCodeToKey;
var $Confidenceman02$elm_select$Select$Events$isCode = F3(
	function (key, msg, code) {
		return _Utils_eq(
			$Confidenceman02$elm_select$Select$Events$decoder(code),
			key) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('not the right key');
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $rtfeldman$elm_css$Html$Styled$Events$keyCode = A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int);
var $Confidenceman02$elm_select$Select$Events$isEnter = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, $Confidenceman02$elm_select$Select$Events$Enter, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$Events$isSpace = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, $Confidenceman02$elm_select$Select$Events$Space, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $Confidenceman02$elm_select$Select$Events$isTabWithShift = function (msg) {
	return A3(
		$elm$json$Json$Decode$map2,
		F2(
			function (_v0, isShift) {
				return msg(isShift);
			}),
		A2(
			$elm$json$Json$Decode$andThen,
			A2(
				$Confidenceman02$elm_select$Select$Events$isCode,
				$Confidenceman02$elm_select$Select$Events$Tab,
				msg(true)),
			$rtfeldman$elm_css$Html$Styled$Events$keyCode),
		A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
};
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onBlur = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $rtfeldman$elm_css$Css$pointer = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'pointer'};
var $rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$type_ = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('type');
var $rtfeldman$elm_css$Svg$Styled$Attributes$d = $rtfeldman$elm_css$VirtualDom$Styled$attribute('d');
var $rtfeldman$elm_css$VirtualDom$Styled$nodeNS = $rtfeldman$elm_css$VirtualDom$Styled$NodeNS;
var $rtfeldman$elm_css$Svg$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$nodeNS('http://www.w3.org/2000/svg');
var $rtfeldman$elm_css$Svg$Styled$path = $rtfeldman$elm_css$Svg$Styled$node('path');
var $rtfeldman$elm_css$Svg$Styled$svg = $rtfeldman$elm_css$Svg$Styled$node('svg');
var $rtfeldman$elm_css$Svg$Styled$Attributes$fill = $rtfeldman$elm_css$VirtualDom$Styled$attribute('fill');
var $rtfeldman$elm_css$Svg$Styled$Attributes$height = $rtfeldman$elm_css$VirtualDom$Styled$attribute('height');
var $rtfeldman$elm_css$Svg$Styled$Attributes$viewBox = $rtfeldman$elm_css$VirtualDom$Styled$attribute('viewBox');
var $Confidenceman02$elm_select$Select$ClearIcon$svgCommonStyles = _List_fromArray(
	[
		$rtfeldman$elm_css$Svg$Styled$Attributes$height('16'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 20 20'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$fill('currentColor')
	]);
var $Confidenceman02$elm_select$Select$ClearIcon$view = A2(
	$rtfeldman$elm_css$Svg$Styled$svg,
	$Confidenceman02$elm_select$Select$ClearIcon$svgCommonStyles,
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Svg$Styled$path,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Svg$Styled$Attributes$d('M10 2c-4.424 0-8 3.576-8 8 0 4.424 3.576 8 8 8 4.424 0 8-3.576 8-8 0-4.424-3.576-8-8-8zm4 10.872L12.872 14 10 11.128 7.128 14 6 12.872 8.872 10 6 7.128 7.128 6 10 8.872 12.872 6 14 7.128 11.128 10 14 12.872z')
				]),
			_List_Nil)
		]));
var $Confidenceman02$elm_select$Select$clearIndicator = function (data) {
	var withMenuBlur = function () {
		var _v2 = data.variant;
		if ((_v2.$ === 'CustomVariant') && (_v2.a.$ === 'SingleMenu')) {
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Events$onBlur($Confidenceman02$elm_select$Select$OnMenuClearableBlurred)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var resolveTab = function () {
		var _v1 = data.variant;
		if ((_v1.$ === 'CustomVariant') && (_v1.a.$ === 'SingleMenu')) {
			return _List_fromArray(
				[
					$Confidenceman02$elm_select$Select$Events$isTabWithShift($Confidenceman02$elm_select$Select$OnMenuClearableShiftTabbed)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var resolveIconButtonStyles = data.disabled ? _List_fromArray(
		[
			$rtfeldman$elm_css$Css$height(
			$rtfeldman$elm_css$Css$px(16))
		]) : _List_fromArray(
		[
			$rtfeldman$elm_css$Css$height(
			$rtfeldman$elm_css$Css$px(16)),
			$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
		]);
	var preventDefault = function (msg) {
		if (msg.$ === 'OnMenuClearableShiftTabbed') {
			return _Utils_Tuple2(msg, true);
		} else {
			return _Utils_Tuple2(msg, false);
		}
	};
	return A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_Utils_ap(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'clear'),
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Attributes$id(
					$Confidenceman02$elm_select$Select$clearableId(data.selectId)),
					A2(
					$rtfeldman$elm_css$Html$Styled$Events$custom,
					'mousedown',
					A2(
						$elm$json$Json$Decode$map,
						function (msg) {
							return {message: msg, preventDefault: true, stopPropagation: true};
						},
						$elm$json$Json$Decode$succeed(
							$Confidenceman02$elm_select$Select$ClearButtonMouseDowned(data.variant)))),
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_Utils_ap(resolveIconButtonStyles, $Confidenceman02$elm_select$Select$iconButtonStyles)),
					A2(
					$rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'keydown',
					A2(
						$elm$json$Json$Decode$map,
						preventDefault,
						$elm$json$Json$Decode$oneOf(
							_Utils_ap(
								_List_fromArray(
									[
										$Confidenceman02$elm_select$Select$Events$isSpace(
										$Confidenceman02$elm_select$Select$ClearButtonKeyDowned(data.variant)),
										$Confidenceman02$elm_select$Select$Events$isEnter(
										$Confidenceman02$elm_select$Select$ClearButtonKeyDowned(data.variant))
									]),
								resolveTab))))
				]),
			withMenuBlur),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(data.indicatorColor),
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$hover(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$color(data.indicatorColorHover)
									]))
							]))
					]),
				_List_fromArray(
					[$Confidenceman02$elm_select$Select$ClearIcon$view]))
			]));
};
var $Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColor = function (_v0) {
	var config = _v0.a;
	return config.clearIndicatorColor;
};
var $Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColorHover = function (_v0) {
	var config = _v0.a;
	return config.clearIndicatorColorHover;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColor = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.clearIndicatorColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColorHover = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.clearIndicatorColorHover;
};
var $Confidenceman02$elm_select$Select$indicatorContainerStyles = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$displayFlex,
		$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
		$rtfeldman$elm_css$Css$padding(
		$rtfeldman$elm_css$Css$px(8))
	]);
var $Confidenceman02$elm_select$Select$showClearButton = function (data) {
	if (data.clearable && (!data.disabled)) {
		var _v0 = data.variant;
		_v0$4:
		while (true) {
			if (_v0.$ === 'CustomVariant') {
				switch (_v0.a.$) {
					case 'Single':
						if (_v0.a.a.$ === 'Just') {
							return true;
						} else {
							break _v0$4;
						}
					case 'SingleMenu':
						var _v1 = data.state.inputValue;
						if (_v1.$ === 'Just') {
							if (_v1.a === '') {
								return false;
							} else {
								return true;
							}
						} else {
							return false;
						}
					default:
						if (_v0.a.a.b) {
							var _v2 = _v0.a.a;
							return true;
						} else {
							break _v0$4;
						}
				}
			} else {
				if ((_v0.a.$ === 'SingleNative') && (_v0.a.a.$ === 'Just')) {
					return true;
				} else {
					break _v0$4;
				}
			}
		}
		return false;
	} else {
		return false;
	}
};
var $Confidenceman02$elm_select$Select$Internal$nothing = $rtfeldman$elm_css$Html$Styled$text('');
var $Confidenceman02$elm_select$Select$Internal$viewIf = F2(
	function (condition, html) {
		return condition ? html : $Confidenceman02$elm_select$Select$Internal$nothing;
	});
var $Confidenceman02$elm_select$Select$viewClearIndicator = function (data) {
	var menuStyles = $Confidenceman02$elm_select$Select$Styles$getMenuConfig(data.styles);
	var ctrlStyles = $Confidenceman02$elm_select$Select$Styles$getControlConfig(data.styles);
	var _v0 = data.state;
	var state_ = _v0.a;
	var clearButtonVisible = $Confidenceman02$elm_select$Select$showClearButton(
		A4($Confidenceman02$elm_select$Select$ShowClearButtonData, data.variant, data.disabled, data.clearable, state_));
	var resolveClearIndicatorData = function () {
		var _v1 = data.variant;
		if ((_v1.$ === 'CustomVariant') && (_v1.a.$ === 'SingleMenu')) {
			return A5(
				$Confidenceman02$elm_select$Select$ClearIndicatorData,
				data.disabled,
				$Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColor(menuStyles),
				$Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColorHover(menuStyles),
				data.variant,
				state_.selectId);
		} else {
			return A5(
				$Confidenceman02$elm_select$Select$ClearIndicatorData,
				data.disabled,
				$Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColor(ctrlStyles),
				$Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColorHover(ctrlStyles),
				data.variant,
				state_.selectId);
		}
	}();
	return A2(
		$Confidenceman02$elm_select$Select$Internal$viewIf,
		clearButtonVisible,
		A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_Utils_ap(
						$Confidenceman02$elm_select$Select$indicatorContainerStyles,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$pointerEvents($rtfeldman$elm_css$Css$auto)
							])))
				]),
			_List_fromArray(
				[
					$Confidenceman02$elm_select$Select$clearIndicator(resolveClearIndicatorData)
				])));
};
var $Confidenceman02$elm_select$Select$ContainerClickedMsgData = F4(
	function (disabled, state, variant, searchable) {
		return {disabled: disabled, searchable: searchable, state: state, variant: variant};
	});
var $rtfeldman$elm_css$Css$batch = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var $Confidenceman02$elm_select$Select$SearchableSelectContainerClicked = function (a) {
	return {$: 'SearchableSelectContainerClicked', a: a};
};
var $Confidenceman02$elm_select$Select$UnsearchableSelectContainerClicked = {$: 'UnsearchableSelectContainerClicked'};
var $Confidenceman02$elm_select$Select$containerClickedMsg = function (data) {
	var resolveContainerMsg = data.searchable ? $Confidenceman02$elm_select$Select$SearchableSelectContainerClicked(data.variant) : $Confidenceman02$elm_select$Select$UnsearchableSelectContainerClicked;
	var preventDefault = function () {
		var _v0 = data.state.initialAction;
		switch (_v0.$) {
			case 'NothingMousedown':
				var _v1 = data.variant;
				if (_v1.$ === 'SingleMenu') {
					return _Utils_eq(
						data.state.controlUiFocused,
						$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput));
				} else {
					if (resolveContainerMsg.$ === 'UnsearchableSelectContainerClicked') {
						return _Utils_eq(
							data.state.controlUiFocused,
							$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput));
					} else {
						return false;
					}
				}
			case 'ContainerMousedown':
				return true;
			default:
				return true;
		}
	}();
	return data.disabled ? _List_Nil : _List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
			'mousedown',
			A2(
				$elm$json$Json$Decode$map,
				function (msg) {
					return _Utils_Tuple2(msg, preventDefault);
				},
				$elm$json$Json$Decode$succeed(resolveContainerMsg)))
		]);
};
var $Confidenceman02$elm_select$Select$ControlHoverData = F2(
	function (backgroundColorHover, borderColor) {
		return {backgroundColorHover: backgroundColorHover, borderColor: borderColor};
	});
var $rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.value + (' ' + (argB.value + (' ' + argC.value))));
	});
var $rtfeldman$elm_css$Css$border3 = $rtfeldman$elm_css$Css$prop3('border');
var $rtfeldman$elm_css$Css$solid = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'solid'};
var $Confidenceman02$elm_select$Select$controlBorder = function (cb) {
	return A3(
		$rtfeldman$elm_css$Css$border3,
		$rtfeldman$elm_css$Css$px(2),
		$rtfeldman$elm_css$Css$solid,
		cb);
};
var $Confidenceman02$elm_select$Select$controlBorderFocused = function (bcf) {
	return $rtfeldman$elm_css$Css$borderColor(bcf);
};
var $Confidenceman02$elm_select$Select$controlDisabled = function (dsbOpac) {
	return $rtfeldman$elm_css$Css$opacity(
		$rtfeldman$elm_css$Css$num(dsbOpac));
};
var $Confidenceman02$elm_select$Select$controlHover = function (styles) {
	return $rtfeldman$elm_css$Css$hover(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor(styles.backgroundColorHover),
				$rtfeldman$elm_css$Css$borderColor(styles.borderColor)
			]));
};
var $Confidenceman02$elm_select$Select$controlRadius = function (rad) {
	return $rtfeldman$elm_css$Css$borderRadius(
		$rtfeldman$elm_css$Css$px(rad));
};
var $rtfeldman$elm_css$Css$default = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'default'};
var $rtfeldman$elm_css$Css$flexWrap = $rtfeldman$elm_css$Css$prop1('flex-wrap');
var $Confidenceman02$elm_select$Select$Styles$getControlBackgroundColor = function (_v0) {
	var config = _v0.a;
	return config.backgroundColor;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBackgroundColorHover = function (_v0) {
	var config = _v0.a;
	return config.backgroundColorHover;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBorderColor = function (_v0) {
	var config = _v0.a;
	return config.borderColor;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBorderColorFocus = function (_v0) {
	var config = _v0.a;
	return config.borderColorFocus;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBorderRadius = function (_v0) {
	var config = _v0.a;
	return config.borderRadius;
};
var $Confidenceman02$elm_select$Select$Styles$getControlColor = function (_v0) {
	var config = _v0.a;
	return config.color;
};
var $Confidenceman02$elm_select$Select$Styles$getControlDisabledOpacity = function (_v0) {
	var config = _v0.a;
	return config.disabledOpacity;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMinHeight = function (_v0) {
	var config = _v0.a;
	return config.minHeight;
};
var $rtfeldman$elm_css$Css$justifyContent = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'justifyContent',
		'justify-content',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$minHeight = $rtfeldman$elm_css$Css$prop1('min-height');
var $rtfeldman$elm_css$Css$outline = $rtfeldman$elm_css$Css$prop1('outline');
var $rtfeldman$elm_css$Css$spaceBetween = $rtfeldman$elm_css$Css$prop1('space-between');
var $rtfeldman$elm_css$Css$wrap = {flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'wrap'};
var $rtfeldman$elm_css$Css$zero = {length: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible, number: $rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: $rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: $rtfeldman$elm_css$Css$UnitlessInteger, value: '0'};
var $Confidenceman02$elm_select$Select$controlStyles = F3(
	function (styles, state_, dsb) {
		var controlFocusedStyles = function () {
			var _v0 = state_.controlUiFocused;
			if ((_v0.$ === 'Just') && (_v0.a.$ === 'ControlInput')) {
				var _v1 = _v0.a;
				return _List_fromArray(
					[
						$Confidenceman02$elm_select$Select$controlBorderFocused(
						$Confidenceman02$elm_select$Select$Styles$getControlBorderColorFocus(styles))
					]);
			} else {
				return _List_Nil;
			}
		}();
		return _Utils_ap(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
					$rtfeldman$elm_css$Css$backgroundColor(
					$Confidenceman02$elm_select$Select$Styles$getControlBackgroundColor(styles)),
					$rtfeldman$elm_css$Css$color(
					$Confidenceman02$elm_select$Select$Styles$getControlColor(styles)),
					$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default),
					$rtfeldman$elm_css$Css$displayFlex,
					$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
					$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$spaceBetween),
					$rtfeldman$elm_css$Css$minHeight(
					$rtfeldman$elm_css$Css$px(
						$Confidenceman02$elm_select$Select$Styles$getControlMinHeight(styles))),
					$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
					$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
					$Confidenceman02$elm_select$Select$controlBorder(
					$Confidenceman02$elm_select$Select$Styles$getControlBorderColor(styles)),
					$Confidenceman02$elm_select$Select$controlRadius(
					$Confidenceman02$elm_select$Select$Styles$getControlBorderRadius(styles)),
					$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$zero),
					dsb ? $Confidenceman02$elm_select$Select$controlDisabled(
					$Confidenceman02$elm_select$Select$Styles$getControlDisabledOpacity(styles)) : $Confidenceman02$elm_select$Select$controlHover(
					A2(
						$Confidenceman02$elm_select$Select$ControlHoverData,
						$Confidenceman02$elm_select$Select$Styles$getControlBackgroundColorHover(styles),
						$Confidenceman02$elm_select$Select$Styles$getControlBorderColor(styles)))
				]),
			controlFocusedStyles);
	});
var $rtfeldman$elm_css$Css$margin4 = $rtfeldman$elm_css$Css$prop4('margin');
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBackgroundColor = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.backgroundColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColor = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.borderColor;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColorFocus = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.borderColorFocus;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBorderRadius = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.borderRadius;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlColor = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.color;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlDisabledOpacity = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.disabledOpacity;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlMinHeight = function (_v0) {
	var config = _v0.a;
	var _v1 = config.control;
	var mc = _v1.a;
	return mc.minHeight;
};
var $Confidenceman02$elm_select$Select$menuControlStyles = F3(
	function (styles, state_, dsb) {
		var controlFocusedStyles = function () {
			var _v0 = state_.controlUiFocused;
			if (_v0.$ === 'Just') {
				return _List_fromArray(
					[
						$Confidenceman02$elm_select$Select$controlBorderFocused(
						$Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColorFocus(styles))
					]);
			} else {
				return _List_Nil;
			}
		}();
		return _Utils_ap(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
					$rtfeldman$elm_css$Css$backgroundColor(
					$Confidenceman02$elm_select$Select$Styles$getMenuControlBackgroundColor(styles)),
					$rtfeldman$elm_css$Css$color(
					$Confidenceman02$elm_select$Select$Styles$getMenuControlColor(styles)),
					$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default),
					$rtfeldman$elm_css$Css$displayFlex,
					$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
					$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$spaceBetween),
					$rtfeldman$elm_css$Css$minHeight(
					$rtfeldman$elm_css$Css$px(
						$Confidenceman02$elm_select$Select$Styles$getMenuControlMinHeight(styles))),
					$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
					$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
					$Confidenceman02$elm_select$Select$controlBorder(
					$Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColor(styles)),
					$Confidenceman02$elm_select$Select$controlRadius(
					$Confidenceman02$elm_select$Select$Styles$getMenuControlBorderRadius(styles)),
					$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$zero),
					dsb ? $Confidenceman02$elm_select$Select$controlDisabled(
					$Confidenceman02$elm_select$Select$Styles$getMenuControlDisabledOpacity(styles)) : $Confidenceman02$elm_select$Select$controlHover(
					A2(
						$Confidenceman02$elm_select$Select$ControlHoverData,
						$Confidenceman02$elm_select$Select$Styles$getMenuControlBackgroundColor(styles),
						$Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColor(styles)))
				]),
			controlFocusedStyles);
	});
var $Confidenceman02$elm_select$Select$viewControlWrapper = function (data) {
	var _v0 = data.state;
	var state_ = _v0.a;
	var resolveControlStyles = function () {
		var _v2 = data.variant;
		if (_v2.$ === 'SingleMenu') {
			return _List_fromArray(
				[
					A4(
					$rtfeldman$elm_css$Css$margin4,
					$rtfeldman$elm_css$Css$px(6),
					$rtfeldman$elm_css$Css$px(6),
					$rtfeldman$elm_css$Css$px(0),
					$rtfeldman$elm_css$Css$px(6)),
					$rtfeldman$elm_css$Css$batch(
					A3($Confidenceman02$elm_select$Select$menuControlStyles, data.menuStyles, state_, data.disabled))
				]);
		} else {
			return A3($Confidenceman02$elm_select$Select$controlStyles, data.controlStyles, state_, data.disabled);
		}
	}();
	return $rtfeldman$elm_css$Html$Styled$div(
		A2(
			$elm$core$List$cons,
			$rtfeldman$elm_css$Html$Styled$Attributes$css(resolveControlStyles),
			data.disabled ? _List_Nil : A2(
				$elm$core$List$cons,
				A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'selectContainer'),
				function () {
					var _v1 = data.variant;
					if (_v1.$ === 'SingleMenu') {
						return $Confidenceman02$elm_select$Select$containerClickedMsg(
							A4($Confidenceman02$elm_select$Select$ContainerClickedMsgData, data.disabled, state_, data.variant, data.searchable));
					} else {
						return _List_Nil;
					}
				}())));
};
var $elm$virtual_dom$VirtualDom$lazy5 = _VirtualDom_lazy5;
var $rtfeldman$elm_css$VirtualDom$Styled$lazyHelp4 = F5(
	function (fn, arg1, arg2, arg3, arg4) {
		return $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled(
			A4(fn, arg1, arg2, arg3, arg4));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$lazy4 = F5(
	function (fn, arg1, arg2, arg3, arg4) {
		return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
			A6($elm$virtual_dom$VirtualDom$lazy5, $rtfeldman$elm_css$VirtualDom$Styled$lazyHelp4, fn, arg1, arg2, arg3, arg4));
	});
var $rtfeldman$elm_css$Html$Styled$Lazy$lazy4 = $rtfeldman$elm_css$VirtualDom$Styled$lazy4;
var $rtfeldman$elm_css$Css$lineHeight = $rtfeldman$elm_css$Css$prop1('line-height');
var $rtfeldman$elm_css$Css$RemUnits = {$: 'RemUnits'};
var $rtfeldman$elm_css$Css$rem = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$RemUnits, 'rem');
var $Confidenceman02$elm_select$Select$Styles$getControlDropdownIndicatorColor = function (_v0) {
	var config = _v0.a;
	return config.dropdownIndicatorColor;
};
var $Confidenceman02$elm_select$Select$Styles$getControlDropdownIndicatorColorHover = function (_v0) {
	var config = _v0.a;
	return config.dropdownIndicatorColorHover;
};
var $Confidenceman02$elm_select$Select$DropdownIcon$view = A2(
	$rtfeldman$elm_css$Svg$Styled$svg,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Svg$Styled$Attributes$height('20'),
			$rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 20 20'),
			$rtfeldman$elm_css$Svg$Styled$Attributes$fill('currentColor')
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Svg$Styled$path,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Svg$Styled$Attributes$d('M6.18 6.845L10 10.747l3.82-3.902L15 8.049l-5 5.106-5-5.106z')
				]),
			_List_Nil)
		]));
var $Confidenceman02$elm_select$Select$dropdownIndicator = F2(
	function (styles, disabledInput) {
		var resolveIconButtonStyles = disabledInput ? _List_fromArray(
			[
				$rtfeldman$elm_css$Css$height(
				$rtfeldman$elm_css$Css$px(20))
			]) : _List_fromArray(
			[
				$rtfeldman$elm_css$Css$height(
				$rtfeldman$elm_css$Css$px(20)),
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
				$rtfeldman$elm_css$Css$color(
				$Confidenceman02$elm_select$Select$Styles$getControlDropdownIndicatorColor(styles)),
				$rtfeldman$elm_css$Css$hover(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$color(
						$Confidenceman02$elm_select$Select$Styles$getControlDropdownIndicatorColorHover(styles))
					]))
			]);
		return A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$displayFlex,
							$rtfeldman$elm_css$Css$batch(resolveIconButtonStyles)
						]))
				]),
			_List_fromArray(
				[$Confidenceman02$elm_select$Select$DropdownIcon$view]));
	});
var $Confidenceman02$elm_select$Select$viewDropdownIndicator = function (data) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css($Confidenceman02$elm_select$Select$indicatorContainerStyles)
			]),
		_List_fromArray(
			[
				A2($Confidenceman02$elm_select$Select$dropdownIndicator, data.controlStyles, data.disabled)
			]));
};
var $Confidenceman02$elm_select$Select$EnterSelect = function (a) {
	return {$: 'EnterSelect', a: a};
};
var $Confidenceman02$elm_select$Select$InputReceivedFocused = function (a) {
	return {$: 'InputReceivedFocused', a: a};
};
var $Confidenceman02$elm_select$Select$KeyboardDown = function (a) {
	return {$: 'KeyboardDown', a: a};
};
var $Confidenceman02$elm_select$Select$KeyboardUp = function (a) {
	return {$: 'KeyboardUp', a: a};
};
var $Confidenceman02$elm_select$Select$OnInputBlurred = function (a) {
	return {$: 'OnInputBlurred', a: a};
};
var $Confidenceman02$elm_select$Select$ToggleMenuAtKey = {$: 'ToggleMenuAtKey'};
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaDescribedby = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-describedby');
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaLabelledby = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-labelledby');
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $Confidenceman02$elm_select$Select$Events$isDownArrow = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, $Confidenceman02$elm_select$Select$Events$DownArrow, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$Events$isEscape = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, $Confidenceman02$elm_select$Select$Events$Escape, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$Events$isUpArrow = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, $Confidenceman02$elm_select$Select$Events$UpArrow, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $rtfeldman$elm_css$Html$Styled$Events$onFocus = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$readonly = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('readOnly');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $rtfeldman$elm_css$VirtualDom$Styled$style = F2(
	function (key, val) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$style, key, val),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$style = $rtfeldman$elm_css$VirtualDom$Styled$style;
var $rtfeldman$elm_css$Html$Styled$Attributes$tabindex = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $Confidenceman02$elm_select$Select$viewDummyInput = function (data) {
	var withLabelledBy = function () {
		var _v3 = data.labelledBy;
		if (_v3.$ === 'Just') {
			var s = _v3.a;
			return _List_fromArray(
				[
					$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaLabelledby(s)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var withAriaDescribedBy = function () {
		var _v2 = data.ariaDescribedBy;
		if (_v2.$ === 'Just') {
			var s = _v2.a;
			return _List_fromArray(
				[
					$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaDescribedby(s)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var whenEnterEvent = function () {
		var _v1 = data.maybeTargetItem;
		if (_v1.$ === 'Just') {
			var menuItem = _v1.a;
			return _List_fromArray(
				[
					$Confidenceman02$elm_select$Select$Events$isEnter(
					$Confidenceman02$elm_select$Select$EnterSelect(menuItem))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var whenArrowEvents = (data.menuOpen && (!data.totalViewableMenuItems)) ? _List_Nil : _List_fromArray(
		[
			$Confidenceman02$elm_select$Select$Events$isDownArrow(
			$Confidenceman02$elm_select$Select$KeyboardDown(data.totalViewableMenuItems)),
			$Confidenceman02$elm_select$Select$Events$isUpArrow(
			$Confidenceman02$elm_select$Select$KeyboardUp(data.totalViewableMenuItems))
		]);
	var resolvePosition = function () {
		var _v0 = data.variant;
		if (_v0.$ === 'SingleMenu') {
			return A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute');
		} else {
			return A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'initial');
		}
	}();
	return A2(
		$rtfeldman$elm_css$Html$Styled$input,
		_Utils_ap(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'label', 'dummyinput'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', '0'),
					resolvePosition,
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border', '0'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', 'inherit'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'outline', '0'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'padding', '0'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '1px'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'transparent'),
					$rtfeldman$elm_css$Html$Styled$Attributes$readonly(true),
					$rtfeldman$elm_css$Html$Styled$Attributes$value(''),
					$rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'dummyInputSelect'),
					$rtfeldman$elm_css$Html$Styled$Attributes$id(data.id),
					$rtfeldman$elm_css$Html$Styled$Events$onFocus(
					$Confidenceman02$elm_select$Select$InputReceivedFocused(
						$Confidenceman02$elm_select$Select$CustomVariant(data.variant))),
					$rtfeldman$elm_css$Html$Styled$Events$onBlur(
					$Confidenceman02$elm_select$Select$OnInputBlurred(
						$Confidenceman02$elm_select$Select$CustomVariant(data.variant))),
					A2(
					$rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
					'keydown',
					A2(
						$elm$json$Json$Decode$map,
						function (msg) {
							return _Utils_Tuple2(msg, true);
						},
						$elm$json$Json$Decode$oneOf(
							_Utils_ap(
								_List_fromArray(
									[
										$Confidenceman02$elm_select$Select$Events$isSpace($Confidenceman02$elm_select$Select$ToggleMenuAtKey),
										$Confidenceman02$elm_select$Select$Events$isEscape($Confidenceman02$elm_select$Select$CloseMenu)
									]),
								_Utils_ap(whenEnterEvent, whenArrowEvents)))))
				]),
			_Utils_ap(withLabelledBy, withAriaDescribedBy)),
		_List_Nil);
};
var $rtfeldman$elm_css$Css$flexShrink = $rtfeldman$elm_css$Css$prop1('flex-shrink');
var $Confidenceman02$elm_select$Select$viewIndicatorWrapper = $rtfeldman$elm_css$Html$Styled$div(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
					$rtfeldman$elm_css$Css$alignSelf($rtfeldman$elm_css$Css$stretch),
					$rtfeldman$elm_css$Css$displayFlex,
					$rtfeldman$elm_css$Css$flexShrink($rtfeldman$elm_css$Css$zero),
					$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox)
				]))
		]));
var $rtfeldman$elm_css$Css$flex = $rtfeldman$elm_css$Css$prop1('flex');
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.value + (' ' + argB.value));
	});
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $rtfeldman$elm_css$Css$static = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'static'};
var $Confidenceman02$elm_select$Select$viewInputWrapper = function (dsbl) {
	var withDisabledStyles = dsbl ? _List_fromArray(
		[
			$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$static)
		]) : _List_Nil;
	return $rtfeldman$elm_css$Html$Styled$div(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_Utils_ap(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$displayFlex,
							$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
							$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
							$rtfeldman$elm_css$Css$flex(
							$rtfeldman$elm_css$Css$int(1)),
							A2(
							$rtfeldman$elm_css$Css$padding2,
							$rtfeldman$elm_css$Css$px(2),
							$rtfeldman$elm_css$Css$px(8)),
							$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$hidden)
						]),
					withDisabledStyles))
			]));
};
var $rtfeldman$elm_css$Css$animationDelay = function (arg) {
	return A2($rtfeldman$elm_css$Css$prop1, 'animation-delay', arg);
};
var $rtfeldman$elm_css$Css$animationDuration = function (arg) {
	return A2($rtfeldman$elm_css$Css$prop1, 'animation-duration', arg);
};
var $rtfeldman$elm_css$Css$Preprocess$WithKeyframes = function (a) {
	return {$: 'WithKeyframes', a: a};
};
var $rtfeldman$elm_css$Css$animationName = function (arg) {
	return ((arg.value === 'none') || ((arg.value === 'inherit') || ((arg.value === 'unset') || (arg.value === 'initial')))) ? A2($rtfeldman$elm_css$Css$prop1, 'animation-name', arg) : $rtfeldman$elm_css$Css$Preprocess$WithKeyframes(arg.value);
};
var $rtfeldman$elm_css$Svg$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classAttribute = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classAttribute, true, cssTemplate);
};
var $rtfeldman$elm_css$Svg$Styled$Attributes$css = $rtfeldman$elm_css$Svg$Styled$Internal$css;
var $rtfeldman$elm_css$Css$Internal$printKeyframeSelector = function (_v0) {
	var percentage = _v0.a;
	var properties = _v0.b;
	var propertiesStr = A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		function (_v1) {
			var prop = _v1.a;
			return prop + ';';
		},
		'',
		properties);
	var percentageStr = $elm$core$String$fromInt(percentage) + '%';
	return percentageStr + ('{' + (propertiesStr + '}'));
};
var $rtfeldman$elm_css$Css$Internal$compileKeyframes = function (tuples) {
	return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Internal$printKeyframeSelector, '', tuples);
};
var $rtfeldman$elm_css$Css$Animations$keyframes = function (tuples) {
	return $elm$core$List$isEmpty(tuples) ? {keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'} : {
		keyframes: $rtfeldman$elm_css$Css$Structure$Compatible,
		none: $rtfeldman$elm_css$Css$Structure$Compatible,
		value: $rtfeldman$elm_css$Css$Internal$compileKeyframes(tuples)
	};
};
var $Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDelay = 0.2;
var $Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDuration = 1;
var $rtfeldman$elm_css$Css$Internal$Property = function (a) {
	return {$: 'Property', a: a};
};
var $rtfeldman$elm_css$Css$Animations$opacity = function (_v0) {
	var value = _v0.value;
	return $rtfeldman$elm_css$Css$Internal$Property('opacity:' + value);
};
var $rtfeldman$elm_css$Css$sec = function (amount) {
	return {
		duration: $rtfeldman$elm_css$Css$Structure$Compatible,
		value: $elm$core$String$fromFloat(amount) + 's'
	};
};
var $rtfeldman$elm_css$Svg$Styled$Attributes$width = $rtfeldman$elm_css$VirtualDom$Styled$attribute('width');
var $Confidenceman02$elm_select$Select$DotLoadingIcon$svgCommonStyles = _List_fromArray(
	[
		$rtfeldman$elm_css$Svg$Styled$Attributes$fill('currentColor'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$width('29'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$height('5'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 32 8')
	]);
var $Confidenceman02$elm_select$Select$DotLoadingIcon$view = A2(
	$rtfeldman$elm_css$Svg$Styled$svg,
	$Confidenceman02$elm_select$Select$DotLoadingIcon$svgCommonStyles,
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Svg$Styled$path,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Svg$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$opacity(
							$rtfeldman$elm_css$Css$num(0)),
							$rtfeldman$elm_css$Css$animationName(
							$rtfeldman$elm_css$Css$Animations$keyframes(
								_List_fromArray(
									[
										_Utils_Tuple2(
										0,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$Animations$opacity(
												$rtfeldman$elm_css$Css$num(0))
											])),
										_Utils_Tuple2(
										33,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$Animations$opacity(
												$rtfeldman$elm_css$Css$num(1))
											]))
									]))),
							$rtfeldman$elm_css$Css$animationDuration(
							$rtfeldman$elm_css$Css$sec($Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDuration)),
							A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
							$rtfeldman$elm_css$Css$animationDelay(
							$rtfeldman$elm_css$Css$sec($Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDelay * 2))
						])),
					$rtfeldman$elm_css$Svg$Styled$Attributes$d('M30.8284 1.17157C32.3905 2.73366 32.3905 5.26633 30.8284 6.82842C29.2663 8.39051 26.7336 8.39051 25.1715 6.82842C23.6094 5.26633 23.6094 2.73366 25.1715 1.17157C26.7336 -0.390523 29.2663 -0.390523 30.8284 1.17157Z')
				]),
			_List_Nil),
			A2(
			$rtfeldman$elm_css$Svg$Styled$path,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Svg$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$opacity(
							$rtfeldman$elm_css$Css$num(0)),
							$rtfeldman$elm_css$Css$animationName(
							$rtfeldman$elm_css$Css$Animations$keyframes(
								_List_fromArray(
									[
										_Utils_Tuple2(
										0,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$Animations$opacity(
												$rtfeldman$elm_css$Css$num(0))
											])),
										_Utils_Tuple2(
										33,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$Animations$opacity(
												$rtfeldman$elm_css$Css$num(1))
											]))
									]))),
							$rtfeldman$elm_css$Css$animationDuration(
							$rtfeldman$elm_css$Css$sec($Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDuration)),
							A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
							$rtfeldman$elm_css$Css$animationDelay(
							$rtfeldman$elm_css$Css$sec($Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDelay))
						])),
					$rtfeldman$elm_css$Svg$Styled$Attributes$d('M18.8285 1.17157C20.3906 2.73366 20.3906 5.26633 18.8285 6.82842C17.2664 8.39051 14.7337 8.39051 13.1716 6.82842C11.6095 5.26633 11.6095 2.73366 13.1716 1.17157C14.7337 -0.390523 17.2664 -0.390523 18.8285 1.17157Z')
				]),
			_List_Nil),
			A2(
			$rtfeldman$elm_css$Svg$Styled$path,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Svg$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$opacity(
							$rtfeldman$elm_css$Css$num(0)),
							$rtfeldman$elm_css$Css$animationName(
							$rtfeldman$elm_css$Css$Animations$keyframes(
								_List_fromArray(
									[
										_Utils_Tuple2(
										0,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$Animations$opacity(
												$rtfeldman$elm_css$Css$num(0))
											])),
										_Utils_Tuple2(
										33,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$Animations$opacity(
												$rtfeldman$elm_css$Css$num(1))
											]))
									]))),
							$rtfeldman$elm_css$Css$animationDuration(
							$rtfeldman$elm_css$Css$sec($Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDuration)),
							A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite')
						])),
					$rtfeldman$elm_css$Svg$Styled$Attributes$d('M6.82848 1.17157C8.39057 2.73366 8.39057 5.26633 6.82848 6.82842C5.26639 8.39051 2.73372 8.39051 1.17163 6.82842C-0.390462 5.26633 -0.390462 2.73366 1.17163 1.17157C2.73372 -0.390523 5.26639 -0.390523 6.82848 1.17157Z')
				]),
			_List_Nil)
		]));
var $Confidenceman02$elm_select$Select$viewLoading = $Confidenceman02$elm_select$Select$DotLoadingIcon$view;
var $Confidenceman02$elm_select$Select$viewLoadingSpinner = function (data) {
	var resolveLoadingSpinner = data.isLoading ? $Confidenceman02$elm_select$Select$viewLoading : $rtfeldman$elm_css$Html$Styled$text('');
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css($Confidenceman02$elm_select$Select$indicatorContainerStyles)
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(data.loadingIndicatorColor),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(20)),
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
							]))
					]),
				_List_fromArray(
					[resolveLoadingSpinner]))
			]));
};
var $Confidenceman02$elm_select$Select$ClearFocusedItem = {$: 'ClearFocusedItem'};
var $Confidenceman02$elm_select$Select$DeselectedMultiItem = function (a) {
	return {$: 'DeselectedMultiItem', a: a};
};
var $Confidenceman02$elm_select$Select$MultiItemMousedown = function (a) {
	return {$: 'MultiItemMousedown', a: a};
};
var $Confidenceman02$elm_select$Select$Tag$Config = function (a) {
	return {$: 'Config', a: a};
};
var $Confidenceman02$elm_select$Select$Tag$dataTestId = F2(
	function (testId, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Tag$Config(
			_Utils_update(
				config,
				{dataTestId: testId}));
	});
var $Confidenceman02$elm_select$Select$Tag$defaults = {
	backgroundColor: $rtfeldman$elm_css$Css$hex('#E1E2EA'),
	borderRadius: 16,
	controlStyles: $Confidenceman02$elm_select$Select$Styles$getControlConfig($Confidenceman02$elm_select$Select$Styles$default),
	dataTestId: 'multiSelectTag',
	onDismiss: $elm$core$Maybe$Nothing,
	onMousedown: $elm$core$Maybe$Nothing,
	onMouseleave: $elm$core$Maybe$Nothing,
	rightMargin: false
};
var $Confidenceman02$elm_select$Select$Tag$default = $Confidenceman02$elm_select$Select$Tag$Config($Confidenceman02$elm_select$Select$Tag$defaults);
var $Confidenceman02$elm_select$Select$Tag$onDismiss = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Tag$Config(
			_Utils_update(
				config,
				{
					onDismiss: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$Tag$onMousedown = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Tag$Config(
			_Utils_update(
				config,
				{
					onMousedown: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$Tag$onMouseleave = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Tag$Config(
			_Utils_update(
				config,
				{
					onMouseleave: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$Tag$rightMargin = F2(
	function (pred, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Tag$Config(
			_Utils_update(
				config,
				{rightMargin: pred}));
	});
var $Confidenceman02$elm_select$Select$Tag$setControlStyles = F2(
	function (cfg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$Tag$Config(
			_Utils_update(
				config,
				{controlStyles: cfg}));
	});
var $rtfeldman$elm_css$Css$display = $rtfeldman$elm_css$Css$prop1('display');
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagBackgroundColor = function (_v0) {
	var config = _v0.a;
	return config.multiTagBackgroundColor;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagBorderRadius = function (_v0) {
	var config = _v0.a;
	return config.multiTagBorderRadius;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagColor = function (_v0) {
	var config = _v0.a;
	return config.multiTagColor;
};
var $rtfeldman$elm_css$Css$inlineBlock = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-block'};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColor = function (_v0) {
	var config = _v0.a;
	return config.multiTagDismissibleBackgroundColor;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColorHover = function (_v0) {
	var config = _v0.a;
	return config.multiTagDismissibleBackgroundColorHover;
};
var $rtfeldman$elm_css$Css$left = $rtfeldman$elm_css$Css$prop1('left');
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $Confidenceman02$elm_select$Select$Tag$viewClear = function (config) {
	var mouseleave = function (onMouseleaveMsg) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$Events$on,
			'mouseleave',
			$elm$json$Json$Decode$succeed(onMouseleaveMsg));
	};
	var mousedown = function (onMousedownMsg) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
			'mousedown',
			A2(
				$elm$json$Json$Decode$map,
				function (msg) {
					return _Utils_Tuple2(msg, true);
				},
				$elm$json$Json$Decode$succeed(onMousedownMsg)));
	};
	var dismiss = function (onDismissMsg) {
		return $rtfeldman$elm_css$Html$Styled$Events$onClick(onDismissMsg);
	};
	var events = A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				A2($elm$core$Maybe$map, dismiss, config.onDismiss),
				A2($elm$core$Maybe$map, mousedown, config.onMousedown),
				A2($elm$core$Maybe$map, mouseleave, config.onMouseleave)
			]));
	var dataAttrib = _List_fromArray(
		[
			A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', config.dataTestId + '-dismiss')
		]);
	return A2(
		$rtfeldman$elm_css$Html$Styled$span,
		A2(
			$elm$core$List$cons,
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$height(
						$rtfeldman$elm_css$Css$pct(100)),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						A2(
						$rtfeldman$elm_css$Css$padding2,
						$rtfeldman$elm_css$Css$px(0),
						$rtfeldman$elm_css$Css$rem(0.375)),
						$rtfeldman$elm_css$Css$marginRight(
						$rtfeldman$elm_css$Css$rem(-0.6625)),
						$rtfeldman$elm_css$Css$marginLeft(
						$rtfeldman$elm_css$Css$rem(-0.225)),
						$rtfeldman$elm_css$Css$color(
						$Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColor(config.controlStyles)),
						$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
						$rtfeldman$elm_css$Css$hover(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(
								$Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColorHover(config.controlStyles))
							]))
					])),
			_Utils_ap(events, dataAttrib)),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
								$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$rtfeldman$elm_css$Css$hex('#FFFFFF')),
								$rtfeldman$elm_css$Css$left(
								$rtfeldman$elm_css$Css$px(10)),
								$rtfeldman$elm_css$Css$top(
								$rtfeldman$elm_css$Css$px(9))
							]))
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(16)),
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$px(16)),
								$rtfeldman$elm_css$Css$zIndex(
								$rtfeldman$elm_css$Css$int(1)),
								$rtfeldman$elm_css$Css$displayFlex
							]))
					]),
				_List_fromArray(
					[$Confidenceman02$elm_select$Select$ClearIcon$view]))
			]));
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagTruncationWidth = function (_v0) {
	var config = _v0.a;
	return config.multiTagTruncationWidth;
};
var $rtfeldman$elm_css$Css$overflowX = $rtfeldman$elm_css$Css$prop1('overflow-x');
var $Confidenceman02$elm_select$Select$Tag$viewTextContent = F2(
	function (config, value) {
		var resolveTruncation = function () {
			var _v0 = $Confidenceman02$elm_select$Select$Styles$getControlMultiTagTruncationWidth(config.controlStyles);
			if (_v0.$ === 'Just') {
				var width = _v0.a;
				return _List_fromArray(
					[
						$rtfeldman$elm_css$Css$textOverflow($rtfeldman$elm_css$Css$ellipsis),
						$rtfeldman$elm_css$Css$overflowX($rtfeldman$elm_css$Css$hidden),
						$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$noWrap),
						$rtfeldman$elm_css$Css$maxWidth(
						$rtfeldman$elm_css$Css$px(width))
					]);
			} else {
				return _List_Nil;
			}
		}();
		return A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(resolveTruncation)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(value)
				]));
	});
var $Confidenceman02$elm_select$Select$Tag$view = F2(
	function (_v0, value) {
		var config = _v0.a;
		var resolveRightMargin = config.rightMargin ? $rtfeldman$elm_css$Css$px(7) : $rtfeldman$elm_css$Css$px(0);
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$rem(0.875)),
							$rtfeldman$elm_css$Css$fontWeight(
							$rtfeldman$elm_css$Css$int(400)),
							$rtfeldman$elm_css$Css$marginRight(resolveRightMargin),
							$rtfeldman$elm_css$Css$color(
							$Confidenceman02$elm_select$Select$Styles$getControlMultiTagColor(config.controlStyles)),
							$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
							A3(
							$rtfeldman$elm_css$Css$border3,
							$rtfeldman$elm_css$Css$px(2),
							$rtfeldman$elm_css$Css$solid,
							$rtfeldman$elm_css$Css$transparent),
							$rtfeldman$elm_css$Css$borderRadius(
							$rtfeldman$elm_css$Css$px(
								$Confidenceman02$elm_select$Select$Styles$getControlMultiTagBorderRadius(config.controlStyles))),
							A2(
							$rtfeldman$elm_css$Css$padding2,
							$rtfeldman$elm_css$Css$px(0),
							$rtfeldman$elm_css$Css$px(9.6)),
							$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
							$rtfeldman$elm_css$Css$backgroundColor(
							$Confidenceman02$elm_select$Select$Styles$getControlMultiTagBackgroundColor(config.controlStyles)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(30)),
							$rtfeldman$elm_css$Css$lineHeight($rtfeldman$elm_css$Css$initial)
						])),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', config.dataTestId)
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$height(
									$rtfeldman$elm_css$Css$pct(100)),
									$rtfeldman$elm_css$Css$displayFlex,
									$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
								]))
						]),
					_List_fromArray(
						[
							A2($Confidenceman02$elm_select$Select$Tag$viewTextContent, config, value),
							$Confidenceman02$elm_select$Select$Tag$viewClear(config)
						]))
				]));
	});
var $Confidenceman02$elm_select$Select$viewMultiValue = F4(
	function (mousedownedItem, styles, index, menuItem) {
		var resolveVariant = $Confidenceman02$elm_select$Select$Tag$default;
		var isMousedowned = function () {
			if (mousedownedItem.$ === 'MultiItemMousedown') {
				var i = mousedownedItem.a;
				return _Utils_eq(i, index);
			} else {
				return false;
			}
		}();
		var resolveMouseleave = function (tagConfig) {
			return isMousedowned ? A2($Confidenceman02$elm_select$Select$Tag$onMouseleave, $Confidenceman02$elm_select$Select$ClearFocusedItem, tagConfig) : tagConfig;
		};
		return A2(
			$Confidenceman02$elm_select$Select$Tag$view,
			resolveMouseleave(
				A2(
					$Confidenceman02$elm_select$Select$Tag$setControlStyles,
					styles,
					A2(
						$Confidenceman02$elm_select$Select$Tag$dataTestId,
						'multi-select-tag-' + $elm$core$String$fromInt(index),
						A2(
							$Confidenceman02$elm_select$Select$Tag$rightMargin,
							true,
							A2(
								$Confidenceman02$elm_select$Select$Tag$onMousedown,
								$Confidenceman02$elm_select$Select$MultiItemMousedown(index),
								A2(
									$Confidenceman02$elm_select$Select$Tag$onDismiss,
									$Confidenceman02$elm_select$Select$DeselectedMultiItem(
										$Confidenceman02$elm_select$Select$unwrapItem(menuItem)),
									resolveVariant)))))),
			$Confidenceman02$elm_select$Select$getMenuItemLabel(menuItem));
	});
var $Confidenceman02$elm_select$Select$SelectInput$Dynamic = {$: 'Dynamic'};
var $Confidenceman02$elm_select$Select$SelectInput$DynamicJsOptimized = function (a) {
	return {$: 'DynamicJsOptimized', a: a};
};
var $Confidenceman02$elm_select$Select$EnterSelectMulti = function (a) {
	return {$: 'EnterSelectMulti', a: a};
};
var $Confidenceman02$elm_select$Select$InputChanged = function (a) {
	return {$: 'InputChanged', a: a};
};
var $Confidenceman02$elm_select$Select$InputEscape = {$: 'InputEscape'};
var $Confidenceman02$elm_select$Select$InputMousedowned = {$: 'InputMousedowned'};
var $Confidenceman02$elm_select$Select$OnMenuInputTabbed = function (a) {
	return {$: 'OnMenuInputTabbed', a: a};
};
var $Confidenceman02$elm_select$Select$SelectInput$Config = function (a) {
	return {$: 'Config', a: a};
};
var $Confidenceman02$elm_select$Select$SelectInput$activeDescendant = F2(
	function (s, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					ariaActiveDescendant: $elm$core$Maybe$Just(s)
				}));
	});
var $Confidenceman02$elm_select$Select$canBeSpaceToggled = F2(
	function (menuOpen, inputValue) {
		return (!menuOpen) && $Confidenceman02$elm_select$Select$isEmptyInputValue(inputValue);
	});
var $Confidenceman02$elm_select$Select$SelectInput$currentValue = F2(
	function (value_, _v0) {
		var config = _v0.a;
		return $elm$core$String$isEmpty(value_) ? $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{currentValue: $elm$core$Maybe$Nothing})) : $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					currentValue: $elm$core$Maybe$Just(value_)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$defaultWidth = 2;
var $Confidenceman02$elm_select$Select$SelectInput$defaults = {
	ariaActiveDescendant: $elm$core$Maybe$Nothing,
	ariaControls: $elm$core$Maybe$Nothing,
	ariaDescribedBy: $elm$core$Maybe$Nothing,
	ariaExpanded: false,
	ariaLabelledBy: $elm$core$Maybe$Nothing,
	currentValue: $elm$core$Maybe$Nothing,
	dataTestId: 'selectInput',
	disabled: false,
	inputSizing: $Confidenceman02$elm_select$Select$SelectInput$Dynamic,
	minWidth: $Confidenceman02$elm_select$Select$SelectInput$defaultWidth,
	onBlur: $elm$core$Maybe$Nothing,
	onFocus: $elm$core$Maybe$Nothing,
	onInput: $elm$core$Maybe$Nothing,
	onMousedown: $elm$core$Maybe$Nothing,
	preventKeydownOn: _Utils_Tuple2(
		_List_Nil,
		function (msg) {
			return _Utils_Tuple2(msg, true);
		})
};
var $Confidenceman02$elm_select$Select$SelectInput$default = $Confidenceman02$elm_select$Select$SelectInput$Config($Confidenceman02$elm_select$Select$SelectInput$defaults);
var $Confidenceman02$elm_select$Select$SelectInput$inputSizing = F2(
	function (width, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{inputSizing: width}));
	});
var $Confidenceman02$elm_select$Select$Events$isTab = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, $Confidenceman02$elm_select$Select$Events$Tab, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$SelectInput$onBlurMsg = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					onBlur: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$onFocusMsg = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					onFocus: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$onInput = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					onInput: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$onMousedown = F2(
	function (msg, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					onMousedown: $elm$core$Maybe$Just(msg)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$preventKeydownOn = F2(
	function (decoders, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{preventKeydownOn: decoders}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaControls = F2(
	function (s, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					ariaControls: $elm$core$Maybe$Just(s)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaDescribedBy = F2(
	function (s, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					ariaDescribedBy: $elm$core$Maybe$Just(s)
				}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaExpanded = F2(
	function (expanded, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{ariaExpanded: expanded}));
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaLabelledBy = F2(
	function (s, _v0) {
		var config = _v0.a;
		return $Confidenceman02$elm_select$Select$SelectInput$Config(
			_Utils_update(
				config,
				{
					ariaLabelledBy: $elm$core$Maybe$Just(s)
				}));
	});
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaActiveDescendant = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-activedescendant');
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaControls = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-controls');
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaExpanded = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-expanded');
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaHasPopup = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-haspopup');
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $Confidenceman02$elm_select$Select$Events$stringAt = function (path) {
	return A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$string);
};
var $Confidenceman02$elm_select$Select$Events$mapAt = F2(
	function (path, msg) {
		return A2(
			$elm$json$Json$Decode$map,
			msg,
			$Confidenceman02$elm_select$Select$Events$stringAt(path));
	});
var $Confidenceman02$elm_select$Select$Events$onInputAt = F2(
	function (path, msg) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$Events$on,
			'input',
			A2($Confidenceman02$elm_select$Select$Events$mapAt, path, msg));
	});
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$role = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('role');
var $rtfeldman$elm_css$Html$Styled$Attributes$size = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'size',
		$elm$core$String$fromInt(n));
};
var $Confidenceman02$elm_select$Select$SelectInput$sizerId = function (sid) {
	return 'kaizen-select-input-sizer-target-' + sid;
};
var $Confidenceman02$elm_select$Select$SelectInput$view = F2(
	function (_v0, id_) {
		var config = _v0.a;
		var withAriaOwns = function () {
			var _v7 = config.ariaControls;
			if (_v7.$ === 'Just') {
				var al = _v7.a;
				return _List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'aria-owns', al)
					]);
			} else {
				return _List_Nil;
			}
		}();
		var withAriaLabelledBy = function () {
			var _v6 = config.ariaLabelledBy;
			if (_v6.$ === 'Just') {
				var s = _v6.a;
				return _List_fromArray(
					[
						$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaLabelledby(s)
					]);
			} else {
				return _List_Nil;
			}
		}();
		var withAriaExpanded = config.ariaExpanded ? _List_fromArray(
			[
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaExpanded('true')
			]) : _List_fromArray(
			[
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaExpanded('false')
			]);
		var withAriaDescribedBy = function () {
			var _v5 = config.ariaDescribedBy;
			if (_v5.$ === 'Just') {
				var s = _v5.a;
				return _List_fromArray(
					[
						$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaDescribedby(s)
					]);
			} else {
				return _List_Nil;
			}
		}();
		var withAriaControls = function () {
			var _v4 = config.ariaControls;
			if (_v4.$ === 'Just') {
				var s = _v4.a;
				return _List_fromArray(
					[
						$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaControls(s)
					]);
			} else {
				return _List_Nil;
			}
		}();
		var withAriaActiveDescendant = function () {
			var _v3 = config.ariaActiveDescendant;
			if (_v3.$ === 'Just') {
				var s = _v3.a;
				return _List_fromArray(
					[
						$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaActiveDescendant(s)
					]);
			} else {
				return _List_Nil;
			}
		}();
		var sizerStyles = _List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '0px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '0px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'visibility', 'hidden'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '0px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'overflow', 'scroll'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'white-space', 'pre'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '16px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-style', 'normal'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-family', 'Arial'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'letter-spacing', 'normal'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-transform', 'none')
			]);
		var resolveSizerId = $Confidenceman02$elm_select$Select$SelectInput$sizerId(id_);
		var resolveInputId = id_;
		var preventOn = A2(
			$rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				config.preventKeydownOn.b,
				$elm$json$Json$Decode$oneOf(config.preventKeydownOn.a)));
		var mousedown = function (_v2) {
			var msg = _v2.a;
			var stopProp = _v2.b;
			return A2(
				$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
				'mousedown',
				A2(
					$elm$json$Json$Decode$map,
					stopProp,
					$elm$json$Json$Decode$succeed(msg)));
		};
		var input_ = function (changeMsg) {
			return A2(
				$Confidenceman02$elm_select$Select$Events$onInputAt,
				_List_fromArray(
					['target', 'value']),
				changeMsg);
		};
		var inputValue = A2($elm$core$Maybe$withDefault, '', config.currentValue);
		var focus = function (focusMsg) {
			return $rtfeldman$elm_css$Html$Styled$Events$onFocus(focusMsg);
		};
		var buildDynamicSelectInputProps = A2(
			$elm$json$Json$Encode$encode,
			0,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'sizerId',
						$elm$json$Json$Encode$string(resolveSizerId)),
						_Utils_Tuple2(
						'defaultInputWidth',
						$elm$json$Json$Encode$int($Confidenceman02$elm_select$Select$SelectInput$defaultWidth))
					])));
		var inputWidthStyle = function () {
			var _v1 = config.inputSizing;
			if (_v1.$ === 'Dynamic') {
				return $elm$core$String$isEmpty(inputValue) ? _List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$size(1)
					]) : _List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$size(
						$elm$core$String$length(inputValue) + config.minWidth)
					]);
			} else {
				if (_v1.a) {
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$Attributes$style,
							'width',
							$elm$core$String$fromInt(config.minWidth) + 'px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-es-dynamic-select-input', buildDynamicSelectInputProps)
						]);
				} else {
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$Attributes$style,
							'width',
							$elm$core$String$fromInt(config.minWidth) + 'px')
						]);
				}
			}
		}();
		var inputStyles = _Utils_ap(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'box-sizing', 'content-box'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', '0px center'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border', '0px'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', 'inherit'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'outline', '0px'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'padding', '0px'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'inherit')
				]),
			inputWidthStyle);
		var blur = function (blurMsg) {
			return $rtfeldman$elm_css$Html$Styled$Events$onBlur(blurMsg);
		};
		var events = config.disabled ? _List_Nil : _Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2($elm$core$Maybe$map, input_, config.onInput),
						A2($elm$core$Maybe$map, blur, config.onBlur),
						A2($elm$core$Maybe$map, focus, config.onFocus),
						A2($elm$core$Maybe$map, mousedown, config.onMousedown)
					])),
			_List_fromArray(
				[preventOn]));
		var autoSizeInputContainerStyles = _List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'padding-bottom', '2px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'padding-top', '2px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'box-sizing', 'border-box'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'margin', '2px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'inline'),
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$role('combobox'),
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaHasPopup('listbox')
			]);
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_Utils_ap(
				autoSizeInputContainerStyles,
				_Utils_ap(withAriaOwns, withAriaExpanded)),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$input,
					_Utils_ap(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$id(resolveInputId),
								$rtfeldman$elm_css$Html$Styled$Attributes$value(inputValue),
								$rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
								$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$role('textbox'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'aria-multiline', 'false'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'aria-autocomplete', 'list'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'autocomplete', 'off'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', config.dataTestId)
							]),
						_Utils_ap(
							events,
							_Utils_ap(
								inputStyles,
								_Utils_ap(
									withAriaActiveDescendant,
									_Utils_ap(
										withAriaControls,
										_Utils_ap(withAriaLabelledBy, withAriaDescribedBy)))))),
					_List_Nil),
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					A2(
						$elm$core$List$cons,
						$rtfeldman$elm_css$Html$Styled$Attributes$id(
							$Confidenceman02$elm_select$Select$SelectInput$sizerId(id_)),
						sizerStyles),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(inputValue)
						]))
				]));
	});
var $Confidenceman02$elm_select$Select$viewSelectInput = function (data) {
	var whenArrowEvents = (data.state.menuOpen && (!data.totalViewableMenuItems)) ? _List_Nil : _List_fromArray(
		[
			$Confidenceman02$elm_select$Select$Events$isDownArrow(
			$Confidenceman02$elm_select$Select$KeyboardDown(data.totalViewableMenuItems)),
			$Confidenceman02$elm_select$Select$Events$isUpArrow(
			$Confidenceman02$elm_select$Select$KeyboardUp(data.totalViewableMenuItems))
		]);
	var stopProp = function () {
		var _v8 = data.variant;
		if (_v8.$ === 'SingleMenu') {
			return function (msg) {
				return _Utils_Tuple2(msg, true);
			};
		} else {
			return function (msg) {
				return _Utils_Tuple2(msg, false);
			};
		}
	}();
	var spaceKeydownDecoder = function (decoders) {
		return A2($Confidenceman02$elm_select$Select$canBeSpaceToggled, data.state.menuOpen, data.state.inputValue) ? A2(
			$elm$core$List$cons,
			$Confidenceman02$elm_select$Select$Events$isSpace($Confidenceman02$elm_select$Select$ToggleMenuAtKey),
			decoders) : decoders;
	};
	var resolveInputWidth = function (selectInputConfig) {
		return data.state.jsOptimize ? A2(
			$Confidenceman02$elm_select$Select$SelectInput$inputSizing,
			$Confidenceman02$elm_select$Select$SelectInput$DynamicJsOptimized(
				_Utils_eq(
					data.state.controlUiFocused,
					$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Internal$ControlInput))),
			selectInputConfig) : A2($Confidenceman02$elm_select$Select$SelectInput$inputSizing, $Confidenceman02$elm_select$Select$SelectInput$Dynamic, selectInputConfig);
	};
	var resolveInputValue = A2($elm$core$Maybe$withDefault, '', data.state.inputValue);
	var resolveEnterMsg = function (mi) {
		var _v7 = data.variant;
		if (_v7.$ === 'Multi') {
			return $Confidenceman02$elm_select$Select$EnterSelectMulti(mi);
		} else {
			return $Confidenceman02$elm_select$Select$EnterSelect(mi);
		}
	};
	var resolveAriaLabelledBy = function (config) {
		var _v6 = data.labelledBy;
		if (_v6.$ === 'Just') {
			var s = _v6.a;
			return A2($Confidenceman02$elm_select$Select$SelectInput$setAriaLabelledBy, s, config);
		} else {
			return config;
		}
	};
	var resolveAriaExpanded = function (config) {
		return A2($Confidenceman02$elm_select$Select$SelectInput$setAriaExpanded, data.state.menuOpen, config);
	};
	var resolveAriaDescribedBy = function (config) {
		var _v5 = data.ariaDescribedBy;
		if (_v5.$ === 'Just') {
			var s = _v5.a;
			return A2($Confidenceman02$elm_select$Select$SelectInput$setAriaDescribedBy, s, config);
		} else {
			return config;
		}
	};
	var resolveAriaControls = function (config) {
		return A2(
			$Confidenceman02$elm_select$Select$SelectInput$setAriaControls,
			$Confidenceman02$elm_select$Select$menuListId(data.state.selectId),
			config);
	};
	var resolveAriaActiveDescendant = function (config) {
		var _v4 = data.maybeActiveTarget;
		if (_v4.$ === 'Just') {
			return A2(
				$Confidenceman02$elm_select$Select$SelectInput$activeDescendant,
				A2($Confidenceman02$elm_select$Select$menuItemId, data.state.selectId, data.state.activeTargetIndex),
				config);
		} else {
			return config;
		}
	};
	var preventDefault = function (msg) {
		if (msg.$ === 'OnMenuInputTabbed') {
			return _Utils_Tuple2(msg, false);
		} else {
			return _Utils_Tuple2(msg, true);
		}
	};
	var enterKeydownDecoder = function () {
		var _v2 = data.maybeActiveTarget;
		if (_v2.$ === 'Just') {
			var mi = _v2.a;
			return _List_fromArray(
				[
					$Confidenceman02$elm_select$Select$Events$isEnter(
					resolveEnterMsg(mi))
				]);
		} else {
			return _List_Nil;
		}
	}();
	var clearButtonVisible = $Confidenceman02$elm_select$Select$showClearButton(
		A4(
			$Confidenceman02$elm_select$Select$ShowClearButtonData,
			$Confidenceman02$elm_select$Select$CustomVariant(data.variant),
			data.disabled,
			data.clearable,
			data.state));
	var tabKeydownDecoder = function (decoders) {
		var _v1 = data.variant;
		if (_v1.$ === 'SingleMenu') {
			return A2(
				$elm$core$List$cons,
				$Confidenceman02$elm_select$Select$Events$isTab(
					$Confidenceman02$elm_select$Select$OnMenuInputTabbed(clearButtonVisible)),
				decoders);
		} else {
			return decoders;
		}
	};
	var _v0 = data.state.selectId;
	var selectId = _v0.a;
	return A2(
		$Confidenceman02$elm_select$Select$SelectInput$view,
		A3(
			$elm$core$Basics$apL,
			$Confidenceman02$elm_select$Select$SelectInput$preventKeydownOn,
			_Utils_Tuple2(
				_Utils_ap(
					tabKeydownDecoder(
						spaceKeydownDecoder(enterKeydownDecoder)),
					A2(
						$elm$core$List$cons,
						$Confidenceman02$elm_select$Select$Events$isEscape($Confidenceman02$elm_select$Select$InputEscape),
						whenArrowEvents)),
				preventDefault),
			resolveAriaExpanded(
				resolveAriaDescribedBy(
					resolveAriaLabelledBy(
						resolveAriaControls(
							resolveAriaActiveDescendant(
								resolveInputWidth(
									A2(
										$Confidenceman02$elm_select$Select$SelectInput$onMousedown,
										_Utils_Tuple2($Confidenceman02$elm_select$Select$InputMousedowned, stopProp),
										A2(
											$Confidenceman02$elm_select$Select$SelectInput$currentValue,
											resolveInputValue,
											A2(
												$Confidenceman02$elm_select$Select$SelectInput$onFocusMsg,
												$Confidenceman02$elm_select$Select$InputReceivedFocused(
													$Confidenceman02$elm_select$Select$CustomVariant(data.variant)),
												A2(
													$Confidenceman02$elm_select$Select$SelectInput$onBlurMsg,
													$Confidenceman02$elm_select$Select$OnInputBlurred(
														$Confidenceman02$elm_select$Select$CustomVariant(data.variant)),
													A2($Confidenceman02$elm_select$Select$SelectInput$onInput, $Confidenceman02$elm_select$Select$InputChanged, $Confidenceman02$elm_select$Select$SelectInput$default)))))))))))),
		selectId);
};
var $Confidenceman02$elm_select$Select$viewCustomControl = function (data) {
	var menuStyles = $Confidenceman02$elm_select$Select$Styles$getMenuConfig(data.styles);
	var _v0 = data.state;
	var state_ = _v0.a;
	var buildInput = (!data.disabled) ? (data.searchable ? A2(
		$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
		$Confidenceman02$elm_select$Select$viewSelectInput,
		A8($Confidenceman02$elm_select$Select$ViewSelectInputData, data.enterSelectTargetItem, data.totalMenuItems, data.variant, data.labelledBy, data.ariaDescribedBy, data.disabled, data.clearable, state_)) : A2(
		$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
		$Confidenceman02$elm_select$Select$viewDummyInput,
		$Confidenceman02$elm_select$Select$ViewDummyInputData(
			$Confidenceman02$elm_select$Select$getSelectId(data.state))(data.variant)(data.enterSelectTargetItem)(data.totalMenuItems)(state_.menuOpen)(data.labelledBy)(data.ariaDescribedBy)(data.disabled)(data.clearable)(state_))) : $rtfeldman$elm_css$Html$Styled$text('');
	var buildVariantInput = function () {
		var _v1 = data.variant;
		switch (_v1.$) {
			case 'Multi':
				var multiSelectedValues = _v1.a;
				var resolveMultiValueStyles = (0 < $elm$core$List$length(multiSelectedValues)) ? _List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$marginRight(
								$rtfeldman$elm_css$Css$rem(0.4375)),
								$rtfeldman$elm_css$Css$lineHeight(
								$rtfeldman$elm_css$Css$num(1.9))
							]))
					]) : _List_Nil;
				return A3(
					$rtfeldman$elm_css$Html$Styled$Keyed$node,
					'div',
					resolveMultiValueStyles,
					_Utils_ap(
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (ix, i) {
									return _Utils_Tuple2(
										'selected-item-' + $elm$core$String$fromInt(ix),
										A5($rtfeldman$elm_css$Html$Styled$Lazy$lazy4, $Confidenceman02$elm_select$Select$viewMultiValue, state_.initialAction, data.controlStyles, ix, i));
								}),
							multiSelectedValues),
						_List_fromArray(
							[
								_Utils_Tuple2('built-input', buildInput)
							])));
			case 'Single':
				return buildInput;
			default:
				return buildInput;
		}
	}();
	var resolvePlaceholder = $Confidenceman02$elm_select$Select$buildPlaceholder(
		A4($Confidenceman02$elm_select$Select$BuildPlaceholderData, data.variant, state_, data.controlStyles, data.placeholder));
	return A2(
		$Confidenceman02$elm_select$Select$viewControlWrapper,
		A6($Confidenceman02$elm_select$Select$ViewControlWrapperData, data.disabled, data.state, data.controlStyles, menuStyles, data.variant, data.searchable),
		_List_fromArray(
			[
				A2(
				$Confidenceman02$elm_select$Select$viewInputWrapper,
				data.disabled,
				_List_fromArray(
					[buildVariantInput, resolvePlaceholder])),
				$Confidenceman02$elm_select$Select$viewIndicatorWrapper(
				_List_fromArray(
					[
						$Confidenceman02$elm_select$Select$viewClearIndicator(
						A5(
							$Confidenceman02$elm_select$Select$ViewClearIndicatorData,
							data.disabled,
							data.clearable,
							$Confidenceman02$elm_select$Select$CustomVariant(data.variant),
							data.state,
							data.styles)),
						$Confidenceman02$elm_select$Select$viewLoadingSpinner(
						A2(
							$Confidenceman02$elm_select$Select$ViewLoadingSpinnerData,
							data.loading,
							$Confidenceman02$elm_select$Select$Styles$getControlLoadingIndicatorColor(data.controlStyles))),
						$Confidenceman02$elm_select$Select$indicatorSeparator(data.controlStyles),
						$Confidenceman02$elm_select$Select$viewDropdownIndicator(
						A2($Confidenceman02$elm_select$Select$ViewDropdownIndicatorData, data.disabled, data.controlStyles))
					]))
			]));
};
var $Confidenceman02$elm_select$Select$Styles$getMenuMaxHeight = function (_v0) {
	var config = _v0.a;
	var _v1 = config.maxHeight;
	if (_v1.$ === 'Px') {
		var u = _v1.a;
		return u.value;
	} else {
		var u = _v1.a;
		return u.value;
	}
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBorderWidth = function (_v0) {
	var config = _v0.a;
	return config.borderWidth;
};
var $Confidenceman02$elm_select$Select$menuWrapperBorderStyle = function (menuConfig) {
	return _List_fromArray(
		[
			A3(
			$rtfeldman$elm_css$Css$border3,
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuBorderWidth(menuConfig)),
			$rtfeldman$elm_css$Css$solid,
			$rtfeldman$elm_css$Css$transparent)
		]);
};
var $rtfeldman$elm_css$Css$overflowY = $rtfeldman$elm_css$Css$prop1('overflow-y');
var $rtfeldman$elm_css$Css$paddingLeft = $rtfeldman$elm_css$Css$prop1('padding-left');
var $Confidenceman02$elm_select$Select$menuListStyles = function (styles) {
	return _Utils_ap(
		$Confidenceman02$elm_select$Select$menuWrapperBorderStyle(styles),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Css$property,
				'max-height',
				$Confidenceman02$elm_select$Select$Styles$getMenuMaxHeight(styles)),
				$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$auto),
				$rtfeldman$elm_css$Css$paddingLeft(
				$rtfeldman$elm_css$Css$px(0)),
				$rtfeldman$elm_css$Css$marginBottom(
				$rtfeldman$elm_css$Css$px(8))
			]));
};
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $Confidenceman02$elm_select$Select$viewLoadingMenu = function (data) {
	var variantStyles = function () {
		var _v0 = data.variant;
		if (_v0.$ === 'SingleMenu') {
			return _List_Nil;
		} else {
			return _Utils_ap(
				$Confidenceman02$elm_select$Select$menuWrapperStyles(data.menuStyles),
				$Confidenceman02$elm_select$Select$menuListStyles(data.menuStyles));
		}
	}();
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$color(
						A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.5)),
						$rtfeldman$elm_css$Css$batch(variantStyles)
					]))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(data.loadingText)
			]));
};
var $Confidenceman02$elm_select$Select$BuildMenuItemData = F8(
	function (menuItemStyles, selectId, variant, initialAction, activeTargetIndex, menuNavigation, disabled, controlUiFocused) {
		return {activeTargetIndex: activeTargetIndex, controlUiFocused: controlUiFocused, disabled: disabled, initialAction: initialAction, menuItemStyles: menuItemStyles, menuNavigation: menuNavigation, selectId: selectId, variant: variant};
	});
var $Confidenceman02$elm_select$Select$ViewMenuItemData = function (index) {
	return function (itemSelected) {
		return function (isClickFocused) {
			return function (menuItemIsTarget) {
				return function (selectId) {
					return function (menuItem) {
						return function (menuNavigation) {
							return function (initialAction) {
								return function (variant) {
									return function (menuItemStyles) {
										return function (disabled) {
											return function (controlUiFocused) {
												return {controlUiFocused: controlUiFocused, disabled: disabled, index: index, initialAction: initialAction, isClickFocused: isClickFocused, itemSelected: itemSelected, menuItem: menuItem, menuItemIsTarget: menuItemIsTarget, menuItemStyles: menuItemStyles, menuNavigation: menuNavigation, selectId: selectId, variant: variant};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $Confidenceman02$elm_select$Select$isMenuItemClickFocused = F2(
	function (initialAction, i) {
		if (initialAction.$ === 'MenuItemMousedown') {
			var _int = initialAction.a;
			return _Utils_eq(_int, i);
		} else {
			return false;
		}
	});
var $Confidenceman02$elm_select$Select$isSelected = F2(
	function (menuItem, maybeSelectedItem) {
		if (maybeSelectedItem.$ === 'Just') {
			var item = maybeSelectedItem.a;
			return _Utils_eq(
				$Confidenceman02$elm_select$Select$unwrapItem(item),
				$Confidenceman02$elm_select$Select$unwrapItem(menuItem));
		} else {
			return false;
		}
	});
var $Confidenceman02$elm_select$Select$isTarget = F2(
	function (activeTargetIndex, i) {
		return _Utils_eq(activeTargetIndex, i);
	});
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $rtfeldman$elm_css$VirtualDom$Styled$lazyHelp2 = F3(
	function (fn, arg1, arg2) {
		return $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled(
			A2(fn, arg1, arg2));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$lazy2 = F3(
	function (fn, arg1, arg2) {
		return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
			A4($elm$virtual_dom$VirtualDom$lazy3, $rtfeldman$elm_css$VirtualDom$Styled$lazyHelp2, fn, arg1, arg2));
	});
var $rtfeldman$elm_css$Html$Styled$Lazy$lazy2 = $rtfeldman$elm_css$VirtualDom$Styled$lazy2;
var $Confidenceman02$elm_select$Select$HoverFocused = function (a) {
	return {$: 'HoverFocused', a: a};
};
var $Confidenceman02$elm_select$Select$MenuItemClickFocus = function (a) {
	return {$: 'MenuItemClickFocus', a: a};
};
var $Confidenceman02$elm_select$Select$SelectedItem = function (a) {
	return {$: 'SelectedItem', a: a};
};
var $Confidenceman02$elm_select$Select$SelectedItemMulti = function (a) {
	return {$: 'SelectedItemMulti', a: a};
};
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaSelected = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-selected');
var $rtfeldman$elm_css$Html$Styled$li = $rtfeldman$elm_css$Html$Styled$node('li');
var $rtfeldman$elm_css$Css$block = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'block'};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorClicked = function (_v0) {
	var config = _v0.a;
	return config.backgroundColorClicked;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorNotSelected = function (_v0) {
	var config = _v0.a;
	return config.backgroundColorNotSelected;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorSelected = function (_v0) {
	var config = _v0.a;
	return config.backgroundColorSelected;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBlockPadding = function (_v0) {
	var config = _v0.a;
	return config.blockPadding;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBorderRadius = function (_v0) {
	var config = _v0.a;
	return config.borderRadius;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemColor = function (_v0) {
	var config = _v0.a;
	return config.color;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverNotSelected = function (_v0) {
	var config = _v0.a;
	return config.colorHoverNotSelected;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverSelected = function (_v0) {
	var config = _v0.a;
	return config.colorHoverSelected;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemInlinePadding = function (_v0) {
	var config = _v0.a;
	return config.inlinePadding;
};
var $Confidenceman02$elm_select$Select$menuItemContainerStyles = function (data) {
	var withTargetStyles = function () {
		var _v0 = data.controlUiFocused;
		if (_v0.$ === 'Just') {
			return (data.menuItemIsTarget && (!data.itemSelected)) ? _List_fromArray(
				[
					$rtfeldman$elm_css$Css$color(
					$Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverNotSelected(data.menuItemStyles)),
					$rtfeldman$elm_css$Css$backgroundColor(
					$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorNotSelected(data.menuItemStyles))
				]) : _List_Nil;
		} else {
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$hover(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$color(
							$Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverNotSelected(data.menuItemStyles)),
							$rtfeldman$elm_css$Css$backgroundColor(
							$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorNotSelected(data.menuItemStyles))
						]))
				]);
		}
	}();
	var withIsSelectedStyles = data.itemSelected ? _List_fromArray(
		[
			$rtfeldman$elm_css$Css$backgroundColor(
			$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorSelected(data.menuItemStyles)),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$color(
					$Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverSelected(data.menuItemStyles))
				]))
		]) : _List_Nil;
	var withIsClickedStyles = data.isClickFocused ? _List_fromArray(
		[
			$rtfeldman$elm_css$Css$backgroundColor(
			$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorClicked(data.menuItemStyles))
		]) : _List_Nil;
	var allStyles = data.disabled ? _List_fromArray(
		[
			$Confidenceman02$elm_select$Select$controlDisabled(0.3)
		]) : _Utils_ap(
		withTargetStyles,
		_Utils_ap(withIsClickedStyles, withIsSelectedStyles));
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default),
			$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block),
			$rtfeldman$elm_css$Css$fontSize($rtfeldman$elm_css$Css$inherit),
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(100)),
			A2($rtfeldman$elm_css$Css$property, 'user-select', 'none'),
			$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuItemBorderRadius(data.menuItemStyles))),
			A2(
			$rtfeldman$elm_css$Css$padding2,
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuItemBlockPadding(data.menuItemStyles)),
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuItemInlinePadding(data.menuItemStyles))),
			$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$none),
			$rtfeldman$elm_css$Css$color(
			$Confidenceman02$elm_select$Select$Styles$getMenuItemColor(data.menuItemStyles)),
			$rtfeldman$elm_css$Css$batch(allStyles)
		]);
};
var $Confidenceman02$elm_select$Select$viewMenuItem = F2(
	function (data, content) {
		var resolveSelectedAriaAttribs = data.itemSelected ? _List_fromArray(
			[
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaSelected('true')
			]) : _List_fromArray(
			[
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaSelected('false')
			]);
		var resolvePosinsetAriaAttrib = _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$Attributes$attribute,
				'aria-posinset',
				$elm$core$String$fromInt(data.index + 1))
			]);
		var resolveMouseover = function () {
			var _v2 = data.controlUiFocused;
			if (_v2.$ === 'Just') {
				return _List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$Events$on,
						'mouseover',
						$elm$json$Json$Decode$succeed(
							$Confidenceman02$elm_select$Select$HoverFocused(data.index)))
					]);
			} else {
				return _List_Nil;
			}
		}();
		var resolveMouseUpMsg = function () {
			var _v1 = data.variant;
			if (_v1.$ === 'Multi') {
				return $Confidenceman02$elm_select$Select$SelectedItemMulti(
					$Confidenceman02$elm_select$Select$unwrapItem(data.menuItem));
			} else {
				return $Confidenceman02$elm_select$Select$SelectedItem(
					$Confidenceman02$elm_select$Select$unwrapItem(data.menuItem));
			}
		}();
		var resolveMouseUp = function () {
			var _v0 = data.initialAction;
			if (_v0.$ === 'MenuItemMousedown') {
				return _List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$Events$on,
						'mouseup',
						$elm$json$Json$Decode$succeed(resolveMouseUpMsg))
					]);
			} else {
				return _List_Nil;
			}
		}();
		var resolveMouseLeave = data.isClickFocused ? _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$Events$on,
				'mouseleave',
				$elm$json$Json$Decode$succeed($Confidenceman02$elm_select$Select$ClearFocusedItem))
			]) : _List_Nil;
		var resolveDataTestId = data.menuItemIsTarget ? _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$Attributes$attribute,
				'data-test-id',
				'listBoxItemTargetFocus' + $elm$core$String$fromInt(data.index))
			]) : _List_Nil;
		var allEvents = data.disabled ? _List_Nil : A2(
			$elm$core$List$cons,
			A2(
				$rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
				'mousedown',
				A2(
					$elm$json$Json$Decode$map,
					function (msg) {
						return _Utils_Tuple2(msg, true);
					},
					$elm$json$Json$Decode$succeed(
						$Confidenceman02$elm_select$Select$MenuItemClickFocus(data.index)))),
			_Utils_ap(
				resolveMouseLeave,
				_Utils_ap(resolveMouseUp, resolveMouseover)));
		return A2(
			$rtfeldman$elm_css$Html$Styled$li,
			_Utils_ap(
				_List_fromArray(
					[
						$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$role('option'),
						$rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1),
						$rtfeldman$elm_css$Html$Styled$Attributes$id(
						A2($Confidenceman02$elm_select$Select$menuItemId, data.selectId, data.index)),
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						$Confidenceman02$elm_select$Select$menuItemContainerStyles(data))
					]),
				_Utils_ap(
					resolveDataTestId,
					_Utils_ap(
						resolveSelectedAriaAttribs,
						_Utils_ap(resolvePosinsetAriaAttrib, allEvents)))),
			content);
	});
var $Confidenceman02$elm_select$Select$buildMenuItem = F3(
	function (data, idx, item) {
		var resolveIsSelected = A2(
			$Confidenceman02$elm_select$Select$isSelected,
			item,
			function () {
				var _v2 = data.variant;
				switch (_v2.$) {
					case 'Single':
						var maybeItem = _v2.a;
						return maybeItem;
					case 'SingleMenu':
						var maybeItem = _v2.a;
						return maybeItem;
					default:
						return $elm$core$Maybe$Nothing;
				}
			}());
		var maybeIndividualStyles = function () {
			if (item.$ === 'Basic') {
				var cfg = item.a;
				return cfg.styles;
			} else {
				var cfg = item.a;
				return cfg.styles;
			}
		}();
		if (item.$ === 'Basic') {
			return _Utils_Tuple2(
				$Confidenceman02$elm_select$Select$getMenuItemLabel(item),
				A3(
					$rtfeldman$elm_css$Html$Styled$Lazy$lazy2,
					$Confidenceman02$elm_select$Select$viewMenuItem,
					$Confidenceman02$elm_select$Select$ViewMenuItemData(idx)(resolveIsSelected)(
						A2($Confidenceman02$elm_select$Select$isMenuItemClickFocused, data.initialAction, idx))(
						A2($Confidenceman02$elm_select$Select$isTarget, data.activeTargetIndex, idx))(data.selectId)(item)(data.menuNavigation)(data.initialAction)(data.variant)(
						A2($elm$core$Maybe$withDefault, data.menuItemStyles, maybeIndividualStyles))(data.disabled)(data.controlUiFocused),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							$Confidenceman02$elm_select$Select$getMenuItemLabel(item))
						])));
		} else {
			var ci = item.a;
			return _Utils_Tuple2(
				$Confidenceman02$elm_select$Select$getMenuItemLabel(item),
				A3(
					$rtfeldman$elm_css$Html$Styled$Lazy$lazy2,
					$Confidenceman02$elm_select$Select$viewMenuItem,
					$Confidenceman02$elm_select$Select$ViewMenuItemData(idx)(resolveIsSelected)(
						A2($Confidenceman02$elm_select$Select$isMenuItemClickFocused, data.initialAction, idx))(
						A2($Confidenceman02$elm_select$Select$isTarget, data.activeTargetIndex, idx))(data.selectId)(item)(data.menuNavigation)(data.initialAction)(data.variant)(
						A2($elm$core$Maybe$withDefault, data.menuItemStyles, maybeIndividualStyles))(data.disabled)(data.controlUiFocused),
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$map, $elm$core$Basics$never, ci.view)
						])));
		}
	});
var $Confidenceman02$elm_select$Select$getGroup = function (mi) {
	if (mi.$ === 'Basic') {
		var cfg = mi.a;
		return cfg.group;
	} else {
		var cfg = mi.a;
		return cfg.group;
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $Confidenceman02$elm_select$Select$sortMenuItemsHelp = function () {
	var updateGroupedItem = F3(
		function (g, mi, maybeItems) {
			if (maybeItems.$ === 'Just') {
				var i = maybeItems.a;
				return $elm$core$Maybe$Just(
					A2(
						$elm$core$Tuple$mapFirst,
						function (acc) {
							return _Utils_ap(
								acc,
								_List_fromArray(
									[mi]));
						},
						i));
			} else {
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						_List_fromArray(
							[mi]),
						g));
			}
		});
	var sort = F3(
		function (idx, items, accum) {
			sort:
			while (true) {
				if (!items.b) {
					return accum;
				} else {
					if (!items.b.b) {
						var head = items.a;
						var _v1 = $Confidenceman02$elm_select$Select$getGroup(head);
						if (_v1.$ === 'Just') {
							var g = _v1.a;
							return A2(
								$elm$core$Tuple$mapSecond,
								A2(
									$elm$core$Dict$update,
									g.name,
									A2(updateGroupedItem, g, head)),
								accum);
						} else {
							return A2(
								$elm$core$Tuple$mapFirst,
								function (it) {
									return _Utils_ap(
										it,
										_List_fromArray(
											[head]));
								},
								accum);
						}
					} else {
						var head = items.a;
						var rest = items.b;
						var _v2 = $Confidenceman02$elm_select$Select$getGroup(head);
						if (_v2.$ === 'Just') {
							var g = _v2.a;
							var $temp$idx = idx + 1,
								$temp$items = rest,
								$temp$accum = A2(
								$elm$core$Tuple$mapSecond,
								A2(
									$elm$core$Dict$update,
									g.name,
									A2(updateGroupedItem, g, head)),
								accum);
							idx = $temp$idx;
							items = $temp$items;
							accum = $temp$accum;
							continue sort;
						} else {
							var $temp$idx = idx + 1,
								$temp$items = rest,
								$temp$accum = A2(
								$elm$core$Tuple$mapFirst,
								function (it) {
									return _Utils_ap(
										it,
										_List_fromArray(
											[head]));
								},
								accum);
							idx = $temp$idx;
							items = $temp$items;
							accum = $temp$accum;
							continue sort;
						}
					}
				}
			}
		});
	return sort;
}();
var $rtfeldman$elm_css$Css$EmUnits = {$: 'EmUnits'};
var $rtfeldman$elm_css$Css$em = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$EmUnits, 'em');
var $Confidenceman02$elm_select$Select$Styles$getGroupColor = function (_v0) {
	var config = _v0.a;
	return config.color;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupFontSizeLabel = function (_v0) {
	var config = _v0.a;
	return config.fontSizeLabel;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupFontWeightLabel = function (_v0) {
	var config = _v0.a;
	return config.fontWeightLabel;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupTextTransformationLabel = function (_v0) {
	var config = _v0.a;
	return config.textTransformationLabel;
};
var $rtfeldman$elm_css$Css$paddingRight = $rtfeldman$elm_css$Css$prop1('padding-right');
var $Confidenceman02$elm_select$Select$viewSectionLabel = F2(
	function (styles, g) {
		return _Utils_Tuple2(
			g.name,
			A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$property,
								'text-transform',
								$Confidenceman02$elm_select$Select$Styles$getGroupTextTransformationLabel(styles)),
								A2(
								$rtfeldman$elm_css$Css$property,
								'font-size',
								$Confidenceman02$elm_select$Select$Styles$getGroupFontSizeLabel(styles)),
								A2(
								$rtfeldman$elm_css$Css$property,
								'font-weight',
								$Confidenceman02$elm_select$Select$Styles$getGroupFontWeightLabel(styles)),
								$rtfeldman$elm_css$Css$marginBottom(
								$rtfeldman$elm_css$Css$em(0.25)),
								$rtfeldman$elm_css$Css$marginTop(
								$rtfeldman$elm_css$Css$em(0.25)),
								$rtfeldman$elm_css$Css$paddingLeft(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$paddingRight(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
								$rtfeldman$elm_css$Css$color(
								$Confidenceman02$elm_select$Select$Styles$getGroupColor(styles))
							])),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'group')
					]),
				_List_fromArray(
					[
						function () {
						var _v0 = g.view;
						if (_v0.$ === 'Just') {
							var v = _v0.a;
							return A2($rtfeldman$elm_css$Html$Styled$map, $elm$core$Basics$never, v);
						} else {
							return $rtfeldman$elm_css$Html$Styled$text(g.name);
						}
					}()
					])));
	});
var $Confidenceman02$elm_select$Select$viewMenuItems = function (data) {
	var builder = $Confidenceman02$elm_select$Select$buildMenuItem(
		A8($Confidenceman02$elm_select$Select$BuildMenuItemData, data.menuItemStyles, data.selectId, data.variant, data.initialAction, data.activeTargetIndex, data.menuNavigation, data.disabled, data.controlUiFocused));
	var buildGroupedViews = F2(
		function (_v2, _v4) {
			var _v3 = _v2.b;
			var v = _v3.a;
			var g = _v3.b;
			var idx = _v4.a;
			var acc = _v4.b;
			var resolveGroupStyles = function () {
				var _v1 = g.styles;
				if (_v1.$ === 'Just') {
					var styles = _v1.a;
					return styles;
				} else {
					return data.menuItemGroupStyles;
				}
			}();
			var newIndex = idx + $elm$core$List$length(v);
			return _Utils_Tuple2(
				newIndex,
				_Utils_ap(
					acc,
					A2(
						$elm$core$List$cons,
						A2($Confidenceman02$elm_select$Select$viewSectionLabel, resolveGroupStyles, g),
						A3(
							$elm$core$List$map2,
							builder,
							A2(
								$elm$core$List$range,
								idx + 1,
								idx + $elm$core$List$length(v)),
							v))));
		});
	var _v0 = A3(
		$Confidenceman02$elm_select$Select$sortMenuItemsHelp,
		0,
		data.viewableMenuItems,
		_Utils_Tuple2(_List_Nil, $elm$core$Dict$empty));
	var ungroupedViews = _v0.a;
	var groupedItems = _v0.b;
	var groupedViews = A3(
		$elm$core$List$foldl,
		buildGroupedViews,
		_Utils_Tuple2(
			$elm$core$List$length(ungroupedViews) - 1,
			_List_Nil),
		$elm$core$Dict$toList(groupedItems)).b;
	return _Utils_ap(
		A2($elm$core$List$indexedMap, builder, ungroupedViews),
		groupedViews);
};
var $Confidenceman02$elm_select$Select$MenuListScrollTop = function (a) {
	return {$: 'MenuListScrollTop', a: a};
};
var $Confidenceman02$elm_select$Select$SetMouseMenuNavigation = {$: 'SetMouseMenuNavigation'};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $Confidenceman02$elm_select$Select$viewMenuItemsWrapper = function (data) {
	var resolveStyles = function () {
		var _v0 = data.variant;
		if (_v0.$ === 'SingleMenu') {
			return $Confidenceman02$elm_select$Select$menuListStyles(data.menuStyles);
		} else {
			return _Utils_ap(
				$Confidenceman02$elm_select$Select$menuWrapperStyles(data.menuStyles),
				$Confidenceman02$elm_select$Select$menuListStyles(data.menuStyles));
		}
	}();
	var resolveAttributes = _Utils_eq(data.menuNavigation, $Confidenceman02$elm_select$Select$Keyboard) ? _List_fromArray(
		[
			A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'listBox'),
			A2(
			$rtfeldman$elm_css$Html$Styled$Events$on,
			'mousemove',
			$elm$json$Json$Decode$succeed($Confidenceman02$elm_select$Select$SetMouseMenuNavigation))
		]) : _List_fromArray(
		[
			A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'listBox')
		]);
	return A2(
		$rtfeldman$elm_css$Html$Styled$Keyed$node,
		'ul',
		_Utils_ap(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(resolveStyles),
					$rtfeldman$elm_css$Html$Styled$Attributes$id(
					$Confidenceman02$elm_select$Select$menuListId(data.selectId)),
					A2(
					$rtfeldman$elm_css$Html$Styled$Events$on,
					'scroll',
					A2(
						$elm$json$Json$Decode$map,
						$Confidenceman02$elm_select$Select$MenuListScrollTop,
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['target', 'scrollTop']),
							$elm$json$Json$Decode$float))),
					$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$role('listbox'),
					A2(
					$rtfeldman$elm_css$Html$Styled$Events$custom,
					'mousedown',
					A2(
						$elm$json$Json$Decode$map,
						function (msg) {
							return {message: msg, preventDefault: true, stopPropagation: true};
						},
						$elm$json$Json$Decode$succeed($Confidenceman02$elm_select$Select$DoNothing)))
				]),
			resolveAttributes));
};
var $Confidenceman02$elm_select$Select$viewMenu = function (data) {
	return A2(
		$Confidenceman02$elm_select$Select$viewMenuItemsWrapper,
		A4($Confidenceman02$elm_select$Select$ViewMenuItemsWrapperData, data.variant, data.menuStyles, data.menuNavigation, data.selectId),
		$Confidenceman02$elm_select$Select$viewMenuItems(
			$Confidenceman02$elm_select$Select$ViewMenuItemsData(data.menuItemStyles)(data.menuItemGroupStyles)(data.selectId)(data.variant)(data.initialAction)(data.activeTargetIndex)(data.menuNavigation)(data.viewableMenuItems)(data.disabled)(data.controlUiFocused)));
};
var $Confidenceman02$elm_select$Select$InputChangedNativeMulti = F2(
	function (a, b) {
		return {$: 'InputChangedNativeMulti', a: a, b: b};
	});
var $Confidenceman02$elm_select$Select$InputChangedNativeSingle = F3(
	function (a, b, c) {
		return {$: 'InputChangedNativeSingle', a: a, b: b, c: c};
	});
var $Confidenceman02$elm_select$Select$NativeVariant = function (a) {
	return {$: 'NativeVariant', a: a};
};
var $rtfeldman$elm_css$Html$Styled$option = $rtfeldman$elm_css$Html$Styled$node('option');
var $Confidenceman02$elm_select$Select$buildMenuItemNative = F2(
	function (selectedItems, menuItem) {
		var withSelectedOption = function (item) {
			return A2(
				$elm$core$List$any,
				function (i) {
					return _Utils_eq(
						$Confidenceman02$elm_select$Select$unwrapItem(i),
						$Confidenceman02$elm_select$Select$unwrapItem(item));
				},
				selectedItems) ? _List_fromArray(
				[
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'selected', '')
				]) : _List_Nil;
		};
		return A2(
			$rtfeldman$elm_css$Html$Styled$option,
			A2(
				$elm$core$List$cons,
				$rtfeldman$elm_css$Html$Styled$Attributes$value(
					$Confidenceman02$elm_select$Select$getMenuItemLabel(menuItem)),
				withSelectedOption(menuItem)),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(
					$Confidenceman02$elm_select$Select$getMenuItemLabel(menuItem))
				]));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$disabled = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('disabled');
var $rtfeldman$elm_css$Css$focus = $rtfeldman$elm_css$Css$pseudoClass('focus');
var $rtfeldman$elm_css$Html$Styled$Attributes$hidden = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('hidden');
var $rtfeldman$elm_css$Html$Styled$Attributes$multiple = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('multiple');
var $rtfeldman$elm_css$Html$Styled$Attributes$name = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('name');
var $Confidenceman02$elm_select$Select$Events$intAt = function (path) {
	return A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$int);
};
var $Confidenceman02$elm_select$Select$Events$mapAtInt = F2(
	function (path, msg) {
		return A2(
			$elm$json$Json$Decode$map,
			msg,
			$Confidenceman02$elm_select$Select$Events$intAt(path));
	});
var $Confidenceman02$elm_select$Select$Events$onInputAtInt = F2(
	function (path, msg) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$Events$on,
			'input',
			A2($Confidenceman02$elm_select$Select$Events$mapAtInt, path, msg));
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$json$Json$Decode$map6 = _Json_map6;
var $elm$json$Json$Decode$map7 = _Json_map7;
var $elm$json$Json$Decode$map8 = _Json_map8;
var $Confidenceman02$elm_select$Select$Events$optionsAt = F2(
	function (msg, l) {
		var map8 = F9(
			function (acc, v1, v2, v3, v4, v5, v6, v7, v8) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2, v3, v4, v5, v6, v7, v8]));
			});
		var map7 = F8(
			function (acc, v1, v2, v3, v4, v5, v6, v7) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2, v3, v4, v5, v6, v7]));
			});
		var map6 = F7(
			function (acc, v1, v2, v3, v4, v5, v6) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2, v3, v4, v5, v6]));
			});
		var map5 = F6(
			function (acc, v1, v2, v3, v4, v5) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2, v3, v4, v5]));
			});
		var map4 = F5(
			function (acc, v1, v2, v3, v4) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2, v3, v4]));
			});
		var map3 = F4(
			function (acc, v1, v2, v3) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2, v3]));
			});
		var map2 = F3(
			function (acc, v1, v2) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v1, v2]));
			});
		var map1 = F2(
			function (acc, v) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[v]));
			});
		var mapOptions = F3(
			function (total, ix, acc) {
				var stringIndex = function (offset) {
					return $elm$core$String$fromInt(ix + offset);
				};
				var newTotal = total - 8;
				var newIndex = ix + 8;
				switch (total) {
					case 1:
						return A2(
							$elm$json$Json$Decode$map,
							map1(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])));
					case 2:
						return A3(
							$elm$json$Json$Decode$map2,
							map2(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])));
					case 3:
						return A4(
							$elm$json$Json$Decode$map3,
							map3(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(2),
										'index'
									])));
					case 4:
						return A5(
							$elm$json$Json$Decode$map4,
							map4(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(2),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(3),
										'index'
									])));
					case 5:
						return A6(
							$elm$json$Json$Decode$map5,
							map5(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(2),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(3),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(4),
										'index'
									])));
					case 6:
						return A7(
							$elm$json$Json$Decode$map6,
							map6(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(2),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(3),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(4),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(5),
										'index'
									])));
					case 7:
						return A8(
							$elm$json$Json$Decode$map7,
							map7(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(2),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(3),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(4),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(5),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(6),
										'index'
									])));
					case 8:
						return A9(
							$elm$json$Json$Decode$map8,
							map8(acc),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(0),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(1),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(2),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(3),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(4),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(5),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(6),
										'index'
									])),
							$Confidenceman02$elm_select$Select$Events$intAt(
								_List_fromArray(
									[
										'target',
										'selectedOptions',
										stringIndex(7),
										'index'
									])));
					default:
						return A2(
							$elm$json$Json$Decode$andThen,
							function (x) {
								return A3(mapOptions, newTotal, newIndex, x);
							},
							A9(
								$elm$json$Json$Decode$map8,
								map8(acc),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(0),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(1),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(2),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(3),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(4),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(5),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(6),
											'index'
										])),
								$Confidenceman02$elm_select$Select$Events$intAt(
									_List_fromArray(
										[
											'target',
											'selectedOptions',
											stringIndex(7),
											'index'
										]))));
				}
			});
		return (!l) ? $elm$json$Json$Decode$fail('No selected options') : A2(
			$elm$json$Json$Decode$andThen,
			A2($elm$core$Basics$composeR, msg, $elm$json$Json$Decode$succeed),
			A3(mapOptions, l, 0, _List_Nil));
	});
var $Confidenceman02$elm_select$Select$Events$onMultiSelect = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'input',
		A2(
			$elm$json$Json$Decode$andThen,
			$Confidenceman02$elm_select$Select$Events$optionsAt(msg),
			$Confidenceman02$elm_select$Select$Events$intAt(
				_List_fromArray(
					['target', 'selectedOptions', 'length']))));
};
var $rtfeldman$elm_css$Html$Styled$optgroup = $rtfeldman$elm_css$Html$Styled$node('optgroup');
var $rtfeldman$elm_css$Html$Styled$select = $rtfeldman$elm_css$Html$Styled$node('select');
var $rtfeldman$elm_css$Html$Styled$Attributes$selected = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('selected');
var $Confidenceman02$elm_select$Select$viewNative = function (data) {
	var withPlaceholder = function () {
		var _v12 = data.variant;
		if (_v12.$ === 'SingleNative') {
			var maybeSelectedItem = _v12.a;
			if (maybeSelectedItem.$ === 'Just') {
				return $rtfeldman$elm_css$Html$Styled$text('');
			} else {
				return A2(
					$rtfeldman$elm_css$Html$Styled$option,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$hidden(true),
							$rtfeldman$elm_css$Html$Styled$Attributes$selected(true),
							$rtfeldman$elm_css$Html$Styled$Attributes$disabled(true)
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('(' + (data.placeholder + ')'))
						]));
			}
		} else {
			return $rtfeldman$elm_css$Html$Styled$text('');
		}
	}();
	var withLabelledBy = function () {
		var _v11 = data.labelledBy;
		if (_v11.$ === 'Just') {
			var s = _v11.a;
			return _List_fromArray(
				[
					$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaLabelledby(s)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var withAriaDescribedBy = function () {
		var _v10 = data.ariaDescribedBy;
		if (_v10.$ === 'Just') {
			var s = _v10.a;
			return _List_fromArray(
				[
					$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaDescribedby(s)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var resolveTestId = function () {
		var _v9 = data.variant;
		if (_v9.$ === 'SingleNative') {
			return 'nativeSingleSelect';
		} else {
			return 'nativeMultiSelect';
		}
	}();
	var resolveName = function () {
		var _v8 = data.name;
		if (_v8.$ === 'Just') {
			var n = _v8.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$name(n)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var onMultiple = function () {
		var _v7 = data.variant;
		if (_v7.$ === 'MultiNative') {
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$multiple(true)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var buildList = function (menuItem) {
		var _v6 = data.variant;
		if (_v6.$ === 'SingleNative') {
			if (_v6.a.$ === 'Just') {
				var selectedItem = _v6.a.a;
				return A2(
					$Confidenceman02$elm_select$Select$buildMenuItemNative,
					_List_fromArray(
						[selectedItem]),
					menuItem);
			} else {
				return A2($Confidenceman02$elm_select$Select$buildMenuItemNative, _List_Nil, menuItem);
			}
		} else {
			var selectedItems = _v6.a;
			return A2($Confidenceman02$elm_select$Select$buildMenuItemNative, selectedItems, menuItem);
		}
	};
	var buildGroupedViews = F2(
		function (_v4, acc) {
			var _v5 = _v4.b;
			var v = _v5.a;
			var g = _v5.b;
			return _Utils_ap(
				acc,
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$optgroup,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'label', g.name)
							]),
						A2($elm$core$List$map, buildList, v))
					]));
		});
	var _v0 = data.selectId;
	var selectId = _v0.a;
	var _v1 = A3(
		$Confidenceman02$elm_select$Select$sortMenuItemsHelp,
		0,
		data.menuItems,
		_Utils_Tuple2(_List_Nil, $elm$core$Dict$empty));
	var ungroupedItems = _v1.a;
	var groupedItems = _v1.b;
	var groupedViews = A3(
		$elm$core$List$foldl,
		buildGroupedViews,
		_List_Nil,
		$elm$core$Dict$toList(groupedItems));
	var itemsInOrder = _Utils_ap(
		ungroupedItems,
		A2(
			$elm$core$List$concatMap,
			A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$Tuple$first),
			$elm$core$Dict$toList(groupedItems)));
	var resolveOnInputMsg = function () {
		var _v2 = data.variant;
		if (_v2.$ === 'SingleNative') {
			if (_v2.a.$ === 'Just') {
				return A2(
					$Confidenceman02$elm_select$Select$Events$onInputAtInt,
					_List_fromArray(
						['target', 'selectedIndex']),
					A2($Confidenceman02$elm_select$Select$InputChangedNativeSingle, itemsInOrder, true));
			} else {
				var _v3 = _v2.a;
				return A2(
					$Confidenceman02$elm_select$Select$Events$onInputAtInt,
					_List_fromArray(
						['target', 'selectedIndex']),
					A2($Confidenceman02$elm_select$Select$InputChangedNativeSingle, itemsInOrder, false));
			}
		} else {
			return $Confidenceman02$elm_select$Select$Events$onMultiSelect(
				$Confidenceman02$elm_select$Select$InputChangedNativeMulti(itemsInOrder));
		}
	}();
	return A2(
		$rtfeldman$elm_css$Html$Styled$select,
		_Utils_ap(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$id(selectId),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', resolveTestId),
					$rtfeldman$elm_css$Html$Styled$Attributes$disabled(data.disabled),
					resolveOnInputMsg,
					$rtfeldman$elm_css$Html$Styled$Events$onFocus(
					$Confidenceman02$elm_select$Select$InputReceivedFocused(
						$Confidenceman02$elm_select$Select$NativeVariant(data.variant))),
					$rtfeldman$elm_css$Html$Styled$Events$onBlur(
					$Confidenceman02$elm_select$Select$OnInputBlurred(
						$Confidenceman02$elm_select$Select$NativeVariant(data.variant))),
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$pct(100)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(
								$Confidenceman02$elm_select$Select$Styles$getControlMinHeight(data.controlStyles))),
							$Confidenceman02$elm_select$Select$controlRadius(
							$Confidenceman02$elm_select$Select$Styles$getControlBorderRadius(data.controlStyles)),
							$rtfeldman$elm_css$Css$backgroundColor(
							$Confidenceman02$elm_select$Select$Styles$getControlBackgroundColor(data.controlStyles)),
							$Confidenceman02$elm_select$Select$controlBorder(
							$Confidenceman02$elm_select$Select$Styles$getControlBorderColor(data.controlStyles)),
							data.disabled ? $Confidenceman02$elm_select$Select$controlDisabled(
							$Confidenceman02$elm_select$Select$Styles$getControlDisabledOpacity(data.controlStyles)) : $Confidenceman02$elm_select$Select$controlHover(
							A2(
								$Confidenceman02$elm_select$Select$ControlHoverData,
								$Confidenceman02$elm_select$Select$Styles$getControlBackgroundColorHover(data.controlStyles),
								$Confidenceman02$elm_select$Select$Styles$getControlBorderColor(data.controlStyles))),
							A2(
							$rtfeldman$elm_css$Css$padding2,
							$rtfeldman$elm_css$Css$px(2),
							$rtfeldman$elm_css$Css$px(8)),
							A2($rtfeldman$elm_css$Css$property, 'appearance', 'none'),
							A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none'),
							$rtfeldman$elm_css$Css$color(
							$Confidenceman02$elm_select$Select$Styles$getControlColor(data.controlStyles)),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(16)),
							$rtfeldman$elm_css$Css$focus(
							_List_fromArray(
								[
									$Confidenceman02$elm_select$Select$controlBorderFocused(
									$Confidenceman02$elm_select$Select$Styles$getControlBorderColorFocus(data.controlStyles)),
									$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$none)
								]))
						]))
				]),
			_Utils_ap(
				withLabelledBy,
				_Utils_ap(
					withAriaDescribedBy,
					_Utils_ap(onMultiple, resolveName)))),
		A2(
			$elm$core$List$cons,
			withPlaceholder,
			_Utils_ap(
				A2($elm$core$List$map, buildList, ungroupedItems),
				groupedViews)));
};
var $Confidenceman02$elm_select$Select$SearchIcon$svgCommonStyles = _List_fromArray(
	[
		$rtfeldman$elm_css$Svg$Styled$Attributes$height('20'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 20 20'),
		$rtfeldman$elm_css$Svg$Styled$Attributes$fill('currentColor')
	]);
var $Confidenceman02$elm_select$Select$SearchIcon$view = A2(
	$rtfeldman$elm_css$Svg$Styled$svg,
	$Confidenceman02$elm_select$Select$SearchIcon$svgCommonStyles,
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Svg$Styled$path,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Svg$Styled$Attributes$d('M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667V11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z')
				]),
			_List_Nil)
		]));
var $Confidenceman02$elm_select$Select$viewSearchIndicator = function (color) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$span,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						A2(
						$rtfeldman$elm_css$Css$property,
						'margin-inline-start',
						$rtfeldman$elm_css$Css$rem(0.5).value),
						$rtfeldman$elm_css$Css$height(
						$rtfeldman$elm_css$Css$px(16)),
						$rtfeldman$elm_css$Css$color(color)
					]))
			]),
		_List_fromArray(
			[$Confidenceman02$elm_select$Select$SearchIcon$view]));
};
var $Confidenceman02$elm_select$Select$viewWrapper = function (data) {
	return $rtfeldman$elm_css$Html$Styled$div(
		A2(
			$elm$core$List$cons,
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
						$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox)
					])),
			function () {
				var _v0 = data.variant;
				if (_v0.$ === 'SingleMenu') {
					return _List_Nil;
				} else {
					return $Confidenceman02$elm_select$Select$containerClickedMsg(
						A4($Confidenceman02$elm_select$Select$ContainerClickedMsgData, data.disabled, data.state, data.variant, data.searchable));
				}
			}()));
};
var $Confidenceman02$elm_select$Select$view = function (_v0) {
	var config = _v0.a;
	var menuStyles = $Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles);
	var ctrlStyles = $Confidenceman02$elm_select$Select$Styles$getControlConfig(config.styles);
	var _v1 = config.state;
	var state_ = _v1.a;
	var selectId = state_.selectId;
	var viewableMenuItems = $Confidenceman02$elm_select$Select$filterViewableMenuItems(
		A4($Confidenceman02$elm_select$Select$BuildViewableMenuItemsData, config.searchable, state_.inputValue, config.menuItems, config.variant));
	var totalMenuItemsCount = $elm$core$List$length(viewableMenuItems);
	var _v2 = config.variant;
	if (_v2.$ === 'NativeVariant') {
		var variant = _v2.a;
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative)
						]))
				]),
			_List_fromArray(
				[
					$Confidenceman02$elm_select$Select$viewNative(
					A9($Confidenceman02$elm_select$Select$ViewNativeData, ctrlStyles, variant, config.menuItems, selectId, config.labelledBy, config.ariaDescribedBy, config.placeholder, config.disabled, config.name)),
					A2(
					$rtfeldman$elm_css$Html$Styled$span,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
									$rtfeldman$elm_css$Css$right(
									$rtfeldman$elm_css$Css$px(0)),
									$rtfeldman$elm_css$Css$top(
									$rtfeldman$elm_css$Css$pct(50)),
									$rtfeldman$elm_css$Css$transform(
									$rtfeldman$elm_css$Css$translateY(
										$rtfeldman$elm_css$Css$pct(-50))),
									$rtfeldman$elm_css$Css$padding(
									$rtfeldman$elm_css$Css$px(8)),
									$rtfeldman$elm_css$Css$pointerEvents($rtfeldman$elm_css$Css$none)
								]))
						]),
					_List_fromArray(
						[
							$Confidenceman02$elm_select$Select$viewIndicatorWrapper(
							_List_fromArray(
								[
									$Confidenceman02$elm_select$Select$viewClearIndicator(
									A5($Confidenceman02$elm_select$Select$ViewClearIndicatorData, config.disabled, config.clearable, config.variant, config.state, config.styles)),
									$Confidenceman02$elm_select$Select$viewLoadingSpinner(
									A2(
										$Confidenceman02$elm_select$Select$ViewLoadingSpinnerData,
										config.isLoading,
										$Confidenceman02$elm_select$Select$Styles$getControlLoadingIndicatorColor(ctrlStyles))),
									$Confidenceman02$elm_select$Select$indicatorSeparator(ctrlStyles),
									$Confidenceman02$elm_select$Select$viewDropdownIndicator(
									A2($Confidenceman02$elm_select$Select$ViewDropdownIndicatorData, false, ctrlStyles))
								]))
						]))
				]));
	} else {
		if (_v2.a.$ === 'SingleMenu') {
			var singleVariant = _v2.a;
			return A2(
				$Confidenceman02$elm_select$Select$Internal$viewIf,
				state_.menuOpen,
				A2(
					$Confidenceman02$elm_select$Select$viewWrapper,
					A4($Confidenceman02$elm_select$Select$ViewWrapperData, state_, config.searchable, singleVariant, config.disabled),
					_List_fromArray(
						[
							A3(
							$rtfeldman$elm_css$Html$Styled$Keyed$node,
							'div',
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									$Confidenceman02$elm_select$Select$menuWrapperStyles(
										$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles)))
								]),
							_List_fromArray(
								[
									(!config.searchable) ? _Utils_Tuple2(
									'dummy-input',
									A2(
										$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
										$Confidenceman02$elm_select$Select$viewDummyInput,
										$Confidenceman02$elm_select$Select$ViewDummyInputData(
											$Confidenceman02$elm_select$Select$getSelectId(config.state))(singleVariant)(
											A2($Confidenceman02$elm_select$Select$enterSelectTargetItem, state_, viewableMenuItems))(totalMenuItemsCount)(state_.menuOpen)(config.labelledBy)(config.ariaDescribedBy)(config.disabled)(config.clearable)(state_))) : _Utils_Tuple2(
									'controlled-input',
									A2(
										$Confidenceman02$elm_select$Select$viewControlWrapper,
										A6(
											$Confidenceman02$elm_select$Select$ViewControlWrapperData,
											config.disabled,
											config.state,
											$Confidenceman02$elm_select$Select$Styles$getControlConfig(config.styles),
											$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles),
											singleVariant,
											config.searchable),
										_List_fromArray(
											[
												$Confidenceman02$elm_select$Select$viewSearchIndicator(
												$Confidenceman02$elm_select$Select$Styles$getMenuControlSearchIndicatorColor(menuStyles)),
												A2(
												$Confidenceman02$elm_select$Select$viewInputWrapper,
												config.disabled,
												_List_fromArray(
													[
														A2(
														$Confidenceman02$elm_select$Select$Internal$viewIf,
														!config.disabled,
														A2(
															$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
															$Confidenceman02$elm_select$Select$viewSelectInput,
															A8(
																$Confidenceman02$elm_select$Select$ViewSelectInputData,
																A2($Confidenceman02$elm_select$Select$enterSelectTargetItem, state_, viewableMenuItems),
																totalMenuItemsCount,
																singleVariant,
																config.labelledBy,
																config.ariaDescribedBy,
																config.disabled,
																config.clearable,
																state_))),
														$Confidenceman02$elm_select$Select$buildPlaceholder(
														A4($Confidenceman02$elm_select$Select$BuildPlaceholderData, singleVariant, state_, ctrlStyles, config.placeholder))
													])),
												$Confidenceman02$elm_select$Select$viewIndicatorWrapper(
												_List_fromArray(
													[
														$Confidenceman02$elm_select$Select$viewClearIndicator(
														A5($Confidenceman02$elm_select$Select$ViewClearIndicatorData, config.disabled, config.clearable, config.variant, config.state, config.styles)),
														$Confidenceman02$elm_select$Select$viewLoadingSpinner(
														A2(
															$Confidenceman02$elm_select$Select$ViewLoadingSpinnerData,
															config.isLoading,
															$Confidenceman02$elm_select$Select$Styles$getMenuControlLoadingIndicatorColor(menuStyles)))
													]))
											]))),
									_Utils_Tuple2(
									'menu-list',
									A2(
										$Confidenceman02$elm_select$Select$viewMenuItemsWrapper,
										A4(
											$Confidenceman02$elm_select$Select$ViewMenuItemsWrapperData,
											singleVariant,
											$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles),
											state_.menuNavigation,
											selectId),
										(config.isLoading && $elm$core$List$isEmpty(viewableMenuItems)) ? _List_fromArray(
											[
												_Utils_Tuple2(
												'loading-menu',
												$Confidenceman02$elm_select$Select$viewLoadingMenu(
													A3(
														$Confidenceman02$elm_select$Select$ViewLoadingMenuData,
														singleVariant,
														config.loadingMessage,
														$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles))))
											]) : $Confidenceman02$elm_select$Select$viewMenuItems(
											$Confidenceman02$elm_select$Select$ViewMenuItemsData(
												$Confidenceman02$elm_select$Select$Styles$getMenuItemConfig(config.styles))(
												$Confidenceman02$elm_select$Select$Styles$getGroupConfig(config.styles))(selectId)(singleVariant)(state_.initialAction)(state_.activeTargetIndex)(state_.menuNavigation)(viewableMenuItems)(config.disabled)(state_.controlUiFocused))))
								]))
						])));
		} else {
			var variant = _v2.a;
			return A2(
				$Confidenceman02$elm_select$Select$viewWrapper,
				A4($Confidenceman02$elm_select$Select$ViewWrapperData, state_, config.searchable, variant, config.disabled),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
						$Confidenceman02$elm_select$Select$viewCustomControl,
						$Confidenceman02$elm_select$Select$ViewCustomControlData(config.state)(ctrlStyles)(config.styles)(
							A2($Confidenceman02$elm_select$Select$enterSelectTargetItem, state_, viewableMenuItems))(totalMenuItemsCount)(variant)(config.placeholder)(config.disabled)(config.searchable)(config.labelledBy)(config.ariaDescribedBy)(config.clearable)(config.isLoading)),
						A2(
						$Confidenceman02$elm_select$Select$Internal$viewIf,
						state_.menuOpen,
						(config.isLoading && $elm$core$List$isEmpty(viewableMenuItems)) ? $Confidenceman02$elm_select$Select$viewLoadingMenu(
							A3(
								$Confidenceman02$elm_select$Select$ViewLoadingMenuData,
								variant,
								config.loadingMessage,
								$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles))) : A2(
							$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
							$Confidenceman02$elm_select$Select$viewMenu,
							$Confidenceman02$elm_select$Select$ViewMenuData(variant)(selectId)(viewableMenuItems)(state_.initialAction)(state_.activeTargetIndex)(state_.menuNavigation)(
								$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.styles))(
								$Confidenceman02$elm_select$Select$Styles$getMenuItemConfig(config.styles))(
								$Confidenceman02$elm_select$Select$Styles$getGroupConfig(config.styles))(config.disabled)(state_.controlUiFocused)))
					]));
		}
	}
};
var $author$project$Main$view = function (m) {
	var selectedItem = function () {
		var _v0 = m.selectedItem;
		if (_v0.$ === 'Just') {
			var i = _v0.a;
			return $elm$core$Maybe$Just(
				$Confidenceman02$elm_select$Select$basicMenuItem(
					{item: i, label: i}));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$marginTop(
						$rtfeldman$elm_css$Css$px(20)),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$pct(50)),
						$rtfeldman$elm_css$Css$marginLeft($rtfeldman$elm_css$Css$auto),
						$rtfeldman$elm_css$Css$marginRight($rtfeldman$elm_css$Css$auto)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$map,
				$author$project$Main$SelectSpecies,
				$Confidenceman02$elm_select$Select$view(
					A2(
						$Confidenceman02$elm_select$Select$clearable,
						true,
						A2(
							$Confidenceman02$elm_select$Select$searchable,
							true,
							A2(
								$Confidenceman02$elm_select$Select$placeholder,
								'Select a species',
								A2(
									$Confidenceman02$elm_select$Select$menuItems,
									m.items,
									A2(
										$Confidenceman02$elm_select$Select$state,
										m.selectState,
										$Confidenceman02$elm_select$Select$single(selectedItem)))))))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$fromUnstyled(
						$author$project$Main$countyRadio(m))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$id('speciesTrend')
					]),
				_List_Nil)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: $elm$core$Basics$always(
			_Utils_Tuple2($author$project$Main$init, $elm$core$Platform$Cmd$none)),
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$Main$update,
		view: A2($elm$core$Basics$composeR, $author$project$Main$view, $rtfeldman$elm_css$Html$Styled$toUnstyled)
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));