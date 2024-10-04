// src/indexAbuelo.ts

import { getCharacters } from "./services/dataFetch";
import * as components from "./components/indexPadre";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachListeners();
    }

    attachListeners() {
        const button = this.shadowRoot?.querySelector("button");
        const input = this.shadowRoot?.querySelector("input");

        button?.addEventListener("click", async () => {
            const count = input ? parseInt((input as HTMLInputElement).value, 10) : 0;

            if (count > 0) {
                const data = await getCharacters(); 
                this.renderCharacters(data.results.slice(0, count));
            } else {
                alert('Por favor, ingrese un número mayor a 0');
            }
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <h1>Rick and Morty Characters</h1>
                <input type="number" min="1" placeholder="Number of characters" />
                <button>Submit</button>
                <div id="characters-container"></div>
            `;
        }
    }

    renderCharacters(characters: any[]) {
        const container = this.shadowRoot?.querySelector("#characters-container");
        if (container) {
            container.innerHTML = "";
            characters.forEach((character: any) => {
                const characterElement = new components.CharacterData();
                characterElement.setAttribute('image', character.image);
                characterElement.setAttribute('name', character.name);
                characterElement.setAttribute('status', character.status);
                characterElement.setAttribute('species', character.species);
                characterElement.setAttribute('type', character.type || "Unknown");
                characterElement.setAttribute('origin', character.origin.name);
                characterElement.setAttribute('episode', character.episode[0]);
                container.appendChild(characterElement);
            });
        }
    }
}

customElements.define('app-container', AppContainer);
