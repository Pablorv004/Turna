import BaseSlime from './BaseSlime.js';
import MagmaSlime from './MagmaSlime.js';
import SkullSlime from './SkullSlime.js';

export function getWaveEnemies(waveNumber, scene, difficulty) {
    const enemies = [];
    let baseSlimeCount, magmaSlimeCount, skullSlimeCount;

    switch (difficulty) {
        case 'easy':
            baseSlimeCount = Math.min(waveNumber, 5 - waveNumber > 0 ? 5 - waveNumber : 0);
            magmaSlimeCount = Math.min(waveNumber - 4, 10);
            skullSlimeCount = Math.max(0, waveNumber - 7);
            break;
        case 'hard':
            baseSlimeCount = Math.min(waveNumber + 1, 5 - waveNumber > 0 ? 5 - waveNumber : 0);
            magmaSlimeCount = Math.min(waveNumber - 1, 10);
            skullSlimeCount = Math.max(0, waveNumber - 3);
            break;
        default:
            baseSlimeCount = Math.min(waveNumber, 5 - waveNumber > 0 ? 5 - waveNumber : 0);
            magmaSlimeCount = Math.min(waveNumber - 2, 10);
            skullSlimeCount = Math.max(0, waveNumber - 5);
            break;
    }

    const additionalHP = Math.floor(waveNumber / 2) * 2;

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

    return enemies;
}
