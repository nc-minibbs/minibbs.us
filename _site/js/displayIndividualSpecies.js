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




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.fe.cD === region.fR.cD)
	{
		return 'on line ' + region.fe.cD;
	}
	return 'on lines ' + region.fe.cD + ' through ' + region.fR.cD;
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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.im,
		impl.jJ,
		impl.jn,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
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
		go: func(record.go),
		gW: record.gW,
		gE: record.gE
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
		var message = !tag ? value : tag < 3 ? value.a : value.go;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.gW;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.gE) && event.preventDefault(),
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
		impl.im,
		impl.jJ,
		impl.jn,
		function(sendToApp, initialModel) {
			var view = impl.jL;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.im,
		impl.jJ,
		impl.jn,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.fb && impl.fb(sendToApp)
			var view = impl.jL;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.hy);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ef) && (_VirtualDom_doc.title = title = doc.ef);
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
	var onUrlChange = impl.iQ;
	var onUrlRequest = impl.iR;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		fb: function(sendToApp)
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
							&& curr.gI === next.gI
							&& curr.f1 === next.f1
							&& curr.gD.a === next.gD.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		im: function(flags)
		{
			return A3(impl.im, flags, _Browser_getUrl(), key);
		},
		jL: impl.jL,
		jJ: impl.jJ,
		jn: impl.jn
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
		? { ic: 'hidden', hG: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { ic: 'mozHidden', hG: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { ic: 'msHidden', hG: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { ic: 'webkitHidden', hG: 'webkitvisibilitychange' }
		: { ic: 'hidden', hG: 'visibilitychange' };
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
		gQ: _Browser_getScene(),
		g7: {
			hc: _Browser_window.pageXOffset,
			aH: _Browser_window.pageYOffset,
			aG: _Browser_doc.documentElement.clientWidth,
			dx: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aG: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		dx: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			gQ: {
				aG: node.scrollWidth,
				dx: node.scrollHeight
			},
			g7: {
				hc: node.scrollLeft,
				aH: node.scrollTop,
				aG: node.clientWidth,
				dx: node.clientHeight
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
			gQ: _Browser_getScene(),
			g7: {
				hc: x,
				aH: y,
				aG: _Browser_doc.documentElement.clientWidth,
				dx: _Browser_doc.documentElement.clientHeight
			},
			T: {
				hc: x + rect.left,
				aH: y + rect.top,
				aG: rect.width,
				dx: rect.height
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
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
			if (t.$ === -2) {
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
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
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
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
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
	return {$: 0, a: a};
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
		if (!builder.G) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.H),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.H);
		} else {
			var treeLen = builder.G * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.J) : builder.J;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.G);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.H) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.H);
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
					{J: nodeList, G: (len / $elm$core$Array$branchFactor) | 0, H: tail});
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
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
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
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fZ: fragment, f1: host, gA: path, gD: port_, gI: protocol, gJ: query};
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
					if (_v1.$ === 1) {
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
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
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
		var task = _v0;
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
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Data$County$Combined = 0;
var $author$project$Specs$SpeciesTrend$ShowRouteDetail = 0;
var $Confidenceman02$elm_select$Select$Mouse = 1;
var $Confidenceman02$elm_select$Select$Internal$NothingMousedown = {$: 3};
var $Confidenceman02$elm_select$Select$State = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$initState = function (id_) {
	return {w: 0, l: $elm$core$Maybe$Nothing, ag: $elm$core$Maybe$Nothing, f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing, dH: false, cB: false, b_: 0, B: 1, v: false, cG: $elm$core$Maybe$Nothing, r: id_};
};
var $Confidenceman02$elm_select$Select$SelectId = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$selectIdentifier = function (id_) {
	return id_ + '__elm-select';
};
var $author$project$Data$Species$AcadianFlycatcher = 0;
var $author$project$Data$Species$AmericanCrow = 1;
var $author$project$Data$Species$AmericanGoldfinch = 2;
var $author$project$Data$Species$AmericanRedstart = 3;
var $author$project$Data$Species$AmericanRobin = 4;
var $author$project$Data$Species$BaldEagle = 5;
var $author$project$Data$Species$BaltimoreOriole = 6;
var $author$project$Data$Species$BarnSwallow = 7;
var $author$project$Data$Species$BarredOwl = 8;
var $author$project$Data$Species$BeltedKingfisher = 9;
var $author$project$Data$Species$BlackVulture = 10;
var $author$project$Data$Species$BlackandwhiteWarbler = 11;
var $author$project$Data$Species$BlueGrosbeak = 12;
var $author$project$Data$Species$BlueJay = 13;
var $author$project$Data$Species$BluegrayGnatcatcher = 14;
var $author$project$Data$Species$BlueheadedVireo = 15;
var $author$project$Data$Species$BroadwingedHawk = 16;
var $author$project$Data$Species$BrownThrasher = 17;
var $author$project$Data$Species$BrownheadedCowbird = 18;
var $author$project$Data$Species$BrownheadedNuthatch = 19;
var $author$project$Data$Species$CanadaGoose = 20;
var $author$project$Data$Species$CarolinaChickadee = 21;
var $author$project$Data$Species$CarolinaWren = 22;
var $author$project$Data$Species$CedarWaxwing = 23;
var $author$project$Data$Species$ChimneySwift = 24;
var $author$project$Data$Species$Chuckwillswidow = 25;
var $author$project$Data$Species$CliffSwallow = 26;
var $author$project$Data$Species$CommonGrackle = 27;
var $author$project$Data$Species$CommonYellowthroat = 28;
var $author$project$Data$Species$CoopersHawk = 29;
var $author$project$Data$Species$Dickcissel = 30;
var $author$project$Data$Species$DoublecrestedCormorant = 31;
var $author$project$Data$Species$DownyWoodpecker = 32;
var $author$project$Data$Species$EasternBluebird = 33;
var $author$project$Data$Species$EasternKingbird = 34;
var $author$project$Data$Species$EasternMeadowlark = 35;
var $author$project$Data$Species$EasternPhoebe = 36;
var $author$project$Data$Species$EasternScreechOwl = 37;
var $author$project$Data$Species$EasternTowhee = 38;
var $author$project$Data$Species$EasternWhippoorwill = 39;
var $author$project$Data$Species$EasternWoodPewee = 40;
var $author$project$Data$Species$EuropeanStarling = 41;
var $author$project$Data$Species$FieldSparrow = 42;
var $author$project$Data$Species$FishCrow = 43;
var $author$project$Data$Species$GrasshopperSparrow = 44;
var $author$project$Data$Species$GrayCatbird = 45;
var $author$project$Data$Species$GreatBlueHeron = 46;
var $author$project$Data$Species$GreatCrestedFlycatcher = 47;
var $author$project$Data$Species$GreatEgret = 48;
var $author$project$Data$Species$GreatHornedOwl = 49;
var $author$project$Data$Species$GreenHeron = 50;
var $author$project$Data$Species$HairyWoodpecker = 51;
var $author$project$Data$Species$HoodedWarbler = 52;
var $author$project$Data$Species$HornedLark = 53;
var $author$project$Data$Species$HouseFinch = 54;
var $author$project$Data$Species$HouseSparrow = 55;
var $author$project$Data$Species$HouseWren = 56;
var $author$project$Data$Species$IndigoBunting = 57;
var $author$project$Data$Species$KentuckyWarbler = 58;
var $author$project$Data$Species$Killdeer = 59;
var $author$project$Data$Species$LoggerheadShrike = 60;
var $author$project$Data$Species$LouisianaWaterthrush = 61;
var $author$project$Data$Species$Mallard = 62;
var $author$project$Data$Species$MourningDove = 63;
var $author$project$Data$Species$NorthernBobwhite = 64;
var $author$project$Data$Species$NorthernCardinal = 65;
var $author$project$Data$Species$NorthernFlicker = 66;
var $author$project$Data$Species$NorthernMockingbird = 67;
var $author$project$Data$Species$NorthernParula = 68;
var $author$project$Data$Species$NorthernRoughwingedSwallow = 69;
var $author$project$Data$Species$OrchardOriole = 70;
var $author$project$Data$Species$Osprey = 71;
var $author$project$Data$Species$Ovenbird = 72;
var $author$project$Data$Species$PileatedWoodpecker = 73;
var $author$project$Data$Species$PrairieWarbler = 74;
var $author$project$Data$Species$ProthonotaryWarbler = 75;
var $author$project$Data$Species$PurpleMartin = 76;
var $author$project$Data$Species$RedbelliedWoodpecker = 77;
var $author$project$Data$Species$RedeyedVireo = 78;
var $author$project$Data$Species$RedheadedWoodpecker = 79;
var $author$project$Data$Species$RedshoulderedHawk = 80;
var $author$project$Data$Species$RedtailedHawk = 81;
var $author$project$Data$Species$RedwingedBlackbird = 82;
var $author$project$Data$Species$RockPigeon = 83;
var $author$project$Data$Species$RubythroatedHummingbird = 84;
var $author$project$Data$Species$ScarletTanager = 85;
var $author$project$Data$Species$SharpshinnedHawk = 86;
var $author$project$Data$Species$SongSparrow = 87;
var $author$project$Data$Species$SummerTanager = 88;
var $author$project$Data$Species$TreeSwallow = 89;
var $author$project$Data$Species$TuftedTitmouse = 90;
var $author$project$Data$Species$TurkeyVulture = 91;
var $author$project$Data$Species$WarblingVireo = 92;
var $author$project$Data$Species$WhitebreastedNuthatch = 93;
var $author$project$Data$Species$WhiteeyedVireo = 94;
var $author$project$Data$Species$WildTurkey = 95;
var $author$project$Data$Species$WoodDuck = 96;
var $author$project$Data$Species$WoodThrush = 97;
var $author$project$Data$Species$YellowWarbler = 98;
var $author$project$Data$Species$YellowbilledCuckoo = 99;
var $author$project$Data$Species$YellowbreastedChat = 100;
var $author$project$Data$Species$YellowthroatedVireo = 101;
var $author$project$Data$Species$YellowthroatedWarbler = 102;
var $author$project$Data$Species$allSpecies = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102]);
var $Confidenceman02$elm_select$Select$Basic = function (a) {
	return {$: 0, a: a};
};
var $Confidenceman02$elm_select$Select$basicMenuItem = function (bscItem) {
	return $Confidenceman02$elm_select$Select$Basic(
		{bP: true, bU: $elm$core$Maybe$Nothing, ge: bscItem.ge, dI: bscItem.dI, k: $elm$core$Maybe$Nothing});
};
var $author$project$Data$Species$speciesToString = function (species) {
	switch (species) {
		case 0:
			return 'Acadian Flycatcher';
		case 1:
			return 'American Crow';
		case 2:
			return 'American Goldfinch';
		case 3:
			return 'American Redstart';
		case 4:
			return 'American Robin';
		case 5:
			return 'Bald Eagle';
		case 6:
			return 'Baltimore Oriole';
		case 7:
			return 'Barn Swallow';
		case 8:
			return 'Barred Owl';
		case 9:
			return 'Belted Kingfisher';
		case 10:
			return 'Black Vulture';
		case 11:
			return 'Black-and-white Warbler';
		case 12:
			return 'Blue Grosbeak';
		case 13:
			return 'Blue Jay';
		case 14:
			return 'Blue-gray Gnatcatcher';
		case 15:
			return 'Blue-headed Vireo';
		case 16:
			return 'Broad-winged Hawk';
		case 17:
			return 'Brown Thrasher';
		case 18:
			return 'Brown-headed Cowbird';
		case 19:
			return 'Brown-headed Nuthatch';
		case 20:
			return 'Canada Goose';
		case 21:
			return 'Carolina Chickadee';
		case 22:
			return 'Carolina Wren';
		case 23:
			return 'Cedar Waxwing';
		case 24:
			return 'Chimney Swift';
		case 25:
			return 'Chuck-will\'s-widow';
		case 26:
			return 'Cliff Swallow';
		case 27:
			return 'Common Grackle';
		case 28:
			return 'Common Yellowthroat';
		case 29:
			return 'Cooper\'s Hawk';
		case 30:
			return 'Dickcissel';
		case 31:
			return 'Double-crested Cormorant';
		case 32:
			return 'Downy Woodpecker';
		case 33:
			return 'Eastern Bluebird';
		case 34:
			return 'Eastern Kingbird';
		case 35:
			return 'Eastern Meadowlark';
		case 36:
			return 'Eastern Phoebe';
		case 37:
			return 'Eastern Screech-Owl';
		case 38:
			return 'Eastern Towhee';
		case 39:
			return 'Eastern Whip-poor-will';
		case 40:
			return 'Eastern Wood-Pewee';
		case 41:
			return 'European Starling';
		case 42:
			return 'Field Sparrow';
		case 43:
			return 'Fish Crow';
		case 44:
			return 'Grasshopper Sparrow';
		case 45:
			return 'Gray Catbird';
		case 46:
			return 'Great Blue Heron';
		case 47:
			return 'Great Crested Flycatcher';
		case 48:
			return 'Great Egret';
		case 49:
			return 'Great Horned Owl';
		case 50:
			return 'Green Heron';
		case 51:
			return 'Hairy Woodpecker';
		case 52:
			return 'Hooded Warbler';
		case 53:
			return 'Horned Lark';
		case 54:
			return 'House Finch';
		case 55:
			return 'House Sparrow';
		case 56:
			return 'House Wren';
		case 57:
			return 'Indigo Bunting';
		case 58:
			return 'Kentucky Warbler';
		case 59:
			return 'Killdeer';
		case 60:
			return 'Loggerhead Shrike';
		case 61:
			return 'Louisiana Waterthrush';
		case 62:
			return 'Mallard';
		case 63:
			return 'Mourning Dove';
		case 64:
			return 'Northern Bobwhite';
		case 65:
			return 'Northern Cardinal';
		case 66:
			return 'Northern Flicker';
		case 67:
			return 'Northern Mockingbird';
		case 68:
			return 'Northern Parula';
		case 69:
			return 'Northern Rough-winged Swallow';
		case 70:
			return 'Orchard Oriole';
		case 71:
			return 'Osprey';
		case 72:
			return 'Ovenbird';
		case 73:
			return 'Pileated Woodpecker';
		case 74:
			return 'Prairie Warbler';
		case 75:
			return 'Prothonotary Warbler';
		case 76:
			return 'Purple Martin';
		case 77:
			return 'Red-bellied Woodpecker';
		case 78:
			return 'Red-eyed Vireo';
		case 79:
			return 'Red-headed Woodpecker';
		case 80:
			return 'Red-shouldered Hawk';
		case 81:
			return 'Red-tailed Hawk';
		case 82:
			return 'Red-winged Blackbird';
		case 83:
			return 'Rock Pigeon';
		case 84:
			return 'Ruby-throated Hummingbird';
		case 85:
			return 'Scarlet Tanager';
		case 86:
			return 'Sharp-shinned Hawk';
		case 87:
			return 'Song Sparrow';
		case 88:
			return 'Summer Tanager';
		case 89:
			return 'Tree Swallow';
		case 90:
			return 'Tufted Titmouse';
		case 91:
			return 'Turkey Vulture';
		case 92:
			return 'Warbling Vireo';
		case 93:
			return 'White-breasted Nuthatch';
		case 94:
			return 'White-eyed Vireo';
		case 95:
			return 'Wild Turkey';
		case 96:
			return 'Wood Duck';
		case 97:
			return 'Wood Thrush';
		case 98:
			return 'Yellow Warbler';
		case 99:
			return 'Yellow-billed Cuckoo';
		case 100:
			return 'Yellow-breasted Chat';
		case 101:
			return 'Yellow-throated Vireo';
		default:
			return 'Yellow-throated Warbler';
	}
};
var $author$project$DisplayIndividualSpecies$speciesToMenuItem = function (species) {
	return $Confidenceman02$elm_select$Select$basicMenuItem(
		{
			ge: $author$project$Data$Species$speciesToString(species),
			dI: $author$project$Data$Species$speciesToString(species)
		});
};
var $author$project$DisplayIndividualSpecies$speciesMenuItems = A2($elm$core$List$map, $author$project$DisplayIndividualSpecies$speciesToMenuItem, $author$project$Data$Species$allSpecies);
var $author$project$DisplayIndividualSpecies$init = {
	bN: 0,
	eN: $author$project$DisplayIndividualSpecies$speciesMenuItems,
	b6: 0,
	cL: $Confidenceman02$elm_select$Select$initState(
		$Confidenceman02$elm_select$Select$selectIdentifier('SpeciesSelector')),
	cM: $elm$core$Maybe$Nothing,
	b8: $elm$core$Maybe$Nothing
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$String$cons = _String_cons;
var $robinheghan$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {bL: charsProcessed, bV: hash, bx: seed, b9: shift};
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
	var acc = (!(!data.bV)) ? (data.bx ^ A2(
		$robinheghan$murmur3$Murmur3$multiplyBy,
		$robinheghan$murmur3$Murmur3$c2,
		A2(
			$robinheghan$murmur3$Murmur3$rotlBy,
			15,
			A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, data.bV)))) : data.bx;
	var h0 = acc ^ data.bL;
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
		var res = data.bV | ((255 & $elm$core$Char$toCode(c)) << data.b9);
		var _v0 = data.b9;
		if (_v0 === 24) {
			return {
				bL: data.bL + 1,
				bV: 0,
				bx: A2($robinheghan$murmur3$Murmur3$mix, data.bx, res),
				b9: 0
			};
		} else {
			return {bL: data.bL + 1, bV: res, bx: data.bx, b9: data.b9 + 8};
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
				return '0';
			case 1:
				return '1';
			case 2:
				return '2';
			case 3:
				return '3';
			case 4:
				return '4';
			case 5:
				return '5';
			case 6:
				return '6';
			case 7:
				return '7';
			case 8:
				return '8';
			case 9:
				return '9';
			case 10:
				return 'a';
			case 11:
				return 'b';
			case 12:
				return 'c';
			case 13:
				return 'd';
			case 14:
				return 'e';
			case 15:
				return 'f';
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
			'-',
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		'_',
		$rtfeldman$elm_hex$Hex$toString(
			A2($robinheghan$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$initialSeed, str)));
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
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
			if (!_v1.$) {
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
			if (!_v1.$) {
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
			if (!_v1.$) {
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
			case 4:
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 0:
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
			case 1:
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
			case 2:
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
			case 4:
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 0:
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
			case 1:
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
			case 2:
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
			if (dict.$ === -2) {
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
						if (!maybeNonce.$) {
							var nonce = maybeNonce.a;
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
		case 4:
			var plainNode = vdom.a;
			return plainNode;
		case 0:
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyle, $elm$core$Maybe$Nothing, elemType, properties, children);
		case 1:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
		case 2:
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
var $author$project$DisplayIndividualSpecies$SelectSpecies = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $gicentre$elm_vegalite$VegaLite$VLData = 13;
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
		case 0:
			return 'number';
		case 1:
			return 'boolean';
		case 2:
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
			_Json_emptyObject(0),
			pairs));
};
var $gicentre$elm_vegalite$VegaLite$strExpr = F2(
	function (objName, s) {
		switch (s.$) {
			case 0:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$string(x))
					]);
			case 1:
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
		case 0:
			var s = fmt.a;
			switch (s.$) {
				case 0:
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
				case 1:
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
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('csv'))
				]);
		case 2:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('tsv'))
				]);
		case 3:
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
		case 4:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('arrow'))
				]);
		case 5:
			var s = fmt.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('topojson')),
				A2($gicentre$elm_vegalite$VegaLite$strExpr, 'feature', s));
		case 6:
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
			13,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						$elm$json$Json$Encode$string(u))
					]))) : _Utils_Tuple2(
			13,
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
	return {$: 2, a: a};
};
var $gicentre$elm_vegalite$VegaLite$foDate = $gicentre$elm_vegalite$VegaLite$FoDate;
var $gicentre$elm_vegalite$VegaLite$FoNum = {$: 0};
var $gicentre$elm_vegalite$VegaLite$foNum = $gicentre$elm_vegalite$VegaLite$FoNum;
var $gicentre$elm_vegalite$VegaLite$Parse = function (a) {
	return {$: 7, a: a};
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
var $gicentre$elm_vegalite$VegaLite$X = 0;
var $gicentre$elm_vegalite$VegaLite$Y = 1;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
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
var $gicentre$elm_vegalite$VegaLite$vlPropertyLabel = function (spec) {
	switch (spec) {
		case 0:
			return 'name';
		case 1:
			return 'params';
		case 2:
			return 'description';
		case 3:
			return 'title';
		case 4:
			return 'width';
		case 6:
			return 'width';
		case 5:
			return 'height';
		case 7:
			return 'height';
		case 9:
			return 'padding';
		case 8:
			return 'autosize';
		case 10:
			return 'background';
		case 12:
			return 'usermeta';
		case 11:
			return 'background';
		case 13:
			return 'data';
		case 14:
			return 'datasets';
		case 17:
			return 'projection';
		case 15:
			return 'mark';
		case 16:
			return 'transform';
		case 18:
			return 'encoding';
		case 32:
			return 'config';
		case 33:
			return 'selection';
		case 20:
			return 'concat';
		case 23:
			return 'columns';
		case 21:
			return 'hconcat';
		case 22:
			return 'vconcat';
		case 19:
			return 'layer';
		case 24:
			return 'repeat';
		case 25:
			return 'facet';
		case 28:
			return 'spacing';
		case 29:
			return 'align';
		case 30:
			return 'bounds';
		case 31:
			return 'center';
		case 26:
			return 'spec';
		case 27:
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
var $gicentre$elm_vegalite$VegaLite$AxGrid = function (a) {
	return {$: 72, a: a};
};
var $gicentre$elm_vegalite$VegaLite$Boo = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$axGrid = function (b) {
	return $gicentre$elm_vegalite$VegaLite$AxGrid(
		$gicentre$elm_vegalite$VegaLite$Boo(b));
};
var $gicentre$elm_vegalite$VegaLite$AxTitle = function (a) {
	return {$: 56, a: a};
};
var $gicentre$elm_vegalite$VegaLite$Str = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$axTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$AxTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$DStrings = function (a) {
	return {$: 6, a: a};
};
var $gicentre$elm_vegalite$VegaLite$RStrings = function (a) {
	return {$: 1, a: a};
};
var $gicentre$elm_vegalite$VegaLite$ScDomain = function (a) {
	return {$: 1, a: a};
};
var $gicentre$elm_vegalite$VegaLite$ScRange = function (a) {
	return {$: 3, a: a};
};
var $gicentre$elm_vegalite$VegaLite$Strs = function (a) {
	return {$: 0, a: a};
};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $gicentre$elm_vegalite$VegaLite$categoricalDomainMap = function (scaleDomainPairs) {
	var _v0 = $elm$core$List$unzip(scaleDomainPairs);
	var domain = _v0.a;
	var range = _v0.b;
	return _List_fromArray(
		[
			$gicentre$elm_vegalite$VegaLite$ScDomain(
			$gicentre$elm_vegalite$VegaLite$DStrings(
				$gicentre$elm_vegalite$VegaLite$Strs(domain))),
			$gicentre$elm_vegalite$VegaLite$ScRange(
			$gicentre$elm_vegalite$VegaLite$RStrings(
				$gicentre$elm_vegalite$VegaLite$Strs(range)))
		]);
};
var $gicentre$elm_vegalite$VegaLite$View = function (a) {
	return {$: 49, a: a};
};
var $gicentre$elm_vegalite$VegaLite$coView = $gicentre$elm_vegalite$VegaLite$View;
var $gicentre$elm_vegalite$VegaLite$arrangementLabel = function (arrng) {
	switch (arrng) {
		case 1:
			return 'row';
		case 0:
			return 'column';
		case 2:
			return 'repeat';
		default:
			return 'layer';
	}
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$booExpr = F2(
	function (objName, n) {
		if (!n.$) {
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
var $elm$json$Json$Encode$float = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$numExpr = F2(
	function (objName, n) {
		switch (n.$) {
			case 0:
				var x = n.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$float(x))
					]);
			case 1:
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
var $gicentre$elm_vegalite$VegaLite$numsExpr = F2(
	function (objName, ns) {
		if (!ns.$) {
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
var $gicentre$elm_vegalite$VegaLite$binProperty = function (binProp) {
	switch (binProp.$) {
		case 5:
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxbins', x);
		case 0:
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'anchor', x);
		case 1:
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'base', x);
		case 8:
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'step', x);
		case 9:
			var xs = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'steps', xs);
		case 6:
			var x = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minstep', x);
		case 2:
			var xs = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'divide', xs);
		case 3:
			var ns = binProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'extent', ns);
		case 4:
			var se = binProp.a;
			switch (se.$) {
				case 0:
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
				case 2:
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
	switch (dayName) {
		case 0:
			return 'Mon';
		case 1:
			return 'Tue';
		case 2:
			return 'Wed';
		case 3:
			return 'Thu';
		case 4:
			return 'Fri';
		case 5:
			return 'Sat';
		default:
			return 'Sun';
	}
};
var $gicentre$elm_vegalite$VegaLite$monthNameLabel = function (mon) {
	switch (mon) {
		case 0:
			return 'Jan';
		case 1:
			return 'Feb';
		case 2:
			return 'Mar';
		case 3:
			return 'Apr';
		case 4:
			return 'May';
		case 5:
			return 'Jun';
		case 6:
			return 'Jul';
		case 7:
			return 'Aug';
		case 8:
			return 'Sep';
		case 9:
			return 'Oct';
		case 10:
			return 'Nov';
		default:
			return 'Dec';
	}
};
var $gicentre$elm_vegalite$VegaLite$dateTimeProperty = function (dtp) {
	switch (dtp.$) {
		case 0:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'year', x);
		case 1:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'quarter', x);
		case 2:
			var mon = dtp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'month',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$monthNameLabel(mon)))
				]);
		case 3:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'month', x);
		case 4:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'date', x);
		case 5:
			var d = dtp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'day',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$dayLabel(d)))
				]);
		case 6:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'hours', x);
		case 7:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minutes', x);
		case 8:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'seconds', x);
		default:
			var x = dtp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'milliseconds', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$dataValueSpec = function (val) {
	switch (val.$) {
		case 2:
			var x = val.a;
			return $elm$json$Json$Encode$float(x);
		case 3:
			var s = val.a;
			return $elm$json$Json$Encode$string(s);
		case 0:
			var b = val.a;
			return $elm$json$Json$Encode$bool(b);
		case 1:
			var d = val.a;
			return $elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
		case 4:
			var s = val.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 5:
			return $elm$json$Json$Encode$null;
		case 6:
			var vals = val.a;
			return $gicentre$elm_vegalite$VegaLite$dataValuesSpecs(vals);
		case 7:
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
		case 2:
			var xs = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$float, xs));
		case 4:
			var ss = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$string, ss));
		case 1:
			var dtss = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$concatMap($gicentre$elm_vegalite$VegaLite$dateTimeProperty),
						$elm$json$Json$Encode$object),
					dtss));
		case 3:
			var s = dvs.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 0:
			var bs = dvs.a;
			return $gicentre$elm_vegalite$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$bool, bs));
		case 5:
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
		case 0:
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
		case 1:
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
		case 2:
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
		case 3:
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
		case 4:
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
		case 7:
			var selName = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(selName))
				]);
		case 8:
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
		case 10:
			var field = f.a;
			var vals = f.b;
			var fromTs = function (ts) {
				if (ts.$ === 1) {
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
				if (!vals.$) {
					var ns = vals.a;
					if (!ns.$) {
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
		case 9:
			var field = f.a;
			var vals = f.b;
			var values = function () {
				switch (vals.$) {
					case 2:
						var xs = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs);
					case 1:
						var ds = vals.a;
						return A2(
							$elm$json$Json$Encode$list,
							function (d) {
								return $elm$json$Json$Encode$object(
									A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
							},
							ds);
					case 4:
						var ss = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
					case 3:
						var s = vals.a;
						return $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(s))
								]));
					case 0:
						var bs = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$bool, bs);
					case 5:
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
		case 11:
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
var $gicentre$elm_vegalite$VegaLite$ArAria = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$anchorSpec = function (an) {
	switch (an.$) {
		case 0:
			return $elm$json$Json$Encode$string('start');
		case 1:
			return $elm$json$Json$Encode$string('middle');
		case 2:
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
var $gicentre$elm_vegalite$VegaLite$ariaProperty = function (arProp) {
	switch (arProp.$) {
		case 0:
			var b = arProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'aria', b);
		case 1:
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
var $gicentre$elm_vegalite$VegaLite$compositionAlignmentLabel = function (ca) {
	switch (ca) {
		case 0:
			return 'none';
		case 1:
			return 'each';
		default:
			return 'all';
	}
};
var $gicentre$elm_vegalite$VegaLite$fontWeightSpec = function (w) {
	switch (w.$) {
		case 3:
			return $elm$json$Json$Encode$string('normal');
		case 0:
			return $elm$json$Json$Encode$string('bold');
		case 1:
			return $elm$json$Json$Encode$string('bolder');
		case 2:
			return $elm$json$Json$Encode$string('lighter');
		case 13:
			var s = w.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 4:
			return $elm$json$Json$Encode$float(100);
		case 5:
			return $elm$json$Json$Encode$float(200);
		case 6:
			return $elm$json$Json$Encode$float(300);
		case 7:
			return $elm$json$Json$Encode$float(400);
		case 8:
			return $elm$json$Json$Encode$float(500);
		case 9:
			return $elm$json$Json$Encode$float(600);
		case 10:
			return $elm$json$Json$Encode$float(700);
		case 11:
			return $elm$json$Json$Encode$float(800);
		default:
			return $elm$json$Json$Encode$float(900);
	}
};
var $gicentre$elm_vegalite$VegaLite$hAlignSpec = function (al) {
	switch (al.$) {
		case 1:
			return $elm$json$Json$Encode$string('left');
		case 0:
			return $elm$json$Json$Encode$string('center');
		case 2:
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
var $gicentre$elm_vegalite$VegaLite$legendOrientSpec = function (orient) {
	switch (orient) {
		case 3:
			return $elm$json$Json$Encode$string('left');
		case 7:
			return $elm$json$Json$Encode$string('top-left');
		case 6:
			return $elm$json$Json$Encode$string('top');
		case 8:
			return $elm$json$Json$Encode$string('top-right');
		case 5:
			return $elm$json$Json$Encode$string('right');
		case 2:
			return $elm$json$Json$Encode$string('bottom-right');
		case 0:
			return $elm$json$Json$Encode$string('bottom');
		case 1:
			return $elm$json$Json$Encode$string('bottom-left');
		default:
			return $elm$json$Json$Encode$string('none');
	}
};
var $gicentre$elm_vegalite$VegaLite$markOrientationLabel = function (orient) {
	if (!orient) {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
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
var $gicentre$elm_vegalite$VegaLite$overlapStrategySpec = function (strat) {
	switch (strat.$) {
		case 0:
			return $elm$json$Json$Encode$bool(false);
		case 1:
			return $elm$json$Json$Encode$string('parity');
		case 2:
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
var $gicentre$elm_vegalite$VegaLite$symbolLabel = function (sym) {
	switch (sym.$) {
		case 0:
			return 'circle';
		case 1:
			return 'square';
		case 2:
			return 'cross';
		case 3:
			return 'diamond';
		case 4:
			return 'triangle-up';
		case 5:
			return 'triangle-down';
		case 6:
			return 'triangle-left';
		case 7:
			return 'triangle-right';
		case 12:
			return 'triangle';
		case 9:
			return 'stroke';
		case 10:
			return 'arrow';
		case 11:
			return 'wedge';
		case 8:
			var svgPath = sym.a;
			return svgPath;
		default:
			var s = sym.a;
			return s;
	}
};
var $gicentre$elm_vegalite$VegaLite$symbolSpec = function (sym) {
	if (sym.$ === 13) {
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
var $gicentre$elm_vegalite$VegaLite$vAlignSpec = function (al) {
	switch (al.$) {
		case 0:
			return $elm$json$Json$Encode$string('top');
		case 1:
			return $elm$json$Json$Encode$string('line-top');
		case 2:
			return $elm$json$Json$Encode$string('middle');
		case 3:
			return $elm$json$Json$Encode$string('bottom');
		case 4:
			return $elm$json$Json$Encode$string('line-bottom');
		case 5:
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
var $gicentre$elm_vegalite$VegaLite$legendProperty = function (legendProp) {
	switch (legendProp.$) {
		case 0:
			var aps = legendProp.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 1:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipHeight', n);
		case 2:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columnPadding', n);
		case 32:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rowPadding', n);
		case 3:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', n);
		case 4:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', n);
		case 6:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fillColor', s);
		case 5:
			var d = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'direction',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 59:
			var lType = legendProp.a;
			if (!lType) {
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
		case 7:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 8:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 9:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 10:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 11:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLength', n);
		case 12:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientOpacity', n);
		case 13:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientThickness', n);
		case 14:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gradientStrokeColor', s);
		case 15:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientStrokeWidth', n);
		case 16:
			var ga = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridAlign',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$compositionAlignmentLabel(ga)))
				]);
		case 17:
			var ha = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 18:
			var va = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 19:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 20:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 21:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 22:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', n);
		case 23:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 24:
			var fw = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 25:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', n);
		case 26:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', n);
		case 27:
			var lo = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(lo))
				]);
		case 28:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', n);
		case 29:
			var orient = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$legendOrientSpec(orient))
				]);
		case 31:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padding', n);
		case 33:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'strokeColor', s);
		case 34:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', n);
		case 35:
			var sd = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'symbolDash', sd);
		case 36:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolDashOffset', n);
		case 37:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolFillColor', s);
		case 38:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolLimit', n);
		case 39:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOffset', n);
		case 40:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOpacity', n);
		case 43:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolStrokeColor', s);
		case 44:
			var s = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolType',
					$gicentre$elm_vegalite$VegaLite$symbolSpec(s))
				]);
		case 41:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolSize', n);
		case 42:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolStrokeWidth', n);
		case 45:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickCount', n);
		case 46:
			var txt = legendProp.a;
			switch (txt.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('title', $elm$json$Json$Encode$null)
						]);
				case 0:
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
		case 47:
			var ha = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 48:
			var an = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 49:
			var va = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 50:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 51:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 52:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', n);
		case 53:
			var s = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 54:
			var fw = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 55:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', n);
		case 56:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', n);
		case 57:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', n);
		case 30:
			var orient = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleOrient',
					$gicentre$elm_vegalite$VegaLite$legendOrientSpec(orient))
				]);
		case 58:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', n);
		case 60:
			var vals = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'values',
					$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(vals))
				]);
		case 61:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendX', n);
		case 62:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendY', n);
		default:
			var n = legendProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'zindex', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$measurementLabel = function (mType) {
	switch (mType) {
		case 0:
			return 'nominal';
		case 1:
			return 'ordinal';
		case 2:
			return 'quantitative';
		case 3:
			return 'temporal';
		default:
			return 'geojson';
	}
};
var $gicentre$elm_vegalite$VegaLite$operationSpec = function (op) {
	switch (op.$) {
		case 0:
			var maybeField = op.a;
			if (maybeField.$ === 1) {
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
		case 1:
			var maybeField = op.a;
			if (maybeField.$ === 1) {
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
		case 4:
			return $elm$json$Json$Encode$string('count');
		case 2:
			return $elm$json$Json$Encode$string('ci0');
		case 3:
			return $elm$json$Json$Encode$string('ci1');
		case 5:
			return $elm$json$Json$Encode$string('distinct');
		case 6:
			return $elm$json$Json$Encode$string('max');
		case 7:
			return $elm$json$Json$Encode$string('mean');
		case 8:
			return $elm$json$Json$Encode$string('median');
		case 9:
			return $elm$json$Json$Encode$string('min');
		case 10:
			return $elm$json$Json$Encode$string('missing');
		case 11:
			return $elm$json$Json$Encode$string('product');
		case 12:
			return $elm$json$Json$Encode$string('q1');
		case 13:
			return $elm$json$Json$Encode$string('q3');
		case 15:
			return $elm$json$Json$Encode$string('stdev');
		case 16:
			return $elm$json$Json$Encode$string('stdevp');
		case 17:
			return $elm$json$Json$Encode$string('sum');
		case 14:
			return $elm$json$Json$Encode$string('stderr');
		case 18:
			return $elm$json$Json$Encode$string('valid');
		case 19:
			return $elm$json$Json$Encode$string('variance');
		default:
			return $elm$json$Json$Encode$string('variancep');
	}
};
var $gicentre$elm_vegalite$VegaLite$cInterpolateSpec = function (iType) {
	switch (iType.$) {
		case 7:
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
		case 4:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hsl'))
					]));
		case 5:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hsl-long'))
					]));
		case 6:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('lab'))
					]));
		case 2:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hcl'))
					]));
		case 3:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hcl-long'))
					]));
		case 0:
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
	switch (ch) {
		case 0:
			return 'x';
		case 1:
			return 'y';
		case 2:
			return 'x2';
		case 3:
			return 'y2';
		case 4:
			return 'xOffset';
		case 5:
			return 'yOffset';
		case 6:
			return 'color';
		case 7:
			return 'opacity';
		case 8:
			return 'shape';
		case 9:
			return 'size';
		default:
			return 'strokeDash';
	}
};
var $gicentre$elm_vegalite$VegaLite$scaleDomainSpec = function (sdType) {
	var numsSpec = function (ns) {
		if (!ns.$) {
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
			case 0:
				var x = n.a;
				return $elm$json$Json$Encode$float(x);
			case 1:
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
		case 0:
			var xs = sdType.a;
			return numsSpec(xs);
		case 1:
			var x = sdType.a;
			return numSpec(x);
		case 2:
			var x = sdType.a;
			return numSpec(x);
		case 3:
			var x = sdType.a;
			return numSpec(x);
		case 7:
			var ds = sdType.a;
			return A2(
				$elm$json$Json$Encode$list,
				function (d) {
					return $elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$dateTimeProperty, d));
				},
				ds);
		case 8:
			var s = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 4:
			var ts = sdType.a;
			if (!ts.$) {
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
		case 5:
			var ts = sdType.a;
			if (!ts.$) {
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
		case 6:
			var cats = sdType.a;
			if (!cats.$) {
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
		case 9:
			var selName = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName))
					]));
		case 11:
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
		case 10:
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
		case 13:
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
	switch (sc) {
		case 0:
			return 'linear';
		case 1:
			return 'pow';
		case 4:
			return 'symlog';
		case 2:
			return 'sqrt';
		case 3:
			return 'log';
		case 5:
			return 'time';
		case 6:
			return 'utc';
		case 7:
			return 'ordinal';
		case 8:
			return 'band';
		case 9:
			return 'point';
		case 10:
			return 'bin-ordinal';
		case 11:
			return 'quantile';
		case 12:
			return 'quantize';
		default:
			return 'threshold';
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $gicentre$elm_vegalite$VegaLite$timeUnitLabel = function (tu) {
	switch (tu.$) {
		case 0:
			return 'year';
		case 13:
			return 'yeardayofyear';
		case 1:
			return 'yearquarter';
		case 2:
			return 'yearquartermonth';
		case 3:
			return 'yearmonth';
		case 4:
			return 'yearmonthdate';
		case 5:
			return 'yearmonthdatehours';
		case 6:
			return 'yearmonthdatehoursminutes';
		case 7:
			return 'yearmonthdatehoursminutesseconds';
		case 8:
			return 'yearweek';
		case 9:
			return 'yearweekday';
		case 10:
			return 'yearweekdayhours';
		case 11:
			return 'yearweekdayhoursminutes';
		case 12:
			return 'yearweekdayhoursminutesseconds';
		case 14:
			return 'quarter';
		case 15:
			return 'quartermonth';
		case 16:
			return 'month';
		case 17:
			return 'monthdate';
		case 18:
			return 'monthdatehours';
		case 19:
			return 'monthdatehoursminutes';
		case 20:
			return 'monthdatehoursminutesseconds';
		case 21:
			return 'week';
		case 22:
			return 'weekday';
		case 23:
			return 'weekdayhours';
		case 24:
			return 'weekdayhoursminutes';
		case 25:
			return 'weekdayhoursminutesseconds';
		case 26:
			return 'date';
		case 27:
			return 'day';
		case 28:
			return 'dayofyear';
		case 29:
			return 'dayhours';
		case 30:
			return 'dayhoursminutes';
		case 31:
			return 'dayhoursminutesseconds';
		case 32:
			return 'hours';
		case 33:
			return 'hoursminutes';
		case 34:
			return 'hoursminutesseconds';
		case 35:
			return 'minutes';
		case 36:
			return 'minutesseconds';
		case 37:
			return 'seconds';
		case 38:
			return 'secondsmilliseconds';
		case 39:
			return 'milliseconds';
		case 40:
			return '';
		case 41:
			return '';
		default:
			return '';
	}
};
var $gicentre$elm_vegalite$VegaLite$scaleNiceSpec = function (ni) {
	switch (ni.$) {
		case 0:
			return $elm$json$Json$Encode$string('millisecond');
		case 1:
			return $elm$json$Json$Encode$string('second');
		case 2:
			return $elm$json$Json$Encode$string('minute');
		case 3:
			return $elm$json$Json$Encode$string('hour');
		case 4:
			return $elm$json$Json$Encode$string('day');
		case 5:
			return $elm$json$Json$Encode$string('week');
		case 6:
			return $elm$json$Json$Encode$string('month');
		case 7:
			return $elm$json$Json$Encode$string('year');
		case 10:
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
		case 8:
			return $elm$json$Json$Encode$bool(true);
		case 9:
			return $elm$json$Json$Encode$bool(false);
		case 11:
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
			if (!clrs.$) {
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
		if (!ss.$) {
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
		case 0:
			var sType = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$scaleLabel(sType)))
				]);
		case 2:
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
		case 1:
			var sdType = scaleProp.a;
			switch (sdType.$) {
				case 1:
					var x = sdType.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainMin', x);
				case 2:
					var x = sdType.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainMid', x);
				case 3:
					var x = sdType.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainMax', x);
				case 4:
					var ts = sdType.a;
					if (!ts.$) {
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
				case 5:
					var ts = sdType.a;
					if (!ts.$) {
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
		case 3:
			var range = scaleProp.a;
			switch (range.$) {
				case 5:
					var x = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rangeMin', x);
				case 6:
					var x = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rangeMax', x);
				case 0:
					var xs = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'range', xs);
				case 2:
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
				case 3:
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
				case 1:
					var ss = range.a;
					return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'range', ss);
				case 4:
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
		case 4:
			var schName = scaleProp.a;
			var extent = scaleProp.b;
			return _List_fromArray(
				[
					A2($gicentre$elm_vegalite$VegaLite$schemeProperty, schName, extent)
				]);
		case 5:
			var schExpr = scaleProp.a;
			var extent = scaleProp.b;
			return _List_fromArray(
				[
					A2($gicentre$elm_vegalite$VegaLite$schemeProperty, schExpr, extent)
				]);
		case 6:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'align', x);
		case 7:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padding', x);
		case 17:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'base', x);
		case 15:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'exponent', x);
		case 16:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'constant', x);
		case 8:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'paddingInner', x);
		case 9:
			var x = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'paddingOuter', x);
		case 10:
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'round', b);
		case 11:
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clamp', b);
		case 12:
			var interp = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interpolate',
					$gicentre$elm_vegalite$VegaLite$cInterpolateSpec(interp))
				]);
		case 13:
			var ni = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'nice',
					$gicentre$elm_vegalite$VegaLite$scaleNiceSpec(ni))
				]);
		case 14:
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'zero', b);
		default:
			var b = scaleProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'reverse', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$sortProperties = function (sp) {
	switch (sp.$) {
		case 0:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					$elm$json$Json$Encode$string('ascending'))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					$elm$json$Json$Encode$string('descending'))
				]);
		case 5:
			var ch = sp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'encoding',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$channelLabel(ch)))
				]);
		case 4:
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
		case 3:
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
var $gicentre$elm_vegalite$VegaLite$strExprMultiline = F2(
	function (objName, s) {
		switch (s.$) {
			case 0:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$gicentre$elm_vegalite$VegaLite$multilineTextSpec(x))
					]);
			case 1:
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
var $gicentre$elm_vegalite$VegaLite$timeUnitProperties = function (tUnit) {
	switch (tUnit.$) {
		case 40:
			var tu = tUnit.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'utc',
					$elm$json$Json$Encode$bool(true)),
				$gicentre$elm_vegalite$VegaLite$timeUnitProperties(tu));
		case 41:
			var n = tUnit.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'maxbins',
					$elm$json$Json$Encode$int(n))
				]);
		case 42:
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
		case 0:
			var ex = bo.a;
			return $elm$json$Json$Encode$string(ex);
		case 1:
			var f = bo.a;
			return $gicentre$elm_vegalite$VegaLite$filterSpec(f);
		case 2:
			var tr = bo.a;
			var f = bo.b;
			return A2($gicentre$elm_vegalite$VegaLite$trFilterSpec, tr, f);
		case 4:
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
		case 5:
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
		case 6:
			var operand = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'not',
						$gicentre$elm_vegalite$VegaLite$booleanOpSpec(operand))
					]));
		case 3:
			var p = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(p))
					]));
		case 8:
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
		case 5:
			var ex = f.a;
			return $elm$json$Json$Encode$string(ex);
		case 6:
			var boolExpr = f.a;
			return $gicentre$elm_vegalite$VegaLite$booleanOpSpec(boolExpr);
		default:
			return $elm$json$Json$Encode$object(
				$gicentre$elm_vegalite$VegaLite$filterProperties(f));
	}
};
var $gicentre$elm_vegalite$VegaLite$markChannelProperties = function (field) {
	switch (field.$) {
		case 0:
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 3:
			var d = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(d))
				]);
		case 4:
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
		case 5:
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
		case 6:
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(t)))
				]);
		case 7:
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
		case 15:
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
		case 9:
			var bps = field.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 8:
			var x = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'band', x);
		case 11:
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
							case 0:
								var _v4 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('ascending'))
									]);
							case 1:
								var _v5 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('descending'))
									]);
							case 2:
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
		case 10:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 1:
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
		case 2:
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
		case 12:
			var tu = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		case 13:
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', s);
		case 14:
			var op = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 16:
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'value', s);
		case 17:
			var x = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'value', x);
		case 18:
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'value', s);
		default:
			var b = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'value', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$predicateProperties = function (predicate) {
	switch (predicate.$) {
		case 0:
			var p = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(p))
				]);
		case 1:
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
			case 5:
				var ex = f.a;
				return $elm$json$Json$Encode$string(ex);
			case 6:
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
var $gicentre$elm_vegalite$VegaLite$autosizeProperty = function (asCfg) {
	switch (asCfg) {
		case 5:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('pad'));
		case 1:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit'));
		case 2:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit-x'));
		case 3:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit-y'));
		case 4:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('none'));
		case 7:
			return _Utils_Tuple2(
				'resize',
				$elm$json$Json$Encode$bool(true));
		case 0:
			return _Utils_Tuple2(
				'contains',
				$elm$json$Json$Encode$string('content'));
		default:
			return _Utils_Tuple2(
				'contains',
				$elm$json$Json$Encode$string('padding'));
	}
};
var $gicentre$elm_vegalite$VegaLite$maybeNumExpr = F2(
	function (objName, n) {
		if (!n.$) {
			var maybeX = n.a;
			if (!maybeX.$) {
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
var $gicentre$elm_vegalite$VegaLite$strokeCapSpec = function (cap) {
	switch (cap.$) {
		case 0:
			return $elm$json$Json$Encode$string('butt');
		case 1:
			return $elm$json$Json$Encode$string('round');
		case 2:
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
var $gicentre$elm_vegalite$VegaLite$tickBandSpec = function (tb) {
	switch (tb.$) {
		case 0:
			return $elm$json$Json$Encode$string('center');
		case 1:
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
var $gicentre$elm_vegalite$VegaLite$axisConfigProperty = function (axisCfg) {
	switch (axisCfg.$) {
		case 40:
			var ss = axisCfg.a;
			if (!ss.$) {
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
		case 0:
			var aps = axisCfg.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 2:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'disable', b);
		case 1:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPosition', x);
		case 3:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'domain', b);
		case 4:
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domainCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 5:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'domainColor', s);
		case 6:
			var xs = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'domainDash', xs);
		case 7:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainDashOffset', x);
		case 8:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainOpacity', x);
		case 9:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainWidth', x);
		case 37:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxExtent', x);
		case 38:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minExtent', x);
		case 39:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', x);
		case 10:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'grid', b);
		case 11:
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 12:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gridColor', s);
		case 13:
			var xs = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'gridDash', xs);
		case 14:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridDashOffset', x);
		case 15:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridOpacity', x);
		case 16:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridWidth', x);
		case 17:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'labels', b);
		case 18:
			var ha = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 19:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelAngle', x);
		case 20:
			var va = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 21:
			var mn = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$maybeNumExpr, 'labelBound', mn);
		case 24:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 25:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 22:
			var n = axisCfg.a;
			switch (n.$) {
				case 0:
					var x = n.a;
					return (!x) ? _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(true))
						]) : A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
			}
		case 23:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlushOffset', x);
		case 26:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 28:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 27:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', x);
		case 29:
			var fw = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 30:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', x);
		case 31:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLineHeight', x);
		case 32:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', x);
		case 33:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOpacity', x);
		case 34:
			var strat = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(strat))
				]);
		case 35:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelPadding', x);
		case 36:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelSeparation', x);
		case 41:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'ticks', b);
		case 42:
			var tb = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickBand',
					$gicentre$elm_vegalite$VegaLite$tickBandSpec(tb))
				]);
		case 43:
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 44:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'tickColor', s);
		case 45:
			var tc = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCount',
					$gicentre$elm_vegalite$VegaLite$scaleNiceSpec(tc))
				]);
		case 46:
			var xs = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'tickDash', xs);
		case 47:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickDashOffset', x);
		case 48:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickExtra', b);
		case 49:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOffset', x);
		case 50:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOpacity', x);
		case 53:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickMinStep', x);
		case 51:
			var b = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickRound', b);
		case 52:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickSize', x);
		case 54:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickWidth', x);
		case 55:
			var al = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(al))
				]);
		case 57:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleAngle', x);
		case 56:
			var an = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 58:
			var va = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 59:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 60:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 62:
			var s = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 63:
			var w = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 61:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', x);
		case 64:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', x);
		case 65:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', x);
		case 66:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', x);
		case 67:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', x);
		case 68:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleX', x);
		case 69:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleY', x);
		default:
			var x = axisCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'translate', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$axisLabel = function (axChoice) {
	switch (axChoice) {
		case 1:
			return 'axisX';
		case 2:
			return 'axisY';
		default:
			return 'axis';
	}
};
var $gicentre$elm_vegalite$VegaLite$AxGridColor = function (a) {
	return {$: 74, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridDash = function (a) {
	return {$: 75, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridDashOffset = function (a) {
	return {$: 76, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridOpacity = function (a) {
	return {$: 77, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxGridWidth = function (a) {
	return {$: 78, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelAlign = function (a) {
	return {$: 21, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelColor = function (a) {
	return {$: 25, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelFont = function (a) {
	return {$: 29, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelFontSize = function (a) {
	return {$: 30, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelFontStyle = function (a) {
	return {$: 31, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelOffset = function (a) {
	return {$: 35, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelOpacity = function (a) {
	return {$: 36, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxLabelPadding = function (a) {
	return {$: 38, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickColor = function (a) {
	return {$: 44, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickDash = function (a) {
	return {$: 46, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickDashOffset = function (a) {
	return {$: 47, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickOpacity = function (a) {
	return {$: 50, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickSize = function (a) {
	return {$: 53, a: a};
};
var $gicentre$elm_vegalite$VegaLite$AxTickWidth = function (a) {
	return {$: 54, a: a};
};
var $gicentre$elm_vegalite$VegaLite$axLabelAlign = $gicentre$elm_vegalite$VegaLite$AxLabelAlign;
var $gicentre$elm_vegalite$VegaLite$AxLabelBaseline = function (a) {
	return {$: 23, a: a};
};
var $gicentre$elm_vegalite$VegaLite$axLabelBaseline = $gicentre$elm_vegalite$VegaLite$AxLabelBaseline;
var $gicentre$elm_vegalite$VegaLite$AxLabelFontWeight = function (a) {
	return {$: 32, a: a};
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
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $gicentre$elm_vegalite$VegaLite$sideSpec = function (side) {
	switch (side.$) {
		case 0:
			return $elm$json$Json$Encode$string('top');
		case 1:
			return $elm$json$Json$Encode$string('bottom');
		case 2:
			return $elm$json$Json$Encode$string('left');
		case 3:
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
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $gicentre$elm_vegalite$VegaLite$axisProperty = function (axisProp) {
	switch (axisProp.$) {
		case 0:
			var aps = axisProp.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 1:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPosition', n);
		case 80:
			var predicate = axisProp.a;
			var cap = axisProp.b;
			var firstProp = A2(
				$elm$core$Basics$composeR,
				$elm$core$List$head,
				$elm$core$Maybe$withDefault(
					_Utils_Tuple2('', $elm$json$Json$Encode$null)));
			var _v2 = function () {
				switch (cap.$) {
					case 0:
						var ha1 = cap.a;
						var ha2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelAlign(ha1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelAlign(ha2))));
					case 1:
						var va1 = cap.a;
						var va2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelBaseline(va1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelBaseline(va2))));
					case 2:
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelColor(c1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelColor(c2))));
					case 3:
						var f1 = cap.a;
						var f2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFont(f1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFont(f2))));
					case 4:
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontSize(s1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontSize(s2))));
					case 5:
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontStyle(s1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelFontStyle(s2))));
					case 6:
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelFontWeight(w1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$axLabelFontWeight(w2))));
					case 7:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOffset(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOffset(o2))));
					case 8:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOpacity(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelOpacity(o2))));
					case 9:
						var p1 = cap.a;
						var p2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelPadding(p1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxLabelPadding(p2))));
					case 10:
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickColor(c1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickColor(c2))));
					case 11:
						var d1 = cap.a;
						var d2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDash(d1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDash(d2))));
					case 12:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDashOffset(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickDashOffset(o2))));
					case 13:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickOpacity(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickOpacity(o2))));
					case 19:
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickSize(s1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickSize(s2))));
					case 14:
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickWidth(w1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxTickWidth(w2))));
					case 15:
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridColor(c1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridColor(c2))));
					case 16:
						var d1 = cap.a;
						var d2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDash(d1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDash(d2))));
					case 17:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDashOffset(o1))),
							firstProp(
								$gicentre$elm_vegalite$VegaLite$axisProperty(
									$gicentre$elm_vegalite$VegaLite$AxGridDashOffset(o2))));
					case 18:
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
		case 15:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 16:
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
		case 17:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 18:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 19:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 73:
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 74:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gridColor', s);
		case 75:
			var ns = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'gridDash', ns);
		case 76:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridDashOffset', n);
		case 77:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridOpacity', n);
		case 78:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gridWidth', n);
		case 20:
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'labels', b);
		case 21:
			var ha = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 23:
			var va = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 24:
			var mn = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$maybeNumExpr, 'labelBound', mn);
		case 22:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelAngle', n);
		case 25:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 26:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 27:
			var n = axisProp.a;
			switch (n.$) {
				case 0:
					var x = n.a;
					return (!x) ? _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(true))
						]) : A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'labelFlush',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlush', n);
			}
		case 28:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFlushOffset', n);
		case 29:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 30:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', n);
		case 31:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 32:
			var fw = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 34:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', n);
		case 33:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLineHeight', n);
		case 35:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', n);
		case 36:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOpacity', n);
		case 37:
			var strat = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(strat))
				]);
		case 38:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelPadding', n);
		case 39:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelSeparation', n);
		case 8:
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'domain', b);
		case 9:
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domainCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 10:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'domainColor', s);
		case 11:
			var ns = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'domainDash', ns);
		case 12:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainDashOffset', n);
		case 13:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainOpacity', n);
		case 14:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'domainWidth', n);
		case 72:
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'grid', b);
		case 2:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxExtent', n);
		case 3:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minExtent', n);
		case 4:
			var side = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(side))
				]);
		case 5:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', n);
		case 6:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'position', n);
		case 41:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'translate', n);
		case 40:
			var ss = axisProp.a;
			if (!ss.$) {
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
		case 7:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'zindex', n);
		case 52:
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'ticks', b);
		case 42:
			var tb = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickBand',
					$gicentre$elm_vegalite$VegaLite$tickBandSpec(tb))
				]);
		case 43:
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(c))
				]);
		case 44:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'tickColor', s);
		case 45:
			var tc = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCount',
					$gicentre$elm_vegalite$VegaLite$scaleNiceSpec(tc))
				]);
		case 46:
			var ns = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'tickDash', ns);
		case 47:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickDashOffset', n);
		case 48:
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickExtra', b);
		case 49:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOffset', n);
		case 50:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickOpacity', n);
		case 51:
			var b = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'tickRound', b);
		case 79:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickMinStep', n);
		case 53:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickSize', n);
		case 54:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tickWidth', n);
		case 55:
			var vals = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'values',
					$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(vals))
				]);
		case 56:
			var s = axisProp.a;
			if (!s.$) {
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
		case 57:
			var al = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(al))
				]);
		case 59:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleAngle', n);
		case 58:
			var an = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 60:
			var va = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 61:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 62:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 63:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', n);
		case 64:
			var s = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 65:
			var fw = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 66:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', n);
		case 67:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', n);
		case 68:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', n);
		case 69:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', n);
		case 70:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleX', n);
		default:
			var n = axisProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleY', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$concatConfigProperty = function (ccp) {
	if (!ccp.$) {
		var x = ccp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', x);
	} else {
		var x = ccp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'spacing', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$facetConfigProperty = function (fcp) {
	if (!fcp.$) {
		var x = fcp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', x);
	} else {
		var x = fcp.a;
		return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'spacing', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$fieldTitleLabel = function (ftp) {
	switch (ftp) {
		case 0:
			return 'verbal';
		case 1:
			return 'functional';
		default:
			return 'plain';
	}
};
var $gicentre$elm_vegalite$VegaLite$NoStr = {$: 1};
var $gicentre$elm_vegalite$VegaLite$headerProperty = function (hProp) {
	switch (hProp.$) {
		case 0:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 2:
			return A2(
				$gicentre$elm_vegalite$VegaLite$strExpr,
				'formatType',
				$gicentre$elm_vegalite$VegaLite$Str('time'));
		case 3:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 5:
			var ha = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 6:
			var a = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(a))
				]);
		case 7:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelAngle', x);
		case 8:
			var va = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 9:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 10:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelExpr', s);
		case 11:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 12:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', x);
		case 13:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 14:
			var fw = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 15:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', x);
		case 16:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLineHeight', x);
		case 17:
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOrient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(orient))
				]);
		case 18:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelPadding', x);
		case 19:
			var b = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'labels', b);
		case 20:
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(orient))
				]);
		case 4:
			var ttl = hProp.a;
			if (!ttl.$) {
				var s = ttl.a;
				if (s === '') {
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'title', $gicentre$elm_vegalite$VegaLite$NoStr);
				} else {
					return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', ttl);
				}
			} else {
				return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'title', ttl);
			}
		case 22:
			var a = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(a))
				]);
		case 21:
			var ha = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 23:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleAngle', x);
		case 24:
			var va = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 25:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 26:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 29:
			var fw = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 27:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', x);
		case 28:
			var s = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 30:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', x);
		case 31:
			var x = hProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', x);
		case 32:
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
		case 0:
			var aps = legendConfig.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 1:
			var b = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'disable', b);
		case 2:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipHeight', x);
		case 3:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columnPadding', x);
		case 34:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rowPadding', x);
		case 4:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'columns', x);
		case 6:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', x);
		case 5:
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'direction',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 7:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fillColor', s);
		case 32:
			var orient = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$legendOrientSpec(orient))
				]);
		case 31:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', x);
		case 35:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'strokeColor', s);
		case 36:
			var xs = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', xs);
		case 37:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', x);
		case 33:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padding', x);
		case 8:
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gradientDirection',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 16:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientHorizontalMaxLength', x);
		case 17:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientHorizontalMinLength', x);
		case 18:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientVerticalMaxLength', x);
		case 19:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientVerticalMinLength', x);
		case 9:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLabelLimit', x);
		case 11:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLength', x);
		case 10:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientLabelOffset', x);
		case 12:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientOpacity', x);
		case 13:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'gradientStrokeColor', s);
		case 14:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientStrokeWidth', x);
		case 15:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'gradientThickness', x);
		case 20:
			var ga = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridAlign',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$compositionAlignmentLabel(ga)))
				]);
		case 21:
			var ha = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 22:
			var va = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 23:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelColor', s);
		case 24:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFont', s);
		case 25:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelFontSize', x);
		case 26:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'labelFontStyle', s);
		case 27:
			var fw = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 28:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelLimit', x);
		case 29:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'labelOffset', x);
		case 30:
			var lo = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$gicentre$elm_vegalite$VegaLite$overlapStrategySpec(lo))
				]);
		case 42:
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolDirection',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(d)))
				]);
		case 44:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolLimit', x);
		case 43:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolFillColor', s);
		case 38:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolBaseFillColor', s);
		case 50:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolStrokeColor', s);
		case 39:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'symbolBaseStrokeColor', s);
		case 40:
			var xs = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'symbolDash', xs);
		case 41:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolDashOffset', x);
		case 45:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOffset', x);
		case 46:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolOpacity', x);
		case 47:
			var s = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolType',
					$gicentre$elm_vegalite$VegaLite$symbolSpec(s))
				]);
		case 48:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolSize', x);
		case 49:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'symbolStrokeWidth', x);
		case 51:
			return _List_fromArray(
				[
					_Utils_Tuple2('title', $elm$json$Json$Encode$null)
				]);
		case 52:
			var ha = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(ha))
				]);
		case 54:
			var va = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 53:
			var an = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 55:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleColor', s);
		case 56:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFont', s);
		case 57:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleFontSize', x);
		case 58:
			var s = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'titleFontStyle', s);
		case 59:
			var fw = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(fw))
				]);
		case 60:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLimit', x);
		case 61:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleLineHeight', x);
		case 62:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titleOpacity', x);
		case 63:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'titlePadding', x);
		case 64:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'unselectedOpacity', x);
		case 65:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendX', x);
		default:
			var x = legendConfig.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'legendY', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$localeProperty = function (lp) {
	switch (lp.$) {
		case 0:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'decimal', s);
		case 1:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'thousands', s);
		case 2:
			var grp = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'grouping', grp);
		case 3:
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'currency', ss);
		case 4:
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'numerals', ss);
		case 5:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'percent', s);
		case 6:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'minus', s);
		case 7:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'nan', s);
		case 8:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'dateTime', s);
		case 9:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'date', s);
		case 10:
			var s = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'time', s);
		case 11:
			var ps = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'periods', ps);
		case 12:
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'days', ss);
		case 13:
			var ss = lp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'shortDays', ss);
		case 14:
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
			case 0:
				return true;
			case 1:
				return true;
			case 2:
				return true;
			case 3:
				return true;
			case 4:
				return true;
			case 5:
				return true;
			case 6:
				return true;
			case 7:
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
var $gicentre$elm_vegalite$VegaLite$TTNone = 2;
var $gicentre$elm_vegalite$VegaLite$blendModeSpec = function (bm) {
	switch (bm.$) {
		case 0:
			return $elm$json$Json$Encode$null;
		case 1:
			return $elm$json$Json$Encode$string('multiply');
		case 2:
			return $elm$json$Json$Encode$string('screen');
		case 3:
			return $elm$json$Json$Encode$string('overlay');
		case 4:
			return $elm$json$Json$Encode$string('darken');
		case 5:
			return $elm$json$Json$Encode$string('lighten');
		case 6:
			return $elm$json$Json$Encode$string('color-dodge');
		case 7:
			return $elm$json$Json$Encode$string('color-burn');
		case 8:
			return $elm$json$Json$Encode$string('hard-light');
		case 9:
			return $elm$json$Json$Encode$string('soft-light');
		case 10:
			return $elm$json$Json$Encode$string('difference');
		case 11:
			return $elm$json$Json$Encode$string('exclusion');
		case 12:
			return $elm$json$Json$Encode$string('hue');
		case 13:
			return $elm$json$Json$Encode$string('saturation');
		case 14:
			return $elm$json$Json$Encode$string('color');
		case 15:
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
	if (!gr) {
		return 'linear';
	} else {
		return 'radial';
	}
};
var $gicentre$elm_vegalite$VegaLite$cursorSpec = function (cur) {
	switch (cur.$) {
		case 0:
			return $elm$json$Json$Encode$string('auto');
		case 1:
			return $elm$json$Json$Encode$string('default');
		case 2:
			return $elm$json$Json$Encode$string('none');
		case 3:
			return $elm$json$Json$Encode$string('context-menu');
		case 4:
			return $elm$json$Json$Encode$string('help');
		case 5:
			return $elm$json$Json$Encode$string('pointer');
		case 6:
			return $elm$json$Json$Encode$string('progress');
		case 7:
			return $elm$json$Json$Encode$string('wait');
		case 8:
			return $elm$json$Json$Encode$string('cell');
		case 9:
			return $elm$json$Json$Encode$string('crosshair');
		case 10:
			return $elm$json$Json$Encode$string('text');
		case 11:
			return $elm$json$Json$Encode$string('vertical-text');
		case 12:
			return $elm$json$Json$Encode$string('alias');
		case 13:
			return $elm$json$Json$Encode$string('copy');
		case 14:
			return $elm$json$Json$Encode$string('move');
		case 15:
			return $elm$json$Json$Encode$string('no-drop');
		case 16:
			return $elm$json$Json$Encode$string('not-allowed');
		case 17:
			return $elm$json$Json$Encode$string('all-scroll');
		case 18:
			return $elm$json$Json$Encode$string('col-resize');
		case 19:
			return $elm$json$Json$Encode$string('row-resize');
		case 20:
			return $elm$json$Json$Encode$string('n-resize');
		case 21:
			return $elm$json$Json$Encode$string('e-resize');
		case 22:
			return $elm$json$Json$Encode$string('s-resize');
		case 23:
			return $elm$json$Json$Encode$string('w-resize');
		case 24:
			return $elm$json$Json$Encode$string('ne-resize');
		case 25:
			return $elm$json$Json$Encode$string('nw-resize');
		case 26:
			return $elm$json$Json$Encode$string('se-resize');
		case 27:
			return $elm$json$Json$Encode$string('sw-resize');
		case 28:
			return $elm$json$Json$Encode$string('ew-resize');
		case 29:
			return $elm$json$Json$Encode$string('ns-resize');
		case 30:
			return $elm$json$Json$Encode$string('nesw-resize');
		case 31:
			return $elm$json$Json$Encode$string('nwse-resize');
		case 32:
			return $elm$json$Json$Encode$string('zoom-in');
		case 33:
			return $elm$json$Json$Encode$string('zoom-out');
		case 34:
			return $elm$json$Json$Encode$string('grab');
		case 35:
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
var $gicentre$elm_vegalite$VegaLite$extentSpec = function (ext) {
	switch (ext.$) {
		case 0:
			return $elm$json$Json$Encode$string('ci');
		case 1:
			return $elm$json$Json$Encode$string('stderr');
		case 2:
			return $elm$json$Json$Encode$string('stdev');
		case 3:
			return $elm$json$Json$Encode$string('iqr');
		case 4:
			return $elm$json$Json$Encode$string('min-max');
		default:
			var sc = ext.a;
			switch (sc.$) {
				case 0:
					var x = sc.a;
					return $elm$json$Json$Encode$float(x);
				case 1:
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
		case 0:
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x1', x);
		case 1:
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y1', x);
		case 2:
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x2', x);
		case 3:
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y2', x);
		case 4:
			var x = gp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'r1', x);
		case 5:
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
var $gicentre$elm_vegalite$VegaLite$markInterpolationSpec = function (interp) {
	switch (interp.$) {
		case 7:
			return $elm$json$Json$Encode$string('linear');
		case 8:
			return $elm$json$Json$Encode$string('linear-closed');
		case 12:
			return $elm$json$Json$Encode$string('step');
		case 11:
			return $elm$json$Json$Encode$string('step-before');
		case 10:
			return $elm$json$Json$Encode$string('step-after');
		case 0:
			return $elm$json$Json$Encode$string('basis');
		case 2:
			return $elm$json$Json$Encode$string('basis-open');
		case 1:
			return $elm$json$Json$Encode$string('basis-closed');
		case 4:
			return $elm$json$Json$Encode$string('cardinal');
		case 6:
			return $elm$json$Json$Encode$string('cardinal-open');
		case 5:
			return $elm$json$Json$Encode$string('cardinal-closed');
		case 3:
			return $elm$json$Json$Encode$string('bundle');
		case 9:
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
var $gicentre$elm_vegalite$VegaLite$strokeJoinSpec = function (jn) {
	switch (jn.$) {
		case 0:
			return $elm$json$Json$Encode$string('miter');
		case 1:
			return $elm$json$Json$Encode$string('round');
		case 2:
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
var $gicentre$elm_vegalite$VegaLite$textDirectionSpec = function (td) {
	switch (td.$) {
		case 0:
			return $elm$json$Json$Encode$string('ltr');
		case 1:
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
	switch (ttContent) {
		case 0:
			return $elm$json$Json$Encode$string('encoding');
		case 1:
			return $elm$json$Json$Encode$string('data');
		default:
			return $elm$json$Json$Encode$string('null');
	}
};
var $gicentre$elm_vegalite$VegaLite$lineMarkerSpec = function (pm) {
	if (!pm.$) {
		return $elm$json$Json$Encode$bool(false);
	} else {
		var mps = pm.a;
		return $elm$json$Json$Encode$object(
			A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps));
	}
};
var $gicentre$elm_vegalite$VegaLite$markProperty = function (mProp) {
	switch (mProp.$) {
		case 2:
			var aps = mProp.a;
			if (!aps.b) {
				return $gicentre$elm_vegalite$VegaLite$ariaProperty(
					$gicentre$elm_vegalite$VegaLite$ArAria(
						$gicentre$elm_vegalite$VegaLite$Boo(false)));
			} else {
				return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$ariaProperty, aps);
			}
		case 30:
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'filled', b);
		case 6:
			var bm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'blend',
					$gicentre$elm_vegalite$VegaLite$blendModeSpec(bm))
				]);
		case 9:
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clip', b);
		case 10:
			var s = mProp.a;
			switch (s.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('color', $elm$json$Json$Encode$null)
						]);
				case 0:
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('color', $elm$json$Json$Encode$null)
						]) : A2($gicentre$elm_vegalite$VegaLite$strExpr, 'color', s);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'color', s);
			}
		case 12:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', n);
		case 13:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusEnd', n);
		case 16:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusBottomLeft', n);
		case 17:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusBottomRight', n);
		case 14:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusTopLeft', n);
		case 15:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadiusTopRight', n);
		case 18:
			var cur = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$gicentre$elm_vegalite$VegaLite$cursorSpec(cur))
				]);
		case 27:
			var ext = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'extent',
					$gicentre$elm_vegalite$VegaLite$extentSpec(ext))
				]);
		case 19:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'href', s);
		case 49:
			var bl = mProp.a;
			if (!bl.$) {
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
		case 28:
			var s = mProp.a;
			switch (s.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('fill', $elm$json$Json$Encode$null)
						]);
				case 0:
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('fill', $elm$json$Json$Encode$null)
						]) : A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
			}
		case 29:
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
		case 11:
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
		case 55:
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
		case 54:
			var s = mProp.a;
			switch (s.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('stroke', $elm$json$Json$Encode$null)
						]);
				case 0:
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('stroke', $elm$json$Json$Encode$null)
						]) : A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
			}
		case 56:
			var sc = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(sc))
				]);
		case 59:
			var sj = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$gicentre$elm_vegalite$VegaLite$strokeJoinSpec(sj))
				]);
		case 60:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeMiterLimit', n);
		case 41:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'opacity', n);
		case 31:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', n);
		case 61:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', n);
		case 62:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', n);
		case 57:
			var ns = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', ns);
		case 58:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', n);
		case 63:
			var styles = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styles))
				]);
		case 37:
			var interp = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interpolate',
					$gicentre$elm_vegalite$VegaLite$markInterpolationSpec(interp))
				]);
		case 64:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tension', n);
		case 45:
			var orient = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$markOrientationLabel(orient)))
				]);
		case 51:
			var sym = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'shape',
					$gicentre$elm_vegalite$VegaLite$symbolSpec(sym))
				]);
		case 53:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'size', n);
		case 1:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'angle', n);
		case 0:
			var al = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'align',
					$gicentre$elm_vegalite$VegaLite$hAlignSpec(al))
				]);
		case 4:
			var va = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'baseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 25:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dx', n);
		case 26:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dy', n);
		case 32:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'font', s);
		case 33:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fontSize', n);
		case 34:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fontStyle', s);
		case 35:
			var w = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 48:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radius', n);
		case 36:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'innerRadius', n);
		case 42:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'outerRadius', n);
		case 46:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'padAngle', n);
		case 65:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'text', s);
		case 39:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'lineHeight', n);
		case 21:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'limit', n);
		case 22:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'ellipsis', s);
		case 23:
			var td = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'dir',
					$gicentre$elm_vegalite$VegaLite$textDirectionSpec(td))
				]);
		case 66:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'theta', n);
		case 67:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'theta2', n);
		case 84:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'thetaOffset', n);
		case 85:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'theta2Offset', n);
		case 5:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'binSpacing', n);
		case 20:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousBandSize', n);
		case 24:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'discreteBandSize', n);
		case 52:
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'shortTimeLabels', b);
		case 3:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandSize', n);
		case 68:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'thickness', n);
		case 50:
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
		case 7:
			var props = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'borders',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
				]);
		case 40:
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
		case 8:
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
		case 43:
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
		case 69:
			var props = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'ticks',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, props)))
				]);
		case 70:
			var ttContent = mProp.a;
			return (ttContent === 2) ? _List_fromArray(
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
		case 47:
			var pm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'point',
					$gicentre$elm_vegalite$VegaLite$pointMarkerSpec(pm))
				]);
		case 38:
			var lm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'line',
					$gicentre$elm_vegalite$VegaLite$lineMarkerSpec(lm))
				]);
		case 72:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'width', n);
		case 73:
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'width',
					$elm$json$Json$Encode$object(
						A2($gicentre$elm_vegalite$VegaLite$numExpr, 'band', n)))
				]);
		case 74:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'height', n);
		case 75:
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'height',
					$elm$json$Json$Encode$object(
						A2($gicentre$elm_vegalite$VegaLite$numExpr, 'band', n)))
				]);
		case 76:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x', n);
		case 77:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y', n);
		case 78:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x2', n);
		case 79:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y2', n);
		case 44:
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'order', b);
		case 80:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'xOffset', n);
		case 82:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'x2Offset', n);
		case 81:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'yOffset', n);
		case 83:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'y2Offset', n);
		case 86:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radiusOffset', n);
		case 87:
			var n = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radius2Offset', n);
		case 88:
			var b = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'aspect', b);
		default:
			var s = mProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'url', s);
	}
};
var $gicentre$elm_vegalite$VegaLite$pointMarkerSpec = function (pm) {
	switch (pm.$) {
		case 0:
			return $elm$json$Json$Encode$string('transparent');
		case 1:
			return $elm$json$Json$Encode$bool(false);
		default:
			var mps = pm.a;
			return _Utils_eq(mps, _List_Nil) ? $elm$json$Json$Encode$bool(true) : $elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps));
	}
};
var $gicentre$elm_vegalite$VegaLite$paddingSpec = function (pad) {
	switch (pad.$) {
		case 0:
			var x = pad.a;
			switch (x.$) {
				case 0:
					var n = x.a;
					return $elm$json$Json$Encode$float(n);
				case 1:
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
		case 1:
			var s = pad.a;
			if (!s.$) {
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
		case 0:
			var x = n.a;
			return $elm$core$String$fromFloat(x);
		case 1:
			return 'null';
		default:
			var s = n.a;
			return s;
	}
};
var $gicentre$elm_vegalite$VegaLite$projectionSpec = function (proj) {
	switch (proj.$) {
		case 0:
			return $elm$json$Json$Encode$string('albers');
		case 1:
			return $elm$json$Json$Encode$string('albersUsa');
		case 2:
			return $elm$json$Json$Encode$string('azimuthalEqualArea');
		case 3:
			return $elm$json$Json$Encode$string('azimuthalEquidistant');
		case 4:
			return $elm$json$Json$Encode$string('conicConformal');
		case 5:
			return $elm$json$Json$Encode$string('conicEqualarea');
		case 6:
			return $elm$json$Json$Encode$string('conicEquidistant');
		case 7:
			var projName = proj.a;
			return $elm$json$Json$Encode$string(projName);
		case 9:
			return $elm$json$Json$Encode$string('equalEarth');
		case 8:
			return $elm$json$Json$Encode$string('equirectangular');
		case 10:
			return $elm$json$Json$Encode$string('gnomonic');
		case 11:
			return $elm$json$Json$Encode$string('identity');
		case 12:
			return $elm$json$Json$Encode$string('mercator');
		case 13:
			return $elm$json$Json$Encode$string('naturalEarth1');
		case 14:
			return $elm$json$Json$Encode$string('orthographic');
		case 15:
			return $elm$json$Json$Encode$string('stereographic');
		case 16:
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
		case 0:
			var proj = pp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$gicentre$elm_vegalite$VegaLite$projectionSpec(proj))
				]);
		case 6:
			var spec = pp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2('fit', spec)
				]);
		case 1:
			var n = pp.a;
			switch (n.$) {
				case 0:
					var x = n.a;
					return (x > 0) ? A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipAngle', n) : _List_fromArray(
						[
							_Utils_Tuple2('clipAngle', $elm$json$Json$Encode$null)
						]);
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('clipAngle', $elm$json$Json$Encode$null)
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'clipAngle', n);
			}
		case 2:
			var rClip = pp.a;
			switch (rClip.$) {
				case 0:
					return _List_fromArray(
						[
							_Utils_Tuple2('clipExtent', $elm$json$Json$Encode$null)
						]);
				case 1:
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
		case 11:
			var b = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'reflectX', b);
		case 12:
			var b = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'reflectY', b);
		case 3:
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
		case 4:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'scale', x);
		case 5:
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
		case 7:
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
		case 10:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'pointRadius', x);
		case 8:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'precision', x);
		case 13:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'coefficient', x);
		case 14:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'distance', x);
		case 15:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fraction', x);
		case 16:
			var n = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'lobes', n);
		case 17:
			var lat = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'parallel', lat);
		case 9:
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
		case 18:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'radius', x);
		case 19:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'ratio', x);
		case 20:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'spacing', x);
		default:
			var x = pp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'tilt', x);
	}
};
var $gicentre$elm_vegalite$VegaLite$rangeConfigProperty = function (rangeCfg) {
	switch (rangeCfg.$) {
		case 0:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'category',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 1:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'diverging',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 2:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'heatmap',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 3:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'ordinal',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 4:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'ramp',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($gicentre$elm_vegalite$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 5:
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
		case 0:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPaddingInner', x);
		case 3:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPaddingOuter', x);
		case 1:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'barBandPaddingInner', x);
		case 2:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'rectBandPaddingInner', x);
		case 5:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousPadding', x);
		case 4:
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clamp', b);
		case 6:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxBandSize', x);
		case 7:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minBandSize', x);
		case 8:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxFontSize', x);
		case 9:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minFontSize', x);
		case 10:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxOpacity', x);
		case 11:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minOpacity', x);
		case 12:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxSize', x);
		case 13:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minSize', x);
		case 14:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'maxStrokeWidth', x);
		case 15:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'minStrokeWidth', x);
		case 16:
			var x = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'pointPadding', x);
		case 17:
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'round', b);
		case 18:
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'useUnaggregatedDomain', b);
		default:
			var b = scaleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'xReverse', b);
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionLabel = function (seType) {
	if (!seType) {
		return 'point';
	} else {
		return 'interval';
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionMarkProperty = function (markProp) {
	switch (markProp.$) {
		case 0:
			var ss = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', ss);
		case 1:
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', x);
		case 2:
			var s = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
		case 3:
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', x);
		case 4:
			var x = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', x);
		case 5:
			var xs = markProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', xs);
		case 6:
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
	switch (res) {
		case 0:
			return 'global';
		case 1:
			return 'union';
		default:
			return 'intersect';
	}
};
var $gicentre$elm_vegalite$VegaLite$togglePredicateSpec = function (tp) {
	switch (tp.$) {
		case 0:
			return $elm$json$Json$Encode$bool(false);
		case 1:
			var ex = tp.a;
			return $elm$json$Json$Encode$string(ex);
		case 2:
			return $elm$json$Json$Encode$string('event.shiftKey');
		case 3:
			return $elm$json$Json$Encode$string('event.ctrlKey');
		default:
			return $elm$json$Json$Encode$string('event.altKey');
	}
};
var $gicentre$elm_vegalite$VegaLite$selectionProperties = function (selProp) {
	switch (selProp.$) {
		case 4:
			var fNames = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fields',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, fNames))
				]);
		case 5:
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
		case 0:
			var s = selProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'on', s);
		case 1:
			var es = selProp.a;
			switch (es.$) {
				case 0:
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
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'clear',
							$elm$json$Json$Encode$bool(false))
						]);
				default:
					return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'clear', es);
			}
		case 6:
			var res = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'resolve',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$selectionResolutionLabel(res)))
				]);
		case 7:
			var markProps = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mark',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$selectionMarkProperty, markProps)))
				]);
		case 8:
			var b = selProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'nearest', b);
		case 9:
			var tp = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'toggle',
					$gicentre$elm_vegalite$VegaLite$togglePredicateSpec(tp))
				]);
		case 2:
			var es = selProp.a;
			switch (es.$) {
				case 0:
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
				case 1:
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
				case 0:
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
				case 1:
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
		case 1:
			return $elm$json$Json$Encode$string('group');
		case 0:
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
		case 0:
			var an = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'anchor',
					$gicentre$elm_vegalite$VegaLite$anchorSpec(an))
				]);
		case 1:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'angle', n);
		case 2:
			var va = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'baseline',
					$gicentre$elm_vegalite$VegaLite$vAlignSpec(va))
				]);
		case 3:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'color', s);
		case 4:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dx', n);
		case 5:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'dy', n);
		case 6:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'font', s);
		case 7:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fontSize', n);
		case 8:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fontStyle', s);
		case 10:
			var tf = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'frame',
					$gicentre$elm_vegalite$VegaLite$tfSpec(tf))
				]);
		case 9:
			var w = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 12:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'limit', n);
		case 11:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'lineHeight', n);
		case 13:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'offset', n);
		case 14:
			var sd = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$gicentre$elm_vegalite$VegaLite$sideSpec(sd))
				]);
		case 15:
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
		case 16:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'subtitle', s);
		case 17:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'subtitleColor', s);
		case 18:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'subtitleFont', s);
		case 19:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'subtitleFontSize', n);
		case 20:
			var s = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'subtitleFontStyle', s);
		case 21:
			var w = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'subtitleFontWeight',
					$gicentre$elm_vegalite$VegaLite$fontWeightSpec(w))
				]);
		case 22:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'subtitleLineHeight', n);
		case 23:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'subtitlePadding', n);
		default:
			var n = titleCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'zindex', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$viewBackgroundProperty = function (vb) {
	switch (vb.$) {
		case 0:
			var ss = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$strsExpr, 'style', ss);
		case 1:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', n);
		case 2:
			var s = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
		case 3:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', n);
		case 4:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'opacity', n);
		case 5:
			var s = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
		case 6:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', n);
		case 8:
			var cap = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(cap))
				]);
		case 11:
			var jn = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$gicentre$elm_vegalite$VegaLite$strokeJoinSpec(jn))
				]);
		case 7:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', n);
		case 9:
			var ns = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', ns);
		case 10:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', n);
		default:
			var n = vb.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeMiterLimit', n);
	}
};
var $gicentre$elm_vegalite$VegaLite$viewConfigProperties = function (viewCfg) {
	switch (viewCfg.$) {
		case 2:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousWidth', x);
		case 3:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'continuousHeight', x);
		case 6:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'discreteWidth', x);
		case 7:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'discreteHeight', x);
		case 1:
			var b = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'clip', b);
		case 4:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'cornerRadius', x);
		case 5:
			var cur = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$gicentre$elm_vegalite$VegaLite$cursorSpec(cur))
				]);
		case 8:
			var s = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'fill', s);
		case 9:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'fillOpacity', x);
		case 10:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'opacity', x);
		case 11:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'step', x);
		case 12:
			var s = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'stroke', s);
		case 13:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeOpacity', x);
		case 15:
			var cap = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$gicentre$elm_vegalite$VegaLite$strokeCapSpec(cap))
				]);
		case 18:
			var jn = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$gicentre$elm_vegalite$VegaLite$strokeJoinSpec(jn))
				]);
		case 14:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeWidth', x);
		case 16:
			var xs = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numsExpr, 'strokeDash', xs);
		case 17:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeDashOffset', x);
		case 19:
			var x = viewCfg.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'strokeMiterLimit', x);
		default:
			var vbs = viewCfg.a;
			return A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$viewBackgroundProperty, vbs);
	}
};
var $gicentre$elm_vegalite$VegaLite$configProperty = function (configProp) {
	switch (configProp.$) {
		case 1:
			var b = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'aria', b);
		case 2:
			var aus = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'autosize',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$autosizeProperty, aus)))
				]);
		case 14:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'background', s);
		case 18:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'countTitle', s);
		case 24:
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
		case 20:
			var ftp = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fieldTitle',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$fieldTitleLabel(ftp)))
				]);
		case 30:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'normalizedNumberFormat', s);
		case 31:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'normalizedNumberFormatType', s);
		case 32:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'numberFormat', s);
		case 33:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'numberFormatType', s);
		case 34:
			var pad = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'padding',
					$gicentre$elm_vegalite$VegaLite$paddingSpec(pad))
				]);
		case 46:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'timeFormat', s);
		case 47:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'timeFormatType', s);
		case 3:
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType),
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 5:
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisLeft',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 6:
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisRight',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 7:
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisTop',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 8:
			var acs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'axisBottom',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 9:
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Band',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 10:
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Discrete',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 11:
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Point',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 12:
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Quantitative',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 13:
			var axType = configProp.a;
			var acs = configProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					$gicentre$elm_vegalite$VegaLite$axisLabel(axType) + 'Temporal',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$axisConfigProperty, acs)))
				]);
		case 23:
			var lcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'legend',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$legendConfigProperty, lcs)))
				]);
		case 21:
			var s = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'font', s);
		case 28:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mark',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 36:
			var pps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'projection',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$projectionProperty, pps)))
				]);
		case 0:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'area',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 15:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bar',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 16:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'circle',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 26:
			var fps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'facet',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$facetConfigProperty, fps)))
				]);
		case 17:
			var cps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'concat',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$concatConfigProperty, cps)))
				]);
		case 19:
			var b = configProp.a;
			return A2($gicentre$elm_vegalite$VegaLite$booExpr, 'customFormatTypes', b);
		case 22:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'geoshape',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 27:
			var hps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'header',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$headerProperty, hps)))
				]);
		case 25:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'line',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 35:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'point',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 38:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'rect',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 39:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'rule',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 42:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'square',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 43:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'text',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 44:
			var mps = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tick',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$markProperty, mps)))
				]);
		case 45:
			var tcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$titleConfigProperty, tcs)))
				]);
		case 29:
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
		case 4:
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
		case 40:
			var scs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$scaleConfigProperty, scs)))
				]);
		case 37:
			var rcs = configProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'range',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, $gicentre$elm_vegalite$VegaLite$rangeConfigProperty, rcs)))
				]);
		case 41:
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
		case 49:
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
var $gicentre$elm_vegalite$VegaLite$VLConfig = 32;
var $gicentre$elm_vegalite$VegaLite$configure = function (configs) {
	return _Utils_Tuple2(
		32,
		$elm$json$Json$Encode$object(configs));
};
var $author$project$Data$County$Chatham = 0;
var $author$project$Data$County$Durham = 1;
var $author$project$Data$County$Orange = 2;
var $author$project$Data$County$countyToString = function (county) {
	switch (county) {
		case 0:
			return 'chatham';
		case 1:
			return 'durham';
		default:
			return 'orange';
	}
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$Data$County$countyColorMap = A2(
	$elm$core$List$map,
	$elm$core$Tuple$mapFirst($author$project$Data$County$countyToString),
	_List_fromArray(
		[
			_Utils_Tuple2(2, '#ec5900'),
			_Utils_Tuple2(0, '#11c385'),
			_Utils_Tuple2(1, '#7b0905')
		]));
var $gicentre$elm_vegalite$VegaLite$DName = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$dName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$DName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$detailChannelProperty = function (field) {
	switch (field.$) {
		case 0:
			var s = field.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 1:
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(t)))
				]);
		case 2:
			var bps = field.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 3:
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
var $gicentre$elm_vegalite$VegaLite$VLEncoding = 18;
var $gicentre$elm_vegalite$VegaLite$encoding = function (channels) {
	return _Utils_Tuple2(
		18,
		$elm$json$Json$Encode$object(channels));
};
var $gicentre$elm_vegalite$VegaLite$FEqual = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $gicentre$elm_vegalite$VegaLite$fiEqual = $gicentre$elm_vegalite$VegaLite$FEqual;
var $gicentre$elm_vegalite$VegaLite$filter = function (f) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'filter',
			$gicentre$elm_vegalite$VegaLite$filterSpec(f)));
};
var $gicentre$elm_vegalite$VegaLite$VLHeight = 5;
var $gicentre$elm_vegalite$VegaLite$height = function (h) {
	return _Utils_Tuple2(
		5,
		$elm$json$Json$Encode$float(h));
};
var $gicentre$elm_vegalite$VegaLite$VLLayer = 19;
var $gicentre$elm_vegalite$VegaLite$layer = function (specs) {
	return _Utils_Tuple2(
		19,
		$gicentre$elm_vegalite$VegaLite$toList(specs));
};
var $gicentre$elm_vegalite$VegaLite$Line = 9;
var $gicentre$elm_vegalite$VegaLite$VLMark = 15;
var $gicentre$elm_vegalite$VegaLite$markLabel = function (m) {
	switch (m) {
		case 0:
			return 'arc';
		case 1:
			return 'area';
		case 2:
			return 'bar';
		case 3:
			return 'boxplot';
		case 6:
			return 'circle';
		case 4:
			return 'errorband';
		case 5:
			return 'errorbar';
		case 8:
			return 'image';
		case 9:
			return 'line';
		case 7:
			return 'geoshape';
		case 10:
			return 'point';
		case 11:
			return 'rect';
		case 12:
			return 'rule';
		case 13:
			return 'square';
		case 14:
			return 'text';
		case 15:
			return 'tick';
		default:
			return 'trail';
	}
};
var $gicentre$elm_vegalite$VegaLite$mark = F2(
	function (m, mProps) {
		if (!mProps.b) {
			return _Utils_Tuple2(
				15,
				$elm$json$Json$Encode$string(
					$gicentre$elm_vegalite$VegaLite$markLabel(m)));
		} else {
			return _Utils_Tuple2(
				15,
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
var $gicentre$elm_vegalite$VegaLite$line = $gicentre$elm_vegalite$VegaLite$mark(9);
var $gicentre$elm_vegalite$VegaLite$MName = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$mName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$MmType = function (a) {
	return {$: 6, a: a};
};
var $gicentre$elm_vegalite$VegaLite$Nominal = 0;
var $gicentre$elm_vegalite$VegaLite$mNominal = $gicentre$elm_vegalite$VegaLite$MmType(0);
var $gicentre$elm_vegalite$VegaLite$MScale = function (a) {
	return {$: 7, a: a};
};
var $gicentre$elm_vegalite$VegaLite$mScale = $gicentre$elm_vegalite$VegaLite$MScale;
var $gicentre$elm_vegalite$VegaLite$MTitle = function (a) {
	return {$: 13, a: a};
};
var $gicentre$elm_vegalite$VegaLite$mTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$MColor = function (a) {
	return {$: 10, a: a};
};
var $gicentre$elm_vegalite$VegaLite$maColor = function (s) {
	return $gicentre$elm_vegalite$VegaLite$MColor(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$MOpacity = function (a) {
	return {$: 41, a: a};
};
var $gicentre$elm_vegalite$VegaLite$Num = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$maOpacity = function (n) {
	return $gicentre$elm_vegalite$VegaLite$MOpacity(
		$gicentre$elm_vegalite$VegaLite$Num(n));
};
var $gicentre$elm_vegalite$VegaLite$MStrokeWidth = function (a) {
	return {$: 62, a: a};
};
var $gicentre$elm_vegalite$VegaLite$maStrokeWidth = function (n) {
	return $gicentre$elm_vegalite$VegaLite$MStrokeWidth(
		$gicentre$elm_vegalite$VegaLite$Num(n));
};
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
var $gicentre$elm_vegalite$VegaLite$Mean = {$: 7};
var $gicentre$elm_vegalite$VegaLite$opMean = $gicentre$elm_vegalite$VegaLite$Mean;
var $gicentre$elm_vegalite$VegaLite$Sum = {$: 17};
var $gicentre$elm_vegalite$VegaLite$opSum = $gicentre$elm_vegalite$VegaLite$Sum;
var $gicentre$elm_vegalite$VegaLite$PAggregate = function (a) {
	return {$: 12, a: a};
};
var $gicentre$elm_vegalite$VegaLite$pAggregate = $gicentre$elm_vegalite$VegaLite$PAggregate;
var $gicentre$elm_vegalite$VegaLite$PAxis = function (a) {
	return {$: 14, a: a};
};
var $gicentre$elm_vegalite$VegaLite$pAxis = $gicentre$elm_vegalite$VegaLite$PAxis;
var $gicentre$elm_vegalite$VegaLite$PName = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$pName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$PName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$PmType = function (a) {
	return {$: 7, a: a};
};
var $gicentre$elm_vegalite$VegaLite$Quantitative = 2;
var $gicentre$elm_vegalite$VegaLite$pQuant = $gicentre$elm_vegalite$VegaLite$PmType(2);
var $gicentre$elm_vegalite$VegaLite$Temporal = 3;
var $gicentre$elm_vegalite$VegaLite$pTemporal = $gicentre$elm_vegalite$VegaLite$PmType(3);
var $gicentre$elm_vegalite$VegaLite$imMethodLabel = function (method) {
	switch (method) {
		case 0:
			return 'value';
		case 1:
			return 'mean';
		case 2:
			return 'median';
		case 3:
			return 'max';
		default:
			return 'min';
	}
};
var $gicentre$elm_vegalite$VegaLite$imputeProperty = function (ip) {
	switch (ip.$) {
		case 0:
			if (!ip.a.$) {
				if (!ip.b.$) {
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
				if (!ip.b.$) {
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
		case 1:
			var dVals = ip.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'keyvals',
					$gicentre$elm_vegalite$VegaLite$dataValuesSpecs(dVals))
				]);
		case 2:
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
		case 3:
			var method = ip.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'method',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$imMethodLabel(method)))
				]);
		case 5:
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
	switch (sp) {
		case 0:
			return $elm$json$Json$Encode$string('zero');
		case 1:
			return $elm$json$Json$Encode$string('normalize');
		case 2:
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
		case 0:
			var s = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 1:
			var d = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$gicentre$elm_vegalite$VegaLite$dataValueSpec(d))
				]);
		case 7:
			var measure = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(measure)))
				]);
		case 8:
			var bps = pDef.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 9:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 12:
			var op = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 10:
			var tu = pDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		case 11:
			var s = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', s);
		case 15:
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
							case 0:
								var _v2 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('ascending'))
									]);
							case 1:
								var _v3 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('descending'))
									]);
							case 2:
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
		case 16:
			var x = pDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$numExpr, 'bandPosition', x);
		case 13:
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
		case 14:
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
		case 17:
			var so = pDef.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$stackOffsetProperty(so)
				]);
		case 5:
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
		case 6:
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
		case 2:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string('width'))
				]);
		case 3:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string('height'))
				]);
		case 4:
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
	switch (pChannel) {
		case 0:
			return 'x';
		case 1:
			return 'y';
		case 2:
			return 'x2';
		case 3:
			return 'y2';
		case 4:
			return 'xOffset';
		case 5:
			return 'yOffset';
		case 6:
			return 'theta';
		case 7:
			return 'theta2';
		case 8:
			return 'radius';
		case 9:
			return 'radius2';
		case 14:
			return 'xError';
		case 15:
			return 'yError';
		case 16:
			return 'xError2';
		case 17:
			return 'yError2';
		case 10:
			return 'longitude';
		case 11:
			return 'latitude';
		case 12:
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
var $gicentre$elm_vegalite$VegaLite$DStr = function (a) {
	return {$: 3, a: a};
};
var $gicentre$elm_vegalite$VegaLite$str = $gicentre$elm_vegalite$VegaLite$DStr;
var $gicentre$elm_vegalite$VegaLite$TAggregate = function (a) {
	return {$: 5, a: a};
};
var $gicentre$elm_vegalite$VegaLite$tAggregate = $gicentre$elm_vegalite$VegaLite$TAggregate;
var $gicentre$elm_vegalite$VegaLite$TFormat = function (a) {
	return {$: 10, a: a};
};
var $gicentre$elm_vegalite$VegaLite$tFormat = function (s) {
	return $gicentre$elm_vegalite$VegaLite$TFormat(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$TName = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$tName = function (s) {
	return $gicentre$elm_vegalite$VegaLite$TName(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$TmType = function (a) {
	return {$: 2, a: a};
};
var $gicentre$elm_vegalite$VegaLite$tQuant = $gicentre$elm_vegalite$VegaLite$TmType(2);
var $gicentre$elm_vegalite$VegaLite$tTemporal = $gicentre$elm_vegalite$VegaLite$TmType(3);
var $gicentre$elm_vegalite$VegaLite$TTitle = function (a) {
	return {$: 7, a: a};
};
var $gicentre$elm_vegalite$VegaLite$tTitle = function (s) {
	return $gicentre$elm_vegalite$VegaLite$TTitle(
		$gicentre$elm_vegalite$VegaLite$Str(s));
};
var $gicentre$elm_vegalite$VegaLite$VLTitle = 3;
var $gicentre$elm_vegalite$VegaLite$title = F2(
	function (txt, tps) {
		return _Utils_Tuple2(
			3,
			$elm$json$Json$Encode$object(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'text',
						$gicentre$elm_vegalite$VegaLite$multilineTextSpec(txt)),
					A2($elm$core$List$concatMap, $gicentre$elm_vegalite$VegaLite$titleConfigProperty, tps))));
	});
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
var $gicentre$elm_vegalite$VegaLite$textChannelProperties = function (tDef) {
	switch (tDef.$) {
		case 0:
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'field', s);
		case 1:
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
		case 2:
			var measure = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$gicentre$elm_vegalite$VegaLite$measurementLabel(measure)))
				]);
		case 3:
			var bps = tDef.a;
			return _List_fromArray(
				[
					$gicentre$elm_vegalite$VegaLite$bin(bps)
				]);
		case 4:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 5:
			var op = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$gicentre$elm_vegalite$VegaLite$operationSpec(op))
				]);
		case 6:
			var tu = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$gicentre$elm_vegalite$VegaLite$timeUnitSpec(tu))
				]);
		case 7:
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExprMultiline, 'title', s);
		case 10:
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'format', s);
		case 11:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 12:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 13:
			var s = tDef.a;
			return A2($gicentre$elm_vegalite$VegaLite$strExpr, 'formatType', s);
		case 8:
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
		case 9:
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
		case 14:
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
var $gicentre$elm_vegalite$VegaLite$VLTransform = 16;
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
	return $elm$core$List$isEmpty(transforms) ? _Utils_Tuple2(16, $elm$json$Json$Encode$null) : _Utils_Tuple2(
		16,
		A2($elm$json$Json$Encode$list, assemble, transforms));
};
var $gicentre$elm_vegalite$VegaLite$VBackground = function (a) {
	return {$: 0, a: a};
};
var $gicentre$elm_vegalite$VegaLite$vicoBackground = $gicentre$elm_vegalite$VegaLite$VBackground;
var $gicentre$elm_vegalite$VegaLite$VBStroke = function (a) {
	return {$: 5, a: a};
};
var $gicentre$elm_vegalite$VegaLite$viewStroke = function (ms) {
	if (!ms.$) {
		var s = ms.a;
		return $gicentre$elm_vegalite$VegaLite$VBStroke(
			$gicentre$elm_vegalite$VegaLite$Str(s));
	} else {
		return $gicentre$elm_vegalite$VegaLite$VBStroke($gicentre$elm_vegalite$VegaLite$NoStr);
	}
};
var $gicentre$elm_vegalite$VegaLite$VLWidth = 4;
var $gicentre$elm_vegalite$VegaLite$width = function (w) {
	return _Utils_Tuple2(
		4,
		$elm$json$Json$Encode$float(w));
};
var $author$project$Specs$SpeciesTrend$mkSpeciesTrendSpec = F4(
	function (countData, routeDetail, counties, species) {
		var withRouteDetail = F3(
			function (show, hide, x) {
				if (!routeDetail) {
					return show(x);
				} else {
					return hide(x);
				}
			});
		var withCountyAggregation = F3(
			function (combined, split, x) {
				if (!counties) {
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
				0,
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
							1,
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
									$gicentre$elm_vegalite$VegaLite$mNominal,
									$gicentre$elm_vegalite$VegaLite$mScale(
									$gicentre$elm_vegalite$VegaLite$categoricalDomainMap($author$project$Data$County$countyColorMap))
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
		var summaryLayer = _List_fromArray(
			[
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
			]);
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
							1,
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
									$gicentre$elm_vegalite$VegaLite$mNominal,
									$gicentre$elm_vegalite$VegaLite$mScale(
									$gicentre$elm_vegalite$VegaLite$categoricalDomainMap($author$project$Data$County$countyColorMap))
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
		var detailLayer = _List_fromArray(
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
					]))
			]);
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
					A3(
						withRouteDetail,
						$elm$core$Basics$append(detailLayer),
						function (x) {
							return x;
						},
						summaryLayer))
				]));
	});
var $author$project$DisplayIndividualSpecies$mkSpecs = $author$project$Specs$SpeciesTrend$mkSpeciesTrendSpec($author$project$Data$Mbbs$mbbsData);
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
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
var $Confidenceman02$elm_select$Select$Clear = {$: 4};
var $Confidenceman02$elm_select$Select$Internal$Clearable = 1;
var $Confidenceman02$elm_select$Select$CloseMenu = {$: 19};
var $Confidenceman02$elm_select$Select$Internal$ContainerMousedown = {$: 2};
var $Confidenceman02$elm_select$Select$Internal$ControlInput = 0;
var $Confidenceman02$elm_select$Select$Deselect = function (a) {
	return {$: 3, a: a};
};
var $Confidenceman02$elm_select$Select$Internal$Down = 1;
var $Confidenceman02$elm_select$Select$FocusSet = {$: 5};
var $Confidenceman02$elm_select$Select$FocusingClearableH = 1;
var $Confidenceman02$elm_select$Select$FocusingInputH = 0;
var $Confidenceman02$elm_select$Select$InputChange = function (a) {
	return {$: 0, a: a};
};
var $Confidenceman02$elm_select$Select$Keyboard = 0;
var $Confidenceman02$elm_select$Select$Internal$MenuItemMousedown = function (a) {
	return {$: 1, a: a};
};
var $Confidenceman02$elm_select$Select$Internal$MultiItemMousedown = function (a) {
	return {$: 0, a: a};
};
var $Confidenceman02$elm_select$Select$OnInputFocused = function (a) {
	return {$: 10, a: a};
};
var $Confidenceman02$elm_select$Select$OnMenuClearableFocus = function (a) {
	return {$: 12, a: a};
};
var $Confidenceman02$elm_select$Select$OpenMenu = {$: 18};
var $Confidenceman02$elm_select$Select$Select = function (a) {
	return {$: 1, a: a};
};
var $Confidenceman02$elm_select$Select$SelectBatch = function (a) {
	return {$: 2, a: a};
};
var $Confidenceman02$elm_select$Select$Internal$Up = 0;
var $Confidenceman02$elm_select$Select$Internal$calculateNextActiveTarget = F3(
	function (currentTargetIndex, totalTargetCount, direction) {
		if (!direction) {
			return (!currentTargetIndex) ? (totalTargetCount - 1) : ((_Utils_cmp(totalTargetCount, currentTargetIndex + 1) < 0) ? 0 : (currentTargetIndex - 1));
		} else {
			return _Utils_eq(currentTargetIndex + 1, totalTargetCount) ? 0 : ((_Utils_cmp(totalTargetCount, currentTargetIndex + 1) < 0) ? 0 : (currentTargetIndex + 1));
		}
	});
var $Confidenceman02$elm_select$Select$clearableId = function (_v0) {
	var id_ = _v0;
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
					task)));
	});
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $Confidenceman02$elm_select$Select$internalFocus = F2(
	function (id, msg) {
		return A2(
			$elm$core$Task$attempt,
			msg,
			$elm$browser$Browser$Dom$focus(id));
	});
var $Confidenceman02$elm_select$Select$Above = 1;
var $Confidenceman02$elm_select$Select$Below = 2;
var $Confidenceman02$elm_select$Select$Both = 3;
var $Confidenceman02$elm_select$Select$Within = 0;
var $Confidenceman02$elm_select$Select$calculateMenuBoundaries = function (_v0) {
	var menuListElem = _v0;
	return _Utils_Tuple2(menuListElem.T.aH, menuListElem.T.aH + menuListElem.T.dx);
};
var $Confidenceman02$elm_select$Select$isMenuItemWithinBottomBoundary = F2(
	function (_v0, bottomBoundary) {
		var menuItemElement = _v0;
		return _Utils_cmp(menuItemElement.T.aH + menuItemElement.T.dx, bottomBoundary) < 1;
	});
var $Confidenceman02$elm_select$Select$isMenuItemWithinTopBoundary = F2(
	function (_v0, topBoundary) {
		var menuItemElement = _v0;
		return _Utils_cmp(topBoundary, menuItemElement.T.aH) < 1;
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
				return 0;
			} else {
				return 2;
			}
		} else {
			if (_v1.b) {
				return 1;
			} else {
				return 3;
			}
		}
	});
var $Confidenceman02$elm_select$Select$FocusMenuViewport = function (a) {
	return {$: 20, a: a};
};
var $Confidenceman02$elm_select$Select$MenuItemElement = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$MenuListElement = $elm$core$Basics$identity;
var $elm$browser$Browser$Dom$getElement = _Browser_getElement;
var $Confidenceman02$elm_select$Select$menuItemId = F2(
	function (_v0, index) {
		var id_ = _v0;
		return 'select-menu-item-' + ($elm$core$String$fromInt(index) + ('-' + id_));
	});
var $Confidenceman02$elm_select$Select$queryActiveTargetElement = F2(
	function (selectId, index) {
		return $elm$browser$Browser$Dom$getElement(
			A2($Confidenceman02$elm_select$Select$menuItemId, selectId, index));
	});
var $Confidenceman02$elm_select$Select$menuListId = function (_v0) {
	var id_ = _v0;
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
						return _Utils_Tuple2(menuListElem, menuItemElem);
					}),
				$Confidenceman02$elm_select$Select$queryMenuListElement(selectId),
				A2($Confidenceman02$elm_select$Select$queryActiveTargetElement, selectId, menuItemIndex)));
	});
var $Confidenceman02$elm_select$Select$resetState = function (_v0) {
	var state_ = _v0;
	return _Utils_update(
		state_,
		{w: 0, ag: $elm$core$Maybe$Nothing, b_: 0, B: 1, v: false, cG: $elm$core$Maybe$Nothing});
};
var $Confidenceman02$elm_select$Select$DoNothing = {$: 34};
var $Confidenceman02$elm_select$Select$listBoxBorder = 6;
var $Confidenceman02$elm_select$Select$listBoxPaddingBottom = 6;
var $Confidenceman02$elm_select$Select$listBoxPaddingTop = 4;
var $elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var $Confidenceman02$elm_select$Select$setMenuViewportPosition = F5(
	function (selectId, menuListViewport, _v0, _v1, menuItemVisibility) {
		var menuListElem = _v0;
		var menuItemElem = _v1;
		switch (menuItemVisibility) {
			case 0:
				return _Utils_Tuple2($elm$core$Platform$Cmd$none, menuListViewport);
			case 1:
				var menuItemDistanceAbove = ((menuListElem.T.aH - menuItemElem.T.aH) + $Confidenceman02$elm_select$Select$listBoxPaddingTop) + $Confidenceman02$elm_select$Select$listBoxBorder;
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
			case 2:
				var menuItemDistanceBelow = (((menuItemElem.T.aH + menuItemElem.T.dx) + $Confidenceman02$elm_select$Select$listBoxPaddingBottom) + $Confidenceman02$elm_select$Select$listBoxBorder) - (menuListElem.T.aH + menuListElem.T.dx);
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
				var menuItemDistanceAbove = menuListElem.T.aH - menuItemElem.T.aH;
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
	if (mi.$ === 1) {
		var i = mi.a;
		return i.ge;
	} else {
		var i = mi.a;
		return i.ge;
	}
};
var $Confidenceman02$elm_select$Select$update = F2(
	function (msg, wrappedState) {
		update:
		while (true) {
			var state_ = wrappedState;
			var _v0 = state_.r;
			var idString = _v0;
			switch (msg.$) {
				case 33:
					var _v2 = msg.a;
					var updatedState = _Utils_update(
						state_,
						{
							ag: $elm$core$Maybe$Just(0),
							v: true
						});
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						updatedState,
						A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
				case 1:
					var orderedItems = msg.a;
					var hasCurrentSelection = msg.b;
					var selectedOptionIndex = msg.c;
					var resolveIndex = hasCurrentSelection ? selectedOptionIndex : (selectedOptionIndex - 1);
					var _v3 = A2($elm_community$list_extra$List$Extra$getAt, resolveIndex, orderedItems);
					if (_v3.$ === 1) {
						return _Utils_Tuple3($elm$core$Maybe$Nothing, state_, $elm$core$Platform$Cmd$none);
					} else {
						var mi = _v3.a;
						return _Utils_Tuple3(
							$elm$core$Maybe$Just(
								$Confidenceman02$elm_select$Select$Select(
									$Confidenceman02$elm_select$Select$unwrapItem(mi))),
							state_,
							$elm$core$Platform$Cmd$none);
					}
				case 2:
					var orderedItems = msg.a;
					var selectedIndices = msg.b;
					var getItem = F2(
						function (ix, acc) {
							return _Utils_ap(
								acc,
								function () {
									var _v4 = A2($elm_community$list_extra$List$Extra$getAt, ix, orderedItems);
									if (!_v4.$) {
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
						state_,
						$elm$core$Platform$Cmd$none);
				case 27:
					var menuItem = msg.a;
					var _v5 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v5.b;
					var cmdWithClosedMenu = _v5.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(
								$Confidenceman02$elm_select$Select$unwrapItem(menuItem))),
						_Utils_update(
							stateWithClosedMenu,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing}),
						cmdWithClosedMenu);
				case 28:
					var menuItem = msg.a;
					var _v6 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v6.b;
					var cmdWithClosedMenu = _v6.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(
								$Confidenceman02$elm_select$Select$unwrapItem(menuItem))),
						_Utils_update(
							stateWithClosedMenu,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									cmdWithClosedMenu,
									A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
								])));
				case 26:
					var i = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{w: i}),
						$elm$core$Platform$Cmd$none);
				case 0:
					var inputValue = msg.a;
					var _v7 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$OpenMenu, state_);
					var stateWithOpenMenu = _v7.b;
					var cmdWithOpenMenu = _v7.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$InputChange(inputValue)),
						_Utils_update(
							stateWithOpenMenu,
							{
								z: $elm$core$Maybe$Just(inputValue)
							}),
						cmdWithOpenMenu);
				case 3:
					var variant = msg.a;
					var _v8 = function () {
						if (!variant.$) {
							var _v10 = state_.ag;
							if ((!_v10.$) && (!_v10.a)) {
								var _v11 = _v10.a;
								return _Utils_Tuple2(
									$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$FocusSet),
									_Utils_update(
										state_,
										{
											l: $elm$core$Maybe$Just(0),
											ag: $elm$core$Maybe$Nothing,
											f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown,
											v: true
										}));
							} else {
								return _Utils_Tuple2(
									$elm$core$Maybe$Nothing,
									_Utils_update(
										state_,
										{
											l: $elm$core$Maybe$Just(0)
										}));
							}
						} else {
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								_Utils_update(
									state_,
									{
										l: $elm$core$Maybe$Just(0)
									}));
						}
					}();
					var action = _v8.a;
					var updatedState = _v8.b;
					return _Utils_Tuple3(action, updatedState, $elm$core$Platform$Cmd$none);
				case 4:
					var item = msg.a;
					var _v12 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v12.b;
					var cmdWithClosedMenu = _v12.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(item)),
						_Utils_update(
							stateWithClosedMenu,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing}),
						cmdWithClosedMenu);
				case 5:
					var item = msg.a;
					var _v13 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v13.b;
					var cmdWithClosedMenu = _v13.c;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Select(item)),
						_Utils_update(
							stateWithClosedMenu,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									cmdWithClosedMenu,
									A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
								])));
				case 6:
					var deselectedItem = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Just(
							$Confidenceman02$elm_select$Select$Deselect(
								_List_fromArray(
									[deselectedItem]))),
						_Utils_update(
							state_,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
						A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
				case 10:
					var focusResult = msg.a;
					if (!focusResult.$) {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple3($elm$core$Maybe$Nothing, wrappedState, $elm$core$Platform$Cmd$none);
					}
				case 12:
					var focusResult = msg.a;
					if (!focusResult.$) {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{
									l: $elm$core$Maybe$Just(1),
									ag: $elm$core$Maybe$Nothing,
									f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{ag: $elm$core$Maybe$Nothing}),
							$elm$core$Platform$Cmd$none);
					}
				case 20:
					if (!msg.a.$) {
						var _v16 = msg.a.a;
						var menuListElem = _v16.a;
						var menuItemElem = _v16.b;
						var _v17 = A5(
							$Confidenceman02$elm_select$Select$setMenuViewportPosition,
							state_.r,
							state_.b_,
							menuListElem,
							menuItemElem,
							A2($Confidenceman02$elm_select$Select$menuItemOrientationInViewport, menuListElem, menuItemElem));
						var viewportFocusCmd = _v17.a;
						var newViewportY = _v17.b;
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{
									b_: newViewportY,
									cG: $elm$core$Maybe$Just(
										_Utils_Tuple2(menuListElem, menuItemElem))
								}),
							viewportFocusCmd);
					} else {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{cG: $elm$core$Maybe$Nothing}),
							$elm$core$Platform$Cmd$none);
					}
				case 34:
					return _Utils_Tuple3($elm$core$Maybe$Nothing, state_, $elm$core$Platform$Cmd$none);
				case 11:
					var variant = msg.a;
					var resolveAction = function () {
						var _v24 = state_.z;
						if (!_v24.$) {
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
					var _v18 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v18.b;
					var cmdWithClosedMenu = _v18.c;
					var _v19 = function () {
						var _v20 = state_.f;
						switch (_v20.$) {
							case 2:
								if ((!variant.$) && (variant.a.$ === 2)) {
									return _Utils_Tuple3(
										_Utils_update(
											stateWithClosedMenu,
											{l: $elm$core$Maybe$Nothing, f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[cmdWithClosedMenu, $elm$core$Platform$Cmd$none])),
										resolveAction);
								} else {
									return _Utils_Tuple3(
										_Utils_update(
											state_,
											{z: $elm$core$Maybe$Nothing}),
										$elm$core$Platform$Cmd$none,
										resolveAction);
								}
							case 0:
								return _Utils_Tuple3(state_, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
							default:
								return _Utils_Tuple3(
									_Utils_update(
										stateWithClosedMenu,
										{w: 0, l: $elm$core$Maybe$Nothing, f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown, z: $elm$core$Maybe$Nothing}),
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[cmdWithClosedMenu, $elm$core$Platform$Cmd$none])),
									resolveAction);
						}
					}();
					var updatedState = _v19.a;
					var updatedCmds = _v19.b;
					var action = _v19.c;
					var _v22 = state_.ag;
					if ((!_v22.$) && (_v22.a === 1)) {
						var _v23 = _v22.a;
						return _Utils_Tuple3($elm$core$Maybe$Nothing, wrappedState, $elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple3(action, updatedState, updatedCmds);
					}
				case 13:
					var clearButtonVisible = msg.a;
					if (clearButtonVisible) {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{
									ag: $elm$core$Maybe$Just(1)
								}),
							A2(
								$Confidenceman02$elm_select$Select$internalFocus,
								$Confidenceman02$elm_select$Select$clearableId(state_.r),
								$Confidenceman02$elm_select$Select$OnMenuClearableFocus));
					} else {
						var $temp$msg = $Confidenceman02$elm_select$Select$CloseMenu,
							$temp$wrappedState = wrappedState;
						msg = $temp$msg;
						wrappedState = $temp$wrappedState;
						continue update;
					}
				case 14:
					var shiftKey = msg.a;
					if (shiftKey) {
						return _Utils_Tuple3(
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state_,
								{
									ag: $elm$core$Maybe$Just(0)
								}),
							A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
					} else {
						var $temp$msg = $Confidenceman02$elm_select$Select$CloseMenu,
							$temp$wrappedState = wrappedState;
						msg = $temp$msg;
						wrappedState = $temp$wrappedState;
						continue update;
					}
				case 15:
					var _v25 = state_.f;
					if (_v25.$ === 3) {
						var _v26 = state_.ag;
						if ((!_v26.$) && (!_v26.a)) {
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
				case 16:
					var i = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{
								f: $Confidenceman02$elm_select$Select$Internal$MenuItemMousedown(i)
							}),
						$elm$core$Platform$Cmd$none);
				case 22:
					var index = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{
								f: $Confidenceman02$elm_select$Select$Internal$MultiItemMousedown(index)
							}),
						$elm$core$Platform$Cmd$none);
				case 23:
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
						$elm$core$Platform$Cmd$none);
				case 24:
					var resolveAction = function () {
						var _v29 = state_.z;
						if (!_v29.$) {
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
					var _v28 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v28.b;
					var cmdWithClosedMenu = _v28.c;
					return _Utils_Tuple3(
						resolveAction,
						_Utils_update(
							stateWithClosedMenu,
							{z: $elm$core$Maybe$Nothing}),
						cmdWithClosedMenu);
				case 25:
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
						$elm$core$Platform$Cmd$none);
				case 7:
					var variant = msg.a;
					var _v30 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$OpenMenu, state_);
					var stateWithOpenMenu = _v30.b;
					var cmdWithOpenMenu = _v30.c;
					var _v31 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v31.b;
					var cmdWithClosedMenu = _v31.c;
					var _v32 = function () {
						var _v33 = state_.f;
						switch (_v33.$) {
							case 0:
								var _v34 = state_.l;
								if (!_v34.$) {
									if (!_v34.a) {
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
							case 3:
								if (state_.v) {
									if (variant.$ === 2) {
										return (state_.cB && _Utils_eq(state_.l, $elm$core$Maybe$Nothing)) ? _Utils_Tuple2(
											_Utils_update(
												state_,
												{f: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
											A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)) : _Utils_Tuple2(
											_Utils_update(
												state_,
												{f: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
											$elm$core$Platform$Cmd$none);
									} else {
										return _Utils_Tuple2(
											_Utils_update(
												stateWithClosedMenu,
												{f: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
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
											{f: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													cmdWithOpenMenu,
													A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
												])));
								}
							case 2:
								if (variant.$ === 2) {
									return _Utils_Tuple2(
										_Utils_update(
											state_,
											{f: $Confidenceman02$elm_select$Select$Internal$ContainerMousedown}),
										$elm$core$Platform$Cmd$none);
								} else {
									return state_.v ? _Utils_Tuple2(
										_Utils_update(
											stateWithClosedMenu,
											{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													cmdWithClosedMenu,
													A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
												]))) : _Utils_Tuple2(
										_Utils_update(
											stateWithOpenMenu,
											{f: $Confidenceman02$elm_select$Select$Internal$NothingMousedown}),
										$elm$core$Platform$Cmd$batch(
											_List_fromArray(
												[
													cmdWithOpenMenu,
													A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused)
												])));
								}
							default:
								return state_.v ? _Utils_Tuple2(
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
						_Utils_update(
							updatedState,
							{
								l: $elm$core$Maybe$Just(0)
							}),
						updatedCmds);
				case 8:
					var focusCmd = function () {
						var _v41 = state_.l;
						if ((!_v41.$) && (!_v41.a)) {
							var _v42 = _v41.a;
							return $elm$core$Platform$Cmd$none;
						} else {
							return A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused);
						}
					}();
					var _v39 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$OpenMenu, state_);
					var stateWithOpenMenu = _v39.b;
					var _v40 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v40.b;
					var updatedState = state_.v ? stateWithClosedMenu : stateWithOpenMenu;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							updatedState,
							{
								l: $elm$core$Maybe$Just(0)
							}),
						focusCmd);
				case 9:
					var _v43 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$OpenMenu, state_);
					var stateWithOpenMenu = _v43.b;
					var cmdWithOpenMenu = _v43.c;
					var _v44 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$CloseMenu, state_);
					var stateWithClosedMenu = _v44.b;
					var cmdWithClosedMenu = _v44.c;
					var _v45 = state_.v ? _Utils_Tuple2(stateWithClosedMenu, cmdWithClosedMenu) : _Utils_Tuple2(stateWithOpenMenu, cmdWithOpenMenu);
					var updatedState = _v45.a;
					var updatedCmd = _v45.b;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							updatedState,
							{
								l: $elm$core$Maybe$Just(0)
							}),
						updatedCmd);
				case 29:
					var totalTargetCount = msg.a;
					var nextActiveTargetIndex = A3($Confidenceman02$elm_select$Select$Internal$calculateNextActiveTarget, state_.w, totalTargetCount, 1);
					var nodeQueryForViewportFocus = A2($Confidenceman02$elm_select$Select$Internal$shouldQueryNextTargetElement, nextActiveTargetIndex, state_.w) ? A2($Confidenceman02$elm_select$Select$queryNodesForViewportFocus, state_.r, nextActiveTargetIndex) : $elm$core$Platform$Cmd$none;
					var _v46 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$OpenMenu, state_);
					var stateWithOpenMenu = _v46.b;
					var cmdWithOpenMenu = _v46.c;
					var _v47 = state_.v ? _Utils_Tuple2(
						_Utils_update(
							state_,
							{w: nextActiveTargetIndex, B: 0}),
						nodeQueryForViewportFocus) : _Utils_Tuple2(
						_Utils_update(
							stateWithOpenMenu,
							{B: 0}),
						cmdWithOpenMenu);
					var updatedState = _v47.a;
					var updatedCmd = _v47.b;
					return _Utils_Tuple3($elm$core$Maybe$Nothing, updatedState, updatedCmd);
				case 30:
					var totalTargetCount = msg.a;
					var nextActiveTargetIndex = A3($Confidenceman02$elm_select$Select$Internal$calculateNextActiveTarget, state_.w, totalTargetCount, 0);
					var nodeQueryForViewportFocus = A2($Confidenceman02$elm_select$Select$Internal$shouldQueryNextTargetElement, nextActiveTargetIndex, state_.w) ? A2($Confidenceman02$elm_select$Select$queryNodesForViewportFocus, state_.r, nextActiveTargetIndex) : $elm$core$Platform$Cmd$none;
					var _v48 = A2($Confidenceman02$elm_select$Select$update, $Confidenceman02$elm_select$Select$OpenMenu, state_);
					var stateWithOpenMenu = _v48.b;
					var cmdWithOpenMenu = _v48.c;
					var _v49 = state_.v ? _Utils_Tuple2(
						_Utils_update(
							state_,
							{w: nextActiveTargetIndex, B: 0}),
						nodeQueryForViewportFocus) : _Utils_Tuple2(
						_Utils_update(
							stateWithOpenMenu,
							{w: nextActiveTargetIndex, B: 0}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[cmdWithOpenMenu, nodeQueryForViewportFocus])));
					var updatedState = _v49.a;
					var updatedCmd = _v49.b;
					return _Utils_Tuple3($elm$core$Maybe$Nothing, updatedState, updatedCmd);
				case 18:
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{w: 0, v: true}),
						$elm$core$Platform$Cmd$none);
				case 19:
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						state_.cB ? state_ : $Confidenceman02$elm_select$Select$resetState(state_),
						$elm$core$Platform$Cmd$none);
				case 17:
					var position = msg.a;
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{b_: position}),
						$elm$core$Platform$Cmd$none);
				case 21:
					return _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						_Utils_update(
							state_,
							{B: 1}),
						$elm$core$Platform$Cmd$none);
				case 31:
					var variant = msg.a;
					_v50$2:
					while (true) {
						if (!variant.$) {
							switch (variant.a.$) {
								case 2:
									return _Utils_Tuple3(
										$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
										_Utils_update(
											state_,
											{z: $elm$core$Maybe$Nothing}),
										$elm$core$Platform$Cmd$none);
								case 1:
									return _Utils_Tuple3(
										$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
										state_,
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
						state_,
						$elm$core$Platform$Cmd$none);
				default:
					var variant = msg.a;
					_v51$2:
					while (true) {
						if (!variant.$) {
							switch (variant.a.$) {
								case 2:
									return _Utils_Tuple3(
										$elm$core$Maybe$Just($Confidenceman02$elm_select$Select$Clear),
										_Utils_update(
											state_,
											{z: $elm$core$Maybe$Nothing}),
										A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
								case 1:
									var selectedItems = variant.a.a;
									return _Utils_Tuple3(
										$elm$core$Maybe$Just(
											$Confidenceman02$elm_select$Select$Deselect(
												A2($elm$core$List$map, $Confidenceman02$elm_select$Select$unwrapItem, selectedItems))),
										_Utils_update(
											state_,
											{z: $elm$core$Maybe$Nothing}),
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
						state_,
						A2($Confidenceman02$elm_select$Select$internalFocus, idString, $Confidenceman02$elm_select$Select$OnInputFocused));
			}
		}
	});
var $author$project$DisplayIndividualSpecies$update = F3(
	function (toPort, msg, model) {
		switch (msg.$) {
			case 0:
				var sm = msg.a;
				var _v1 = A2($Confidenceman02$elm_select$Select$update, sm, model.cL);
				var maybeAction = _v1.a;
				var selectState = _v1.b;
				var cmds = _v1.c;
				var specMsg = function () {
					if ((!maybeAction.$) && (maybeAction.a.$ === 1)) {
						var i = maybeAction.a.a;
						var _v7 = $author$project$Data$Species$stringToSpecies(i);
						if (_v7.$ === 1) {
							return $elm$core$Platform$Cmd$none;
						} else {
							var s = _v7.a;
							return toPort(
								A3($author$project$DisplayIndividualSpecies$mkSpecs, model.b6, model.bN, s));
						}
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				}();
				var updateSelectedItem = function () {
					_v4$3:
					while (true) {
						if (!maybeAction.$) {
							switch (maybeAction.a.$) {
								case 1:
									var i = maybeAction.a.a;
									return $elm$core$Maybe$Just(i);
								case 0:
									var s = maybeAction.a.a;
									return $elm$core$Maybe$Just(s);
								case 4:
									var _v5 = maybeAction.a;
									return $elm$core$Maybe$Nothing;
								default:
									break _v4$3;
							}
						} else {
							break _v4$3;
						}
					}
					return model.cM;
				}();
				var updateSelectedSpecies = function () {
					_v2$2:
					while (true) {
						if (!maybeAction.$) {
							switch (maybeAction.a.$) {
								case 1:
									var i = maybeAction.a.a;
									return $author$project$Data$Species$stringToSpecies(i);
								case 4:
									var _v3 = maybeAction.a;
									return $elm$core$Maybe$Nothing;
								default:
									break _v2$2;
							}
						} else {
							break _v2$2;
						}
					}
					return model.b8;
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cL: selectState, cM: updateSelectedItem, b8: updateSelectedSpecies}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								specMsg,
								A2($elm$core$Platform$Cmd$map, $author$project$DisplayIndividualSpecies$SelectSpecies, cmds)
							])));
			case 1:
				var opt = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bN: opt}),
					function () {
						var _v8 = model.b8;
						if (_v8.$ === 1) {
							return $elm$core$Platform$Cmd$none;
						} else {
							var s = _v8.a;
							return toPort(
								A3($author$project$DisplayIndividualSpecies$mkSpecs, model.b6, opt, s));
						}
					}());
			default:
				var opt = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b6: opt}),
					function () {
						var _v9 = model.b8;
						if (_v9.$ === 1) {
							return $elm$core$Platform$Cmd$none;
						} else {
							var s = _v9.a;
							return toPort(
								A3($author$project$DisplayIndividualSpecies$mkSpecs, opt, model.bN, s));
						}
					}());
		}
	});
var $author$project$DisplayIndividualSpecies$vegaPort = _Platform_outgoingPort('vegaPort', $elm$core$Basics$identity);
var $rtfeldman$elm_css$Css$Structure$Compatible = 0;
var $rtfeldman$elm_css$Css$auto = {hn: 0, h: 0, bQ: 0, dF: 0, iw: 0, bX: 0, a1: 0, aQ: 0, b2: 0, aB: 0, eb: 0, cf: 0, ai: 0, g4: 'auto'};
var $Confidenceman02$elm_select$Select$Config = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$clearable = F2(
	function (clear, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{D: clear});
	});
var $author$project$DisplayIndividualSpecies$SelectCountyAggregation = function (a) {
	return {$: 1, a: a};
};
var $author$project$Data$County$Split = 1;
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Internal$Style$classes = {he: 'a', fq: 'atv', hg: 'ab', hh: 'cx', hi: 'cy', hj: 'acb', hk: 'accx', hl: 'accy', hm: 'acr', ft: 'al', fu: 'ar', ho: 'at', em: 'ah', en: 'av', hq: 's', hu: 'bh', hv: 'b', hz: 'w7', hA: 'bd', hB: 'bdt', c7: 'bn', hC: 'bs', dh: 'cpe', hK: 'cp', hL: 'cpx', hM: 'cpy', aY: 'c', dm: 'ctr', dn: 'cb', $7: 'ccx', aZ: 'ccy', cs: 'cl', dp: 'cr', hP: 'ct', hR: 'cptr', hS: 'ctxt', h6: 'fcs', fX: 'focus-within', h7: 'fs', h9: 'g', eH: 'hbh', eI: 'hc', f$: 'he', eJ: 'hf', f0: 'hfp', id: 'hv', ij: 'ic', il: 'fr', dD: 'lbl', $9: 'iml', io: 'imlf', ip: 'imlp', iq: 'implw', ir: 'it', iv: 'i', gi: 'lnk', b0: 'nb', gs: 'notxt', iO: 'ol', iP: 'or', bt: 'oq', iX: 'oh', gx: 'pg', gy: 'p', iY: 'ppe', i3: 'ui', gO: 'r', i8: 'sb', i9: 'sbx', ja: 'sby', jb: 'sbt', je: 'e', jf: 'cap', jg: 'sev', jl: 'sk', cb: 't', jp: 'tc', jq: 'w8', jr: 'w2', js: 'w9', jt: 'tj', ec: 'tja', ju: 'tl', jv: 'w3', jw: 'w5', jx: 'w4', jy: 'tr', jz: 'w6', jA: 'w1', jB: 'tun', g3: 'ts', bD: 'clr', jI: 'u', fk: 'wc', ha: 'we', fl: 'wf', hb: 'wfp', fn: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aY);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.h9);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gx);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gy);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gO);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.je);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
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
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
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
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
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
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
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
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
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
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.i4)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.dl)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.jh.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.jh.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.gO) + ('-' + ($elm$core$String$fromInt(pos.fJ) + ('-' + ($elm$core$String$fromInt(pos.aG) + ('-' + $elm$core$String$fromInt(pos.dx)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
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
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
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
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
					shadow.gb ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.iL.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.iL.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.hx) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.by) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.Q))
				])));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
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
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fX) + ':focus-within',
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
						focus.fF),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.aj),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										hx: shadow.hx,
										Q: shadow.Q,
										gb: false,
										iL: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.iL)),
										by: shadow.by
									}));
						},
						focus.jd),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + ' .focusable-thumb'))),
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
						focus.fF),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.aj),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										hx: shadow.hx,
										Q: shadow.Q,
										gb: false,
										iL: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.iL)),
										by: shadow.by
									}));
						},
						focus.jd),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hP);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dn);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.$7);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aZ);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ho);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hg);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fu);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ft);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hh);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hi);
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
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
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
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eH),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hu),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jb),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eI),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hb),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fk),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
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
				case 1:
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
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
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
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
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
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
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
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.je),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ij))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
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
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
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
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i3),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.il),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b0),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b0),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.je),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.he),
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
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
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
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hv),
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
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iP),
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
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iO),
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
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.il),
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
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hu),
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
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
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
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fn),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gs),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hS),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bD),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bt),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.id, $mdgriffith$elm_ui$Internal$Style$classes.bD)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.id, $mdgriffith$elm_ui$Internal$Style$classes.bt)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.h6, $mdgriffith$elm_ui$Internal$Style$classes.bD)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.h6, $mdgriffith$elm_ui$Internal$Style$classes.bt)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.fq, $mdgriffith$elm_ui$Internal$Style$classes.bD)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.fq, $mdgriffith$elm_ui$Internal$Style$classes.bt)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g3),
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
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i8),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ja),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.je),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hK),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hL),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hM),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fk),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hA),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hB),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hC),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ir),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.je),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ha),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f0),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hm,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hk,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hh),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hk,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hh),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hk,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hi),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.hk + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.hm + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.hk)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
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
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dD),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f$),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hb),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fk),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hj,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hl,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hi),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hl,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hi),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.hl,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hi),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.hl + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.hj + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.hl)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
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
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h9),
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
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
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
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
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
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gx),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.hq + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.hq))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.hq + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.hq))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
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
								case 3:
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
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.$9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iq),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.je),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ip),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.io),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eH),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hu),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gy),
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
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.je),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ha),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.il),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hu),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.he),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hv),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iP),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iO),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
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
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jA),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jv),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jx),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jw),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.js),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iv),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jl),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jI),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jI),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jl)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jB),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jt),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ec),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ju),
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
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.hq + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.hq + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {di: closing, M: _List_Nil, a6: _List_Nil, aD: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								a6: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.a6)
							});
					case 3:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								M: A2(
									$elm$core$List$cons,
									{di: '\n}', M: _List_Nil, a6: props, aD: '@supports (' + (prop + (':' + (value + (') {' + parent.aD))))},
									rendered.M)
							});
					case 5:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								M: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aD + (' + ' + selector), ''),
										adjRules),
									rendered.M)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								M: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aD + (' > ' + child), ''),
										childRules),
									rendered.M)
							});
					case 2:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								M: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aD + (' ' + child), ''),
										childRules),
									rendered.M)
							});
					case 4:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								M: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.aD, descriptor),
											''),
										descriptorRules),
									rendered.M)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								M: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aD, ''),
										batched),
									rendered.M)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
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
		var _v2 = rule.a6;
		if (!_v2.b) {
			return '';
		} else {
			return rule.aD + ('{' + (renderValues(rule.a6) + (rule.di + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.M)));
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
	var _v0 = opts.iH;
	switch (_v0) {
		case 0:
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
		case 1:
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
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.ah;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.g5);
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
		if (maybePseudo.$ === 1) {
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
			switch (pseudo) {
				case 1:
					var _v2 = options.id;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
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
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.hq + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
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
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.g5)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
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
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
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
			case 12:
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
			case 2:
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
			case 1:
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
			case 3:
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
			case 4:
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
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.je;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gO;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.fn + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.fu;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gy;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gx;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.ft;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.aY;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.hq;
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
			case 7:
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
			case 6:
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
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
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
				var xSpacing = toGridLength(template.jh.a);
				var ySpacing = toGridLength(template.jh.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.i4)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.dl)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.dl)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.jh.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.jh.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.dl)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.i4)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.dl)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.jh.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.jh.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.gO) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.dx) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.fJ) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.aG) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.gO) + (' / ' + ($elm$core$String$fromInt(position.gO + position.dx) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.fJ) + (' / ' + ($elm$core$String$fromInt(position.fJ + position.aG) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.gO) + ('-' + ($elm$core$String$fromInt(position.fJ) + ('-' + ($elm$core$String$fromInt(position.aG) + ('-' + $elm$core$String$fromInt(position.dx)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
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
				if ((!_v12.a.$) && (!_v12.b.$)) {
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
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.cb + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.cb)))))))))), textAdjustment)
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
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.jf, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.h7, full)));
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
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.jf + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.jf))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.jf + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.cb + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.jf + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.cb)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {dx: height / size, by: size, g6: vertical};
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
		[adjustment.hE, adjustment.ht, adjustment.hZ, adjustment.iA]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.hZ,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.ht,
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
		adjustment.hE,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		hE: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		f_: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
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
				$elm$core$String$fromFloat(converted.dx)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.g6) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.by) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.hf;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.f_;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.hE;
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
		if (font.$ === 4) {
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
		if (_v0.$ === 1) {
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
	if (rule.$ === 1) {
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
					d9: _Utils_ap(
						rendered.d9,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					cT: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.cT;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.cT);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{d9: _List_Nil, cT: _List_Nil},
			stylesheet);
		var topLevel = _v0.cT;
		var rules = _v0.d9;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.iH;
		switch (_v0) {
			case 0:
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
			case 1:
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
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.h6)),
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
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.h6)),
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
		if (!myFlag.$) {
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
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
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
								case 0:
									return unkeyed;
								case 2:
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
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
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
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.je))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.hq, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.dm, $mdgriffith$elm_ui$Internal$Style$classes.aZ, $mdgriffith$elm_ui$Internal$Style$classes.hm])))
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
									[$mdgriffith$elm_ui$Internal$Style$classes.hq, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.dm, $mdgriffith$elm_ui$Internal$Style$classes.aZ, $mdgriffith$elm_ui$Internal$Style$classes.hk])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.hq, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.dm, $mdgriffith$elm_ui$Internal$Style$classes.hl])))
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
									[$mdgriffith$elm_ui$Internal$Style$classes.hq, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.dm, $mdgriffith$elm_ui$Internal$Style$classes.hj])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.fk + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eI)))));
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
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.hq + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.fl + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eJ)))));
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
					case 0:
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
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.ig, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.k : _Utils_ap(styled.k, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.ig, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.k : _Utils_ap(styled.k, existingStyles));
					case 2:
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
					case 0:
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
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.ig, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.k : _Utils_ap(styled.k, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.ig, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.k : _Utils_ap(styled.k, existingStyles));
					case 2:
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
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.k : _Utils_ap(rendered.k, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.bm,
						rendered.bs,
						rendered.bc,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.bf)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						ig: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.bm,
							rendered.bs,
							rendered.bc,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.bf))),
						k: allStyles
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
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.k : _Utils_ap(rendered.k, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.bm,
						rendered.bs,
						rendered.bc,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.bf)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						ig: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.bm,
							rendered.bs,
							rendered.bc,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.bf))),
						k: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.b0, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.he]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.b0, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.hv]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.b0, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.iP]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.b0, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.iO]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.b0, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.il]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.b0, $mdgriffith$elm_ui$Internal$Style$classes.je, $mdgriffith$elm_ui$Internal$Style$classes.hu]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.ig, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
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
				if (location === 5) {
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
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.em + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ft);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.em + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fu);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.em + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hh);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.en + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ho);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.en + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hg);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.en + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hi);
	}
};
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
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
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
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
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
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
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.f$ + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.eI,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.eJ,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.f0 + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.hq + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.aY + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
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
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.ha + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.fk,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.fl,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.hb + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.hq + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.gO + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
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
			if (style.$ === 3) {
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
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
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
				if (_v1.$ === 1) {
					return {
						bc: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						bf: children,
						bm: has,
						bs: node,
						k: styles
					};
				} else {
					var _class = _v1.a;
					return {
						bc: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						bf: children,
						bm: has,
						bs: node,
						k: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
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
					case 3:
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
					case 1:
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
					case 4:
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
					case 10:
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
					case 7:
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
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.ha + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
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
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fk),
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
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fl),
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
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.hb + (' width-fill-' + $elm$core$String$fromInt(portion)))),
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
												$mdgriffith$elm_ui$Internal$Style$classes.hq + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.gO + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
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
					case 8:
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
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.f$ + (' ' + (name + (' ' + classes))),
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
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.eI + (' ' + classes),
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
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.eJ + (' ' + classes),
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
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.f0 + (' height-fill-' + $elm$core$String$fromInt(portion)))),
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
												$mdgriffith$elm_ui$Internal$Style$classes.hq + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.aY + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
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
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
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
							case 1:
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
							case 2:
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
							case 3:
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
							case 4:
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
							case 9:
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
							case 8:
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
							case 5:
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
							case 6:
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
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.k);
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
					case 6:
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
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
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
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
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
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
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
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
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
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hP + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cs)),
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
		return {$: 0, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Element$Input$OnLeft = 1;
var $mdgriffith$elm_ui$Element$Input$labelLeft = $mdgriffith$elm_ui$Element$Input$Label(1);
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	aj: $elm$core$Maybe$Nothing,
	fF: $elm$core$Maybe$Nothing,
	jd: $elm$core$Maybe$Just(
		{
			hx: 0,
			Q: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			iL: _Utils_Tuple2(0, 0),
			by: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.id;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								id: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.h6;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								h6: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.iH;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								iH: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			h6: function () {
				var _v0 = record.h6;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			id: function () {
				var _v1 = record.id;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			iH: function () {
				var _v2 = record.iH;
				if (_v2.$ === 1) {
					return 0;
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
			{h6: $elm$core$Maybe$Nothing, id: $elm$core$Maybe$Nothing, iH: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.k;
				var html = el.a.ig;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
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
			var _v0 = options.iH;
			if (_v0 === 1) {
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
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
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
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.ah;
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
		var options = _v0.iW;
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
							[$mdgriffith$elm_ui$Internal$Style$classes.i3, $mdgriffith$elm_ui$Internal$Style$classes.hq, $mdgriffith$elm_ui$Internal$Style$classes.je]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{iW: _List_Nil});
var $mdgriffith$elm_ui$Element$Input$Option = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Left = 0;
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX(0);
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
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
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
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cs + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aZ)),
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
		return {$: 5, a: a, b: b, c: c};
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
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
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
							if (status === 2) {
								return $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
							} else {
								return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
							}
						}(),
							$mdgriffith$elm_ui$Element$Border$width(
							function () {
								switch (status) {
									case 0:
										return 1;
									case 1:
										return 1;
									default:
										return 5;
								}
							}()),
							$mdgriffith$elm_ui$Element$Border$color(
							function () {
								switch (status) {
									case 0:
										return A3($mdgriffith$elm_ui$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									case 1:
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
var $mdgriffith$elm_ui$Element$Input$Row = 0;
var $mdgriffith$elm_ui$Element$Input$AfterFound = 2;
var $mdgriffith$elm_ui$Element$Input$BeforeFound = 1;
var $mdgriffith$elm_ui$Element$Input$Idle = 0;
var $mdgriffith$elm_ui$Element$Input$NotFound = 0;
var $mdgriffith$elm_ui$Element$Input$Selected = 2;
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 6};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 1) {
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
			switch (position) {
				case 2:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dD),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 3:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dD),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 0:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dD),
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
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dD),
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
					case 0:
						return _Utils_Tuple2(found, has);
					case 3:
						var key = x.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 1:
						var attr = x.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 4:
						var style = x.b;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 7:
						var width = x.a;
						return A2($elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'width', has));
					case 8:
						var height = x.a;
						return A2($elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'height', has));
					case 2:
						var description = x.a;
						return A2($elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'described', has));
					case 9:
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 6:
						return A2($elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'align-x', has));
					case 5:
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
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 1) {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Element$Input$leftArrow = 'ArrowLeft';
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
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
	return {$: 2, a: a};
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
		if (_v0.$ === 1) {
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
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.hR);
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
				switch (found) {
					case 0:
						return _Utils_eq(
							$elm$core$Maybe$Just(val),
							input.jc) ? _Utils_Tuple3(1, prev, nxt) : _Utils_Tuple3(found, val, nxt);
					case 1:
						return _Utils_Tuple3(2, prev, val);
					default:
						return _Utils_Tuple3(found, prev, nxt);
				}
			});
		var renderOption = function (_v11) {
			var val = _v11.a;
			var view = _v11.b;
			var status = _Utils_eq(
				$elm$core$Maybe$Just(val),
				input.jc) ? 2 : 0;
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$pointer,
						function () {
						if (!orientation) {
							return $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink);
						} else {
							return $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill);
						}
					}(),
						$mdgriffith$elm_ui$Element$Events$onClick(
						input.gu(val)),
						function () {
						if (status === 2) {
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
			var _v5 = input.iW;
			if (!_v5.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var _v6 = _v5.a;
				var val = _v6.a;
				return function (_v7) {
					var found = _v7.a;
					var b = _v7.b;
					var a = _v7.c;
					switch (found) {
						case 0:
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						case 1:
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
						_Utils_Tuple3(0, val, val),
						input.iW));
			}
		}();
		var optionArea = function () {
			if (!orientation) {
				return A2(
					$mdgriffith$elm_ui$Element$Input$row,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.dI),
						attrs),
					A2($elm$core$List$map, renderOption, input.iW));
			} else {
				return A2(
					$mdgriffith$elm_ui$Element$Input$column,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.dI),
						attrs),
					A2($elm$core$List$map, renderOption, input.iW));
			}
		}();
		var events = A2(
			$mdgriffith$elm_ui$Internal$Model$get,
			attrs,
			function (attr) {
				_v3$3:
				while (true) {
					switch (attr.$) {
						case 7:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _v3$3;
							}
						case 8:
							if (attr.a.$ === 2) {
								return true;
							} else {
								break _v3$3;
							}
						case 1:
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
							if (prevNext.$ === 1) {
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
													input.gu(prev));
											} else {
												if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$upArrow)) {
													return $elm$core$Maybe$Just(
														input.gu(prev));
												} else {
													if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$rightArrow)) {
														return $elm$core$Maybe$Just(
															input.gu(next));
													} else {
														if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$downArrow)) {
															return $elm$core$Maybe$Just(
																input.gu(next));
														} else {
															if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space)) {
																var _v2 = input.jc;
																if (_v2.$ === 1) {
																	return $elm$core$Maybe$Just(
																		input.gu(prev));
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
			input.dI,
			optionArea);
	});
var $mdgriffith$elm_ui$Element$Input$radioRow = $mdgriffith$elm_ui$Element$Input$radioHelper(0);
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$DisplayIndividualSpecies$countyRadio = function (model) {
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
						dI: A2(
							$mdgriffith$elm_ui$Element$Input$labelLeft,
							_List_Nil,
							$mdgriffith$elm_ui$Element$text('Counties:')),
						gu: $author$project$DisplayIndividualSpecies$SelectCountyAggregation,
						iW: _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$Input$option,
								0,
								$mdgriffith$elm_ui$Element$text('Combined')),
								A2(
								$mdgriffith$elm_ui$Element$Input$option,
								1,
								$mdgriffith$elm_ui$Element$text('Split'))
							]),
						jc: $elm$core$Maybe$Just(model.bN)
					})
				])));
};
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
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
			case 0:
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 1:
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
			case 2:
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 3:
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 4:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 5:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 6:
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.hU) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.ah, record.hU, keyframesByName),
					declarations);
			case 7:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 8:
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
	return {$: 6, a: a};
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
						{hU: decl, ah: name});
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
	var charset = _v0.fI;
	var imports = _v0.f6;
	var namespaces = _v0.gr;
	var declarations = _v0.hV;
	return {
		fI: charset,
		hV: $rtfeldman$elm_css$Css$Structure$compactDeclarations(declarations),
		f6: imports,
		gr: namespaces
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
	return '(' + (expression.fV + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.g4)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType) {
		case 0:
			return 'print';
		case 1:
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
		case 0:
			var expressions = mediaQuery.a;
			return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, ' and ', expressions);
		case 1:
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 2:
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
			var prop = _v0;
			return prop + ';';
		},
		'',
		properties);
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator) {
		case 0:
			return '+';
		case 1:
			return '~';
		case 2:
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 0:
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 1:
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 2:
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 0:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
		case 1:
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
		case 0:
			var styleBlock = decl.a;
			return $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(styleBlock);
		case 1:
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, ', ', mediaQueries);
			var blocks = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, '\n', styleBlocks);
			return '@media ' + (query + ('{' + (blocks + '}')));
		case 2:
			return 'TODO';
		case 3:
			return 'TODO';
		case 4:
			return 'TODO';
		case 5:
			return 'TODO';
		case 6:
			var name = decl.a.ah;
			var declaration = decl.a.hU;
			return '@keyframes ' + (name + ('{' + (declaration + '}')));
		case 7:
			return 'TODO';
		case 8:
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.fI;
	var imports = _v0.f6;
	var namespaces = _v0.gr;
	var declarations = _v0.hV;
	return $rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$importToString, '\n', imports) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, '\n', namespaces) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, '\n', declarations) + '')));
};
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 8, a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 5, a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = function (a) {
	return {$: 4, a: a};
};
var $rtfeldman$elm_css$Css$Structure$Property = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 7, a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
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
					case 0:
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 1:
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
		return {$: 2, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 1, a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 0:
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 1:
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
			if (!declarations.a.$) {
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
		return {$: 3, a: a, b: b, c: c, d: d, e: e};
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
						case 0:
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 1:
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
									if ((_v5.b && (_v5.a.$ === 1)) && (!_v5.b.b)) {
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
						case 2:
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
						case 3:
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
						case 4:
							return declarations;
						case 5:
							return declarations;
						case 6:
							return declarations;
						case 7:
							return declarations;
						case 8:
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
			if (maybe.$ === 1) {
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
	return {$: 9, a: a};
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
		if (!declaration.$) {
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
		if (!declaration.$) {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 0:
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 1:
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 2:
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 3:
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 4:
				return declaration;
			case 5:
				return declaration;
			case 6:
				return declaration;
			case 7:
				return declaration;
			case 8:
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0;
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
			if ((!_v14.a.$) && (!_v14.b.$)) {
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
				case 0:
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 1:
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
				case 2:
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
							case 0:
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
							case 1:
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 2:
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 3:
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 4:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$PageRule(properties)
									]);
							case 5:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 6:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 7:
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
				case 3:
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
				case 5:
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
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
								{hU: str, ah: name})
							]));
				case 4:
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
		case 0:
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 1:
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 2:
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 3:
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 4:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$PageRule(properties)
				]);
		case 5:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 6:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 7:
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
	var charset = _v0.fI;
	var imports = _v0.f6;
	var namespaces = _v0.gr;
	var snippets = _v0.gU;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {fI: charset, hV: declarations, f6: imports, gr: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return _List_fromArray(
			[
				$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {fI: $elm$core$Maybe$Nothing, f6: _List_Nil, gr: _List_Nil, gU: snippets};
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 0, a: a};
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
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 4, a: a};
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
		return {$: 2, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
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
			case 0:
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
			case 1:
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
			case 2:
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
			case 3:
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
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.g4);
	});
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $rtfeldman$elm_css$Css$marginRight = $rtfeldman$elm_css$Css$prop1('margin-right');
var $rtfeldman$elm_css$Css$marginTop = $rtfeldman$elm_css$Css$prop1('margin-top');
var $Confidenceman02$elm_select$Select$menuItems = F2(
	function (items, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{an: items});
	});
var $rtfeldman$elm_css$Css$PercentageUnits = 0;
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			fp: 0,
			fG: 0,
			bQ: 0,
			W: 0,
			cC: 0,
			bX: 0,
			a1: 0,
			bY: 0,
			bZ: 0,
			bo: 0,
			bp: 0,
			aQ: 0,
			a2: numericValue,
			ce: 0,
			cg: unitLabel,
			cW: units,
			g4: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '%');
var $Confidenceman02$elm_select$Select$placeholder = F2(
	function (plc, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{N: plc});
	});
var $rtfeldman$elm_css$Css$PxUnits = 0;
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'px');
var $author$project$Specs$SpeciesTrend$HideRouteDetail = 1;
var $author$project$DisplayIndividualSpecies$ToggleRouteDetail = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterY = 1;
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY(1);
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$checkbox = F2(
	function (attrs, _v0) {
		var label = _v0.dI;
		var icon = _v0.ih;
		var checked = _v0.hH;
		var onChange = _v0.gu;
		var attributes = _Utils_ap(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(label) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(6),
					$mdgriffith$elm_ui$Internal$Model$Attr(
					$elm$html$Html$Events$onClick(
						onChange(!checked))),
					$mdgriffith$elm_ui$Element$Region$announce,
					$mdgriffith$elm_ui$Element$Input$onKeyLookup(
					function (code) {
						return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(
							onChange(!checked)) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(
							onChange(!checked)) : $elm$core$Maybe$Nothing);
					}),
					$mdgriffith$elm_ui$Element$Input$tabindex(0),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$alignLeft,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			attrs);
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$html$Html$Attributes$attribute, 'role', 'checkbox')),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$Attr(
						A2(
							$elm$html$Html$Attributes$attribute,
							'aria-checked',
							checked ? 'true' : 'false')),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(label),
						attributes))),
			label,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$centerY,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
					]),
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[
							icon(checked)
						]))));
	});
var $mdgriffith$elm_ui$Internal$Flag$fontAlignment = $mdgriffith$elm_ui$Internal$Flag$flag(12);
var $mdgriffith$elm_ui$Element$Font$center = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.jp);
var $mdgriffith$elm_ui$Internal$Model$CenterX = 1;
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX(1);
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 3) {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 4, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Internal$Model$Rotate = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$rotate = $mdgriffith$elm_ui$Internal$Flag$flag(24);
var $mdgriffith$elm_ui$Element$rotate = function (angle) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$rotate,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Rotate,
			_Utils_Tuple3(0, 0, 1),
			angle));
};
var $mdgriffith$elm_ui$Internal$Model$boxShadowClass = function (shadow) {
	return $elm$core$String$concat(
		_List_fromArray(
			[
				shadow.gb ? 'box-inset' : 'box-',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.iL.a) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.iL.b) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.hx) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.by) + 'px',
				$mdgriffith$elm_ui$Internal$Model$formatColorClass(shadow.Q)
			]));
};
var $mdgriffith$elm_ui$Internal$Flag$shadows = $mdgriffith$elm_ui$Internal$Flag$flag(19);
var $mdgriffith$elm_ui$Element$Border$shadow = function (almostShade) {
	var shade = {hx: almostShade.hx, Q: almostShade.Q, gb: false, iL: almostShade.iL, by: almostShade.by};
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$shadows,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			$mdgriffith$elm_ui$Internal$Model$boxShadowClass(shade),
			'box-shadow',
			$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(shade)));
};
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$transparent = function (on) {
	return on ? A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2($mdgriffith$elm_ui$Internal$Model$Transparency, 'transparent', 1.0)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2($mdgriffith$elm_ui$Internal$Model$Transparency, 'visible', 0.0));
};
var $mdgriffith$elm_ui$Element$Border$widthXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$borderWidth,
			A5(
				$mdgriffith$elm_ui$Internal$Model$BorderWidth,
				'b-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
				y,
				x,
				y,
				x));
	});
var $mdgriffith$elm_ui$Element$Border$widthEach = function (_v0) {
	var bottom = _v0.hD;
	var top = _v0.jG;
	var left = _v0.ix;
	var right = _v0.i1;
	return (_Utils_eq(top, bottom) && _Utils_eq(left, right)) ? (_Utils_eq(top, right) ? $mdgriffith$elm_ui$Element$Border$width(top) : A2($mdgriffith$elm_ui$Element$Border$widthXY, left, top)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left))))))),
			top,
			right,
			bottom,
			left));
};
var $mdgriffith$elm_ui$Element$Input$defaultCheckbox = function (checked) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Internal$Model$htmlClass('focusable'),
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(14)),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(14)),
				$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$white),
				$mdgriffith$elm_ui$Element$centerY,
				$mdgriffith$elm_ui$Element$Font$size(9),
				$mdgriffith$elm_ui$Element$Font$center,
				$mdgriffith$elm_ui$Element$Border$rounded(3),
				$mdgriffith$elm_ui$Element$Border$color(
				checked ? A3($mdgriffith$elm_ui$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : A3($mdgriffith$elm_ui$Element$rgb, 211 / 255, 211 / 255, 211 / 255)),
				$mdgriffith$elm_ui$Element$Border$shadow(
				{
					hx: 1,
					Q: checked ? A4($mdgriffith$elm_ui$Element$rgba, 238 / 255, 238 / 255, 238 / 255, 0) : A3($mdgriffith$elm_ui$Element$rgb, 238 / 255, 238 / 255, 238 / 255),
					iL: _Utils_Tuple2(0, 0),
					by: 1
				}),
				$mdgriffith$elm_ui$Element$Background$color(
				checked ? A3($mdgriffith$elm_ui$Element$rgb, 59 / 255, 153 / 255, 252 / 255) : $mdgriffith$elm_ui$Element$Input$white),
				$mdgriffith$elm_ui$Element$Border$width(
				checked ? 0 : 1),
				$mdgriffith$elm_ui$Element$inFront(
				A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$white),
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$px(6)),
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$px(9)),
							$mdgriffith$elm_ui$Element$rotate(
							$elm$core$Basics$degrees(-45)),
							$mdgriffith$elm_ui$Element$centerX,
							$mdgriffith$elm_ui$Element$centerY,
							$mdgriffith$elm_ui$Element$moveUp(1),
							$mdgriffith$elm_ui$Element$transparent(!checked),
							$mdgriffith$elm_ui$Element$Border$widthEach(
							{hD: 2, ix: 2, i1: 0, jG: 0})
						]),
					$mdgriffith$elm_ui$Element$none))
			]),
		$mdgriffith$elm_ui$Element$none);
};
var $author$project$DisplayIndividualSpecies$routeDetailCheckbox = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_Nil,
		A2(
			$mdgriffith$elm_ui$Element$column,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$Input$checkbox,
					_List_Nil,
					{
						hH: function () {
							var _v0 = model.b6;
							if (!_v0) {
								return true;
							} else {
								return false;
							}
						}(),
						ih: $mdgriffith$elm_ui$Element$Input$defaultCheckbox,
						dI: A2(
							$mdgriffith$elm_ui$Element$Input$labelLeft,
							_List_Nil,
							$mdgriffith$elm_ui$Element$text('Show route detail: ')),
						gu: function (x) {
							return x ? $author$project$DisplayIndividualSpecies$ToggleRouteDetail(0) : $author$project$DisplayIndividualSpecies$ToggleRouteDetail(1);
						}
					})
				])));
};
var $Confidenceman02$elm_select$Select$searchable = F2(
	function (pred, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{C: pred});
	});
var $Confidenceman02$elm_select$Select$CustomVariant = function (a) {
	return {$: 0, a: a};
};
var $Confidenceman02$elm_select$Select$Single = function (a) {
	return {$: 0, a: a};
};
var $Confidenceman02$elm_select$Select$Styles$Config = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$Styles$ControlConfig = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2($elm$core$String$cons, '#', str);
};
var $rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		bb: 1,
		eq: 0,
		Q: 0,
		eG: 0,
		e5: 0,
		g4: $rtfeldman$elm_css$Css$withPrecedingHash(str)
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
				switch (_char) {
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
		if (!ra.$) {
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
		if (!result.$) {
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
		if ((((!results.a.a.$) && (!results.a.b.$)) && (!results.b.a.$)) && (!results.b.b.$)) {
			var _v5 = results.a;
			var red = _v5.a.a;
			var green = _v5.b.a;
			var _v6 = results.b;
			var blue = _v6.a.a;
			var alpha = _v6.b.a;
			return {
				bb: alpha / 255,
				eq: blue,
				Q: 0,
				eG: green,
				e5: red,
				g4: $rtfeldman$elm_css$Css$withPrecedingHash(str)
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
					_Utils_Tuple2('f', 'f'));
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
								_Utils_Tuple2('f', 'f'));
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
			bb: 1,
			eq: b,
			Q: 0,
			eG: g,
			e5: r,
			g4: A2(
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
	aj: $rtfeldman$elm_css$Css$hex('#FFFFFF'),
	fz: $rtfeldman$elm_css$Css$hex('#F0F1F4'),
	fF: $rtfeldman$elm_css$Css$hex('#898BA9'),
	bd: $rtfeldman$elm_css$Css$hex('#0168b3'),
	be: $rtfeldman$elm_css$Css$hex('#4B4D68'),
	P: 7,
	bg: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	bh: A3($rtfeldman$elm_css$Css$rgb, 51, 51, 51),
	Q: $rtfeldman$elm_css$Css$hex('#000000'),
	bi: 0.3,
	ew: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	ex: A3($rtfeldman$elm_css$Css$rgb, 51, 51, 51),
	gk: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
	br: 48,
	eX: $rtfeldman$elm_css$Css$hex('#E1E2EA'),
	eY: 16,
	eZ: $rtfeldman$elm_css$Css$hex('#35374A'),
	e_: $rtfeldman$elm_css$Css$hex('#6B6E94'),
	e$: $rtfeldman$elm_css$Css$hex('#4B4D68'),
	e0: $elm$core$Maybe$Nothing,
	bv: 0.5,
	e9: $rtfeldman$elm_css$Css$hex('#35374A'),
	fa: A3($rtfeldman$elm_css$Css$rgb, 204, 204, 204)
};
var $Confidenceman02$elm_select$Select$Styles$controlDefault = $Confidenceman02$elm_select$Select$Styles$defaultsControl;
var $Confidenceman02$elm_select$Select$Styles$MenuConfig = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$Styles$MenuControlConfig = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$Styles$Px = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$Css$absolute = {d2: 0, g4: 'absolute'};
var $rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			bb: alpha,
			eq: b,
			Q: 0,
			eG: g,
			e5: r,
			g4: A2(
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
	aj: $rtfeldman$elm_css$Css$hex('#FFFFFF'),
	P: 7,
	c8: 6,
	db: 12,
	dc: A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.19),
	dd: 0,
	de: 0,
	d: {
		aj: $rtfeldman$elm_css$Css$hex('#FFFFFF'),
		fz: $rtfeldman$elm_css$Css$hex('#F0F1F4'),
		fF: $rtfeldman$elm_css$Css$hex('#898BA9'),
		bd: $rtfeldman$elm_css$Css$hex('#0168b3'),
		be: $rtfeldman$elm_css$Css$hex('#4B4D68'),
		P: 7,
		bg: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
		bh: A3($rtfeldman$elm_css$Css$rgb, 51, 51, 51),
		Q: $rtfeldman$elm_css$Css$hex('#000000'),
		bi: 0.3,
		gk: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102),
		br: 35,
		bv: 0.5,
		e7: A3($rtfeldman$elm_css$Css$rgb, 102, 102, 102)
	},
	ev: A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.1),
	cF: $Confidenceman02$elm_select$Select$Styles$Px(
		$rtfeldman$elm_css$Css$px(215)),
	d2: $rtfeldman$elm_css$Css$absolute
};
var $Confidenceman02$elm_select$Select$Styles$menuDefault = $Confidenceman02$elm_select$Select$Styles$defaultsMenu;
var $Confidenceman02$elm_select$Select$Styles$MenuItemConfig = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$Styles$defaultsMenuItem = {
	c3: $rtfeldman$elm_css$Css$hex('#E6F0F7'),
	c4: $rtfeldman$elm_css$Css$hex('#E6F0F7'),
	c5: $rtfeldman$elm_css$Css$hex('#E6F0F7'),
	c6: 8,
	P: 4,
	Q: $rtfeldman$elm_css$Css$hex('#000000'),
	dj: $rtfeldman$elm_css$Css$hex('#0168B3'),
	dk: $rtfeldman$elm_css$Css$hex('#0168B3'),
	dC: 8
};
var $Confidenceman02$elm_select$Select$Styles$menuItemDefault = $Confidenceman02$elm_select$Select$Styles$defaultsMenuItem;
var $Confidenceman02$elm_select$Select$Styles$GroupConfig = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$UnitlessInteger = 0;
var $rtfeldman$elm_css$Css$int = function (val) {
	return {
		a0: 0,
		dF: 0,
		bp: 0,
		aQ: 0,
		iK: 0,
		dQ: 0,
		a2: val,
		cg: '',
		cW: 0,
		g4: $elm$core$String$fromInt(val)
	};
};
var $rtfeldman$elm_css$Css$uppercase = {bC: 0, g4: 'uppercase'};
var $Confidenceman02$elm_select$Select$Styles$defaultsGroup = {
	Q: $rtfeldman$elm_css$Css$hex('#9e9e9e'),
	dt: $rtfeldman$elm_css$Css$px(14).g4,
	du: $rtfeldman$elm_css$Css$int(500).g4,
	ed: $rtfeldman$elm_css$Css$uppercase.g4
};
var $Confidenceman02$elm_select$Select$Styles$menuItemGroupDefault = $Confidenceman02$elm_select$Select$Styles$defaultsGroup;
var $Confidenceman02$elm_select$Select$Styles$defaults = {dq: $Confidenceman02$elm_select$Select$Styles$controlDefault, dL: $Confidenceman02$elm_select$Select$Styles$menuDefault, dM: $Confidenceman02$elm_select$Select$Styles$menuItemDefault, dN: $Confidenceman02$elm_select$Select$Styles$menuItemGroupDefault};
var $Confidenceman02$elm_select$Select$Styles$default = $Confidenceman02$elm_select$Select$Styles$defaults;
var $Confidenceman02$elm_select$Select$defaults = {
	O: $elm$core$Maybe$Nothing,
	D: false,
	b: false,
	aw: false,
	I: $elm$core$Maybe$Nothing,
	cE: 'Loading...',
	an: _List_Nil,
	ah: $elm$core$Maybe$Nothing,
	N: 'Select...',
	C: true,
	e: $Confidenceman02$elm_select$Select$initState(
		$Confidenceman02$elm_select$Select$selectIdentifier('elm-select')),
	k: $Confidenceman02$elm_select$Select$Styles$default,
	a: $Confidenceman02$elm_select$Select$CustomVariant(
		$Confidenceman02$elm_select$Select$Single($elm$core$Maybe$Nothing))
};
var $Confidenceman02$elm_select$Select$single = function (maybeSelectedItem) {
	return _Utils_update(
		$Confidenceman02$elm_select$Select$defaults,
		{
			a: $Confidenceman02$elm_select$Select$CustomVariant(
				$Confidenceman02$elm_select$Select$Single(maybeSelectedItem))
		});
};
var $Confidenceman02$elm_select$Select$state = F2(
	function (state_, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{e: state_});
	});
var $Confidenceman02$elm_select$Select$BuildPlaceholderData = F4(
	function (variant, state, controlStyles, placeholder) {
		return {t: controlStyles, N: placeholder, e: state, a: variant};
	});
var $Confidenceman02$elm_select$Select$BuildViewableMenuItemsData = F4(
	function (searchable, inputValue, menuItems, variant) {
		return {z: inputValue, an: menuItems, C: searchable, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewClearIndicatorData = F5(
	function (disabled, clearable, variant, state, styles) {
		return {D: clearable, b: disabled, e: state, k: styles, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewControlWrapperData = F6(
	function (disabled, state, controlStyles, menuStyles, variant, searchable) {
		return {t: controlStyles, b: disabled, ao: menuStyles, C: searchable, e: state, a: variant};
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
													return {O: ariaDescribedBy, D: clearable, t: controlStyles, b: disabled, eA: enterSelectTargetItem, I: labelledBy, gj: loading, N: placeholder, C: searchable, e: state, k: styles, fh: totalMenuItems, a: variant};
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
		return {t: controlStyles, b: disabled};
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
										return {O: ariaDescribedBy, D: clearable, b: disabled, f3: id, I: labelledBy, gn: maybeTargetItem, v: menuOpen, e: state, a8: totalViewableMenuItems, a: variant};
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
		return {gl: loadingText, ao: menuStyles, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewLoadingSpinnerData = F2(
	function (isLoading, loadingIndicatorColor) {
		return {aw: isLoading, gk: loadingIndicatorColor};
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
											return {w: activeTargetIndex, l: controlUiFocused, b: disabled, f: initialAction, dO: menuItemGroupStyles, F: menuItemStyles, B: menuNavigation, ao: menuStyles, r: selectId, a: variant, ek: viewableMenuItems};
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
										return {w: activeTargetIndex, l: controlUiFocused, b: disabled, f: initialAction, dO: menuItemGroupStyles, F: menuItemStyles, B: menuNavigation, r: selectId, a: variant, ek: viewableMenuItems};
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
		return {B: menuNavigation, ao: menuStyles, r: selectId, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewNativeData = F9(
	function (controlStyles, variant, menuItems, selectId, labelledBy, ariaDescribedBy, placeholder, disabled, name) {
		return {O: ariaDescribedBy, t: controlStyles, b: disabled, I: labelledBy, an: menuItems, ah: name, N: placeholder, r: selectId, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewSelectInputData = F8(
	function (maybeActiveTarget, totalViewableMenuItems, variant, labelledBy, ariaDescribedBy, disabled, clearable, state) {
		return {O: ariaDescribedBy, D: clearable, b: disabled, I: labelledBy, eP: maybeActiveTarget, e: state, a8: totalViewableMenuItems, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewWrapperData = F4(
	function (state, searchable, variant, disabled) {
		return {b: disabled, C: searchable, e: state, a: variant};
	});
var $Confidenceman02$elm_select$Select$ViewPlaceholderData = F2(
	function (placeholderOpac, placeholder) {
		return {N: placeholder, gC: placeholderOpac};
	});
var $Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity = function (_v0) {
	var config = _v0;
	return config.bv;
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
var $rtfeldman$elm_css$Css$borderBox = {ep: 0, df: 0, g4: 'border-box'};
var $rtfeldman$elm_css$Css$boxSizing = $rtfeldman$elm_css$Css$prop1('box-sizing');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return $elm$core$List$isEmpty(list) ? {g4: 'none'} : {
		g4: A3(
			$rtfeldman$elm_css$Css$String$mapJoin,
			function ($) {
				return $.g4;
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
	var value = _v0.g4;
	return {
		y: 0,
		g4: A2(
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
		$rtfeldman$elm_css$Css$px(2).g4),
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
var $rtfeldman$elm_css$Css$UnitlessFloat = 0;
var $rtfeldman$elm_css$Css$num = function (val) {
	return {
		bp: 0,
		aQ: 0,
		iK: 0,
		dQ: 0,
		a2: val,
		cg: '',
		cW: 0,
		g4: $elm$core$String$fromFloat(val)
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
				$Confidenceman02$elm_select$Select$placeholderStyles(data.gC))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(data.N)
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
	if (!expression) {
		return '+';
	} else {
		return '-';
	}
};
var $rtfeldman$elm_css$Css$calc = F3(
	function (firstExpr, expression, secondExpr) {
		var withoutCalcStr = function (l) {
			return A2($elm$core$String$startsWith, 'calc(', l.g4) ? A2($elm$core$String$dropLeft, 4, l.g4) : l.g4;
		};
		var calcs = withoutCalcStr(firstExpr) + (' ' + ($rtfeldman$elm_css$Css$calcExpressionToString(expression) + (' ' + withoutCalcStr(secondExpr))));
		var value = A2(
			$rtfeldman$elm_css$Css$cssFunction,
			'calc',
			_List_fromArray(
				[calcs]));
		return {fG: 0, bQ: 0, W: 0, cC: 0, bX: 0, a1: 0, bY: 0, bZ: 0, bo: 0, bp: 0, aQ: 0, ce: 0, g4: value};
	});
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.g4);
};
var $rtfeldman$elm_css$Css$ellipsis = {g_: 0, g4: 'ellipsis'};
var $rtfeldman$elm_css$Css$fontWeight = function (_v0) {
	var value = _v0.g4;
	return A2($rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var $Confidenceman02$elm_select$Select$Styles$getControlSelectedColor = function (_v0) {
	var config = _v0;
	return config.e9;
};
var $Confidenceman02$elm_select$Select$getMenuItemLabel = function (item) {
	if (!item.$) {
		var config = item.a;
		return config.dI;
	} else {
		var config = item.a;
		return config.dI;
	}
};
var $rtfeldman$elm_css$Css$hidden = {aa: 0, b2: 0, g4: 'hidden', cX: 0};
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $rtfeldman$elm_css$Css$Subtraction = 1;
var $rtfeldman$elm_css$Css$minus = 1;
var $rtfeldman$elm_css$Css$noWrap = {cw: 0, ds: 0, g4: 'nowrap', ba: 0};
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
	if ($Confidenceman02$elm_select$Select$isEmptyInputValue(data.e.z)) {
		var _v0 = data.a;
		switch (_v0.$) {
			case 1:
				if (!_v0.a.b) {
					return $Confidenceman02$elm_select$Select$viewPlaceholder(
						A2(
							$Confidenceman02$elm_select$Select$ViewPlaceholderData,
							$Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity(data.t),
							data.N));
				} else {
					return $rtfeldman$elm_css$Html$Styled$text('');
				}
			case 0:
				if (!_v0.a.$) {
					var v = _v0.a.a;
					return A2($Confidenceman02$elm_select$Select$viewSelectedPlaceholder, data.t, v);
				} else {
					var _v1 = _v0.a;
					return $Confidenceman02$elm_select$Select$viewPlaceholder(
						A2(
							$Confidenceman02$elm_select$Select$ViewPlaceholderData,
							$Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity(data.t),
							data.N));
				}
			default:
				return $Confidenceman02$elm_select$Select$viewPlaceholder(
					A2(
						$Confidenceman02$elm_select$Select$ViewPlaceholderData,
						$Confidenceman02$elm_select$Select$Styles$getControlPlaceholderOpacity(data.t),
						data.N));
		}
	} else {
		return $rtfeldman$elm_css$Html$Styled$text('');
	}
};
var $Confidenceman02$elm_select$Select$enterSelectTargetItem = F2(
	function (state_, viewableMenuItems) {
		return (state_.v && (!$elm$core$List$isEmpty(viewableMenuItems))) ? A2($elm_community$list_extra$List$Extra$getAt, state_.w, viewableMenuItems) : $elm$core$Maybe$Nothing;
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
	if (!mi.$) {
		var obj = mi.a;
		return obj.bP;
	} else {
		var obj = mi.a;
		return obj.bP;
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
		var _v1 = _Utils_Tuple2(data.C, data.z);
		if (_v1.a && (!_v1.b.$)) {
			var value = _v1.b.a;
			return $elm$core$String$isEmpty(value) ? data.an : A2(
				$elm$core$List$filter,
				filterMenuItem(value),
				data.an);
		} else {
			return data.an;
		}
	}();
	var _v0 = data.a;
	if (!_v0.$) {
		switch (_v0.a.$) {
			case 0:
				return filteredMenuItems;
			case 1:
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
	var config = _v0;
	return config.dq;
};
var $Confidenceman02$elm_select$Select$Styles$getControlLoadingIndicatorColor = function (_v0) {
	var config = _v0;
	return config.gk;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupConfig = function (_v0) {
	var config = _v0;
	return config.dN;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuConfig = function (_v0) {
	var config = _v0;
	return config.dL;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlLoadingIndicatorColor = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.gk;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlSearchIndicatorColor = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.e7;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemConfig = function (_v0) {
	var config = _v0;
	return config.dM;
};
var $Confidenceman02$elm_select$Select$getSelectId = function (_v0) {
	var selectId = _v0.r;
	var _v1 = selectId;
	var idString = _v1;
	return idString;
};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 6, a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 0:
					var str = style.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 1:
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 2:
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 3:
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 4:
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 5:
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
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = 0;
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '', 0);
var $rtfeldman$elm_css$Css$alignSelf = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignSelf',
		'align-self',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.g4);
};
var $Confidenceman02$elm_select$Select$Styles$getControlSeparatorColor = function (_v0) {
	var config = _v0;
	return config.fa;
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
		return A2($rtfeldman$elm_css$Css$property, key, argA.g4 + (' ' + (argB.g4 + (' ' + (argC.g4 + (' ' + argD.g4))))));
	});
var $rtfeldman$elm_css$Css$boxShadow4 = $rtfeldman$elm_css$Css$prop4('box-shadow');
var $Confidenceman02$elm_select$Select$Styles$getMenuBackgroundColor = function (_v0) {
	var config = _v0;
	return config.aj;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBorderRadius = function (_v0) {
	var config = _v0;
	return config.P;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowBlur = function (_v0) {
	var config = _v0;
	return config.db;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowColor = function (_v0) {
	var config = _v0;
	return config.dc;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowHOffset = function (_v0) {
	var config = _v0;
	return config.dd;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBoxShadowVOffset = function (_v0) {
	var config = _v0;
	return config.de;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuPosition = function (_v0) {
	var config = _v0;
	return config.d2;
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
var $rtfeldman$elm_css$Css$none = {bH: 0, fD: 0, aa: 0, h: 0, E: 0, ie: 0, f9: 0, eO: 0, bZ: 0, bo: 0, aQ: 0, m: 0, i: 0, e1: 0, d0: 0, iZ: 0, aB: 0, d5: 0, i6: 0, cd: 0, bC: 0, ai: 0, y: 0, jK: 0, g4: 'none'};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$pointerEvents = $rtfeldman$elm_css$Css$prop1('pointer-events');
var $rtfeldman$elm_css$Css$relative = {d2: 0, g4: 'relative'};
var $rtfeldman$elm_css$Css$right = $rtfeldman$elm_css$Css$prop1('right');
var $Confidenceman02$elm_select$Select$ClearIndicatorData = F5(
	function (disabled, indicatorColor, indicatorColorHover, variant, selectId) {
		return {b: disabled, f7: indicatorColor, f8: indicatorColorHover, r: selectId, a: variant};
	});
var $Confidenceman02$elm_select$Select$ShowClearButtonData = F4(
	function (variant, disabled, clearable, state) {
		return {D: clearable, b: disabled, e: state, a: variant};
	});
var $Confidenceman02$elm_select$Select$ClearButtonKeyDowned = function (a) {
	return {$: 32, a: a};
};
var $Confidenceman02$elm_select$Select$ClearButtonMouseDowned = function (a) {
	return {$: 31, a: a};
};
var $Confidenceman02$elm_select$Select$OnMenuClearableBlurred = {$: 15};
var $Confidenceman02$elm_select$Select$OnMenuClearableShiftTabbed = function (a) {
	return {$: 14, a: a};
};
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$cursor = $rtfeldman$elm_css$Css$prop1('cursor');
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
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
		return {$: 1, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 2, a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$hover = $rtfeldman$elm_css$Css$pseudoClass('hover');
var $rtfeldman$elm_css$Css$border = $rtfeldman$elm_css$Css$prop1('border');
var $rtfeldman$elm_css$Css$borderColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'border-color', c.g4);
};
var $rtfeldman$elm_css$Css$initial = {fs: 0, fv: 0, cp: 0, fy: 0, bH: 0, fA: 0, bI: 0, aX: 0, aa: 0, df: 0, Q: 0, h: 0, E: 0, bQ: 0, eD: 0, cw: 0, ds: 0, bj: 0, W: 0, bR: 0, x: 0, a0: 0, dF: 0, gf: 0, eO: 0, cC: 0, bX: 0, a1: 0, bY: 0, bZ: 0, bo: 0, bp: 0, aQ: 0, dK: 0, m: 0, i: 0, e1: 0, iK: 0, a2: 0, d0: 0, b2: 0, aB: 0, eb: 0, cd: 0, bB: 0, ce: 0, cf: 0, bC: 0, ai: 0, cg: '', cW: 0, g4: 'initial', cX: 0, ba: 0};
var $rtfeldman$elm_css$Css$inherit = _Utils_update(
	$rtfeldman$elm_css$Css$initial,
	{g4: 'inherit'});
var $rtfeldman$elm_css$Css$transparent = {Q: 0, g4: 'transparent'};
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
var $Confidenceman02$elm_select$Select$Events$Enter = 3;
var $Confidenceman02$elm_select$Select$Events$Backspace = 4;
var $Confidenceman02$elm_select$Select$Events$DownArrow = 2;
var $Confidenceman02$elm_select$Select$Events$Escape = 0;
var $Confidenceman02$elm_select$Select$Events$Other = 8;
var $Confidenceman02$elm_select$Select$Events$Shift = 6;
var $Confidenceman02$elm_select$Select$Events$Space = 5;
var $Confidenceman02$elm_select$Select$Events$Tab = 7;
var $Confidenceman02$elm_select$Select$Events$UpArrow = 1;
var $Confidenceman02$elm_select$Select$Events$backspace = 8;
var $Confidenceman02$elm_select$Select$Events$downArrow = 40;
var $Confidenceman02$elm_select$Select$Events$enter = 13;
var $Confidenceman02$elm_select$Select$Events$escape = 27;
var $Confidenceman02$elm_select$Select$Events$shift = 16;
var $Confidenceman02$elm_select$Select$Events$space = 32;
var $Confidenceman02$elm_select$Select$Events$tab = 9;
var $Confidenceman02$elm_select$Select$Events$upArrow = 38;
var $Confidenceman02$elm_select$Select$Events$keyCodeToKey = function (keyCode) {
	return _Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$escape) ? 0 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$backspace) ? 4 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$upArrow) ? 1 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$downArrow) ? 2 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$enter) ? 3 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$space) ? 5 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$shift) ? 6 : (_Utils_eq(keyCode, $Confidenceman02$elm_select$Select$Events$tab) ? 7 : 8)))))));
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
		A2($Confidenceman02$elm_select$Select$Events$isCode, 3, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$Events$isSpace = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, 5, msg),
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
				7,
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
var $rtfeldman$elm_css$Css$pointer = {h: 0, g4: 'pointer'};
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
		var _v2 = data.a;
		if ((!_v2.$) && (_v2.a.$ === 2)) {
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Events$onBlur($Confidenceman02$elm_select$Select$OnMenuClearableBlurred)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var resolveTab = function () {
		var _v1 = data.a;
		if ((!_v1.$) && (_v1.a.$ === 2)) {
			return _List_fromArray(
				[
					$Confidenceman02$elm_select$Select$Events$isTabWithShift($Confidenceman02$elm_select$Select$OnMenuClearableShiftTabbed)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var resolveIconButtonStyles = data.b ? _List_fromArray(
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
		if (msg.$ === 14) {
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
					$Confidenceman02$elm_select$Select$clearableId(data.r)),
					A2(
					$rtfeldman$elm_css$Html$Styled$Events$custom,
					'mousedown',
					A2(
						$elm$json$Json$Decode$map,
						function (msg) {
							return {go: msg, gE: true, gW: true};
						},
						$elm$json$Json$Decode$succeed(
							$Confidenceman02$elm_select$Select$ClearButtonMouseDowned(data.a)))),
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
										$Confidenceman02$elm_select$Select$ClearButtonKeyDowned(data.a)),
										$Confidenceman02$elm_select$Select$Events$isEnter(
										$Confidenceman02$elm_select$Select$ClearButtonKeyDowned(data.a))
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
								$rtfeldman$elm_css$Css$color(data.f7),
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$hover(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$color(data.f8)
									]))
							]))
					]),
				_List_fromArray(
					[$Confidenceman02$elm_select$Select$ClearIcon$view]))
			]));
};
var $Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColor = function (_v0) {
	var config = _v0;
	return config.bg;
};
var $Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColorHover = function (_v0) {
	var config = _v0;
	return config.bh;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColor = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.bg;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColorHover = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.bh;
};
var $Confidenceman02$elm_select$Select$indicatorContainerStyles = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$displayFlex,
		$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
		$rtfeldman$elm_css$Css$padding(
		$rtfeldman$elm_css$Css$px(8))
	]);
var $Confidenceman02$elm_select$Select$showClearButton = function (data) {
	if (data.D && (!data.b)) {
		var _v0 = data.a;
		_v0$4:
		while (true) {
			if (!_v0.$) {
				switch (_v0.a.$) {
					case 0:
						if (!_v0.a.a.$) {
							return true;
						} else {
							break _v0$4;
						}
					case 2:
						var _v1 = data.e.z;
						if (!_v1.$) {
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
				if ((!_v0.a.$) && (!_v0.a.a.$)) {
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
	var menuStyles = $Confidenceman02$elm_select$Select$Styles$getMenuConfig(data.k);
	var ctrlStyles = $Confidenceman02$elm_select$Select$Styles$getControlConfig(data.k);
	var _v0 = data.e;
	var state_ = _v0;
	var clearButtonVisible = $Confidenceman02$elm_select$Select$showClearButton(
		A4($Confidenceman02$elm_select$Select$ShowClearButtonData, data.a, data.b, data.D, state_));
	var resolveClearIndicatorData = function () {
		var _v1 = data.a;
		if ((!_v1.$) && (_v1.a.$ === 2)) {
			return A5(
				$Confidenceman02$elm_select$Select$ClearIndicatorData,
				data.b,
				$Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColor(menuStyles),
				$Confidenceman02$elm_select$Select$Styles$getMenuControlClearIndicatorColorHover(menuStyles),
				data.a,
				state_.r);
		} else {
			return A5(
				$Confidenceman02$elm_select$Select$ClearIndicatorData,
				data.b,
				$Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColor(ctrlStyles),
				$Confidenceman02$elm_select$Select$Styles$getControlClearIndicatorColorHover(ctrlStyles),
				data.a,
				state_.r);
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
		return {b: disabled, C: searchable, e: state, a: variant};
	});
var $rtfeldman$elm_css$Css$batch = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var $Confidenceman02$elm_select$Select$SearchableSelectContainerClicked = function (a) {
	return {$: 7, a: a};
};
var $Confidenceman02$elm_select$Select$UnsearchableSelectContainerClicked = {$: 8};
var $Confidenceman02$elm_select$Select$containerClickedMsg = function (data) {
	var resolveContainerMsg = data.C ? $Confidenceman02$elm_select$Select$SearchableSelectContainerClicked(data.a) : $Confidenceman02$elm_select$Select$UnsearchableSelectContainerClicked;
	var preventDefault = function () {
		var _v0 = data.e.f;
		switch (_v0.$) {
			case 3:
				var _v1 = data.a;
				if (_v1.$ === 2) {
					return _Utils_eq(
						data.e.l,
						$elm$core$Maybe$Just(0));
				} else {
					if (resolveContainerMsg.$ === 8) {
						return _Utils_eq(
							data.e.l,
							$elm$core$Maybe$Just(0));
					} else {
						return false;
					}
				}
			case 2:
				return true;
			default:
				return true;
		}
	}();
	return data.b ? _List_Nil : _List_fromArray(
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
		return {fz: backgroundColorHover, fF: borderColor};
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
		return A2($rtfeldman$elm_css$Css$property, key, argA.g4 + (' ' + (argB.g4 + (' ' + argC.g4))));
	});
var $rtfeldman$elm_css$Css$border3 = $rtfeldman$elm_css$Css$prop3('border');
var $rtfeldman$elm_css$Css$solid = {aa: 0, bB: 0, g4: 'solid'};
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
				$rtfeldman$elm_css$Css$backgroundColor(styles.fz),
				$rtfeldman$elm_css$Css$borderColor(styles.fF)
			]));
};
var $Confidenceman02$elm_select$Select$controlRadius = function (rad) {
	return $rtfeldman$elm_css$Css$borderRadius(
		$rtfeldman$elm_css$Css$px(rad));
};
var $rtfeldman$elm_css$Css$default = {h: 0, g4: 'default'};
var $rtfeldman$elm_css$Css$flexWrap = $rtfeldman$elm_css$Css$prop1('flex-wrap');
var $Confidenceman02$elm_select$Select$Styles$getControlBackgroundColor = function (_v0) {
	var config = _v0;
	return config.aj;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBackgroundColorHover = function (_v0) {
	var config = _v0;
	return config.fz;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBorderColor = function (_v0) {
	var config = _v0;
	return config.fF;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBorderColorFocus = function (_v0) {
	var config = _v0;
	return config.bd;
};
var $Confidenceman02$elm_select$Select$Styles$getControlBorderRadius = function (_v0) {
	var config = _v0;
	return config.P;
};
var $Confidenceman02$elm_select$Select$Styles$getControlColor = function (_v0) {
	var config = _v0;
	return config.Q;
};
var $Confidenceman02$elm_select$Select$Styles$getControlDisabledOpacity = function (_v0) {
	var config = _v0;
	return config.bi;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMinHeight = function (_v0) {
	var config = _v0;
	return config.br;
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
var $rtfeldman$elm_css$Css$wrap = {cw: 0, ds: 0, g4: 'wrap'};
var $rtfeldman$elm_css$Css$zero = {cC: 0, bX: 0, a1: 0, bY: 0, bZ: 0, bo: 0, bp: 0, iK: 0, a2: 0, d0: 0, cg: '', cW: 0, g4: '0'};
var $Confidenceman02$elm_select$Select$controlStyles = F3(
	function (styles, state_, dsb) {
		var controlFocusedStyles = function () {
			var _v0 = state_.l;
			if ((!_v0.$) && (!_v0.a)) {
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
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.aj;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColor = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.fF;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBorderColorFocus = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.bd;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlBorderRadius = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.P;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlColor = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.Q;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlDisabledOpacity = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.bi;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuControlMinHeight = function (_v0) {
	var config = _v0;
	var _v1 = config.d;
	var mc = _v1;
	return mc.br;
};
var $Confidenceman02$elm_select$Select$menuControlStyles = F3(
	function (styles, state_, dsb) {
		var controlFocusedStyles = function () {
			var _v0 = state_.l;
			if (!_v0.$) {
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
	var _v0 = data.e;
	var state_ = _v0;
	var resolveControlStyles = function () {
		var _v2 = data.a;
		if (_v2.$ === 2) {
			return _List_fromArray(
				[
					A4(
					$rtfeldman$elm_css$Css$margin4,
					$rtfeldman$elm_css$Css$px(6),
					$rtfeldman$elm_css$Css$px(6),
					$rtfeldman$elm_css$Css$px(0),
					$rtfeldman$elm_css$Css$px(6)),
					$rtfeldman$elm_css$Css$batch(
					A3($Confidenceman02$elm_select$Select$menuControlStyles, data.ao, state_, data.b))
				]);
		} else {
			return A3($Confidenceman02$elm_select$Select$controlStyles, data.t, state_, data.b);
		}
	}();
	return $rtfeldman$elm_css$Html$Styled$div(
		A2(
			$elm$core$List$cons,
			$rtfeldman$elm_css$Html$Styled$Attributes$css(resolveControlStyles),
			data.b ? _List_Nil : A2(
				$elm$core$List$cons,
				A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', 'selectContainer'),
				function () {
					var _v1 = data.a;
					if (_v1.$ === 2) {
						return $Confidenceman02$elm_select$Select$containerClickedMsg(
							A4($Confidenceman02$elm_select$Select$ContainerClickedMsgData, data.b, state_, data.a, data.C));
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
var $rtfeldman$elm_css$Css$RemUnits = 0;
var $rtfeldman$elm_css$Css$rem = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'rem');
var $Confidenceman02$elm_select$Select$Styles$getControlDropdownIndicatorColor = function (_v0) {
	var config = _v0;
	return config.ew;
};
var $Confidenceman02$elm_select$Select$Styles$getControlDropdownIndicatorColorHover = function (_v0) {
	var config = _v0;
	return config.ex;
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
				A2($Confidenceman02$elm_select$Select$dropdownIndicator, data.t, data.b)
			]));
};
var $Confidenceman02$elm_select$Select$EnterSelect = function (a) {
	return {$: 27, a: a};
};
var $Confidenceman02$elm_select$Select$InputReceivedFocused = function (a) {
	return {$: 3, a: a};
};
var $Confidenceman02$elm_select$Select$KeyboardDown = function (a) {
	return {$: 29, a: a};
};
var $Confidenceman02$elm_select$Select$KeyboardUp = function (a) {
	return {$: 30, a: a};
};
var $Confidenceman02$elm_select$Select$OnInputBlurred = function (a) {
	return {$: 11, a: a};
};
var $Confidenceman02$elm_select$Select$ToggleMenuAtKey = {$: 9};
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaDescribedby = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-describedby');
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaLabelledby = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-labelledby');
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $Confidenceman02$elm_select$Select$Events$isDownArrow = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, 2, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$Events$isEscape = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, 0, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$Events$isUpArrow = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, 1, msg),
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
		var _v3 = data.I;
		if (!_v3.$) {
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
		var _v2 = data.O;
		if (!_v2.$) {
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
		var _v1 = data.gn;
		if (!_v1.$) {
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
	var whenArrowEvents = (data.v && (!data.a8)) ? _List_Nil : _List_fromArray(
		[
			$Confidenceman02$elm_select$Select$Events$isDownArrow(
			$Confidenceman02$elm_select$Select$KeyboardDown(data.a8)),
			$Confidenceman02$elm_select$Select$Events$isUpArrow(
			$Confidenceman02$elm_select$Select$KeyboardUp(data.a8))
		]);
	var resolvePosition = function () {
		var _v0 = data.a;
		if (_v0.$ === 2) {
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
					$rtfeldman$elm_css$Html$Styled$Attributes$id(data.f3),
					$rtfeldman$elm_css$Html$Styled$Events$onFocus(
					$Confidenceman02$elm_select$Select$InputReceivedFocused(
						$Confidenceman02$elm_select$Select$CustomVariant(data.a))),
					$rtfeldman$elm_css$Html$Styled$Events$onBlur(
					$Confidenceman02$elm_select$Select$OnInputBlurred(
						$Confidenceman02$elm_select$Select$CustomVariant(data.a))),
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
		return A2($rtfeldman$elm_css$Css$property, key, argA.g4 + (' ' + argB.g4));
	});
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $rtfeldman$elm_css$Css$static = {d2: 0, g4: 'static'};
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
	return {$: 5, a: a};
};
var $rtfeldman$elm_css$Css$animationName = function (arg) {
	return ((arg.g4 === 'none') || ((arg.g4 === 'inherit') || ((arg.g4 === 'unset') || (arg.g4 === 'initial')))) ? A2($rtfeldman$elm_css$Css$prop1, 'animation-name', arg) : $rtfeldman$elm_css$Css$Preprocess$WithKeyframes(arg.g4);
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
			var prop = _v1;
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
	return $elm$core$List$isEmpty(tuples) ? {eO: 0, e1: 0, g4: 'none'} : {
		eO: 0,
		e1: 0,
		g4: $rtfeldman$elm_css$Css$Internal$compileKeyframes(tuples)
	};
};
var $Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDelay = 0.2;
var $Confidenceman02$elm_select$Select$DotLoadingIcon$logoAnimationDuration = 1;
var $rtfeldman$elm_css$Css$Internal$Property = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$Animations$opacity = function (_v0) {
	var value = _v0.g4;
	return 'opacity:' + value;
};
var $rtfeldman$elm_css$Css$sec = function (amount) {
	return {
		fO: 0,
		g4: $elm$core$String$fromFloat(amount) + 's'
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
	var resolveLoadingSpinner = data.aw ? $Confidenceman02$elm_select$Select$viewLoading : $rtfeldman$elm_css$Html$Styled$text('');
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
								$rtfeldman$elm_css$Css$color(data.gk),
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
var $Confidenceman02$elm_select$Select$ClearFocusedItem = {$: 25};
var $Confidenceman02$elm_select$Select$DeselectedMultiItem = function (a) {
	return {$: 6, a: a};
};
var $Confidenceman02$elm_select$Select$MultiItemMousedown = function (a) {
	return {$: 22, a: a};
};
var $Confidenceman02$elm_select$Select$Tag$Config = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$Tag$dataTestId = F2(
	function (testId, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{es: testId});
	});
var $Confidenceman02$elm_select$Select$Tag$defaults = {
	aj: $rtfeldman$elm_css$Css$hex('#E1E2EA'),
	P: 16,
	t: $Confidenceman02$elm_select$Select$Styles$getControlConfig($Confidenceman02$elm_select$Select$Styles$default),
	es: 'multiSelectTag',
	dS: $elm$core$Maybe$Nothing,
	dY: $elm$core$Maybe$Nothing,
	dZ: $elm$core$Maybe$Nothing,
	d7: false
};
var $Confidenceman02$elm_select$Select$Tag$default = $Confidenceman02$elm_select$Select$Tag$defaults;
var $Confidenceman02$elm_select$Select$Tag$onDismiss = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dS: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$Tag$onMousedown = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dY: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$Tag$onMouseleave = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dZ: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$Tag$rightMargin = F2(
	function (pred, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{d7: pred});
	});
var $Confidenceman02$elm_select$Select$Tag$setControlStyles = F2(
	function (cfg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{t: cfg});
	});
var $rtfeldman$elm_css$Css$display = $rtfeldman$elm_css$Css$prop1('display');
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagBackgroundColor = function (_v0) {
	var config = _v0;
	return config.eX;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagBorderRadius = function (_v0) {
	var config = _v0;
	return config.eY;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagColor = function (_v0) {
	var config = _v0;
	return config.eZ;
};
var $rtfeldman$elm_css$Css$inlineBlock = {E: 0, g4: 'inline-block'};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColor = function (_v0) {
	var config = _v0;
	return config.e_;
};
var $Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColorHover = function (_v0) {
	var config = _v0;
	return config.e$;
};
var $rtfeldman$elm_css$Css$left = $rtfeldman$elm_css$Css$prop1('left');
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
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
				A2($elm$core$Maybe$map, dismiss, config.dS),
				A2($elm$core$Maybe$map, mousedown, config.dY),
				A2($elm$core$Maybe$map, mouseleave, config.dZ)
			]));
	var dataAttrib = _List_fromArray(
		[
			A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', config.es + '-dismiss')
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
						$Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColor(config.t)),
						$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
						$rtfeldman$elm_css$Css$hover(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(
								$Confidenceman02$elm_select$Select$Styles$getControlMultiTagDismissibleBackgroundColorHover(config.t))
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
	var config = _v0;
	return config.e0;
};
var $rtfeldman$elm_css$Css$overflowX = $rtfeldman$elm_css$Css$prop1('overflow-x');
var $Confidenceman02$elm_select$Select$Tag$viewTextContent = F2(
	function (config, value) {
		var resolveTruncation = function () {
			var _v0 = $Confidenceman02$elm_select$Select$Styles$getControlMultiTagTruncationWidth(config.t);
			if (!_v0.$) {
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
		var config = _v0;
		var resolveRightMargin = config.d7 ? $rtfeldman$elm_css$Css$px(7) : $rtfeldman$elm_css$Css$px(0);
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
							$Confidenceman02$elm_select$Select$Styles$getControlMultiTagColor(config.t)),
							$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
							A3(
							$rtfeldman$elm_css$Css$border3,
							$rtfeldman$elm_css$Css$px(2),
							$rtfeldman$elm_css$Css$solid,
							$rtfeldman$elm_css$Css$transparent),
							$rtfeldman$elm_css$Css$borderRadius(
							$rtfeldman$elm_css$Css$px(
								$Confidenceman02$elm_select$Select$Styles$getControlMultiTagBorderRadius(config.t))),
							A2(
							$rtfeldman$elm_css$Css$padding2,
							$rtfeldman$elm_css$Css$px(0),
							$rtfeldman$elm_css$Css$px(9.6)),
							$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
							$rtfeldman$elm_css$Css$backgroundColor(
							$Confidenceman02$elm_select$Select$Styles$getControlMultiTagBackgroundColor(config.t)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(30)),
							$rtfeldman$elm_css$Css$lineHeight($rtfeldman$elm_css$Css$initial)
						])),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', config.es)
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
			if (!mousedownedItem.$) {
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
var $Confidenceman02$elm_select$Select$SelectInput$Dynamic = {$: 0};
var $Confidenceman02$elm_select$Select$SelectInput$DynamicJsOptimized = function (a) {
	return {$: 1, a: a};
};
var $Confidenceman02$elm_select$Select$EnterSelectMulti = function (a) {
	return {$: 28, a: a};
};
var $Confidenceman02$elm_select$Select$InputChanged = function (a) {
	return {$: 0, a: a};
};
var $Confidenceman02$elm_select$Select$InputEscape = {$: 24};
var $Confidenceman02$elm_select$Select$InputMousedowned = {$: 23};
var $Confidenceman02$elm_select$Select$OnMenuInputTabbed = function (a) {
	return {$: 13, a: a};
};
var $Confidenceman02$elm_select$Select$SelectInput$Config = $elm$core$Basics$identity;
var $Confidenceman02$elm_select$Select$SelectInput$activeDescendant = F2(
	function (s, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				c0: $elm$core$Maybe$Just(s)
			});
	});
var $Confidenceman02$elm_select$Select$canBeSpaceToggled = F2(
	function (menuOpen, inputValue) {
		return (!menuOpen) && $Confidenceman02$elm_select$Select$isEmptyInputValue(inputValue);
	});
var $Confidenceman02$elm_select$Select$SelectInput$currentValue = F2(
	function (value_, _v0) {
		var config = _v0;
		return $elm$core$String$isEmpty(value_) ? _Utils_update(
			config,
			{ct: $elm$core$Maybe$Nothing}) : _Utils_update(
			config,
			{
				ct: $elm$core$Maybe$Just(value_)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$defaultWidth = 2;
var $Confidenceman02$elm_select$Select$SelectInput$defaults = {
	c0: $elm$core$Maybe$Nothing,
	cm: $elm$core$Maybe$Nothing,
	O: $elm$core$Maybe$Nothing,
	c1: false,
	c2: $elm$core$Maybe$Nothing,
	ct: $elm$core$Maybe$Nothing,
	es: 'selectInput',
	b: false,
	dE: $Confidenceman02$elm_select$Select$SelectInput$Dynamic,
	cH: $Confidenceman02$elm_select$Select$SelectInput$defaultWidth,
	dR: $elm$core$Maybe$Nothing,
	dU: $elm$core$Maybe$Nothing,
	dV: $elm$core$Maybe$Nothing,
	dY: $elm$core$Maybe$Nothing,
	cK: _Utils_Tuple2(
		_List_Nil,
		function (msg) {
			return _Utils_Tuple2(msg, true);
		})
};
var $Confidenceman02$elm_select$Select$SelectInput$default = $Confidenceman02$elm_select$Select$SelectInput$defaults;
var $Confidenceman02$elm_select$Select$SelectInput$inputSizing = F2(
	function (width, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{dE: width});
	});
var $Confidenceman02$elm_select$Select$Events$isTab = function (msg) {
	return A2(
		$elm$json$Json$Decode$andThen,
		A2($Confidenceman02$elm_select$Select$Events$isCode, 7, msg),
		$rtfeldman$elm_css$Html$Styled$Events$keyCode);
};
var $Confidenceman02$elm_select$Select$SelectInput$onBlurMsg = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dR: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$onFocusMsg = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dU: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$onInput = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dV: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$onMousedown = F2(
	function (msg, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				dY: $elm$core$Maybe$Just(msg)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$preventKeydownOn = F2(
	function (decoders, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{cK: decoders});
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaControls = F2(
	function (s, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				cm: $elm$core$Maybe$Just(s)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaDescribedBy = F2(
	function (s, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				O: $elm$core$Maybe$Just(s)
			});
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaExpanded = F2(
	function (expanded, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{c1: expanded});
	});
var $Confidenceman02$elm_select$Select$SelectInput$setAriaLabelledBy = F2(
	function (s, _v0) {
		var config = _v0;
		return _Utils_update(
			config,
			{
				c2: $elm$core$Maybe$Just(s)
			});
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
		var config = _v0;
		var withAriaOwns = function () {
			var _v7 = config.cm;
			if (!_v7.$) {
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
			var _v6 = config.c2;
			if (!_v6.$) {
				var s = _v6.a;
				return _List_fromArray(
					[
						$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaLabelledby(s)
					]);
			} else {
				return _List_Nil;
			}
		}();
		var withAriaExpanded = config.c1 ? _List_fromArray(
			[
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaExpanded('true')
			]) : _List_fromArray(
			[
				$dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaExpanded('false')
			]);
		var withAriaDescribedBy = function () {
			var _v5 = config.O;
			if (!_v5.$) {
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
			var _v4 = config.cm;
			if (!_v4.$) {
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
			var _v3 = config.c0;
			if (!_v3.$) {
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
				config.cK.b,
				$elm$json$Json$Decode$oneOf(config.cK.a)));
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
		var inputValue = A2($elm$core$Maybe$withDefault, '', config.ct);
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
			var _v1 = config.dE;
			if (!_v1.$) {
				return $elm$core$String$isEmpty(inputValue) ? _List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$size(1)
					]) : _List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$size(
						$elm$core$String$length(inputValue) + config.cH)
					]);
			} else {
				if (_v1.a) {
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$Attributes$style,
							'width',
							$elm$core$String$fromInt(config.cH) + 'px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-es-dynamic-select-input', buildDynamicSelectInputProps)
						]);
				} else {
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$Attributes$style,
							'width',
							$elm$core$String$fromInt(config.cH) + 'px')
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
		var events = config.b ? _List_Nil : _Utils_ap(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2($elm$core$Maybe$map, input_, config.dV),
						A2($elm$core$Maybe$map, blur, config.dR),
						A2($elm$core$Maybe$map, focus, config.dU),
						A2($elm$core$Maybe$map, mousedown, config.dY)
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
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'data-test-id', config.es)
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
	var whenArrowEvents = (data.e.v && (!data.a8)) ? _List_Nil : _List_fromArray(
		[
			$Confidenceman02$elm_select$Select$Events$isDownArrow(
			$Confidenceman02$elm_select$Select$KeyboardDown(data.a8)),
			$Confidenceman02$elm_select$Select$Events$isUpArrow(
			$Confidenceman02$elm_select$Select$KeyboardUp(data.a8))
		]);
	var stopProp = function () {
		var _v8 = data.a;
		if (_v8.$ === 2) {
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
		return A2($Confidenceman02$elm_select$Select$canBeSpaceToggled, data.e.v, data.e.z) ? A2(
			$elm$core$List$cons,
			$Confidenceman02$elm_select$Select$Events$isSpace($Confidenceman02$elm_select$Select$ToggleMenuAtKey),
			decoders) : decoders;
	};
	var resolveInputWidth = function (selectInputConfig) {
		return data.e.dH ? A2(
			$Confidenceman02$elm_select$Select$SelectInput$inputSizing,
			$Confidenceman02$elm_select$Select$SelectInput$DynamicJsOptimized(
				_Utils_eq(
					data.e.l,
					$elm$core$Maybe$Just(0))),
			selectInputConfig) : A2($Confidenceman02$elm_select$Select$SelectInput$inputSizing, $Confidenceman02$elm_select$Select$SelectInput$Dynamic, selectInputConfig);
	};
	var resolveInputValue = A2($elm$core$Maybe$withDefault, '', data.e.z);
	var resolveEnterMsg = function (mi) {
		var _v7 = data.a;
		if (_v7.$ === 1) {
			return $Confidenceman02$elm_select$Select$EnterSelectMulti(mi);
		} else {
			return $Confidenceman02$elm_select$Select$EnterSelect(mi);
		}
	};
	var resolveAriaLabelledBy = function (config) {
		var _v6 = data.I;
		if (!_v6.$) {
			var s = _v6.a;
			return A2($Confidenceman02$elm_select$Select$SelectInput$setAriaLabelledBy, s, config);
		} else {
			return config;
		}
	};
	var resolveAriaExpanded = function (config) {
		return A2($Confidenceman02$elm_select$Select$SelectInput$setAriaExpanded, data.e.v, config);
	};
	var resolveAriaDescribedBy = function (config) {
		var _v5 = data.O;
		if (!_v5.$) {
			var s = _v5.a;
			return A2($Confidenceman02$elm_select$Select$SelectInput$setAriaDescribedBy, s, config);
		} else {
			return config;
		}
	};
	var resolveAriaControls = function (config) {
		return A2(
			$Confidenceman02$elm_select$Select$SelectInput$setAriaControls,
			$Confidenceman02$elm_select$Select$menuListId(data.e.r),
			config);
	};
	var resolveAriaActiveDescendant = function (config) {
		var _v4 = data.eP;
		if (!_v4.$) {
			return A2(
				$Confidenceman02$elm_select$Select$SelectInput$activeDescendant,
				A2($Confidenceman02$elm_select$Select$menuItemId, data.e.r, data.e.w),
				config);
		} else {
			return config;
		}
	};
	var preventDefault = function (msg) {
		if (msg.$ === 13) {
			return _Utils_Tuple2(msg, false);
		} else {
			return _Utils_Tuple2(msg, true);
		}
	};
	var enterKeydownDecoder = function () {
		var _v2 = data.eP;
		if (!_v2.$) {
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
			$Confidenceman02$elm_select$Select$CustomVariant(data.a),
			data.b,
			data.D,
			data.e));
	var tabKeydownDecoder = function (decoders) {
		var _v1 = data.a;
		if (_v1.$ === 2) {
			return A2(
				$elm$core$List$cons,
				$Confidenceman02$elm_select$Select$Events$isTab(
					$Confidenceman02$elm_select$Select$OnMenuInputTabbed(clearButtonVisible)),
				decoders);
		} else {
			return decoders;
		}
	};
	var _v0 = data.e.r;
	var selectId = _v0;
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
													$Confidenceman02$elm_select$Select$CustomVariant(data.a)),
												A2(
													$Confidenceman02$elm_select$Select$SelectInput$onBlurMsg,
													$Confidenceman02$elm_select$Select$OnInputBlurred(
														$Confidenceman02$elm_select$Select$CustomVariant(data.a)),
													A2($Confidenceman02$elm_select$Select$SelectInput$onInput, $Confidenceman02$elm_select$Select$InputChanged, $Confidenceman02$elm_select$Select$SelectInput$default)))))))))))),
		selectId);
};
var $Confidenceman02$elm_select$Select$viewCustomControl = function (data) {
	var menuStyles = $Confidenceman02$elm_select$Select$Styles$getMenuConfig(data.k);
	var _v0 = data.e;
	var state_ = _v0;
	var buildInput = (!data.b) ? (data.C ? A2(
		$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
		$Confidenceman02$elm_select$Select$viewSelectInput,
		A8($Confidenceman02$elm_select$Select$ViewSelectInputData, data.eA, data.fh, data.a, data.I, data.O, data.b, data.D, state_)) : A2(
		$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
		$Confidenceman02$elm_select$Select$viewDummyInput,
		$Confidenceman02$elm_select$Select$ViewDummyInputData(
			$Confidenceman02$elm_select$Select$getSelectId(data.e))(data.a)(data.eA)(data.fh)(state_.v)(data.I)(data.O)(data.b)(data.D)(state_))) : $rtfeldman$elm_css$Html$Styled$text('');
	var buildVariantInput = function () {
		var _v1 = data.a;
		switch (_v1.$) {
			case 1:
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
										A5($rtfeldman$elm_css$Html$Styled$Lazy$lazy4, $Confidenceman02$elm_select$Select$viewMultiValue, state_.f, data.t, ix, i));
								}),
							multiSelectedValues),
						_List_fromArray(
							[
								_Utils_Tuple2('built-input', buildInput)
							])));
			case 0:
				return buildInput;
			default:
				return buildInput;
		}
	}();
	var resolvePlaceholder = $Confidenceman02$elm_select$Select$buildPlaceholder(
		A4($Confidenceman02$elm_select$Select$BuildPlaceholderData, data.a, state_, data.t, data.N));
	return A2(
		$Confidenceman02$elm_select$Select$viewControlWrapper,
		A6($Confidenceman02$elm_select$Select$ViewControlWrapperData, data.b, data.e, data.t, menuStyles, data.a, data.C),
		_List_fromArray(
			[
				A2(
				$Confidenceman02$elm_select$Select$viewInputWrapper,
				data.b,
				_List_fromArray(
					[buildVariantInput, resolvePlaceholder])),
				$Confidenceman02$elm_select$Select$viewIndicatorWrapper(
				_List_fromArray(
					[
						$Confidenceman02$elm_select$Select$viewClearIndicator(
						A5(
							$Confidenceman02$elm_select$Select$ViewClearIndicatorData,
							data.b,
							data.D,
							$Confidenceman02$elm_select$Select$CustomVariant(data.a),
							data.e,
							data.k)),
						$Confidenceman02$elm_select$Select$viewLoadingSpinner(
						A2(
							$Confidenceman02$elm_select$Select$ViewLoadingSpinnerData,
							data.gj,
							$Confidenceman02$elm_select$Select$Styles$getControlLoadingIndicatorColor(data.t))),
						$Confidenceman02$elm_select$Select$indicatorSeparator(data.t),
						$Confidenceman02$elm_select$Select$viewDropdownIndicator(
						A2($Confidenceman02$elm_select$Select$ViewDropdownIndicatorData, data.b, data.t))
					]))
			]));
};
var $Confidenceman02$elm_select$Select$Styles$getMenuMaxHeight = function (_v0) {
	var config = _v0;
	var _v1 = config.cF;
	if (!_v1.$) {
		var u = _v1.a;
		return u.g4;
	} else {
		var u = _v1.a;
		return u.g4;
	}
};
var $Confidenceman02$elm_select$Select$Styles$getMenuBorderWidth = function (_v0) {
	var config = _v0;
	return config.c8;
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
		var _v0 = data.a;
		if (_v0.$ === 2) {
			return _List_Nil;
		} else {
			return _Utils_ap(
				$Confidenceman02$elm_select$Select$menuWrapperStyles(data.ao),
				$Confidenceman02$elm_select$Select$menuListStyles(data.ao));
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
				$rtfeldman$elm_css$Html$Styled$text(data.gl)
			]));
};
var $Confidenceman02$elm_select$Select$BuildMenuItemData = F8(
	function (menuItemStyles, selectId, variant, initialAction, activeTargetIndex, menuNavigation, disabled, controlUiFocused) {
		return {w: activeTargetIndex, l: controlUiFocused, b: disabled, f: initialAction, F: menuItemStyles, B: menuNavigation, r: selectId, a: variant};
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
												return {l: controlUiFocused, b: disabled, bW: index, f: initialAction, eM: isClickFocused, dG: itemSelected, eQ: menuItem, eR: menuItemIsTarget, F: menuItemStyles, B: menuNavigation, r: selectId, a: variant};
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
		if (initialAction.$ === 1) {
			var _int = initialAction.a;
			return _Utils_eq(_int, i);
		} else {
			return false;
		}
	});
var $Confidenceman02$elm_select$Select$isSelected = F2(
	function (menuItem, maybeSelectedItem) {
		if (!maybeSelectedItem.$) {
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
	return {$: 26, a: a};
};
var $Confidenceman02$elm_select$Select$MenuItemClickFocus = function (a) {
	return {$: 16, a: a};
};
var $Confidenceman02$elm_select$Select$SelectedItem = function (a) {
	return {$: 4, a: a};
};
var $Confidenceman02$elm_select$Select$SelectedItemMulti = function (a) {
	return {$: 5, a: a};
};
var $dzuk_mutant$elm_html_styled_aria$Html$Styled$Attributes$Aria$ariaSelected = $rtfeldman$elm_css$Html$Styled$Attributes$attribute('aria-selected');
var $rtfeldman$elm_css$Html$Styled$li = $rtfeldman$elm_css$Html$Styled$node('li');
var $rtfeldman$elm_css$Css$block = {E: 0, g4: 'block'};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorClicked = function (_v0) {
	var config = _v0;
	return config.c3;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorNotSelected = function (_v0) {
	var config = _v0;
	return config.c4;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorSelected = function (_v0) {
	var config = _v0;
	return config.c5;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBlockPadding = function (_v0) {
	var config = _v0;
	return config.c6;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemBorderRadius = function (_v0) {
	var config = _v0;
	return config.P;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemColor = function (_v0) {
	var config = _v0;
	return config.Q;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverNotSelected = function (_v0) {
	var config = _v0;
	return config.dj;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverSelected = function (_v0) {
	var config = _v0;
	return config.dk;
};
var $Confidenceman02$elm_select$Select$Styles$getMenuItemInlinePadding = function (_v0) {
	var config = _v0;
	return config.dC;
};
var $Confidenceman02$elm_select$Select$menuItemContainerStyles = function (data) {
	var withTargetStyles = function () {
		var _v0 = data.l;
		if (!_v0.$) {
			return (data.eR && (!data.dG)) ? _List_fromArray(
				[
					$rtfeldman$elm_css$Css$color(
					$Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverNotSelected(data.F)),
					$rtfeldman$elm_css$Css$backgroundColor(
					$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorNotSelected(data.F))
				]) : _List_Nil;
		} else {
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$hover(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$color(
							$Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverNotSelected(data.F)),
							$rtfeldman$elm_css$Css$backgroundColor(
							$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorNotSelected(data.F))
						]))
				]);
		}
	}();
	var withIsSelectedStyles = data.dG ? _List_fromArray(
		[
			$rtfeldman$elm_css$Css$backgroundColor(
			$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorSelected(data.F)),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$color(
					$Confidenceman02$elm_select$Select$Styles$getMenuItemColorHoverSelected(data.F))
				]))
		]) : _List_Nil;
	var withIsClickedStyles = data.eM ? _List_fromArray(
		[
			$rtfeldman$elm_css$Css$backgroundColor(
			$Confidenceman02$elm_select$Select$Styles$getMenuItemBackgroundColorClicked(data.F))
		]) : _List_Nil;
	var allStyles = data.b ? _List_fromArray(
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
				$Confidenceman02$elm_select$Select$Styles$getMenuItemBorderRadius(data.F))),
			A2(
			$rtfeldman$elm_css$Css$padding2,
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuItemBlockPadding(data.F)),
			$rtfeldman$elm_css$Css$px(
				$Confidenceman02$elm_select$Select$Styles$getMenuItemInlinePadding(data.F))),
			$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$none),
			$rtfeldman$elm_css$Css$color(
			$Confidenceman02$elm_select$Select$Styles$getMenuItemColor(data.F)),
			$rtfeldman$elm_css$Css$batch(allStyles)
		]);
};
var $Confidenceman02$elm_select$Select$viewMenuItem = F2(
	function (data, content) {
		var resolveSelectedAriaAttribs = data.dG ? _List_fromArray(
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
				$elm$core$String$fromInt(data.bW + 1))
			]);
		var resolveMouseover = function () {
			var _v2 = data.l;
			if (!_v2.$) {
				return _List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$Events$on,
						'mouseover',
						$elm$json$Json$Decode$succeed(
							$Confidenceman02$elm_select$Select$HoverFocused(data.bW)))
					]);
			} else {
				return _List_Nil;
			}
		}();
		var resolveMouseUpMsg = function () {
			var _v1 = data.a;
			if (_v1.$ === 1) {
				return $Confidenceman02$elm_select$Select$SelectedItemMulti(
					$Confidenceman02$elm_select$Select$unwrapItem(data.eQ));
			} else {
				return $Confidenceman02$elm_select$Select$SelectedItem(
					$Confidenceman02$elm_select$Select$unwrapItem(data.eQ));
			}
		}();
		var resolveMouseUp = function () {
			var _v0 = data.f;
			if (_v0.$ === 1) {
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
		var resolveMouseLeave = data.eM ? _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$Events$on,
				'mouseleave',
				$elm$json$Json$Decode$succeed($Confidenceman02$elm_select$Select$ClearFocusedItem))
			]) : _List_Nil;
		var resolveDataTestId = data.eR ? _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$Attributes$attribute,
				'data-test-id',
				'listBoxItemTargetFocus' + $elm$core$String$fromInt(data.bW))
			]) : _List_Nil;
		var allEvents = data.b ? _List_Nil : A2(
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
						$Confidenceman02$elm_select$Select$MenuItemClickFocus(data.bW)))),
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
						A2($Confidenceman02$elm_select$Select$menuItemId, data.r, data.bW)),
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
				var _v2 = data.a;
				switch (_v2.$) {
					case 0:
						var maybeItem = _v2.a;
						return maybeItem;
					case 2:
						var maybeItem = _v2.a;
						return maybeItem;
					default:
						return $elm$core$Maybe$Nothing;
				}
			}());
		var maybeIndividualStyles = function () {
			if (!item.$) {
				var cfg = item.a;
				return cfg.k;
			} else {
				var cfg = item.a;
				return cfg.k;
			}
		}();
		if (!item.$) {
			return _Utils_Tuple2(
				$Confidenceman02$elm_select$Select$getMenuItemLabel(item),
				A3(
					$rtfeldman$elm_css$Html$Styled$Lazy$lazy2,
					$Confidenceman02$elm_select$Select$viewMenuItem,
					$Confidenceman02$elm_select$Select$ViewMenuItemData(idx)(resolveIsSelected)(
						A2($Confidenceman02$elm_select$Select$isMenuItemClickFocused, data.f, idx))(
						A2($Confidenceman02$elm_select$Select$isTarget, data.w, idx))(data.r)(item)(data.B)(data.f)(data.a)(
						A2($elm$core$Maybe$withDefault, data.F, maybeIndividualStyles))(data.b)(data.l),
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
						A2($Confidenceman02$elm_select$Select$isMenuItemClickFocused, data.f, idx))(
						A2($Confidenceman02$elm_select$Select$isTarget, data.w, idx))(data.r)(item)(data.B)(data.f)(data.a)(
						A2($elm$core$Maybe$withDefault, data.F, maybeIndividualStyles))(data.b)(data.l),
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$map, $elm$core$Basics$never, ci.jL)
						])));
		}
	});
var $Confidenceman02$elm_select$Select$getGroup = function (mi) {
	if (!mi.$) {
		var cfg = mi.a;
		return cfg.bU;
	} else {
		var cfg = mi.a;
		return cfg.bU;
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_v4.$ === -1) {
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
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_v7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $Confidenceman02$elm_select$Select$sortMenuItemsHelp = function () {
	var updateGroupedItem = F3(
		function (g, mi, maybeItems) {
			if (!maybeItems.$) {
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
						if (!_v1.$) {
							var g = _v1.a;
							return A2(
								$elm$core$Tuple$mapSecond,
								A2(
									$elm$core$Dict$update,
									g.ah,
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
						if (!_v2.$) {
							var g = _v2.a;
							var $temp$idx = idx + 1,
								$temp$items = rest,
								$temp$accum = A2(
								$elm$core$Tuple$mapSecond,
								A2(
									$elm$core$Dict$update,
									g.ah,
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
var $rtfeldman$elm_css$Css$EmUnits = 0;
var $rtfeldman$elm_css$Css$em = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'em');
var $Confidenceman02$elm_select$Select$Styles$getGroupColor = function (_v0) {
	var config = _v0;
	return config.Q;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupFontSizeLabel = function (_v0) {
	var config = _v0;
	return config.dt;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupFontWeightLabel = function (_v0) {
	var config = _v0;
	return config.du;
};
var $Confidenceman02$elm_select$Select$Styles$getGroupTextTransformationLabel = function (_v0) {
	var config = _v0;
	return config.ed;
};
var $rtfeldman$elm_css$Css$paddingRight = $rtfeldman$elm_css$Css$prop1('padding-right');
var $Confidenceman02$elm_select$Select$viewSectionLabel = F2(
	function (styles, g) {
		return _Utils_Tuple2(
			g.ah,
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
						var _v0 = g.jL;
						if (!_v0.$) {
							var v = _v0.a;
							return A2($rtfeldman$elm_css$Html$Styled$map, $elm$core$Basics$never, v);
						} else {
							return $rtfeldman$elm_css$Html$Styled$text(g.ah);
						}
					}()
					])));
	});
var $Confidenceman02$elm_select$Select$viewMenuItems = function (data) {
	var builder = $Confidenceman02$elm_select$Select$buildMenuItem(
		A8($Confidenceman02$elm_select$Select$BuildMenuItemData, data.F, data.r, data.a, data.f, data.w, data.B, data.b, data.l));
	var buildGroupedViews = F2(
		function (_v2, _v4) {
			var _v3 = _v2.b;
			var v = _v3.a;
			var g = _v3.b;
			var idx = _v4.a;
			var acc = _v4.b;
			var resolveGroupStyles = function () {
				var _v1 = g.k;
				if (!_v1.$) {
					var styles = _v1.a;
					return styles;
				} else {
					return data.dO;
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
		data.ek,
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
	return {$: 17, a: a};
};
var $Confidenceman02$elm_select$Select$SetMouseMenuNavigation = {$: 21};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $Confidenceman02$elm_select$Select$viewMenuItemsWrapper = function (data) {
	var resolveStyles = function () {
		var _v0 = data.a;
		if (_v0.$ === 2) {
			return $Confidenceman02$elm_select$Select$menuListStyles(data.ao);
		} else {
			return _Utils_ap(
				$Confidenceman02$elm_select$Select$menuWrapperStyles(data.ao),
				$Confidenceman02$elm_select$Select$menuListStyles(data.ao));
		}
	}();
	var resolveAttributes = (!data.B) ? _List_fromArray(
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
					$Confidenceman02$elm_select$Select$menuListId(data.r)),
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
							return {go: msg, gE: true, gW: true};
						},
						$elm$json$Json$Decode$succeed($Confidenceman02$elm_select$Select$DoNothing)))
				]),
			resolveAttributes));
};
var $Confidenceman02$elm_select$Select$viewMenu = function (data) {
	return A2(
		$Confidenceman02$elm_select$Select$viewMenuItemsWrapper,
		A4($Confidenceman02$elm_select$Select$ViewMenuItemsWrapperData, data.a, data.ao, data.B, data.r),
		$Confidenceman02$elm_select$Select$viewMenuItems(
			$Confidenceman02$elm_select$Select$ViewMenuItemsData(data.F)(data.dO)(data.r)(data.a)(data.f)(data.w)(data.B)(data.ek)(data.b)(data.l)));
};
var $Confidenceman02$elm_select$Select$InputChangedNativeMulti = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $Confidenceman02$elm_select$Select$InputChangedNativeSingle = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $Confidenceman02$elm_select$Select$NativeVariant = function (a) {
	return {$: 1, a: a};
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
		var _v12 = data.a;
		if (!_v12.$) {
			var maybeSelectedItem = _v12.a;
			if (!maybeSelectedItem.$) {
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
							$rtfeldman$elm_css$Html$Styled$text('(' + (data.N + ')'))
						]));
			}
		} else {
			return $rtfeldman$elm_css$Html$Styled$text('');
		}
	}();
	var withLabelledBy = function () {
		var _v11 = data.I;
		if (!_v11.$) {
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
		var _v10 = data.O;
		if (!_v10.$) {
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
		var _v9 = data.a;
		if (!_v9.$) {
			return 'nativeSingleSelect';
		} else {
			return 'nativeMultiSelect';
		}
	}();
	var resolveName = function () {
		var _v8 = data.ah;
		if (!_v8.$) {
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
		var _v7 = data.a;
		if (_v7.$ === 1) {
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$multiple(true)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var buildList = function (menuItem) {
		var _v6 = data.a;
		if (!_v6.$) {
			if (!_v6.a.$) {
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
								A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'label', g.ah)
							]),
						A2($elm$core$List$map, buildList, v))
					]));
		});
	var _v0 = data.r;
	var selectId = _v0;
	var _v1 = A3(
		$Confidenceman02$elm_select$Select$sortMenuItemsHelp,
		0,
		data.an,
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
		var _v2 = data.a;
		if (!_v2.$) {
			if (!_v2.a.$) {
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
					$rtfeldman$elm_css$Html$Styled$Attributes$disabled(data.b),
					resolveOnInputMsg,
					$rtfeldman$elm_css$Html$Styled$Events$onFocus(
					$Confidenceman02$elm_select$Select$InputReceivedFocused(
						$Confidenceman02$elm_select$Select$NativeVariant(data.a))),
					$rtfeldman$elm_css$Html$Styled$Events$onBlur(
					$Confidenceman02$elm_select$Select$OnInputBlurred(
						$Confidenceman02$elm_select$Select$NativeVariant(data.a))),
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$pct(100)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(
								$Confidenceman02$elm_select$Select$Styles$getControlMinHeight(data.t))),
							$Confidenceman02$elm_select$Select$controlRadius(
							$Confidenceman02$elm_select$Select$Styles$getControlBorderRadius(data.t)),
							$rtfeldman$elm_css$Css$backgroundColor(
							$Confidenceman02$elm_select$Select$Styles$getControlBackgroundColor(data.t)),
							$Confidenceman02$elm_select$Select$controlBorder(
							$Confidenceman02$elm_select$Select$Styles$getControlBorderColor(data.t)),
							data.b ? $Confidenceman02$elm_select$Select$controlDisabled(
							$Confidenceman02$elm_select$Select$Styles$getControlDisabledOpacity(data.t)) : $Confidenceman02$elm_select$Select$controlHover(
							A2(
								$Confidenceman02$elm_select$Select$ControlHoverData,
								$Confidenceman02$elm_select$Select$Styles$getControlBackgroundColorHover(data.t),
								$Confidenceman02$elm_select$Select$Styles$getControlBorderColor(data.t))),
							A2(
							$rtfeldman$elm_css$Css$padding2,
							$rtfeldman$elm_css$Css$px(2),
							$rtfeldman$elm_css$Css$px(8)),
							A2($rtfeldman$elm_css$Css$property, 'appearance', 'none'),
							A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none'),
							$rtfeldman$elm_css$Css$color(
							$Confidenceman02$elm_select$Select$Styles$getControlColor(data.t)),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(16)),
							$rtfeldman$elm_css$Css$focus(
							_List_fromArray(
								[
									$Confidenceman02$elm_select$Select$controlBorderFocused(
									$Confidenceman02$elm_select$Select$Styles$getControlBorderColorFocus(data.t)),
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
						$rtfeldman$elm_css$Css$rem(0.5).g4),
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
				var _v0 = data.a;
				if (_v0.$ === 2) {
					return _List_Nil;
				} else {
					return $Confidenceman02$elm_select$Select$containerClickedMsg(
						A4($Confidenceman02$elm_select$Select$ContainerClickedMsgData, data.b, data.e, data.a, data.C));
				}
			}()));
};
var $Confidenceman02$elm_select$Select$view = function (_v0) {
	var config = _v0;
	var menuStyles = $Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k);
	var ctrlStyles = $Confidenceman02$elm_select$Select$Styles$getControlConfig(config.k);
	var _v1 = config.e;
	var state_ = _v1;
	var selectId = state_.r;
	var viewableMenuItems = $Confidenceman02$elm_select$Select$filterViewableMenuItems(
		A4($Confidenceman02$elm_select$Select$BuildViewableMenuItemsData, config.C, state_.z, config.an, config.a));
	var totalMenuItemsCount = $elm$core$List$length(viewableMenuItems);
	var _v2 = config.a;
	if (_v2.$ === 1) {
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
					A9($Confidenceman02$elm_select$Select$ViewNativeData, ctrlStyles, variant, config.an, selectId, config.I, config.O, config.N, config.b, config.ah)),
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
									A5($Confidenceman02$elm_select$Select$ViewClearIndicatorData, config.b, config.D, config.a, config.e, config.k)),
									$Confidenceman02$elm_select$Select$viewLoadingSpinner(
									A2(
										$Confidenceman02$elm_select$Select$ViewLoadingSpinnerData,
										config.aw,
										$Confidenceman02$elm_select$Select$Styles$getControlLoadingIndicatorColor(ctrlStyles))),
									$Confidenceman02$elm_select$Select$indicatorSeparator(ctrlStyles),
									$Confidenceman02$elm_select$Select$viewDropdownIndicator(
									A2($Confidenceman02$elm_select$Select$ViewDropdownIndicatorData, false, ctrlStyles))
								]))
						]))
				]));
	} else {
		if (_v2.a.$ === 2) {
			var singleVariant = _v2.a;
			return A2(
				$Confidenceman02$elm_select$Select$Internal$viewIf,
				state_.v,
				A2(
					$Confidenceman02$elm_select$Select$viewWrapper,
					A4($Confidenceman02$elm_select$Select$ViewWrapperData, state_, config.C, singleVariant, config.b),
					_List_fromArray(
						[
							A3(
							$rtfeldman$elm_css$Html$Styled$Keyed$node,
							'div',
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									$Confidenceman02$elm_select$Select$menuWrapperStyles(
										$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k)))
								]),
							_List_fromArray(
								[
									(!config.C) ? _Utils_Tuple2(
									'dummy-input',
									A2(
										$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
										$Confidenceman02$elm_select$Select$viewDummyInput,
										$Confidenceman02$elm_select$Select$ViewDummyInputData(
											$Confidenceman02$elm_select$Select$getSelectId(config.e))(singleVariant)(
											A2($Confidenceman02$elm_select$Select$enterSelectTargetItem, state_, viewableMenuItems))(totalMenuItemsCount)(state_.v)(config.I)(config.O)(config.b)(config.D)(state_))) : _Utils_Tuple2(
									'controlled-input',
									A2(
										$Confidenceman02$elm_select$Select$viewControlWrapper,
										A6(
											$Confidenceman02$elm_select$Select$ViewControlWrapperData,
											config.b,
											config.e,
											$Confidenceman02$elm_select$Select$Styles$getControlConfig(config.k),
											$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k),
											singleVariant,
											config.C),
										_List_fromArray(
											[
												$Confidenceman02$elm_select$Select$viewSearchIndicator(
												$Confidenceman02$elm_select$Select$Styles$getMenuControlSearchIndicatorColor(menuStyles)),
												A2(
												$Confidenceman02$elm_select$Select$viewInputWrapper,
												config.b,
												_List_fromArray(
													[
														A2(
														$Confidenceman02$elm_select$Select$Internal$viewIf,
														!config.b,
														A2(
															$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
															$Confidenceman02$elm_select$Select$viewSelectInput,
															A8(
																$Confidenceman02$elm_select$Select$ViewSelectInputData,
																A2($Confidenceman02$elm_select$Select$enterSelectTargetItem, state_, viewableMenuItems),
																totalMenuItemsCount,
																singleVariant,
																config.I,
																config.O,
																config.b,
																config.D,
																state_))),
														$Confidenceman02$elm_select$Select$buildPlaceholder(
														A4($Confidenceman02$elm_select$Select$BuildPlaceholderData, singleVariant, state_, ctrlStyles, config.N))
													])),
												$Confidenceman02$elm_select$Select$viewIndicatorWrapper(
												_List_fromArray(
													[
														$Confidenceman02$elm_select$Select$viewClearIndicator(
														A5($Confidenceman02$elm_select$Select$ViewClearIndicatorData, config.b, config.D, config.a, config.e, config.k)),
														$Confidenceman02$elm_select$Select$viewLoadingSpinner(
														A2(
															$Confidenceman02$elm_select$Select$ViewLoadingSpinnerData,
															config.aw,
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
											$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k),
											state_.B,
											selectId),
										(config.aw && $elm$core$List$isEmpty(viewableMenuItems)) ? _List_fromArray(
											[
												_Utils_Tuple2(
												'loading-menu',
												$Confidenceman02$elm_select$Select$viewLoadingMenu(
													A3(
														$Confidenceman02$elm_select$Select$ViewLoadingMenuData,
														singleVariant,
														config.cE,
														$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k))))
											]) : $Confidenceman02$elm_select$Select$viewMenuItems(
											$Confidenceman02$elm_select$Select$ViewMenuItemsData(
												$Confidenceman02$elm_select$Select$Styles$getMenuItemConfig(config.k))(
												$Confidenceman02$elm_select$Select$Styles$getGroupConfig(config.k))(selectId)(singleVariant)(state_.f)(state_.w)(state_.B)(viewableMenuItems)(config.b)(state_.l))))
								]))
						])));
		} else {
			var variant = _v2.a;
			return A2(
				$Confidenceman02$elm_select$Select$viewWrapper,
				A4($Confidenceman02$elm_select$Select$ViewWrapperData, state_, config.C, variant, config.b),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
						$Confidenceman02$elm_select$Select$viewCustomControl,
						$Confidenceman02$elm_select$Select$ViewCustomControlData(config.e)(ctrlStyles)(config.k)(
							A2($Confidenceman02$elm_select$Select$enterSelectTargetItem, state_, viewableMenuItems))(totalMenuItemsCount)(variant)(config.N)(config.b)(config.C)(config.I)(config.O)(config.D)(config.aw)),
						A2(
						$Confidenceman02$elm_select$Select$Internal$viewIf,
						state_.v,
						(config.aw && $elm$core$List$isEmpty(viewableMenuItems)) ? $Confidenceman02$elm_select$Select$viewLoadingMenu(
							A3(
								$Confidenceman02$elm_select$Select$ViewLoadingMenuData,
								variant,
								config.cE,
								$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k))) : A2(
							$rtfeldman$elm_css$Html$Styled$Lazy$lazy,
							$Confidenceman02$elm_select$Select$viewMenu,
							$Confidenceman02$elm_select$Select$ViewMenuData(variant)(selectId)(viewableMenuItems)(state_.f)(state_.w)(state_.B)(
								$Confidenceman02$elm_select$Select$Styles$getMenuConfig(config.k))(
								$Confidenceman02$elm_select$Select$Styles$getMenuItemConfig(config.k))(
								$Confidenceman02$elm_select$Select$Styles$getGroupConfig(config.k))(config.b)(state_.l)))
					]));
		}
	}
};
var $author$project$DisplayIndividualSpecies$view = function (m) {
	var selectedItem = function () {
		var _v0 = m.cM;
		if (!_v0.$) {
			var i = _v0.a;
			return $elm$core$Maybe$Just(
				$Confidenceman02$elm_select$Select$basicMenuItem(
					{ge: i, dI: i}));
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
				$author$project$DisplayIndividualSpecies$SelectSpecies,
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
									m.eN,
									A2(
										$Confidenceman02$elm_select$Select$state,
										m.cL,
										$Confidenceman02$elm_select$Select$single(selectedItem)))))))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$fromUnstyled(
						$author$project$DisplayIndividualSpecies$countyRadio(m))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$fromUnstyled(
						$author$project$DisplayIndividualSpecies$routeDetailCheckbox(m))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$id('vegaViz')
					]),
				_List_Nil)
			]));
};
var $author$project$DisplayIndividualSpecies$main = $elm$browser$Browser$element(
	{
		im: $elm$core$Basics$always(
			_Utils_Tuple2($author$project$DisplayIndividualSpecies$init, $elm$core$Platform$Cmd$none)),
		jn: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		jJ: $author$project$DisplayIndividualSpecies$update($author$project$DisplayIndividualSpecies$vegaPort),
		jL: A2($elm$core$Basics$composeR, $author$project$DisplayIndividualSpecies$view, $rtfeldman$elm_css$Html$Styled$toUnstyled)
	});
_Platform_export({'DisplayIndividualSpecies':{'init':$author$project$DisplayIndividualSpecies$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));