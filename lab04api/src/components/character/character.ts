// src/components/Character/Character.ts
import styles from "./Character.css";

export enum Attribute {
    "image" = "image",
    "name" = "name",
    "status" = "status",
    "species" = "species",
    "type" = "type",
    "origin" = "origin",
    "episode" = "episode",
}

class CharacterData extends HTMLElement {
    image?: string;
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    origin?: string;
    episode?: string;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(
        propName: Attribute,
        oldValue: string | undefined,
        newValue: string | undefined
    ) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <article class="card">
                    <img class="card__image" src='${this.image}' alt='Character Image'/>
                    <div class="card__info">
                        <h2 class="card__name">${this.name}</h2>
                        <p class="card__status"><span>Status:</span> ${this.status}</p>
                        <p class="card__species"><span>Species:</span> ${this.species}</p>
                        <p class="card__type"><span>Type:</span> ${this.type || "Unknown"}</p>
                        <p class="card__origin"><span>Origin:</span> ${this.origin}</p>
                        <p class="card__episode"><span>First Episode:</span> ${this.episode}</p>
                    </div>
                </article>
            `;
        }
        const cssCard = this.ownerDocument.createElement('style');
        cssCard.innerHTML = styles;
        this.shadowRoot?.appendChild(cssCard);
    }
}

customElements.define("character-data", CharacterData);
export default CharacterData;
