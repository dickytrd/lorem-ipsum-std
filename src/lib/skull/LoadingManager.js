import { LoadingManager } from 'three'

/**
 * Singleton THREE.LoadingManager
 * Dispatches custom window events so any component can listen to progress.
 *
 * Events:
 *   'skull:progress' — { detail: { progress: 0–100 } }
 *   'skull:loaded'   — all assets done
 */
const manager = new LoadingManager()

manager.onProgress = (url, loaded, total) => {
    const progress = Math.round((loaded / total) * 100)
    window.dispatchEvent(new CustomEvent('skull:progress', { detail: { progress } }))
}

manager.onLoad = () => {
    window.dispatchEvent(new CustomEvent('skull:loaded'))
}

manager.onError = (url) => {
    console.warn('[LoadingManager] Failed to load:', url)
    // Still dispatch loaded so the site doesn't get stuck
    window.dispatchEvent(new CustomEvent('skull:loaded'))
}

export default manager
