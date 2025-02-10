import BaseSlime from './BaseSlime.js';
import MagmaSlime from './MagmaSlime.js';
import SkullSlime from './SkullSlime.js';

export function getWaveEnemies(waveNumber, scene) {
    const enemies = [];
    const baseSlimeCount = Math.min(waveNumber, 5 - waveNumber > 0 ? 5 - waveNumber : 0);
    const magmaSlimeCount = Math.min(waveNumber - 2, 10 - waveNumber > 0 ? 10 - waveNumber : 0);
    const skullSlimeCount = Math.max(0, waveNumber - 5);
    const additionalHP = Math.floor(waveNumber / 2) * 5;

    for (let i = 0; i < baseSlimeCount; i++) {
        const baseSlime = new BaseSlime(scene, scene.tiles);
        baseSlime.hp += additionalHP;
        enemies.push(baseSlime);
    }
    for (let i = 0; i < magmaSlimeCount; i++) {
        const magmaSlime = new MagmaSlime(scene, scene.tiles);
        magmaSlime.hp += additionalHP;
        enemies.push(magmaSlime);
    }
    for (let i = 0; i < skullSlimeCount; i++) {
        const skullSlime = new SkullSlime(scene, scene.tiles);
        skullSlime.hp += additionalHP;
        enemies.push(skullSlime);
    }

    return enemies.sort((a, b) => b.damage - a.damage);
}
