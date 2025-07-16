import { KeyboardSoundOptions } from './keyboardSound';

/**
 * Predefined keyboard sound configurations
 */

export const RETRO_KEYBOARD_CONFIG: KeyboardSoundOptions = {
  defaultVolume: 0.3,
  globalEnabled: true,
  defaultKeyDownSound: '/sounds/retro-key-down.wav',
  defaultKeyUpSound: '/sounds/retro-key-up.wav',
  keyMappings: {
    // Special keys with different sounds
    'Space': {
      keyDownSound: '/sounds/spacebar-down.wav',
      keyUpSound: '/sounds/spacebar-up.wav',
      volume: 0.4
    },
    'Enter': {
      keyDownSound: '/sounds/enter-down.wav',
      keyUpSound: '/sounds/enter-up.wav',
      volume: 0.5
    },
    'Backspace': {
      keyDownSound: '/sounds/backspace-down.wav',
      keyUpSound: '/sounds/backspace-up.wav',
      volume: 0.4
    },
    'Tab': {
      keyDownSound: '/sounds/tab-down.wav',
      keyUpSound: '/sounds/tab-up.wav',
      volume: 0.3
    },
    'Escape': {
      keyDownSound: '/sounds/escape-down.wav',
      keyUpSound: '/sounds/escape-up.wav',
      volume: 0.6
    },
    'ShiftLeft': {
      keyDownSound: '/sounds/shift-down.wav',
      keyUpSound: '/sounds/shift-up.wav',
      volume: 0.2
    },
    'ShiftRight': {
      keyDownSound: '/sounds/shift-down.wav',
      keyUpSound: '/sounds/shift-up.wav',
      volume: 0.2
    },
    'ControlLeft': {
      keyDownSound: '/sounds/ctrl-down.wav',
      keyUpSound: '/sounds/ctrl-up.wav',
      volume: 0.2
    },
    'ControlRight': {
      keyDownSound: '/sounds/ctrl-down.wav',
      keyUpSound: '/sounds/ctrl-up.wav',
      volume: 0.2
    }
  }
};

export const MECHANICAL_KEYBOARD_CONFIG: KeyboardSoundOptions = {
  defaultVolume: 0.4,
  globalEnabled: true,
  defaultKeyDownSound: '/sounds/mechanical-key-down.wav',
  defaultKeyUpSound: '/sounds/mechanical-key-up.wav',
  keyMappings: {
    'Space': {
      keyDownSound: '/sounds/mechanical-spacebar-down.wav',
      keyUpSound: '/sounds/mechanical-spacebar-up.wav',
      volume: 0.5
    },
    'Enter': {
      keyDownSound: '/sounds/mechanical-enter-down.wav',
      keyUpSound: '/sounds/mechanical-enter-up.wav',
      volume: 0.6
    }
  }
};

export const TYPEWRITER_CONFIG: KeyboardSoundOptions = {
  defaultVolume: 0.6,
  globalEnabled: true,
  defaultKeyDownSound: '/sounds/typewriter-key-down.wav',
  defaultKeyUpSound: '/sounds/typewriter-key-up.wav',
  keyMappings: {
    'Space': {
      keyDownSound: '/sounds/typewriter-spacebar.wav',
      keyUpSound: '/sounds/typewriter-spacebar-up.wav',
      volume: 0.7
    },
    'Enter': {
      keyDownSound: '/sounds/typewriter-return.wav',
      keyUpSound: '/sounds/typewriter-return-up.wav',
      volume: 0.8
    },
    'Backspace': {
      keyDownSound: '/sounds/typewriter-backspace.wav',
      keyUpSound: '/sounds/typewriter-backspace-up.wav',
      volume: 0.5
    }
  }
};

export const SILENT_CONFIG: KeyboardSoundOptions = {
  defaultVolume: 0,
  globalEnabled: false,
  keyMappings: {}
};

export const GAMING_CONFIG: KeyboardSoundOptions = {
  defaultVolume: 0.2,
  globalEnabled: true,
  defaultKeyDownSound: '/sounds/gaming-key-down.wav',
  defaultKeyUpSound: '/sounds/gaming-key-up.wav',
  keyMappings: {
    // Gaming-specific keys
    'KeyW': { volume: 0.3 },
    'KeyA': { volume: 0.3 },
    'KeyS': { volume: 0.3 },
    'KeyD': { volume: 0.3 },
    'Space': { 
      keyDownSound: '/sounds/gaming-jump.wav',
      volume: 0.4
    },
    'Mouse0': { // Left click
      keyDownSound: '/sounds/gaming-click.wav',
      volume: 0.3
    },
    'Mouse1': { // Right click
      keyDownSound: '/sounds/gaming-right-click.wav',
      volume: 0.3
    }
  }
};

/**
 * Get configuration by name
 */
export const getKeyboardConfig = (configName: string): KeyboardSoundOptions => {
  switch (configName.toLowerCase()) {
    case 'retro':
      return RETRO_KEYBOARD_CONFIG;
    case 'mechanical':
      return MECHANICAL_KEYBOARD_CONFIG;
    case 'typewriter':
      return TYPEWRITER_CONFIG;
    case 'gaming':
      return GAMING_CONFIG;
    case 'silent':
      return SILENT_CONFIG;
    default:
      return RETRO_KEYBOARD_CONFIG;
  }
};

/**
 * Available configuration names
 */
export const AVAILABLE_CONFIGS = [
  'retro',
  'mechanical',
  'typewriter',
  'gaming',
  'silent'
] as const;

export type ConfigName = typeof AVAILABLE_CONFIGS[number];
