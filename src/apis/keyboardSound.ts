/**
 * Keyboard Sound API
 * Handles keyboard events with sound effects for key down and key up events
 */

export interface KeySoundConfig {
  keyDownSound?: string;
  keyUpSound?: string;
  volume?: number;
  enabled?: boolean;
}

export interface KeyboardSoundOptions {
  defaultVolume?: number;
  globalEnabled?: boolean;
  keyMappings?: Record<string, KeySoundConfig>;
  defaultKeyDownSound?: string;
  defaultKeyUpSound?: string;
}

export class KeyboardSoundAPI {
  protected audioContext: AudioContext | null = null;
  protected soundBuffers: Map<string, AudioBuffer> = new Map();
  protected activeKeys: Set<string> = new Set();
  protected options: Required<KeyboardSoundOptions>;
  protected isInitialized = false;

  constructor(options: KeyboardSoundOptions = {}) {
    this.options = {
      defaultVolume: options.defaultVolume ?? 0.5,
      globalEnabled: options.globalEnabled ?? true,
      keyMappings: options.keyMappings ?? {},
      defaultKeyDownSound: options.defaultKeyDownSound ?? '/sounds/key-down.wav',
      defaultKeyUpSound: options.defaultKeyUpSound ?? '/sounds/key-up.wav'
    };
  }

  /**
   * Initialize the audio context and load default sounds
   */
  async initialize(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Load default sounds
      await this.loadSound('default-down', this.options.defaultKeyDownSound);
      await this.loadSound('default-up', this.options.defaultKeyUpSound);
      
      this.isInitialized = true;
      console.log('Keyboard Sound API initialized');
    } catch (error) {
      console.error('Failed to initialize Keyboard Sound API:', error);
    }
  }

  /**
   * Load a sound file and store it in the buffer
   */
  async loadSound(key: string, url: string): Promise<void> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.soundBuffers.set(key, audioBuffer);
    } catch (error) {
      console.warn(`Failed to load sound: ${url}`, error);
    }
  }

  /**
   * Play a sound from the buffer
   */
  protected playSound(soundKey: string, volume: number = this.options.defaultVolume): void {
    if (!this.audioContext || !this.isInitialized || !this.options.globalEnabled) {
      return;
    }

    const buffer = this.soundBuffers.get(soundKey);
    if (!buffer) {
      console.warn(`Sound not found: ${soundKey}`);
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
   * Handle key down event
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
    
    // Determine which sound to play
    const soundKey = keyConfig?.keyDownSound ? `custom-${key}-down` : 'default-down';
    const volume = keyConfig?.volume ?? this.options.defaultVolume;
    
    // Load custom sound if specified
    if (keyConfig?.keyDownSound && !this.soundBuffers.has(`custom-${key}-down`)) {
      this.loadSound(`custom-${key}-down`, keyConfig.keyDownSound);
    }
    
    this.playSound(soundKey, volume);
  }

  /**
   * Handle key up event
   */
  handleKeyUp(event: KeyboardEvent): void {
    const key = event.code || event.key;
    
    this.activeKeys.delete(key);
    
    // Get key-specific configuration
    const keyConfig = this.options.keyMappings[key];
    
    if (keyConfig?.enabled === false) {
      return;
    }
    
    // Determine which sound to play
    const soundKey = keyConfig?.keyUpSound ? `custom-${key}-up` : 'default-up';
    const volume = keyConfig?.volume ?? this.options.defaultVolume;
    
    // Load custom sound if specified
    if (keyConfig?.keyUpSound && !this.soundBuffers.has(`custom-${key}-up`)) {
      this.loadSound(`custom-${key}-up`, keyConfig.keyUpSound);
    }
    
    this.playSound(soundKey, volume);
  }

  /**
   * Add event listeners to the document
   */
  startListening(): void {
    if (!this.isInitialized) {
      console.warn('Keyboard Sound API not initialized. Call initialize() first.');
      return;
    }

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  /**
   * Remove event listeners from the document
   */
  stopListening(): void {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.activeKeys.clear();
  }

  /**
   * Update key mapping configuration
   */
  updateKeyMapping(key: string, config: KeySoundConfig): void {
    this.options.keyMappings[key] = { ...this.options.keyMappings[key], ...config };
  }

  /**
   * Enable/disable global sound
   */
  setGlobalEnabled(enabled: boolean): void {
    this.options.globalEnabled = enabled;
  }

  /**
   * Set global volume
   */
  setGlobalVolume(volume: number): void {
    this.options.defaultVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current configuration
   */
  getConfig(): KeyboardSoundOptions {
    return { ...this.options };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopListening();
    this.soundBuffers.clear();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Export a singleton instance
export const keyboardSoundAPI = new KeyboardSoundAPI();

// Export convenience functions
export const initializeKeyboardSound = (options?: KeyboardSoundOptions) => {
  const api = new KeyboardSoundAPI(options);
  return api.initialize().then(() => api);
};

export const createKeyboardSoundAPI = (options?: KeyboardSoundOptions) => {
  return new KeyboardSoundAPI(options);
};
