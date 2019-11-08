import { render, html } from 'lit-html';
import styles from './Components.css';
import './CheckBox.js';

export class ViewerControls extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const viewer = document.querySelector('source-map-viewer');
        this.initialize(viewer);
        this.render();
    }

    initialize(viewer) {
        this.viewer = viewer;

        const scene = this.viewer.scene;

        let lastchange = null;

        const update = () => {
            if(scene.lastchange != lastchange) {
                lastchange = scene.lastchange;
    
                this.render();
            }

            requestAnimationFrame(update);
        }

        update();
    }

    render() {
        const renderer = this.viewer.renderer;
        const layers = [...this.viewer.scene.objects] || [];

        const template = html`
            <style>${styles}</style>
            <div class="options">
                <div class="meta">
                    <div class="row">
                        <span>Show Grid</span>
                        <check-box ?checked=${renderer.showGrid} @change=${(e) => { renderer.showGrid = e.target.checked; }} 
                                    icon="visibility_off" active-icon="visibility"></check-box>
                    </div>
                </div>
                <div class="layers">
                    ${layers.map(layer => {
                        const visChangeHandler = e => {
                            layer.hidden = !e.target.checked;
                        }
                        const guideChangeHandler = e => {
                            layer.guide = !e.target.checked;
                            console.log(layer);
                        }
                        return html`
                            <div class="layer row">
                                <span class="title">${layer.constructor.name}</span>
                                <div class="buttons">
                                    <check-box ?checked=${!layer.hidden} @change=${visChangeHandler} 
                                        icon="visibility_off" active-icon="visibility"></check-box>
                                    <check-box ?checked=${!layer.guide} @change=${guideChangeHandler} 
                                        icon="info" active-icon="info"></check-box>
                                </div>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
        render(template, this.shadowRoot);
    }

}

customElements.define('viewer-controls', ViewerControls);
