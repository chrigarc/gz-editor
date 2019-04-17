import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import 'fontawesome-icon/fontawesome-icon';
import '@fooloomanzoo/color-picker/color-element';

/**
 * `gz-editor`
 * editor wysiwyg build with polymer 3
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GzEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-size: 1.1rem;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        
        .toolbar{
            display:grid;
            grid-template-columns: repeat(auto-fit,minmax(20px,40px));
            background-color: rgb(231, 231, 231);
            color: rgb(0, 0, 0);
            grid-gap: 1rem;
            padding: 1rem;
            justify-content: center;
            align-items:center;
        }
        
        .tool-items{
            background-color: rgb(27, 26, 26);
             padding-top: .6rem;
             padding-bottom:.6rem;
            cursor: pointer;
            color: #ffff;
        }
        
        .tool-items:hover{
            box-shadow: none;
            background-color: #6b5e5e;
        
        }
                                
        .center{
             display: flex;
             justify-content: center;
             flex-wrap: wrap;
        }        
        
        .editor{
            width:70vw;
            height: 50vh;
            margin: 2rem;
            padding: 1rem;
            font-size: 1.2rem;
            box-shadow: 0 .1rem .4rem black;
            border: 1px solid black;
            overflow-y: auto;
        }
        
        .getcontent{
            white-space: pre;
            width: 80vw;
            background-color: rgb(255, 255, 255);
            overflow: auto;
            padding: 1rem;
            display: none;
            margin-top: 1rem;
            box-shadow: .1rem .1rem .5rem rgb(255, 255, 255);
            border: 1px solid rgb(0, 0, 0);
        }
                        
        .btn{
              padding: .5rem;
              background-color: #7e1111;
              margin-right: 1rem;
              color: #fffffc;
              letter-spacing: .1rem;
              font-size: 1rem;
              border-radius: .2rem;
              cursor: pointer;
              outline: none;
              box-shadow: 0 .4rem .4rem black;
              transition: all .3s;
        }
        
        .btn:hover{
              background-color: #7e1111d0;
              box-shadow: 0 .1rem .1rem black;
        }
                                        
        label {
            margin-left: 0.04rem;
            padding-left:.7rem
        }
        button{
            border: none;
        }
        
      </style>
      <div class="toolbar">  
        <button class="tool-items"  onclick="document.execCommand('underline', false, '');">
            <fontawesome-icon prefix="fas" name="underline" fixed-width></fontawesome-icon>
        </button>    
        <button class="tool-items" onclick="document.execCommand('italic', false, '');">
            <fontawesome-icon prefix="fas" name="italic" fixed-width></fontawesome-icon>
        </button>        
        <button class="tool-items" onclick="document.execCommand('bold', false, '');">
            <fontawesome-icon prefix="fas" name="bold" fixed-width></fontawesome-icon>
        </button>    
        <button class="tool-items" onclick="document.execCommand('strikeThrough',false,'')">
            <fontawesome-icon prefix="fas" name="strikethrough" fixed-width></fontawesome-icon>
        </button>       
        
        <button class="tool-items" onclick="document.execCommand('undo',false,'')">
            <fontawesome-icon prefix="fas" name="undo" fixed-width></fontawesome-icon>
        </button>    
        <button class="tool-items" onclick="document.execCommand('redo',false,'')">
            <fontawesome-icon prefix="fas" name="redo" fixed-width></fontawesome-icon>
        </button>            
        
        <button class="tool-items" on-click="link">
            <fontawesome-icon prefix="fas" name="link" fixed-width></fontawesome-icon>
        </button>            
        
        <input class="tool-items" type="file" accept="image/*" id="inputfile" style="display: none;" on-change="_getImage">        
        <button for="file" class="tool-items" on-click="_handleImageClick">
            <fontawesome-icon prefix="fas" name="file-image" fixed-width></fontawesome-icon>
        </button>                                                                  

        <!-- Jutify -->           
        <button class="tool-items" onclick="document.execCommand('justifyLeft',false,'')">
            <fontawesome-icon prefix="fas" name="align-left" fixed-width></fontawesome-icon>
        </button>
        <button class="tool-items" onclick="document.execCommand('justifyCenter',false,'')">
            <fontawesome-icon prefix="fas" name="align-center" fixed-width></fontawesome-icon>
        </button>    
        <button class="tool-items" onclick="document.execCommand('justifyRight',false,'')">
             <fontawesome-icon prefix="fas" name="align-right" fixed-width></fontawesome-icon>
        </button>
      </div>
  
      <div class="center">
        <div id="editorcontent" class="editor" contenteditable>
          <h1>Simple Html editor</h1>
          <p>Good to start</p>
        </div>
      </div>                
    `;
  }
  static get properties() {
    return {

    };
  }

  link() {
    var url = prompt("Enter the URL");
    document.execCommand("createLink", false, url);
  }

  _getImage() {
    const file = this.$.inputfile.files[0];
    const reader = new FileReader();
    let dataURI;
    reader.addEventListener(
        "load",
        () => {
          dataURI = reader.result;
          const img = document.createElement("img");
          img.src = dataURI;
          this.$.editorcontent.appendChild(img);
        },
        false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  _handleImageClick(){
    this.$.inputfile.click();
  }

  getHTML(){
    return this.$.editorcontent.innerHTML.trim();
  }

  getContent(){
    return this.$.editorcontent.textContent.trim();
  }
}

window.customElements.define('gz-editor', GzEditor);
