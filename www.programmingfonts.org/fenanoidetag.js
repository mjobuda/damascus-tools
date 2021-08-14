customElements.define(
  "x-foo-with-markup",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
<!DOCTYPE html>
<!-- <html lang="en"> -->
  <!-- <head> -->
  <!-- <title>Programming Fonts - Test Drive</title> -->
  <!-- <meta -->
    <!-- name="description" -->
    <!-- content="Try out the best and newest monospace fonts for code" -->
  <!-- /> -->
<!--  -->
  <!-- <meta charset="utf-8" /> -->
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1" /> -->
<!--  -->
  <!-- Favicons -->
  <link rel="icon" type="image/png" href="favicon.png" />
  <link rel="mask-icon" href="safari-pinned-tab.svg" color="#ff6a00" />

  <!-- CSS reset -->
  <link
    rel="stylesheet"
    type="text/css"
    href="//cdnjs.cloudflare.com/ajax/libs/minireset.css/0.0.2/minireset.min.css"
  />

  <!-- CodeMirror -->
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.css"
  />
  <!-- CodeMirror Themes -->
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/theme/the-matrix.css"
  />

  <!-- CodeMirror JS -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/addon/edit/matchbrackets.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/addon/selection/active-line.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/ruby/ruby.min.js"></script>

  <!-- input mono -->
  <link
    href="//cloud.webtype.com/css/7e544c5e-55dc-4b41-a8d3-c13f7e0a13d3.css"
    rel="stylesheet"
    type="text/css"
  />

  <link rel="stylesheet" href="fonts/stylesheets/stylesheet.css" />
  <!-- Compiled (using less on node) with "lessc fonts.less > stylesheet.css" -->
  <link rel="stylesheet" href="index.css" />
  <!-- </head> -->

  <!-- <body> -->
    <div class="main-wrapper" style="visibility: hidden; width: 0">
      <main>
        <section class="select-list" tabindex="0">
          <div id="select-font">
            <!-- filled from json -->
          </div>
        </section>
        <section class="config">
          <p>
            <label for="size">Size</label>
            <input
              onchange="setSize()"
              type="number"
              id="size"
              value="16"
              min="1"
              max="32"
              step="1"
            />
          </p>
          <p>
            <label for="spacing">/</label>
            <input
              onchange="setSpacing()"
              type="number"
              id="spacing"
              value="1.4"
              min="1"
              max="2"
              step="0.1"
            />
          </p>
          <p class="select">
            <button class="nav-button" id="theme-previous">↑</button>
            <button class="nav-button" id="theme-next">↓</button>
            <label for="select-theme" class="screenreader-only">Theme</label>
            <select onchange="selectTheme()" id="select-theme">
              <option selected>the-matrix</option>
            </select>
          </p>
          <p class="select">
            <label for="select-language" class="screenreader-only"
              >Language</label
            >
            <select onchange="selectLanguage()" id="select-language">
              <option selected="">Ruby</option>
            </select>
          </p>
        </section>

        <footer>
          <h1>
            <a href="https://programmingfonts.tumblr.com">Programming Fonts</a>
          </h1>
          <p class="subtitle">Test drive all the programming fonts!</p>

          <a class="logo" href="https://programmingfonts.tumblr.com">
            <svg
              alt="tumblr logo"
              width="9px"
              height="15px"
              viewBox="0 0 9 15"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M6.16676166,14 L5.95411471,14 C2.45979282,14 1.69024243,11.4348475 1.70117563,10 L1.70117563,6.52631579 L0.265808692,6.52631579 C0.119006605,6.52631579 -8.8817842e-16,6.40180889 -8.8817842e-16,6.24235454 L-8.8817842e-16,4.21052632 C-8.8817842e-16,4.05367375 0.132891436,3.86896458 0.425293908,3.78947368 C2.15160506,3.16783805 2.72233881,1.60568509 2.7644104,0.421052632 C2.77170098,0.215767854 2.76748611,0.268658642 2.76748611,0.268658642 C2.76578744,0.120282571 2.88319366,0 3.03957914,0 L5.25365206,0 C5.40562356,0 5.5288208,0.119077984 5.5288208,0.280833997 L5.5288208,3.57894737 L8.23113995,3.57894737 C8.38287367,3.57894737 8.50587815,3.70559211 8.50587815,3.85094572 L8.50587815,6.25431743 C8.50587815,6.40453798 8.38221964,6.52631579 8.22828381,6.52631579 L5.25,6.52631579 L5.25,9.57894737 C5.64320148,10.5739331 6.29010788,10.8411532 6.59205557,10.8421053 C7.07296368,10.8320778 7.45037861,10.7172508 7.65529034,10.6315789 C7.77989081,10.587074 7.93265029,10.5783691 8.08058425,10.6315789 C8.2285182,10.6847888 8.27180297,10.7924676 8.2932312,10.8421053 L8.93117206,12.7368421 C9.0447897,13.0325221 8.99818233,13.1033871 8.93117206,13.1578947 C8.35626878,13.6192174 7.17773158,13.9818652 6.16676166,14 Z"
                id="logo"
              ></path>
            </svg>
            <span class="screenreader-only">Tumblr blog</span>
          </a>

          <a class="logo" href="https://github.com/braver/programmingfonts">
            <svg
              alt="github logo"
              class="octicon octicon-mark-github"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            <span class="screenreader-only">Github repo</span>
          </a>
        </footer>
      </main>
    </div>

    <form>
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
    </form>
    < script>
      window.setTimeout(function () {
        window.location.reload();
      }, 3000);
    </script>

    <script src="index.js"></script>
  <!-- </body> -->
<!-- </html> -->
      `;
    }
  }
);
// <script type="module">
// CodeMirror
// var editor = CodeMirror(document.getElementById("CODEEDITOR"), {
// lineNumbers: true,
// styleActiveLine: true,
// matchBrackets: true,
// lineWrapping: true,
// indentUnit: 4,
// lineWrapping: true,
// value: `# The 'contract' keyword defines a new contract type
// contract GuestBook:
// # Strings are generic over a constant number
// # that restricts its maximum size
// messages: Map<address, String<100>>
//
// # Events can be defined on contract or module level
// event Signed:
// book_msg: String<100>
//
// pub def sign(book_msg: String<100>):
// # All storage access is explicit using 'self.<some-key>'
// self.messages[msg.sender] = book_msg
//
// # Emit the 'Signed' event
// emit Signed(book_msg=book_msg)
//
// pub def get_msg(addr: address) -> String<100>:
// # Copying data from storage to memory
// # has to be done explicitly via 'to_mem()'
// return self.messages[addr].to_mem()`,
// mode: "ruby",
// });
// window.editor = editor;
// editor.setSize(null, 550);
// var code_mirror = document.querySelector('.CodeMirror');
//editor.style.fontFamily = "victor-mono, monospace";
// import init, { get_token, compile_to_ast, compile } from "./resources/fejs.js";

// async function run() {
// await init("./resources/fejs_bg.wasm");
// }
//
// function compileEditor() {
// editor = document.getElementById("new-editor");
// const ast = compile_to_ast(editor.getValue());
// console.log(editor.getValue());
// console.log(get_token(editor.getValue()));
// console.log(compile_to_ast(editor.getValue()));
// }
//
// var cButton = document.getElementById("COMPILEBUTTON");
// console.log(cButton);
// cButton.onclick = compileEditor;
// run();
// window.get_token = get_token;
// window.compile_to_ast = compile_to_ast;
// window.compile = compile;
// </script>
