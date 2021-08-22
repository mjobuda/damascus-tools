customElements.define(
  "fe-nano",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
    <form>
      <label for="code" class="screenreader-only">Code area</label>
      <textarea id="code" name="code" style="">
contract Foo:

    pub def bar(input: u256) -> u256:
        if input > 5:
            return 1
        else:
            return 0
</textarea>
    </form>
    <div id="code-output"></div>
    <script>

    </script>
     `;
    }
  }
);
import init, { get_token, compile_to_ast, compile } from "./fejs.js";
window.onload = (event) => {
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "the-matrix",
    lineWrapping: true,
  });
  window.compile = compile;

  window.editor = editor;
  async function run() {
    await init("./fejs_bg.wasm");
  }

  function compileEditor() {
    console.log(window.editor.getValue());
    console.log(get_token(window.editor.getValue()));
    console.log(compile_to_ast(window.editor.getValue()));
  }

  run();
  window.get_token = get_token;
  window.compile_to_ast = compile_to_ast;
  window.compile = compile;
  window.compileEditor = compileEditor;

  var numPanels = 0;
  var panels = {};

  function makePanel(where) {
    var node = document.createElement("div");
    var id = ++numPanels;
    var widget, close, label;

    node.id = "panel-" + id;
    node.className = "panel " + where;
    // close = node.appendChild(document.createElement("a"));
    close = node.appendChild(document.createElement("button"));
    // close.setAttribute("title", "Remove me!");
    // close.setAttribute("class", "remove-panel");
    close.textContent = "compile";
    CodeMirror.on(close, "mousedown", function (e) {
      e.preventDefault();
      compileEditor();
      // panels[node.id].clear();
    });
    label = node.appendChild(document.createElement("span"));
    // label.textContent = "XYXXX";
    return node;
  }
  function addPanel(where) {
    var node = makePanel(where);
    panels[node.id] = editor.addPanel(node, { position: where, stable: true });
  }

  // addPanel("top");
  addPanel("bottom");
};
