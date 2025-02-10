import BaseSlime from './BaseSlime.js';
import MagmaSlime from './MagmaSlime.js';
import SkullSlime from './SkullSlime.js';

export function getWaveEnemies(waveNumber, scene) {
    const enemies = [];
    const baseSlimeCount = Math.min(waveNumber, 5 - waveNumber > 0 ? 5 - waveNumber : 0);
    const magmaSlimeCount = Math.min(waveNumber - 2, 10 - waveNumber > 0 ? 10 - waveNumber : 0);
    const skullSlimeCount = Math.max(0, waveNumber - 5);

    for (let i = 0; i < baseSlimeCount; i++) {
        enemies.push(new BaseSlime(scene, scene.tiles));
    }
    for (let i = 0; i < magmaSlimeCount; i++) {
        enemies.push(new MagmaSlime(scene, scene.tiles));
    }
    for (let i = 0; i < skullSlimeCount; i++) {
        enemies.push(new SkullSlime(scene, scene.tiles));
    }

    return enemies;
}
