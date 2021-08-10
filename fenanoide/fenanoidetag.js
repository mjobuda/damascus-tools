customElements.define(
  "x-foo-with-markup",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<b>I'm an x-foo-with-markup!</b>
          <div class="lg:max-w-2xl lg:flex-1 lg:-mr-18">
      <div
        class="
          relative
          overflow-hidden
          md:rounded-xl md:rounded-b-none
          xl:rounded-b-xl
          shadow-2xl
          flex
          bg-gray-500
          pb-6
          md:pb-0
        "
      >
        <div class="absolute inset-0 bg-black bg-opacity-75"></div>
        <div class="relative w-full flex flex-col">
          <div class="flex-none h-11 flex items-center px-4">
            <div class="flex space-x-1.5">
              <div class="tab">
                <img
                  class="h-8"
                  src="http://fe.ethereum.org/fe-logo-small.svg"
                  alt="Fe Programming Language"
                />

                <button class="tablinks" onclick="openCity(event, 'London')">
                  London
                </button>
                <button class="tablinks" onclick="openCity(event, 'Paris')">
                  Paris
                </button>
                <button class="tablinks" onclick="openCity(event, 'Tokyo')">
                  Tokyo
                </button>
                <button id="COMPILEBUTTON">COMPILE</button>
              </div>
            </div>
          </div>
          <div
            class="
              relative
              border-t border-white border-opacity-10
              min-h-0
              flex-auto flex flex-col
            "
          >
            <div
              class="
                hidden
                md:block
                absolute
                inset-y-0
                left-0
                bg-black bg-opacity-25
              "
              style="width: 50px"
            ></div>
            <div id="London" class="tabcontent">
              <pre
                id="CODEEDITOR"
                class="relative block text-white overflow-auto"
              ></pre>
            </div>

            <div id="Paris" class="tabcontent">
              <h3>Paris</h3>
              <p>Paris is the capital of France.</p>
            </div>

            <div id="Tokyo" class="tabcontent">
              <h3>Tokyo</h3>
              <p>Tokyo is the capital of Japan.</p>
            </div>

            <script>
              function openCity(evt, cityName) {
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                  tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                  tablinks[i].className = tablinks[i].className.replace(
                    " active",
                    ""
                  );
                }
                document.getElementById(cityName).style.display = "block";
                evt.currentTarget.className += " active";
              }
            </script>
          </div>
        </div>
      </div>
    </div>
   `;
    }
  }
);
