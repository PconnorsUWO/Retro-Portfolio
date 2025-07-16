/**
 * Enhanced Keyboard Sound API with fallback sound generation
 */

import { KeyboardSoundAPI, KeyboardSoundOptions } from './keyboardSound';
import { AudioGenerator } from './audioGenerator';

export class EnhancedKeyboardSoundAPI extends KeyboardSoundAPI {
  private audioGenerator: AudioGenerator;
  private fallbackSounds: Map<string, AudioBuffer> = new Map();

  constructor(options: KeyboardSoundOptions = {}) {
    super(options);
    this.audioGenerator = new AudioGenerator();
  }

  /**
   * Initialize with fallback sounds
   */
  async initialize(): Promise<void> {
    await super.initialize();
    
    // Generate fallback sounds
    this.generateFallbackSounds();
  }

  /**
   * Generate fallback sounds for when audio files are not available
   */
  private generateFallbackSounds(): void {
    // Generate basic key sounds
    this.fallbackSounds.set('fallback-key-down', this.audioGenerator.generateMechanicalKey('down'));
    this.fallbackSounds.set('fallback-key-up', this.audioGenerator.generateMechanicalKey('up'));
    
    // Generate special key sounds
    this.fallbackSounds.set('fallback-space-down', this.audioGenerator.generateSpacebar('down'));
    this.fallbackSounds.set('fallback-space-up', this.audioGenerator.generateSpacebar('up'));
    
    this.fallbackSounds.set('fallback-enter-down', this.audioGenerator.generateTypewriter('down'));
    this.fallbackSounds.set('fallback-enter-up', this.audioGenerator.generateTypewriter('up'));
    
    this.fallbackSounds.set('fallback-click', this.audioGenerator.generateClick());
  }

  /**
   * Load sound with fallback
   */
  async loadSound(key: string, url: string): Promise<void> {
    try {
      await super.loadSound(key, url);
    } catch (error) {
      console.warn(`Failed to load sound ${url}, using fallback`);
      // Use fallback sound based on key type
      const fallbackKey = this.getFallbackKey(key);
      if (fallbackKey && this.fallbackSounds.has(fallbackKey)) {
        this.soundBuffers.set(key, this.fallbackSounds.get(fallbackKey)!);
      }
    }
  }

  /**
   * Get appropriate fallback sound key
   */
  private getFallbackKey(key: string): string | null {
    if (key.includes('space')) return 'fallback-space-down';
    if (key.includes('enter')) return 'fallback-enter-down';
    if (key.includes('down')) return 'fallback-key-down';
    if (key.includes('up')) return 'fallback-key-up';
    if (key.includes('click')) return 'fallback-click';
    return 'fallback-key-down';
  }

  /**
   * Enhanced key down handler with better fallbacks
   */
  handleKeyDown(event: KeyboardEvent): void {
    const key = event.code || event.key;
    
    // Prevent repeated key events
    if (this.activeKeys.has(key)) {
      return;
    }
    
    this.activeKeys.add(key);
    
    // Get key-specific configuration
    const keyConfig = this.options.keyMappings[key];
    
    if (keyConfig?.enabled === false) {
      return;
    }
    
    // Determine sound key with better fallback logic
    let soundKey: string;
    
    if (keyConfig?.keyDownSound) {
      soundKey = `custom-${key}-down`;
      // Load custom sound if not already loaded
      if (!this.soundBuffers.has(soundKey)) {
        this.loadSound(soundKey, keyConfig.keyDownSound);
      }
    } else {
      // Use appropriate fallback based on key type
      soundKey = this.getDefaultSoundKey(key, 'down');
    }
    
    const volume = keyConfig?.volume ?? this.options.defaultVolume;
    this.playSound(soundKey, volume);
  }

  /**
   * Enhanced key up handler with better fallbacks
   */
  handleKeyUp(event: KeyboardEvent): void {
    const key = event.code || event.key;
    
    this.activeKeys.delete(key);
    
    // Get key-specific configuration
    const keyConfig = this.options.keyMappings[key];
    
    if (keyConfig?.enabled === false) {
      return;
    }
    
    // Determine sound key with better fallback logic
    let soundKey: string;
    
    if (keyConfig?.keyUpSound) {
      soundKey = `custom-${key}-up`;
      // Load custom sound if not already loaded
      if (!this.soundBuffers.has(soundKey)) {
        this.loadSound(soundKey, keyConfig.keyUpSound);
      }
    } else {
      // Use appropriate fallback based on key type
      soundKey = this.getDefaultSoundKey(key, 'up');
    }
    
    const volume = keyConfig?.volume ?? this.options.defaultVolume;
    this.playSound(soundKey, volume);
  }

  /**
   * Get default sound key based on key type
   */
  private getDefaultSoundKey(key: string, type: 'down' | 'up'): string {
    // Check if we have the default sound loaded
    const defaultKey = `default-${type}`;
    if (this.soundBuffers.has(defaultKey)) {
      return defaultKey;
    }
    
    // Use specific fallback sounds for special keys
    if (key === 'Space') {
      return `fallback-space-${type}`;
    }
    if (key === 'Enter') {
      return `fallback-enter-${type}`;
    }
    
    // Use general fallback
    return `fallback-key-${type}`;
  }

  /**
   * Play sound with enhanced fallback
   */
  protected playSound(soundKey: string, volume: number = this.options.defaultVolume): void {
    if (!this.audioContext || !this.isInitialized || !this.options.globalEnabled) {
      return;
    }

    // Try to get the sound buffer
    let buffer = this.soundBuffers.get(soundKey);
    
    // If not found, try fallback
    if (!buffer) {
      const fallbackKey = this.getFallbackKey(soundKey);
      if (fallbackKey) {
        buffer = this.fallbackSounds.get(fallbackKey);
      }
    }

    if (!buffer) {
      console.warn(`No sound available for: ${soundKey}`);
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = Math.max(0, Math.min(1, volume));
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  }

  /**
   * Generate and play a custom sound on demand
   */
  playCustomSound(type: 'beep' | 'click' | 'mechanical' | 'typewriter' | 'spacebar', 
                  variant: 'down' | 'up' = 'down', 
                  volume: number = this.options.defaultVolume): void {
    if (!this.audioContext || !this.options.globalEnabled) {
      return;
    }

    let buffer: AudioBuffer;
    
    switch (type) {
      case 'beep':
        buffer = this.audioGenerator.generateBeep(440, 0.1, volume);
        break;
      case 'click':
        buffer = this.audioGenerator.generateClick(0.05, volume);
        break;
      case 'mechanical':
        buffer = this.audioGenerator.generateMechanicalKey(variant);
        break;
      case 'typewriter':
        buffer = this.audioGenerator.generateTypewriter(variant);
        break;
      case 'spacebar':
        buffer = this.audioGenerator.generateSpacebar(variant);
        break;
      default:
        buffer = this.audioGenerator.generateMechanicalKey(variant);
    }

    this.audioGenerator.playBuffer(buffer, volume);
  }
}

// Export enhanced singleton
export const enhancedKeyboardSoundAPI = new EnhancedKeyboardSoundAPI();

// Export convenience function
export const initializeEnhancedKeyboardSound = (options?: KeyboardSoundOptions) => {
  const api = new EnhancedKeyboardSoundAPI(options);
  return api.initialize().then(() => api);
};
