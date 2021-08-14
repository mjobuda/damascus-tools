customElements.define(
  "x-foo-with-markup",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<form>
      <label for="code" class="screenreader-only">Code area</label>
      <textarea id="code" name="code">
contract Foo:

    pub def bar(input: u256) -> u256:
        if input > 5:
            return 1
        else:
            return 0
</textarea
      >
    </form>`;
    }
  }
);
// <script type="module">
// CodeMirror
var editor = CodeMirror(document.getElementById("CODEEDITOR"), {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  lineWrapping: true,
  indentUnit: 4,
  lineWrapping: true,
  value: `# The 'contract' keyword defines a new contract type
      contract GuestBook:
          # Strings are generic over a constant number
          # that restricts its maximum size
          messages: Map<address, String<100>>

          # Events can be defined on contract or module level
          event Signed:
              book_msg: String<100>

          pub def sign(book_msg: String<100>):
              # All storage access is explicit using 'self.<some-key>'
              self.messages[msg.sender] = book_msg

              # Emit the 'Signed' event
              emit Signed(book_msg=book_msg)

          pub def get_msg(addr: address) -> String<100>:
              # Copying data from storage to memory
              # has to be done explicitly via 'to_mem()'
              return self.messages[addr].to_mem()`,
  mode: "ruby",
});
window.editor = editor;
editor.setSize(null, 550);
// var code_mirror = document.querySelector('.CodeMirror');
//editor.style.fontFamily = "victor-mono, monospace";
// import init, { get_token, compile_to_ast, compile } from "./resources/fejs.js";

async function run() {
  await init("./resources/fejs_bg.wasm");
}

function compileEditor() {
  // editor = document.getElementById("new-editor");
  //const ast = compile_to_ast(editor.getValue());
  console.log(editor.getValue());
  console.log(get_token(editor.getValue()));
  console.log(compile_to_ast(editor.getValue()));
}

var cButton = document.getElementById("COMPILEBUTTON");
console.log(cButton);
cButton.onclick = compileEditor;
run();
window.get_token = get_token;
window.compile_to_ast = compile_to_ast;
window.compile = compile;
// </script>
