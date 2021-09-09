// Transcrypt'ed from Python, 2021-05-31 11:16:54
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'org.reactjs';
export var createElement = React.createElement;
export var createContext = React.createContext;
export var forwardRef = React.forwardRef;
var __left0__ = React.Component;
export var Component = __left0__;
export var ReactComponent = __left0__;
export var useState = React.useState;
export var useEffect = React.useEffect;
export var useContext = React.useContext;
export var useReducer = React.useReducer;
export var useCallback = React.useCallback;
export var useMemo = React.useMemo;
export var useRef = React.useRef;
export var useImperativeHandle = React.useImperativeHandle;
export var useLayoutEffect = React.useLayoutEffect;
export var useDebugValue = React.useDebugValue;
export var withDeps = function () {
	var deps = tuple ([].slice.apply (arguments).slice (0));
	var useHook = this;
	var decorator = function (fn) {
		useHook (fn, deps);
		return fn;
	};
	return decorator;
};
useEffect.withDeps = withDeps;
useLayoutEffect.withDeps = withDeps;
export var useCallbackWithDeps = function () {
	var deps = tuple ([].slice.apply (arguments).slice (0));
	var decorator = function (fn) {
		return React.useCallback (fn, deps);
	};
	return decorator;
};
useCallback.withDeps = useCallbackWithDeps;

//# sourceMappingURL=org.reactjs.map